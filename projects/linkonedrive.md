---
layout: layout.njk
title: LinkOneDrive
description: 轻量稳定的 OneDrive 符号链接管理工具，支持一键提权运行。
tags: project
date: 2025-12-10
github: https://github.com/seasideshell405/LinkOneDrive
---

# LinkOneDrive

通过符号链接（Symbolic Link）实现任意文件夹自动备份与同步到 OneDrive。

## 解决的问题

OneDrive 默认只能同步其目录下的文件。LinkOneDrive 让你把任意位置的文件夹「链接」到 OneDrive 同步目录中，实现自动备份，无需手动复制。

## 特性

- **一键提权**：创建符号链接需要管理员权限，工具自动处理提权
- **稳定可靠**：用软链接映射，不搬家、不拷贝，源文件原地不动
- **轻量无依赖**：纯 PowerShell 脚本，开箱即用

## 用法

```powershell
# 将 D:\Projects 链接到 OneDrive 备份目录
.\LinkOneDrive.ps1 -Source "D:\Projects" -Target "$env:OneDrive\Backups\Projects"
```

## 技术栈

- PowerShell
- 依赖：Windows 符号链接（需管理员权限）
