# 女尊世界·当家主 - 系统架构

## 技术栈
- 纯前端：单HTML文件，无框架
- 状态管理：全局变量 `S` 对象（JSON可序列化）
- 存档：localStorage（key: `nvzh_v5`）
- 样式：内嵌CSS，古典中国风配色

## 全局状态 (S对象)

```
S.playerName      - 玩家名字
S.bg              - 身世对象 {id, name, desc, tags, init:{money,prestige...}}
S.trait           - 心性对象 {id, name, effect:{wit,social,bravo}}
S.day             - 当前第几天
S.money           - 银两
S.prestige        - 声望
S.wit             - 智慧
S.bravo           - 魄力
S.social          - 人脉
S.identity        - 身份等级 1-5
S.examLevel       - 科举等级 none/童生/秀才/举人/进士/官员
S.isMarried       - 是否已婚
S.husband         - 夫君对象 {id, name, personality, isPregnant, pregnancyDay}
S.affection       - 好感度 0-100
S.concubines      - 妾室数组 [{id, name, personality, pregnant, pregnancyDay}]
S.children        - 子女数组 [{name, gender, motherId, traits}]
S.log             - 对话日志数组
S.flags           - 各种标记对象
S.gameStarted     - 是否已开始游戏（用于读档恢复UI）
```

## 核心函数

| 函数 | 职责 |
|------|------|
| `initS()` | 初始化S对象的所有字段 |
| `showScene(title, text, choices, etag)` | 渲染场景 |
| `showMorning()` | 每日清晨选项 |
| `showNight()` | 每日夜间场景 |
| `renderStats()` | 顶部状态栏渲染 |
| `autoSave()` | 自动存档+UI提示 |
| `loadGame()` | 读档+完整UI恢复 |
| `window.go(n, t)` | 路由函数，所有按钮点击的终点 |

## 场景流

```
封面 → [开始游戏] → s1(身世) → s2(心性) → s3(名字确认) → startGame()
                                                                    ↓
封面 ← [读档] ← loadGame() ← localStorage ← autoSave() ← window.go()
                                                                    ↓
                                                          每日循环: showMorning() → go_*(选操作) → showNight() → n_*(夜间)
```

## 数据文件

- `index.html` - 唯一游戏文件（~4000行，含HTML/CSS/JS）
- `harness/feature-list.json` - 功能清单
- `harness/progress.txt` - 进度记录
- `harness/ARCHITECTURE.md` - 本文档

## 路由注册（window.go）

所有场景函数通过两种方式注册到路由：
1. **直接 case**: `case 'go_market': go_market(); break;`
2. **前缀匹配**: `if(n.startsWith('harem_illness_cure_')){ harem_illness_cure(pid); return; }`

新增功能需要在 `window.go` switch 中添加对应 case。
