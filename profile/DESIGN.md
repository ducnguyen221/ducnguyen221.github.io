# DESIGN.md — /profile (khác biệt so với home)

> Đọc gốc [`../DESIGN.md`](../DESIGN.md). Đây chỉ liệt kê điểm KHÁC. **Cố ý giữ hệ riêng.**

- **Stack khác hệ chung**: **Tailwind CDN** (utility-first) + **Material Symbols** + CSS phụ
  `./assets/css/subpage-shell.css`. Không dùng inline token `#04060a` như home/project.
- **PWA**: `manifest.json` + `sw.js`; `start_url: ./index.html`.
- Mood: hồ sơ chuyên môn, tông xanh dương (theo north-star §7 `profile`), mật độ cao, nhiều
  card lưới + KPI + timeline + LMS + social.
- **Không nằm trong phạm vi chuẩn hoá design** của đợt gộp monorepo (yêu cầu của chủ repo).
  Nếu sau này muốn đồng bộ token, làm riêng và kiểm thử kỹ vì Tailwind khác mô hình token.
