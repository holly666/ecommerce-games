const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'AI赋能课堂教学';
pres.author = 'Holly';

// 配色 - 青色系
const colors = {
  primary: "028090",
  secondary: "00A896",
  accent: "02C39A",
  dark: "1E3A4C",
  light: "F0FDFA",
  white: "FFFFFF",
  gray: "64748B"
};

// ===== 第1页：封面 =====
let slide1 = pres.addSlide();
slide1.background = { color: colors.dark };

slide1.addShape(pres.shapes.OVAL, {
  x: -1.5, y: -1.5, w: 4, h: 4,
  fill: { color: colors.primary, transparency: 30 }
});
slide1.addShape(pres.shapes.OVAL, {
  x: 7.5, y: 3.5, w: 4, h: 4,
  fill: { color: colors.secondary, transparency: 30 }
});

slide1.addText("AI赋能课堂教学", {
  x: 0.5, y: 1.8, w: 9, h: 1,
  fontSize: 48, fontFace: "Arial Black", color: colors.white, bold: true
});

slide1.addText("DeepSeek + IMA实战技巧", {
  x: 0.5, y: 2.9, w: 9, h: 0.5,
  fontSize: 20, fontFace: "Arial", color: colors.secondary
});

slide1.addText("Holly | 2026年3月", {
  x: 0.5, y: 4.5, w: 9, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: colors.gray
});

// ===== 第2页：目录 =====
let slide2 = pres.addSlide();
slide2.background = { color: colors.light };

slide2.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.15,
  fill: { color: colors.primary }
});

slide2.addText("今天聊什么", {
  x: 0.5, y: 0.5, w: 9, h: 0.8,
  fontSize: 36, fontFace: "Arial Black", color: colors.dark, bold: true
});

const toc = [
  { num: "01", title: "DeepSeek制作网页游戏", desc: "用AI生成课堂互动工具" },
  { num: "02", title: "IMA知识库实战", desc: "上传资料+AI出题" },
  { num: "03", title: "效率提升秘诀", desc: "工具组合使用" }
];

let tocY = 1.6;
toc.forEach((item, i) => {
  // 数字
  slide2.addText(item.num, {
    x: 0.5, y: tocY, w: 1, h: 0.8,
    fontSize: 36, fontFace: "Arial Black", color: colors.accent, bold: true
  });
  // 标题
  slide2.addText(item.title, {
    x: 1.5, y: tocY, w: 7, h: 0.5,
    fontSize: 20, fontFace: "Arial", color: colors.dark, bold: true
  });
  // 描述
  slide2.addText(item.desc, {
    x: 1.5, y: tocY + 0.45, w: 7, h: 0.4,
    fontSize: 14, fontFace: "Arial", color: colors.gray
  });
  tocY += 1.3;
});

// ===== 第3页：DeepSeek部分标题 =====
let slide3 = pres.addSlide();
slide3.background = { color: colors.primary };

slide3.addText("01", {
  x: 0.5, y: 1.5, w: 9, h: 1,
  fontSize: 72, fontFace: "Arial Black", color: colors.white, bold: true
});

slide3.addText("DeepSeek制作网页课堂交互游戏", {
  x: 0.5, y: 2.6, w: 9, h: 0.8,
  fontSize: 32, fontFace: "Arial", color: colors.white
});

slide3.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.8, w: 3, h: 0.08,
  fill: { color: colors.accent }
});

// ===== 第4页：提示词技巧 =====
let slide4 = pres.addSlide();
slide4.background = { color: colors.light };

slide4.addText("DeepSeek提示词公式", {
  x: 0.5, y: 0.4, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Arial Black", color: colors.dark, bold: true
});

// 公式卡片
slide4.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.3, w: 9, h: 1.2,
  fill: { color: colors.white },
  shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.1 }
});

slide4.addText("知识点 + 设计课堂游戏要求", {
  x: 0.5, y: 1.3, w: 9, h: 1.2,
  fontSize: 24, fontFace: "Arial", color: colors.primary, align: "center", valign: "middle", bold: true
});

// 示例
slide4.addText("提示词示例", {
  x: 0.5, y: 2.8, w: 9, h: 0.5,
  fontSize: 18, fontFace: "Arial", color: colors.dark, bold: true
});

slide4.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.3, w: 9, h: 1.8,
  fill: { color: colors.dark }
});

slide4.addText("请设计一个关于【店铺运营】的课堂互动游戏，\n包含选择题和判断题，\n以html格式输出", {
  x: 0.7, y: 3.5, w: 8.6, h: 1.4,
  fontSize: 16, fontFace: "Arial", color: colors.white, valign: "middle"
});

// ===== 第5页：生成HTML =====
let slide5 = pres.addSlide();
slide5.background = { color: colors.light };

slide5.addText("生成HTML网页", {
  x: 0.5, y: 0.4, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Arial Black", color: colors.dark, bold: true
});

// 步骤
const steps1 = [
  { title: "提示词加一句", desc: "加上「以html格式输出」" },
  { title: "获取完整代码", desc: "AI生成完整网页代码" },
  { title: "保存为.html", desc: "复制到记事本，保存为HTML文件" }
];

let stepX = 0.5;
steps1.forEach((s, i) => {
  slide5.addShape(pres.shapes.OVAL, {
    x: stepX, y: 1.4, w: 0.6, h: 0.6,
    fill: { color: colors.accent }
  });
  slide5.addText(String(i + 1), {
    x: stepX, y: 1.4, w: 0.6, h: 0.6,
    fontSize: 20, fontFace: "Arial", color: colors.white, align: "center", valign: "middle", bold: true
  });
  slide5.addText(s.title, {
    x: stepX + 0.8, y: 1.35, w: 2.5, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: colors.dark, bold: true
  });
  slide5.addText(s.desc, {
    x: stepX + 0.8, y: 1.75, w: 2.5, h: 0.3,
    fontSize: 12, fontFace: "Arial", color: colors.gray
  });
  stepX += 3.2;
});

// 关键点
slide5.addText("💡 关键技巧", {
  x: 0.5, y: 3.2, w: 9, h: 0.4,
  fontSize: 18, fontFace: "Arial", color: colors.primary, bold: true
});

slide5.addText([
  { text: "• 描述越具体，游戏越符合需求", options: { breakLine: true } },
  { text: "• 预览后发现问题，直接告诉AI调整", options: { breakLine: true } },
  { text: "• 可以让AI自己检查代码问题" }
], {
  x: 0.5, y: 3.6, w: 9, h: 1.2,
  fontSize: 14, fontFace: "Arial", color: colors.dark
});

// ===== 第6页：两种回复形式 =====
let slide6 = pres.addSlide();
slide6.background = { color: colors.light };

slide6.addText("AI回复形式", {
  x: 0.5, y: 0.4, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Arial Black", color: colors.dark, bold: true
});

// 形式1
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.3, w: 4.3, h: 2.5,
  fill: { color: colors.white },
  shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.1 }
});
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.3, w: 4.3, h: 0.08,
  fill: { color: colors.primary }
});

slide6.addText("形式一", {
  x: 0.7, y: 1.5, w: 4, h: 0.4,
  fontSize: 16, fontFace: "Arial", color: colors.primary, bold: true
});
slide6.addText("全代码生成", {
  x: 0.7, y: 1.9, w: 4, h: 0.4,
  fontSize: 18, fontFace: "Arial", color: colors.dark, bold: true
});
slide6.addText("• 查看预览发现问题\n• 自己描述让AI调整\n• 逐步优化完善", {
  x: 0.7, y: 2.4, w: 4, h: 1.2,
  fontSize: 13, fontFace: "Arial", color: colors.gray
});

// 形式2
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.3, w: 4.3, h: 2.5,
  fill: { color: colors.white },
  shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.1 }
});
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.3, w: 4.3, h: 0.08,
  fill: { color: colors.secondary }
});

slide6.addText("形式二", {
  x: 5.4, y: 1.5, w: 4, h: 0.4,
  fontSize: 16, fontFace: "Arial", color: colors.secondary, bold: true
});
slide6.addText("只呈现需调整的代码", {
  x: 5.4, y: 1.9, w: 4, h: 0.4,
  fontSize: 18, fontFace: "Arial", color: colors.dark, bold: true
});
slide6.addText("• 让AI自己检查问题\n• 只输出有问题的部分\n• 更精准修改", {
  x: 5.4, y: 2.4, w: 4, h: 1.2,
  fontSize: 13, fontFace: "Arial", color: colors.gray
});

// ===== 第7页：本地调试 =====
let slide7 = pres.addSlide();
slide7.background = { color: colors.dark };

slide7.addText("本地调试优化", {
  x: 0.5, y: 0.4, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Arial Black", color: colors.white, bold: true
});

slide7.addText("双击网页查看效果，有问题随时让AI调整", {
  x: 0.5, y: 1.1, w: 9, h: 0.4,
  fontSize: 16, fontFace: "Arial", color: colors.secondary
});

const debugSteps = [
  "在记事本中编辑",
  "双击HTML查看预览",
  "发现问题告诉AI",
  "逐步优化完善"
];

let debugX = 0.5;
debugSteps.forEach((s, i) => {
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: debugX, y: 1.8, w: 2.2, h: 2.2,
    fill: { color: colors.white, transparency: 90 }
  });
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: debugX, y: 1.8, w: 2.2, h: 0.08,
    fill: { color: colors.accent }
  });
  slide7.addText(String(i + 1), {
    x: debugX, y: 2.0, w: 2.2, h: 0.5,
    fontSize: 24, fontFace: "Arial Black", color: colors.white, align: "center", bold: true
  });
  slide7.addText(s, {
    x: debugX + 0.1, y: 2.6, w: 2, h: 1,
    fontSize: 14, fontFace: "Arial", color: colors.white, align: "center"
  });
  debugX += 2.4;
});

// ===== 第8页：IMA标题 =====
let slide8 = pres.addSlide();
slide8.background = { color: colors.secondary };

slide8.addText("02", {
  x: 0.5, y: 1.5, w: 9, h: 1,
  fontSize: 72, fontFace: "Arial Black", color: colors.white, bold: true
});

slide8.addText("IMA知识库实战", {
  x: 0.5, y: 2.6, w: 9, h: 0.8,
  fontSize: 32, fontFace: "Arial", color: colors.white
});

slide8.addText("上传资料 → AI出题 → 问卷星", {
  x: 0.5, y: 3.5, w: 9, h: 0.5,
  fontSize: 18, fontFace: "Arial", color: colors.light
});

slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.3, w: 3, h: 0.08,
  fill: { color: colors.white }
});

// ===== 第9页：IMA是什么 =====
let slide9 = pres.addSlide();
slide9.background = { color: colors.light };

slide9.addText("IMA是什么？", {
  x: 0.5, y: 0.4, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Arial Black", color: colors.dark, bold: true
});

// 介绍卡片
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.2, w: 9, h: 1.5,
  fill: { color: colors.white },
  shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.1 }
});

slide9.addText("腾讯AI知识库助手", {
  x: 0.7, y: 1.35, w: 8.6, h: 0.5,
  fontSize: 20, fontFace: "Arial", color: colors.primary, bold: true
});
slide9.addText("入口：ima.cj.qq.com", {
  x: 0.7, y: 1.8, w: 8.6, h: 0.4,
  fontSize: 16, fontFace: "Arial", color: colors.dark
});
slide9.addText("上传资料 → AI理解 → 问答/出题", {
  x: 0.7, y: 2.2, w: 8.6, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: colors.gray
});

// 核心功能
slide9.addText("核心功能", {
  x: 0.5, y: 3.0, w: 9, h: 0.5,
  fontSize: 18, fontFace: "Arial", color: colors.dark, bold: true
});

const imaFuncs = [
  { icon: "📚", title: "上传资料", desc: "PDF、Word、图片" },
  { icon: "🤖", title: "AI理解", desc: "自动解析内容" },
  { icon: "📝", title: "问答出题", desc: "基于资料生成内容" }
];

let funcX = 0.5;
imaFuncs.forEach((f, i) => {
  slide9.addShape(pres.shapes.RECTANGLE, {
    x: funcX, y: 3.5, w: 2.9, h: 1.6,
    fill: { color: colors.white },
    shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.1 }
  });
  slide9.addText(f.icon, {
    x: funcX, y: 3.7, w: 2.9, h: 0.6,
    fontSize: 24, align: "center"
  });
  slide9.addText(f.title, {
    x: funcX + 0.2, y: 4.3, w: 2.5, h: 0.4,
    fontSize: 14, fontFace: "Arial", color: colors.dark, bold: true, align: "center"
  });
  slide9.addText(f.desc, {
    x: funcX + 0.2, y: 4.7, w: 2.5, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: colors.gray, align: "center"
  });
  funcX += 3.1;
});

// ===== 第10页：上传资料 =====
let slide10 = pres.addSlide();
slide10.background = { color: colors.light };

slide10.addText("上传知识点资料", {
  x: 0.5, y: 0.4, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Arial Black", color: colors.dark, bold: true
});

// 步骤
const uploadSteps = [
  { num: "1", title: "新建知识库", desc: "点击+创建专属知识库" },
  { num: "2", title: "上传文档", desc: "支持PDF、Word、图片等" },
  { num: "3", title: "等待解析", desc: "AI自动理解内容" }
];

let upX = 0.5;
uploadSteps.forEach((s, i) => {
  slide10.addShape(pres.shapes.OVAL, {
    x: upX, y: 1.3, w: 0.6, h: 0.6,
    fill: { color: colors.secondary }
  });
  slide10.addText(s.num, {
    x: upX, y: 1.3, w: 0.6, h: 0.6,
    fontSize: 20, fontFace: "Arial", color: colors.white, align: "center", valign: "middle", bold: true
  });
  slide10.addText(s.title, {
    x: upX + 0.8, y: 1.25, w: 2.5, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: colors.dark, bold: true
  });
  slide10.addText(s.desc, {
    x: upX + 0.8, y: 1.65, w: 2.5, h: 0.3,
    fontSize: 12, fontFace: "Arial", color: colors.gray
  });
  upX += 3.2;
});

// 支持格式
slide10.addText("支持的资料类型", {
  x: 0.5, y: 2.5, w: 9, h: 0.5,
  fontSize: 18, fontFace: "Arial", color: colors.dark, bold: true
});

const fileTypes = ["背诵知识点", "练习册", "教案", "课本", "PDF", "Word", "图片"];
let typeX = 0.5;
fileTypes.forEach((t, i) => {
  slide10.addShape(pres.shapes.RECTANGLE, {
    x: typeX, y: 3.0, w: 1.3, h: 0.5,
    fill: { color: colors.primary, transparency: 85 }
  });
  slide10.addText(t, {
    x: typeX, y: 3.0, w: 1.3, h: 0.5,
    fontSize: 12, fontFace: "Arial", color: colors.dark, align: "center", valign: "middle"
  });
  typeX += 1.4;
});

// 实际案例
slide10.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.8, w: 9, h: 1.3,
  fill: { color: colors.accent, transparency: 85 }
});
slide10.addText("💡 实际案例", {
  x: 0.7, y: 3.95, w: 8.6, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: colors.dark, bold: true
});
slide10.addText("上传【店铺运营学测背诵知识点】+【练习册】，让AI基于资料出题", {
  x: 0.7, y: 4.35, w: 8.6, h: 0.6,
  fontSize: 13, fontFace: "Arial", color: colors.dark
});

// ===== 第11页：用IMA出题 =====
let slide11 = pres.addSlide();
slide11.background = { color: colors.light };

slide11.addText("用IMA AI出题", {
  x: 0.5, y: 0.4, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Arial Black", color: colors.dark, bold: true
});

slide11.addText("上传资料后，直接对话让AI出题", {
  x: 0.5, y: 1.0, w: 9, h: 0.4,
  fontSize: 16, fontFace: "Arial", color: colors.gray
});

// 提示词示例
slide11.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.5, w: 9, h: 2.2,
  fill: { color: colors.white },
  shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.1 }
});
slide11.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.5, w: 9, h: 0.08,
  fill: { color: colors.primary }
});

slide11.addText("提示词示例", {
  x: 0.7, y: 1.7, w: 8.6, h: 0.4,
  fontSize: 16, fontFace: "Arial", color: colors.primary, bold: true
});

slide11.addText([
  { text: "• 根据上传资料，设计项目X的题目", options: { breakLine: true } },
  { text: "• 生成10道选择题，包含答案", options: { breakLine: true } },
  { text: "• 出5道判断题，考验学生理解", options: { breakLine: true } },
  { text: "• 请针对【某个知识点】出3道简答题" }
], {
  x: 0.7, y: 2.2, w: 8.6, h: 1.4,
  fontSize: 14, fontFace: "Arial", color: colors.dark
});

// ===== 第12页：问卷星格式 =====
let slide12 = pres.addSlide();
slide12.background = { color: colors.light };

slide12.addText("按问卷星格式生成", {
  x: 0.5, y: 0.4, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Arial Black", color: colors.dark, bold: true
});

slide12.addText("把题目格式模板发给AI，一键复制到问卷星", {
  x: 0.5, y: 1.0, w: 9, h: 0.4,
  fontSize: 16, fontFace: "Arial", color: colors.gray
});

// 格式示例
slide12.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.5, w: 9, h: 2.0,
  fill: { color: colors.dark }
});

slide12.addText("问卷星格式示例", {
  x: 0.7, y: 1.65, w: 8.6, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: colors.secondary, bold: true
});

slide12.addText("1. 题目内容\nA. 选项1\nB. 选项2\n答案：A\n\n2. 题目内容\nA. 选项1\nB. 选项2\n答案：B", {
  x: 0.7, y: 2.1, w: 8.6, h: 1.3,
  fontSize: 12, fontFace: "Consolas", color: colors.white
});

// 步骤
slide12.addText("操作步骤", {
  x: 0.5, y: 3.7, w: 9, h: 0.4,
  fontSize: 16, fontFace: "Arial", color: colors.dark, bold: true
});

slide12.addText([
  { text: "① 把问卷星题目模板发给IMA", options: { breakLine: true } },
  { text: "② 让AI按格式生成题目", options: { breakLine: true } },
  { text: "③ 一键复制到问卷星" }
], {
  x: 0.5, y: 4.1, w: 9, h: 1,
  fontSize: 13, fontFace: "Arial", color: colors.gray
});

// ===== 第13页：实战案例 =====
let slide13 = pres.addSlide();
slide13.background = { color: colors.primary };

slide13.addText("实战案例", {
  x: 0.5, y: 0.4, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Arial Black", color: colors.white, bold: true
});

slide13.addText("店铺运营学测题库生成", {
  x: 0.5, y: 1.1, w: 9, h: 0.5,
  fontSize: 20, fontFace: "Arial", color: colors.secondary
});

// 案例流程
const caseSteps = [
  "上传背诵知识点",
  "上传练习册",
  "输入提示词",
  "获取题目",
  "复制到问卷星"
];

let caseX = 0.5;
caseSteps.forEach((s, i) => {
  slide13.addShape(pres.shapes.OVAL, {
    x: caseX + 0.7, y: 2.0, w: 0.5, h: 0.5,
    fill: { color: colors.accent }
  });
  slide13.addText(String(i + 1), {
    x: caseX + 0.7, y: 2.0, w: 0.5, h: 0.5,
    fontSize: 16, fontFace: "Arial", color: colors.white, align: "center", valign: "middle", bold: true
  });
  slide13.addText(s, {
    x: caseX, y: 2.6, w: 1.9, h: 0.8,
    fontSize: 12, fontFace: "Arial", color: colors.white, align: "center"
  });
  
  if (i < caseSteps.length - 1) {
    slide13.addText("→", {
      x: caseX + 1.9, y: 2.1, w: 0.5, h: 0.4,
      fontSize: 20, fontFace: "Arial", color: colors.accent, align: "center"
    });
  }
  caseX += 2.1;
});

// 效果
slide13.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.6, w: 9, h: 1.5,
  fill: { color: colors.white, transparency: 90 }
});

slide13.addText("效果展示", {
  x: 0.7, y: 3.75, w: 8.6, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: colors.accent, bold: true
});
slide13.addText([
  { text: "✅ 10道选择题 + 5道判断题", options: { breakLine: true } },
  { text: "✅ 包含完整答案", options: { breakLine: true } },
  { text: "✅ 按问卷星格式直接导入" }
], {
  x: 0.7, y: 4.2, w: 8.6, h: 0.9,
  fontSize: 13, fontFace: "Arial", color: colors.white
});

// ===== 第14页：总结 =====
let slide14 = pres.addSlide();
slide14.background = { color: colors.dark };

slide14.addText("总结与展望", {
  x: 0.5, y: 0.4, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Arial Black", color: colors.white, bold: true
});

const summary = [
  { title: "工具组合", desc: "DeepSeek + IMA 组合使用效率更高" },
  { title: "老师角色", desc: "从执行者→设计者" },
  { title: "让学生参与", desc: "AI使用过程也是学习" }
];

let sumY = 1.3;
summary.forEach((s, i) => {
  slide14.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: sumY, w: 9, h: 1.1,
    fill: { color: colors.white, transparency: 90 }
  });
  slide14.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: sumY, w: 0.1, h: 1.1,
    fill: { color: colors.accent }
  });
  slide14.addText(s.title, {
    x: 0.8, y: sumY + 0.15, w: 8.5, h: 0.4,
    fontSize: 18, fontFace: "Arial", color: colors.white, bold: true
  });
  slide14.addText(s.desc, {
    x: 0.8, y: sumY + 0.55, w: 8.5, h: 0.4,
    fontSize: 14, fontFace: "Arial", color: colors.gray
  });
  sumY += 1.3;
});

// 结束语
slide14.addText("谢谢！有问题随时找我~", {
  x: 0.5, y: 4.8, w: 9, h: 0.5,
  fontSize: 16, fontFace: "Arial", color: colors.secondary, align: "center"
});

// 保存
pres.writeFile({ fileName: "/Users/holly/.openclaw/workspace/AI赋能课堂教学.pptx" })
  .then(() => console.log("PPT created successfully!"))
  .catch(err => console.error(err));
