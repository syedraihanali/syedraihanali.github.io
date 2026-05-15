# syedraihanali.github.io

Personal portfolio of **Syed Raihan Ali** — Flutter & Full-Stack Developer based in Dhaka, Bangladesh.
Stack lead at Softvence Agency.

**Live:** <https://syedraihanali.github.io/>

---

## What's in this repo

A single-page, vanilla HTML / CSS / JS portfolio. No build step, no framework — just static files served straight from GitHub Pages.

The page covers:

| Section | Notes |
|---|---|
| Hero | Name, role, CTAs, professional headshot, **live GitHub card** |
| About | Short bio + a "currently" snapshot card |
| Experience | Softvence Agency (Flutter dev / stack lead) and Bit to Byte (IT support) |
| Skills | 30+ tools as colourful SVG icons across 5 categories |
| Projects | 5 selected projects + link to full GitHub profile |
| Contact | Formspree-backed form + direct contact links |

---

## Notable features

- **Bento grid layout** with frosted-glass tiles and a light aurora background.
- **Self-hosted variable fonts** ([Geist Sans](https://vercel.com/font) + Geist Mono, served as `woff2` from `assets/fonts/`) — no Google Fonts request, instant first paint.
- **Live GitHub data** — total contributions in the last year, follower count, a 12-month contribution heatmap (sky-blue scale matching the theme), and the 2 most recent public push events. Fetched from the GitHub REST API + [github-contributions-api](https://github-contributions-api.jogruber.de/), cached in `localStorage` for 1 hour, with skeleton + offline fallback.
- **Formspree contact form** with async submit, inline status messages, and a honeypot field for spam.
- **Reveal-on-scroll** animations via `IntersectionObserver` (no library), with full `prefers-reduced-motion` support.
- **SEO**: full meta + OG/Twitter tags, three JSON-LD blocks (`Person` + `WebSite` + `ProfilePage`), canonical link, `rel="me"` profile links, sitemap, robots.txt.

---

## Tech stack

- HTML5
- CSS3 (custom properties, grid, container queries via media queries)
- JavaScript (ES2020+, no dependencies, no bundler)
- Geist Sans + Geist Mono (self-hosted variable fonts)
- 31 colourful SVG icons (devicon + simpleicons sources)

No `package.json`, no `node_modules`. Open `index.html` in a browser and it works.

---

## File structure

```
syedraihanali.github.io/
├── index.html                  # Single page; all sections + JSON-LD
├── css/
│   └── style.css               # ~1k lines, design tokens in :root
├── js/
│   └── script.js               # Reveal observer + GitHub card + Formspree
├── assets/
│   ├── CV_Syed_Raihan_Ali.pdf  # Downloadable CV
│   ├── fonts/
│   │   ├── Geist-Variable.woff2
│   │   └── GeistMono-Variable.woff2
│   └── icons/                  # 31 colourful SVG icons (skill + contact)
├── sitemap.xml
├── robots.txt
└── README.md
```

---

## Local development

No build step. Pick whichever server you have available:

```bash
# VS Code: Live Server extension → "Go Live"

# Python
python -m http.server 8000

# Node
npx serve .

# PHP
php -S localhost:8000
```

Then open <http://localhost:8000/>.

---

## Configuration you'll want to do after forking

### 1. Wire up the contact form

In [`index.html`](./index.html), find the line:

```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
```

Create a free form at <https://formspree.io/forms> and replace `YOUR_FORM_ID` with your real form ID.
The form is fully wired (async submit, validation, honeypot, status messages) — only that one ID needs swapping.

### 2. Update the GitHub username

The live GitHub card pulls data for `syedraihanali`. To use a different account, change `data-gh-user` on the `#gh-card` element in [`index.html`](./index.html):

```html
<div class="tile hero-stats" id="gh-card" data-gh-user="your-username">
```

### 3. Replace the CV

Drop your CV PDF at `assets/CV_Syed_Raihan_Ali.pdf` (keep the filename so the existing download link works), or update the `href` on the "Download CV" button.

### 4. Update content

Personal info (name, role, bio, experience, projects, contact links) is hard-coded in [`index.html`](./index.html). Search for "Softvence" / "Bit to Byte" / "syedraihanali" to find what to replace.

### 5. Theme colours

All design tokens live at the top of [`css/style.css`](./css/style.css) under `:root`. Swap accent colours by changing `--accent`, `--accent-deep`, and the heatmap scale `--gh-1` … `--gh-4`.

---

## Deployment

GitHub Pages: push to `main` and it's live at `https://<username>.github.io/`.
No GitHub Actions workflow needed — Pages serves the static files directly.

---

## Contact

- Email — [syedraihanali65@gmail.com](mailto:syedraihanali65@gmail.com)
- GitHub — [@syedraihanali](https://github.com/syedraihanali)
- LinkedIn — [syedraihanali](https://www.linkedin.com/in/syedraihanali/)
- Phone — +880 1841 626387

---

## License

[MIT](./LICENSE) — free to fork, customise, and use as a starting point for your own portfolio. A link back is appreciated but not required.
