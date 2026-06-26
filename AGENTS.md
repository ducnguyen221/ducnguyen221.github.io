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

## 6. Trước khi giao (checklist)
- [ ] Không còn link `/my-project` (đã chuyển `/project`).
- [ ] `python -m http.server` ở gốc → mở `/`, `/atlas/`, `/profile/`, `/project/`, `/docs/`:
      200, không lỗi console (trừ `/news/*` và `favicon.ico` mặc định).
- [ ] Link checker không báo gãy nội bộ (news là ngoại lệ).
- [ ] Trang mới: theo `DESIGN.md` §12 checklist.

## 7. KHÔNG làm
- Không xóa repo standalone đã archive (giữ lịch sử).
- Không gộp `news` vào đây.
- Không tạo màu/font mới ngoài hệ token nếu chưa cần.
- Không sửa nội dung trang PROTECTED khi chưa được yêu cầu rõ.
