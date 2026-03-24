#!/bin/bash

# 每日用药提醒脚本 - CRON 版本
# 运行时间: 每天早上 8:00

REMINDER_FILE="$HOME/.openclaw/workspace/.daily-med-reminder.txt"
MARKER_FILE="$HOME/.openclaw/workspace/.med-reminder-sent.txt"

# 检查提醒文件是否存在
if [ -f "$REMINDER_FILE" ]; then
    # 读取提醒内容
    REMINDER_CONTENT=$(cat "$REMINDER_FILE")
    
    # 删除提醒文件
    rm -f "$REMINDER_FILE"
    
    # 发送飞书提醒 (通过 OpenClaw message)
    # 这里需要调用 openclaw 或创建一个触发器
    echo "$REMINDER_CONTENT" > /tmp/med_reminder_msg.txt
    
    # 创建标记文件
    touch "$MARKER_FILE"
    
    echo "$(date): 提醒已发送，标记文件已创建"
else
    echo "$(date): 无提醒文件"
fi
