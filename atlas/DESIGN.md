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

## Ngoại lệ so với Design System v1.0 (SPR-03, 10/2026)

- Atlas **giữ font Outfit và nhận diện tối riêng** (quyết định của chủ site): không thêm chế độ sáng, không đổi font/màu/bố cục.
- Chỉ phần không nhìn thấy được đồng bộ: thẻ chia sẻ `og:*` dùng ảnh chung `/assets/dn/v1/og-default.png`, `og:url` = `/atlas/`, và giữ chỗ chiều cao (`.hero`, `.stats-strip` trong `assets/styles.css`) để chống dịch bố cục (CLS).
- Các file dùng chung của họ Web nằm ở `assets/dn/v1/` (tokens, buttons, theme.js); `theme.js` nhận `data-dn-default="light"` trên `<html>` để trang mặc định sáng (dùng ở `docs/index.html`).
