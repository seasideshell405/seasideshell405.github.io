#!/usr/bin/env bash
# 开启网站预览：复制 on 配置 → 重载 nginx
set -euo pipefail

NGINX_DIR="/www/server/panel/vhost/nginx"
SOURCE="/home/shell/shellweb/nginx/shellweb-on.conf"

sudo cp "$SOURCE" "$NGINX_DIR/shellweb.conf" && sudo nginx -s reload
echo "✓ 网站已开启 → http://119.29.152.144"
echo "  图床 → http://119.29.152.144/images/"
echo "  画廊 → http://119.29.152.144/gallery/"
