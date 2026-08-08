# AGENTS.md — /docs (override/bổ sung)

> Kế thừa [`../AGENTS.md`](../AGENTS.md). Tài liệu/demo public, phục vụ tại
> `https://ducnguyen.vn/docs/`. **PROTECTED**: không sửa nội dung/link.

## Quy tắc riêng
- Tập hợp **mockup/demo độc lập**: CRM screens `SC100..SC900_*.html`, `bdsmo-*-v2.html`,
  `birthday-card*.html`, và `index.html` làm trang đích.
- Mỗi file **self-contained**, link tài nguyên cùng thư mục → an toàn trong `/docs/`.
- Không có pipeline tự động; cập nhật thủ công khi có yêu cầu rõ.
- Repo nguồn cũ tên `compa-crm-public` (mô tả "COMPA CRM").

## Thiệp chúc mừng (`birthday-card*.html`)
Trang **riêng tư chia sẻ qua link**: `noindex, nofollow` + **không** link từ `index.html`
hay hub nào. Ảnh nhúng base64 → mở offline vẫn chạy, gửi Zalo/Messenger được.

| File | Người nhận | Theme |
|---|---|---|
| `birthday-card.html` | Chủ tịch Vũ — Agribank | đỏ/vàng |
| `birthday-card2.html` | Chủ tịch Nguyễn Tiến Hải — ABIC (Bảo hiểm Agribank) | xanh/vàng |

Cả hai dùng chung khung: phong bì niêm phong → click mở → pháo hoa canvas + confetti →
thiệp reveal theo `.d1..d7`. Khi tái tạo bản mới, **copy khung rồi chỉ đổi token màu +
nội dung**, đừng viết lại.

**Bắt buộc giữ (đừng “dọn” đi):**
- `lockViewport()` / `settle()` / `fitCard()` — thiệp là trang **một-màn-hình**, không được
  cuộn tuột xuống nền trống. Xem `../AGENTS.md` §6.2 để biết vì sao `100vh` không đủ.
- `@media (prefers-reduced-motion)` chỉ được **giảm** hiệu ứng, **không** ẩn phong bì hay
  nội dung — đã từng làm cả thiệp biến mất trên máy bật Reduce Motion.
- Đo lại sau mỗi lần sửa: ép `window.scrollTo(0,99999)` → `scrollY` phải = 0 ở cả dọc và ngang.

**Chuẩn bị ảnh** (làm ở `%TEMP%`, xoá sau khi xong — không để file rác trong repo):
- Chân dung: crop cận mặt tỉ lệ 4:5, khung hiển thị 160×200.
- Logo có nền: tách bằng **chroma-key** (`max-min` kênh màu), đừng dùng ngưỡng độ sáng —
  logo có cả mảng vàng/trắng sáng ngang nền. Gate chroma + `MaxFilter` để giữ viền
  anti-alias mà vẫn loại watermark nhạt.
