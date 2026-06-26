# MIGRATION.md — Gộp monorepo & Runbook cutover

Trạng thái: **branch `monorepo` đã sẵn sàng & UAT pass**. Branch `main` vẫn đang phục vụ site
live (chưa đụng). Cutover công khai = các bước dưới, **cần chủ repo duyệt** vì có thao tác
ngoài (đổi GitHub Pages, archive repo, sửa script pipeline).

## Đã làm (trên branch `monorepo`, an toàn, reversible)
- Gộp `atlas/`, `profile/`, `docs/`, `project/` (đổi tên từ `my-project`) vào repo home dạng
  snapshot (`git archive`). Lịch sử đầy đủ vẫn ở các repo standalone (sẽ archive, không xóa).
- `news` **không** gộp (giữ repo riêng).
- Home: `/my-project/`→`/project/` (link, pageUrl, repoUrl, nhãn); thêm route `/docs`; favicon.
- `404.html` gốc: redirect `/my-project/*`→`/project/*` + SPA fallback atlas.
- `.nojekyll` gốc; `favicon.svg` gốc.
- Project: site-nav chéo + icon + canonical + branding.
- Governance: `AGENTS.md` (master) + `DESIGN.md` + per-folder `AGENTS.md`/`DESIGN.md`.
- UAT: crawl 77+ trang, **0 link gãy nội bộ** (trừ `/news/*` thuộc repo riêng); Playwright
  pass home/atlas/profile/project/docs; 404 redirect test pass.

## Cutover (theo thứ tự, KHÔNG đảo)
1. **Review** branch: `git -C ducnguyen221.github.io diff main..monorepo --stat`; mở thử local
   `python -m http.server` tại gốc → kiểm `/`, `/atlas/`, `/profile/`, `/project/`, `/docs/`.
2. **Đưa monorepo lên main**:
   ```
   cd ducnguyen221.github.io
   git switch main && git merge --no-ff monorepo -m "release: monorepo ducnguyen.vn"
   git push origin main
   ```
3. **Nhường path cho monorepo** — tắt Pages của các repo project-page cũ (nếu không, repo cũ
   vẫn chiếm `/atlas`, `/profile`, `/docs`, `/my-project`):
   - GitHub → mỗi repo `atlas`, `profile`, `my-project`, `docs` → Settings → Pages → Source =
     **None** (hoặc **Archive** repo). Làm SAU khi main đã có nội dung (bước 2).
   - Đợi vài phút để Pages của monorepo build lại; kiểm live:
     `curl -I https://ducnguyen.vn/atlas/  /profile/  /project/  /docs/` → 200.
   - Kiểm redirect: mở `https://ducnguyen.vn/my-project/` → phải nhảy về `/project/`.
4. **Repoint pipeline Atlas** (file ở `…\30_MARKETING\agent\scripts\`):
   - `publish-tobi.ps1` và `run-tobi-post.ps1`: đổi
     `$ATLAS = 'C:\Users\DucNguyen\Code\atlas'`
     → `$ATLAS = 'C:\Users\DucNguyen\Code\ducnguyen221.github.io\atlas'`.
   - `$SITE='https://ducnguyen.vn/atlas'` **giữ nguyên**.
   - Chạy thử 1 bài UAT: `run-tobi-post.ps1 -Campaign <code> -Stage atlas -Uat` rồi
     `publish-tobi.ps1 ... -Uat` để chắc commit/push vào monorepo và lên `/atlas/` đúng.
   - ⚠️ Chỉ đổi `$ATLAS` SAU bước 3 (nếu đổi sớm, bài sẽ push vào repo chưa-live).
5. **Cập nhật local clone** để khớp: `ducnguyen221.github.io` đang ở branch `main` mới; các
   clone cũ `atlas/ profile/ my-project/ docs/` trong `Code/` không còn dùng để publish (giữ
   làm archive hoặc xoá sau khi yên tâm 2–4 tuần).

## Rollback
- Chưa push main: chỉ ở branch `monorepo` → bỏ qua là xong; `git switch main` không ảnh hưởng.
- Đã push main nhưng có sự cố: bật lại Pages của repo cũ (Settings→Pages→branch `main`) để khôi
  phục path; hoặc `git revert` commit merge trên home. Tag `premonorepo-backup` trỏ trạng thái
  home trước khi gộp.

## Ghi chú
- Link cũ trong email/RSS tới `/atlas/...`, `/news/...`, `/profile/...` **không đổi** → vẫn sống.
- `ai-news` / `data-news` (đã archive) nếu còn email cũ trỏ `/ai-news/`: ngoài phạm vi đợt này
  (liên quan news). Có thể thêm redirect sau nếu cần.
- News tiếp tục tự chạy ở repo riêng, không bị ảnh hưởng.
