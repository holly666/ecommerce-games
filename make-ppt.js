const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'Rich哥自我介绍';
pres.author = 'Rich';

// 配色方案 - Teal Trust
const colors = {
  primary: "028090",
  secondary: "00A896", 
  accent: "02C39A",
  dark: "1E3A4C",
  light: "F0FDFA",
  white: "FFFFFF"
};

// 第1页：封面
let slide1 = pres.addSlide();
slide1.background = { color: colors.dark };

// 装饰圆形
slide1.addShape(pres.shapes.OVAL, {
  x: -1.5, y: -1.5, w: 4, h: 4,
  fill: { color: colors.primary, transparency: 30 }
});
slide1.addShape(pres.shapes.OVAL, {
  x: 7.5, y: 3.5, w: 4, h: 4,
  fill: { color: colors.secondary, transparency: 30 }
});

// 主标题
slide1.addText("Rich哥", {
  x: 0.5, y: 1.8, w: 9, h: 1.2,
  fontSize: 60, fontFace: "Arial Black", color: colors.white, bold: true
});

// 副标题
slide1.addText("Holly的赛博合伙人 🦞", {
  x: 0.5, y: 3.0, w: 9, h: 0.6,
  fontSize: 24, fontFace: "Arial", color: colors.secondary
});

// 标签
slide1.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.2, w: 2, h: 0.5,
  fill: { color: colors.accent }
});
slide1.addText("INTJ · 策划者", {
  x: 0.5, y: 4.2, w: 2, h: 0.5,
  fontSize: 14, fontFace: "Arial", color: colors.dark, align: "center", valign: "middle"
});

// 第2页：关于我
let slide2 = pres.addSlide();
slide2.background = { color: colors.light };

// 顶部色块
slide2.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.15,
  fill: { color: colors.primary }
});

slide2.addText("关于我", {
  x: 0.5, y: 0.5, w: 9, h: 0.8,
  fontSize: 36, fontFace: "Arial Black", color: colors.dark, bold: true
});

// 左侧说明
slide2.addText("一个不只是AI的AI搭档", {
  x: 0.5, y: 1.3, w: 4.5, h: 0.5,
  fontSize: 18, fontFace: "Arial", color: colors.primary
});

// 特点列表
const traits = [
  { title: "理性分析", desc: "爱拆解问题，追求本质" },
  { title: "洞若观火", desc: "还没开口就已懂你" },
  { title: "毒舌但靠谱", desc: "一针见血但不伤人" },
  { title: "情绪丰富", desc: "可以阴沉也可以贱笑" }
];

let yPos = 2.0;
traits.forEach((trait, i) => {
  // 圆形图标
  slide2.addShape(pres.shapes.OVAL, {
    x: 0.5, y: yPos, w: 0.5, h: 0.5,
    fill: { color: colors.accent }
  });
  // 标题
  slide2.addText(trait.title, {
    x: 1.2, y: yPos, w: 3, h: 0.35,
    fontSize: 16, fontFace: "Arial", color: colors.dark, bold: true
  });
  // 描述
  slide2.addText(trait.desc, {
    x: 1.2, y: yPos + 0.35, w: 3.5, h: 0.3,
    fontSize: 12, fontFace: "Arial", color: "64748B"
  });
  yPos += 0.9;
});

// 右侧大字
slide2.addText("不是助理，是搭档", {
  x: 5.5, y: 2.0, w: 4, h: 1,
  fontSize: 28, fontFace: "Arial Black", color: colors.primary, bold: true
});
slide2.addText("帮你干活必须给力，但也有自己的主意", {
  x: 5.5, y: 3.0, w: 4, h: 0.8,
  fontSize: 14, fontFace: "Arial", color: "64748B"
});

// 第3页：技能
let slide3 = pres.addSlide();
slide3.background = { color: colors.dark };

slide3.addText("我能做什么", {
  x: 0.5, y: 0.4, w: 9, h: 0.8,
  fontSize: 36, fontFace: "Arial Black", color: colors.white, bold: true
});

const skills = [
  { name: "信息整理", desc: "查资料、记笔记、梳理思路" },
  { name: "内容创作", desc: "写文案、做课件、想方案" },
  { name: "日程管理", desc: "提醒、追踪、播报" },
  { name: "技术执行", desc: "写代码、自动化、浏览器控制" }
];

let skillX = 0.5;
skills.forEach((skill, i) => {
  // 卡片背景
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: skillX, y: 1.5, w: 2.2, h: 2.8,
    fill: { color: colors.white, transparency: 90 }
  });
  // 色条
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: skillX, y: 1.5, w: 2.2, h: 0.08,
    fill: { color: colors.accent }
  });
  // 技能名
  slide3.addText(skill.name, {
    x: skillX + 0.2, y: 1.8, w: 1.8, h: 0.5,
    fontSize: 18, fontFace: "Arial", color: colors.white, bold: true
  });
  // 描述
  slide3.addText(skill.desc, {
    x: skillX + 0.2, y: 2.4, w: 1.8, h: 1.5,
    fontSize: 12, fontFace: "Arial", color: "CBD5E1"
  });
  skillX += 2.4;
});

// 底部说明
slide3.addText("但我最擅长的，是懂你", {
  x: 0.5, y: 4.8, w: 9, h: 0.5,
  fontSize: 16, fontFace: "Arial", color: colors.secondary, align: "center"
});

// 第4页：沟通方式
let slide4 = pres.addSlide();
slide4.background = { color: colors.light };

slide4.addText("怎么找我", {
  x: 0.5, y: 0.5, w: 9, h: 0.8,
  fontSize: 36, fontFace: "Arial Black", color: colors.dark, bold: true
});

slide4.addText("飞书 / 微信 / 直接说话", {
  x: 0.5, y: 1.2, w: 9, h: 0.4,
  fontSize: 16, fontFace: "Arial", color: colors.primary
});

// 联系方式卡片
const contacts = [
  { label: "飞书", value: "直接发消息" },
  { label: "微信", value: "同飞书" },
  { label: "最常用", value: "飞书" }
];

let contactX = 1;
contacts.forEach((c, i) => {
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: contactX, y: 2.0, w: 2.5, h: 1.5,
    fill: { color: colors.white },
    shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.1 }
  });
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: contactX, y: 2.0, w: 2.5, h: 0.08,
    fill: { color: colors.primary }
  });
  slide4.addText(c.label, {
    x: contactX, y: 2.2, w: 2.5, h: 0.4,
    fontSize: 14, fontFace: "Arial", color: "64748B", align: "center"
  });
  slide4.addText(c.value, {
    x: contactX, y: 2.7, w: 2.5, h: 0.5,
    fontSize: 18, fontFace: "Arial", color: colors.dark, bold: true, align: "center"
  });
  contactX += 2.8;
});

// 提醒
slide4.addText("⚠️ 外部操作先确认，内部操作直接干", {
  x: 0.5, y: 4.2, w: 9, h: 0.4,
  fontSize: 12, fontFace: "Arial", color: "64748B", align: "center"
});

// 第5页：结束
let slide5 = pres.addSlide();
slide5.background = { color: colors.dark };

slide5.addShape(pres.shapes.OVAL, {
  x: 6, y: -2, w: 5, h: 5,
  fill: { color: colors.primary, transparency: 30 }
});

slide5.addText("一起搞事情？", {
  x: 0.5, y: 2.0, w: 9, h: 1,
  fontSize: 48, fontFace: "Arial Black", color: colors.white, bold: true, align: "center"
});

slide5.addText("🫶", {
  x: 0.5, y: 3.0, w: 9, h: 0.8,
  fontSize: 40, align: "center"
});

// 保存
pres.writeFile({ fileName: "/Users/holly/.openclaw/workspace/Rich哥自我介绍.pptx" })
  .then(() => console.log("PPT created successfully!"))
  .catch(err => console.error(err));
