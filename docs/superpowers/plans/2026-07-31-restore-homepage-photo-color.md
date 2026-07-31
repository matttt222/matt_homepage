# Restore Homepage Photo Color Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让首页右侧生活照使用原始颜色显示，同时保留现有布局、裁切和响应式行为。

**Architecture:** 仅删除 `.intro-photo` 相关的视觉淡化规则，不修改 HTML 或图片文件。扩展现有 Node 回归检查，直接约束照片规则不包含透明度、颜色滤镜和伪元素蒙版。

**Tech Stack:** CSS、原生 Node.js 断言脚本

---

### Task 1: 增加原色显示回归检查

**Files:**
- Modify: `scripts/check_homepage_layout.js`
- Test: `scripts/check_homepage_layout.js`

- [ ] **Step 1: 增加照片 CSS 范围断言**

在现有 `object-fit: cover` 断言之后加入：

```js
const introPhotoImageRule = stylesheet.match(/\.intro-photo img\s*\{([^}]*)\}/s);
assert.ok(introPhotoImageRule, "样式表缺少生活照图片规则");
assert.equal(introPhotoImageRule[1].includes("opacity:"), false, "生活照不应设置透明度");
assert.equal(introPhotoImageRule[1].includes("filter:"), false, "生活照不应设置颜色滤镜");
assert.equal(stylesheet.includes(".intro-photo::after"), false, "生活照不应叠加浅色蒙版");
```

- [ ] **Step 2: 运行检查并确认 RED**

Run:

```bash
node scripts/check_homepage_layout.js
```

Expected: FAIL，首个失败信息为“生活照不应设置透明度”。

### Task 2: 删除照片淡化 CSS

**Files:**
- Modify: `assets/css/styles.css`
- Test: `scripts/check_homepage_layout.js`

- [ ] **Step 1: 删除透明度与颜色滤镜**

从 `.intro-photo img` 中删除：

```css
opacity: 0.74;
filter: saturate(0.76) contrast(0.93);
```

- [ ] **Step 2: 删除浅色蒙版规则**

完整删除：

```css
.intro-photo::after {
  position: absolute;
  inset: 0;
  background: rgba(247, 245, 239, 0.16);
  content: "";
  pointer-events: none;
}
```

- [ ] **Step 3: 运行检查并确认 GREEN**

Run:

```bash
node scripts/check_homepage_layout.js
```

Expected: PASS，输出 `Homepage order and navigation checks passed.`

- [ ] **Step 4: 运行完整检查**

Run:

```bash
python scripts/check_site.py
node scripts/check_s2m_samples.js
node --check scripts/check_homepage_layout.js
git diff --check
```

Expected: 所有命令退出码为 0。

- [ ] **Step 5: 提交修改**

Run:

```bash
git add assets/css/styles.css scripts/check_homepage_layout.js
git commit -m "fix: restore homepage portrait colors"
```

Expected: 新提交只包含照片显示规则和对应回归检查。
