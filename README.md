# 马腾个人研究作品集

一个中文为主、面向招聘者与学术同行的静态研究作品集，重点展示音频生成、语音编辑和多模态研究。

## 本地预览

在工作区根目录执行：

```bash
python -m http.server 8000 --directory portfolio-site
```

然后访问 `http://localhost:8000`。

## 内容结构

- `index.html`：个人定位、能力概览、精选项目与实习经历。
- `projects/s2m-inject.html`：S2M-Inject 项目详情及公开 Demo 入口。
- `projects/amend.html`：AMEND 项目详情与音频对比结构。
- `publications.html`：论文、技术报告、专利和荣誉。
- `assets/data/projects.js`：Demo 地址与音频样例配置。

## 添加音频样例

将获得公开许可的音频放入 `assets/audio/<project>/`，再编辑 `assets/data/projects.js` 中对应项目的 `samples`。每条样例结构如下：

```js
{
  title: "样例名称",
  mode: "内容寻址",
  description: "编辑目标或生成条件",
  tracks: [
    { label: "原始语音", src: "../assets/audio/amend/example-original.mp3" },
    { label: "编辑结果", src: "../assets/audio/amend/example-edited.mp3" },
  ],
}
```

项目页位于 `projects/` 子目录，因此音频相对路径需要以 `../assets/` 开头。播放器使用 `preload="none"`，不会自动播放，且同一时间只播放一条音频。

## 运行检查

```bash
python portfolio-site/scripts/check_site.py
node --check portfolio-site/assets/data/projects.js
node --check portfolio-site/assets/js/site.js
```

## 部署到 GitHub Pages

在工作区根目录执行：

```bash
cd portfolio-site
git init
git add .
git commit -m "feat: add personal research portfolio"
git branch -M main
```

在 GitHub 新建一个空仓库后，设置下面两个变量并推送：

```bash
PORTFOLIO_GITHUB_USER="你的 GitHub 用户名"
PORTFOLIO_REPO="你的仓库名"
git remote add origin "https://github.com/${PORTFOLIO_GITHUB_USER}/${PORTFOLIO_REPO}.git"
git push -u origin main
```

随后进入仓库的 **Settings → Pages**，在 **Build and deployment** 中选择 **Deploy from a branch**，分支选择 `main`，目录选择 `/ (root)`。

## 发布前检查

- 确认论文状态仍然准确。
- 确认所有音频及图片允许公开。
- 补充 GitHub 地址或公开简历链接时，使用真实 URL，不添加空锚点。
- 网站不包含手机号、生日、统计脚本或遥测请求。
