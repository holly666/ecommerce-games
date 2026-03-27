#!/usr/bin/env python3
"""一周健康菜谱 - 表格布局版（确保无重叠）"""
from PIL import Image, ImageDraw, ImageFont
import os

def font(size):
    candidates = [
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
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
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return font(size)

# 尺寸
W, H = 1400, 1800
img = Image.new("RGB", (W, H), "#FFFBF0")
draw = ImageDraw.Draw(img)

# 颜色
BROWN = "#5D4037"
ORANGE = "#E67E22"
GREEN = "#27AE60"
RED = "#C0392B"
GOLD = "#F39C12"
LIGHT_ORANGE = "#FDEBD0"
LIGHT_GREEN = "#D5F5E3"
LIGHT_RED = "#FADBD8"
GRAY = "#95A5A6"
DARK = "#2C1810"
CREAM = "#FFF5E6"

# ========== 标题 ==========
draw.rectangle([(0, 0), (W, 90)], fill=BROWN)
draw.text((W//2, 35), "一周健康菜谱", font=fontbold(44), fill="white", anchor="mm")
draw.text((W//2, 70), "2026.03.27 - 04.02", font=font(16), fill="#D7CCC8", anchor="mm")

# ========== 表头 ==========
table_top = 100
row_h = 115
col_x = [0, 95, 430, 765, 1100]  # 日期, 早餐, 午餐, 晚餐
col_w = [95, 335, 335, 335]

# 表头背景
draw.rectangle([(0, table_top), (W, table_top+50)], fill="#8D6E63")
headers = ["早餐", "午餐", "晚餐"]
for i, (hx, hw, htxt) in enumerate(zip(col_x[1:], col_w, headers)):
    colors = [ORANGE, GREEN, RED]
    draw.rectangle([(hx, table_top), (hx+hw, table_top+50)], fill=colors[i])
    draw.text((hx+hw//2, table_top+25), htxt, font=fontbold(20), fill="white", anchor="mm")

# 日期列
draw.rectangle([(0, table_top), (col_x[1], table_top+50)], fill="#6D4C41")
draw.text((col_x[1]//2, table_top+25), "日期", font=fontbold(20), fill="white", anchor="mm")

# ========== 数据 ==========
days_data = [
    ("周五", "3/27", "#E74C3C",
     "杂粮包\n水煮蛋\n麻酱菠菜",
     "（学校）",
     "清蒸鱼\n麻酱菠菜\n米饭"),
    ("周六", "3/28", "#E67E22",
     "红薯\n鸡蛋灌饼\n炒小青菜",
     "烤鸡翅\n茼蒿\n玉米段",
     "牛肉炖土豆\n青菜"),
    ("周日", "3/29", "#F39C12",
     "山药粥\n鸡蛋\n凉拌菠菜",
     "烤鸡翅\n茼蒿",
     "清炒小青菜\n山药鱼汤\n米饭"),
    ("周一", "3/30", "#27AE60",
     "杂粮包\n煎蛋\n麻酱菠菜",
     "（学校）",
     "山药炒肉片\n青菜\n米饭"),
    ("周二", "3/31", "#8E44AD",
     "豆浆\n红薯\n水煮蛋",
     "（学校）",
     "鸡蛋灌饼\n青菜汤"),
    ("周三", "4/1", "#2980B9",
     "鸡蛋灌饼\n炒菠菜",
     "（学校）\n晚自习",
     "山药块\n煎蛋\n（简单吃）"),
    ("周四", "4/2", "#16A085",
     "杂粮包\n山药泥\n荷包蛋",
     "（学校）\n晚自习",
     "清蒸鱼\n青菜\n（简单吃）"),
]

for i, (day, date, color, b, l, d) in enumerate(days_data):
    y = table_top + 50 + i * row_h

    # 交替背景
    bg = CREAM if i % 2 == 0 else "#FFF8E7"
    draw.rectangle([(0, y), (W, y+row_h)], fill=bg)

    # 边框
    draw.rectangle([(0, y), (W, y+row_h)], outline="#D7CCC8", width=1)

    # 日期格
    draw.rectangle([(0, y), (col_x[1], y+row_h)], fill=color)
    draw.text((col_x[1]//2, y+30), day, font=fontbold(24), fill="white", anchor="mm")
    draw.text((col_x[1]//2, y+62), date, font=font(14), fill="white", anchor="mm")

    # 三餐
    meal_bg = [LIGHT_ORANGE, LIGHT_GREEN, LIGHT_RED]
    meal_colors = [ORANGE, GREEN, RED]
    contents = [b, l, d]
    for j in range(3):
        cx = col_x[j+1]
        cw = col_w[j]

        # 三餐分隔线
        if j > 0:
            draw.line([(cx, y), (cx, y+row_h)], fill="#D7CCC8", width=1)

        # 内容
        lines = contents[j].split("\n")
        is_school = "（学校）" in contents[j]
        txt_color = GRAY if is_school else DARK
        lh = 22
        total_h = len(lines) * lh
        sy = y + (row_h - total_h) // 2

        for li, line in enumerate(lines):
            draw.text((cx + cw//2, sy + li*lh), line, font=font(16), fill=txt_color, anchor="mm")

# ========== 底部备注 ==========
foot_y = table_top + 50 + len(days_data) * row_h
draw.rectangle([(0, foot_y), (W, foot_y+55)], fill="#ECEFF1")
draw.text((W//2, foot_y+18), "叶菜2-3天内吃完  |  山药可以慢慢吃  |  调味不加糖葱蒜", font=font(14), fill="#7F8C8D", anchor="mm")

# 装饰
for (sx,sy,sr) in [(18,foot_y+8,5),(40,foot_y+20,4),(28,foot_y+32,3)]:
    draw.ellipse([(sx-sr,sy-sr),(sx+sr,sy+sr)], fill=GOLD)
draw.arc([(W-50,foot_y+5),(W-20,foot_y+35)], 0,360, fill=GOLD, width=2)

out = "/Users/holly/.openclaw/workspace/一周菜谱-表格版.png"
img.save(out, "PNG")
print(f"OK: {out}, size={os.path.getsize(out)}")
