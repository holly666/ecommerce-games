const PptxGenJS = require("pptxgenjs");

let pptx = new PptxGenJS();
pptx.layout = "LAYOUT_16x9";
let slide = pptx.addSlide();
slide.background = { color: "FFF9F0" };

// 标题
slide.addText("一周健康菜谱", {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  fontSize: 28, bold: true, color: "2D3436",
  fontFace: "Microsoft YaHei", align: "center"
});

slide.addText("（2026.03.27 - 04.02）", {
  x: 0.5, y: 0.85, w: 9, h: 0.35,
  fontSize: 14, color: "636E72", fontFace: "Microsoft YaHei", align: "center"
});

const days = [
  { day: "周五 3/27", color: "E17055", items: [
    ["早餐", "杂粮包 + 水煮蛋 + 麻酱菠菜"],
    ["午餐", "（学校）"],
    ["晚餐", "清蒸鱼 + 麻酱菠菜 + 米饭"]
  ]},
  { day: "周六 3/28", color: "FDCB6E", items: [
    ["早餐", "红薯 + 鸡蛋灌饼 + 炒小青菜"],
    ["午餐", "烤鸡翅 + 茼蒿 + 玉米段"],
    ["晚餐", "牛肉炖土豆 + 青菜"]
  ]},
  { day: "周日 3/29", color: "74B9FF", items: [
    ["早餐", "山药粥 + 鸡蛋 + 凉拌菠菜"],
    ["午餐", "烤鸡翅 + 茼蒿"],
    ["晚餐", "清炒小青菜 + 山药鱼汤 + 米饭"]
  ]},
  { day: "周一 3/30", color: "55A3FF", items: [
    ["早餐", "杂粮包 + 煎蛋 + 麻酱菠菜"],
    ["午餐", "（学校）"],
    ["晚餐", "山药炒肉片 + 青菜 + 米饭"]
  ]},
  { day: "周二 3/31", color: "A29BFE", items: [
    ["早餐", "豆浆 + 红薯 + 水煮蛋"],
    ["午餐", "（学校）"],
    ["晚餐", "鸡蛋灌饼 + 青菜汤"]
  ]},
  { day: "周三 4/1", color: "FD79A8", items: [
    ["早餐", "鸡蛋灌饼 + 炒菠菜"],
    ["午餐", "（学校）"],
    ["晚餐", "（学校晚自习）"]
  ]},
  { day: "周四 4/2", color: "00CEC9", items: [
    ["早餐", "杂粮包 + 山药泥 + 荷包蛋"],
    ["午餐", "（学校）"],
    ["晚餐", "（学校晚自习）"]
  ]}
];

const colW = 1.28;
const rowH = 0.95;
const startX = 0.2;
const startY = 1.4;

days.forEach((d, i) => {
  const x = startX + i * colW;
  
  // 星期标题背景
  slide.addShape("roundRect", {
    x: x, y: startY, w: colW, h: 0.38,
    fill: { color: d.color }, rectRadius: 0.06
  });
  slide.addText(d.day, {
    x: x, y: startY, w: colW, h: 0.38,
    fontSize: 9, bold: true, color: "FFFFFF",
    fontFace: "Microsoft YaHei", align: "center", valign: "middle", margin: 0
  });

  // 三餐
  d.items.forEach((item, j) => {
    const y = startY + 0.45 + j * rowH;
    const bgColor = j % 2 === 0 ? "FFFFFF" : "F5F6FA";
    
    slide.addShape("roundRect", {
      x: x, y: y, w: colW, h: rowH,
      fill: { color: bgColor }, rectRadius: 0.05,
      line: { color: "E8E8E8", width: 0.5 }
    });
    
    // 餐次标签
    slide.addText(item[0], {
      x: x, y: y + 0.05, w: colW, h: 0.22,
      fontSize: 8, bold: true, color: d.color,
      fontFace: "Microsoft YaHei", align: "center", valign: "middle", margin: 0
    });
    
    // 内容
    slide.addText(item[1], {
      x: x + 0.03, y: y + 0.26, w: colW - 0.06, h: rowH - 0.3,
      fontSize: 7, color: "2D3436",
      fontFace: "Microsoft YaHei", align: "center", valign: "top", margin: 0
    });
  });
});

// 底部备注
slide.addText("叶菜2-3天内吃完 · 鸡翅用空气炸锅200度烤 · 调味不加糖葱蒜", {
  x: 0.5, y: 5.25, w: 9, h: 0.3,
  fontSize: 10, color: "B2BEC3", fontFace: "Microsoft YaHei", align: "center"
});

pptx.writeFile({fileName: "/Users/holly/.openclaw/workspace/一周菜谱.pptx"}).then(() => {
  console.log("done");
});
