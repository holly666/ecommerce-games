#!/usr/bin/env python3
"""生成漫画风一周菜谱图"""
from PIL import Image, ImageDraw, ImageFont
import os

# 画布尺寸
W, H = 900, 1300
img = Image.new("RGB", (W, H), "#FFF8E7")  # 米黄色背景
draw = ImageDraw.Draw(img)

# 字体路径（macOS）
def font(size, bold=False):
    paths = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return ImageFont.load_default()

title_font = font(42, True)
day_font = font(26, True)
meal_font = font(20)
note_font = font(16)

# 颜色
colors = {
    "bg": "#FFF8E7",
    "title": "#2C3E50",
    "day": "#E74C3C",
    "breakfast": "#E67E22",
    "lunch": "#27AE60",
    "dinner": "#8E44AD",
    "border": "#BDC3C7",
    "note": "#7F8C8D",
}

# === 标题栏 ===
draw.rectangle([(0, 0), (W, 100)], fill="#2C3E50")
draw.text((W//2, 50), "一周健康菜谱", font=title_font, fill="white", anchor="mm")
draw.text((W//2, 85), "2026.03.27 - 04.02", font=note_font, fill="#BDC3C7", anchor="mm")

# === 日期数据 ===
days = ["周五 3/27", "周六 3/28", "周日 3/29", "周一 3/30", "周二 3/31", "周三 4/1", "周四 4/2"]
breakfast = [
    "杂粮包 + 水煮蛋\n+ 麻酱菠菜",
    "红薯 + 鸡蛋灌饼\n+ 炒小青菜",
    "山药粥 + 鸡蛋\n+ 凉拌菠菜",
    "杂粮包 + 煎蛋\n+ 麻酱菠菜",
    "豆浆 + 红薯\n+ 水煮蛋",
    "鸡蛋灌饼\n+ 炒菠菜",
    "杂粮包 + 山药泥\n+ 荷包蛋",
]
lunch = [
    "（学校）",
    "烤鸡翅 + 茼蒿\n+ 玉米段",
    "烤鸡翅 + 茼蒿",
    "（学校）",
    "（学校）",
    "（学校）",
    "（学校）",
]
dinner = [
    "清蒸鱼 + 麻酱菠菜\n+ 米饭",
    "牛肉炖土豆\n+ 青菜",
    "清炒小青菜\n+ 山药鱼汤 + 米饭",
    "山药炒肉片\n+ 青菜 + 米饭",
    "鸡蛋灌饼\n+ 青菜汤",
    "（学校晚自习）",
    "（学校晚自习）",
]

# === 布局参数 ===
start_y = 115
row_height = 155
col_width = W // 7

# 画日期列头
for i, day in enumerate(days):
    x = i * col_width
    # 日期标签背景
    draw.rectangle([(x+2, start_y), (x+col_width-2, start_y+36)], fill=colors["day"])
    draw.text((x + col_width//2, start_y+18), day.split()[0], font=day_font, fill="white", anchor="mm")

# 画每一行
for row_idx, (meals, label, color) in enumerate([
    (breakfast, "早餐", colors["breakfast"]),
    (lunch,   "午餐", colors["lunch"]),
    (dinner,  "晚餐", colors["dinner"]),
]):
    row_y = start_y + 36 + row_idx * row_height

    # 餐类标签
    draw.rectangle([(0, row_y+2), (65, row_y+row_height-2)], fill=color)
    draw.text((32, row_y + row_height//2), label, font=font(22, True), fill="white", anchor="mm")

    # 七个日期格子
    for col_idx in range(7):
        x = 65 + col_idx * (col_width - 65) // 6 if row_idx == 0 else 65 + col_idx * (col_width - 65) // 6
        cell_x = 65 + col_idx * ((W - 65) // 6)
        cell_w = (W - 65) // 6

        # 格子背景
        bg_color = "#FFFDF5" if col_idx % 2 == 0 else "#FFF8E7"
        draw.rectangle([(cell_x+2, row_y+2), (cell_x+cell_w-2, row_y+row_height-2)], fill=bg_color, outline=colors["border"])

        # 内容
        content = meals[col_idx]
        line_h = row_height - 20
        if "（学校" in content:
            txt_color = "#BDC3C7"
        else:
            txt_color = "#2C3E50"

        lines = content.split("\n")
        total_h = len(lines) * 22
        start_text_y = row_y + (row_height - total_h) // 2

        for li, line in enumerate(lines):
            draw.text((cell_x + cell_w//2, start_text_y + li * 22), line, font=meal_font, fill=txt_color, anchor="mm")

# === 底部备注 ===
notes = [
    "• 叶菜2-3天内吃完  • 鸡翅用空气炸锅200度烤  • 调味不加糖葱蒜",
]
note_y = H - 60
draw.rectangle([(0, note_y-10), (W, H)], fill="#ECF0F1")
draw.text((W//2, note_y + 20), notes[0], font=note_font, fill=colors["note"], anchor="mm")

# === 漫画装饰元素 ===
# 左上角小星星
for (sx, sy, sr) in [(20, 20, 8), (55, 30, 5), (40, 50, 6)]:
    draw.ellipse([(sx-sr, sy-sr), (sx+sr, sy+sr)], fill="#F39C12")

# 右下角小月亮
draw.arc([(W-50, H-80), (W-10, H-40)], 0, 360, fill="#F1C40F", width=3)

# === 保存 ===
out_path = "/Users/holly/.openclaw/workspace/一周菜谱-漫画风.png"
img.save(out_path, "PNG")
print(f"✅ 已保存: {out_path}")
