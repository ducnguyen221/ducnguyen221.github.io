# CLAUDE.md — ducnguyen.vn (monorepo)

> Claude Code tự nạp file này mỗi phiên. Nội dung hướng dẫn agent ĐẦY ĐỦ đã được hợp nhất
> vào **[`AGENTS.md`](./AGENTS.md)** (master). File này chỉ là con trỏ để tránh lệch phiên bản.

## Đọc trước khi làm bất cứ việc gì
1. **[`AGENTS.md`](./AGENTS.md)** — repo là gì, bản đồ thư mục, luật vàng, trang PROTECTED,
   pipeline Atlas, news tách riêng, checklist.
2. **[`DESIGN.md`](./DESIGN.md)** — hệ thống thiết kế chung (+ `TYPOGRAPHY.md`).
3. `AGENTS.md` / `DESIGN.md` trong từng thư mục con — bổ sung/ghi đè cho trang đó.

## Nhắc nhanh (chi tiết ở AGENTS.md)
- Monorepo phục vụ `ducnguyen.vn` qua GitHub Pages; mỗi thư mục = 1 path (`/atlas`, `/profile`,
  `/project`, `/docs`). `news` là **repo riêng**, không gộp.
- **PROTECTED** (không sửa nội dung/link): `atlas/`, `profile/`, `docs/`.
- Đổi tên thư mục = đổi URL → thêm redirect ở `404.html` gốc.
- Static-first, giữ `.nojekyll`. Trước khi giao: chạy local server + link check (AGENTS §7).
- **Đọc AGENTS §6 "Bẫy đã gặp" trước khi sửa frontend**: khối `dn-scroll-fix` bắt buộc ở mọi
  trang, bẫy `100vh` trên mobile, `profile/sw.js` cache-first phải bump `CACHE_NAME`.
