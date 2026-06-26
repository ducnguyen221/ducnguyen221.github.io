# DESIGN.md — /project (khác biệt so với home)

> Đọc gốc [`../DESIGN.md`](../DESIGN.md). Trang này **đồng bộ chặt** với home.

- **Dùng CHUNG hệ với home**: nền `#04060a`, dark theme, font Plus Jakarta Sans + Be Vietnam
  Pro + JetBrains Mono, motif topbar `.brand` + `.nav`, card, mono label, canvas nền AI.
- Khác biệt chính: là **file browser/gallery** — render lưới thẻ từ `pages[]`, có filter nhóm,
  nút mở trang trực tiếp. (north-star §7 gọi mood này là `lab`, xanh lá; hiện theo tông home.)
- Đã thêm khi gộp monorepo: `<link rel="icon" href="/favicon.svg">`, canonical `/project/`,
  site-nav chéo, sửa branding footer `ducnguyen.vn/project`.
- Khi tách `assets/tokens.css` chung (định hướng ở gốc), trang này nên là trang đầu link vào
  vì đã trùng token với home.
