#!/usr/bin/env bash
# 构建网站 + 开启预览（一键测试）
set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ 构建中..."
npm run build

echo ""
bash scripts/site-on.sh
