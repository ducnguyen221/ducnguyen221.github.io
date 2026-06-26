# AGENTS.md — /project (override/bổ sung)

> Kế thừa [`../AGENTS.md`](../AGENTS.md). Hub liệt kê HTML nhỏ, phục vụ tại
> `https://ducnguyen.vn/project/`. (Đổi tên từ `my-project`.) **Editable** — đây là trang
> được chuẩn hoá design để đồng bộ với home.

## Quy tắc riêng
- **Gallery render từ mảng JS `pages[]`** trong `index.html`. Thêm file HTML mới = (1) bỏ file
  vào thư mục này, (2) **đăng ký 1 entry trong `pages[]`** (name, file, nhóm, mô tả).
- Mỗi app/dashboard/game là **HTML self-contained**, link tài nguyên **cùng thư mục** (vd
  `styles.css`, `script.js`) → an toàn vì cùng nằm trong `/project/`.
- Topbar có **site-nav chéo** (Home/Atlas/News/Profile/Docs) — giữ để các trang liên kết nhau.
- Link cũ `/my-project/*` được `404.html` gốc redirect sang `/project/*`; **không** tự thêm thư
  mục `my-project/` ở đây.
