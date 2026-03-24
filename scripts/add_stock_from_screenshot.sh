#!/bin/bash
# 从截图识别股票并添加到自选
# 用法: ./add_stock_from_screenshot.sh <图片路径>

source ~/.openclaw/workspace/.env 2>/dev/null

API_URL="${PADDLEOCR_DOC_PARSING_API_URL:-https://63y3j4hcec8cldnb.aistudio-app.com/layout-parsing}"
TOKEN="${PADDLEOCR_ACCESS_TOKEN:-62d5623b54a1563e256b3a18ec78bc38b9979e14}"

if [ -z "$1" ]; then
  echo "用法: $0 <图片路径>"
  exit 1
fi

FILE_PATH="$1"

# 调用PaddleOCR
echo "正在识别图片..."
RESULT=$(cd ~/.openclaw/workspace/skills/paddleocr-doc-parsing && \
  PADDLEOCR_DOC_PARSING_API_URL="$API_URL" \
  PADDLEOCR_ACCESS_TOKEN="$TOKEN" \
  python3 scripts/vl_caller.py --file-path "$FILE_PATH" --stdout 2>/dev/null)

# 提取股票名称（从表格中提取）
echo "$RESULT" | grep -oP '(?<=>)[^<]+(?=</td>)' | grep -E "ETF|指数|证券" | head -10

echo ""
echo "请确认要添加的股票名称，然后用 selfselect add <名称> 添加到自选"
