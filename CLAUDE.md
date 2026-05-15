# shellweb — 个人静态网站

Eleventy 静态网站，托管于 GitHub Pages。

## 在线访问

- **网站地址**：https://seasideshell405.github.io
- **项目源码**：https://github.com/seasideshell405/seasideshell405.github.io

## 内容位置

- `index.md` — 首页/关于我
- `blog/*.md` — 博客文章（tag: post）
- `projects/index.md` — 项目展示页面
- `tutorials/*.md` — 教程文档（tag: tutorial）
- `css/style.css` — 全局样式
- `_includes/layout.njk` — 布局模板
- `_data/projects.js` — 项目数据（用于项目页卡片展示）

## 项目数据结构

项目卡片数据存储在 `_data/projects.js`，格式如下：

```javascript
{
  title: "项目名称",
  description: "项目描述",
  github: "https://github.com/用户名/项目名"
}
```

项目页会自动读取该文件生成卡片网格，点击卡片可直接跳转到项目仓库。

## 写作规范

- 简体中文，Markdown 格式
- 每篇内容顶部需有 YAML front matter：`title`、`date`、`tags`
- 博客文章：`layout: layout.njk`、`tags: ["post"]`
- 教程文档：`tags: ["tutorial"]`

## 构建 & 预览

- 构建：`npm run build`
- 本地预览：`npm run serve`

## 工作流程

写内容 → 构建 → 通知用户在微信预览 → 用户确认后推送 GitHub
