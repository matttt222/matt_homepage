# Add Homepage Intro Photo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将首页首屏改为左侧自我介绍、中间近期工作与联系方式、右侧淡化生活照的三段式布局，并在邮箱后增加微信号。

**Architecture:** 保持静态 HTML/CSS 架构，仅重组 `#about` 内部结构并增加语义化图片容器。照片淡化、桌面三列和移动端单列全部由现有样式表负责；现有 Node 结构检查扩展为首屏回归测试。

**Tech Stack:** HTML5、CSS Grid、原生 Node.js 断言脚本

---

### Task 1: 增加首屏结构回归检查

**Files:**
- Modify: `scripts/check_homepage_layout.js`
- Test: `scripts/check_homepage_layout.js`

- [ ] **Step 1: 在现有检查中读取样式表**

在 `publications` 读取之后加入：

```js
const stylesheet = fs.readFileSync(path.join(root, "assets/css/styles.css"), "utf8");
```

- [ ] **Step 2: 增加首屏内容与顺序断言**

在联系方式断言之后加入：

```js
assert.ok(homepage.includes('class="intro-copy"'), "主页缺少首屏自我介绍列");
assert.ok(homepage.includes('class="intro-photo"'), "主页缺少首屏生活照容器");
assert.ok(
  homepage.includes('<img src="shenghuozhao.jpg" alt="马腾的生活照">'),
  "主页缺少生活照或替代文本",
);
assert.ok(homepage.includes('<span class="contact-text">vx: Leo_tckn</span>'), "主页缺少微信号");

const introCopyIndex = homepage.indexOf('class="intro-copy"');
const introNoteIndex = homepage.indexOf('class="intro-note"');
const introPhotoIndex = homepage.indexOf('class="intro-photo"');
assert.ok(
  introCopyIndex < introNoteIndex && introNoteIndex < introPhotoIndex,
  "首屏应按自我介绍、近期工作、生活照排序",
);

for (const selector of [".intro-photo", ".intro-photo img", ".contact-text"]) {
  assert.ok(stylesheet.includes(selector), `样式表缺少首屏规则：${selector}`);
}
assert.ok(stylesheet.includes("object-fit: cover"), "生活照应使用 cover 裁切");
```

- [ ] **Step 3: 运行检查并确认 RED**

Run:

```bash
node scripts/check_homepage_layout.js
```

Expected: FAIL，首个失败信息为“主页缺少首屏自我介绍列”。

### Task 2: 实现三段式首屏

**Files:**
- Modify: `index.html:37-53`
- Modify: `assets/css/styles.css:181-230`
- Modify: `assets/css/styles.css:772-885`
- Use: `shenghuozhao.jpg`
- Test: `scripts/check_homepage_layout.js`

- [ ] **Step 1: 重组 `#about` HTML**

将现有 `h1` 和两列 `intro-grid` 替换为：

```html
<p class="section-label">ABOUT</p>
<div class="intro-grid">
  <div class="intro-copy">
    <h1 id="intro-title">你好，我是马腾。</h1>
    <p class="intro-lead">我目前主要研究音频生成、语音编辑与多模态生成建模。</p>
  </div>
  <div class="intro-note">
    <p class="eyebrow">RECENT WORK</p>
    <p>近期的两个工作分别研究：如何把一段参考语音的音色迁移到音乐生成，以及如何用同一个模型完成局部语音编辑和整句改写。</p>
    <div class="plain-links">
      <a href="publications.html">全部论文与专利</a>
      <a href="mailto:matttt2229@gmail.com">matttt2229@gmail.com</a>
      <span class="contact-text">vx: Leo_tckn</span>
    </div>
  </div>
  <figure class="intro-photo">
    <img src="shenghuozhao.jpg" alt="马腾的生活照">
  </figure>
</div>
```

- [ ] **Step 2: 实现桌面端三列与照片淡化**

调整或增加以下规则：

```css
.intro h1 {
  max-width: 820px;
  margin: 0 0 28px;
  font-family: Georgia, "Songti SC", "SimSun", serif;
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1.08;
}

.intro-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(240px, 0.88fr) minmax(230px, 0.7fr);
  gap: clamp(28px, 4.5vw, 64px);
  align-items: center;
}

.intro-note .eyebrow {
  margin-bottom: 14px;
}

.contact-text {
  color: var(--accent-dark);
  font-size: 14px;
  font-weight: 650;
}

.intro-photo {
  position: relative;
  min-height: 390px;
  margin: 0;
  overflow: hidden;
  background: var(--surface-soft);
}

.intro-photo img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 390px;
  object-fit: cover;
  object-position: 50% 34%;
  opacity: 0.74;
  filter: saturate(0.76) contrast(0.93);
}

.intro-photo::after {
  position: absolute;
  inset: 0;
  background: rgba(247, 245, 239, 0.16);
  content: "";
  pointer-events: none;
}
```

- [ ] **Step 3: 实现平板与移动端单列规则**

在 `@media (max-width: 820px)` 中保留 `.intro-grid { grid-template-columns: 1fr; }`，并加入：

```css
.intro-photo {
  min-height: 320px;
  aspect-ratio: 16 / 10;
}

.intro-photo img {
  min-height: 320px;
  object-position: 50% 34%;
}
```

在 `@media (max-width: 560px)` 中加入：

```css
.intro-photo,
.intro-photo img {
  min-height: 250px;
}
```

- [ ] **Step 4: 运行检查并确认 GREEN**

Run:

```bash
node scripts/check_homepage_layout.js
```

Expected: PASS，输出 `Homepage order and navigation checks passed.`

- [ ] **Step 5: 提交首屏实现**

Run:

```bash
git add index.html assets/css/styles.css scripts/check_homepage_layout.js shenghuozhao.jpg
git commit -m "feat: add portrait to homepage intro"
```

Expected: 新提交仅包含首屏 HTML/CSS、回归检查和生活照；保留此前首页文案修改。

### Task 3: 完整验证

**Files:**
- Verify: `index.html`
- Verify: `assets/css/styles.css`
- Verify: `scripts/check_homepage_layout.js`
- Verify: `shenghuozhao.jpg`

- [ ] **Step 1: 运行站点检查**

Run:

```bash
python scripts/check_site.py
node scripts/check_homepage_layout.js
node scripts/check_s2m_samples.js
```

Expected: 三项检查均退出码为 0。

- [ ] **Step 2: 检查 JavaScript 与 Git 空白错误**

Run:

```bash
node --check scripts/check_homepage_layout.js
git diff --check HEAD^
```

Expected: 两项命令均退出码为 0。

- [ ] **Step 3: 检查关键资源与文本**

Run:

```bash
test -s shenghuozhao.jpg
rg -n 'intro-copy|intro-note|intro-photo|vx: Leo_tckn|shenghuozhao.jpg' index.html
```

Expected: 图片非空；三个栏目按顺序出现，微信和图片路径存在。

- [ ] **Step 4: 提供视觉复核入口**

Run:

```bash
python -m http.server 8000
```

Expected: 用户可在可访问该环境的浏览器中打开首页复核；若容器端口不可转发，则在推送 GitHub Pages 后使用正式网址复核桌面端和移动端效果。
