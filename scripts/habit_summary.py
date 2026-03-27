#!/usr/bin/env python3
"""发送今日习惯打卡摘要到飞书"""
import json
import os
import urllib.request
import urllib.parse

JSON_FILE = os.path.expanduser("~/Documents/Holly工作生活笔记/06-个人笔记/习惯/习惯数据.json")

def get_today_str():
    from datetime import date
    return date.today().strftime("%Y-%m-%d")

def get_weekday():
    from datetime import date
    weekdays = ["周一","周二","周三","周四","周五","周六","周日"]
    return weekdays[date.today().weekday()]

def build_message():
    with open(JSON_FILE) as f:
        data = json.load(f)
    
    today = get_today_str()
    record = None
    for r in data["打卡记录"]:
        if r["日期"] == today:
            record = r
            break
    
    if not record:
        return None
    
    lines = [f"📋 今日习惯打卡摘要（{today} {get_weekday()}）", ""]
    
    for h in data["习惯列表"]:
        val = record.get(h["id"], 0)
        icon = h["icon"]
        name = h["name"]
        if h["id"] == "heshui":
            pct = min(100, int(val / 2000 * 100))
            lines.append(f"{icon} 喝水：{val}ml / 2000ml （{pct}%）")
        elif h["id"] == "duanlian":
            lines.append(f"{icon} 锻炼：{val}分钟")
        elif val >= 1:
            lines.append(f"✅ {icon} {name} 已完成")
        else:
            lines.append(f"❌ {icon} {name} 未完成")
    
    # 未完成提醒
    incomplete = []
    for h in data["习惯列表"]:
        val = record.get(h["id"], 0)
        if val == 0 and h["id"] not in ["duanlian"]:
            incomplete.append(f"{h['icon']} {h['name']}")
    
    if incomplete:
        lines.append("")
        lines.append("⚠️ 今日未完成：" + " · ".join(incomplete))
    
    return "\n".join(lines)

def send_feishu(message):
    """通过飞书webhook发送消息（简单版）"""
    # 飞书机器人的webhook（需要机器人token）
    # 这里用简化的方式：通过curl发送
    feishu_token = os.environ.get("FEISHU_TOKEN", "")
    if not feishu_token:
        print("FEISHU_TOKEN not set, printing message instead:")
        print(message)
        return
    
    url = f"https://open.feishu.cn/open-apis/bot/v2/hook/{feishu_token}"
    data = json.dumps({"msg_type": "text", "content": {"text": message}}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as resp:
            print("Message sent:", resp.read())
    except Exception as e:
        print("Failed to send:", e)

if __name__ == "__main__":
    msg = build_message()
    if msg:
        print(msg)
        # send_feishu(msg)  # 启用时取消注释
    else:
        print("今日暂无打卡记录")
