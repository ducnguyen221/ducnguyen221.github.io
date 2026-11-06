
# Google Antigravity cho người mới: từ folder đầu tiên đến trợ lý công việc có quy tắc

Bạn không cần biết lập trình để nhờ Google Antigravity đọc brief, tóm tắt quy trình, soạn bản nháp hay tìm lại một thông tin đã ghi. Hãy bắt đầu bằng một folder nhỏ, tách nguồn với kết quả, và giao việc theo từng bước. Bài này dùng doanh nghiệp giả lập **Xưởng Trà Mộc**; bạn có thể thay bằng tài liệu mình được phép sử dụng sau khi hoàn thành bài tập.

> **Mục tiêu:** tạo workspace trên máy, nạp bốn file mẫu, tóm tắt công việc có dẫn nguồn, tạo hướng dẫn chung, thử một skill và tra lại thông tin trong Brain nhỏ.
>
> **Ngày đối chiếu tài liệu chính thức: 06/11/2026.** Tên nút có thể thay đổi giữa phiên bản và hệ điều hành. Mở [Getting Started](https://antigravity.google/docs) nếu giao diện hiện tại khác.

## 1. Cài ứng dụng và chọn folder local

**Mục tiêu:** cài Antigravity và mở đúng một folder do bạn kiểm soát.

1. Mở [antigravity.google/download](https://antigravity.google/download) và chọn đúng **Antigravity App**, không chọn bản CLI hoặc IDE cho bài này. Tại ngày kiểm tra, yêu cầu là Windows 10 64-bit trở lên (x64 hoặc ARM64), macOS 12 Monterey trở lên (Apple Silicon hoặc Intel).
2. Mở gói tải xuống, hoàn tất cài đặt rồi khởi chạy ứng dụng và đăng nhập.
3. Trong File Explorer hoặc Finder, chọn một vị trí local mà bạn quản lý. Không mặc định dùng Documents/Desktop vì chúng có thể đồng bộ cloud. Tạo folder `TRO_LY_CONG_VIEC` tại vị trí local bạn chọn. Ví dụ đường dẫn trên một máy thử có thể là `C:\Users\An\AI_WORKSPACE\TRO_LY_CONG_VIEC`; hãy thay bằng đường dẫn thật trên máy của bạn.
4. Tạo **năm folder** `INPUT`, `REFERENCE`, `WORKING`, `OUTPUT`, `ARCHIVE` bằng File Explorer/Finder. Cây sau thể hiện cả hai file `README.md` và `AGENTS.md` sẽ được lưu bằng mẫu ở phần 3; không tạo folder mang tên hai file này:

```text
TRO_LY_CONG_VIEC/
├── README.md
├── AGENTS.md
├── INPUT/
├── REFERENCE/
├── WORKING/
├── OUTPUT/
└── ARCHIVE/
```

Chưa tạo `PROJECTS/`, `BRAIN/` hoặc `.agents/skills/`; ta chỉ thêm chúng ở phần mở rộng sau. Không cần Terminal, Git, API key hay plugin.

5. Trong Antigravity, bấm tạo Project (Getting Started hiện mô tả biểu tượng folder có dấu `+` → `New Project` → `Add Folder`). Chọn chính xác `TRO_LY_CONG_VIEC`, rồi `Create`. Nếu được chọn mode, dùng Local Mode cho bài này. Giữ quyền mặc định; không bật chế độ toàn máy hay mở rộng quyền vượt folder.

**Prompt kiểm tra vị trí, chưa đọc/ghi gì:**

```text
Tôi mới dùng Antigravity. Hãy xác nhận tên và đường dẫn đầy đủ của folder Project vừa mở. Chưa đọc, tạo, sửa, di chuyển hay xóa file. Nếu bạn không thấy đường dẫn, chỉ tôi chỗ xem trong giao diện.
```

**Kết quả mong đợi:** tên và đường dẫn khớp với folder bạn vừa chọn. Nếu sai, đóng task, chọn lại đúng folder trong Project; không tiếp tục khi chưa rõ agent đang nhìn thấy vùng nào.

## 2. Tạo bốn tài liệu giả lập

**Mục tiêu:** có input cụ thể để tập phân loại và tóm tắt. Đây là toàn bộ nội dung mẫu; hãy tạo file trong Notepad/TextEdit hoặc trình soạn thảo văn bản và lưu đúng đường dẫn.

**Lưu đúng file văn bản — làm một lần trước khi tiếp tục:**

- **Windows / Notepad:** chọn File → Save As; nhập tên đầy đủ, ví dụ `gioi-thieu-san-pham.md`; chọn **Save as type: All files**, **Encoding: UTF-8**. Trong File Explorer bật View → Show → File name extensions để kiểm tra tên không thành `.md.txt`.
- **macOS / TextEdit:** chọn Format → **Make Plain Text** trước khi dán; chọn File → Save, gõ đủ tên có `.md`. Nếu ứng dụng hỏi dùng đuôi nào, chọn giữ `.md`; bỏ tùy chọn tự thêm `.txt` nếu có. Trong Finder → Settings → Advanced bật **Show all filename extensions**, kiểm tra file không phải `.rtf` hoặc `.md.txt`.
- README và AGENTS trong cây là **file**, không phải folder. Bạn điền mẫu ở phần 3 rồi lưu chúng ở root. “Root” nghĩa là ngay trong `TRO_LY_CONG_VIEC/`, cùng cấp với `INPUT/`.
- Khi tới bước skill, tên folder là `.agents`, có dấu chấm đầu tên. Finder dùng **Command–Shift–.** để hiện file ẩn; trên Windows bật **View → Show → Hidden items** nếu cần. Nếu trình duyệt file không cho tạo tên đó, nhờ agent tạo đúng folder trong workspace đã chọn, rồi mở lại để kiểm tra; không bỏ dấu chấm.

Trong prompt bên dưới, đường dẫn như `INPUT/ten-file.md` được tính từ root workspace đã xác minh. Dùng dấu `/` cho đường dẫn trong prompt trên cả hai hệ điều hành; không ghép đường Windows vào Mac. Khi thấy `[DUONG_DAN_DAY_DU]`, thay bằng đường dẫn thật của chính bạn; trên Mac có thể là `/Users/An/AI_WORKSPACE/TRO_LY_CONG_VIEC`.


File `INPUT/gioi-thieu-san-pham.md`:

```markdown
# Giới thiệu sản phẩm — Xưởng Trà Mộc

> Dữ liệu giả lập cho bài tập. Không đại diện cho doanh nghiệp thật.

Xưởng Trà Mộc là thương hiệu hư cấu bán trà lá đóng gói tại Việt Nam.

## Sản phẩm trong bài tập
- Tên: Trà Sen Sớm
- Quy cách: hộp 20 túi lọc
- Giá niêm yết giả định: 120.000 đồng/hộp
- Mô tả được phép dùng: trà hương sen dịu, đóng gói tiện để pha tại nhà hoặc nơi làm việc

## Chưa xác nhận
- Chưa có số liệu kiểm nghiệm thành phần.
- Chưa có chứng nhận hữu cơ.
- Chưa có dữ liệu khách hàng hoặc đánh giá thật.
```

File `INPUT/quy-trinh-xu-ly-yeu-cau.md`:

```markdown
# Quy trình xử lý yêu cầu — bản nháp giả lập

> Quy trình hư cấu để luyện tập; chưa phải hướng dẫn vận hành thật.

1. Ghi nhận nội dung và ngày nhận yêu cầu.
2. Phân loại: hỏi thông tin, đổi đơn, phản hồi chất lượng hoặc yêu cầu khác.
3. Nếu thiếu mã đơn hoặc mô tả, hỏi người gửi bổ sung; không đoán.
4. Chuyển trường hợp chất lượng cho người phụ trách xem xét.
5. Chỉ thông báo kết quả sau khi người phụ trách xác nhận.
6. Lưu bản tóm tắt đã duyệt trong hồ sơ dự án.

Không đưa dữ liệu cá nhân vào bài tập này.
```

File `INPUT/bien-ban-hop-2026-11-06.md`:

```markdown
# Biên bản họp giả lập — 06/11/2026

**Dự án:** thử nội dung giới thiệu Trà Sen Sớm của Xưởng Trà Mộc (hư cấu)

## Trao đổi
- Nhóm muốn thử một nội dung giới thiệu sản phẩm trong ba tuần.
- Hai kênh được cân nhắc: email và fanpage.
- Chưa có ngân sách được duyệt.
- Chưa có số liệu chuyển đổi hoặc khách hàng thực.

## Việc cần xác nhận
- Ai duyệt nội dung trước khi gửi/đăng.
- Ngân sách và thời gian bắt đầu.
- Chỉ số nào có thể đo trong từng kênh.

## Quyết định
Chưa chốt lịch phát hành. Không đăng hoặc gửi nội dung khi chưa được người phụ trách duyệt.
```

File `INPUT/yeu-cau-cong-viec.md`:

```markdown
# Yêu cầu công việc giả lập

Hãy chuẩn bị bản tóm tắt một trang để người phụ trách quyết định có nên thử nội dung giới thiệu Trà Sen Sớm trong ba tuần hay không.

Bản tóm tắt cần có:
- Mục tiêu dự kiến và đối tượng cần làm rõ.
- Hai kênh đang cân nhắc.
- Những thông tin đã có và nguồn của chúng.
- Những điều chưa được xác nhận.
- Các câu hỏi người phụ trách cần quyết định.

Không tự viết nội dung quảng cáo hoàn chỉnh, không gửi email, không đăng fanpage, không tự đặt ngân sách hoặc tuyên bố về tác dụng/chứng nhận sản phẩm.
```

**Markdown (`.md`) là gì?** Tệp văn bản thường, có thể mở bằng Notepad hoặc TextEdit. Dấu `#` tạo tiêu đề, dấu `-` tạo danh sách. Tên file ở trên cần viết đúng để prompt dẫn đường chính xác.


## 3. Phân loại và tạo README/AGENTS

**Mục tiêu:** giúp agent biết file nào là nguồn, nơi nào được ghi, và khi nào phải hỏi.

Dùng prompt sau; thay `[DUONG_DAN_DAY_DU]` bằng đường dẫn thật đã kiểm tra ở phần 1 (ví dụ `C:\Users\An\AI_WORKSPACE\TRO_LY_CONG_VIEC`). Prompt chỉ yêu cầu đề xuất phân loại, không di chuyển file.

```text
Workspace của tôi là [DUONG_DAN_DAY_DU]. Chỉ đọc bốn file sau và không thay đổi file nào:
- INPUT/gioi-thieu-san-pham.md
- INPUT/quy-trinh-xu-ly-yeu-cau.md
- INPUT/bien-ban-hop-2026-11-06.md
- INPUT/yeu-cau-cong-viec.md

Lập bảng gồm tên file, loại thông tin, nơi nên tra cứu về sau, lý do. Chưa di chuyển, đổi tên, sửa hoặc xóa file. Đánh dấu dữ kiện hư cấu và chỗ chưa được xác nhận.
```

**Kết quả mong đợi:** bốn file được nhận diện, nguồn còn ở `INPUT/`, không có hành động ghi. Nếu đường dẫn hoặc tên file sai, mở File Explorer/Finder, copy đường dẫn thực và sửa prompt. Không duyệt rộng cả Documents.


### Thực hành sắp xếp sau khi xem bảng phân loại

Trong bài này, giữ bản gốc ở INPUT. Bạn sẽ tạo một **bản sao có kiểm soát** của tài liệu sản phẩm trong REFERENCE để tập quản lý nguồn. Đây vẫn là dữ liệu giả lập; xác nhận bản sao đúng nội dung không biến thông tin thành dữ liệu doanh nghiệp thật. File quy trình đang là nháp nên chưa đưa vào nguồn chuẩn.

Chỉ gửi prompt sau nếu bạn đồng ý đúng phương án này:

```text
Tôi duyệt đúng các việc sau trong workspace hiện tại:
1. Sao chép INPUT/gioi-thieu-san-pham.md thành REFERENCE/gioi-thieu-san-pham.md, giữ nguyên nhãn giả lập. Nếu file đích đã tồn tại thì dừng và báo, không ghi đè.
2. Tạo REFERENCE/README.md ghi: đây là bản sao thực hành từ INPUT/gioi-thieu-san-pham.md, ngày sao 2026-11-06, chưa phải dữ liệu doanh nghiệp thật. INPUT giữ bản gốc để đối chiếu; không duy trì hai bản rồi sửa độc lập.
3. Đọc lại và đối chiếu nội dung bản sao với bản gốc; báo tên file vừa tạo và kết quả.
Không sửa, chuyển, đổi tên hoặc xóa bất kỳ file gốc nào. Không thao tác ngoài hai file đích nêu trên.
```

**Tự kiểm:** mở hai bản sản phẩm trong File Explorer/Finder; nội dung giống nhau và cả hai vẫn ghi “giả lập”. REFERENCE có một README ghi nguồn gốc. Các bài tóm tắt và Brain tiếp theo cố ý truy về bản gốc trong INPUT để dễ kiểm chứng. Khi dùng công việc thật, chỉ định một bản chuẩn và dùng liên kết tới nó.

Tạo `README.md` ở root để người và agent cùng hiểu dự án:

```markdown
# Trợ lý công việc — Xưởng Trà Mộc (dữ liệu giả lập)

## Mục tiêu
Thực hành phân loại tài liệu và tạo bản tóm tắt có dẫn nguồn. Không phải dự án của doanh nghiệp thật.

## Bản đồ folder
- `INPUT/`: tài liệu mới đưa vào; giữ nguyên bản gốc.
- `REFERENCE/`: thông tin/quy trình đã được người phụ trách xác nhận.
- `WORKING/`: bản nháp đang làm, chưa phải nguồn chuẩn.
- `OUTPUT/`: kết quả để người phụ trách xem và duyệt.
- `ARCHIVE/`: phiên bản cũ còn giá trị tra cứu, không phải thùng rác.
- `AGENTS.md`: cách agent làm việc trong workspace.

## Đầu việc hiện tại
Tóm tắt yêu cầu giả lập trong `INPUT/yeu-cau-cong-viec.md`; chỉ lưu kết quả sau khi tôi xem bản nháp.
```

Tạo `AGENTS.md` ở cùng root. Antigravity hiện tự phát hiện `AGENTS.md` hoặc `GEMINI.md` trong workspace/parent đến repository root. Dùng một `AGENTS.md` chung; không cần tạo thêm `GEMINI.md` trùng nội dung. File `AGENTS.md` là Markdown thuần, không cần YAML frontmatter.

```markdown
# AGENTS.md — Trợ lý công việc

## Bắt đầu từ đâu
- Đọc `README.md` trước để biết mục tiêu, cây folder và đầu việc.
- Với mỗi task, chỉ đọc file được nêu trong prompt; kiểm tên file và đường dẫn.
- `INPUT/` là nguồn gốc cần giữ. `REFERENCE/` chỉ chứa nguồn đã được người phụ trách xác nhận.

## Tìm và lưu tài liệu
| Khi cần... | Tìm ở... | Chỉ lưu ở... |
|---|---|---|
| Đọc yêu cầu mới hoặc bản gốc | `INPUT/` | Không sửa; không tự move/xóa |
| Dùng thông tin/quy trình đã xác nhận | `REFERENCE/` | Chỉ người phụ trách duyệt nội dung mới vào đây |
| Tiếp tục bản nháp | `WORKING/` | Bản chưa duyệt |
| Lấy kết quả công việc | `OUTPUT/` | Kết quả sau khi tự kiểm; không ghi đè file đã có |
| Tra bản cũ còn giá trị | `ARCHIVE/` | Chỉ sau khi người phụ trách duyệt lưu trữ |

## Tên file và phạm vi
- Tên file dùng chữ thường không dấu, các từ cách bằng dấu gạch ngang. Báo cáo có ngày và phiên bản: `tom-tat-cong-viec-2026-11-06-v01.md`; nếu đã có v01 thì dùng v02, không ghi đè. Tên hệ thống giữ nguyên: README.md, AGENTS.md, SKILL.md và INDEX.md.
- Chỉ làm trong workspace đang mở.
- Giữ nguyên file trong `INPUT/` và `REFERENCE/`.
- Không tự gửi email, đăng bài, chia sẻ, xóa hoặc di chuyển tài liệu.
- Nếu cần quyền ngoài workspace, dừng và giải thích; không tìm cách mở rộng quyền.

## Cách làm và tự kiểm
- Tách điều có trong nguồn, suy luận/đề xuất và điều chưa biết.
- Ghi đường dẫn/tên nguồn cho mỗi ý chính; nêu điều chưa biết và bước tiếp theo, không bịa dữ kiện.
- Trước khi ghi file, nêu tên file và vị trí dự kiến để tôi duyệt.
- Sau khi ghi, mở lại kết quả, so với yêu cầu và nguồn; báo file đã đọc/tạo/sửa và phần cần người kiểm tra.
- Với file cũ, chỉ đề xuất lưu `ARCHIVE/`; không tự lưu trữ hoặc xóa.
```

**Mẫu bridge nghiệp vụ:** README là bản đồ ngắn, AGENTS là hướng dẫn làm việc. Thêm đường dẫn rõ trong README, ví dụ: “Nguồn sản phẩm giả lập đã đối chiếu: `REFERENCE/gioi-thieu-san-pham.md`; bản gốc để truy nguyên: `INPUT/gioi-thieu-san-pham.md`”. Bridge là cách chỉ đường, không làm thay việc kiểm tra agent đã đọc tài liệu. Để tự kiểm việc nạp rule, xem mục Customizations → Rules hoặc hỏi agent liệt kê chỉ dẫn đã nạp; sau khi tạo AGENTS, mở conversation mới.

**Kiểm việc nạp hướng dẫn:** sau khi lưu README và AGENTS, mở conversation mới trong đúng Project, gửi: “Chỉ đọc README.md và AGENTS.md; nêu mục tiêu, nơi được lưu kết quả và việc phải hỏi tôi. Chưa tạo hoặc sửa file.” So câu trả lời với hai file và kiểm phần Rules/hoạt động nếu có.

## 4. Việc đầu tiên: tóm tắt có dẫn nguồn

**Mục tiêu:** tạo kết quả hữu ích mà không chạm vào file gốc.

```text
Workspace: [DUONG_DAN_DAY_DU]. Đọc `README.md`, `AGENTS.md`, rồi chỉ đọc:
- `INPUT/yeu-cau-cong-viec.md`
- `INPUT/gioi-thieu-san-pham.md`
- `INPUT/bien-ban-hop-2026-11-06.md`
- `INPUT/quy-trinh-xu-ly-yeu-cau.md`

Trước hết chỉ hiện bản tóm tắt trong chat, chưa tạo/sửa file. Viết tối đa một trang với mục tiêu, các ý chính kèm tên file nguồn, điều chưa biết, câu hỏi cần xác nhận và các bước tiếp theo. Không tự viết quảng cáo, đặt ngân sách, gửi hoặc đăng nội dung.
```

Đọc câu trả lời. Kiểm tra tên file nguồn, nhất là phần chưa chốt ngân sách/chứng nhận/số liệu. Khi nội dung đã đúng, cho phép ghi đúng một file:

```text
Lưu bản tóm tắt vừa duyệt tại `OUTPUT/tom-tat-cong-viec-2026-11-06-v01.md`. Chỉ tạo file này, không thay đổi file khác. Trong bản tóm tắt đặt tên file nguồn cạnh từng thông tin quan trọng. Sau khi lưu, mở lại file và báo cáo kết quả tự kiểm.
```

**Kết quả mong đợi:** một bản tóm tắt trong `OUTPUT/`, có nguồn/đường dẫn và câu hỏi chưa có đáp án. Nếu agent khẳng định điều không có trong tài liệu, yêu cầu chỉ ra file và câu chứng minh; nếu không có căn cứ, xóa kết luận đó khỏi bản nháp trước khi duyệt.

## 5. Đóng gói một quy trình thành skill

**Mục tiêu:** tạo hướng dẫn dùng lại cho việc tóm tắt tài liệu. Một skill là folder có `SKILL.md`; tài liệu hỗ trợ có thể đặt trong `references/`.

Với Antigravity App hiện tại, skill riêng workspace nằm ở `.agents/skills/<tên-skill>/`. Tạo folder này trong root workspace; dấu chấm đầu tên `.agents` có thể khiến folder bị ẩn trong một số trình duyệt file. Antigravity thấy metadata skill (tên/mô tả) để tự chọn đọc nội dung nếu task phù hợp. Cũng có thể gọi thủ công bằng `/<tên-skill>`.

```text
TRO_LY_CONG_VIEC/.agents/skills/tom-tat-tai-lieu/
├── SKILL.md
└── references/
    └── mau-tom-tat.md
```

File `SKILL.md` đầy đủ:

```markdown
---
name: tom-tat-tai-lieu
description: Summarizes a named set of business documents with source paths, unknowns, and next questions. Use when preparing a decision summary from files in a workspace.
---

# Tóm tắt tài liệu có nguồn

1. Đọc README.md để hiểu mục tiêu và giới hạn.
2. Chỉ mở các file nguồn được người dùng nêu tên; ghi lại đường dẫn.
3. Tách dữ kiện có trong file, đề xuất và điều chưa biết.
4. Với mỗi kết luận chính, ghi tên file nguồn. Không suy diễn thành sự thật.
5. Nếu nguồn mâu thuẫn hoặc thiếu thông tin ảnh hưởng quyết định, hỏi người dùng.
6. Hiện bản nháp trong chat; chờ người dùng duyệt trước khi lưu vào OUTPUT/.
7. Đọc `references/mau-tom-tat.md` và tự kiểm trước khi bàn giao.
8. Không sửa nguồn, gửi, đăng, chia sẻ, di chuyển hoặc xóa file.
```

File `references/mau-tom-tat.md`:

```markdown
# Mẫu tóm tắt có nguồn

## Mục tiêu cần quyết định
[Một câu mô tả việc cần người phụ trách quyết định]

## Dữ kiện từ tài liệu
| Ý chính | Nguồn file | Trích ý hoặc vị trí kiểm tra |
|---|---|---|
| [Dữ kiện] | [INPUT/ten-file.md] | [Mục/ý trong nguồn] |

## Điều chưa biết và câu hỏi cần xác nhận
- [Điều thiếu trong nguồn; không tự đoán]

## Đề xuất bước tiếp theo
- [Đề xuất của agent, không gắn nhãn dữ kiện]

## Tự kiểm trước bàn giao
- Đọc đúng các nguồn được giao; từng kết luận quan trọng có căn cứ.
- Giữ nguyên INPUT/REFERENCE, không gửi hoặc đăng nội dung.
- Bản dự kiến được người dùng xem trước khi lưu; mở lại sau khi lưu.
```

Frontmatter là metadata YAML ở đầu file, nằm giữa hai dòng `---`. `name` là tên để nhận diện/gọi skill; `description` phải nói rõ việc gì và khi nào dùng vì agent dựa vào mô tả để chọn. Nội dung Markdown bên dưới là các bước thực hiện. Mẫu có thể viết mô tả tiếng Anh vì tài liệu Antigravity dùng mô tả làm tín hiệu nhận diện; phần hướng dẫn vẫn tiếng Việt. Chỉ thêm `scripts/` nếu có thao tác tự động thực sự; bài nghiệp vụ này không cần code.

**Thử tự chọn:** mở một chat/conversation mới trong cùng workspace. Gửi đầy đủ prompt sau, không gọi tên skill:

```text
Tôi cần bản tóm tắt để người phụ trách xem xét thử nội dung giới thiệu Trà Sen Sớm. Trong workspace hiện tại, đọc README.md và chỉ đọc bốn nguồn sau:
- INPUT/yeu-cau-cong-viec.md
- INPUT/gioi-thieu-san-pham.md
- INPUT/bien-ban-hop-2026-11-06.md
- INPUT/quy-trinh-xu-ly-yeu-cau.md

Trả bản nháp trong chat gồm mục tiêu, dữ kiện kèm nguồn, điều chưa biết và đề xuất bước tiếp theo. Chưa tạo/sửa file, gửi hoặc đăng nội dung.
```

Không nhắc tên skill trong lần thử này. Khi agent trả lời xong, hỏi nó đã dùng hướng dẫn nào và đối chiếu bảng kết quả có các cột **Ý chính / Nguồn file / Trích ý hoặc vị trí kiểm tra** như mẫu. Nếu giao diện có phần hoạt động hoặc đọc file, xem đường dẫn `.agents/skills/tom-tat-tai-lieu/SKILL.md` và `references/mau-tom-tat.md` có được mở không. Lời agent tự nhận không đủ chứng minh cơ chế khám phá skill đã hoạt động.


**Thử gọi tay:** mở conversation mới trong cùng workspace, gõ `/tom-tat-tai-lieu` để chọn skill rồi gửi đầy đủ đầu vào:

```text
/tom-tat-tai-lieu
Đọc README.md và bốn nguồn INPUT/yeu-cau-cong-viec.md, INPUT/gioi-thieu-san-pham.md, INPUT/bien-ban-hop-2026-11-06.md, INPUT/quy-trinh-xu-ly-yeu-cau.md. Làm bản tóm tắt theo references/mau-tom-tat.md của skill; chỉ hiện trong chat, chưa ghi file. Nêu các đường dẫn hướng dẫn đã đọc.
```

Kiểm tra phần hoạt động và hình thức đầu ra như lần thử tự nhiên. Nếu menu không có skill, kiểm tên file, metadata và vị trí, rồi mở conversation mới; không coi việc agent tự nói “đã dùng skill” là bằng chứng duy nhất.

**Kết quả mong đợi:** skill hiện ra trong Customizations/skills hoặc agent nêu tên và áp dụng các bước; yêu cầu tự nhiên cũng có thể khiến agent chọn nó. Tự chọn không được đảm bảo. Nếu không thấy, kiểm tra chính tả, `SKILL.md`, YAML và vị trí `.agents/skills/tom-tat-tai-lieu/`; bắt đầu conversation mới rồi thử gọi tay. Nếu vẫn không nhận, dùng prompt thường và ghi nhận skill chưa hoạt động — đừng giả vờ đã được áp dụng.

**Hai skill mở rộng để thử sau:**
- `kiem-tra-bien-ban`: đối chiếu biên bản với các quyết định/việc cần làm, giữ tên file nguồn và đánh dấu điều chưa rõ.
- `kiem-tra-cau-truc-folder`: lập danh sách thiếu/trùng/tên chưa rõ, chỉ báo cáo đề xuất; không tự move hoặc xóa.

## 6. Kiểm tra workspace và tạo Brain tối giản

**Mục tiêu:** biết cách tìm lại kiến thức bằng chỉ mục, không chỉ nhớ folder.

Trước hết yêu cầu kiểm kê cấu trúc; chưa cho chỉnh sửa:

```text
Chỉ kiểm tra workspace `[DUONG_DAN_DAY_DU]`, không sửa/di chuyển/xóa file. Liệt kê README, AGENTS, INPUT, REFERENCE, WORKING, OUTPUT, ARCHIVE và skill tom-tat-tai-lieu. Ghi file nào là nguồn, file nào là đầu ra, đường dẫn nào còn thiếu. Chỉ nêu đề xuất; không tự sắp xếp lại.
```

Đối chiếu báo cáo với File Explorer/Finder. Cây tối thiểu vẫn là README + AGENTS + năm folder đã tạo. **Chỉ ở bước Brain**, bổ sung:

```text
TRO_LY_CONG_VIEC/
├── PROJECTS/
│   └── thu-noi-dung-tra-sen/
│       └── README.md
└── BRAIN/
    ├── INDEX.md
    ├── 10_SOURCES/
    ├── 20_KNOWLEDGE/
    └── 30_PLAYBOOKS/
```

Tạo `PROJECTS/thu-noi-dung-tra-sen/README.md` ghi mục tiêu, tình trạng “đang học — chưa có chiến dịch thật”, file nguồn, đầu ra cần duyệt và việc còn thiếu. `PROJECTS/` dùng cho một việc có kết quả/thời hạn; không cần một folder dự án riêng cho mọi file.

Trong `BRAIN/`, tạo ba ghi chú nhỏ dựa đúng mẫu giả lập:

- `10_SOURCES/nguon-gioi-thieu-san-pham.md`: tiêu đề nguồn, đường dẫn `INPUT/gioi-thieu-san-pham.md`, loại “dữ liệu giả lập”, ngày đọc, các giới hạn/chưa xác nhận.
- `20_KNOWLEDGE/mo-ta-tra-sen.md`: diễn giải trung thành điều có thể nói về sản phẩm, liên kết ngược về ghi chú nguồn; không thêm tác dụng hay chứng nhận.
- `30_PLAYBOOKS/tom-tat-tai-lieu.md`: quy trình chung để tóm tắt tài liệu, chỉ giữ các bước tái dùng; ghi rằng mẫu chi tiết của công cụ nằm trong skill `tom-tat-tai-lieu`.


Để không phải tự nghĩ nội dung, dùng ba mẫu sau. Các liên kết được tính từ chính file ghi chú, khác với đường dẫn trong prompt tính từ root workspace.

File `BRAIN/10_SOURCES/nguon-gioi-thieu-san-pham.md`:

```markdown
# Nguồn: giới thiệu sản phẩm — giả lập

- Nguồn gốc: [INPUT/gioi-thieu-san-pham.md](../../INPUT/gioi-thieu-san-pham.md).
- Ngày đọc: 2026-11-06. Đây là dữ liệu bài học, không phải doanh nghiệp thật.
- Nguồn ghi tên Trà Sen Sớm, hộp 20 túi lọc và giá giả định 120.000 đồng/hộp.
- Chưa có số liệu kiểm nghiệm thành phần; chưa có chứng nhận hữu cơ.
- Không kết luận về các chứng nhận khác vì tài liệu không đề cập.
```

File `BRAIN/20_KNOWLEDGE/mo-ta-tra-sen.md`:

```markdown
# Mô tả Trà Sen Sớm — tri thức từ ví dụ giả lập

Trong bài học, có thể mô tả đây là trà hương sen dịu, hộp 20 túi lọc tiện pha tại nhà hoặc nơi làm việc. Không thêm tuyên bố về tác dụng sức khỏe.

Về thành phần/chứng nhận, nguồn ghi chưa có số liệu kiểm nghiệm thành phần và chưa có chứng nhận hữu cơ. Không suy ra tình trạng của chứng nhận khác.

[Ghi chú nguồn](../10_SOURCES/nguon-gioi-thieu-san-pham.md).
```

File `BRAIN/30_PLAYBOOKS/tom-tat-tai-lieu.md`:

```markdown
# Quy trình nghiệp vụ: tóm tắt có nguồn

1. Chốt câu hỏi và các file được phép dùng.
2. Tách dữ kiện có nguồn, điều chưa biết và đề xuất.
3. Gắn nguồn vào ý chính, kiểm lại các con số và phủ định.
4. Để người phụ trách xem nội dung rồi mới lưu bản bàn giao.

Đây là quy trình cho người tra cứu. Khi muốn agent tự nhận diện một skill, dùng [SKILL.md](../../.agents/skills/tom-tat-tai-lieu/SKILL.md) nằm ngoài BRAIN.
```

Tạo thêm `BRAIN/README.md` với một câu: “Kho kiến thức giả lập của bài tập; bắt đầu tìm tại INDEX.md, không thêm dữ liệu riêng.” Chỉ tạo `BRAIN/90_ARCHIVE/` khi đã có ghi chú cũ cần giữ; sơ đồ Brain minh họa cả giai đoạn mở rộng này.

File `BRAIN/INDEX.md`:

```markdown
# Brain — mục lục tri thức giả lập

> Chỉ dùng trong bài học. Không phải dữ liệu về doanh nghiệp thật.

## Cần tìm gì?
- Nguồn sản phẩm và điều chưa xác nhận → `10_SOURCES/nguon-gioi-thieu-san-pham.md`
- Điều có thể mô tả về Trà Sen Sớm → `20_KNOWLEDGE/mo-ta-tra-sen.md`
- Cách làm một bản tóm tắt có nguồn → `30_PLAYBOOKS/tom-tat-tai-lieu.md`

## Nguyên tắc truy nguyên
Ghi chú tri thức phải trỏ về nguồn gốc. Nếu thiếu liên kết hoặc nguồn không xác nhận được, đừng trình bày kết luận như fact.
```

**Bài tập truy vấn:**

```text
Câu hỏi: Trong bộ tài liệu giả lập này, có thể nói gì về thành phần/chứng nhận của Trà Sen Sớm?

Hãy tìm theo đường: BRAIN/INDEX.md → ghi chú trong 20_KNOWLEDGE/ → ghi chú nguồn trong 10_SOURCES/ → file gốc trong INPUT/. Trả lời bằng một câu, nêu đường dẫn nguồn và chỉ ra điều chưa được xác nhận. Chỉ đọc, không sửa file.
```

**Kết quả đúng:** “Nguồn giả lập ghi chưa có số liệu kiểm nghiệm thành phần và chưa có chứng nhận hữu cơ; tài liệu không đề cập các chứng nhận khác.” Dẫn qua INDEX → ghi chú kiến thức → ghi chú nguồn → INPUT/gioi-thieu-san-pham.md. Không đổi “chưa có chứng nhận hữu cơ” thành “không có chứng nhận nào”. Nếu agent bỏ qua INDEX, yêu cầu đi lại đường dẫn. Brain là phương pháp tổ chức và tìm lại tài liệu, không phải bộ nhớ tự động của model.

## 7. Lưu bản cũ, đề nghị xóa và giới hạn của AI

`ARCHIVE/` là kho giữ bản cũ còn giá trị truy nguyên. Chỉ người phụ trách quyết định đưa một bản vào đó. Archive không phải danh sách xóa và cũng không có nghĩa sau này chắc chắn phải xóa.

Nếu phát hiện file có thể đã thừa, chỉ tạo `OUTPUT/danh-sach-de-nghi-xoa-2026-11-06-v01.md` với đường dẫn, lý do, bản thay thế và người cần duyệt. Không di chuyển file vào danh sách, không xóa và không tạo quy trình tự xóa. Người phụ trách xem rồi tự quyết định thao tác.

Rule và skill giúp agent làm việc đều hơn, nhưng không bảo đảm nó luôn nạp đúng file, chọn đúng skill, hiểu đúng số liệu hoặc tuân thủ mọi giới hạn. Mở kết quả, so với nguồn và xem lịch sử thay đổi trước khi dùng. Với tài liệu thật, chỉ chọn folder được phép; không đưa mật khẩu, hồ sơ nhân sự hay dữ liệu khách hàng vào bài học. Nếu ứng dụng xin quyền vượt ngoài folder đã chọn, từ chối và thu hẹp phạm vi.

## Nguồn chính thức

- [Tải Antigravity](https://antigravity.google/download) · [Getting Started](https://antigravity.google/docs)
- [Rules: vị trí và cơ chế tự nạp](https://antigravity.google/docs/rules/)
- [Agent skills: `SKILL.md`, vị trí, tự chọn và gọi tay](https://antigravity.google/docs/skills/)

Tài liệu đã được đối chiếu ngày 06/11/2026. Tên menu và vị trí skill có thể đổi; xem Customizations và trang chính thức của phiên bản đang dùng.
