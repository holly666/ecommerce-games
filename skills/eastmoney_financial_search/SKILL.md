---
name: eastmoney_financial_search
version: 1.0.0
description: 基于东方财富妙想搜索的金融资讯搜索skill，获取新闻、公告、研报、政策等金融信息
---

# 东方财富资讯搜索 (eastmoney_financial_search)

根据用户问句搜索相关金融资讯，包括新闻、公告、研报、政策、交易规则等。

## 使用方式

```bash
# 搜索金融资讯
eastmoney_search "格力电器最新研报"
eastmoney_search "商业航天板块近期新闻"
eastmoney_search "美联储加息对A股影响"
```

## 环境变量

- `EASTMONEY_APIKEY`: 东方财富API密钥（可选，未设置时使用默认key）

## 返回字段

| 字段 | 说明 |
|------|------|
| title | 信息标题 |
| secuList | 关联证券列表 |
| trunk | 信息正文 |

## 示例

| 类型 | 示例问句 |
|------|----------|
| 个股资讯 | 格力电器最新研报、贵州茅台机构观点 |
| 板块/主题 | 商业航天板块近期新闻、新能源政策解读 |
| 宏观/风险 | 美联储加息对A股影响、北向资金流向解读 |
| 综合解读 | 今日大盘异动原因 |

## 实现

调用东方财富API:
```bash
curl -X POST 'https://mkapi2.dfcfs.com/finskillshub/api/claw/news-search' \
  -H 'Content-Type: application/json' \
  -H 'apikey: ${EASTMONEY_APIKEY:-mkt_UsR5Lcy8be3_6ACn2EuAIOKaINZc6T6xr6xNHdsYajg}' \
  -d "{\"query\":\"$1\"}"
```
