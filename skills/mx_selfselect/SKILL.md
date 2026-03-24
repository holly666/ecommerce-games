---
name: mx_selfselect
version: 1.0.0
description: 基于东方财富妙想自选股管理skill，查询/添加/删除自选股
---

# 妙想自选股管理 (mx_selfselect)

通过自然语言管理东方财富账户的自选股。

## 使用方式

```bash
# 查询自选股
selfselect list

# 添加自选股
selfselect add "贵州茅台"

# 删除自选股
selfselect remove "贵州茅台"
```

## 环境变量

- `MX_APIKEY`: 东方财富妙想API密钥

## 功能

| 操作 | 说明 |
|------|------|
| 查询自选股 | 获取账户自选股列表 |
| 添加自选股 | 把股票加入自选 |
| 删除自选股 | 从自选移除股票 |

## 实现

查询自选股：
```bash
curl -X POST 'https://mkapi2.dfcfs.com/finskillshub/api/claw/self-select/get' \
  -H 'Content-Type: application/json' \
  -H "apikey: ${MX_APIKEY:-mkt_UsR5Lcy8be3_6ACn2EuAIOKaINZc6T6xr6xNHdsYajg}"
```

添加/删除自选股：
```bash
curl -X POST 'https://mkapi2.dfcfs.com/finskillshub/api/claw/self-select/manage' \
  -H 'Content-Type: application/json' \
  -H "apikey: ${MX_APIKEY:-mkt_UsR5Lcy8be3_6ACn2EuAIOKaINZc6T6xr6xNHdsYajg}" \
  -d "{\"query\":\"$1\"}"
```
