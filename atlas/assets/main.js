/**
 * Atlas — Main Application Logic
 * Fetches manifest.json, groups visualizations by category, and renders accordion sections.
 */

(function () {
  "use strict";

  // ── State ───────────────────────────────────────────────────────────
  let manifest = [];
  let searchQuery = "";
  let activeCat = ""; // nhóm đang lọc qua URL (?cat= hoặc /atlas/<cat>/ -> #cat)

  // ── DOM Refs ────────────────────────────────────────────────────────
  const categoriesContainer = document.getElementById("categories-container");
  const searchInput = document.getElementById("search-input");
  const kbdHint = document.getElementById("kbd-hint");
  const statViz = document.getElementById("stat-viz");
  const statCats = document.getElementById("stat-cats");

  // ── Category Config ─────────────────────────────────────────────────
  const CAT_ORDER = [
    "strategy",
    "ai",
    "ba",
    "da",
    "de",
    "bi",
    "elearning",
    "coding",
    "automation",
    "instruction",
    "other"
  ];

  const CAT_LABELS = {
    strategy: "Strategy & Management",
    ai: "Artificial Intelligence",
    ba: "Business Analysis",
    da: "Data Analysis",
    de: "Data Engineering",
    bi: "Business Intelligence",
    elearning: "Elearning & Cheatsheet",
    coding: "Coding & Development",
    automation: "Workflow Automation",
    instruction: "Installation & Guide",
    other: "Other Resources",
  };

  const CAT_ICONS = {
    strategy: "fa-solid fa-chess",
    ai: "fa-solid fa-brain",
    ba: "fa-solid fa-diagram-project",
    da: "fa-solid fa-chart-simple",
    de: "fa-solid fa-database",
    bi: "fa-solid fa-chart-line",
    elearning: "fa-solid fa-graduation-cap",
    coding: "fa-solid fa-code",
    automation: "fa-solid fa-robot",
    instruction: "fa-solid fa-book",
    other: "fa-solid fa-folder-open",
  };

  const CAT_DESCS = {
    strategy: "Lộ trình công nghệ, phương pháp quản trị nghiệp vụ hiện đại",
    ai: "Trí tuệ nhân tạo, mô hình ngôn ngữ lớn (LLM) và các giải pháp AI Agent",
    ba: "Phân tích nghiệp vụ, quy trình BPMN và thiết kế yêu cầu phần mềm",
    da: "Phân tích dữ liệu, khai phóng thông tin chi tiết và truy vấn SQL nghiệp vụ",
    de: "Thiết kế hạ tầng dữ liệu, tối ưu hóa pipeline ETL/ELT và Databricks",
    bi: "Business Intelligence, mô hình hóa dữ liệu Power BI & Fabric",
    elearning: "Tài liệu khoá học, cheatsheet tra cứu và bộ câu hỏi ôn tập",
    coding: "Lập trình ứng dụng thực tế, phát triển phần mềm và xây dựng API",
    automation: "Tự động hóa luồng nghiệp vụ với các nền tảng n8n, KNIME, Make",
    instruction: "Hướng dẫn cài đặt chi tiết và thiết lập môi trường cho người mới",
    other: "Các tài liệu tổng hợp, nghiên cứu công nghệ và công cụ tương tác khác",
  };

  // ── Init ────────────────────────────────────────────────────────────
  async function init() {
    try {
      const resp = await fetch("data/manifest.json");
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      manifest = await resp.json();
    } catch (err) {
      console.error("Failed to load manifest:", err);
      manifest = [];
    }

    renderStats();
    renderLatest();
    renderCategories();
    bindEvents();
    bindLatest();
    routeCategory();
    window.addEventListener("hashchange", routeCategory);
  }

  // ── Latest articles (horizontal strip) ──────────────────────────────
  const LATEST_N = 10;
  function renderLatest() {
    const strip = document.getElementById("latest-strip");
    const row = document.getElementById("latest-row");
    if (!strip || !row || !manifest.length) return;
    const items = [...manifest]
      .sort((a, b) => String(b.lastModified || "").localeCompare(String(a.lastModified || "")))
      .slice(0, LATEST_N);
    row.innerHTML = items.map(latestCardHTML).join("");
    strip.hidden = false;
  }

  function latestCardHTML(v) {
    const cat = (v.categories && v.categories[0]) || "other";
    const icon = CAT_ICONS[cat] || "fa-solid fa-folder";
    const label = CAT_LABELS[cat] || cat;
    const thumb = v.thumbnail
      ? `<div class="latest-thumb"><img src="${v.thumbnail}" alt="${escapeHTML(v.title)}" loading="lazy" draggable="false"></div>`
      : `<div class="latest-thumb latest-thumb-ph"><i class="${icon}"></i></div>`;
    return `
    <a href="${v.path}" class="latest-card" aria-label="Mở ${escapeHTML(v.title)}">
      ${thumb}
      <div class="latest-card-body">
        <div class="latest-card-cat"><i class="${icon}"></i> ${escapeHTML(label)}</div>
        <h3 class="latest-card-title">${escapeHTML(v.title)}</h3>
        <div class="latest-card-meta"><i class="fa-regular fa-calendar"></i> ${v.lastModified || ""}</div>
      </div>
    </a>`;
  }

  function bindLatest() {
    const row = document.getElementById("latest-row");
    if (!row) return;
    const prev = document.getElementById("latest-prev");
    const next = document.getElementById("latest-next");
    const step = () => Math.max(280, Math.round(row.clientWidth * 0.85));
    if (prev) prev.addEventListener("click", () => row.scrollBy({ left: -step(), behavior: "smooth" }));
    if (next) next.addEventListener("click", () => row.scrollBy({ left: step(), behavior: "smooth" }));
    // Kéo bằng chuột (touch đã có swipe gốc qua overflow-x).
    let down = false, startX = 0, startLeft = 0, moved = false;
    row.addEventListener("pointerdown", (e) => {
      down = true; moved = false; startX = e.clientX; startLeft = row.scrollLeft;
      row.classList.add("dragging");
    });
    row.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) moved = true;
      row.scrollLeft = startLeft - dx;
    });
    const end = () => { down = false; row.classList.remove("dragging"); };
    row.addEventListener("pointerup", end);
    row.addEventListener("pointerleave", end);
    // Chặn click điều hướng nếu vừa kéo (tránh mở bài ngoài ý muốn).
    row.addEventListener("click", (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);
  }

  // ── Route theo nhóm: /atlas/<cat>/ (qua 404.html -> ?cat=) hoặc #cat ──
  function routeCategory() {
    const params = new URLSearchParams(location.search);
    let cat = (params.get("cat") || location.hash.replace(/^#/, ""))
      .toLowerCase()
      .replace(/^cat-/, "");
    activeCat = CAT_LABELS[cat] ? cat : "";
    renderCategories();
    if (activeCat) {
      const block = document.getElementById("cat-" + activeCat);
      if (block) setTimeout(() => block.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }

  // ── Stats ───────────────────────────────────────────────────────────
  function renderStats() {
    if (statViz) statViz.textContent = manifest.length;
    if (statCats) {
      const cats = new Set();
      manifest.forEach((v) => v.categories.forEach((c) => cats.add(c)));
      statCats.textContent = cats.size;
    }
  }

  // ── Categories & Accordion Rendering ────────────────────────────────
  function renderCategories() {
    if (!categoriesContainer) return;

    // Filter manifest items based on search query
    const filtered = manifest.filter((v) => {
      if (!searchQuery) return true;
      return (
        v.title.toLowerCase().includes(searchQuery) ||
        v.description.toLowerCase().includes(searchQuery) ||
        v.categories.some((c) => c.toLowerCase().includes(searchQuery))
      );
    });

    if (filtered.length === 0) {
      categoriesContainer.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 40px; color: var(--text-3); margin-bottom: 16px;"></i>
          <h3>Không tìm thấy tài liệu phù hợp</h3>
          <p>${searchQuery ? "Thử tìm kiếm với từ khóa khác." : "Tài liệu sẽ xuất hiện ở đây khi được thêm vào hệ thống."}</p>
        </div>`;
      return;
    }

    // Group items by category keys
    let html = "";
    
    CAT_ORDER.forEach((catKey) => {
      if (activeCat && catKey !== activeCat) return; // lọc theo nhóm (URL)
      const itemsInCat = filtered.filter((v) => v.categories.includes(catKey));
      if (itemsInCat.length === 0) return;

      const label = CAT_LABELS[catKey] || catKey;
      const icon = CAT_ICONS[catKey] || "fa-solid fa-folder";
      const desc = CAT_DESCS[catKey] || "Tài liệu trực quan tương tác";
      const fileCountText = `${itemsInCat.length} tài liệu`;

      // Mở sẵn khi đang tìm kiếm hoặc đang lọc đúng nhóm này
      const open = searchQuery || activeCat === catKey;
      const isExpanded = open ? "expanded" : "";

      html += `
        <div class="category-block ${isExpanded}" id="cat-${catKey}">
          <div class="category-header" role="button" aria-expanded="${open ? 'true' : 'false'}" aria-controls="panel-${catKey}">
            <div class="category-header-left">
              <div class="category-icon">
                <i class="${icon}"></i>
              </div>
              <div class="category-info">
                <h3>${label}</h3>
                <p>${desc}</p>
              </div>
            </div>
            <button class="category-toggle-btn" aria-label="Toggle ${label} section">
              <span>Xem tài liệu</span>
              <span class="file-count-badge">${fileCountText}</span>
              <i class="fa-solid fa-chevron-down"></i>
            </button>
          </div>
          <div class="category-content-panel" id="panel-${catKey}">
            <div class="category-files-grid">
              ${itemsInCat.map((v) => cardHTML(v)).join("")}
            </div>
          </div>
        </div>
      `;
    });

    categoriesContainer.innerHTML = html;
  }

  function cardHTML(v) {
    const cats = v.categories
      .map(
        (c) =>
          `<span class="card-cat" data-cat="${c}">${CAT_LABELS[c] || c}</span>`
      )
      .join("");
    const size = formatSize(v.fileSize);
    const title = highlight(escapeHTML(v.title), searchQuery);
    const desc = highlight(escapeHTML(v.description), searchQuery);

    return `
    <a href="${v.path}" class="card" id="viz-${v.slug}" aria-label="Mở ${escapeHTML(v.title)}">
      <div class="card-cats">${cats}</div>
      <h3 class="card-title">${title}</h3>
      <p class="card-desc">${desc}</p>
      <div class="card-footer">
        <div class="card-meta">
          <span>
            <i class="fa-regular fa-calendar" style="margin-right: 2px;"></i>
            ${v.lastModified}
          </span>
          <span>
            <i class="fa-regular fa-file" style="margin-right: 2px;"></i>
            ${size}
          </span>
        </div>
        <span class="card-open">
          Mở tài liệu
          <i class="fa-solid fa-chevron-right" style="font-size: 10px; transition: transform 0.25s;"></i>
        </span>
      </div>
    </a>`;
  }

  // ── Events ──────────────────────────────────────────────────────────
  function bindEvents() {
    // Accordion Toggle
    if (categoriesContainer) {
      categoriesContainer.addEventListener("click", (e) => {
        const header = e.target.closest(".category-header");
        if (!header) return;

        const block = header.closest(".category-block");
        if (!block) return;

        const isExpanded = block.classList.toggle("expanded");
        header.setAttribute("aria-expanded", isExpanded ? "true" : "false");
      });
    }

    // Search
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        searchQuery = searchInput.value.trim().toLowerCase();
        if (searchQuery) activeCat = ""; // tìm kiếm thì bỏ lọc nhóm, search toàn bộ
        if (kbdHint) kbdHint.style.display = searchQuery ? "none" : "";
        renderCategories();
      });

      // Keyboard shortcut: / to focus search
      document.addEventListener("keydown", (e) => {
        if (e.key === "/" && document.activeElement !== searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
        if (e.key === "Escape" && document.activeElement === searchInput) {
          searchInput.value = "";
          searchQuery = "";
          if (kbdHint) kbdHint.style.display = "";
          searchInput.blur();
          renderCategories();
        }
      });
    }
  }

  // ── Utilities ───────────────────────────────────────────────────────
  function escapeHTML(s) {
    return (s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function highlight(text, query) {
    if (!query) return text;
    const re = new RegExp(
      "(" + query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")",
      "gi"
    );
    return text.replace(
      re,
      '<mark style="background:rgba(124,131,255,.3);color:var(--accent-2);padding:0 2px;border-radius:3px;">$1</mark>'
    );
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }

  // ── Boot ────────────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
