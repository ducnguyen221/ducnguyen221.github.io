#!/usr/bin/env node
/**
 * generate-manifest.js — Scans atlas repo for .html visualizations,
 * extracts metadata, and writes data/manifest.json.
 * Usage: node scripts/generate-manifest.js
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.join(ROOT, "data", "manifest.json");
const IGNORE_DIRS = new Set(["node_modules",".git",".tmp","assets","scripts","data",".github"]);
const IGNORE_FILES = new Set(["index.html","404.html"]);

const TOPIC_DIRS = new Set(["strategy","ai","ba","da","de","bi","elearning","coding","other","automation","instruction"]);

const TOPIC_KW = {
  strategy: ["strategy","management","okr","kpi","agile","lean","startup","leadership","roadmap","portfolio","go-to-market"],
  ai: ["ai","artificial intelligence","genai","generative ai","llm","agent","rag","prompt","embedding","machine learning","deep learning"],
  ba: ["ba","business analysis","business analyst","requirement","requirements","stakeholder","user story","use case","bpmn","process mapping"],
  da: ["da","data analysis","data analytics","analytics","statistics","eda","exploratory data analysis","insight","sql"],
  de: ["de","data engineering","databricks","delta lake","lakehouse","etl","elt","pipeline","spark","warehouse","orchestration"],
  bi: ["bi","business intelligence","power bi","powerbi","dax","dashboard","report","semantic model","fabric"],
  elearning: ["education","elearning","teaching","learning","curriculum","course","study","flashcard","glossary","certification","exam"],
  coding: ["python","javascript","coding","programming","algorithm","api","react","node"],
  automation: ["automation","workflow","n8n","knime","make","zapier","integromat","orchestrator","orchestration"],
  instruction: ["instruction","cài đặt","setup","installation","guide","huong dan","hướng dẫn"],
};

function findHtml(dir, base = "") {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, e.name);
    if (e.isDirectory() && !IGNORE_DIRS.has(e.name)) out.push(...findHtml(path.join(dir, e.name), rel));
    else if (e.isFile() && e.name.endsWith(".html") && !IGNORE_FILES.has(e.name.toLowerCase())) out.push({ abs: path.join(dir, e.name), rel });
  }
  return out;
}

function extractMeta(fp) {
  const html = fs.readFileSync(fp, "utf-8");
  const tm = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = tm ? tm[1].replace(/\s+/g, " ").trim() : path.basename(fp, ".html").replace(/[-_]/g, " ");
  const dm = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const description = dm ? dm[1].trim() : `Interactive visualization: ${title}`;
  // Cho phép ghi đè ngày đăng bằng <meta name="date" content="YYYY-MM-DD">
  const pm = html.match(/<meta\s+name=["']date["']\s+content=["'](\d{4}-\d{2}-\d{2})["']/i);
  return { title, description, metaDate: pm ? pm[1] : "" };
}

/**
 * NGÀY ĐĂNG = ngày commit ĐẦU TIÊN thêm file, lấy từ lịch sử git.
 *
 * KHÔNG dùng mtime của file làm ngày đăng: mọi thao tác chạm vào file đều
 * reset mtime, nên chỉ cần một lần sửa hàng loạt (ví dụ vá CSS cho toàn site)
 * là tất cả bài "vừa đăng hôm nay" — đã dính đúng lỗi này, 11/11 bài cùng hiện
 * một ngày. Thứ tự ưu tiên: <meta name="date"> → git → mtime (chỉ khi file
 * chưa được commit).
 */
const dateCache = new Map();
function publishedDate(rel, stat) {
  const key = rel.replace(/\\/g, "/");
  if (dateCache.has(key)) return dateCache.get(key);
  let d = "";
  try {
    const out = execFileSync(
      "git",
      ["log", "--follow", "--diff-filter=A", "--format=%as", "--", key],
      { cwd: ROOT, encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    if (out) d = out.split("\n").filter(Boolean).pop();
  } catch (e) {
    /* không có git (CI tối giản, tải zip…) → rơi xuống mtime */
  }
  if (!d) d = stat.mtime.toISOString().split("T")[0];
  dateCache.set(key, d);
  return d;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasKeyword(h, keyword) {
  if (/^[a-z0-9]+$/.test(keyword) && keyword.length <= 3) {
    return new RegExp(`\\b${escapeRegExp(keyword)}\\b`).test(h);
  }
  return h.includes(keyword);
}

function pathCats(rel) {
  const parts = rel.split(/[\\/]/).map((p) => p.toLowerCase());
  if (parts[0] === "content" && TOPIC_DIRS.has(parts[1])) return [parts[1]];
  return [];
}

/**
 * Quy tắc phân loại: MỘT thư mục = MỘT nhóm.
 * Bài nằm trong content/<topic>/ thì thuộc đúng nhóm <topic>, không gán thêm nhóm nào khác.
 * Chỉ khi bài KHÔNG nằm trong thư mục nhóm hợp lệ mới suy đoán bằng từ khoá.
 * (Trước đây lấy hợp của thư mục + từ khoá nên 1 bài rơi vào 3-4 nhóm, gây nhập nhằng
 *  giữa các thư mục — ví dụ hr-analytics ở content/da/ lại hiện cả ở bi, ai, strategy.)
 */
function detectCats(title, desc, rel) {
  const fromPath = pathCats(rel);
  if (fromPath.length) return fromPath;

  const h = `${title} ${desc}`.toLowerCase();
  const cats = new Set();
  Object.entries(TOPIC_KW).forEach(([cat, kws]) => {
    if (kws.some((k) => hasKeyword(h, k))) cats.add(cat);
  });
  return cats.size ? [...cats] : ["other"];
}

function toSlug(f) {
  return path.basename(f, ".html").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Ảnh bìa card (nếu có file cùng tên cạnh .html): <slug>.jpg/.png/.webp -> url tương đối.
function findThumb(abs, urlPath) {
  const dir = path.dirname(abs);
  const base = path.basename(abs, ".html");
  for (const ext of [".jpg", ".jpeg", ".png", ".webp"]) {
    if (fs.existsSync(path.join(dir, base + ext))) return urlPath.replace(/\.html$/i, ext);
  }
  return "";
}

function main() {
  console.log("Atlas Manifest Generator\n" + "-".repeat(40));
  const files = findHtml(ROOT);
  console.log(`Found ${files.length} HTML file(s)\n`);
  const manifest = files.map(({ abs, rel }) => {
    const stat = fs.statSync(abs);
    const { title, description, metaDate } = extractMeta(abs);
    const categories = detectCats(title, description, rel);
    const urlPath = rel.replace(/\\/g, "/");
    const published = metaDate || publishedDate(rel, stat);
    console.log(`  + ${published}  ${urlPath} => ${categories.join(", ")}`);
    return {
      slug: toSlug(rel), title, description, categories, path: urlPath,
      thumbnail: findThumb(abs, urlPath),
      published,
      lastModified: stat.mtime.toISOString().split("T")[0],
      fileSize: stat.size,
    };
    // sắp xếp: bài mới đăng lên trước, cùng ngày thì theo tên
  }).sort((a, b) => (b.published || "").localeCompare(a.published || "")
                    || a.title.localeCompare(b.title));

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`\nManifest => ${path.relative(ROOT, OUTPUT)} (${manifest.length} items)`);
}
main();
