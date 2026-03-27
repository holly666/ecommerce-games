#!/usr/bin/env node
const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = '高效做笔记';
pres.author = 'Holly';

const C = {
  primary: "028090", secondary: "00A896", accent: "F96167",
  light: "E8F6F3", dark: "1A3A3A", white: "FFFFFF",
  gray: "64748B", yellow: "F7DC6F", orange: "E67E22",
  purple: "8B5CF6", pink: "EC4899",
};
const F = { title: "Arial Black", body: "Arial" };

// ========== Slide 1: 封面 ==========
let s1 = pres.addSlide();
s1.background = { color: C.dark };
s1.addShape(pres.shapes.OVAL, { x: -1, y: -1, w: 4, h: 4, fill: { color: C.primary, transparency: 70 } });
s1.addShape(pres.shapes.OVAL, { x: 7.5, y: 3, w: 4, h: 4, fill: { color: C.secondary, transparency: 70 } });
s1.addText("📝", { x: 0.5, y: 1.2, w: 9, h: 1, fontSize: 72, align: "center" });
s1.addText("高效做笔记", { x: 0.5, y: 2.2, w: 9, h: 1, fontSize: 52, fontFace: F.title, color: C.white, bold: true, align: "center" });
s1.addText("让知识真正进脑子", { x: 0.5, y: 3.3, w: 9, h: 0.6, fontSize: 24, color: C.secondary, align: "center" });
s1.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 4.0, w: 3, h: 0.05, fill: { color: C.accent } });
s1.addText("高二《网络营销推广》| 24电商1班 & 3班", { x: 0.5, y: 4.5, w: 9, h: 0.5, fontSize: 16, color: C.gray, align: "center" });

// ========== Slide 2: 灵魂拷问 ==========
let s2 = pres.addSlide();
s2.background = { color: C.white };
s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.15, h: 5.625, fill: { color: C.accent } });
s2.addText("😱 灵魂拷问", { x: 0.5, y: 0.3, w: 9, h: 0.7, fontSize: 32, fontFace: F.title, color: C.dark, bold: true });
s2.addShape(pres.shapes.LINE, { x: 0.5, y: 1.0, w: 2, h: 0, line: { color: C.accent, width: 4 } });
s2.addText([
  { text: "你的笔记本是不是花花绿绿全是荧光笔？", options: { bullet: true, breakLine: true } },
  { text: "划完重点合上书，明天还记得多少？", options: { bullet: true, breakLine: true } },
  { text: "考试前复习，对着一堆画线发呆？", options: { bullet: true, breakLine: true } },
  { text: "上课奋笔疾书，结果只是抄了一遍教材？", options: { bullet: true } },
], { x: 0.7, y: 1.3, w: 8.5, h: 2.5, fontSize: 22, fontFace: F.body, color: C.dark, paraSpaceAfter: 12 });
s2.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 4.0, w: 9, h: 1.2, fill: { color: "FEF3F2" }, rectRadius: 0.1, line: { color: C.accent, width: 2 } });
s2.addText([
  { text: "❌ 无效笔记 = 抄书 + 划线 + 感动自己\n", options: { bold: true, color: C.accent, breakLine: true } },
  { text: "笔记是为了 ", options: { color: C.dark } },
  { text: "理解和记忆", options: { bold: true, color: C.dark } },
  { text: "，不是为了好看！", options: { color: C.dark } },
], { x: 0.7, y: 4.15, w: 8.6, h: 1.0, fontSize: 20, fontFace: F.body, valign: "middle" });

// ========== Slide 3: 好笔记标准 ==========
let s3 = pres.addSlide();
s3.background = { color: C.light };
s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.primary } });
s3.addText("✅ 好笔记的三个标准", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 30, fontFace: F.title, color: C.white, bold: true });
const criteria = [
  { num: "1", title: "关键词捕捉", desc: "记核心概念，不抄完整句子\n用自己的话复述" },
  { num: "2", title: "结构化组织", desc: "用框架/图示整理内容\n知识之间有逻辑关系" },
  { num: "3", title: "主动回顾", desc: "课后立即整理\n定期复习，不是等考前" },
];
criteria.forEach((c, i) => {
  const x = 0.5 + i * 3.1;
  s3.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x, y: 1.3, w: 2.9, h: 3.8, fill: { color: C.white }, rectRadius: 0.15, shadow: { type: "outer", blur: 6, offset: 3, angle: 135, color: "000000", opacity: 0.1 } });
  s3.addShape(pres.shapes.OVAL, { x: x + 1.05, y: 1.5, w: 0.8, h: 0.8, fill: { color: C.secondary } });
  s3.addText(c.num, { x: x + 1.05, y: 1.5, w: 0.8, h: 0.8, fontSize: 28, fontFace: F.title, color: C.white, bold: true, align: "center", valign: "middle" });
  s3.addText(c.title, { x: x + 0.15, y: 2.5, w: 2.6, h: 0.6, fontSize: 18, fontFace: F.title, color: C.dark, bold: true, align: "center" });
  s3.addText(c.desc, { x: x + 0.15, y: 3.2, w: 2.6, h: 1.6, fontSize: 14, fontFace: F.body, color: C.gray, align: "center" });
});

// ========== Slide 4: 康奈尔笔记法 ==========
let s4 = pres.addSlide();
s4.background = { color: C.white };
s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.primary } });
s4.addText("🥇 康奈尔笔记法 — 全球公认最有效的笔记系统", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 26, fontFace: F.title, color: C.white, bold: true });

s4.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.2, w: 5.8, h: 4.0, fill: { color: C.white }, line: { color: C.primary, width: 2 } });
s4.addText("📝 笔记区（上课时）", { x: 0.5, y: 1.25, w: 5.8, h: 0.45, fontSize: 14, fontFace: F.body, color: C.primary, bold: true, align: "center" });
s4.addShape(pres.shapes.LINE, { x: 0.5, y: 1.7, w: 5.8, h: 0, line: { color: C.primary, width: 1 } });
s4.addText([
  { text: "• 记录老师讲的关键词/概念\n", options: { breakLine: true } },
  { text: "• 用简短句子，不要全抄\n", options: { breakLine: true } },
  { text: "• 听不懂的先画个？课后补\n", options: { breakLine: true } },
  { text: "• 边听边思考，不是打字员", options: {} },
], { x: 0.7, y: 1.85, w: 5.4, h: 3.2, fontSize: 16, fontFace: F.body, color: C.dark });

s4.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: 1.2, w: 3.0, h: 1.6, fill: { color: C.yellow }, line: { color: C.orange, width: 2 } });
s4.addText("💡 提示栏（课后）", { x: 6.5, y: 1.25, w: 3.0, h: 0.4, fontSize: 14, fontFace: F.body, color: C.dark, bold: true, align: "center" });
s4.addShape(pres.shapes.LINE, { x: 6.5, y: 1.65, w: 3.0, h: 0, line: { color: C.orange, width: 1 } });
s4.addText("右侧留白，课后写：\n• 疑问？\n• 关键词\n• 自己的理解", { x: 6.6, y: 1.75, w: 2.8, h: 1.0, fontSize: 13, fontFace: F.body, color: C.dark });

s4.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: 3.0, w: 3.0, h: 2.2, fill: { color: C.secondary }, line: { color: C.primary, width: 2 } });
s4.addText("🎯 总结区（复习时）", { x: 6.5, y: 3.05, w: 3.0, h: 0.4, fontSize: 14, fontFace: F.body, color: C.white, bold: true, align: "center" });
s4.addShape(pres.shapes.LINE, { x: 6.5, y: 3.45, w: 3.0, h: 0, line: { color: C.primary, width: 1 } });
s4.addText([
  { text: "用一句话总结这页内容：\n\n• 写下核心概念\n• 考前快速回忆用\n• 捂住笔记区，背诵检验", options: {} }
], { x: 6.6, y: 3.55, w: 2.8, h: 1.6, fontSize: 13, fontFace: F.body, color: C.white });

s4.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 5.25, w: 9.0, h: 0.35, fill: { color: C.light }, rectRadius: 0.05 });
s4.addText("📌 比例：笔记区占60% | 提示栏20% | 总结区20%  |  横线下方的总结区是精髓！", { x: 0.5, y: 5.25, w: 9.0, h: 0.35, fontSize: 13, fontFace: F.body, color: C.primary, align: "center", valign: "middle" });

// ========== Slide 5: 5R复习法 ==========
let s5 = pres.addSlide();
s5.background = { color: C.white };
s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.secondary } });
s5.addText("🔄 5R复习法 — 笔记记完怎么用？", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 28, fontFace: F.title, color: C.white, bold: true });

const r5 = [
  { r: "Record", cn: "记录", desc: "上课快速记录关键词", color: C.primary, icon: "✏️" },
  { r: "Reduce", cn: "简化", desc: "课后整理，删减多余", color: C.secondary, icon: "✂️" },
  { r: "Recite", cn: "背诵", desc: "捂住笔记，背出要点", color: C.orange, icon: "🗣️" },
  { r: "Reflect", cn: "思考", desc: "写下疑问和个人理解", color: C.accent, icon: "💭" },
  { r: "Review", cn: "复习", desc: "每天/每周定期回顾", color: C.primary, icon: "📅" },
];
r5.forEach((item, i) => {
  const x = 0.5 + i * 1.9;
  s5.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x, y: 1.25, w: 1.75, h: 3.5, fill: { color: item.color }, rectRadius: 0.12 });
  s5.addText(item.icon, { x: x, y: 1.4, w: 1.75, h: 0.7, fontSize: 32, align: "center" });
  s5.addText(item.r, { x: x, y: 2.1, w: 1.75, h: 0.5, fontSize: 16, fontFace: F.title, color: C.white, bold: true, align: "center" });
  s5.addText(item.cn, { x: x, y: 2.55, w: 1.75, h: 0.4, fontSize: 18, fontFace: F.title, color: C.yellow, bold: true, align: "center" });
  s5.addText(item.desc, { x: x + 0.08, y: 3.05, w: 1.6, h: 1.4, fontSize: 12, fontFace: F.body, color: C.white, align: "center" });
});
s5.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 4.9, w: 9.0, h: 0.6, fill: { color: "FEF9E7" }, rectRadius: 0.08, line: { color: C.yellow, width: 2 } });
s5.addText("⏰ 黄金复习时间：课后24小时内第一次复习 → 考前第二次 → 一个月后第三次", { x: 0.5, y: 4.9, w: 9.0, h: 0.6, fontSize: 15, fontFace: F.body, color: C.dark, align: "center", valign: "middle", bold: true });

// ========== Slide 6: 艾宾浩斯记忆曲线 ==========
let s6 = pres.addSlide();
s6.background = { color: C.white };
s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.purple } });
s6.addText("🧠 艾宾浩斯记忆曲线 — 为什么要及时复习？", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 26, fontFace: F.title, color: C.white, bold: true });

s6.addText("大脑遗忘规律", { x: 0.5, y: 1.15, w: 4, h: 0.5, fontSize: 20, fontFace: F.title, color: C.dark, bold: true });

const forgettingData = [
  { time: "20分钟后", rate: "58%", barW: 3.8 },
  { time: "1小时后", rate: "44%", barW: 3.8 },
  { time: "1天后", rate: "33%", barW: 3.8 },
  { time: "2天后", rate: "28%", barW: 3.8 },
  { time: "6天后", rate: "25%", barW: 3.8 },
];
forgettingData.forEach((d, i) => {
  const y = 1.7 + i * 0.65;
  const pct = parseFloat(d.rate) / 100;
  const actualW = 3.8 * pct;
  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: y, w: 3.8, h: 0.5, fill: { color: "F3F4F6" }, rectRadius: 0.05 });
  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: y, w: actualW, h: 0.5, fill: { color: C.accent }, rectRadius: 0.05 });
  s6.addText(d.time + " 遗忘" + d.rate, { x: 0.5, y: y, w: 3.8, h: 0.5, fontSize: 14, fontFace: F.body, color: C.dark, align: "center", valign: "middle" });
});

s6.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.0, y: 1.15, w: 4.5, h: 3.8, fill: { color: "F5F3FF" }, rectRadius: 0.15, line: { color: C.purple, width: 2 } });
s6.addText("💡 记住这个规律", { x: 5.2, y: 1.3, w: 4.1, h: 0.5, fontSize: 18, fontFace: F.title, color: C.purple, bold: true });
s6.addText([
  { text: "❌ 错误做法\n", options: { bold: true, color: C.accent, breakLine: true } },
  { text: "上课记笔记 → 丢一边不管\n→ 考前临时抱佛脚\n\n", options: { breakLine: true } },
  { text: "✅ 正确做法\n", options: { bold: true, color: "059669", breakLine: true } },
  { text: "当天：整理+背诵（10分钟）\n第2天：快速回顾（5分钟）\n第7天：再复习一次（5分钟）\n第30天：月末总复习", options: {} },
], { x: 5.2, y: 1.85, w: 4.1, h: 3.0, fontSize: 14, fontFace: F.body, color: C.dark });

s6.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 5.1, w: 9.0, h: 0.45, fill: { color: C.purple }, rectRadius: 0.08 });
s6.addText("📌 记忆的本质是重复！复习的次数越多，遗忘的速度越慢", { x: 0.5, y: 5.1, w: 9.0, h: 0.45, fontSize: 15, fontFace: F.body, color: C.white, align: "center", valign: "middle", bold: true });

// ========== Slide 7: 如何正确划重点 ==========
let s7 = pres.addSlide();
s7.background = { color: C.white };
s7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.orange } });
s7.addText("✏️ 如何正确划重点 — 不是全划！", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 28, fontFace: F.title, color: C.white, bold: true });

s7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.15, w: 9.0, h: 0.7, fill: { color: "FEF3C7" }, rectRadius: 0.1, line: { color: C.yellow, width: 2 } });
s7.addText("🎯 黄金法则：一页笔记，划不超过 20% 的内容！一页10行，最多划2行", { x: 0.5, y: 1.15, w: 9.0, h: 0.7, fontSize: 16, fontFace: F.body, color: C.dark, align: "center", valign: "middle", bold: true });

s7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 2.0, w: 4.3, h: 3.3, fill: { color: "FEF2F2" }, rectRadius: 0.12, line: { color: C.accent, width: 2 } });
s7.addText("❌ 错误的划重点方式", { x: 0.5, y: 2.1, w: 4.3, h: 0.5, fontSize: 16, fontFace: F.title, color: C.accent, bold: true, align: "center" });
s7.addText([
  { text: "✗ 划满整段、整页\n", options: { breakLine: true } },
  { text: "✗ 荧光笔涂满整面\n", options: { breakLine: true } },
  { text: "✗ 老师说的全部划\n", options: { breakLine: true } },
  { text: "✗ 划了等于记住了\n\n", options: { breakLine: true } },
  { text: "结果：考前看起来都是重点\n＝没有重点", options: { italic: true, color: C.gray } },
], { x: 0.7, y: 2.65, w: 3.9, h: 2.5, fontSize: 15, fontFace: F.body, color: C.dark });

s7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.2, y: 2.0, w: 4.3, h: 3.3, fill: { color: "ECFDF5" }, rectRadius: 0.12, line: { color: "059669", width: 2 } });
s7.addText("✅ 正确的划重点方式", { x: 5.2, y: 2.1, w: 4.3, h: 0.5, fontSize: 16, fontFace: F.title, color: "059669", bold: true, align: "center" });
s7.addText([
  { text: "✓ 只划关键词、核心概念\n", options: { breakLine: true } },
  { text: "✓ 划自己真正不懂的点\n", options: { breakLine: true } },
  { text: "✓ 用自己的话在旁边标注\n", options: { breakLine: true } },
  { text: "✓ 划完立刻复习一遍\n\n", options: { breakLine: true } },
  { text: "示例：「SEO」= 搜索引擎优化\n而不是：整段SEO定义全划", options: { italic: true, color: C.gray } },
], { x: 5.4, y: 2.65, w: 3.9, h: 2.5, fontSize: 15, fontFace: F.body, color: C.dark });

// ========== Slide 8: 常见误区 ==========
let s8 = pres.addSlide();
s8.background = { color: "FFF5F5" };
s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.accent } });
s8.addText("❌ 做笔记的常见误区", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 30, fontFace: F.title, color: C.white, bold: true });

const mistakes = [
  { wrong: "划满全篇=都会了", right: "只划20%核心，其他靠思考" },
  { wrong: "抄PPT/抄书原文", right: "只记自己的理解和大纲" },
  { wrong: "笔记密密麻麻", right: "留白很重要，留给复习补充" },
  { wrong: "记完就扔一边", right: "24小时内必须回顾" },
  { wrong: "只有文字没有图", right: "适当用思维导图/框架图" },
];
mistakes.forEach((m, i) => {
  const y = 1.2 + i * 0.85;
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: y, w: 4.3, h: 0.7, fill: { color: "FECACA" }, rectRadius: 0.08 });
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.2, y: y, w: 4.3, h: 0.7, fill: { color: "D1FAE5" }, rectRadius: 0.08 });
  s8.addText("❌ " + m.wrong, { x: 0.6, y: y, w: 4.1, h: 0.7, fontSize: 14, fontFace: F.body, color: C.accent, valign: "middle" });
  s8.addText("✅ " + m.right, { x: 5.3, y: y, w: 4.1, h: 0.7, fontSize: 14, fontFace: F.body, color: "065F46", valign: "middle" });
});

// ========== Slide 9: 电商笔记示例 ==========
let s9 = pres.addSlide();
s9.background = { color: C.white };
s9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.orange } });
s9.addText("📱 电商专业课笔记示例 — 网络营销推广", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 26, fontFace: F.title, color: C.white, bold: true });

s9.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.2, w: 4.3, h: 2.8, fill: { color: "FEF3F2" }, rectRadius: 0.1, line: { color: C.accent, width: 2 } });
s9.addText("❌ 低效笔记", { x: 0.5, y: 1.25, w: 4.3, h: 0.4, fontSize: 16, fontFace: F.title, color: C.accent, bold: true, align: "center" });
s9.addText([
  { text: "第三章 网络营销推广\n", options: { bold: true, breakLine: true } },
  { text: "1. 网络营销的定义\n", options: { breakLine: true } },
  { text: "2. 网络营销的特点\n", options: { breakLine: true } },
  { text: "3. 常用营销方式：SEO、SEM、社群\n   营销、内容营销...\n", options: { breakLine: true } },
  { text: "（整页都是抄书，一个字没理解）", options: { italic: true, color: C.accent } },
], { x: 0.7, y: 1.7, w: 3.9, h: 2.2, fontSize: 13, fontFace: F.body, color: C.dark });

s9.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.2, y: 1.2, w: 4.3, h: 2.8, fill: { color: "ECFDF5" }, rectRadius: 0.1, line: { color: "059669", width: 2 } });
s9.addText("✅ 高效笔记", { x: 5.2, y: 1.25, w: 4.3, h: 0.4, fontSize: 16, fontFace: F.title, color: "059669", bold: true, align: "center" });
s9.addText([
  { text: "营销漏斗模型（康奈尔）\n", options: { bold: true, breakLine: true } },
  { text: "流量→转化→留存→复购\n", options: { breakLine: true } },
  { text: "SEM = 付费买流量，见效快但贵\n", options: { breakLine: true } },
  { text: "SEO = 免费优化，见效慢但稳\n", options: { breakLine: true } },
  { text: "?: 私域流量和公域的区别？", options: { italic: true, color: C.orange } },
], { x: 5.4, y: 1.7, w: 3.9, h: 2.2, fontSize: 13, fontFace: F.body, color: C.dark });

s9.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 4.15, w: 9.0, h: 1.3, fill: { color: C.light }, rectRadius: 0.1 });
s9.addText([
  { text: "💡 好笔记 = 自己的话 + 框架结构 + 疑问记录 + 定期复习\n", options: { bold: true, breakLine: true } },
  { text: "电商专业术语多，一定要理解每个词的含义再记！死记硬背没用", options: { color: C.dark } },
], { x: 0.7, y: 4.25, w: 8.6, h: 1.1, fontSize: 16, fontFace: F.body, color: C.dark, valign: "middle" });

// ========== Slide 10: 思维导图 ==========
let s10 = pres.addSlide();
s10.background = { color: C.white };
s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.primary } });
s10.addText("🧠 思维导图 — 让知识可视化", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 30, fontFace: F.title, color: C.white, bold: true });

s10.addShape(pres.shapes.OVAL, { x: 4.0, y: 2.2, w: 2.0, h: 1.2, fill: { color: C.primary } });
s10.addText("网络营销\n推广方式", { x: 4.0, y: 2.2, w: 2.0, h: 1.2, fontSize: 13, fontFace: F.title, color: C.white, bold: true, align: "center", valign: "middle" });

const branches = [
  { text: "搜索营销\nSEO/SEM", x: 1.2, y: 1.3, color: C.secondary },
  { text: "社群营销\n微信/小红书", x: 7.0, y: 1.3, color: C.secondary },
  { text: "内容营销\n短视频/图文", x: 0.8, y: 3.6, color: C.orange },
  { text: "直播电商\n抖音/淘宝", x: 7.3, y: 3.6, color: C.orange },
  { text: "私域运营\n社群/公众号", x: 4.0, y: 4.5, color: C.accent },
];
branches.forEach(b => {
  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: b.x, y: b.y, w: 1.8, h: 0.9, fill: { color: b.color }, rectRadius: 0.12 });
  s10.addText(b.text, { x: b.x, y: b.y, w: 1.8, h: 0.9, fontSize: 11, fontFace: F.body, color: C.white, bold: true, align: "center", valign: "middle" });
});
s10.addShape(pres.shapes.LINE, { x: 2.9, y: 1.75, w: 1.1, h: 0.6, line: { color: C.gray, width: 2 } });
s10.addShape(pres.shapes.LINE, { x: 6.0, y: 1.75, w: 1.0, h: 0.6, line: { color: C.gray, width: 2 } });
s10.addShape(pres.shapes.LINE, { x: 2.6, y: 4.05, w: 1.4, h: -0.6, line: { color: C.gray, width: 2 } });
s10.addShape(pres.shapes.LINE, { x: 6.0, y: 4.05, w: 1.3, h: -0.6, line: { color: C.gray, width: 2 } });
s10.addShape(pres.shapes.LINE, { x: 5.0, y: 3.4, w: 0, h: 1.1, line: { color: C.gray, width: 2 } });
s10.addText("思维导图适合：整理章节框架、考前快速回顾、梳理知识点关系", { x: 0.5, y: 5.2, w: 9, h: 0.4, fontSize: 14, fontFace: F.body, color: C.gray, align: "center" });

// ========== Slide 11: 行动清单 ==========
let s11 = pres.addSlide();
s11.background = { color: C.dark };
s11.addShape(pres.shapes.OVAL, { x: -2, y: -2, w: 5, h: 5, fill: { color: C.primary, transparency: 60 } });
s11.addShape(pres.shapes.OVAL, { x: 7, y: 3, w: 4, h: 4, fill: { color: C.secondary, transparency: 60 } });
s11.addText("🎯 从今天开始改变", { x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 36, fontFace: F.title, color: C.white, bold: true, align: "center" });
s11.addShape(pres.shapes.LINE, { x: 3, y: 1.2, w: 4, h: 0, line: { color: C.accent, width: 3 } });

const actions = [
  { num: "1", text: "准备一本专门的笔记本（康奈尔格式 or 网格本）" },
  { num: "2", text: "上课只记20%核心，80%靠理解" },
  { num: "3", text: "课后24小时内，必须完成「简化+背诵+疑问」" },
  { num: "4", text: "每周日复习本周所有笔记（30分钟）" },
  { num: "5", text: "试着用思维导图整理本章框架" },
];
actions.forEach((a, i) => {
  const y = 1.5 + i * 0.78;
  s11.addShape(pres.shapes.OVAL, { x: 0.8, y: y + 0.05, w: 0.55, h: 0.55, fill: { color: C.accent } });
  s11.addText(a.num, { x: 0.8, y: y + 0.05, w: 0.55, h: 0.55, fontSize: 18, fontFace: F.title, color: C.white, bold: true, align: "center", valign: "middle" });
  s11.addText(a.text, { x: 1.6, y: y, w: 7.8, h: 0.65, fontSize: 18, fontFace: F.body, color: C.white, valign: "middle" });
});

// ========== Slide 12: 结束 ==========
let s12 = pres.addSlide();
s12.background = { color: C.primary };
s12.addShape(pres.shapes.OVAL, { x: 3, y: 1.5, w: 4, h: 4, fill: { color: C.secondary, transparency: 50 } });
s12.addText("💪", { x: 0.5, y: 1.5, w: 9, h: 1.2, fontSize: 72, align: "center" });
s12.addText("笔记是学习的工具，不是装饰品", { x: 0.5, y: 2.7, w: 9, h: 0.8, fontSize: 28, fontFace: F.title, color: C.white, bold: true, align: "center" });
s12.addText("从今天开始，做一个会学习的人", { x: 0.5, y: 3.6, w: 9, h: 0.6, fontSize: 20, color: C.yellow, align: "center" });
s12.addShape(pres.shapes.LINE, { x: 3, y: 4.3, w: 4, h: 0, line: { color: C.white, width: 2 } });
s12.addText("高二《网络营销推广》", { x: 0.5, y: 4.6, w: 9, h: 0.5, fontSize: 14, color: C.light, align: "center" });

pres.writeFile({ fileName: "/Users/holly/project/ecommerce-games/如何做笔记V2.pptx" })
  .then(() => console.log("OK"))
  .catch(e => console.error("ERROR:", e));
