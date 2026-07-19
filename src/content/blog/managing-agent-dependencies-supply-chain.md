---
title: 'Managing Agent Dependencies and Supply Chain'
description: 'MCP server vetting, tool version pinning, SBOM for agent stacks—how to keep your agent supply chain secure.'
pubDate: 'Aug 09 2026'
heroImage: '../../assets/blog-placeholder-4.jpg'
category: 'karya'
featured: false
tags:
  - supply-chain
  - dependencies
  - security
---

An agent is only as trustworthy as the tools it calls. If an MCP server is compromised, every agent that uses it is compromised. Supply chain security for agents is not theoretical—it is the difference between a controlled system and a backdoor.

## The agent supply chain

Your agent depends on:

- **Model provider** — API endpoint, model version, inference infrastructure
- **MCP servers** — tool implementations, often third-party
- **Libraries** — SDKs, client libraries, parsing code
- **Host runtime** — the platform that runs the agent loop
- **Infrastructure** — compute, storage, networking

Each dependency is an attack surface.

## Vetting MCP servers

Before connecting an MCP server to your agent:

1. **Review the source** — who wrote it, what does it access, how is it maintained?
2. **Audit the tool list** — does every tool have a legitimate use case?
3. **Check permissions** — does the server request more access than it needs?
4. **Test in isolation** — run the server in a sandbox before connecting to production
5. **Pin the version** — do not float to "latest" without testing

## Tool version pinning

MCP servers evolve. A new version might add a tool you do not want, change argument schemas, or introduce a vulnerability.

Pin server versions in your agent configuration:

```yaml
mcp_servers:
  search_docs:
    url: mcp://search.internal:8080
    version: 1.2.3
    allowed_tools: [search, get_document]
  github:
    url: mcp://github.mcp:9090
    version: 2.0.1
    allowed_tools: [list_issues, get_pr]
```

Test version upgrades in a shadow environment before rolling out.

## SBOM for agents

A Software Bill of Materials (SBOM) for an agent includes:

- Model provider and snapshot version
- All MCP servers with versions
- Runtime libraries and versions
- System prompt version
- Tool schema version

Generate this automatically from your agent configuration. Share it with your security team. Update it when any dependency changes.

## Monitoring for supply chain issues

- Subscribe to security advisories for your model provider and MCP servers
- Monitor for unexpected changes in tool behavior
- Log all tool calls and compare against expected patterns
- Alert on new tools appearing in an MCP server without a configuration change

## The principle

Every dependency is a trust decision. Make those decisions explicitly, document them, and review them regularly. An agent with unvetted dependencies is a system waiting to be exploited.