# HEARTBEAT.md

---

## 📋 信息读取检查清单（每次必读）

| 用户提到 | 自动读取 |
|----------|----------|
| 课程/课表/今天有什么课 | USER.md（课表部分） |
| 怀孕/孕期/周期 | ~/Documents/Holly工作生活笔记/01-健康/孕期健康方案.md |
| 健康/身体/血糖 | ~/Documents/Holly工作生活笔记/01-健康/孕期健康方案.md |
| 投资/股票/基金 | ~/Documents/Holly工作生活笔记/06-个人笔记/投资.md |
| 待办/待办事项 | ~/Documents/Holly工作生活笔记/00-待办/待办事项.md |

---

## 早间简报 (每天 7:30-8:30)

### 必读文件
- USER.md（课程安排）
- ~/Documents/Holly工作生活笔记/01-健康/孕期每日记录.md（孕期状态）

### 检查项目
1. 天气（温州）
2. 今日课程（从USER.md课表）
3. 服药提醒（从孕期每日记录.md读取当天药物）
4. **习惯追踪状态**（从孕期每日记录.md的习惯表格）
5. 待办事项
6. 股票（如有必要）

### 发送后用 HEARTBEAT_OK 确认

---

## 晚间简报 (每天 22:00)

### 必读文件
- ~/Documents/Holly工作生活笔记/01-健康/孕期每日记录.md
- ~/Documents/Holly工作生活笔记/00-待办/待办事项.md

### 流程
1. 生成当日日记和复盘
2. 写入 `~/Documents/Holly工作生活笔记/02-日记/每周记录-YYYY-Www.md`
3. **把当日日记和复盘发给Holly看**

### 日记内容要求
- **日记**：写 Rich哥 今天的感受、想法、观察
- **复盘**：写 Holly 做得好的点 + 有待改进的点

### 格式模板
```
## {日期}（{星期}）

### 日记
{Rich哥的感受}

### 复盘
**做得好的：**
- ...

**有待改进：**
- ...
```

---

## 21:00-22:00 习惯打卡摘要

当 heartbeat 在 21:00-22:00 区间触发时：
1. 运行 `python3 ~/.openclaw/workspace/scripts/sync_habit_data.py print` 获取今日打卡状态
2. 格式化为飞书消息发给 Holly
3. 如有未完成习惯，提醒完成

---

## 每周六 9:00
- 检查纠错记录共性（扫描 corrections.md，找出共性规律汇报）

---

## Cron 任务配置

| 时间 | 任务 |
|------|------|
| 每天 22:00 | 晚间日记+复盘（发Holly看） |

---

## 服药提醒（统一由早间播报处理）

**判断方法：** 从治疗起始日（03-27）开始数天数，第1/3/5/7...天=奇数天，第2/4/6/8...天=偶数天

**所有间隔性药物都在早间播报里统一判断，不需要单独cron**

| 药物 | 提醒条件 | 处理方式 |
|------|---------|---------|
| 黄体酮针 | 偶数天打（从03-27起算） | 早间播报处理 |
| 肝素针 | 每天打 | 早间播报处理 |
| 阿司匹林 | 偶数天吃（从03-27起算） | 早间播报处理 |
| 维生素D | 每3天一次，从03-27起算第1/4/7/10...天吃（(N-1) mod 3 == 0） | 早间播报处理 |

**数据源**：`~/Documents/Holly工作生活笔记/01-健康/用药变化追踪.md`
> 服药信息以该文件「当前有效用药」表格为准，变化时同步更新该文件
| 环孢素 | 每天早上2颗，晚上不吃 | 早间播报处理 |

---

## 习惯追踪文件索引

| 类型 | 文件 | 说明 |
|------|------|------|
| 习惯数据（源） | `~/Documents/.../习惯/习惯数据.json` | 打卡原始数据，由我更新 |
| 健康追踪数据 | `~/Documents/.../习惯/健康追踪数据.json` | 症状记录（胀气/夜尿等） |
| 习惯打卡.md | Obsidian MD | 人工可读备份 |
| 打卡可视化 | GitHub Pages (habit-tracker/) | 动态渲染，数据来自JSON |
| 同步脚本 | `~/.openclaw/workspace/scripts/sync_habit_data.py` | 单一入口，更新两边JSON |

### 打卡指令规范

每次收到 Holly 的习惯打卡消息 → 调用 sync_habit_data.py：

| 消息 | 命令 |
|------|------|
| 喝水500ml | `python3 sync_habit_data.py water 500` |
| 泡脚 | `python3 sync_habit_data.py paojiao` |
| 大便 | `python3 sync_habit_data.py dabian` |
| 锻炼30分钟 | `python3 sync_habit_data.py duanlian 30` |
| 睡觉了 | `python3 sync_habit_data.py shuijiao` |
| 胀气/排气 | `python3 sync_habit_data.py health 胀气 有 "详情"` |
| 夜尿2次3点 | `python3 sync_habit_data.py health 夜尿 2 "3:00"` |
| 查状态 | `python3 sync_habit_data.py print` |

**数据流向：**
```
Holly消息 → sync_habit_data.py → Obsidian习惯数据.json
                              ↘ GitHub habit-data.json (push后GitHub Pages自动更新)
                              ↘ GitHub health-data.json
                              ↘ Obsidian 习惯打卡.md
       ↓
GitHub Pages HTML (JavaScript读JSON渲染，无需重新部署)
```

**查看页面：** https://holly666.github.io/ecommerce-games/habit-tracker/

---

*HEARTBEAT.md 更新于 2026-03-27*
