# TOOLS.md - Local Notes

## PPT制作
- 默认用 `anthropics/skills@pptx` 技能
- 依赖：markitdown, pptxgenjs
- 工作流：
  1. 从用户PPT提取图片：`python ~/.agents/skills/pptx/scripts/office/unpack.py xxx.pptx ./output`
  2. 生成新PPT：用 pptxgenjs 代码生成
  3. 检查内容：`python -m markitdown xxx.pptx`

## OCR配置
- PaddleOCR API：
  - URL: https://63y3j4hcec8cldnb.aistudio-app.com/layout-parsing
  - Token: 62d5623b54a1563e256b3a18ec78bc38b9979e14
- 用法：`python ~/.openclaw/workspace/skills/paddleocr-doc-parsing/scripts/vl_caller.py --file-path <图片路径>`

## 股票自选工作流
- 默认用 `anthropics/skills@pptx` 技能
- 依赖：markitdown, pptxgenjs
- 工作流：
  1. 从用户PPT提取图片：`python ~/.agents/skills/pptx/scripts/office/unpack.py xxx.pptx ./output`
  2. 生成新PPT：用 pptxgenjs 代码生成
  3. 检查内容：`python -m markitdown xxx.pptx`
- 截图 → PaddleOCR识别 → 提取ETF/股票名称 → 添加到自选
- 脚本：`~/.openclaw/workspace/scripts/add_stock_from_screenshot.sh`
- 手动流程：
  1. 用PaddleOCR识别截图
  2. 提取股票/ETF名称
  3. 用 `selfselect add <名称>` 添加到自选
- PaddleOCR API：
  - URL: https://63y3j4hcec8cldnb.aistudio-app.com/layout-parsing
  - Token: 62d5623b54a1563e256b3a18ec78bc38b9979e14
- 用法：`python ~/.openclaw/workspace/skills/paddleocr-doc-parsing/scripts/vl_caller.py --file-path <图片路径>`

## 语音识别
- 用 Whisper（本地离线）
- 中文识别：加 --language Chinese

## MiniMax 生图
- 端点：`POST https://api.minimax.chat/v1/image_generation`
- Header：`Authorization: Bearer sk-cp-CfNXLXppoSdwVqdo2M8SX7vV3txeDHtezQtEyw4n6Up9y46bApU8tBoMtMiaW1d-YsrqPes2w4CEaAFyJWKg6u21Qd7b2S71sdVEVJAt3785OWyR1o_x1V4`
- Body: `{"model": "image-01", "prompt": "描述", "aspect_ratio": "1:1"}`
- 返回：`data.image_urls[0]` 是图片URL，下载后发送

## 搜索
- 默认：tavily_search（通用搜索）
- 金融：eastmoney_search / eastmoney_data / eastmoney_select
- apikey: mkt_UsR5Lcy8be3_6ACn2EuAIOKaINZc6T6xr6xNHdsYajg
- 用量限制: 每个技能50次/天
  - eastmoney_search（资讯搜索）
  - eastmoney_data（金融数据）
  - eastmoney_select（智能选股）

## 出题技能
- `generate-test-questions` - 生成测试题技能

## 笔记
- 默认笔记软件：**Obsidian**（非Apple Notes）
- Obsidian库路径：`~/Documents/Holly工作生活笔记/`

## 文件发送
- 发文件给用户：先把文件复制到 `~/.openclaw/workspace/` 再用 `filePath` 发送
