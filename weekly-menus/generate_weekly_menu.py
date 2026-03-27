#!/usr/bin/env python3
"""
每周菜谱生成器
用法: python3 generate_weekly_menu.py

每次运行会在 weekly-menus/ 目录下生成新的菜谱 HTML 文件
文件名格式: 2026-Wxx.html
"""
from datetime import datetime, timedelta

# ========== 每周数据在这里修改 ==========
YEAR = 2026
WEEK = 13  # 第13周
START_DATE = "2026.03.27"
END_DATE = "2026.04.02"
NOTE = "🍃 叶菜2-3天内吃完 &nbsp;|&nbsp; 🍠 山药可以慢慢吃 &nbsp;|&nbsp; 🚫 调味不加糖葱蒜 &nbsp;|&nbsp; 🏠 周三周四晚自习在学校吃，晚餐不排"

DAYS = [
    {
        "day": "周五", "date": "3/27", "color": "#E74C3C",
        "breakfast": [("杂粮包",False),("水煮蛋",False),("麻酱菠菜",False)],
        "lunch": [("（学校）",True)],
        "dinner": [("清蒸鱼",False),("麻酱菠菜",False),("米饭",False)],
    },
    {
        "day": "周六", "date": "3/28", "color": "#E67E22",
        "breakfast": [("红薯",False),("鸡蛋灌饼",False),("炒小青菜",False)],
        "lunch": [("烤鸡翅",False),("茼蒿",False),("玉米段",False)],
        "dinner": [("牛肉炖土豆",False),("青菜",False)],
    },
    {
        "day": "周日", "date": "3/29", "color": "#F39C12",
        "breakfast": [("山药粥",False),("鸡蛋",False),("凉拌菠菜",False)],
        "lunch": [("烤鸡翅",False),("茼蒿",False)],
        "dinner": [("清炒小青菜",False),("山药鱼汤",False),("米饭",False)],
    },
    {
        "day": "周一", "date": "3/30", "color": "#27AE60",
        "breakfast": [("杂粮包",False),("煎蛋",False),("麻酱菠菜",False)],
        "lunch": [("（学校）",True)],
        "dinner": [("山药炒肉片",False),("青菜",False),("米饭",False)],
    },
    {
        "day": "周二", "date": "3/31", "color": "#8E44AD",
        "breakfast": [("豆浆",False),("红薯",False),("水煮蛋",False)],
        "lunch": [("（学校）",True)],
        "dinner": [("鸡蛋灌饼",False),("青菜汤",False)],
    },
    {
        "day": "周三", "date": "4/1", "color": "#2980B9",
        "breakfast": [("鸡蛋灌饼",False),("炒菠菜",False)],
        "lunch": [("（学校，晚自习）",True)],
        "dinner": [],
    },
    {
        "day": "周四", "date": "4/2", "color": "#16A085",
        "breakfast": [("杂粮包",False),("山药泥",False),("荷包蛋",False)],
        "lunch": [("（学校，晚自习）",True)],
        "dinner": [],
    },
]

def build_meal_cell(meal_class, items):
    is_school = items and items[0][1]
    school_class = " school" if is_school else ""
    tag_bg = "#95A5A6" if is_school else ("#E67E22" if meal_class=="breakfast" else "#27AE60" if meal_class=="lunch" else "#C0392B")
    tag_text = "午餐" if meal_class=="lunch" else "晚餐" if meal_class=="dinner" else "早餐"
    html = f'      <div class="meal-cell {meal_class}{school_class}">\n'
    html += f'        <span class="meal-tag" style="background:{tag_bg}">{tag_text}</span>\n'
    for item, is_special in items:
        item_class = " school" if (is_school or is_special) else ""
        html += f'        <div class="meal-item{item_class}">{item}</div>\n'
    html += '      </div>\n'
    return html

def generate():
    week_html = ""
    for day in DAYS:
        b = build_meal_cell("breakfast", day["breakfast"])
        l = build_meal_cell("lunch", day["lunch"])
        d = build_meal_cell("dinner", day["dinner"])
        week_html += f'''      <div class="day-label" style="--day-color:{day["color"]}">
        <span class="day">{day["day"]}</span>
        <span class="date">{day["date"]}</span>
      </div>
{b}{l}{d}
'''

    html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>一周健康菜谱</title>
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; background: linear-gradient(135deg, #56ab2f 0%, #a8e063 100%); min-height: 100vh; padding: 20px; }}
  .container {{ max-width: 900px; margin: 0 auto; }}
  .header {{ text-align: center; color: white; margin-bottom: 30px; }}
  .header h1 {{ font-size: 2.5em; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); margin-bottom: 5px; }}
  .header p {{ font-size: 1.1em; opacity: 0.9; }}
  .history-link {{ text-align: center; margin-bottom: 25px; }}
  .history-link a {{ background: white; color: #56ab2f; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.15); display: inline-block; }}
  .menu-card {{ background: white; border-radius: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.12); overflow: hidden; margin-bottom: 25px; }}
  .menu-header {{ background: linear-gradient(135deg, #8B6914 0%, #5D4037 100%); color: white; padding: 22px 30px; display: flex; justify-content: space-between; align-items: center; }}
  .menu-header h2 {{ font-size: 1.5em; }}
  .menu-header .date {{ opacity: 0.85; font-size: 0.95em; }}
  .menu-note {{ background: #EFEBE9; padding: 10px 30px; color: #795548; font-size: 0.88em; border-bottom: 2px solid #D7CCC8; }}
  .week-grid {{ display: grid; grid-template-columns: 100px 1fr 1fr 1fr; }}
  .day-label {{ background: var(--day-color, #8B6914); color: white; padding: 15px 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; }}
  .day-label .day {{ font-size: 1.2em; font-weight: bold; }}
  .day-label .date {{ font-size: 0.8em; opacity: 0.85; }}
  .meal-cell {{ padding: 12px 14px; border-right: 1px solid #F0E0D0; border-bottom: 1px solid #F0E0D0; }}
  .meal-cell:last-child {{ border-right: none; }}
  .meal-cell.breakfast {{ background: #FEF9E7; }}
  .meal-cell.lunch {{ background: #E8F8F0; }}
  .meal-cell.dinner {{ background: #FDEFEF; }}
  .meal-cell.school {{ background: #F5F5F5; }}
  .meal-tag {{ display: inline-block; font-size: 0.7em; font-weight: bold; padding: 2px 9px; border-radius: 10px; margin-bottom: 5px; color: white; }}
  .breakfast .meal-tag {{ background: #E67E22; }}
  .lunch .meal-tag {{ background: #27AE60; }}
  .dinner .meal-tag {{ background: #C0392B; }}
  .school .meal-tag {{ background: #95A5A6; }}
  .meal-item {{ font-size: 0.88em; color: #3E2723; line-height: 1.6; }}
  .meal-item.school {{ color: #BDBDBD; font-style: italic; }}
  .footer {{ text-align: center; padding: 20px; color: white; font-size: 0.88em; opacity: 0.85; }}
  .footer span {{ margin: 0 8px; }}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>🌿 一周健康菜谱</h1>
    <p>孕期饮食 · 每周更新</p>
  </div>
  <div class="history-link">
    <a href="index.html">📋 历史菜谱</a>
  </div>
  <div class="menu-card">
    <div class="menu-header">
      <h2>📅 {YEAR}年第{WEEK}周</h2>
      <div class="date">{START_DATE} - {END_DATE}</div>
    </div>
    <div class="menu-note">{NOTE}</div>
    <div class="week-grid">
{week_html}    </div>
  </div>
  <div class="footer">
    <span>🍽️ 每周五更新</span>
    <span>|</span>
    <span>🤰 孕期健康餐</span>
  </div>
</div>
</body>
</html>'''
    return html

if __name__ == "__main__":
    import os
    out_path = f"/Users/holly/project/ecommerce-games/weekly-menus/{YEAR}-W{WEEK:02d}.html"
    html = generate()
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"✅ 已生成: {out_path}")

    # 更新 index.html
    index_path = "/Users/holly/project/ecommerce-games/weekly-menus/index.html"
    new_entry = f'''    <a href="{YEAR}-W{WEEK:02d}.html" class="menu-card">
      <div class="menu-info">
        <h3>📅 {YEAR}年第{WEEK}周 <span class="current-badge">本周</span></h3>
        <p>{START_DATE} - {END_DATE} &nbsp;|&nbsp; 周五 ~ 周四</p>
      </div>
      <div class="menu-arrow">→</div>
    </a>
'''
    # 简单更新index - 将"本周"标签移到最新
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()
    # 移除旧的current-badge
    content = content.replace(' <span class="current-badge">本周</span>', '')
    # 在"本周" section下插入新条目
    old_marker = '    <a href="2026-W13.html" class="menu-card">'
    if old_marker in content:
        content = content.replace(old_marker, new_entry + old_marker)
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ index.html 已更新")
