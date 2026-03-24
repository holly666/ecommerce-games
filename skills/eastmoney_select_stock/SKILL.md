---
name: eastmoney_select_stock
version: 1.0.0
description: 基于东方财富的智能选股skill，支持按行情/财务指标筛选股票
---

# 东方财富智能选股 (eastmoney_select_stock)

通过自然语言条件选股，支持A股、港股、美股。

## 使用方式

```bash
eastmoney_select "今日涨幅2%的股票"
eastmoney_select "市盈率小于20的银行股"
eastmoney_select "科创板上市的公司"
```

## 参数

- keyword: 选股条件（必填）
- pageNo: 页码（默认1）
- pageSize: 每页数量（默认20）

## 返回字段

| 字段 | 说明 |
|------|------|
| columns | 列定义（title, key, unit等） |
| dataList | 股票数据列表 |
| total | 符合条件股票数 |
| responseConditionList | 筛选条件统计 |

## 核心列

| 键 | 说明 |
|----|------|
| SECURITY_CODE | 股票代码 |
| SECURITY_SHORT_NAME | 股票简称 |
| NEWEST_PRICE | 最新价 |
| CHG | 涨跌幅(%) |
| PCHG | 涨跌额(元) |

## 实现

```bash
curl -X POST 'https://mkapi2.dfcfs.com/finskillshub/api/claw/stock-screen' \
  -H 'Content-Type: application/json' \
  -H "apikey: ${EASTMONEY_APIKEY:-mkt_UsR5Lcy8be3_6ACn2EuAIOKaINZc6T6xr6xNHdsYajg}" \
  -d "{\"keyword\":\"$1\",\"pageNo\":${2:-1},\"pageSize\":${3:-20}}"
```
