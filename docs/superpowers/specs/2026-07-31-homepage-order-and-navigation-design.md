# Homepage Order and Navigation Design

## Goal

Make the homepage the only active project-detail surface, lead with AMEND, keep every selected Demo visible without expansion controls, remove the S2M limitations/failure-case presentation, and simplify honor entries by removing school names.

## Homepage information order

The homepage keeps the short personal introduction first. The two research sections then appear in this order:

1. AMEND — `SELECTED WORK 01 · AAAI 2027 投稿`;
2. S2M-Inject — `SELECTED WORK 02 · EMNLP 2026 投稿`.

The main navigation follows the same sequence: 关于 → AMEND → S2M-Inject → 论文 → 联系. The existing publication and contact sections remain after the two projects.

## Project presentation

AMEND remains fully presented on the homepage with its problem statement, method figure, method summary, metrics, paper result table, and all five audio-editing examples.

S2M-Inject remains fully presented on the homepage with its problem statement, method figure, method summary, metrics, paper result/ablation tables, and all six speech-to-music examples. All six examples are visible immediately. The `data-initial-limit` behavior, expand/collapse button, and related JavaScript are removed.

The S2M “当前限制” block is removed. All homepage wording that points visitors to failure cases is removed.

## Links and legacy project pages

The site no longer exposes internal detail-page links for AMEND or S2M-Inject. The files `projects/amend.html` and `projects/s2m-inject.html` remain in the repository because project rules prohibit deleting files, but no active navigation or publication entry links to them.

Project-specific implementation and Demo links are also removed from the active site presentation: the S2M GitHub repository, anonymous Demo page, and similar project CTA links are not shown on the homepage or in the first-author publication entries. Paper links are a separate category: every existing arXiv link in `publications.html` remains unchanged. The personal GitHub profile in the About section also remains.

In `publications.html`, the S2M and AMEND entries link back to `index.html#s2m` and `index.html#amend` respectively. These links are labelled `主页展示 →`. No project-detail or external Demo link remains in these two publication entries.

## Honors and certificates

Only school names are removed; award names, years, levels, certificate names, and competition names remain. The affected entries become:

- `2025 年研究生学业奖学金 特等奖`;
- `2024 年研究生学业奖学金 二等奖`;
- `2021–2022 校三等奖学金`;
- `2021–2022 优秀少数民族学生`.

Entries that do not contain a school name remain unchanged because the current source does not provide a calendar year for every certificate or competition.

## Files and behavior

- `index.html`: reorder project sections/navigation, remove S2M expansion and limitations content, and remove project-specific CTAs.
- `publications.html`: replace the two detail/Demo links with homepage anchors, preserve all existing arXiv paper links, and remove school names from honors.
- `assets/js/site.js`: remove unused S2M expansion logic.
- `assets/css/styles.css`: remove selectors used only by the deleted limitations/expansion blocks when safe.
- `scripts/check_site.py`: stop requiring legacy project pages as active site pages and assert homepage ordering, absence of removed controls/text/links, and publication anchor targets.
- `README.md`: document the homepage-only project presentation and six always-visible S2M examples.

## Verification

Automated checks must verify:

- `#amend` occurs before `#s2m` in homepage document order;
- all five AMEND and six S2M samples remain in the shared data file;
- `data-demo-toggle`, `data-initial-limit`, `当前限制`, and `失败案例` are absent from the homepage;
- active HTML files contain no links to `projects/amend.html` or `projects/s2m-inject.html`;
- the first-author publication entries point to `index.html#amend` and `index.html#s2m`;
- all existing `https://arxiv.org/abs/` links remain present and unchanged;
- honor entries contain neither `重庆师范大学` nor `大连交通大学`;
- structural checks, JavaScript syntax checks, and S2M sample-mapping checks pass.
