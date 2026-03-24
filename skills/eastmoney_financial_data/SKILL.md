---
name: eastmoney_financial_data
version: 1.0.0
description: 基于东方财富数据库查询股票、板块、指数等的行情和财务数据
---

# 东方财富金融数据 (eastmoney_financial_data)

通过自然语言查询金融数据，包括行情、财务、关系等数据。

## 使用方式

```bash
# 查询行情数据
eastmoney_data "茅台最新价"
eastmoney_data "A股今日成交额"

# 查询财务数据
eastmoney_data "格力电器2024年净利润"
eastmoney_data "宁德时代毛利率"
```

## 环境变量

- `EASTMONEY_APIKEY`: 东方财富API密钥

## 返回格式

JSON格式，包含：
- `data.dataTableDTOList[]`: 证券指标数据列表
- `data.condition`: 查询条件
- `data.entityTagDTOList`: 证券主体信息

## 示例查询

| 类型 | 示例 |
|------|------|
| 行情 | 股票最新价、板块资金流向 |
| 财务 | 净利润、毛利率、营收 |
| 关系 | 股东结构、高管信息 |

## 实现

```bash
curl -X POST 'https://mkapi2.dfcfs.com/finskillshub/api/claw/query' \
  -H 'Content-Type: application/json' \
  -H "apikey: ${EASTMONEY_APIKEY:-mkt_UsR5Lcy8be3_6ACn2EuAIOKaINZc6T6xr6xNHdsYajg}" \
  -d "{\"toolQuery\":\"$1\"}"
```
