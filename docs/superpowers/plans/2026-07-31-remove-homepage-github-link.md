# Remove Homepage GitHub Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the visible personal GitHub link from the homepage while preserving the publications-and-patents link and email address.

**Architecture:** Keep the static site structure unchanged and remove one anchor from the About section. Extend the existing dependency-free homepage regression script so the intended two-link state cannot regress.

**Tech Stack:** Semantic HTML5, Node.js strict assertions, existing Python structural checks.

---

### Task 1: Add a failing contact-link regression check

**Files:**
- Modify: `scripts/check_homepage_layout.js:26`
- Test: `scripts/check_homepage_layout.js`

- [ ] **Step 1: Add the three About-link assertions**

Insert these assertions before the existing publication-entry assertions:

```js
assert.equal(
  homepage.includes('href="https://github.com/matttt222"'),
  false,
  "主页仍包含个人 GitHub 链接",
);
assert.ok(
  homepage.includes('<a href="publications.html">全部论文与专利</a>'),
  "主页缺少全部论文与专利入口",
);
assert.ok(
  homepage.includes('<a href="mailto:matttt2229@gmail.com">matttt2229@gmail.com</a>'),
  "主页缺少联系邮箱",
);
```

- [ ] **Step 2: Run the focused check and verify RED**

Run:

```bash
node scripts/check_homepage_layout.js
```

Expected: FAIL with `主页仍包含个人 GitHub 链接`, proving the regression check detects the current anchor.

### Task 2: Remove the visible GitHub anchor

**Files:**
- Modify: `index.html:44-48`
- Test: `scripts/check_homepage_layout.js`

- [ ] **Step 1: Remove only the GitHub anchor**

Change the About link group to exactly:

```html
<div class="plain-links">
  <a href="publications.html">全部论文与专利</a>
  <a href="mailto:matttt2229@gmail.com">matttt2229@gmail.com</a>
</div>
```

Do not change the separate Contact section or any content in `publications.html`.

- [ ] **Step 2: Run the focused check and verify GREEN**

Run:

```bash
node scripts/check_homepage_layout.js
```

Expected:

```text
Homepage order and navigation checks passed.
```

### Task 3: Verify and commit

**Files:**
- Verify: `index.html`
- Verify: `scripts/check_homepage_layout.js`

- [ ] **Step 1: Run all relevant checks**

Run:

```bash
node scripts/check_homepage_layout.js
node scripts/check_s2m_samples.js
python scripts/check_site.py
node --check assets/data/projects.js
node --check assets/js/site.js
git diff --check
```

Expected: both Node regression scripts and the Python structural checker print their pass messages; syntax and whitespace checks exit 0 without output.

- [ ] **Step 2: Confirm the implementation scope**

Run:

```bash
git status --short
git diff --stat
```

Expected: implementation changes are limited to `index.html` and `scripts/check_homepage_layout.js`; the design and plan documents may appear only as already committed history.

- [ ] **Step 3: Commit the implementation**

Run:

```bash
git add index.html scripts/check_homepage_layout.js
git commit -m "fix: remove homepage GitHub link"
```

Expected: one implementation commit with no deleted files.
