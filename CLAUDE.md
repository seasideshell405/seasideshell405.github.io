# shellweb — 个人静态网站

Eleventy 静态网站，托管于 GitHub Pages。

## 内容位置

- `index.md` — 首页/关于我
- `blog/*.md` — 博客文章（tag: post）
- `projects/*.md` — 项目介绍（tag: project）
- `tutorials/*.md` — 教程文档（tag: tutorial）
- `css/style.css` — 全局样式
- `_includes/layout.njk` — 布局模板

## 写作规范

- 简体中文，Markdown 格式
- 每篇内容顶部需有 YAML front matter：`title`、`date`、`tags`
- 博客文章：`layout: layout.njk`、`tags: ["post"]`
- 项目介绍：`tags: ["project"]`
- 教程文档：`tags: ["tutorial"]`

## 构建 & 预览

- 构建：`npm run build`
- 预览地址：http://119.29.152.144

## 工作流程

写内容 → 构建 → 通知用户在微信预览 → 用户确认后推送 GitHub
