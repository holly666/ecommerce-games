const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'AI赋能课堂教学';
pres.author = 'Holly';

const colors = {
  primary: "028090",
  secondary: "00A896",
  accent: "02C39A",
  dark: "1E3A4C",
  light: "F0FDFA",
  white: "FFFFFF",
  gray: "64748B"
};

const images = {
  p2: "/Users/holly/.openclaw/workspace/pptx_unpack/ppt/media/image1.png",
  p3: "/Users/holly/.openclaw/workspace/pptx_unpack/ppt/media/image2.png",
  p4: "/Users/holly/.openclaw/workspace/pptx_unpack/ppt/media/image3.png",
  p5_1: "/Users/holly/.openclaw/workspace/pptx_unpack/ppt/media/image4.png",
  p5_2: "/Users/holly/.openclaw/workspace/pptx_unpack/ppt/media/image5.png",
  p5_3: "/Users/holly/.openclaw/workspace/pptx_unpack/ppt/media/image6.png",
  p6_1: "/Users/holly/.openclaw/workspace/pptx_unpack/ppt/media/image8.png",
  p6_2: "/Users/holly/.openclaw/workspace/pptx_unpack/ppt/media/image9.png",
  p7: "/Users/holly/.openclaw/workspace/pptx_unpack/ppt/media/image7.png",
  p8: "/Users/holly/.openclaw/workspace/pptx_unpack/ppt/media/image10.png"
};

// 第1页：封面
let slide1 = pres.addSlide();
slide1.background = { color: colors.dark };
slide1.addShape(pres.shapes.OVAL, { x: -1.5, y: -1.5, w: 4, h: 4, fill: { color: colors.primary, transparency: 30 } });
slide1.addShape(pres.shapes.OVAL, { x: 7.5, y: 3.5, w: 4, h: 4, fill: { color: colors.secondary, transparency: 30 } });
slide1.addText("AI赋能课堂教学", { x: 0.5, y: 1.8, w: 9, h: 1, fontSize: 48, fontFace: "Arial Black", color: colors.white, bold: true });
slide1.addText("DeepSeek + IMA实战技巧", { x: 0.5, y: 2.9, w: 9, h: 0.5, fontSize: 20, fontFace: "Arial", color: colors.secondary });
slide1.addText("Holly | 2026年3月", { x: 0.5, y: 4.5, w: 9, h: 0.4, fontSize: 14, fontFace: "Arial", color: colors.gray });

// 第2页：目录
let slide2 = pres.addSlide();
slide2.background = { color: colors.light };
slide2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.15, fill: { color: colors.primary } });
slide2.addText("今天聊什么", { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 36, fontFace: "Arial Black", color: colors.dark, bold: true });

const toc = [
  { num: "01", title: "DeepSeek制作网页游戏", desc: "用AI生成课堂互动工具" },
  { num: "02", title: "IMA知识库实战", desc: "上传资料+AI出题" },
  { num: "03", title: "效率提升秘诀", desc: "工具组合使用" }
];
let tocY = 1.6;
toc.forEach((item, i) => {
  slide2.addText(item.num, { x: 0.5, y: tocY, w: 1, h: 0.8, fontSize: 36, fontFace: "Arial Black", color: colors.accent, bold: true });
  slide2.addText(item.title, { x: 1.5, y: tocY, w: 7, h: 0.5, fontSize: 20, fontFace: "Arial", color: colors.dark, bold: true });
  slide2.addText(item.desc, { x: 1.5, y: tocY + 0.45, w: 7, h: 0.4, fontSize: 14, fontFace: "Arial", color: colors.gray });
  tocY += 1.3;
});

// 第3页：DeepSeek标题
let slide3 = pres.addSlide();
slide3.background = { color: colors.primary };
slide3.addText("01", { x: 0.5, y: 1.5, w: 9, h: 1, fontSize: 72, fontFace: "Arial Black", color: colors.white, bold: true });
slide3.addText("DeepSeek制作网页课堂交互游戏", { x: 0.5, y: 2.6, w: 9, h: 0.8, fontSize: 32, fontFace: "Arial", color: colors.white });
slide3.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.8, w: 3, h: 0.08, fill: { color: colors.accent } });

// 第4页：提示词公式
let slide4 = pres.addSlide();
slide4.background = { color: colors.light };
slide4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.15, fill: { color: colors.primary } });
slide4.addText("第一步  写提示词", { x: 0.5, y: 0.4, w: 4, h: 0.6, fontSize: 28, fontFace: "Arial Black", color: colors.dark, bold: true });
slide4.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.2, h: 1.2, fill: { color: colors.primary } });
slide4.addText("提示词公式", { x: 0.7, y: 1.2, w: 3.8, h: 0.4, fontSize: 14, fontFace: "Arial", color: colors.white, bold: true });
slide4.addText("知识点 + 设计课堂游戏要求", { x: 0.7, y: 1.6, w: 3.8, h: 0.5, fontSize: 14, fontFace: "Arial", color: colors.white });
slide4.addText([
  { text: "• 输入知识点内容", options: { breakLine: true } },
  { text: "• 说明游戏类型", options: { breakLine: true } },
  { text: "• 让AI设计方案" }
], { x: 0.5, y: 2.5, w: 4.2, h: 1.0, fontSize: 12, fontFace: "Arial", color: colors.dark });
slide4.addImage({ path: images.p2, x: 5, y: 0.4, w: 4.5, h: 3.0 });
slide4.addImage({ path: images.p3, x: 5, y: 3.5, w: 4.5, h: 1.6 });

// 第5页：生成HTML
let slide5 = pres.addSlide();
slide5.background = { color: colors.light };
slide5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.15, fill: { color: colors.primary } });
slide5.addText("第二步  生成HTML", { x: 0.5, y: 0.4, w: 4, h: 0.6, fontSize: 28, fontFace: "Arial Black", color: colors.dark, bold: true });
slide5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.2, h: 0.8, fill: { color: colors.accent, transparency: 85 } });
slide5.addText("提示词加一句：", { x: 0.7, y: 1.15, w: 3.8, h: 0.35, fontSize: 13, fontFace: "Arial", color: colors.dark, bold: true });
slide5.addText("「以html格式输出」", { x: 0.7, y: 1.5, w: 3.8, h: 0.35, fontSize: 13, fontFace: "Arial", color: colors.primary, bold: true });
slide5.addImage({ path: images.p4, x: 0.3, y: 2.1, w: 9.4, h: 3.2 });

// 第6页：预览调整
let slide6 = pres.addSlide();
slide6.background = { color: colors.light };
slide6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.15, fill: { color: colors.primary } });
slide6.addText("第三步  预览与调整", { x: 0.5, y: 0.4, w: 4, h: 0.6, fontSize: 28, fontFace: "Arial Black", color: colors.dark, bold: true });
slide6.addText("预览AI生成的网页效果，针对不足提出要求，让AI修改调整", { x: 0.5, y: 1.0, w: 9, h: 0.4, fontSize: 13, fontFace: "Arial", color: colors.gray });

const steps = [{ num: "1", text: "查看预览" }, { num: "2", text: "发现问题" }, { num: "3", text: "描述给AI" }, { num: "4", text: "AI调整" }];
let stepX = 0.5;
steps.forEach((s, i) => {
  slide6.addShape(pres.shapes.OVAL, { x: stepX + 0.6, y: 1.5, w: 0.5, h: 0.5, fill: { color: colors.accent } });
  slide6.addText(s.num, { x: stepX + 0.6, y: 1.5, w: 0.5, h: 0.5, fontSize: 18, fontFace: "Arial", color: colors.white, align: "center", valign: "middle", bold: true });
  slide6.addText(s.text, { x: stepX, y: 2.1, w: 1.7, h: 0.5, fontSize: 12, fontFace: "Arial", color: colors.dark, align: "center" });
  stepX += 2.2;
});
slide6.addText("两种调整方法：", { x: 0.5, y: 2.8, w: 9, h: 0.4, fontSize: 14, fontFace: "Arial", color: colors.dark, bold: true });
slide6.addText("方法一：自己发现问题 → 描述给AI调整    |    方法二：让AI自己检查代码问题", { x: 0.5, y: 3.2, w: 9, h: 0.4, fontSize: 12, fontFace: "Arial", color: colors.gray });

// 第7页：方法一
let slide7 = pres.addSlide();
slide7.background = { color: colors.light };
slide7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.15, fill: { color: colors.primary } });
slide7.addText("方法一：自己发现问题并要求调整", { x: 0.5, y: 0.35, w: 9, h: 0.5, fontSize: 22, fontFace: "Arial Black", color: colors.dark, bold: true });
slide7.addText("全代码生成，查看预览发现问题 → 描述给AI → AI调整", { x: 0.5, y: 0.8, w: 9, h: 0.4, fontSize: 12, fontFace: "Arial", color: colors.gray });
slide7.addImage({ path: images.p5_1, x: 0.3, y: 1.2, w: 4.6, h: 1.7 });
slide7.addImage({ path: images.p5_2, x: 5.1, y: 1.2, w: 4.6, h: 1.4 });
slide7.addImage({ path: images.p5_3, x: 0.3, y: 3.0, w: 4.6, h: 2.2 });

// 第8页：方法二
let slide8 = pres.addSlide();
slide8.background = { color: colors.light };
slide8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.15, fill: { color: colors.secondary } });
slide8.addText("方法二：让AI自己检查并发现问题", { x: 0.5, y: 0.35, w: 9, h: 0.5, fontSize: 22, fontFace: "Arial Black", color: colors.dark, bold: true });
slide8.addText("让AI分析代码，自己找出问题并修复", { x: 0.5, y: 0.8, w: 9, h: 0.4, fontSize: 12, fontFace: "Arial", color: colors.gray });
slide8.addImage({ path: images.p6_1, x: 0.3, y: 1.2, w: 4.6, h: 2.1 });
slide8.addImage({ path: images.p6_2, x: 5.1, y: 1.2, w: 4.6, h: 2.1 });

// 第9页：形式二
let slide9 = pres.addSlide();
slide9.background = { color: colors.light };
slide9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.15, fill: { color: colors.primary } });
slide9.addText("AI回复形式二：只呈现需调整的代码", { x: 0.5, y: 0.35, w: 9, h: 0.5, fontSize: 22, fontFace: "Arial Black", color: colors.dark, bold: true });
slide9.addText("不输出完整代码，只显示需要修改的部分，更精准", { x: 0.5, y: 0.8, w: 9, h: 0.4, fontSize: 12, fontFace: "Arial", color: colors.gray });
slide9.addImage({ path: images.p7, x: 0.5, y: 1.3, w: 9, h: 3.8 });

// 第10页：本地调试
let slide10 = pres.addSlide();
slide10.background = { color: colors.dark };
slide10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.15, fill: { color: colors.accent } });
slide10.addText("第四步  本地调试优化", { x: 0.5, y: 0.35, w: 6, h: 0.6, fontSize: 28, fontFace: "Arial Black", color: colors.white, bold: true });

const debugSteps = [{ num: "1", text: "记事本编辑" }, { num: "2", text: "双击HTML查看" }, { num: "3", text: "有问题告诉AI" }, { num: "4", text: "逐步优化" }];
let dbgX = 0.5;
debugSteps.forEach((s, i) => {
  slide10.addShape(pres.shapes.RECTANGLE, { x: dbgX, y: 1.1, w: 2.3, h: 1.8, fill: { color: colors.white, transparency: 90 } });
  slide10.addShape(pres.shapes.RECTANGLE, { x: dbgX, y: 1.1, w: 2.3, h: 0.08, fill: { color: colors.accent } });
  slide10.addText(s.num, { x: dbgX, y: 1.3, w: 2.3, h: 0.5, fontSize: 24, fontFace: "Arial Black", color: colors.white, align: "center", bold: true });
  slide10.addText(s.text, { x: dbgX + 0.1, y: 1.9, w: 2.1, h: 0.8, fontSize: 13, fontFace: "Arial", color: colors.white, align: "center" });
  if (i < debugSteps.length - 1) slide10.addText("→", { x: dbgX + 2.3, y: 1.7, w: 0.5, h: 0.5, fontSize: 18, fontFace: "Arial", color: colors.accent, align: "center" });
  dbgX += 2.6;
});
slide10.addText("操作步骤", { x: 0.5, y: 3.2, w: 9, h: 0.4, fontSize: 14, fontFace: "Arial", color: colors.secondary, bold: true });
slide10.addText("在本地的「在记事本中编辑」后，双击网页查看修改后的效果，\n有问题和新想法就跟AI互动，让AI调整，逐步优化完善得到最终版本", { x: 0.5, y: 3.6, w: 9, h: 0.8, fontSize: 11, fontFace: "Arial", color: colors.gray });
slide10.addImage({ path: images.p8, x: 3.5, y: 4.4, w: 3, h: 1.0, transparency: 30 });

// 第11页：IMA标题
let slide11 = pres.addSlide();
slide11.background = { color: colors.secondary };
slide11.addText("02", { x: 0.5, y: 1.5, w: 9, h: 1, fontSize: 72, fontFace: "Arial Black", color: colors.white, bold: true });
slide11.addText("IMA知识库实战", { x: 0.5, y: 2.6, w: 9, h: 0.8, fontSize: 32, fontFace: "Arial", color: colors.white });
slide11.addText("上传资料 → AI出题 → 问卷星", { x: 0.5, y: 3.5, w: 9, h: 0.5, fontSize: 18, fontFace: "Arial", color: colors.light });

// 第12-16页：IMA内容（简化版）
let slide12 = pres.addSlide();
slide12.background = { color: colors.light };
slide12.addText("IMA是什么？", { x: 0.5, y: 0.4, w: 9, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: colors.dark, bold: true });
slide12.addText("腾讯AI知识库助手  |  ima.cj.qq.com  |  上传资料→AI理解→问答/出题", { x: 0.5, y: 1.1, w: 9, h: 0.4, fontSize: 14, fontFace: "Arial", color: colors.gray });

const imaFuncs = [{ icon: "📚", title: "上传资料", desc: "PDF、Word、图片" }, { icon: "🤖", title: "AI理解", desc: "自动解析内容" }, { icon: "📝", title: "问答出题", desc: "基于资料生成内容" }];
funcX = 0.5;
imaFuncs.forEach((f, i) => {
  slide12.addShape(pres.shapes.RECTANGLE, { x: funcX, y: 1.7, w: 2.9, h: 1.5, fill: { color: colors.white }, shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.1 } });
  slide12.addText(f.icon, { x: funcX, y: 1.9, w: 2.9, h: 0.5, fontSize: 22, align: "center" });
  slide12.addText(f.title, { x: funcX + 0.2, y: 2.4, w: 2.5, h: 0.4, fontSize: 14, fontFace: "Arial", color: colors.dark, bold: true, align: "center" });
  slide12.addText(f.desc, { x: funcX + 0.2, y: 2.8, w: 2.5, h: 0.3, fontSize: 11, fontFace: "Arial", color: colors.gray, align: "center" });
  funcX += 3.1;
});

slide12.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.5, w: 9, h: 1.5, fill: { color: colors.accent, transparency: 85 } });
slide12.addText("💡 实际案例", { x: 0.7, y: 3.65, w: 8.6, h: 0.4, fontSize: 14, fontFace: "Arial", color: colors.dark, bold: true });
slide12.addText("上传【店铺运营学测背诵知识点】+【练习册】→ 让AI出题 → 按问卷星格式生成", { x: 0.7, y: 4.1, w: 8.6, h: 0.7, fontSize: 13, fontFace: "Arial", color: colors.dark });

// 第13页：IMA出题
let slide13 = pres.addSlide();
slide13.background = { color: colors.light };
slide13.addText("用IMA AI出题", { x: 0.5, y: 0.4, w: 9, h: 0.6, fontSize: 28, fontFace: "Arial Black", color: colors.dark, bold: true });
slide13.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 9, h: 2.3, fill: { color: colors.white }, shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.1 } });
slide13.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 9, h: 0.08, fill: { color: colors.primary } });
slide13.addText("提示词示例", { x: 0.7, y: 1.3, w: 8.6, h: 0.4, fontSize: 14, fontFace: "Arial", color: colors.primary, bold: true });
slide13.addText([
  { text: "• 根据上传资料，设计项目X的题目", options: { breakLine: true } },
  { text: "• 生成10道选择题，包含答案", options: { breakLine: true } },
  { text: "• 出5道判断题，考验学生理解", options: { breakLine: true } },
  { text: "• 请针对【某个知识点】出3道简答题" }
], { x: 0.7, y: 1.8, w: 8.6, h: 1.4, fontSize: 13, fontFace: "Arial", color: colors.dark });

slide13.addText("问卷星格式：题目+A/B选项+答案，一键复制导入", { x: 0.5, y: 3.7, w: 9, h: 0.4, fontSize: 14, fontFace: "Arial", color: colors.gray });

// 第14页：总结
let slide14 = pres.addSlide();
slide14.background = { color: colors.dark };
slide14.addText("总结与展望", { x: 0.5, y: 0.4, w: 9, h: 0.7, fontSize: 32, fontFace: "Arial Black", color: colors.white, bold: true });

const summary = [
  { title: "工具组合", desc: "DeepSeek + IMA 组合使用效率更高" },
  { title: "老师角色", desc: "从执行者→设计者" },
  { title: "让学生参与", desc: "AI使用过程也是学习" }
];
sumY = 1.3;
summary.forEach((s, i) => {
  slide14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: sumY, w: 9, h: 1.1, fill: { color: colors.white, transparency: 90 } });
  slide14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: sumY, w: 0.1, h: 1.1, fill: { color: colors.accent } });
  slide14.addText(s.title, { x: 0.8, y: sumY + 0.15, w: 8.5, h: 0.4, fontSize: 18, fontFace: "Arial", color: colors.white, bold: true });
  slide14.addText(s.desc, { x: 0.8, y: sumY + 0.55, w: 8.5, h: 0.4, fontSize: 14, fontFace: "Arial", color: colors.gray });
  sumY += 1.3;
});

slide14.addText("谢谢！有问题随时找我~", { x: 0.5, y: 4.8, w: 9, h: 0.5, fontSize: 16, fontFace: "Arial", color: colors.secondary, align: "center" });

// 保存
pres.writeFile({ fileName: "/Users/holly/.openclaw/workspace/AI赋能课堂教学v3.pptx" })
  .then(() => console.log("PPT created successfully!"))
  .catch(err => console.error(err));
