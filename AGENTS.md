# AGENTS.md

This repo uses a shared design system. **Any agent (or human) creating or
editing UI must follow [`CLAUDE.md`](./CLAUDE.md) and the full spec in
[`design.md`](./design.md).**

Quick rules:
- Link `assets/tokens.css`, `assets/components.css`, `assets/theme.js`.
- Set `<html data-theme="dark" data-page="home|profile|atlas|news|lab">`.
- Use CSS tokens only (no hardcoded hex/px). Reuse components in `components.css`.
- Bilingual VI–EN via `data-vi` / `data-en`. Material Symbols for icons.
- See `styleguide.html` for a live preview of every token and component.
- Home project list comes from `data/repos.json` (built by `scripts/build-repos.mjs`).

Run the checklist at the end of `design.md` before shipping a page.
