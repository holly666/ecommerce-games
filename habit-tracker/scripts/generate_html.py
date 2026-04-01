#!/usr/bin/env python3
"""
生成习惯追踪 HTML（静态版）
从 habit-data.json 和 health-data.json 读取数据，生成静态 HTML

用途：GitHub Pages 静态部署 / 本地预览
"""
import json
import os
import sys
from datetime import datetime, timedelta

HABIT_JSON = "../habit-data.json"
HEALTH_JSON = "../health-data.json"
OUTPUT_HTML = "../index.html"

def load_json(path):
    with open(path) as f:
        return json.load(f)

def get_weekday_cn(idx):
    return ["周一","周二","周三","周四","周五","周六","周日"][idx]

def generate_html():
    habit_data = load_json(HABIT_JSON)
    try:
        health_data = load_json(HEALTH_JSON)
    except:
        health_data = {"健康记录": {}}

    today = datetime.now().strftime("%Y-%m-%d")
    today_obj = datetime.now()
    
    # 计算本周开始（周一）
    dow = today_obj.weekday()
    monday = today_obj - timedelta(days=dow)
    week_days = [(monday + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(7)]

    # 本周打卡映射
    week_records = {}
    for r in habit_data.get("打卡记录", []):
        if r.get("日期") in week_days:
            week_records[r["日期"]] = r

    # 统计
    habits = habit_data.get("习惯列表", [])
    total = len(habits)
    done_today = 0
    streaks = 0
    for h in habits:
        streaks += h.get("streak", 0)
        rid = h["id"]
        rec = week_records.get(today, {})
        val = rec.get(rid, 0)
        if rid == "heshui":
            if val >= 2000: done_today += 1
        elif rid == "duanlian":
            if val >= 30: done_today += 1
        else:
            if val > 0: done_today += 1

    # 本周完成率
    week_total = total * 7
    week_done = sum([
        1 for d in week_days for h in habits
        if week_records.get(d, {}).get(h["id"], 0) > 0
        or (h["id"] == "heshui" and week_records.get(d, {}).get("heshui", 0) >= 2000)
        or (h["id"] == "duanlian" and week_records.get(d, {}).get("duanlian", 0) >= 30)
    ])
    week_rate = round(week_done / week_total * 100) if week_total > 0 else 0

    # 治疗日计算
    TREATMENT_START = datetime(2026, 3, 27)
    days_since_start = (today_obj - TREATMENT_START).days + 1
    is_even = days_since_start % 2 == 0
    vd_today = days_since_start % 3 == 0

    med_items = [
        ("💉", "黄体酮针", is_even, "✅ 打", "❌ 不打"),
        ("💊", "阿司匹林", is_even, "✅ 吃", "❌ 不吃"),
        ("💉", "肝素针", True, "✅ 每天打", ""),
        ("💊", "维生素D", vd_today, "✅ 吃", "❌ 不吃"),
        ("💊", "环孢素", True, "✅ 早2颗", ""),
        ("🍵", "中药", True, "✅ 早晚各1袋", ""),
    ]

    # 健康数据
    today_health = health_data.get("健康记录", {}).get(today, {})
    health_items = [
        ("胀气", today_health.get("胀气", {}).get("详情", "")),
        ("打嗝", today_health.get("打嗝", {}).get("详情", "")),
        ("夜尿", f"{today_health.get('夜尿',{}).get('次数',0)}次" if today_health.get('夜尿',{}).get('次数',0) > 0 else ""),
        ("大便", today_health.get("大便", {}).get("形状", "")),
    ]

    # 渲染
    med_grid_html = ""
    for icon, name, yes, yes_status, no_status in med_items:
        cls = "yes" if yes else ""
        status = yes_status if yes else no_status
        med_grid_html += f"""
                <div class="med-item {cls}">
                    <div class="med-icon">{icon}</div>
                    <div class="med-name">{name}</div>
                    <div class="med-status">{status}</div>
                </div>"""

    health_grid_html = ""
    for label, val in health_items:
        if val:
            health_grid_html += f"""
                <div class="health-item has-symptom">
                    <div class="health-label">{label}</div>
                    <div class="health-value alert">{val}</div>
                </div>"""
        else:
            health_grid_html += f"""
                <div class="health-item">
                    <div class="health-label">{label}</div>
                    <div class="health-value">无</div>
                </div>"""

    streak_items_html = ""
    for h in habits:
        streak_items_html += f"""
                <div class="streak-item">
                    <div class="streak-icon">{h.get('icon','✅')}</div>
                    <div class="streak-count">{h.get('streak',0)}天</div>
                    <div class="streak-label">{h.get('name','')}</div>
                </div>"""

    week_view_html = ""
    day_names = ["周日","周一","周二","周三","周四","周五","周六"]
    for d in week_days:
        dd = datetime.strptime(d, "%Y-%m-%d")
        is_today = (d == today)
        dow = dd.weekday()
        day_date = f"{dd.month}/{dd.day}"
        rec = week_records.get(d, {})
        
        icons_map = [
            ("paojiao", "🦶"),
            ("heshui", "💧"),
            ("duanlian", "🏃"),
            ("shuijiao", "😴"),
        ]
        
        habits_html = ""
        for hid, icon in icons_map:
            val = rec.get(hid, 0)
            if hid == "heshui":
                cls = "wh-done" if val >= 2000 else ("wh-missed" if val > 0 else "wh-empty")
            elif hid == "duanlian":
                cls = "wh-done" if val >= 30 else ("wh-missed" if val > 0 else "wh-empty")
            else:
                cls = "wh-done" if val > 0 else "wh-empty"
            habits_html += f'<div class="week-habit {cls}">{icon}</div>'
        
        week_view_html += f"""
                <div class="week-day {'today' if is_today else ''}">
                    <div class="day-name">{day_names[dow]}</div>
                    <div class="day-date">{day_date}</div>
                    <div class="week-habits">{habits_html}</div>
                </div>"""

    colors = ["fill-green","fill-blue","fill-purple","fill-orange"]
    progress_html = ""
    for i, h in enumerate(habits):
        rid = h["id"]
        rec = week_records.get(today, {})
        val = rec.get(rid, 0)
        if rid == "heshui":
            pct = min(100, int(val/2000*100))
            label = f"{val}ml / 2000ml"
        elif rid == "duanlian":
            pct = min(100, int(val/30*100))
            label = f"{val}分钟 / 30分钟"
        else:
            pct = 100 if val > 0 else 0
            label = "已完成" if val > 0 else "未完成"
        progress_html += f"""
            <div class="progress-item">
                <div class="progress-label">
                    <span>{h.get('icon','✅')} {h.get('name','')}</span>
                    <span>{label}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill {colors[i%len(colors)]}" style="width:{pct}%"></div>
                </div>
            </div>"""

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>习惯打卡追踪</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh; padding: 20px;
        }}
        .container {{ max-width: 900px; margin: 0 auto; }}
        h1 {{ color: white; text-align: center; margin-bottom: 30px; font-size: 28px; }}
        .card {{ background: white; border-radius: 20px; padding: 25px; margin-bottom: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }}
        .card h2 {{ color: #333; margin-bottom: 15px; font-size: 18px; }}
        .med-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }}
        .med-item {{ background: #f8f9fa; border-radius: 12px; padding: 15px 12px; text-align: center; }}
        .med-item.yes {{ background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; }}
        .med-icon {{ font-size: 28px; margin-bottom: 6px; }}
        .med-name {{ font-size: 13px; font-weight: 600; }}
        .med-status {{ font-size: 11px; opacity: 0.8; margin-top: 4px; }}
        .med-day {{ background: #f0f0f0; border-radius: 20px; padding: 6px 16px; text-align: center; font-size: 12px; color: #666; margin-bottom: 12px; }}
        .stats {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }}
        .stat-box {{ background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 15px; padding: 20px; text-align: center; color: white; }}
        .stat-box:nth-child(2) {{ background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }}
        .stat-box:nth-child(3) {{ background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }}
        .stat-number {{ font-size: 36px; font-weight: bold; }}
        .stat-label {{ font-size: 14px; opacity: 0.9; }}
        .streak-card {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }}
        .streak-item {{ background: #f8f9fa; border-radius: 15px; padding: 20px; text-align: center; }}
        .streak-icon {{ font-size: 32px; margin-bottom: 10px; }}
        .streak-count {{ font-size: 28px; font-weight: bold; color: #333; }}
        .streak-label {{ font-size: 12px; color: #666; margin-top: 5px; }}
        .health-grid {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }}
        .health-item {{ background: #f8f9fa; border-radius: 12px; padding: 15px; }}
        .health-item.has-symptom {{ background: #fff3e0; border: 1px solid #ff9800; }}
        .health-label {{ font-size: 12px; color: #666; margin-bottom: 6px; }}
        .health-value {{ font-size: 16px; font-weight: 600; color: #333; }}
        .health-value.alert {{ color: #e64a19; }}
        .week-view {{ display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }}
        .week-day {{ background: #f8f9fa; border-radius: 12px; padding: 12px 6px; text-align: center; }}
        .week-day.today {{ background: #e8f0fe; border: 2px solid #667eea; }}
        .week-day .day-name {{ font-size: 11px; color: #666; margin-bottom: 4px; }}
        .week-day .day-date {{ font-size: 13px; font-weight: bold; color: #333; margin-bottom: 8px; }}
        .week-habits {{ display: flex; flex-direction: column; gap: 6px; align-items: center; }}
        .week-habit {{ width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; }}
        .wh-done {{ background: #43e97b; }}
        .wh-missed {{ background: #ff6b6b; }}
        .wh-empty {{ background: #eee; }}
        .progress-item {{ margin-bottom: 15px; }}
        .progress-label {{ display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 14px; }}
        .progress-bar {{ height: 12px; background: #eee; border-radius: 6px; overflow: hidden; }}
        .progress-fill {{ height: 100%; border-radius: 6px; transition: width 0.5s ease; }}
        .fill-green {{ background: linear-gradient(90deg, #43e97b, #38f9d7); }}
        .fill-blue {{ background: linear-gradient(90deg, #4facfe, #00f2fe); }}
        .fill-purple {{ background: linear-gradient(90deg, #667eea, #764ba2); }}
        .fill-orange {{ background: linear-gradient(90deg, #fa709a, #fee140); }}
        .footer {{ text-align: center; color: white; margin-top: 20px; font-size: 12px; opacity: 0.8; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🌟 习惯打卡追踪</h1>
        <div class="card">
            <h2>💊 今日服药（治疗第{days_since_start}天）</h2>
            <div class="med-day">{today_obj.strftime('%m月%d日（%A）').replace('0','')}</div>
            <div class="med-grid">
                {med_grid_html}
            </div>
        </div>
        <div class="card">
            <div class="stats">
                <div class="stat-box"><div class="stat-number">{total}</div><div class="stat-label">当前习惯数</div></div>
                <div class="stat-box"><div class="stat-number">{streaks}天</div><div class="stat-label">累计连续</div></div>
                <div class="stat-box"><div class="stat-number">{week_rate}%</div><div class="stat-label">本周完成率</div></div>
            </div>
        </div>
        <div class="card">
            <h2>📅 今日习惯</h2>
            <div class="streak-card">
                {streak_items_html}
            </div>
        </div>
        <div class="card">
            <h2>🏥 健康追踪</h2>
            <div class="health-grid">
                {health_grid_html}
            </div>
        </div>
        <div class="card">
            <h2>📆 本周视图</h2>
            <div class="week-view">
                {week_view_html}
            </div>
        </div>
        <div class="card">
            <h2>📈 今日进度</h2>
            {progress_html}
        </div>
        <div class="footer">数据更新于 {today_obj.strftime('%Y-%m-%d %H:%M')}</div>
    </div>
</body>
</html>"""

    with open(OUTPUT_HTML, "w") as f:
        f.write(html)
    print(f"✅ 生成 {OUTPUT_HTML}")

if __name__ == "__main__":
    # 切换到脚本所在目录（habit-tracker/）
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    generate_html()
