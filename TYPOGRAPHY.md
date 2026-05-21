# Hướng Dẫn Sử Dụng Font Chữ Tiếng Việt Đồng Bộ (Typography Guidelines)

Tài liệu này quy định việc cấu hình và đồng bộ hóa hệ thống font chữ tiếng Việt cho toàn bộ các trang portfolio và visualization (như `profile`, `atlas`, `docs`, `my-project`,...).

---

## 1. Vấn Đề Gặp Phải
Tiếng Việt có hệ thống nguyên âm phức tạp với các dấu thanh và dấu phụ chồng lên nhau (ví dụ: `ở, ử, ế, ự`). Nhiều font chữ không hỗ trợ đầy đủ các ký tự này, dẫn đến:
- **Lỗi hiển thị (mất nét)** hoặc tự động chuyển sang font hệ thống mặc định (fallback) cho các ký tự có dấu.
- **Bị cắt góc (clipping)** dấu phụ do khoảng cách dòng (`line-height`) quá hẹp hoặc thiết kế glyph của font không tương thích với tiếng Việt.

---

## 2. Hệ Thống Font Khuyến Nghị

Hệ thống portfolio sử dụng 3 font chữ chuyên biệt để tối ưu hóa trải nghiệm đọc:

| Mục đích sử dụng | Tên Font | Lý do lựa chọn |
| :--- | :--- | :--- |
| **Nội dung chính (Body Text)** | **Be Vietnam Pro** | Được thiết kế bởi các designer Việt Nam, tối ưu hóa hiển thị và khoảng cách cho dấu tiếng Việt. Không bị lỗi nhảy dòng, lệch dấu. |
| **Tiêu đề (Headings)** | **Plus Jakarta Sans** | Font hình học không chân (geometric sans-serif) hiện đại, mang phong cách công nghệ cao cấp, tạo điểm nhấn mạnh mẽ. |
| **Mã nguồn & Cấu trúc (Code/Mono)** | **JetBrains Mono** | Font chữ đơn cách chuyên nghiệp dành cho lập trình viên, cực kỳ dễ đọc và căn chỉnh cấu trúc. |

---

## 3. Cách Tích Hợp

### Bước 1: Khai báo CDN trong thẻ `<head>` của các file HTML
Sao chép mã sau và đặt ở trên cùng phần `<head>` của trang web:

```html
<!-- Google Fonts Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Imports: Plus Jakarta Sans (Headings), Be Vietnam Pro (Body), JetBrains Mono (Code) -->
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
```

### Bước 2: Cấu hình biến CSS (`:root`)
Khai báo các biến font chữ trong CSS của bạn:

```css
:root {
  /* Định nghĩa các lớp Font */
  --font-body: 'Be Vietnam Pro', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-heading: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
}
```

### Bước 3: Áp dụng vào phần tử

```css
body {
  font-family: var(--font-body);
  /* Quan trọng để không bị cắt dấu tiếng Việt: */
  line-height: 1.6; 
  letter-spacing: -0.01em;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 800;
  letter-spacing: -0.02em;
}

code, pre, .mono-text {
  font-family: var(--font-mono);
  font-size: 0.85em;
}
```

---

## 4. Lưu ý quan trọng
1. **Line-height:** Đối với font tiếng Việt, không nên đặt `line-height` nhỏ hơn `1.4` cho văn bản dài, vì các dấu phụ (như `~`, `^`, `?`) có thể đè lên chữ dòng trên hoặc bị che khuất. Khuyến nghị dùng `1.5` đến `1.7`.
2. **Font-weight:** `Be Vietnam Pro` hỗ trợ đầy đủ các trọng số từ `100` đến `900`. Hạn chế dùng `font-weight: bold` chung chung, thay vào đó hãy chỉ định rõ con số cụ thể như `500` (Medium), `600` (SemiBold), hoặc `700` (Bold) để nét chữ đẹp mắt nhất.
