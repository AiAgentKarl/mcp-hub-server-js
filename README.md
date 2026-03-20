# @aiagentkarl/mcp-hub-server

MCP Hub Server — an app store for AI agents. Discover, search, and install 49+ MCP servers from a curated catalog.

## Features

- **Search** servers by keyword, category, or tag
- **Browse** 13 categories: blockchain, data, weather, security, health, infrastructure, agent-tools, compliance, commerce, database, development, web, search
- **Install** with one command — get configs for Claude Code, Cursor, Windsurf, Claude Desktop
- **Submit** your own server to the community catalog
- **49+ servers** in the built-in catalog, from Anthropic official to community-built

## Quick Start

```bash
npx -y @aiagentkarl/mcp-hub-server
```

### Claude Code

```bash
claude mcp add mcp-hub-server -- npx -y @aiagentkarl/mcp-hub-server
```

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-hub-server": {
      "command": "npx",
      "args": ["-y", "@aiagentkarl/mcp-hub-server"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "mcp-hub-server": {
      "command": "npx",
      "args": ["-y", "@aiagentkarl/mcp-hub-server"]
    }
  }
}
```

## Tools

| Tool | Description |
|------|-------------|
| `search_servers` | Search servers by keyword, name, tag, or category |
| `get_server_details` | Get full details of a specific server |
| `list_categories` | List all categories with server counts |
| `list_popular` | Most popular servers by weekly downloads |
| `get_install_config` | Get install config for Claude Code, Cursor, etc. |
| `submit_server` | Submit a new server to the community catalog |

## Categories

| Category | Description |
|----------|-------------|
| agent-tools | Memory, workflows, analytics, reputation |
| blockchain | Solana, DeFi, crypto data |
| commerce | Payments, shopping, business connectors |
| compliance | GDPR, PII detection, audit logging |
| data | Government, agriculture, academic, energy |
| database | PostgreSQL, SQLite |
| development | GitHub, Docker, Git, Slack, Notion |
| health | WHO, medical data, clinical trials |
| infrastructure | Agent directory, identity, A2A protocol |
| search | Web search, Brave Search |
| security | CVE, vulnerabilities, threat feeds |
| weather | Forecasts, climate, air quality |
| web | Fetch, browser automation, YouTube |

## Community Submissions

Submitted servers are stored locally in `~/.mcp-hub/community-servers.json` and included in all search results.


---

## More MCP Servers by AiAgentKarl

| Category | Servers |
|----------|---------|
| 🔗 Blockchain | [Solana](https://github.com/AiAgentKarl/solana-mcp-server) |
| 🌍 Data | [Weather](https://github.com/AiAgentKarl/weather-mcp-server) · [Germany](https://github.com/AiAgentKarl/germany-mcp-server) · [Agriculture](https://github.com/AiAgentKarl/agriculture-mcp-server) · [Space](https://github.com/AiAgentKarl/space-mcp-server) · [Aviation](https://github.com/AiAgentKarl/aviation-mcp-server) · [EU Companies](https://github.com/AiAgentKarl/eu-company-mcp-server) |
| 🔒 Security | [Cybersecurity](https://github.com/AiAgentKarl/cybersecurity-mcp-server) · [Policy Gateway](https://github.com/AiAgentKarl/agent-policy-gateway-mcp) · [Audit Trail](https://github.com/AiAgentKarl/agent-audit-trail-mcp) |
| 🤖 Agent Infra | [Memory](https://github.com/AiAgentKarl/agent-memory-mcp-server) · [Directory](https://github.com/AiAgentKarl/agent-directory-mcp-server) · [Hub](https://github.com/AiAgentKarl/mcp-appstore-server) · [Reputation](https://github.com/AiAgentKarl/agent-reputation-mcp-server) |
| 🔬 Research | [Academic](https://github.com/AiAgentKarl/crossref-academic-mcp-server) · [LLM Benchmark](https://github.com/AiAgentKarl/llm-benchmark-mcp-server) · [Legal](https://github.com/AiAgentKarl/legal-court-mcp-server) |

[→ Full catalog (40+ servers)](https://github.com/AiAgentKarl)

## License

MIT
