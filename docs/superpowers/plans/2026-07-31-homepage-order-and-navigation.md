# Homepage Order and Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make AMEND the first homepage project, show every selected Demo directly, remove S2M limitations and project-detail entry points, preserve paper arXiv links, and remove school names from honors.

**Architecture:** Keep the site dependency-free. A focused Node regression script reads the static HTML and asserts document order, removed controls/links, preserved arXiv URLs, homepage anchors, and honor text; existing structural and sample-mapping checks continue to validate resources and Demo data.

**Tech Stack:** Semantic HTML5, vanilla JavaScript, CSS, Node.js assertions, Python structural checks.

---

### Task 1: Add a failing homepage-layout regression check

**Files:**
- Create: `scripts/check_homepage_layout.js`
- Modify: `scripts/check_site.py`

- [ ] **Step 1: Write the regression check**

Create a Node script that reads `index.html` and `publications.html`, then asserts:

```js
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
const publications = fs.readFileSync(path.join(root, "publications.html"), "utf8");

assert.ok(homepage.indexOf('id="amend"') < homepage.indexOf('id="s2m"'));
for (const removed of ["data-demo-toggle", "data-initial-limit", "当前限制", "失败案例"]) {
  assert.equal(homepage.includes(removed), false, `主页仍包含已删除内容：${removed}`);
}
for (const detail of ["projects/amend.html", "projects/s2m-inject.html"]) {
  assert.equal(homepage.includes(detail), false);
  assert.equal(publications.includes(detail), false);
}
assert.ok(publications.includes('href="index.html#amend"'));
assert.ok(publications.includes('href="index.html#s2m"'));
assert.equal(publications.includes("重庆师范大学"), false);
assert.equal(publications.includes("大连交通大学"), false);

const expectedArxiv = [
  "https://arxiv.org/abs/2601.04151",
  "https://arxiv.org/abs/2601.01568",
  "https://arxiv.org/abs/2604.22209",
  "https://arxiv.org/abs/2510.18416",
  "https://arxiv.org/abs/2606.07015",
  "https://arxiv.org/abs/2512.04720",
];
expectedArxiv.forEach((url) => assert.ok(publications.includes(url), `缺少 arXiv 链接：${url}`));
console.log("Homepage order and navigation checks passed.");
```

Add `scripts/check_homepage_layout.js` to `REQUIRED_FILES` in `scripts/check_site.py`.

- [ ] **Step 2: Run the check and verify RED**

Run: `node scripts/check_homepage_layout.js`

Expected: FAIL because S2M currently precedes AMEND and removed controls/text/links are still present.

### Task 2: Reorder and simplify the homepage

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Reorder navigation and project sections**

Change navigation to `关于 → AMEND → S2M-Inject → 论文 → 联系`. Move the complete AMEND `<section id="amend">` before the complete S2M `<section id="s2m">`. Set AMEND to `SELECTED WORK 01 · AAAI 2027 投稿` and S2M to `SELECTED WORK 02 · EMNLP 2026 投稿`.

- [ ] **Step 2: Remove project-specific CTAs and S2M auxiliary content**

Remove the S2M GitHub/complete-Demo links, `data-initial-limit="3"`, the `data-demo-toggle` button, the “查看全部 20 组样例与失败案例” link, and the entire `<aside class="limitations">` block. Keep both project method/results sections and all Demo containers.

- [ ] **Step 3: Run the regression check**

Run: `node scripts/check_homepage_layout.js`

Expected: still FAIL only on `publications.html` detail links and school names, proving homepage requirements have moved to green.

### Task 3: Redirect publication entries and simplify honors

**Files:**
- Modify: `publications.html`

- [ ] **Step 1: Replace internal detail links**

For S2M use `<a class="paper-link" href="index.html#s2m">主页展示 →</a>`. For AMEND use `<a class="paper-link" href="index.html#amend">主页展示 →</a>`. Remove the S2M anonymous Demo link. Do not modify any existing `https://arxiv.org/abs/` link.

- [ ] **Step 2: Remove school names from honors**

Change the four affected entries to:

```html
<li>2025 年研究生学业奖学金 <strong>特等奖</strong></li>
<li>2024 年研究生学业奖学金 <strong>二等奖</strong></li>
<li>2021–2022 校 <strong>三等奖学金</strong></li>
<li>2021–2022 <strong>优秀少数民族学生</strong></li>
```

Keep the certificate and competition entries unchanged.

- [ ] **Step 3: Run the regression check and verify GREEN**

Run: `node scripts/check_homepage_layout.js`

Expected: `Homepage order and navigation checks passed.`

### Task 4: Remove unused expansion behavior and styling

**Files:**
- Modify: `assets/js/site.js`
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Remove the S2M expansion code**

Render every sample without reading `container.dataset.initialLimit`, setting `sample.hidden`, or creating `sample.dataset.extra`. Remove the `[data-demo-toggle]` click handler entirely. Preserve navigation, audio rendering, one-audio-at-a-time playback, and paper-dialog behavior.

- [ ] **Step 2: Remove unused CSS**

Delete `.demo-actions` and `.limitations` rules and their responsive overrides. Preserve `.quiet-link` because it is used elsewhere.

- [ ] **Step 3: Verify JavaScript syntax**

Run: `node --check assets/js/site.js`

Expected: exit code 0 with no output.

### Task 5: Update checks and documentation

**Files:**
- Modify: `scripts/check_site.py`
- Modify: `README.md`

- [ ] **Step 1: Align the structural checker**

Remove legacy project pages from `REQUIRED_FILES` and from the active page iteration in `main()`. Remove `data-demo-toggle` and `aria-expanded="false"` from `REQUIRED_HOME_TOKENS`. Add `scripts/check_homepage_layout.js` to `REQUIRED_FILES`. Keep the files themselves untouched.

- [ ] **Step 2: Update README**

Document AMEND-first homepage order, all five AMEND and six S2M examples being visible directly, no active internal detail-page entry points, and preserved arXiv paper links. Add `node scripts/check_homepage_layout.js` to the check commands.

### Task 6: Verify and commit

**Files:**
- Verify all modified files and existing assets.

- [ ] **Step 1: Run all checks**

Run:

```bash
node scripts/check_homepage_layout.js
node scripts/check_s2m_samples.js
python scripts/check_site.py
node --check assets/data/projects.js
node --check assets/js/site.js
git diff --check
```

Expected: both Node checks print their pass messages, Python prints `All site checks passed.`, syntax checks and `git diff --check` exit 0 without output.

- [ ] **Step 2: Review change scope**

Run: `git status --short`

Expected: only `README.md`, `index.html`, `publications.html`, `assets/js/site.js`, `assets/css/styles.css`, `scripts/check_site.py`, `scripts/check_homepage_layout.js`, and this plan/spec documentation are changed or added.

- [ ] **Step 3: Commit**

```bash
git add README.md index.html publications.html assets/js/site.js assets/css/styles.css scripts/check_site.py scripts/check_homepage_layout.js docs/superpowers/plans/2026-07-31-homepage-order-and-navigation.md
git commit -m "refactor: make homepage the project detail surface"
```
