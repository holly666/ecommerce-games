# Session: 2026-03-26 11:59:47 UTC

- **Session Key**: agent:main:feishu:direct:ou_b7d012adf23fdf804dcae3cbb62c997f
- **Session ID**: 77543034-e302-4327-ac2b-8da2174510f2
- **Source**: feishu

## Conversation Summary

assistant: ✅ New session started · model: minimax-cn/MiniMax-M2.7
user: A new session was started via /new or /reset. Run your Session Startup sequence - read the required files before responding to the user. Then greet the user in your configured persona, if one is provided. Be yourself - use your defined voice, mannerisms, and mood. Keep it to 1-3 sentences and ask what they want to do. If the runtime model differs from default_model in the system prompt, mention the default model. Do not mention internal steps, files, tools, or reasoning.
Current time: Thursday, March 26th, 2026 — 7:52 PM (Asia/Shanghai) / 2026-03-26 11:52 UTC
assistant: 
老大晚上好 🦞 刚下班还是在去接娃的路上？今天周四，晚上有晚自习但估计快结束了——有啥要整的？
user: Conversation info (untrusted metadata):
```json
{
  "message_id": "om_x100b5365a96e10a4b286a447e90fd98",
  "sender_id": "ou_b7d012adf23fdf804dcae3cbb62c997f",
  "sender": "ou_b7d012adf23fdf804dcae3cbb62c997f",
  "timestamp": "Thu 2026-03-26 19:54 GMT+8"
}
```

Sender (untrusted metadata):
```json
{
  "label": "ou_b7d012adf23fdf804dcae3cbb62c997f",
  "id": "ou_b7d012adf23fdf804dcae3cbb62c997f",
  "name": "ou_b7d012adf23fdf804dcae3cbb62c997f"
}
```

[message_id: om_x100b5365a96e10a4b286a447e90fd98]
ou_b7d012adf23fdf804dcae3cbb62c997f: > ## Documentation Index
> Fetch the complete documentation index at: https://platform.minimaxi.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# 图片理解 & 网络搜索 MCP

> **Token Plan MCP** 提供了两个专属工具：**网络搜索** 和  **图片理解**，帮助开发者在编码过程中快速获取信息和理解图片内容。 

## 工具说明

<AccordionGroup>
  <Accordion title="web_search" icon="search">
    根据搜索查询词进行网络搜索，返回搜索结果和相关搜索建议。

    | 参数    | 类型     |  必需 | 说明    |
    | :---- | :----- | :-: | :---- |
    | query | string |  ✓  | 搜索查询词 |
  </Accordion>

  <Accordion title="understand_image" icon="eye">
    对图片进行理解和分析，支持多种图片输入方式。

    | 参数         | 类型     |  必需 | 说明                             |
    | :--------- | :----- | :-: | :----------------------------- |
    | prompt     | string |  ✓  | 对图片的提问或分析要求                    |
    | image\_url | string |  ✓  | 图片来源，支持 HTTP/HTTPS URL 或本地文件路径 |

    **支持格式**：JPEG、PNG、GIF、WebP（最大 20MB）
  </Accordion>
</AccordionGroup>

## 前置准备

<Steps>
  <Step title="获取 API Key">
    访问 [Token Plan 订阅页面](https://platform.minimaxi.com/subscribe/token-plan)，订阅套餐并获取专属 API Key。
  </Step>

  <Step title="安装 uvx">
    <Tabs>
      <Tab title="macOS / Linux">
        ```bash  theme={null}
        curl -LsSf https://astral.sh/uv/install.sh | sh
        ```
      </Tab>

      <Tab title="Windows">
        ```powershell  theme={null}
        powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
        ```
      </Tab>
    </Tabs>

    <Note>
      其他安装方式可参考 [uv 仓库](https://github.com/astral-sh/uv)。
    </Note>
  </Step>

  <Step title="验证安装">
    <Tabs>
      <Tab title="macOS / Linux">
        ```bash  theme={null}
        which uvx
        ```
      </Tab>

      <Tab title="Windows">
        ```powershell  theme={null}
        (Get-Command uvx).source
        ```
      </Tab>
    </Tabs>

    <Note>
      若正确安装，会显示路径（如 `/usr/local/bin/uvx`）。若报错 `spawn uvx ENOENT`，需配置绝对路径。
    </Note>
  </Step>
</Steps>

## 在 Claude Code 中使用

<Steps>
  <Step title="下载 Claude Code">
    在 [Claude Code 官网](https://www.claude.com/product/claude-code)下载并安装 Claude Code
  </Step>

  <Step title="配置 MCP">
    <Tabs>
      <Tab title="一键安装">
        在终端运行以下命令，将`api_key`替换为您的 API Key：

        ```bash  theme={null}
        claude mcp add -s user MiniMax --env MINIMAX_API_KEY=api_key --env MINIMAX_API_HOST=https://api.minimaxi.com -- uvx minimax-coding-plan-mcp -y
        ```
      </Tab>

      <Tab title="手动配置">
        编辑配置文件 `~/.claude.json`，添加以下 MCP 配置：

        ```json  theme={null}
        {
          "mcpServers": {
            "MiniMax": {
              "command": "uvx",
              "args": ["minimax-coding-plan-mcp", "-y"],
              "env": {
                "MINIMAX_API_KEY": "MINIMAX_API_KEY",
                "MINIMAX_API_HOST": "https://api.minimaxi.com"
              }
            }
          }
        }
        ```
      </Tab>
    </Tabs>
  </Step>

  <Step title="验证配置">
    进入 Claude Code 后输入 `/mcp`，能看到 `web_search` 和 `understand_image`，说明配置成功。

    <img src="https://filecdn.minimax.chat/public/59a2ac4d-fe8a-42d9-8898-e81aea641622.png" width="80%" />
  </Step>
</Steps>

<Note>
  如果您在 IDE（如 TRAE）中使用 MCP，还需要在对应 IDE 的 MCP 配置中进行设置
</Note>

## 在 Cursor 中使用

<Steps>
  <Step title="下载 Cursor">
    通过 [Cursor 官网](https://cursor.com/) 下载并安装 Cursor
  </Step>

  <Step title="打开 MCP 配置">
    前往 `Cursor -> Preferences -> Cursor Settings -> Tools & Integrations -> MCP -> Add Custom MCP`

    ![Cursor MCP 配置](https://filecdn.minimax.chat/public/61982fde-6575-4230-94eb-798f35a60450.png)
  </Step>

  <Step title="添加配置">
    在 `mcp.json` 文件中添加以下配置：

    ```json  theme={null}
    {
      "mcpServers": {
        "MiniMax": {
          "command": "uvx",
          "args": ["minimax-coding-plan-mcp"],
          "env": {
            "MINIMAX_API_KEY": "填写你的API密钥",
            "MINIMAX_MCP_BASE_PATH": "本地输出目录路径，需保证路径存在且有写入权限",
            "MINIMAX_API_HOST": "https://api.minimaxi.com",
            "MINIMAX_API_RESOURCE_MODE": "可选，资源提供方式：url 或 local，默认 url"
          }
        }
      }
    }
    ```
  </Step>
</Steps>

## 在 OpenCode 中使用

<Steps>
  <Step title="下载 OpenCode">
    通过 [OpenCode 官网](https://opencode.ai/) 下载并安装 OpenCode
  </Step>

  <Step title="配置 MCP">
    编辑配置文件 `~/.config/opencode/opencode.json`，添加以下 MCP 配置：

    ```json  theme={null}
    {
      "$schema": "https://opencode.ai/config.json",
      "mcp": {
        "MiniMax": {
          "type": "local",
          "command": ["uvx", "minimax-coding-plan-mcp", "-y"],
          "environment": {
            "MINIMAX_API_KEY": "MINIMAX_API_KEY",
            "MINIMAX_API_HOST": "https://api.minimaxi.com"
          },
          "enabled": true
        }
      }
    }
    ```
  </Step>

  <Step title="验证配置">
    进入 OpenCode 后，输入 `/mcp`，能看到 `MiniMax connected`，说明配置成功。

    <img src="https://filecdn.minimax.chat/public/1a24c300-4cff-40ee-a428-869467074c1d.png" width="80%" />
  </Step>
</Steps>
根据这个配置mcp
assistant: 
这个是给 IDE（Claude Code / Cursor / OpenCode）配置的 MCP，不是 OpenClaw 的——我用自带的 `web_search` 就够了（走 Tavily，不额外收费）。

你是想在哪个 IDE 里配这个 MiniMax MCP？还是说想给我开放 `web_search` 之外的更多搜索能力？🦞
