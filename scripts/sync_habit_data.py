#!/usr/bin/env python3
"""
习惯+健康数据同步脚本 v2.0
同步 Obsidian JSON + Obsidian MD + GitHub Pages

用法：
  python3 sync_habit_data.py water 600      # 喝水（累加）
  python3 sync_habit_data.py paojiao         # 泡脚
  python3 sync_habit_data.py dabian          # 大便
  python3 sync_habit_data.py duanlian 30    # 锻炼
  python3 sync_habit_data.py shuijiao       # 22点前睡觉
  python3 sync_habit_data.py chiyao          # 吃药（中药/西药）
  python3 sync_habit_data.py health 胀气 有 "持续排气"   # 健康症状
  python3 sync_habit_data.py health 夜尿 1 "3:00"       # 健康症状
  python3 sync_habit_data.py print                        # 打印今日状态

数据流向：
  Holly消息 → sync_habit_data.py
    → Obsidian JSON（习惯数据.json）
    → GitHub Pages JSON（habit-data.json）
    → Obsidian MD（习惯打卡.md）
"""
import json
import os
import sys
import datetime
import re
import shutil

OBSIDIAN_JSON = os.path.expanduser("~/Documents/Holly工作生活笔记/06-个人笔记/习惯/习惯数据.json")
GITHUB_HABIT_JSON = os.path.expanduser("~/project/ecommerce-games/habit-tracker/habit-data.json")
GITHUB_HEALTH_JSON = os.path.expanduser("~/project/ecommerce-games/habit-tracker/health-data.json")
OBSIDIAN_HABIT_MD = os.path.expanduser("~/Documents/Holly工作生活笔记/06-个人笔记/习惯/习惯打卡.md")

def get_today():
    return datetime.date.today().strftime("%Y-%m-%d")

def get_today_display():
    """中文显示：3月29日（周日）"""
    d = datetime.date.today()
    weekdays = ["周一","周二","周三","周四","周五","周六","周日"]
    return f"{d.month}月{d.day}日（{weekdays[d.weekday()]}）"

def get_weekday():
    days = ["周一","周二","周三","周四","周五","周六","周日"]
    return days[datetime.date.today().weekday()]

def load_json(path, default=None):
    try:
        with open(path) as f:
            return json.load(f)
    except:
        return default if default is not None else {}

def save_json(path, data):
    with open(path, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# ---- streak 自动计算 ----
def calc_streak(habit_id):
    """从最新记录往前数连续打卡天数"""
    obs = load_json(OBSIDIAN_JSON)
    records = obs.get("打卡记录", [])
    if not records:
        return 0
    
    # 按日期倒序排
    records_sorted = sorted(records, key=lambda x: x.get("日期", ""), reverse=True)
    
    streak = 0
    today = datetime.date.today()
    
    for i, rec in enumerate(records_sorted):
        date_str = rec.get("日期", "")
        try:
            rec_date = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
        except:
            continue
        
        # 第i天应该是今天-i天
        expected = today - datetime.timedelta(days=i)
        if rec_date != expected:
            break  # 不连续
        
        val = rec.get(habit_id, 0)
        if val > 0 or val == 1:
            streak += 1
        else:
            break
    
    return streak

def update_streaks():
    """更新所有习惯的streak到JSON"""
    obs = load_json(OBSIDIAN_JSON)
    for h in obs.get("习惯列表", []):
        h["streak"] = calc_streak(h["id"])
    save_json(OBSIDIAN_JSON, obs)

# ---- MD同步 ----
def md_append_row(habit_name, row_markdown):
    """向MD文件中指定习惯的表格追加一行"""
    if not os.path.exists(OBSIDIAN_HABIT_MD):
        print(f"⚠️ MD文件不存在：{OBSIDIAN_HABIT_MD}")
        return
    
    with open(OBSIDIAN_HABIT_MD, 'r') as f:
        lines = f.readlines()
    
    # 找到包含 "## 习惯X：{habit_name}" 的行（section 标题）
    section_start = None
    for i, line in enumerate(lines):
        if re.match(r'## 习惯\d+：', line) and habit_name in line:
            section_start = i
            break
    
    if section_start is None:
        # 尝试更宽泛的匹配：包含习惯名的 ## 标题
        for i, line in enumerate(lines):
            if re.match(r'## ', line) and habit_name in line:
                section_start = i
                break
    
    if section_start is None:
        print(f"⚠️ 没找到习惯「{habit_name}」的section")
        return
    
    # 在 section_start 之后、下一个 ## 之前，找所有表格行
    next_section = None
    for i in range(section_start + 1, len(lines)):
        if re.match(r'## ', lines[i]):
            next_section = i
            break
    
    section_end = next_section if next_section else len(lines)
    
    # 找该 section 内所有表格行（| 开头且不含 --- 的行）
    table_row_indices = []
    for i in range(section_start, section_end):
        if lines[i].strip().startswith('|') and '---' not in lines[i]:
            table_row_indices.append(i)
    
    if not table_row_indices:
        print(f"⚠️ 习惯「{habit_name}」section 内没找到表格")
        return
    
    # 插到最后一个表格行之后
    insert_pos = table_row_indices[-1] + 1
    lines.insert(insert_pos, row_markdown + "\n")
    
    with open(OBSIDIAN_HABIT_MD, 'w') as f:
        f.writelines(lines)
    
    print(f"  📝 已同步到 Obsidian MD")

# ---- 喝水 ----
def cmd_water(amount_ml):
    obs = load_json(OBSIDIAN_JSON)
    today = get_today()
    weekday = get_weekday()

    record = None
    for r in obs.get("打卡记录", []):
        if r["日期"] == today:
            record = r
            break
    if not record:
        record = {"日期": today, "周": weekday, "paojiao": 0, "heshui": 0, "duanlian": 0, "shuijiao": 0, "dabian": 0, "chiyao": 0}
        obs.setdefault("打卡记录", []).append(record)

    record["heshui"] = record.get("heshui", 0) + amount_ml
    save_json(OBSIDIAN_JSON, obs)

    github = load_json(GITHUB_HABIT_JSON, {})
    if today not in github:
        github[today] = {"paojiao": 0, "heshui": 0, "dabian": 0, "duanlian": 0, "shuijiao": 0, "chiyao": 0}
    github[today]["heshui"] = github[today].get("heshui", 0) + amount_ml
    save_json(GITHUB_HABIT_JSON, github)

    total = record["heshui"]
    pct = min(100, int(total / 2000 * 100))
    status = "✅" if total >= 2000 else "⬜"
    print(f"{status} 喝水：+{amount_ml}ml（今日累计：{total}ml / 2000ml [{pct}%）")
    
    # 同步到MD
    md_append_row("喝水", f"| {get_today_display()} | {total}ml | {('✅' if total >= 2000 else '⬜')} | |")

# ---- 泡脚 ----
def cmd_paojiao():
    _set_habit("paojiao", 1)
    streak = calc_streak("paojiao")
    print(f"✅ 泡脚已完成（连续{streak}天）")
    # 同步MD
    md_append_row("泡脚", f"| {get_today_display()} | ✅ | |")

# ---- 大便 ----
def cmd_dabian():
    _set_habit("dabian", 1)
    streak = calc_streak("dabian")
    print(f"✅ 大便已完成（连续{streak}天）")
    md_append_row("大便", f"| {get_today_display()} | ✅ 正常 | 正常 | |")

# ---- 锻炼 ----
def cmd_duanlian(minutes):
    obs = load_json(OBSIDIAN_JSON)
    today = get_today()
    
    record = None
    for r in obs.get("打卡记录", []):
        if r["日期"] == today:
            record = r
            break
    if not record:
        record = {"日期": today, "周": get_weekday(), "paojiao": 0, "heshui": 0, "duanlian": 0, "shuijiao": 0, "dabian": 0, "chiyao": 0}
        obs.setdefault("打卡记录", []).append(record)
    
    record["duanlian"] = record.get("duanlian", 0) + minutes
    save_json(OBSIDIAN_JSON, obs)
    
    github = load_json(GITHUB_HABIT_JSON, {})
    if today not in github:
        github[today] = {"paojiao": 0, "heshui": 0, "dabian": 0, "duanlian": 0, "shuijiao": 0, "chiyao": 0}
    github[today]["duanlian"] = github[today].get("duanlian", 0) + minutes
    save_json(GITHUB_HABIT_JSON, github)
    
    streak = calc_streak("duanlian")
    print(f"✅ 锻炼：+{minutes}分钟（今日累计：{record['duanlian']}分钟，连续{streak}天）")
    md_append_row("锻炼", f"| {get_today_display()} | 散步 | {minutes}分钟 | ✅ |")

# ---- 睡觉 ----
def cmd_shuijiao():
    _set_habit("shuijiao", 1)
    streak = calc_streak("shuijiao")
    print(f"✅ 22点前睡觉已完成（连续{streak}天）")
    md_append_row("睡觉", f"| {get_today_display()} | ✅ | |")

# ---- 吃药 ----
def cmd_chiyao():
    _set_habit("chiyao", 1)
    streak = calc_streak("chiyao")
    print(f"✅ 吃药已完成（连续{streak}天）")
    md_append_row("吃药", f"| {get_today_display()} | ✅ | |")

# ---- 通用set ----
def _set_habit(habit_id, value):
    obs = load_json(OBSIDIAN_JSON)
    today = get_today()
    
    record = None
    for r in obs.get("打卡记录", []):
        if r["日期"] == today:
            record = r
            break
    if not record:
        record = {"日期": today, "周": get_weekday(), "paojiao": 0, "heshui": 0, "duanlian": 0, "shuijiao": 0, "dabian": 0, "chiyao": 0}
        obs.setdefault("打卡记录", []).append(record)
    
    record[habit_id] = value
    save_json(OBSIDIAN_JSON, obs)
    
    github = load_json(GITHUB_HABIT_JSON, {})
    if today not in github:
        github[today] = {"paojiao": 0, "heshui": 0, "dabian": 0, "duanlian": 0, "shuijiao": 0, "chiyao": 0}
    github[today][habit_id] = value
    save_json(GITHUB_HABIT_JSON, github)
    
    # 更新所有streak
    update_streaks()

# ---- 健康追踪 ----
def cmd_health(symptom, has_val_or_count, detail=""):
    today = get_today()
    github_health = load_json(GITHUB_HEALTH_JSON, {"健康记录": {}})

    if symptom == "胀气":
        github_health.setdefault("健康记录", {})[today] = github_health["健康记录"].get(today, {})
        github_health["健康记录"][today]["胀气"] = {"有": True, "详情": detail or "有"}
        print(f"✅ 胀气记录：{detail or '有'}")
    elif symptom == "打嗝":
        github_health.setdefault("健康记录", {})[today] = github_health["健康记录"].get(today, {})
        github_health["健康记录"][today]["打嗝"] = {"有": True, "详情": detail or "有"}
        print(f"✅ 打嗝记录：{detail or '有'}")
    elif symptom == "夜尿":
        count = int(has_val_or_count)
        times = detail.split(',') if detail else []
        github_health.setdefault("健康记录", {})[today] = github_health["健康记录"].get(today, {})
        github_health["健康记录"][today]["夜尿"] = {"次数": count, "时间点": times}
        print(f"✅ 夜尿记录：{count}次{'（' + detail + '）' if detail else ''}")
    elif symptom == "大便":
        github_health.setdefault("健康记录", {})[today] = github_health["健康记录"].get(today, {})
        github_health["健康记录"][today]["大便"] = {"形状": detail or "正常", "时间": "今天"}
        print(f"✅ 大便记录：{detail or '正常'}")
    else:
        print(f"未知症状：{symptom}")
        return

    save_json(GITHUB_HEALTH_JSON, github_health)

# ---- 打印状态 ----
def cmd_print():
    today = get_today()
    obs = load_json(OBSIDIAN_JSON)
    
    record = None
    for r in obs.get("打卡记录", []):
        if r["日期"] == today:
            record = r
            break

    print(f"📅 今日打卡状态（{get_today_display()}）")
    if record:
        for h in obs.get("习惯列表", []):
            val = record.get(h["id"], 0)
            streak = h.get("streak", 0)
            if h["id"] == "heshui":
                done = "✅" if val >= 2000 else "⬜"
                print(f"  {done} 💧 喝水：{val}ml / 2000ml（连续{streak}天）")
            elif h["id"] == "duanlian":
                done = "✅" if val >= 30 else "⬜"
                print(f"  {done} 🏃 锻炼：{val}分钟（连续{streak}天）")
            elif val == 1:
                print(f"  ✅ {h['icon']} {h['name']}（连续{streak}天）")
            else:
                print(f"  ❌ {h['icon']} {h['name']}（连续{streak}天）")
    else:
        print("  暂无记录")
    
    # 同时打印健康追踪
    github_health = load_json(GITHUB_HEALTH_JSON, {"健康记录": {}})
    today_health = github_health.get("健康记录", {}).get(today, {})
    if today_health:
        print(f"\n🏥 今日健康：")
        if "胀气" in today_health:
            print(f"  胀气：{today_health['胀气'].get('详情', '有')}")
        if "夜尿" in today_health:
            nu = today_health["夜尿"]
            print(f"  夜尿：{nu.get('次数', 0)}次{'（' + ','.join(nu.get('时间点', [])) + '）' if nu.get('时间点') else ''}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    cmd = sys.argv[1]
    if cmd == "water" and len(sys.argv) >= 3:
        cmd_water(int(sys.argv[2]))
    elif cmd == "paojiao":
        cmd_paojiao()
    elif cmd == "dabian":
        cmd_dabian()
    elif cmd == "duanlian" and len(sys.argv) >= 3:
        cmd_duanlian(int(sys.argv[2]))
    elif cmd == "shuijiao":
        cmd_shuijiao()
    elif cmd == "chiyao":
        cmd_chiyao()
    elif cmd == "health" and len(sys.argv) >= 4:
        cmd_health(sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else "")
    elif cmd == "print":
        cmd_print()
    else:
        print(f"未知命令：{cmd}")
        print(__doc__)
