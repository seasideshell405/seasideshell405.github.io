---
layout: layout.njk
title: 用 Claude Code 远程控制你的服务器
date: 2026-05-15
tags: ["tutorial"]
description: 从零搭建远程 Claude Code 工作流：配置服务器、安装 Claude Code，并用手机远程给它下达指令干活。
---

# 用 Claude Code 远程控制你的服务器

你有没有想过，在手机上下达一个指令，服务器就开始自动写代码、改配置、部署网站？这套流程搭起来并不复杂。

核心链路很简单：**服务器 24 小时在线运行 Claude Code → 通过远程工具接入 → 你在任何地方下发指令**。

## 1. 服务器基础配置

首先你需要一台服务器。拿到手之后建议先装宝塔面板方便管理：

参考：[宝塔面板 Linux 安装教程](https://www.bt.cn/bbs/thread-19376-1-1.html)

然后创建一个普通用户并赋予 sudo 权限（不同系统命令略有差异，以 Debian/Ubuntu 为例）：

```bash
adduser shell
usermod -aG sudo shell
```

CentOS/RHEL 系使用 `useradd` 和 `wheel` 组，命令稍有不同，不确定的话直接交给 Claude Code 处理。

**关键一步**：配置 sudo 免密码，否则 Claude Code 在执行需要提权的命令时会卡住：

```bash
echo "shell ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/shell
```

## 2. 安装 Claude Code

在服务器上全局安装：

```bash
npm install -g @anthropic-ai/claude-code
```

参考文档：
- [Claude Code 快速开始](https://claude-zh.cn/guide/getting-started)
- [DeepSeek Claude Code 集成指南](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code)

装好后进入你的项目目录（比如网站项目），运行 `claude` 即可启动。Claude Code 可以直接读写文件、执行命令、操作 git，等于给服务器装了一个 AI 大脑。

## 3. 解决网络问题（可选）

如果服务器在国内，访问 GitHub、npm 等可能会超时。装一个 Clash 代理来破局：

参考：[clash-for-linux](https://github.com/wnlen/clash-for-linux)

配置好代理后在终端启用：

```bash
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890
```

不知道怎么做？直接问 Claude Code，它能帮你完成整个 Clash 的安装配置。

## 4. 远程接入 Claude Code

这是最关键的一环——怎么在外面给服务器上的 Claude Code 下指令？目前有两种方案：

### cc-connect

支持微信、QQ、飞书等多种方式与 Claude Code 对话。让 Claude Code 帮你安装配置即可。

GitHub：https://github.com/chenhg5/cc-connect

### HappyCoder

另一个远程控制工具，需要安装配套 App 使用。同样让 Claude Code 去装就行。

GitHub：https://github.com/slopus/happy

配置完成后，你在地铁上、咖啡厅、甚至躺在床上，发条消息就能让服务器干活。

## 5. 实际能做什么？

这套链路搭好后，你可以远程做很多事情：

- **写博客**：口述主题，服务器上的 Claude Code 生成文章并提交
- **维护网站**：改样式、修 bug、加功能
- **运行脚本**：数据备份、日志分析、定时任务
- **学习实验**：随时让服务器帮你跑代码验证想法

## 总结

一台服务器 + Claude Code + 远程接入工具 = 一个 7×24 小时听你指挥的 AI 开发助手。这套组合拳打下来，编程这件事就不再限于你面前的那台电脑了。
