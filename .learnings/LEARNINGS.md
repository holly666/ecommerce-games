# Learnings Log

Captured learnings, corrections, and discoveries. Review before major tasks.

---

## [LRN-20260329-003] best_practice

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
用药/医嘱变更时，必须同步更新所有相关位置，改完自检

### Details
之前多次出现：Holly说"XX药停了"，我只改了memory/怀孕.md但HEARTBEAT.md的早间播报文案没改，导致重复提醒已停的药。核心问题不是"存在哪个文件"，而是"改了一处不改其他相关位置"。

### Suggested Action
医嘱变更时：
1. 列出所有相关文件（HEARTBEAT.md、memory/怀孕.md等）
2. 同步更新所有位置
3. 改完后自己检查一遍所有提醒文案是否一致

### Metadata
- Source: conversation
- Related Files: HEARTBEAT.md, memory/怀孕.md
- Tags: medication, sync, hard-rule
- Pattern-Key: sync.all_related_locations
- Recurrence-Count: 5

---

## [LRN-20260329-004] knowledge_gap

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: critical
**Status**: pending
**Area**: frontend

### Summary
严禁编造医疗信息——没有数据就说"没有"，不推测

### Details
验血报告分析时，编造了具体HCG数值和中医诊断名称。医疗信息后果严重，不可推测。

### Suggested Action
- 没有收到图片/数据 → 直接说"没有"，不要编造
- 识别图片 → 严格按照PaddleOCR识别的原文输出
- 不确定 → 明确说"不确定"

### Metadata
- Source: user_feedback
- Tags: hallucination, medical, hard-rule
- Pattern-Key: no_fabrication.medical

---

## [LRN-20260329-005] best_practice

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
遇到新需求先看现有系统，能扩展就不建新的

### Details
Holly要设黄体酮隔天提醒，我第一反应建新cron，折腾6-7条消息才发现早间播报系统已能处理。

### Suggested Action
遇到新需求：
1. 先想现有系统能不能扩展
2. 有类似的 → 直接加进去
3. 开口前先确认："跟现有的XXX逻辑一样对吧？"

### Metadata
- Source: user_feedback
- Tags: simplicity, existing-system-first
- Pattern-Key: existing_system_first

---

## [LRN-20260329-006] best_practice

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
设置cron后立即检查状态，确保是ok不是error

### Details
中药cron设置了但状态是error，用户没收到提醒。设置完不检查=没设置。

### Suggested Action
- 设置cron后立即 `openclaw cron list` 检查状态
- 确保是ok才退出
- 定期检查重要cron状态

### Metadata
- Source: user_feedback
- Tags: cron, verification, hard-rule
- Pattern-Key: verify_after_setup

---

## [LRN-20260329-007] best_practice

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: medium
**Status**: pending
**Area**: infra

### Summary
设置定时任务用openclaw cron add，不用系统crontab

### Details
用系统crontab命令试了5-6次都加不上，绕了弯路才想起用OpenClaw封装的cron。

### Suggested Action
- 记住：定时任务用 `openclaw cron add`
- 不要用系统crontab命令

### Metadata
- Source: user_feedback
- Tags: cron, openclaw, tool-usage
- Pattern-Key: openclaw_cron_first

---

## [LRN-20260329-008] best_practice

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: medium
**Status**: pending
**Area**: infra

### Summary
cron systemEvent只发文本，不触发复杂工作流，需在payload写完整指令

### Details
配置凌晨日记任务时，systemEvent只发"写日记"，结果只创建了空文件没触发完整流程。

### Suggested Action
- cron的systemEvent里写完整指令
- 测试通过后再设成定时任务

### Metadata
- Source: user_feedback
- Tags: cron, systemEvent, workflow
- Pattern-Key: cron_complete_instruction

---

## [LRN-20260329-009] best_practice

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
找OpenClaw技能去~/.openclaw/skills/，不用which或系统命令

### Details
用`which`检查技能是否存在返回不存在，实际上技能在~/.openclaw/workspace/skills/。

### Suggested Action
- 找技能 → `~/.openclaw/skills/` 或 `~/.openclaw/workspace/skills/`
- 不要用系统命令搜索

### Metadata
- Source: user_feedback
- Tags: skill, tool-location, openclaw
- Pattern-Key: skill_location_openclaw

---

## [LRN-20260329-010] best_practice

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
任务收尾自己决定，能处理的不甩给用户决策

### Details
cron调整完后剩两个旧任务没删，我习惯问"要删吗"，Holly说"不需要问我，应该直接删"。

### Suggested Action
- 任务收尾时自己检查一遍
- 能自己决定的不多嘴
- 区分"需要用户决策"和"该自己直接处理的"

### Metadata
- Source: user_feedback
- Tags: task-closure, autonomy
- Pattern-Key: task_closure_self_check

---

## [LRN-20260329-011] best_practice

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
读取清单/医嘱先过滤已停/无效条目，养成主动过滤习惯

### Details
列出吃药清单时把已停的地屈孕酮片、二甲双胍也列了出来。

### Suggested Action
- 读取清单类信息时，先过滤"已停/已结束/无效"
- 不等用户提醒就主动过滤

### Metadata
- Source: user_feedback
- Tags: information-filtering, proactive
- Pattern-Key: proactive_filter_invalid

---

## [LRN-20260329-012] best_practice

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
时间类信息用消息发送时间，不凭记忆/猜测编造

### Details
Holly 06:18发消息说起床上厕所，我记录的夜尿时间是03:53——自己编的。

### Suggested Action
- 记录时间类信息 → 用消息的发送时间
- 不要凭记忆/猜测

### Metadata
- Source: user_feedback
- Tags: time, accuracy, no_fabrication
- Pattern-Key: use_message_timestamp

---

## [LRN-20260329-013] knowledge_gap

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
验血报告分析先查完整历史趋势，不只看单点数据

### Details
DeepSeek分析验血报告时查了3个时间点形成曲线，我只对比了2次。且没解释">191"是检测上限。

### Suggested Action
验血报告分析流程：
1. 先查历史所有时间点
2. 画完整趋势曲线
3. 解释检测上限类数值的真正含义
4. 给分析加温度（这是孕妇）
5. 提醒"以医生判断为准"

### Metadata
- Source: user_feedback
- Tags: medical-analysis, trend, history
- Pattern-Key: medical_full_history_first

---

## [LRN-20260329-015] best_practice

**Logged**: 2026-03-29T09:00:00+08:00
**Priority**: critical
**Status**: pending
**Area**: config

### Summary
改配置前必须先验证当前值，不在没有依据的情况下瞎改

### Details
黄体酮针原规则是"奇数天不打"，Holly说"错了"后我直接改成"每天打"——没有任何依据瞎猜。实际规则是"偶数天打"，和原规则只差一个符号。

### Suggested Action
改配置/规则前：
1. 先查当前值是什么
2. 确认正确值（从原始医嘱/文件/起始日推算）
3. 不能在不知道当前值的情况下凭直觉改

### Metadata
- Source: conversation
- Tags: config, verification, no_guess
- Pattern-Key: verify_before_change

---

## [LRN-20260329-014] best_practice

**Logged**: 2026-03-29T08:56:00+08:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
配置规则后用实际日期代入验算一次，不光靠记忆

### Details
连续3次在服药规则（奇数天/偶数天）上犯错，以为按日历单双号，实际是从治疗起始日算天数。

### Suggested Action
配置规则时：
1. 确认起始日
2. 用当前日期代入验算一次
3. 确认输出符合预期

### Metadata
- Source: user_feedback
- Tags: config, verification, date-calculation
- Pattern-Key: verify_with_actual_date

---

## [LRN-20260329-001] best_practice

**Logged**: 2026-03-29T08:34:00+08:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
记忆操作铁律：delete/update 操作必须加 scope=agent:main 参数

### Details
今天发现用 memoryId 做 delete/update 时，必须加 `scope=agent:main` 参数，否则报 "outside accessible scopes"。用 query 搜索则不需要加。update 操作失败时可改用 store 新版本 + query 删除旧版本。

同时更正了对 lancedb-pro 衰减机制的理解：旧版本不会"自然衰减"物理删除，而是被新版覆盖优先级后，在检索时 tier 低 + 分数下降，渐渐查不到。

### Suggested Action
1. 删/改记忆时，memoryId 搭配 scope=agent:main 参数一起用
2. update 失败时用 store 新版本 + delete 旧版本
3. 记清楚：没有物理删除的遗忘机制，只有优先级覆盖

### Metadata
- Source: conversation
- Related Files: memory-lancedb-pro skill
- Tags: memory, lancedb-pro, scope

---

## [LRN-20260329-002] knowledge_gap

**Logged**: 2026-03-29T08:22:00+08:00
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
lancedb-pro 的 Weibull decay tier 机制正确理解

### Details
lancedb-pro 三级 tier（Core/Working/Peripheral）的衰减逻辑：
- Peripheral 层：60天无人访问 + 分数<0.15 → 降级到"几乎查不到"
- Core 层：Gentle sub-exponential decline（下限0.9）
- Working 层：Standard exponential（标准指数衰减）
- 晋升规则：Peripheral → Working 需要 access≥3 + score≥0.4；Working → Core 需要 access≥10 + score≥0.7 + importance≥0.8

### Suggested Action
更新对 lancedb-pro 衰减机制的理解，不要说"自然衰减"而要准确描述

### Metadata
- Source: conversation
- Related Files: memory-lancedb-pro skill
- Tags: memory, lancedb-pro, decay

---
