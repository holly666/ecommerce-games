---
name: last30days
description: Research any topic across Reddit, X/Twitter, and the web from the last 30 days. Synthesizes findings into actionable insights or copy-paste prompts.
metadata: {"clawdbot":{"emoji":"📅","requires":{"bins":["bird"]}}}
---

# last30days 📅

Research any topic using recent (last 30 days) discussions from Reddit, X/Twitter, and the web. Returns synthesized insights and actionable prompts.

## Overview

The AI world reinvents itself monthly. This skill keeps you current by researching what people are actually saying *right now* - not what worked six months ago.

**What it does:**
- Searches the web, Reddit, and X/Twitter with freshness filters (last 30 days)
- Finds real practitioner experiences, not just SEO content
- Synthesizes findings into actionable insights
- Generates copy-paste prompts based on current best practices

**Best for:**
- Prompt research (what techniques actually work for ChatGPT, Midjourney, Claude, etc.)
- Trend discovery (what's viral, what people are recommending)
- Product feedback (what do real users think about X?)
- Fast-moving topics where recency matters

**Requirements:**
- Tavily Search (已配置 API key)
- `bird` CLI for X/Twitter (optional but recommended)

## Usage

When user asks for recent info on a topic, or uses "/last30days [topic]":

### Step 1: Web Search (Tavily with freshness)
```
tavily-search(query="[topic]", days=30, max_results=5)
```
- `days=30` = past 30 days
- Also try: `days=1` (24h), `days=7` (week)

### Step 2: Reddit Search
```
tavily-search(query="site:reddit.com [topic]", days=30, max_results=5)
```
Focus on r/ClaudeAI, r/ChatGPT, r/LocalLLaMA, r/MachineLearning, r/StableDiffusion, etc.

### Step 3: X/Twitter Search
```bash
bird search "[topic]" -n 10 --plain
```
Look for practitioners sharing real experiences, not just engagement bait.

### Step 4: Deep Dive (optional)
For promising URLs, use `web_fetch` to get full content:
```
web_fetch(url="https://reddit.com/...", maxChars=10000)
```

### Step 5: Synthesize
Combine findings into:
1. **Key patterns** - What are people actually doing that works?
2. **Common mistakes** - What should be avoided?
3. **Tools/techniques** - Specific methods mentioned
4. **Copy-paste prompt** (if applicable) - Ready-to-use prompt incorporating best practices

## Output Format

```markdown
## 📅 Last 30 Days: [Topic]

### What's Working
- [Pattern 1]
- [Pattern 2]

### Common Mistakes
- [Mistake 1]

### Key Techniques
- [Technique with source]

### Sources
- [URL 1] - [brief description]
- [URL 2] - [brief description]

### Ready-to-Use Prompt (if applicable)
[Generated prompt based on findings]
```

## Examples

- `/last30days Midjourney v7 prompting`
- `/last30days Claude Code best practices`
- `/last30days what are people saying about M4 MacBook`
- `/last30days Suno music prompts that actually work`

## Notes

- Uses Tavily Search (AI-optimized web search)
- Bird requires X/Twitter cookies (optional)
- Focus on signal over noise - prioritize upvoted content and verified practitioners
