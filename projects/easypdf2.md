---
layout: layout.njk
title: easyPDF2
description: PDF Splitter — 将 A3 页面拆分为 A4，方便打印。
tags: project
date: 2026-05-01
github: https://github.com/seasideshell405/easyPDF2
---

# easyPDF2

一个简单的 PDF 分割工具，解决 A3 页面打印时的拆分问题。

## 解决的问题

打印 A3 尺寸的 PDF 时，普通打印机无法直接输出。easyPDF2 自动检测页面中的 A3 内容，将其拆分为两张 A4，保留原始排版和清晰度。

## 用法

```bash
python easypdf2.py input.pdf -o output.pdf
```

支持批量处理，自动识别页面尺寸，一条命令搞定。

## 技术栈

- Python
- 依赖：PyMuPDF（fitz）
