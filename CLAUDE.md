# CLAUDE.md — ducnguyen.vn

> Brief tự động nạp cho agent (Claude Code) khi làm việc trong repo này.
> **Quy tắc thiết kế đầy đủ ở [`design.md`](./design.md). Đọc nó trước khi tạo/sửa UI.**

## Dự án là gì
`ducnguyen.vn` = hub cá nhân + portfolio, đồng bộ với GitHub Pages của
`ducnguyen221`. Phần lớn là **HTML tĩnh**. Có một **design system dùng chung**
để mọi trang nhất quán: hiện đại – công nghệ – dễ đọc, dark/light, song ngữ VI–EN.

## Luật vàng khi tạo/sửa bất kỳ trang nào
1. Link 3 file: `assets/tokens.css`, `assets/components.css`, `assets/theme.js`.
2. `<html data-theme="dark" data-page="…">` với page ∈ `home|profile|atlas|news|lab`.
3. **Chỉ dùng biến CSS (token)** cho màu/khoảng cách/bo góc — không hardcode hex/px.
4. Font: heading `--font-display`, thân `--font-sans`, nhãn kỹ thuật `--font-mono`.
5. Tái dùng component có sẵn (`.btn .card .repo .badge .nav .dn-window .stat`…).
6. Text hiển thị có cặp `data-vi` / `data-en` để chuyển ngữ.
7. Icon: Material Symbols Rounded. Ảnh thiếu → placeholder sọc + nhãn mono.
8. Futuristic ở mức **tinh tế**: grid mờ, mono label, glow nhẹ. Không gradient
   lòe loẹt, không emoji ngoài ý đồ. Tương phản đạt WCAG AA ở cả 2 theme.

## Bắt đầu nhanh
- Copy template gần nhất trong `templates/` → đổi `data-page` + nội dung.
- Xem token & component trực quan: mở `styleguide.html`.
- Trước khi giao: chạy checklist ở cuối `design.md` (§12).

## Dữ liệu GitHub (trang home)
- Home đọc `data/repos.json` (sinh bởi `scripts/build-repos.mjs`).
- Ghim repo tiêu biểu ở `FEATURED` trong script; repo public còn lại quét tự động.
- **Ẩn cây tệp** — chỉ hiện info repo + vài HTML mới nhất (`latest`).
- Shape dữ liệu: `data/repos.schema.md`. Đừng sửa `repos.json` bằng tay.

## Cấu trúc repo
```
CLAUDE.md / AGENTS.md   ← brief cho agent (file này)
design.md               ← đặc tả design system đầy đủ
styleguide.html         ← showcase token + component
assets/                 ← tokens.css · components.css · theme.js · home-data.js
templates/              ← home · profile · atlas · daily-ai-news · my-project
data/                   ← repos.json (+ schema)
scripts/                ← build-repos.mjs
.github/workflows/      ← refresh-repos.yml (cron đồng bộ GitHub)
```

## Không làm
- Không tạo màu/font mới ngoài hệ token nếu chưa cần.
- Không thêm nội dung/section “lấp chỗ trống” — hỏi chủ repo trước.
- Không sao chép token vào từng file; luôn link `assets/`.
