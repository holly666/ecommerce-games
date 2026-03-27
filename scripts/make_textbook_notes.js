#!/usr/bin/env node
const pptxgen = require("pptxgenjs");
let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
const C = {
  primary: "028090", secondary: "00A896", accent: "F96167",
  light: "E8F6F3", dark: "1A3A3A", white: "FFFFFF",
  gray: "64748B", yellow: "F7DC6F", orange: "E67E22",
  purple: "8B5CF6",
};
const F = { title: "Arial Black", body: "Arial" };

// ========== Slide: 如何在教材上做笔记 ==========
let s = pres.addSlide();
s.background = { color: C.white };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.primary } });
s.addText("📖 如何在教材上做笔记", { x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 28, fontFace: F.title, color: C.white, bold: true });

// 核心原则
s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.15, w: 9.0, h: 0.65, fill: { color: "FEF3C7" }, rectRadius: 0.1, line: { color: C.yellow, width: 2 } });
s.addText("核心原则：教材是大家的笔记来源，不是在课堂重新抄一遍！", { x: 0.5, y: 1.15, w: 9.0, h: 0.65, fontSize: 16, fontFace: F.body, color: C.dark, align: "center", valign: "middle", bold: true });

// 三步法
s.addText("三步法", { x: 0.5, y: 1.95, w: 9, h: 0.45, fontSize: 20, fontFace: F.title, color: C.dark, bold: true });
const steps = [
  { num: "1", title: "课前预习", desc: "快速浏览章节，划出小标题和黑体字，知道这一节讲什么", color: C.primary },
  { num: "2", title: "课中标注", desc: "用铅笔在旁边写关键词、疑问、自己的理解，不要用荧光笔涂", color: C.secondary },
  { num: "3", title: "课后整理", desc: "把老师的补充内容整理到笔记本上，形成自己的知识体系", color: C.orange },
];
steps.forEach((st, i) => {
  const x = 0.5 + i * 3.1;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x, y: 2.45, w: 2.9, h: 2.3, fill: { color: st.color }, rectRadius: 0.12 });
  s.addShape(pres.shapes.OVAL, { x: x + 1.05, y: 2.6, w: 0.8, h: 0.8, fill: { color: C.white } });
  s.addText(st.num, { x: x + 1.05, y: 2.6, w: 0.8, h: 0.8, fontSize: 26, fontFace: F.title, color: st.color, bold: true, align: "center", valign: "middle" });
  s.addText(st.title, { x: x + 0.1, y: 3.5, w: 2.7, h: 0.5, fontSize: 17, fontFace: F.title, color: C.white, bold: true, align: "center" });
  s.addText(st.desc, { x: x + 0.1, y: 4.05, w: 2.7, h: 0.7, fontSize: 12, fontFace: F.body, color: C.white, align: "center" });
});

// 标注颜色指南
s.addText("标注颜色指南", { x: 0.5, y: 4.85, w: 9, h: 0.4, fontSize: 16, fontFace: F.title, color: C.dark, bold: true });
const colors = [
  { color: "FBBF24", label: "黄色", use: "划概念/定义" },
  { color: "F87171", label: "红色", use: "划重点/关键词" },
  { color: "34D399", label: "绿色", use: "划自己不懂的" },
  { color: "60A5FA", label: "蓝色", use: "老师的补充" },
];
colors.forEach((c, i) => {
  const x = 0.5 + i * 2.35;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x, y: 5.25, w: 2.2, h: 0.35, fill: { color: c.color }, rectRadius: 0.05 });
  s.addText(c.label + "：" + c.use, { x: x, y: 5.25, w: 2.2, h: 0.35, fontSize: 11, fontFace: F.body, color: C.dark, align: "center", valign: "middle" });
});

pres.writeFile({ fileName: "/Users/holly/project/ecommerce-games/教材笔记技巧.pptx" })
  .then(() => console.log("OK"))
  .catch(e => console.error("ERROR:", e));
