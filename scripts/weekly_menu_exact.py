#!/usr/bin/env python3
"""一周健康菜谱 - 漫画风设计稿（确保文字精确）"""
from PIL import Image, ImageDraw, ImageFont
import os

# 字体
def font(size):
    candidates = [
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return ImageFont.load_default()

def fontbold(size):
    candidates = [
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/Helvetica Bold.ttc",
        "/Library/Fonts/Arial Bold.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return font(size)

# 画布
W, H = 1200, 1600
img = Image.new("RGB", (W, H), "#FFF5E6")
draw = ImageDraw.Draw(img)

# 颜色
BROWN = "#8B4513"
ORANGE = "#E67E22"
GREEN = "#27AE60"
RED = "#C0392B"
CREAM = "#FFF8DC"
DARK = "#2C1810"
GOLD = "#F39C12"

# ========== 顶部标题 ==========
draw.rectangle([(0, 0), (W, 105)], fill=BROWN)
draw.text((W//2, 42), "一周健康菜谱", font=fontbold(50), fill="white", anchor="mm")
draw.text((W//2, 85), "2026.03.27 - 04.02", font=font(18), fill="#D4A574", anchor="mm")

# 侧边装饰条
draw.rectangle([(0, 105), (10, H-65)], fill=ORANGE)
draw.rectangle([(W-10, 105), (W, H-65)], fill=ORANGE)

# ========== 菜谱数据 ==========
days_data = [
    {"day":"周五","date":"3/27","color":"#E74C3C","breakfast":"杂粮包 + 水煮蛋\n+ 麻酱菠菜","lunch":"（学校）","dinner":"清蒸鱼 + 麻酱菠菜\n+ 米饭"},
    {"day":"周六","date":"3/28","color":"#E67E22","breakfast":"红薯 + 鸡蛋灌饼\n+ 炒小青菜","lunch":"烤鸡翅 + 茼蒿\n+ 玉米段","dinner":"牛肉炖土豆\n+ 青菜"},
    {"day":"周日","date":"3/29","color":"#F39C12","breakfast":"山药粥 + 鸡蛋\n+ 凉拌菠菜","lunch":"烤鸡翅 + 茼蒿","dinner":"清炒小青菜\n+ 山药鱼汤 + 米饭"},
    {"day":"周一","date":"3/30","color":"#27AE60","breakfast":"杂粮包 + 煎蛋\n+ 麻酱菠菜","lunch":"（学校）","dinner":"山药炒肉片\n+ 青菜 + 米饭"},
    {"day":"周二","date":"3/31","color":"#8E44AD","breakfast":"豆浆 + 红薯\n+ 水煮蛋","lunch":"（学校）","dinner":"鸡蛋灌饼\n+ 青菜汤"},
    {"day":"周三","date":"4/1","color":"#2980B9","breakfast":"鸡蛋灌饼\n+ 炒菠菜","lunch":"（学校，晚自习）","dinner":"山药块 + 煎蛋\n（简单吃）"},
    {"day":"周四","date":"4/2","color":"#16A085","breakfast":"杂粮包 + 山药泥\n+ 荷包蛋","lunch":"（学校，晚自习）","dinner":"清蒸鱼 + 青菜\n（简单吃）"},
]

meal_labels = [("早餐", ORANGE), ("午餐", GREEN), ("晚餐", RED)]
meal_x = [125, 465, 805]
meal_content_w = 325

row_start = 118
row_h = 175

for i, day in enumerate(days_data):
    ry = row_start + i * row_h
    dc = day["color"]

    # 日期块
    draw.rectangle([(18, ry+4), (115, ry+row_h-4)], fill=dc)
    draw.text((66, ry+32), day["day"], font=fontbold(22), fill="white", anchor="mm")
    draw.text((66, ry+62), day["date"], font=font(15), fill="white", anchor="mm")

    # 三餐
    for j, ((mlabel, mcolor), cx) in enumerate(zip(meal_labels, meal_x)):
        # 餐类色块
        draw.rectangle([(cx+2, ry+6), (cx+82, ry+row_h-6)], fill=mcolor)
        draw.text((cx+42, ry+row_h//2), mlabel, font=font(17), fill="white", anchor="mm")

        # 内容
        contents = [day["breakfast"], day["lunch"], day["dinner"]]
        content = contents[j]
        lines = content.split("\n")
        txt_color = "#95A5A6" if "（学校" in content else DARK
        lh = 24
        th = len(lines) * lh
        sy = ry + (row_h - th) // 2
        for li, line in enumerate(lines):
            draw.text((cx+90, sy + li*lh), line, font=font(17), fill=txt_color, anchor="mm")

# ========== 底部备注 ==========
draw.rectangle([(0, H-65), (W, H)], fill="#ECF0F1")
draw.text((W//2, H-33), "叶菜2-3天内吃完  |  山药可以慢慢吃  |  调味不加糖葱蒜", font=font(16), fill="#7F8C8D", anchor="mm")

# 装饰
for (sx,sy,sr) in [(22,22,7),(55,38,5),(38,58,5)]:
    draw.ellipse([(sx-sr,sy-sr),(sx+sr,sy+sr)], fill=GOLD)
draw.arc([(W-65,H-75),(W-15,H-30)], 0, 360, fill=GOLD, width=3)

out = "/Users/holly/.openclaw/workspace/一周菜谱-精确文字版.png"
img.save(out, "PNG")
print(f"OK: {out}")
