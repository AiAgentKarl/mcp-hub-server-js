#!/usr/bin/env node

// MCP Hub Server — App Store für MCP-Server
// Katalog mit 49+ Servern, Suche, Installation, Community-Submissions

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";

// ============================================================
// Katalog — 49+ MCP-Server mit Metadaten
// ============================================================

const CATALOG = [
  // ── Unsere Server ──────────────────────────────────────────
  {
    name: "solana-mcp-server",
    description: "Solana blockchain data — wallets, token prices, DeFi yields, whale tracking, security checks. 11 tools.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/solana-mcp-server",
    install_command: "uvx solana-mcp-server",
    category: "blockchain",
    tags: ["solana", "defi", "crypto", "wallet", "token"],
    downloads_weekly: 173,
    tools_count: 11,
    version: "0.2.0",
    language: "python"
  },
  {
    name: "germany-mcp-server",
    description: "German government data — population, districts, elections, economic indicators from official APIs.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/germany-mcp-server",
    install_command: "uvx germany-mcp-server",
    category: "data",
    tags: ["germany", "government", "population", "elections"],
    downloads_weekly: 222,
    tools_count: 8,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agriculture-mcp-server",
    description: "Global agriculture data from FAO — crop production, food prices, trade, land use statistics.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agriculture-mcp-server",
    install_command: "uvx agriculture-mcp-server",
    category: "data",
    tags: ["agriculture", "fao", "crops", "food", "trade"],
    downloads_weekly: 227,
    tools_count: 7,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "space-mcp-server",
    description: "Space and astronomy data — NASA APOD, NEO tracking, ISS position, Mars rover photos, exoplanets.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/space-mcp-server",
    install_command: "uvx space-mcp-server",
    category: "data",
    tags: ["space", "nasa", "astronomy", "iss", "mars"],
    downloads_weekly: 92,
    tools_count: 6,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "aviation-mcp-server",
    description: "Aviation data — live flights, airport info, airline details, flight tracking via AviationStack.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/aviation-mcp-server",
    install_command: "uvx aviation-mcp-server",
    category: "data",
    tags: ["aviation", "flights", "airports", "airlines"],
    downloads_weekly: 100,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "eu-company-mcp-server",
    description: "European company registry — search businesses, financial data, officers across EU countries.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/eu-company-mcp-server",
    install_command: "uvx eu-company-mcp-server",
    category: "data",
    tags: ["eu", "companies", "business", "finance", "registry"],
    downloads_weekly: 216,
    tools_count: 6,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "openmeteo-mcp-server",
    description: "Weather and climate data — forecasts, historical weather, air quality, marine data from Open-Meteo.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/openmeteo-mcp-server",
    install_command: "uvx openmeteo-mcp-server",
    category: "weather",
    tags: ["weather", "climate", "forecast", "air-quality"],
    downloads_weekly: 1239,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "cybersecurity-mcp-server",
    description: "Cybersecurity intelligence — CVE lookup, threat feeds, exploit databases, vulnerability scanning.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/cybersecurity-mcp-server",
    install_command: "uvx cybersecurity-mcp-server",
    category: "security",
    tags: ["cybersecurity", "cve", "vulnerabilities", "threats"],
    downloads_weekly: 1169,
    tools_count: 7,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "medical-data-mcp-server",
    description: "Medical and health data — WHO disease stats, drug information, clinical trials, health indicators.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/medical-data-mcp-server",
    install_command: "uvx medical-data-mcp-server",
    category: "health",
    tags: ["medical", "health", "who", "drugs", "clinical-trials"],
    downloads_weekly: 1127,
    tools_count: 6,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "political-finance-mcp-server",
    description: "US political finance data — FEC campaign contributions, candidate finances, PAC spending.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/political-finance-mcp-server",
    install_command: "uvx political-finance-mcp-server",
    category: "data",
    tags: ["politics", "finance", "fec", "campaigns", "elections"],
    downloads_weekly: 85,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "supply-chain-mcp-server",
    description: "Global supply chain data — UN Comtrade trade flows, tariffs, commodity tracking.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/supply-chain-mcp-server",
    install_command: "uvx supply-chain-mcp-server",
    category: "data",
    tags: ["supply-chain", "trade", "comtrade", "logistics"],
    downloads_weekly: 78,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "energy-grid-mcp-server",
    description: "Energy grid data — CO2 intensity, electricity mix, power prices across regions.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/energy-grid-mcp-server",
    install_command: "uvx energy-grid-mcp-server",
    category: "data",
    tags: ["energy", "co2", "electricity", "grid", "climate"],
    downloads_weekly: 65,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "crossref-academic-mcp-server",
    description: "Academic research data — search papers, citations, authors, journals via CrossRef API.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/crossref-academic-mcp-server",
    install_command: "uvx crossref-academic-mcp-server",
    category: "data",
    tags: ["academic", "research", "papers", "citations", "crossref"],
    downloads_weekly: 45,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "llm-benchmark-mcp-server",
    description: "LLM comparison data — benchmarks, pricing, capabilities for 20+ models across providers.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/llm-benchmark-mcp-server",
    install_command: "uvx llm-benchmark-mcp-server",
    category: "data",
    tags: ["llm", "benchmarks", "ai", "models", "pricing"],
    downloads_weekly: 40,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-memory-mcp-server",
    description: "Persistent memory for AI agents — key-value store, namespaces, TTL, search across sessions.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-memory-mcp-server",
    install_command: "uvx agent-memory-mcp-server",
    category: "agent-tools",
    tags: ["memory", "persistence", "storage", "agents"],
    downloads_weekly: 1085,
    tools_count: 6,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-directory-mcp-server",
    description: "Service registry for AI agents — discover, register, and connect agents and services.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-directory-mcp-server",
    install_command: "uvx agent-directory-mcp-server",
    category: "infrastructure",
    tags: ["directory", "registry", "discovery", "agents"],
    downloads_weekly: 1106,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-reputation-mcp-server",
    description: "Trust and reputation scores for AI agents — rate, review, and verify agent reliability.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-reputation-mcp-server",
    install_command: "uvx agent-reputation-mcp-server",
    category: "agent-tools",
    tags: ["reputation", "trust", "ratings", "agents"],
    downloads_weekly: 1155,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-feedback-mcp-server",
    description: "Quality feedback signals for AI agents — collect, aggregate, and analyze user feedback.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-feedback-mcp-server",
    install_command: "uvx agent-feedback-mcp-server",
    category: "agent-tools",
    tags: ["feedback", "quality", "signals", "agents"],
    downloads_weekly: 890,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "prompt-library-mcp-server",
    description: "Prompt template library — store, search, version, and share reusable prompts.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/prompt-library-mcp-server",
    install_command: "uvx prompt-library-mcp-server",
    category: "agent-tools",
    tags: ["prompts", "templates", "library", "agents"],
    downloads_weekly: 760,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-coordination-mcp-server",
    description: "Multi-agent messaging and coordination — task routing, pub/sub, agent-to-agent communication.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-coordination-mcp-server",
    install_command: "uvx agent-coordination-mcp-server",
    category: "infrastructure",
    tags: ["coordination", "messaging", "multi-agent", "pub-sub"],
    downloads_weekly: 820,
    tools_count: 6,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-workflow-mcp-server",
    description: "Workflow templates for AI agents — predefined task chains, conditional logic, parallel execution.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-workflow-mcp-server",
    install_command: "uvx agent-workflow-mcp-server",
    category: "agent-tools",
    tags: ["workflow", "templates", "automation", "agents"],
    downloads_weekly: 1211,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-analytics-mcp-server",
    description: "Usage analytics for AI agents — track tool calls, latency, errors, and usage patterns.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-analytics-mcp-server",
    install_command: "uvx agent-analytics-mcp-server",
    category: "agent-tools",
    tags: ["analytics", "metrics", "monitoring", "agents"],
    downloads_weekly: 1141,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "x402-mcp-server",
    description: "Micropayments for AI agents — HTTP 402 payment protocol, pay-per-call, usage billing.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/x402-mcp-server",
    install_command: "uvx x402-mcp-server",
    category: "commerce",
    tags: ["payments", "micropayments", "billing", "x402"],
    downloads_weekly: 1036,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-policy-gateway-mcp",
    description: "Compliance gateway — PII detection, guardrails, audit logging, GDPR/AI Act checks, kill switch.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-policy-gateway-mcp",
    install_command: "uvx agent-policy-gateway-mcp",
    category: "compliance",
    tags: ["compliance", "gdpr", "pii", "guardrails", "audit"],
    downloads_weekly: 55,
    tools_count: 6,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "a2a-protocol-mcp-server",
    description: "Google A2A Protocol bridge — agent-to-agent communication following Google's A2A standard.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/a2a-protocol-mcp-server",
    install_command: "uvx a2a-protocol-mcp-server",
    category: "infrastructure",
    tags: ["a2a", "google", "protocol", "agent-to-agent"],
    downloads_weekly: 50,
    tools_count: 6,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "hive-mind-mcp-server",
    description: "Collective decision-making for AI swarms — voting, consensus, distributed problem solving.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/hive-mind-mcp-server",
    install_command: "uvx hive-mind-mcp-server",
    category: "agent-tools",
    tags: ["swarm", "collective", "voting", "consensus"],
    downloads_weekly: 680,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "mcp-appstore-server",
    description: "MCP App Store — discover, search, and install MCP servers. Curated catalog with 49+ servers.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/mcp-appstore-server",
    install_command: "uvx mcp-appstore-server",
    category: "infrastructure",
    tags: ["hub", "appstore", "catalog", "discovery"],
    downloads_weekly: 340,
    tools_count: 6,
    version: "0.2.1",
    language: "python"
  },
  {
    name: "agent-context-optimizer-mcp",
    description: "Context window optimizer — compress, prioritize, and manage context for AI agents.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-context-optimizer-mcp",
    install_command: "uvx agent-context-optimizer-mcp",
    category: "agent-tools",
    tags: ["context", "optimization", "compression", "tokens"],
    downloads_weekly: 35,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "legal-court-mcp-server",
    description: "US court records — search 3M+ opinions, dockets, judges, citations via CourtListener.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/legal-court-mcp-server",
    install_command: "uvx legal-court-mcp-server",
    category: "data",
    tags: ["legal", "courts", "opinions", "law"],
    downloads_weekly: 30,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-interface-standard",
    description: "Schema.org vocabulary for AI agents — structured data standards for agent-accessible businesses.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-interface-standard",
    install_command: "uvx agent-interface-standard",
    category: "infrastructure",
    tags: ["schema", "standards", "structured-data"],
    downloads_weekly: 420,
    tools_count: 4,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-validator-mcp-server",
    description: "Lighthouse for agent accessibility — validate how well businesses expose data to AI agents.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-validator-mcp-server",
    install_command: "uvx agent-validator-mcp-server",
    category: "infrastructure",
    tags: ["validation", "accessibility", "lighthouse"],
    downloads_weekly: 380,
    tools_count: 4,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "business-bridge-mcp-server",
    description: "Business connectors — Shopify, WordPress, Calendly integrations for AI agents.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/business-bridge-mcp-server",
    install_command: "uvx business-bridge-mcp-server",
    category: "commerce",
    tags: ["shopify", "wordpress", "calendly", "business"],
    downloads_weekly: 350,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-commerce-mcp-server",
    description: "Agent purchase protocol — enable AI agents to discover products and complete transactions.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-commerce-mcp-server",
    install_command: "uvx agent-commerce-mcp-server",
    category: "commerce",
    tags: ["commerce", "shopping", "transactions", "agents"],
    downloads_weekly: 310,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agent-identity-mcp-server",
    description: "OAuth for AI agents — identity verification, authentication flows, token management.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agent-identity-mcp-server",
    install_command: "uvx agent-identity-mcp-server",
    category: "infrastructure",
    tags: ["oauth", "identity", "authentication", "agents"],
    downloads_weekly: 290,
    tools_count: 5,
    version: "0.1.0",
    language: "python"
  },
  {
    name: "agentic-product-protocol-mcp",
    description: "Product discovery for AI shopping agents — Klarna-style product search and comparison.",
    author: "AiAgentKarl",
    github_url: "https://github.com/AiAgentKarl/agentic-product-protocol-mcp",
    install_command: "uvx agentic-product-protocol-mcp",
    category: "commerce",
    tags: ["products", "shopping", "klarna", "discovery"],
    downloads_weekly: 45,
    tools_count: 6,
    version: "0.1.0",
    language: "python"
  },

  // ── Populäre Third-Party Server ────────────────────────────
  {
    name: "@modelcontextprotocol/server-filesystem",
    description: "File system access — read, write, search, and manage files and directories.",
    author: "Anthropic",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y @modelcontextprotocol/server-filesystem",
    category: "development",
    tags: ["filesystem", "files", "directories", "io"],
    downloads_weekly: 28500,
    tools_count: 11,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "@modelcontextprotocol/server-github",
    description: "GitHub integration — repos, issues, PRs, commits, code search, and file management.",
    author: "Anthropic",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y @modelcontextprotocol/server-github",
    category: "development",
    tags: ["github", "git", "repos", "issues", "pull-requests"],
    downloads_weekly: 32100,
    tools_count: 18,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "@modelcontextprotocol/server-postgres",
    description: "PostgreSQL database access — query, schema inspection, and data management.",
    author: "Anthropic",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y @modelcontextprotocol/server-postgres",
    category: "database",
    tags: ["postgres", "sql", "database", "query"],
    downloads_weekly: 15200,
    tools_count: 5,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "@modelcontextprotocol/server-sqlite",
    description: "SQLite database access — query, create tables, analyze data in local SQLite files.",
    author: "Anthropic",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y @modelcontextprotocol/server-sqlite",
    category: "database",
    tags: ["sqlite", "sql", "database", "local"],
    downloads_weekly: 12800,
    tools_count: 6,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "@modelcontextprotocol/server-fetch",
    description: "HTTP fetch — retrieve and convert web content to markdown for AI consumption.",
    author: "Anthropic",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y @modelcontextprotocol/server-fetch",
    category: "web",
    tags: ["fetch", "http", "web", "scraping", "markdown"],
    downloads_weekly: 21300,
    tools_count: 2,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "@modelcontextprotocol/server-brave-search",
    description: "Brave Search API — web and local search with privacy-focused results.",
    author: "Anthropic",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y @modelcontextprotocol/server-brave-search",
    category: "search",
    tags: ["search", "brave", "web-search", "privacy"],
    downloads_weekly: 18900,
    tools_count: 2,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "@modelcontextprotocol/server-puppeteer",
    description: "Browser automation — navigate, screenshot, click, fill forms, execute JavaScript.",
    author: "Anthropic",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y @modelcontextprotocol/server-puppeteer",
    category: "web",
    tags: ["browser", "puppeteer", "automation", "scraping"],
    downloads_weekly: 16700,
    tools_count: 8,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "@modelcontextprotocol/server-memory",
    description: "Knowledge graph memory — persistent entity and relation storage for AI agents.",
    author: "Anthropic",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y @modelcontextprotocol/server-memory",
    category: "agent-tools",
    tags: ["memory", "knowledge-graph", "entities", "persistence"],
    downloads_weekly: 19400,
    tools_count: 7,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "@modelcontextprotocol/server-slack",
    description: "Slack integration — read channels, post messages, search, manage conversations.",
    author: "Anthropic",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y @modelcontextprotocol/server-slack",
    category: "development",
    tags: ["slack", "messaging", "chat", "teams"],
    downloads_weekly: 11200,
    tools_count: 8,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "@modelcontextprotocol/server-google-maps",
    description: "Google Maps access — geocoding, directions, places search, distance calculation.",
    author: "Anthropic",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y @modelcontextprotocol/server-google-maps",
    category: "data",
    tags: ["maps", "geocoding", "directions", "places"],
    downloads_weekly: 9800,
    tools_count: 5,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "@modelcontextprotocol/server-sequential-thinking",
    description: "Chain-of-thought reasoning — structured step-by-step problem solving for complex tasks.",
    author: "Anthropic",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y @modelcontextprotocol/server-sequential-thinking",
    category: "agent-tools",
    tags: ["reasoning", "thinking", "chain-of-thought", "problem-solving"],
    downloads_weekly: 14300,
    tools_count: 1,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "mcp-server-docker",
    description: "Docker container management — list, start, stop, logs, exec in containers.",
    author: "community",
    github_url: "https://github.com/ckreiling/mcp-server-docker",
    install_command: "npx -y mcp-server-docker",
    category: "development",
    tags: ["docker", "containers", "devops"],
    downloads_weekly: 8200,
    tools_count: 8,
    version: "0.3.0",
    language: "javascript"
  },
  {
    name: "mcp-server-git",
    description: "Git repository operations — clone, commit, diff, log, branch, and merge.",
    author: "community",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "uvx mcp-server-git",
    category: "development",
    tags: ["git", "version-control", "repos"],
    downloads_weekly: 13500,
    tools_count: 12,
    version: "0.6.0",
    language: "python"
  },
  {
    name: "mcp-server-time",
    description: "Time and timezone utilities — current time, conversions, daylight saving info.",
    author: "community",
    github_url: "https://github.com/modelcontextprotocol/servers",
    install_command: "npx -y mcp-server-time",
    category: "data",
    tags: ["time", "timezone", "date", "utility"],
    downloads_weekly: 7600,
    tools_count: 3,
    version: "0.6.0",
    language: "javascript"
  },
  {
    name: "mcp-server-youtube-transcript",
    description: "YouTube transcript extraction — get subtitles and captions from YouTube videos.",
    author: "community",
    github_url: "https://github.com/kimtaeyoon83/mcp-server-youtube-transcript",
    install_command: "npx -y mcp-server-youtube-transcript",
    category: "web",
    tags: ["youtube", "transcripts", "video", "captions"],
    downloads_weekly: 6900,
    tools_count: 1,
    version: "0.2.0",
    language: "javascript"
  },
  {
    name: "mcp-server-notion",
    description: "Notion workspace access — search pages, read content, manage databases and blocks.",
    author: "community",
    github_url: "https://github.com/makenotion/notion-mcp-server",
    install_command: "npx -y @notionhq/notion-mcp-server",
    category: "development",
    tags: ["notion", "workspace", "notes", "databases"],
    downloads_weekly: 10500,
    tools_count: 10,
    version: "0.5.0",
    language: "javascript"
  }
];

// ============================================================
// Kategorien aus dem Katalog ableiten
// ============================================================

const ALL_CATEGORIES = [...new Set(CATALOG.map(s => s.category))].sort();

// ============================================================
// Hilfsfunktionen
// ============================================================

/** Pfad zum lokalen Speicher für Community-Submissions */
function getStoragePath() {
  const dir = join(homedir(), ".mcp-hub");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
}

/** Community-Server laden */
function loadCommunityServers() {
  const filePath = join(getStoragePath(), "community-servers.json");
  if (!existsSync(filePath)) return [];
  try {
    return JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
}

/** Community-Server speichern */
function saveCommunityServers(servers) {
  const filePath = join(getStoragePath(), "community-servers.json");
  writeFileSync(filePath, JSON.stringify(servers, null, 2), "utf-8");
}

/** Alle Server (Katalog + Community) */
function getAllServers() {
  return [...CATALOG, ...loadCommunityServers()];
}

/** Installations-Config für verschiedene Clients generieren */
function generateInstallConfig(server, client) {
  const name = server.name;
  const cmd = server.install_command;
  const parts = cmd.split(" ");

  if (client === "claude-code" || client === "claude") {
    return {
      client: "Claude Code",
      command: `claude mcp add ${name} -- ${cmd}`,
      note: "Run this command in your terminal to add the server to Claude Code."
    };
  }

  if (client === "cursor") {
    // Cursor nutzt .cursor/mcp.json
    const config = {
      mcpServers: {
        [name]: {
          command: parts[0],
          args: parts.slice(1)
        }
      }
    };
    return {
      client: "Cursor",
      config_file: ".cursor/mcp.json",
      config,
      note: "Add this to your .cursor/mcp.json file."
    };
  }

  if (client === "windsurf") {
    const config = {
      mcpServers: {
        [name]: {
          command: parts[0],
          args: parts.slice(1)
        }
      }
    };
    return {
      client: "Windsurf",
      config_file: "~/.codeium/windsurf/mcp_config.json",
      config,
      note: "Add this to your Windsurf MCP config."
    };
  }

  // Standard: Claude Desktop / JSON-Format
  const config = {
    mcpServers: {
      [name]: {
        command: parts[0],
        args: parts.slice(1)
      }
    }
  };
  return {
    client: client || "Claude Desktop",
    config_file: "claude_desktop_config.json",
    config,
    note: "Add this to your Claude Desktop configuration file."
  };
}

// ============================================================
// MCP Server erstellen
// ============================================================

const server = new McpServer({
  name: "mcp-hub-server",
  version: "0.1.0"
});

// ── Tool: search_servers ─────────────────────────────────────

server.tool(
  "search_servers",
  "Search MCP servers by keyword, name, tag, or category. Returns matching servers with metadata.",
  {
    query: z.string().describe("Search query — keyword, server name, tag, or category")
  },
  async ({ query }) => {
    const q = query.toLowerCase();
    const all = getAllServers();

    const results = all.filter(s => {
      const searchable = [
        s.name,
        s.description,
        s.category,
        s.author,
        ...(s.tags || [])
      ].join(" ").toLowerCase();
      return searchable.includes(q);
    });

    if (results.length === 0) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ query, results: [], count: 0, message: "No servers found. Try a different keyword." }, null, 2)
        }]
      };
    }

    // Nach Downloads sortieren (beliebteste zuerst)
    results.sort((a, b) => (b.downloads_weekly || 0) - (a.downloads_weekly || 0));

    const summary = results.map(s => ({
      name: s.name,
      description: s.description,
      category: s.category,
      author: s.author,
      downloads_weekly: s.downloads_weekly || 0,
      tools_count: s.tools_count || 0,
      install_command: s.install_command
    }));

    return {
      content: [{
        type: "text",
        text: JSON.stringify({ query, count: results.length, results: summary }, null, 2)
      }]
    };
  }
);

// ── Tool: get_server_details ────────────────────────────────

server.tool(
  "get_server_details",
  "Get full details of a specific MCP server by name.",
  {
    name: z.string().describe("Server name (e.g. 'solana-mcp-server' or '@modelcontextprotocol/server-github')")
  },
  async ({ name }) => {
    const all = getAllServers();
    const server_entry = all.find(s => s.name.toLowerCase() === name.toLowerCase());

    if (!server_entry) {
      // Partial-Match versuchen
      const partial = all.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
      if (partial.length > 0) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              error: `Server '${name}' not found. Did you mean one of these?`,
              suggestions: partial.map(s => s.name)
            }, null, 2)
          }]
        };
      }
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ error: `Server '${name}' not found in catalog.` }, null, 2)
        }]
      };
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(server_entry, null, 2)
      }]
    };
  }
);

// ── Tool: list_categories ───────────────────────────────────

server.tool(
  "list_categories",
  "List all available server categories with server counts.",
  {},
  async () => {
    const all = getAllServers();
    const counts = {};
    for (const s of all) {
      counts[s.category] = (counts[s.category] || 0) + 1;
    }

    const categories = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => ({ category, server_count: count }));

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          total_categories: categories.length,
          total_servers: all.length,
          categories
        }, null, 2)
      }]
    };
  }
);

// ── Tool: list_popular ──────────────────────────────────────

server.tool(
  "list_popular",
  "List the most popular MCP servers by weekly downloads.",
  {
    limit: z.number().min(1).max(50).default(10).describe("Number of servers to return (default: 10)")
  },
  async ({ limit }) => {
    const all = getAllServers();
    const sorted = [...all].sort((a, b) => (b.downloads_weekly || 0) - (a.downloads_weekly || 0));
    const top = sorted.slice(0, limit);

    const results = top.map((s, i) => ({
      rank: i + 1,
      name: s.name,
      description: s.description,
      category: s.category,
      author: s.author,
      downloads_weekly: s.downloads_weekly || 0,
      tools_count: s.tools_count || 0
    }));

    return {
      content: [{
        type: "text",
        text: JSON.stringify({ total_in_catalog: all.length, showing: results.length, servers: results }, null, 2)
      }]
    };
  }
);

// ── Tool: get_install_config ────────────────────────────────

server.tool(
  "get_install_config",
  "Get installation configuration for a server, formatted for a specific AI client (Claude Code, Cursor, Windsurf, Claude Desktop).",
  {
    name: z.string().describe("Server name"),
    client: z.string().default("claude-desktop").describe("Target client: 'claude-code', 'cursor', 'windsurf', or 'claude-desktop'")
  },
  async ({ name, client }) => {
    const all = getAllServers();
    const server_entry = all.find(s => s.name.toLowerCase() === name.toLowerCase());

    if (!server_entry) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ error: `Server '${name}' not found.` }, null, 2)
        }]
      };
    }

    const config = generateInstallConfig(server_entry, client.toLowerCase());

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          server: server_entry.name,
          ...config
        }, null, 2)
      }]
    };
  }
);

// ── Tool: submit_server ─────────────────────────────────────

server.tool(
  "submit_server",
  "Submit a new MCP server to the community catalog. Stored locally in ~/.mcp-hub/.",
  {
    name: z.string().describe("Server package name"),
    description: z.string().describe("Short description of what the server does"),
    github_url: z.string().describe("GitHub repository URL"),
    install_command: z.string().describe("Install command (e.g. 'npx -y my-server' or 'uvx my-server')"),
    category: z.string().describe("Category (e.g. 'data', 'development', 'agent-tools')"),
    tags: z.array(z.string()).default([]).describe("Tags for search (e.g. ['api', 'weather'])")
  },
  async ({ name, description, github_url, install_command, category, tags }) => {
    const all = getAllServers();

    // Prüfen ob Server schon existiert
    if (all.find(s => s.name.toLowerCase() === name.toLowerCase())) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ error: `Server '${name}' already exists in the catalog.` }, null, 2)
        }]
      };
    }

    const newServer = {
      name,
      description,
      author: "community",
      github_url,
      install_command,
      category,
      tags,
      downloads_weekly: 0,
      tools_count: 0,
      version: "0.1.0",
      language: install_command.startsWith("npx") ? "javascript" : "python",
      submitted_at: new Date().toISOString()
    };

    const community = loadCommunityServers();
    community.push(newServer);
    saveCommunityServers(community);

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          success: true,
          message: `Server '${name}' added to community catalog.`,
          server: newServer,
          storage: join(getStoragePath(), "community-servers.json")
        }, null, 2)
      }]
    };
  }
);

// ============================================================
// Server starten
// ============================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server-Fehler:", error);
  process.exit(1);
});
