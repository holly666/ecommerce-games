# PPT制作经验总结

> 2026-03-15

## 技能安装

- 安装 `anthropics/skills@pptx`
- 依赖：`pip install markitdown` + `npm install pptxgenjs`

## 从PPT提取图片

```bash
# 解压PPT（提取media文件夹）
python ~/.agents/skills/pptx/scripts/office/unpack.py xxx.pptx ./output_dir

# 图片在 output_dir/ppt/media/ 目录下
```

## PPT生成

用 `pptxgenjs` 库：

```javascript
const pptxgen = require("pptxgenjs");
let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// 添加幻灯片
let slide = pres.addSlide();
slide.addText("标题", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 36 });

// 添加图片
slide.addImage({ path: "/path/to/image.png", x: 1, y: 1, w: 4, h: 3 });

// 保存
pres.writeFile({ fileName: "output.pptx" });
```

## 配色方案

| 主题 | Primary | Secondary | Accent |
|------|---------|-----------|--------|
| Teal Trust | 028090 | 00A896 | 02C39A |
| 其他... | ... | ... | ... |

## 布局经验

1. **文字+截图结合**：左边文字说明，右边或下方放截图
2. **步骤流程**：用1234圆形标记 + 箭头连接
3. **每页主题明确**：一个页面只讲一个重点
4. **保留原始内容**：用户原来的PPT内容（文字、截图）尽量保留

## 坑

- 图片路径要用绝对路径
- 调试时用 `python -m markitdown xxx.pptx` 检查内容
- 先确认再执行外部操作
