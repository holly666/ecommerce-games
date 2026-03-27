#!/usr/bin/env python3
"""
习惯+健康数据同步脚本
同步 Obsidian <-> GitHub Pages

用法：
  python3 sync_habit_data.py water 600      # 喝水（累加）
  python3 sync_habit_data.py paojiao         # 泡脚
  python3 sync_habit_data.py dabian          # 大便
  python3 sync_habit_data.py duanlian 30    # 锻炼
  python3 sync_habit_data.py shuijiao       # 22点前睡觉
  python3 sync_habit_data.py health 胀气 有 "持续排气"   # 健康症状
  python3 sync_habit_data.py health 夜尿 1 "3:00"       # 健康症状
  python3 sync_habit_data.py print                        # 打印今日状态
"""
import json
import os
import sys
import datetime

OBSIDIAN_JSON = os.path.expanduser("~/Documents/Holly工作生活笔记/06-个人笔记/习惯/习惯数据.json")
GITHUB_HABIT_JSON = os.path.expanduser("~/project/ecommerce-games/habit-tracker/habit-data.json")
GITHUB_HEALTH_JSON = os.path.expanduser("~/project/ecommerce-games/habit-tracker/health-data.json")
OBSIDIAN_HABIT_MD = os.path.expanduser("~/Documents/Holly工作生活笔记/06-个人笔记/习惯/习惯打卡.md")

def get_today():
    return datetime.date.today().strftime("%Y-%m-%d")

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

# ---- 习惯打卡 ----
def cmd_water(amount_ml):
    # 更新 Obsidian JSON
    obs = load_json(OBSIDIAN_JSON)
    today = get_today()
    weekday = get_weekday()

    # 确保打卡记录存在
    record = None
    for r in obs.get("打卡记录", []):
        if r["日期"] == today:
            record = r
            break
    if not record:
        record = {"日期": today, "周": weekday, "paojiao": 0, "heshui": 0, "duanlian": 0, "shuijiao": 0, "dabian": 0}
        obs.setdefault("打卡记录", []).append(record)

    record["heshui"] = record.get("heshui", 0) + amount_ml
    save_json(OBSIDIAN_JSON, obs)

    # 更新 GitHub Pages JSON
    github = load_json(GITHUB_HABIT_JSON, {})
    if today not in github:
        github[today] = {"paojiao": 0, "heshui": 0, "dabian": 0, "duanlian": 0, "shuijiao": 0}
    github[today]["heshui"] = github[today].get("heshui", 0) + amount_ml
    save_json(GITHUB_HABIT_JSON, github)

    total = record["heshui"]
    pct = min(100, int(total / 2000 * 100))
    print(f"✅ 喝水：+{amount_ml}ml（今日累计：{total}ml / 2000ml [{pct}%]）")

def cmd_paojiao():
    _set_habit("paojiao", 1)
    print("✅ 泡脚已完成")

def cmd_dabian():
    _set_habit("dabian", 1)
    print("✅ 大便已完成")

def cmd_duanlian(minutes):
    _add_habit("duanlian", minutes)
    github = load_json(GITHUB_HABIT_JSON, {})
    today = get_today()
    if today not in github:
        github[today] = {"paojiao": 0, "heshui": 0, "dabian": 0, "duanlian": 0, "shuijiao": 0}
    github[today]["duanlian"] = github[today].get("duanlian", 0) + minutes
    save_json(GITHUB_HABIT_JSON, github)
    print(f"✅ 锻炼：+{minutes}分钟")

def cmd_shuijiao():
    _set_habit("shuijiao", 1)
    print("✅ 22点前睡觉已完成")

def _set_habit(habit_id, value):
    obs = load_json(OBSIDIAN_JSON)
    today = get_today()
    for r in obs.get("打卡记录", []):
        if r["日期"] == today:
            r[habit_id] = value
            break
    save_json(OBSIDIAN_JSON, obs)
    github = load_json(GITHUB_HABIT_JSON, {})
    if today not in github:
        github[today] = {"paojiao": 0, "heshui": 0, "dabian": 0, "duanlian": 0, "shuijiao": 0}
    github[today][habit_id] = value
    save_json(GITHUB_HABIT_JSON, github)

def _add_habit(habit_id, value):
    obs = load_json(OBSIDIAN_JSON)
    today = get_today()
    for r in obs.get("打卡记录", []):
        if r["日期"] == today:
            r[habit_id] = r.get(habit_id, 0) + value
            break
    save_json(OBSIDIAN_JSON, obs)

# ---- 健康追踪 ----
def cmd_health(symptom, has_val_or_count, detail=""):
    today = get_today()
    obs = load_json(OBSIDIAN_JSON)
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
    github = load_json(GITHUB_HABIT_JSON, {})

    record = None
    for r in obs.get("打卡记录", []):
        if r["日期"] == today:
            record = r
            break

    print(f"📅 今日打卡状态（{today} {get_weekday()}）")
    if record:
        for h in obs.get("习惯列表", []):
            val = record.get(h["id"], 0)
            if h["id"] == "heshui":
                print(f"  💧 喝水：{val}ml / 2000ml")
            elif h["id"] == "duanlian":
                print(f"  🏃 锻炼：{val}分钟")
            elif val == 1:
                print(f"  ✅ {h['icon']} {h['name']}")
            else:
                print(f"  ❌ {h['icon']} {h['name']}")
    else:
        print("  暂无记录")

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
    elif cmd == "health" and len(sys.argv) >= 4:
        cmd_health(sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else "")
    elif cmd == "print":
        cmd_print()
    else:
        print(f"未知命令：{cmd}")
        print(__doc__)
