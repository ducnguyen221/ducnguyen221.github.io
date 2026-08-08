# AGENTS.md — /atlas (override/bổ sung)

> Kế thừa [`../AGENTS.md`](../AGENTS.md). Atlas = blog/visualization tri thức, phục vụ tại
> `https://ducnguyen.vn/atlas/`. **PROTECTED**: không hand-edit nội dung & link.

## Quy tắc riêng
- **Nội dung do pipeline quản lý.** Bài viết nằm ở `content/<category>/<slug>.html`, được
  pipeline Tobi (ngoài repo) sinh & push. **Không** sửa tay `content/*`.
- **`data/manifest.json` là file SINH RA** bởi `scripts/generate-manifest.js` (quét `content/`,
  lấy `<title>` + `<meta description>`). Không sửa tay; chạy lại script để cập nhật.
- Path trong manifest là **tương đối** (`content/...`) và **đúng** vì `index.html` phục vụ tại
  `/atlas/`. Giữ nguyên — không thêm tiền tố `atlas/`.
- Category hợp lệ: `strategy, ai, ba, da, de, bi, elearning, coding, automation, instruction, other`
  (đồng bộ với `404.html` gốc của site cho SPA fallback `/atlas/<cat>/`).
- Khi sửa thiết kế atlas (hiếm): chỉ trong `assets/styles.css` + `assets/main.js`; giữ topbar/footer.

## Pipeline (tham chiếu nhanh)
`publish-tobi.ps1` copy `atlas.html`→`content/<cat>/<slug>.html`, chạy `generate-manifest.js`,
git push. Sau cutover monorepo: `$ATLAS` phải trỏ vào thư mục này (xem `../MIGRATION.md`).
