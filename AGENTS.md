# AGENTS.md — ducnguyen.vn (monorepo)

> **File hướng dẫn agent CHÍNH (master).** Mọi agent (Claude Code, Codex, Gemini…) đọc file
> này trước khi làm việc trong repo. Quy tắc thiết kế đầy đủ ở [`DESIGN.md`](./DESIGN.md).
> Mỗi trang con có `AGENTS.md` + `DESIGN.md` riêng để **bổ sung / ghi đè** hướng dẫn này.

## 1. Repo này là gì
`ducnguyen221.github.io` = **monorepo công khai** chứa toàn bộ website cá nhân
**ducnguyen.vn**. Deploy bằng **GitHub Pages (legacy, branch `main`, path `/`)**, custom
domain qua `CNAME` = `ducnguyen.vn`. Có `.nojekyll` ở gốc → phục vụ file tĩnh nguyên trạng
(không qua Jekyll), nên thư mục bắt đầu bằng `_` vẫn serve được.

Mỗi trang con là **một thư mục** phục vụ tại path cùng tên:

| Path | Thư mục | Vai trò | Trạng thái sửa |
|---|---|---|---|
| `/` | `index.html`, `resources/` | Home hub + portfolio | **Editable** |
| `/atlas/` | `atlas/` | Blog/visualization tri thức | **PROTECTED** – không sửa nội dung/link; chỉ nhận bài từ pipeline |
| `/profile/` | `profile/` | E-profile (Tailwind PWA) | **PROTECTED** – self-contained, không tái cấu trúc |
| `/project/` | `project/` | Hub liệt kê HTML nhỏ (đổi tên từ `my-project`) | Editable |
| `/docs/` | `docs/` | Tài liệu/demo public (COMPA CRM…) | **PROTECTED** – không sửa nội dung/link |
| `/news/` | **repo riêng `news`** | Bản tin AI & Data | ⚠️ **KHÔNG nằm trong repo này** (xem §4) |

## 2. Lịch sử & cách hợp nhất
Các trang con từng là repo riêng (`atlas`, `profile`, `my-project`, `docs`), gộp vào đây
dạng **snapshot** (qua `git archive`, không phải subtree do bug git local). **Lịch sử git
đầy đủ vẫn còn ở các repo standalone đã archive** — đừng xóa chúng. `my-project` → đổi tên
thành `project/`; link cũ `/my-project/*` được redirect sang `/project/*` bởi `404.html` gốc.

## 3. Luật vàng (mọi trang)
1. **Static-first**: HTML/CSS/JS thuần. Không thêm build step nặng. Giữ `.nojekyll`.
2. **Không phá link công khai**: path = tên thư mục. Đổi tên thư mục = đổi URL công khai →
   phải thêm redirect trong `404.html` gốc. Kiểm tra link trước khi giao (xem §6).
3. **`404.html` gốc là handler toàn site** (GitHub Pages chỉ dùng 404 ở gốc): nó xử lý
   redirect `/my-project/*`→`/project/*` và SPA-fallback của atlas (`/atlas/<cat>/`→
   `/atlas/?cat=`). Sửa hành vi 404 của trang con phải cập nhật ở ĐÂY.
4. **Tôn trọng PROTECTED**: không đổi nội dung/link của `atlas/`, `profile/`, `docs/`.
   Được phép THÊM file governance (`AGENTS.md`/`DESIGN.md`) vào thư mục đó vì không ảnh hưởng
   serving.
5. **Thiết kế**: theo `DESIGN.md`. Home + project dùng chung token (nền `#04060a`, font
   Plus Jakarta Sans / Be Vietnam Pro / JetBrains Mono, dark theme).
6. **Icon/favicon**: `/favicon.svg` ở gốc; trang mới thêm `<link rel="icon" href="/favicon.svg">`.

## 4. News tách riêng (cố ý)
`news/` **không** gộp vào đây vì phình theo file mp3 (audio hằng ngày/tuần). Nó là repo
`ducnguyen221/news` phục vụ tại `/news/`. Home fetch runtime `/news/ai/hot-today/hot-news.json`
→ chỉ resolve trên production (local sẽ 404, bình thường). Link `/news/*` ở các trang là
hợp lệ trên prod.

## 5. Pipeline tự động đăng bài lên Atlas (QUAN TRỌNG)
Có pipeline marketing (Tobi) **bên ngoài repo này** sinh blog + audio + video + đăng FB/YT,
rồi `git push` bài vào atlas. Scripts ở:
`…\KPIM Academy - Documents\30_MARKETING\agent\scripts\` (`publish-tobi.ps1`, `run-tobi-post.ps1`).
- Hiện trỏ `$ATLAS = C:\Users\DucNguyen\Code\atlas` (repo standalone).
- **Sau cutover monorepo**, phải đổi `$ATLAS` → `C:\Users\DucNguyen\Code\ducnguyen221.github.io\atlas`
  và push repo này. URL `$SITE='https://ducnguyen.vn/atlas'` **giữ nguyên**.
- `atlas/scripts/generate-manifest.js` sinh `atlas/data/manifest.json` với path tương đối
  `content/...` → vẫn đúng vì `atlas/index.html` phục vụ tại `/atlas/`. **Không sửa logic này.**
- **Không** hand-edit `atlas/content/*` hay `atlas/data/manifest.json` — do pipeline quản lý.
Chi tiết & runbook cutover: xem `MIGRATION.md`.

## 6. Bẫy đã gặp — ĐỌC TRƯỚC KHI SỬA FRONTEND

### 6.1 Cuộn tuột quá cuối trang (overscroll / rubber-band) — đã fix toàn site
**Triệu chứng:** trên iPhone, vuốt mạnh thì trang kéo lố qua khỏi cuối, lòi ra một dải nền
trống; thanh nav `position:fixed` bị đẩy lên.
**KHÔNG phải** do trang dư chiều cao — đã đo `document.documentElement.scrollHeight` bằng
đúng đáy phần tử cuối cùng. Đó là rubber-band của trình duyệt.
**Fix chuẩn:** MỌI trang phải có khối này trong `<head>` (đã inject vào 74 file, commit `5bb266a`):
```html
<style>/* dn-scroll-fix: chặn kéo tuột quá cuối trang (overscroll/rubber-band) trên mobile */
html { overscroll-behavior-y: none; }
</style>
```
- Marker `dn-scroll-fix` để script inject **idempotent** — kiểm tra marker trước khi chèn.
- **Trang mới BẮT BUỘC có khối này.**
- Cố ý **KHÔNG** thêm `body{padding-bottom}` toàn cục: nhiều trang đặt `display:flex/grid`
  trên `body`, rule đè sẽ vỡ layout. Cần khoảng thở thì nới **riêng từng trang**.

> ⚠️ **CHỈ đặt lên `html`, TUYỆT ĐỐI KHÔNG đặt lên `body`.** Bản đầu tiên viết
> `html, body { … }` và đã gây lỗi nặng hơn chính lỗi nó định sửa: **lăn chuột trên nội dung
> không cuộn được trang, chỉ cuộn khi trỏ đúng vào thanh cuộn.**
> Cơ chế: `body` có `overflow-x: hidden` → theo spec, `overflow-y` **tự động thành `auto`**,
> biến body thành một vùng cuộn riêng. Body cao đúng bằng nội dung nên **tự nó không cuộn được
> gì**; thêm `overscroll-behavior:none` vào đó là chặn nốt việc **chuyển tiếp cuộn** sang `html`
> — con lăn rơi vào hố đen. Phần tử cuộn thật là `html`, chặn kéo-tuột ở đó là đủ.
> Cách kiểm: `page.mouse.move(giữa màn hình)` rồi `page.mouse.wheel(0, 700)` và đọc `scrollY`.
> **Đừng kiểm bằng `window.scrollTo()`** — lệnh đó luôn chạy được kể cả khi con lăn đang chết,
> nên sẽ báo "bình thường" trong khi người dùng vẫn không cuộn nổi.

### 6.2 Bẫy `100vh` trên mobile (dải nền trống dưới đáy)
Trên mobile `100vh` = chiều cao **khi đã ẩn thanh công cụ**, luôn LỚN HƠN vùng nhìn thấy
thật → `body{min-height:100vh}` làm trang dư ra ~60–90px và cuộn tuột xuống nền trống.
`overscroll-behavior` KHÔNG chữa được ca này vì trang thật sự có chỗ để cuộn.
- Trang thường: `min-height:100vh` rồi đè bằng `@supports (min-height:100dvh){...100dvh}`.
- Trang **một-màn-hình** (thiệp, splash): ghim cứng bằng JS theo `visualViewport.height`
  (bỏ qua khi `scale ≠ 1` để không vỡ lúc pinch-zoom), rồi `overflow-y:hidden` khi vừa khít.
  Mẫu tham chiếu: `lockViewport()/settle()/fitCard()` trong `docs/birthday-card*.html`.
- Khi buộc phải cho cuộn, đổi `align-items:center` → `flex-start`, nếu không flex centering
  sẽ **cắt mất phần trên** không cuộn tới được.

### 6.3 Service worker của `/profile/` là cache-first
`profile/sw.js` precache `./index.html` và trả cache trước. **Mọi thay đổi trong `profile/`
đều phải bump `CACHE_NAME`** (`nqd-portfolio-v4` hiện tại), nếu không máy đã cài PWA sẽ
không bao giờ thấy bản mới. Sau khi bump, lần mở đầu vẫn ra bản cũ, lần hai mới ăn bản mới.

### 6.4 "Đã push mà không thấy đổi"
GitHub Pages cache HTML ~10 phút. Verify bằng tab ẩn danh / hard refresh trước khi kết luận
deploy hỏng. Kiểm tra nhanh: `curl -s https://ducnguyen.vn/<path> | grep <marker>`.

### 6.5 URL không đuôi
Muốn `/foo` chạy thì đặt `foo/index.html` (dạng thư mục), không phải `foo.html`.

### 6.6 Trang riêng tư
Trang chỉ chia sẻ qua link (`profile/company/`, `docs/birthday-card*.html`):
`<meta name="robots" content="noindex, nofollow">` **và** không link từ hub nào.

## 7. Trước khi giao (checklist)
- [ ] Không còn link `/my-project` (đã chuyển `/project`).
- [ ] `python -m http.server` ở gốc → mở `/`, `/atlas/`, `/profile/`, `/project/`, `/docs/`:
      200, không lỗi console (trừ `/news/*` và `favicon.ico` mặc định).
- [ ] Link checker không báo gãy nội bộ (news là ngoại lệ).
- [ ] Trang mới: theo `DESIGN.md` §12 checklist.
- [ ] Trang mới có khối `dn-scroll-fix` (§6.1).
- [ ] Test ở viewport dọc **và** ngang (320×568, 390×844, 844×390): `scrollHeight` không
      vượt `innerHeight`, ép `window.scrollTo(0,99999)` xong `scrollY` vẫn = 0 (§6.2).
- [ ] Có động vào `profile/` → đã bump `CACHE_NAME` trong `profile/sw.js` (§6.3).

## 8. KHÔNG làm
- Không xóa repo standalone đã archive (giữ lịch sử).
- Không gộp `news` vào đây.
- Không tạo màu/font mới ngoài hệ token nếu chưa cần.
- Không sửa nội dung trang PROTECTED khi chưa được yêu cầu rõ.
