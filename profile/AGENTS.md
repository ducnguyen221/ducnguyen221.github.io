# AGENTS.md — /profile (override/bổ sung)

> Kế thừa [`../AGENTS.md`](../AGENTS.md). E-profile phục vụ tại `https://ducnguyen.vn/profile/`.
> **PROTECTED + loại khỏi chuẩn hoá design**: không tái cấu trúc, không đổi nội dung/link.

## Quy tắc riêng
- **Self-contained PWA**: có `manifest.json` + `sw.js` (service worker, cache). Khi sửa asset,
  nhớ logic cache của `sw.js` (có thể phải bump cache version) — nhưng mặc định **không đụng**.
- Điều hướng nội bộ dùng **link tương đối `./*.html`** (`experience/projects/courses/socials/
  solutions/powerbi`) → an toàn khi nằm trong thư mục `/profile/`.
- Liên kết ra ngoài: nút Home trỏ `https://ducnguyen.vn` (tuyệt đối, đúng).
- Ảnh/asset ở `./assets/...`; nhiều trang khác (home, atlas) **trỏ vào ảnh của profile**
  (`/profile/assets/images/...`) → **không đổi tên/di chuyển** các ảnh này.
