# Design System — ducnguyen.vn

> Bản hướng dẫn thiết kế cho **agent** và người xây dựng giao diện của `ducnguyen.vn`.
> Đọc kỹ trước khi tạo hoặc chỉnh sửa bất kỳ trang HTML nào. Mục tiêu: **một bộ nhận diện
> thống nhất, hiện đại–công nghệ nhưng dễ đọc cho bất kỳ ai**, dùng chung nền tảng nhưng
> mỗi trang giữ một “mood” riêng đúng mục đích.

Phiên bản: **v1.0** · Ngôn ngữ giao diện: **song ngữ Việt–Anh (VI mặc định)** · Theme: **dark + light**

---

## 0. TL;DR cho agent

Khi được yêu cầu tạo/sửa một trang, LUÔN:

1. Link 3 file dùng chung: `assets/tokens.css`, `assets/components.css`, `assets/theme.js`.
2. Đặt `<html data-theme="dark" data-page="…">` với `data-page` đúng trang
   (`home` | `profile` | `atlas` | `news` | `lab`). Điều này tự động đổi **màu nhấn của trang**.
3. Dùng **token** (biến CSS) cho mọi màu/khoảng cách/bo góc — **không hardcode hex**.
4. Heading dùng `--font-display`, thân dùng `--font-sans`, nhãn kỹ thuật dùng `--font-mono`.
5. Tái dùng component có sẵn (`.btn`, `.card`, `.repo`, `.badge`, `.nav`, `.dn-window`…)
   trước khi tự chế cái mới.
6. Mọi text hiển thị nên có cặp `data-vi` / `data-en` để chuyển ngữ (xem §8).
7. Giữ futuristic ở mức **tinh tế**: grid mờ, nhãn mono, glow nhẹ trên accent — KHÔNG
   gradient lòe loẹt, KHÔNG neon quá tay, KHÔNG emoji (trừ khi nội dung yêu cầu).

---

## 1. Nguyên tắc thương hiệu

- **Hiện đại – công nghệ – dễ đọc.** Cảm giác “AI & Web Hub” gọn gàng, có cấu trúc, quét
  dữ liệu nhanh. Tech được gợi ý bằng *chi tiết* (mono label, grid, terminal/inspector
  metaphor) chứ không bằng hiệu ứng nặng.
- **Cấu trúc rõ ràng.** Ưu tiên lưới, khoảng trắng rộng rãi, phân cấp thị giác mạnh.
- **Static-first & nhẹ.** HTML/CSS/JS thuần, tải nhanh, deploy GitHub Pages.
- **Một nền tảng, nhiều mood.** Mọi trang cùng skeleton + type + spacing; chỉ khác *màu
  nhấn* và *bố cục đặc thù* theo mục đích.
- **Khả dụng cho tất cả.** Đối tượng: học viên, đối tác doanh nghiệp, khách hàng, nhà
  tuyển dụng, cộng đồng. Tránh thuật ngữ rối; tương phản đạt WCAG AA.

---

## 2. Kiến trúc file

```
assets/
  tokens.css       ← biến thiết kế (màu, type, spacing, theme, page-mood). Đọc trước.
  components.css   ← reset + thư viện component (.btn, .card, .nav, .repo, …)
  theme.js         ← toggle dark/light + VI/EN, lưu localStorage
styleguide.html    ← showcase trực quan toàn bộ token & component
design.md          ← tài liệu này
templates/
  home.html        ← hub dạng folder/repo (data-page="home")
  profile.html     ← hồ sơ chuyên môn (data-page="profile")
  atlas.html       ← nghiên cứu / tri thức (data-page="atlas")
  daily-ai-news.html (data-page="news")
  my-project.html  ← sandbox nguyên mẫu (data-page="lab")
```

Mỗi trang mới = copy template gần nhất, đổi `data-page`, thay nội dung. **Không** sao
chép token vào file riêng — luôn link `assets/`.

---

## 3. Màu sắc (color tokens)

Định nghĩa trong `tokens.css` bằng **oklch** để hài hòa giữa hai theme. Theme đổi qua
`[data-theme="dark"|"light"]` trên `<html>`.

### Nền & văn bản (đổi theo theme)
| Token | Vai trò |
|---|---|
| `--bg` | nền trang (dark: gần đen tông lạnh; light: giấy lạnh trắng ngà) |
| `--elev-1 / --elev-2 / --elev-3` | panel → card → popover/hover |
| `--text / --text-muted / --text-faint` | văn bản chính / phụ / mờ |
| `--border / --border-strong` | viền hairline / viền rõ |
| `--glass / --glass-line` | nền kính cho nav & overlay |
| `--shadow-sm/md/lg` | đổ bóng (dark dùng bóng sâu, light dùng bóng mềm) |

> Nâng độ cao (elevation) trong **dark** chủ yếu bằng **viền sáng + nền sáng dần**, không
> phải bóng đậm. Trong **light** dùng **bóng mềm + hairline**.

### Accent thương hiệu (teal — gần như cố định)
`--accent`, `--accent-strong`, `--accent-soft`, `--accent-line`, `--accent-glow`,
`--accent-ink` (màu chữ nằm TRÊN nền accent). Teal là chữ ký xuyên suốt; trong light mode
accent tự tối đi để đủ tương phản.

### Màu “mood” theo trang
Mỗi trang đổi biến `--page-h` (hue) → sinh ra `--page`, `--page-strong`, `--page-soft`,
`--page-line`. **Dùng `--page*` cho điểm nhấn cục bộ của trang** (eyebrow, rail card, icon
repo, badge), dùng `--accent*` cho nút primary & dấu hiệu thương hiệu cốt lõi.

| `data-page` | Trang | Hue | Màu |
|---|---|---|---|
| `home` | Trang chủ / Hub | 178 | teal (trùng thương hiệu) |
| `profile` | Hồ sơ | 255 | xanh dương |
| `atlas` | Nghiên cứu | 295 | tím |
| `news` | Daily AI News | 70 | hổ phách/amber |
| `lab` | My Project | 158 | xanh lá |

### Ngữ nghĩa
`--ok` (success), `--warn`, `--danger`, `--info`. Dùng cho badge trạng thái, không dùng
làm màu trang trí.

**Quy tắc:** không viết hex trực tiếp trong trang. Nếu cần màu mới, ưu tiên `--page*` hoặc
tạo bằng oklch cùng chroma/lightness với hệ hiện có.

---

## 4. Typography

| Vai trò | Token | Font | Dùng cho |
|---|---|---|---|
| Display | `--font-display` | **Space Grotesk** | h1–h4, số liệu lớn, hero |
| Body/UI | `--font-sans` | **Manrope** | đoạn văn, nav, nút, nhãn |
| Mono | `--font-mono` | **JetBrains Mono** | nhãn kỹ thuật, code, path, badge |

Thang cỡ chữ fluid: `--t-xs … --t-3xl` (đã `clamp` sẵn). Line-height: `--lh-tight` (tiêu
đề), `--lh-snug`, `--lh-body` (văn bản). Letter-spacing: `--tracking-tight` cho display,
`--tracking-mono` cho nhãn mono, `--tracking-caps` cho eyebrow viết hoa.

**Quy tắc cỡ:** thân ≥ 16px; nhãn mono nhỏ nhất ~12px. Tiêu đề dùng `text-wrap: balance`,
đoạn văn dùng `text-wrap: pretty`.

**Nhãn kỹ thuật** (chữ ký của hệ): dùng `.dn-eyebrow` (vd `01 / Foundations`), `.dn-mono`
(vd `workspace://ducnguyen221/repos`, `SYS_READY`), `.dn-kbd` cho phím/token inline.

---

## 5. Khoảng cách, bo góc, lưới, motion

- **Spacing**: thang 4px → `--s-1`(4) … `--s-32`(128). Dùng `gap` trên flex/grid, KHÔNG
  margin lẻ tẻ giữa các sibling.
- **Radius**: `--r-sm`(6) `--r-md`(10) `--r-lg`(16) `--r-xl`(22) `--r-pill`. Card lg,
  nút/input md, badge pill. Bo góc *vừa phải* — không bo tròn quá mức.
- **Layout**: `.dn-container` (max 1200), `--wide` (1360), `--narrow` (760). Section
  padding `.dn-section`. Lưới tiện ích `.dn-grid--2/3/4`.
- **Motion**: `--ease`, `--ease-out`, thời lượng `--dur-1…4` (120–560ms). Hover nâng nhẹ
  (`translateY(-1…3px)`), accent rail/glow xuất hiện mượt. Tôn trọng
  `prefers-reduced-motion` (đã xử lý sẵn trong tokens.css). KHÔNG animation lặp vô hạn trên
  nội dung.

---

## 6. Thư viện component (xem trực quan ở `styleguide.html`)

| Component | Class | Ghi chú |
|---|---|---|
| Nút | `.btn` + `--primary` / `--ghost` / `--page` / `--sm` / `--icon` | cao 44px (sm 36), bo md |
| Card | `.card` + `--interactive` / `--rail` / `--pad-lg` | rail = thanh accent sáng khi hover |
| Repo/folder item | `.repo` (`.repo__icon/__name/__desc/__meta/__lang/__dot`) | dòng danh sách repo ở home |
| Badge | `.badge` + `--accent` / `--page` / `--ok` / `--live` | `--live` có chấm pulse |
| Chip filter | `.chip` (`.is-active`) | bộ lọc danh mục |
| Stat/KPI | `.stat` (`.stat__num em` để tô màu page) | số liệu hồ sơ |
| Nav | `.nav` > `.nav__inner` (`.brand`, `.nav__links`, `.nav__link.is-active`) | sticky, glass |
| Eyebrow | `.dn-eyebrow` | nhãn mục + gạch nối |
| Window/inspector | `.dn-window` > `.dn-window__bar` (`.dn-window__dots`) | khung terminal/file-browser |
| Toggle theme/lang | `.icon-btn` + `data-toggle-theme` / `data-toggle-lang` | xử lý bởi theme.js |
| Footer | `.footer` > `.footer__grid` | mono copyright |

**Icon**: dùng **Material Symbols Rounded** (đã có ở profile). Link font trong `<head>`,
class `.material-symbols-rounded`; thêm `.msym--fill` khi cần icon đặc. Cỡ theo `em`.

Component mới phải: dùng token, hoạt động ở cả 2 theme, ăn theo `--page`, có trạng thái
`:hover`/`:focus-visible`, và đủ tương phản AA.

---

## 7. “Mood” từng trang (chung nền tảng, khác mục đích)

Tất cả dùng cùng nav + footer + type + spacing. Khác biệt nằm ở **màu page**, **bố cục
chủ đạo** và **metaphor**.

- **Home — `home` (teal).** *AI & Web Hub.* Hero giới thiệu nhanh + CTA GitHub. Khối “Dự án
  tiêu biểu” (card `--rail`). Khu **folder/repo**: dùng `.dn-window` làm khung workspace,
  liệt kê repo public; **ẩn cây file**, chỉ hiển thị **thông tin repo + activity/update mới
  nhất** của mỗi dự án tiêu biểu. Các trang tiêu biểu được **ghim cố định ở trên**, repo
  quét tự động xếp dưới (xem §9). Metaphor: terminal/inspector, nhãn `01 /profile`,
  `SYS_READY`.
- **Profile — `profile` (xanh dương).** Hồ sơ chuyên môn dạng dọc: ảnh + tên + vai trò,
  liên hệ, **KPI `.stat`**, năng lực cốt lõi, timeline sự nghiệp, khóa học (LMS), social.
  Mật độ cao hơn, nhiều card lưới. Giữ Material icon như bản hiện tại.
- **Atlas — `atlas` (tím).** Nghiên cứu/blog “dễ hiểu về AI & Data”. Bố cục đọc dài:
  cột nội dung `--narrow`, card bài viết, mục lục, tag chủ đề. Thiên về *điềm tĩnh, tri
  thức*; ảnh minh họa dùng placeholder (xem §10).
- **Daily AI News — `news` (amber).** Feed tin tức tự động (agent tóm tắt). Index theo
  ISO year/week; card tin gọn, timestamp mono, nguồn. Cảm giác *bản tin nhanh*, nhiều dòng
  ngắn, badge `LIVE`/ngày.
- **My Project — `lab` (xanh lá).** Sandbox nguyên mẫu: lưới thumbnail các web/HTML con,
  badge trạng thái (prototype/stable), filter `.chip`. Cảm giác *thử nghiệm, vui*, lưới dày.

---

## 8. Song ngữ Việt–Anh

- `<html data-lang="vi">` mặc định; `theme.js` lưu lựa chọn.
- Phần tử cần dịch: đặt `data-vi="…"` và `data-en="…"`; script tự đổi `textContent` theo
  ngôn ngữ. Nội dung mặc định trong HTML viết bằng **VI**.
- Nhãn kỹ thuật (path, `SYS_READY`, tên repo) **không dịch**.
- Nút ngôn ngữ: `.icon-btn[data-toggle-lang]` chứa `<span data-lang-label>`.

```html
<h2 data-vi="Dự án tiêu biểu" data-en="Featured projects">Dự án tiêu biểu</h2>
```

---

## 9. Tích hợp GitHub (home)

Mục tiêu: tự động phản ánh hoạt động GitHub mà vẫn nổi bật các trang tiêu biểu.

- **Ghim cố định ở trên**: danh sách trang tiêu biểu (profile, atlas, daily-ai-news,
  my-project) + tóm tắt **nội dung/cập nhật mới nhất** của từng trang.
- **Tự động ở dưới**: quét repo **public** của `ducnguyen221`, hiển thị bằng `.repo`
  (tên, mô tả, ngôn ngữ, sao, “updated x ago”). **Ẩn cây file** — chỉ show thông tin repo
  và **activity/commit mới nhất**.
- **Triển khai thực tế trong repo này:**
  - Trang home đọc file tĩnh `data/repos.json` qua `assets/home-data.js` (giữ
    static-first; có loading state, không vỡ nếu fetch lỗi).
  - `data/repos.json` được sinh tự động bởi `scripts/build-repos.mjs` (gọi GitHub
    REST API: `/users/ducnguyen221/repos`, `/commits`, `/git/trees`). Shape dữ
    liệu: `data/repos.schema.md`.
  - `.github/workflows/refresh-repos.yml` chạy script theo cron hằng ngày + khi
    push, tự commit lại `repos.json`.
  - Danh sách & thứ tự ghim sửa ở hằng `FEATURED` trong build script.
- Khung chứa repo dùng `.dn-window` với thanh `workspace://ducnguyen221/repos` + badge
  trạng thái `SYS_READY`/`SYNCING`.

---

## 10. Hình ảnh & placeholder

- KHÔNG tự vẽ minh họa bằng SVG phức tạp. Khi thiếu ảnh thật, dùng **placeholder sọc mờ**
  kèm nhãn mono mô tả nội dung cần đặt (vd `product shot`, `diagram`, `avatar`).
- Ảnh thật (avatar, logo công cụ) bo `--r-md`/`--r-lg`, viền `--border`.
- Logo công cụ (Power BI, Python…) giữ như profile hiện tại.

```html
<div style="aspect-ratio:16/9;border-radius:var(--r-lg);border:1px solid var(--border);
     background:repeating-linear-gradient(135deg,var(--elev-1),var(--elev-1) 10px,var(--elev-2) 10px,var(--elev-2) 20px);
     display:grid;place-items:center">
  <span class="dn-mono dn-faint">diagram · 16:9</span>
</div>
```

---

## 11. Accessibility & chất lượng

- Tương phản văn bản đạt **WCAG AA**; kiểm tra ở cả 2 theme.
- `:focus-visible` rõ ràng (đã set mặc định). Hit target ≥ 44px.
- Dùng HTML ngữ nghĩa (`header/nav/main/section/article/footer`), heading đúng cấp.
- Ảnh có `alt`; icon trang trí thì `aria-hidden`.
- Tôn trọng `prefers-reduced-motion` và `prefers-color-scheme` (lần đầu truy cập).

---

## 12. Checklist trước khi giao một trang

- [ ] `data-theme` + `data-page` đúng; link đủ 3 file `assets/`.
- [ ] Chỉ dùng token; không hex/px rời rạc cho màu.
- [ ] Font: display/sans/mono đúng vai trò; cỡ ≥ ngưỡng tối thiểu.
- [ ] Tái dùng component; trạng thái hover/focus đầy đủ.
- [ ] Hoạt động ở dark **và** light; tương phản AA.
- [ ] Có `data-vi`/`data-en` cho text hiển thị.
- [ ] Ảnh dùng placeholder đúng chuẩn nếu chưa có asset thật.
- [ ] Futuristic ở mức tinh tế — không lòe loẹt, không emoji ngoài ý đồ.

---

## 13. Lưu guideline này vào repo (cho agent đọc & làm theo)

Mục tiêu: bất kỳ agent nào (Claude Code, hoặc agent khác) khi mở repo đều **tự
động hiểu luật thiết kế** và tái sử dụng đúng hệ thống.

**Đặt nguyên bộ thư mục này vào gốc repo `ducnguyen221.github.io`:**

```
ducnguyen221.github.io/
├─ CLAUDE.md              ← brief Claude Code TỰ ĐỘNG nạp mỗi phiên
├─ AGENTS.md              ← bản rút gọn cho các agent/tool khác
├─ design.md              ← đặc tả đầy đủ (file này)
├─ styleguide.html        ← showcase token + component
├─ assets/                ← tokens.css · components.css · theme.js · home-data.js
├─ templates/             ← home · profile · atlas · daily-ai-news · my-project
├─ data/                  ← repos.json + repos.schema.md
├─ scripts/               ← build-repos.mjs
└─ .github/workflows/     ← refresh-repos.yml
```

**Vì sao đặt như vậy:**
- `CLAUDE.md` ở gốc → Claude Code đọc đầu mỗi phiên, không cần nhắc lại luật.
- `AGENTS.md` là quy ước nhiều công cụ AI khác cùng đọc → cùng một nguồn sự thật.
- Cả hai chỉ tóm tắt + trỏ về `design.md` (chi tiết) và `styleguide.html` (trực
  quan), nên luật chỉ viết một nơi, tránh lệch phiên bản.

**Quy trình cho agent khi được giao việc UI:**
1. Đọc `CLAUDE.md`/`AGENTS.md` → mở `design.md` phần liên quan.
2. Mở `styleguide.html` để lấy đúng token/component.
3. Copy template gần nhất trong `templates/`, đổi `data-page` + nội dung.
4. Chạy checklist §12 trước khi commit.

**Khi cập nhật design system:** sửa `tokens.css` / `components.css` / `design.md`,
bump phiên bản (vd v1.1) ở đầu file này, và mô tả thay đổi trong commit. Không
sửa rải rác trong từng trang — mọi trang link chung `assets/` nên thay đổi lan ra
tự động.

**Mỗi repo dự án con (atlas, my-project, daily-ai-news…)** nên thêm một
`AGENTS.md` ngắn trỏ về design system này (copy `assets/` vào hoặc tham chiếu
qua CDN/submodule) để giữ nhất quán xuyên repo.
