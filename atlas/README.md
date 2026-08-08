<div align="center">

# 🗺️ Atlas

**Interactive HTML visualizations that turn complex knowledge into simple, visual, and shareable learning experiences.**

[![Live Site](https://img.shields.io/badge/Live_Site-ducnguyen.vn-7c83ff?style=for-the-badge&logo=github)](https://ducnguyen.vn/)
[![License: MIT](https://img.shields.io/badge/License-MIT-34d399?style=for-the-badge)](LICENSE)
[![HTML](https://img.shields.io/badge/Pure-HTML%2FCSS%2FJS-fbbf24?style=for-the-badge&logo=html5)](.)

---

*Each visualization is a **single, self-contained HTML file** — no build step, no server, no dependencies.*
*Open it in any browser. Share the link. That's it.*

</div>

---

## ✨ What is Atlas?

Atlas is a growing collection of **standalone interactive tools** for learning and teaching complex topics:

| Topic | What You'll Find |
|-------|-----------------|
| 🤖 **AI & GenAI** | Study tools, glossaries, evaluation frameworks |
| 🎯 **Strategy** | Strategy frameworks, decision tools, operating models |
| 🧩 **BA** | Business analysis, requirements, process mapping |
| 📊 **DA** | Data analysis, analytics, statistics, SQL |
| 🏗️ **DE** | Data engineering, Databricks, Delta Lake, pipelines |
| ⚙️ **Automation** | Workflow automation, orchestrators, n8n vs. KNIME |
| 📈 **BI** | Power BI, DAX, dashboards, semantic models |
| 🎓 **EdTech** | Flashcard systems, curriculum explorers |
| 💻 **Coding** | Algorithm visualizers, cheat sheets |

Each file is designed to be **beautiful, interactive, and immediately useful** — no installation required.

---

## 🚀 Quick Start

### Browse Online

👉 **[ducnguyen.vn](https://ducnguyen.vn/)** — the live homepage with search and filtering.

### Run Locally

```bash
# Clone the repository
git clone https://github.com/ducnguyen221/atlas.git
cd atlas

# Open any visualization directly
start content\ai\databricks-genai.html    # Windows
open content/ai/databricks-genai.html     # macOS
xdg-open content/ai/databricks-genai.html # Linux

# Or serve the homepage locally
npx -y serve .
```

---

## 📁 Project Structure

```text
atlas/
├── index.html                          # Homepage (visual directory)
├── assets/
│   ├── styles.css                      # Design system
│   └── main.js                         # Homepage rendering logic
├── data/
│   └── manifest.json                   # Auto-generated file index
├── scripts/
│   └── generate-manifest.js            # Manifest generator (Node.js)
│
├── content/
│   ├── strategy/                       # Strategy HTML tools
│   ├── ai/
│   │   └── databricks-genai.html       # Standalone GenAI study tool
│   ├── automation/
│   │   └── n8n-vs-knime.html           # Standalone n8n vs. KNIME comparison
│   ├── ba/                             # Business Analysis HTML tools
│   ├── da/                             # Data Analytics HTML tools
│   ├── de/                             # Data Engineering HTML tools
│   ├── bi/                             # Business Intelligence HTML tools
│   ├── elearning/                         # EdTech HTML tools
│   ├── coding/                         # Coding HTML tools
│   └── other/                          # Miscellaneous HTML tools
└── README.md
```

### Key Design Decisions

- **Zero dependencies** — Every `.html` file is self-contained (inline CSS + JS)
- **No build step** — Open in browser, done
- **GitHub Pages ready** — Deploys from `main` branch root
- **Manifest-driven** — Homepage reads `data/manifest.json` to render cards

---

## ➕ Adding a New Visualization

1. **Create** your standalone `.html` file in the right topic folder:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Your Visualization Title</title>
     <meta name="description" content="A short description of what this tool does.">
     <!-- All CSS and JS inline — keep it self-contained! -->
   </head>
   <body>
     <!-- Your content -->
   </body>
   </html>
   ```

2. **Regenerate** the manifest:

   ```bash
   node scripts/generate-manifest.js
   ```

3. **Commit & push** — the homepage will automatically show the new card.

### Tips for Great Visualizations

- Include a `<title>` and `<meta name="description">` for automatic metadata extraction
- Use a consistent dark theme (see existing files for the color palette)
- Make it fully responsive
- Add keyboard shortcuts where appropriate
- Keep all assets inline (fonts via Google Fonts CDN are fine)

---

## 🛠️ Manifest Generator

The `scripts/generate-manifest.js` script:

- Scans the repo for `.html` files (ignoring `index.html`, `assets/`, `scripts/`, `data/`)
- Extracts `<title>` and `<meta name="description">`
- Auto-categorizes by topic folder and keywords (Strategy, AI, BA, DA, DE, BI, EdTech, Automation, etc.)
- Outputs `data/manifest.json`

```bash
node scripts/generate-manifest.js
```

---

## 🌐 GitHub Pages

This repository is designed for GitHub Pages deployment:

1. Go to **Settings → Pages**
2. Set source: **Deploy from branch** → `main` → `/ (root)`
3. Your site will be live at `https://ducnguyen.vn/`

---

## 📜 License

This project is open source under the [MIT License](LICENSE).

---

## 👤 Author

**Nguyễn Quang Đức** — Data & AI Engineer · Trainer

- 🌐 [E-Profile](https://ducnguyen221.github.io/profile/)
- 💼 [LinkedIn](https://www.linkedin.com/in/tobi-nguyen/)
- 🐙 [GitHub](https://github.com/ducnguyen221)

---

<div align="center">
<br>

*Built with ❤️ and vanilla HTML/CSS/JS*

**[🗺️ Explore Atlas →](https://ducnguyen.vn/)**

</div>
