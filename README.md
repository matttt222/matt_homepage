# 马腾个人研究主页

一个不依赖构建工具的静态研究主页，主要介绍音频生成、语音编辑与多模态建模工作。

## 首页结构

- 简短个人介绍与联系方式；
- AMEND：统一语音编辑方法、论文实验表、5 组原始语音与编辑结果；
- S2M-Inject：研究问题、模型结构、论文实验表、5 组精选的中英文语音到音乐样例；
- 其他论文、专利与荣誉入口。

首页使用论文原图裁剪展示方法与结果，不重新绘制或改写表中数值。AMEND 和 S2M-Inject 的方法、结果与全部精选 Demo 均直接显示在主页；旧项目详情文件保留，但网站不再提供入口。成果页现有的 arXiv 论文链接继续保留。

## 目录

```text
assets/
├── audio/
│   ├── amend/          # 5 组 reference / AMEND 结果
│   └── s2m/            # 5 组活动样例及保留的历史音频
├── data/projects.js    # Demo 文本、指令与音频路径
├── img/papers/         # 从提交论文中裁剪的方法图与实验表
├── css/styles.css
└── js/site.js
```

`site.js` 根据 `projects.js` 生成播放器；所有音频均使用 `preload="none"`，不会自动播放，同一时间只允许播放一条音频。AMEND 的 5 组样例和 S2M 的 5 组精选样例均直接显示；S2M 样例同时展示公开 Demo 中未经精简的完整英文 caption。

## 本地预览

在本仓库根目录执行：

```bash
python -m http.server 8000
```

然后打开 `http://localhost:8000`。

## 检查

```bash
python scripts/check_site.py
node --check assets/data/projects.js
node --check assets/js/site.js
node scripts/check_s2m_samples.js
node scripts/check_homepage_layout.js
```

结构检查会验证主要页面、论文截图、Demo 音频、无障碍交互标记和内部链接是否完整。

## 部署到 GitHub Pages

将仓库推送到 GitHub 后，进入 **Settings → Pages**，在 **Build and deployment** 中选择 **Deploy from a branch**，分支选择 `main`，目录选择 `/ (root)`。

发布前应再次确认论文状态、作者信息及所有音频和图片的公开权限。
