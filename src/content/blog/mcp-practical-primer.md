---
title: 'Model Context Protocol (MCP): A Practical Primer'
description: 'What MCP is, why it exists, and how clients and servers fit into an agent stack.'
pubDate: 'Jun 24 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
category: 'karya'
featured: true
tags:
  - mcp
  - protocol
---

Model Context Protocol (MCP) is an open standard for connecting AI applications to external tools and data. Think of it as a USB port for agents: clients (IDEs, chat apps, managed agent runtimes) talk to servers that expose resources, prompts, and tools in a consistent shape.

Anthropic introduced MCP in late 2024. Through 2025 and into 2026 it became the default vocabulary for “give this model access to my systems” across editors, gateways, and cloud agent platforms.

## The three roles

- **Host / client:** the app that owns the model session (Cursor, Claude Desktop, a custom agent service, Gemini Managed Agents, and others).
- **MCP server:** a process or remote endpoint that exposes capabilities—filesystem, GitHub, Slack, a database, your internal API.
- **Transport:** how they talk (stdio for local servers, HTTP/SSE or streamable HTTP for remote ones).

You usually do not rewrite your product for each AI vendor. You ship an MCP server once and let many clients attach.

## What servers expose

Servers can offer:

- **Tools** — functions the model may call (with schemas).
- **Resources** — readable context (files, tickets, schemas) the client can fetch.
- **Prompts** — reusable prompt templates for common workflows.

Most “agent plugins” people care about map to tools. Resources shine for grounding: give the model a live schema or policy doc without stuffing everything into the system prompt.

## Why teams adopted it

Before MCP, every IDE and chat product invented its own plugin format. That meant N clients × M integrations. MCP collapses the matrix: write the server against the protocol, then list it in client config.

In 2026 the interesting work is no longer “does MCP exist?” but **how to secure remote MCP**, design tools for LLM reliability, and govern enterprise traffic through gateways.

## A minimal mental model

```text
User goal
   → Agent (client + model)
       → MCP tool call
           → Your server / API
       ← Structured result
   → Next step or final answer
```

If you already have a stable HTTP API, do not blindly wrap every endpoint. Design tools for how models choose and fill arguments—covered in the companion essay on MCP tool design.

## Practical starter checklist

1. Pick one high-value workflow (search docs, create ticket, query metrics).
2. Expose 3–7 crisp tools, not fifty.
3. Add auth and allowlists before opening remote access.
4. Log every tool call with actor, args, latency, and outcome.
5. Test with more than one client—protocol quirks still appear at the edges.

MCP is plumbing. The product quality still depends on tool design, evaluation, and the agent loop that sits above it.
