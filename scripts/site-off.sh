#!/usr/bin/env bash
# 关闭网站预览（仅保留图床）：复制 off 配置 → 重载 nginx
set -euo pipefail

NGINX_DIR="/www/server/panel/vhost/nginx"
SOURCE="/home/shell/shellweb/nginx/shellweb-off.conf"

sudo cp "$SOURCE" "$NGINX_DIR/shellweb.conf" && sudo nginx -s reload
echo "✓ 已关站，仅图床服务"
echo "  图床 → http://119.29.152.144/images/"
