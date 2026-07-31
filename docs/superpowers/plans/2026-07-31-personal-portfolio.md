# Personal Research Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished Chinese personal research portfolio that presents selected audio and multimodal work, provides project-level Demo narratives, and deploys unchanged to GitHub Pages.

**Architecture:** A dependency-free static site with shared CSS and JavaScript. Each major destination is a real HTML page, while `assets/data/projects.js` centralizes sample availability and external Demo URLs so future audio additions do not require layout changes.

**Tech Stack:** Semantic HTML5, CSS custom properties and responsive layouts, vanilla JavaScript, Python standard-library validation.

---

## File map

- `index.html`: landing page and selected work.
- `publications.html`: complete papers, patents, and honors.
- `projects/s2m-inject.html`: S2M research story and Demo entry.
- `projects/amend.html`: AMEND research story and before/edit/after presentation.
- `assets/css/styles.css`: shared visual system and responsive rules.
- `assets/js/site.js`: navigation, reveal behavior, active audio control, and configured sample rendering.
- `assets/data/projects.js`: verified external URLs and local sample metadata.
- `scripts/check_site.py`: structural, link, security, and content checks.
- `README.md`: preview and GitHub Pages deployment instructions.

### Task 1: Create the failing structural check

**Files:**
- Create: `portfolio-site/scripts/check_site.py`

- [ ] **Step 1: Write the checker**

The checker must require the four HTML pages, shared CSS/JS/data files, one `h1` per page, valid local `href`/`src` paths, secure `rel="noopener noreferrer"` on external `_blank` links, and no empty `href="#"`.

- [ ] **Step 2: Run the check before implementation**

Run: `python portfolio-site/scripts/check_site.py`

Expected: failure listing missing HTML and asset files.

### Task 2: Implement the shared visual system and homepage

**Files:**
- Create: `portfolio-site/index.html`
- Create: `portfolio-site/assets/css/styles.css`

- [ ] **Step 1: Build semantic homepage sections**

Create navigation, hero, research capability grid, three selected-work cards, S2M public Demo callout, AMEND comparison explanation, Kuaishou experience summary, and contact footer. Use the verified email `matttt2229@gmail.com`; omit phone and birth date.

- [ ] **Step 2: Implement the productized dark theme**

Define dark navy surfaces, blue S2M and violet AMEND accents, responsive grids, visible focus rings, reduced-motion overrides, CSS waveform motifs, and mobile navigation behavior.

- [ ] **Step 3: Run the checker**

Run: `python portfolio-site/scripts/check_site.py`

Expected: failures are limited to pages and assets intentionally created in later tasks.

### Task 3: Implement project pages and sample configuration

**Files:**
- Create: `portfolio-site/projects/s2m-inject.html`
- Create: `portfolio-site/projects/amend.html`
- Create: `portfolio-site/assets/data/projects.js`

- [ ] **Step 1: Define verified project metadata**

Expose `window.PORTFOLIO_PROJECTS` with `s2m` and `amend` entries. S2M contains the confirmed public Demo URL and an empty `samples` array; AMEND contains an empty `samples` array. Empty arrays must render an honest availability panel, never a broken audio element.

- [ ] **Step 2: Build S2M project narrative**

Present the problem, cross-domain timbre transfer idea, personal contribution, EMNLP 2026 submission status, author list, and a prominent external Demo button.

- [ ] **Step 3: Build AMEND project narrative**

Present controllable scope, content-based addressing, position-based addressing, zero-shot speech synthesis framing, personal contribution, AAAI 2026 submission status, author list, and the original/instruction/edited comparison structure.

### Task 4: Implement the complete成果 page

**Files:**
- Create: `portfolio-site/publications.html`

- [ ] **Step 1: Add publications**

Group the verified résumé entries into first-author work, technical reports, and collaborative work. Link only the confirmed arXiv pages and the supplied S2M Demo.

- [ ] **Step 2: Add patents and honors**

List the four verified patent titles with authors, emphasizing 马腾. Add the seven verified honors and certificates without adding dates or claims absent from the résumé.

### Task 5: Implement progressive interaction

**Files:**
- Create: `portfolio-site/assets/js/site.js`
- Modify: `portfolio-site/index.html`
- Modify: `portfolio-site/projects/s2m-inject.html`
- Modify: `portfolio-site/projects/amend.html`
- Modify: `portfolio-site/publications.html`

- [ ] **Step 1: Add resilient navigation and reveal behavior**

Toggle the mobile menu with updated `aria-expanded`, close it after navigation, and reveal annotated sections with `IntersectionObserver`. Content remains visible when JavaScript is disabled.

- [ ] **Step 2: Render configured samples safely**

Read `window.PORTFOLIO_PROJECTS`, create audio elements only for samples with a verified `src`, set `preload="none"`, and pause other players on play. Render a public Demo button or “音频将在公开后补充” panel when samples are empty.

- [ ] **Step 3: Run structural validation**

Run: `python portfolio-site/scripts/check_site.py`

Expected: `All site checks passed.`

### Task 6: Document, serve, and verify

**Files:**
- Create: `portfolio-site/README.md`

- [ ] **Step 1: Add copy-pastable preview and deployment commands**

Document `python -m http.server 8000 --directory portfolio-site`, GitHub repository initialization, push, and Pages configuration using the repository root.

- [ ] **Step 2: Check JavaScript syntax**

Run: `node --check portfolio-site/assets/data/projects.js` and `node --check portfolio-site/assets/js/site.js`.

Expected: both commands exit with status 0 and no output.

- [ ] **Step 3: Run a local HTTP smoke test**

Run: `python -m http.server 8000 --directory portfolio-site`, then request `/`, `/publications.html`, `/projects/s2m-inject.html`, and `/projects/amend.html`.

Expected: every request returns HTTP 200.

- [ ] **Step 4: Run final validation**

Run: `python portfolio-site/scripts/check_site.py`

Expected: `All site checks passed.`

## Self-review

- Spec coverage: all homepage, project,成果, visual, privacy, static deployment, and audio fallback requirements map to Tasks 2–6.
- Placeholder scan: no fake links, fabricated metrics, hidden broken audio elements, or implementation placeholders are permitted.
- Consistency: project keys are `s2m` and `amend`; all pages load the same `projects.js` and `site.js` interfaces.
- Repository note: the workspace root is not a Git repository, so commit steps are intentionally excluded; `portfolio-site/` can be initialized as its own repository after review.
