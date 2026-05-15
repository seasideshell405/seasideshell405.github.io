#!/usr/bin/env bash
# 图片压缩脚本：将图片转为 WebP，原图存档到 _raw_images/
#
# 用法: ./scripts/compress-image.sh <图片路径>
#
# 约束:
#   - 输出 WebP，尺寸 ≤ 2000px（长边）
#   - 文件大小 ≤ 1MB
#   - 原图自动备份到 _raw_images/
#
# 画廊精选：压缩后编辑 images/.gallery，把要展示的文件名加进去

set -euo pipefail

INPUT="$1"
INPUT_NAME="$(basename "$INPUT")"
NAME="${INPUT_NAME%.*}"

# 项目根目录
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$PROJECT_DIR/images"
RAW_DIR="$PROJECT_DIR/_raw_images"

# 确保目录存在
mkdir -p "$OUT_DIR" "$RAW_DIR"

# 1. 原图归档（跳过已在 raw 中的）
INPUT_REAL="$(realpath "$INPUT")"
RAW_PATH="$RAW_DIR/$INPUT_NAME"
if [ "$INPUT_REAL" != "$RAW_PATH" ]; then
  cp "$INPUT" "$RAW_PATH"
  echo "  ✓ 原图 → $RAW_PATH"
fi

# 2. 获取原图尺寸
read -r W H <<< "$(identify -format "%w %h" "$INPUT")"

# 3. 计算缩放：长边 ≤ 2000
MAX_DIM=2000
RESIZE=""
if [ "$W" -gt "$MAX_DIM" ] || [ "$H" -gt "$MAX_DIM" ]; then
  RESIZE="-resize ${MAX_DIM}x${MAX_DIM}"
  echo "  → 缩放至长边 ≤ ${MAX_DIM}px (原图 ${W}x${H})"
fi

# 4. 先试用 quality 82 转 WebP
OUTPUT="$OUT_DIR/${NAME}.webp"

# 临时文件
TMP_WEBP=$(mktemp /tmp/imgcomp-XXXXXX.webp)
trap 'rm -f "$TMP_WEBP"' EXIT

# 先按 quality 82 压缩
if [ -n "$RESIZE" ]; then
  # 有缩放的用 convert（支持 resize + webp 一步到位）
  convert "$INPUT" $RESIZE -quality 82 -define webp:method=6 "$TMP_WEBP"
else
  convert "$INPUT" -quality 82 -define webp:method=6 "$TMP_WEBP"
fi

# 检查文件大小
MAX_BYTES=$((1 * 1024 * 1024))  # 1MB
SIZE=$(stat -c%s "$TMP_WEBP")

# 如果 > 1MB，逐步降低 quality
Q=82
while [ "$SIZE" -gt "$MAX_BYTES" ] && [ "$Q" -ge 30 ]; do
  Q=$((Q - 10))
  echo "  → WebP ${SIZE}bytes 超过 1MB，降 quality 至 ${Q}"
  if [ -n "$RESIZE" ]; then
    convert "$INPUT" $RESIZE -quality "$Q" -define webp:method=6 "$TMP_WEBP"
  else
    convert "$INPUT" -quality "$Q" -define webp:method=6 "$TMP_WEBP"
  fi
  SIZE=$(stat -c%s "$TMP_WEBP")
done

# 拷贝最终结果
cp "$TMP_WEBP" "$OUTPUT"
chmod 644 "$OUTPUT"
echo "  ✓ WebP → $OUTPUT ($(numfmt --to=iec-i $SIZE), quality=${Q})"

# 更新 .gitignore 确保 raw/ 也被忽略
if ! grep -qx '_raw_images/' "$PROJECT_DIR/.gitignore" 2>/dev/null; then
  echo "_raw_images/" >> "$PROJECT_DIR/.gitignore"
  echo "  → 已将 _raw_images/ 加入 .gitignore"
fi
