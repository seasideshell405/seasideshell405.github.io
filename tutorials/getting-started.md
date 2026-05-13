---
layout: layout.njk
title: 快速上手 Eleventy
description: 从零开始学习 Eleventy 静态网站生成器
tags: tutorial
date: 2026-05-13
---

# 快速上手 Eleventy

这篇教程将带你从零开始，了解如何使用 Eleventy 构建静态网站。

## 什么是 Eleventy？

Eleventy（11ty）是一个简洁、灵活的静态网站生成器，支持多种模板语言，能将 Markdown 和模板文件编译成纯静态 HTML。

## 安装

```bash
npm install -g @11ty/eleventy
```

或者在项目中本地安装：

```bash
npm install --save-dev @11ty/eleventy
```

## 创建第一个页面

在项目根目录创建一个 Markdown 文件，比如 `index.md`：

```markdown
---
title: 我的第一个页面
---

# 你好，世界！

这是我的第一个 Eleventy 页面。
```

## 运行开发服务器

```bash
npx @11ty/eleventy --serve
```

浏览器打开 `http://localhost:8080` 即可看到你的页面。

## 布局系统

创建 `_includes/layout.njk` 作为全局布局：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>{{ title }}</title>
</head>
<body>
  {{ content | safe }}
</body>
</html>
```

然后在页面的 frontmatter 中引用它：

```markdown
---
layout: layout.njk
title: 页面标题
---
```

## 下一步

- 学习如何[创建集合](https://www.11ty.dev/docs/collections/)
- 了解[模板语言](https://www.11ty.dev/docs/languages/)
- 配置[自动部署](https://www.11ty.dev/docs/deployment/)
