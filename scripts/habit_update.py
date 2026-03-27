#!/usr/bin/env python3
"""
习惯打卡更新脚本
用法：
  python3 habit_update.py water 600      # 喝水600ml（累加到今天）
  python3 habit_update.py paojiao        # 泡脚
  python3 habit_update.py dabian         # 大便
  python3 habit_update.py duanlian 30    # 锻炼30分钟
  python3 habit_update.py shuijiao       # 22点前睡觉
  python3 habit_update.py status          # 打印今日状态
"""
import json
import sys
import os
from datetime import date

HABIT_FILE = os.path.expanduser("~/Documents/Holly工作生活笔记/06-个人笔记/习惯/习惯打卡.md")
JSON_FILE = os.path.expanduser("~/Documents/Holly工作生活笔记/06-个人笔记/习惯/习惯数据.json")

def get_today_str():
    today = date.today()
    return today.strftime("%Y-%m-%d")

def get_weekday():
    weekdays = ["周一","周二","周三","周四","周五","周六","周日"]
    return weekdays[date.today().weekday()]

def load_json():
    with open(JSON_FILE) as f:
        return json.load(f)

def save_json(data):
    with open(JSON_FILE, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def get_today_record(data):
    today = get_today_str()
    weekday = get_weekday()
    for record in data["打卡记录"]:
        if record["日期"] == today:
            return record
    # Create new record for today
    new_record = {
        "日期": today,
        "周": weekday,
        "paojiao": 0, "heshui": 0, "duanlian": 0,
        "shuijiao": 0, "dabian": 0
    }
    data["打卡记录"].append(new_record)
    return new_record

def cmd_water(amount_ml):
    data = load_json()
    record = get_today_record(data)
    # 累加喝水量（不是覆盖）
    old = record.get("heshui", 0)
    record["heshui"] = old + amount_ml

    # 更新streak（连续达标天数）
    target = 2000
    if record["heshui"] >= target:
        # 本日已达标
        habit = next(h for h in data["习惯列表"] if h["id"] == "heshui")
        if habit["streak"] == 0 or habit["streak"] == 1:
            habit["streak"] += 1

    save_json(data)
    total = record["heshui"]
    pct = min(100, int(total / target * 100))
    print(f"✅ 喝水：+{amount_ml}ml（今日累计：{total}ml / {target}ml [{pct}%]）")

def cmd_paojiao():
    data = load_json()
    record = get_today_record(data)
    record["paojiao"] = 1
    # 更新streak
    habit = next(h for h in data["习惯列表"] if h["id"] == "paojiao")
    habit["streak"] += 1
    save_json(data)
    print(f"✅ 泡脚：已完成（连续{habit['streak']}天）")

def cmd_dabian():
    data = load_json()
    record = get_today_record(data)
    record["dabian"] = 1
    habit = next(h for h in data["习惯列表"] if h["id"] == "dabian")
    habit["streak"] += 1
    save_json(data)
    print(f"✅ 大便：已完成（连续{habit['streak']}天）")

def cmd_duanlian(minutes):
    data = load_json()
    record = get_today_record(data)
    old = record.get("duanlian", 0)
    record["duanlian"] = old + minutes
    save_json(data)
    print(f"✅ 锻炼：+{minutes}分钟（今日累计：{record['duanlian']}分钟）")

def cmd_shuijiao():
    data = load_json()
    record = get_today_record(data)
    record["shuijiao"] = 1
    habit = next(h for h in data["习惯列表"] if h["id"] == "shuijiao")
    habit["streak"] += 1
    save_json(data)
    print(f"✅ 22点前睡觉：已完成（连续{habit['streak']}天）")

def cmd_status():
    data = load_json()
    today = get_today_str()
    record = None
    for r in data["打卡记录"]:
        if r["日期"] == today:
            record = r
            break
    if not record:
        print("今日暂无打卡记录")
        return
    items = []
    for h in data["习惯列表"]:
        val = record.get(h["id"], 0)
        if h["id"] == "heshui":
            items.append(f"💧 喝水：{val}ml / 2000ml")
        elif h["id"] == "duanlian":
            items.append(f"🏃 锻炼：{val}分钟")
        elif val == 1:
            items.append(f"✅ {h['icon']} {h['name']}")
        elif val == 0:
            items.append(f"❌ {h['icon']} {h['name']}")
    print(f"📅 今日打卡状态（{today} {get_weekday()}）")
    for item in items:
        print(f"  {item}")

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
    elif cmd == "status":
        cmd_status()
    else:
        print(f"未知命令：{cmd}")
        print(__doc__)
