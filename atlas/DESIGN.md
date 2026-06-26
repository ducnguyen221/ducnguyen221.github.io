# DESIGN.md — /atlas (khác biệt so với home)

> Đọc gốc [`../DESIGN.md`](../DESIGN.md). Đây chỉ liệt kê điểm KHÁC.

- **Hệ style riêng**: `assets/styles.css` + `assets/main.js` (không dùng inline token như home).
- **Icon**: FontAwesome 6 CDN (home/project dùng SVG inline / Material Symbols).
- **Mood**: tri thức/điềm tĩnh, tông tím (theo north-star §7 `atlas`).
- **Bố cục**: lưới card bài viết render từ `data/manifest.json`; filter theo `?cat=`; trang đọc
  dài cho từng bài trong `content/`.
- **Có `404.html` riêng** trong thư mục (lịch sử) NHƯNG GitHub Pages chỉ dùng `/404.html` gốc;
  logic SPA category đã được nhân bản ở 404 gốc. Đừng dựa vào `atlas/404.html` cho production.
- Link tác giả hiện trỏ `https://ducnguyen221.github.io/profile/` (redirect về ducnguyen.vn) —
  giữ nguyên (PROTECTED); có thể đổi thành `/profile/` trong lần cải thiện được duyệt sau.
