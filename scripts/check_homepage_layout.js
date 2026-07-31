#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
const publications = fs.readFileSync(path.join(root, "publications.html"), "utf8");
const stylesheet = fs.readFileSync(path.join(root, "assets/css/styles.css"), "utf8");

assert.ok(
  homepage.indexOf('id="amend"') < homepage.indexOf('id="s2m"'),
  "AMEND 应在主页中先于 S2M-Inject",
);

for (const removed of ["data-demo-toggle", "data-initial-limit", "当前限制", "失败案例"]) {
  assert.equal(homepage.includes(removed), false, `主页仍包含已删除内容：${removed}`);
}

for (const detail of ["projects/amend.html", "projects/s2m-inject.html"]) {
  assert.equal(homepage.includes(detail), false, `主页仍链接扩展页：${detail}`);
  assert.equal(publications.includes(detail), false, `论文页仍链接扩展页：${detail}`);
}

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
const introPhotoImageRule = stylesheet.match(/\.intro-photo img\s*\{([^}]*)\}/s);
assert.ok(introPhotoImageRule, "样式表缺少生活照图片规则");
assert.equal(introPhotoImageRule[1].includes("opacity:"), false, "生活照不应设置透明度");
assert.equal(introPhotoImageRule[1].includes("filter:"), false, "生活照不应设置颜色滤镜");
assert.equal(stylesheet.includes(".intro-photo::after"), false, "生活照不应叠加浅色蒙版");

assert.ok(publications.includes('href="index.html#amend"'), "AMEND 论文条目应返回主页展示");
assert.ok(publications.includes('href="index.html#s2m"'), "S2M 论文条目应返回主页展示");
assert.equal(publications.includes("重庆师范大学"), false, "荣誉中仍包含重庆师范大学");
assert.equal(publications.includes("大连交通大学"), false, "荣誉中仍包含大连交通大学");

const expectedArxiv = [
  "https://arxiv.org/abs/2601.04151",
  "https://arxiv.org/abs/2601.01568",
  "https://arxiv.org/abs/2604.22209",
  "https://arxiv.org/abs/2510.18416",
  "https://arxiv.org/abs/2606.07015",
  "https://arxiv.org/abs/2512.04720",
];

expectedArxiv.forEach((url) => {
  assert.ok(publications.includes(url), `缺少 arXiv 链接：${url}`);
});

console.log("Homepage order and navigation checks passed.");
