---
title: 'Gemini Managed Agents: Background Tasks and Remote MCP'
description: 'What Google’s July 2026 Managed Agents update adds—async background runs, remote MCP, custom functions, and credential refresh.'
pubDate: 'Jul 08 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 'karya'
featured: true
tags:
  - gemini
  - mcp
  - news
---

On July 7, 2026, Google announced a meaningful upgrade to **Managed Agents** in the Gemini API: background execution for long-running work, direct connection to remote Model Context Protocol (MCP) servers, custom function calling beside sandbox tools, and network credential refresh without discarding sandbox state.

If you have been waiting for agents that survive longer than a single HTTP request, this is the shape of that product.

## What Managed Agents already were

A managed agent runs from a service endpoint where Gemini handles reasoning plus a secure cloud sandbox—code execution, package installs, files, and web access. The Interactions API (generally available since June 2026) is the recommended interface for new projects. The July update fills gaps that show up the moment you leave the demo and enter production.

## The four additions that matter

### Background execution

Long tasks—repo-wide refactors, multi-file research, overnight data cleanup—do not fit a short-lived connection. With background mode, the interaction can continue asynchronously; you poll or stream progress instead of holding an open socket for hours. Persistence (`store`) is part of that contract so state survives between checks.

### Remote MCP servers

Rather than writing custom proxy middleware to reach private databases or internal APIs, you can attach a remote MCP server as a tool at interaction time. Mix it with built-ins like search or code execution. The agent becomes a generalist sandbox that can also speak your systems’ language.

### Custom functions with step matching

Built-in sandbox tools can run on the server. Custom functions transition the interaction to a `requires_action` style step so *your* client runs local business logic. That split keeps secrets and proprietary workflows on your side while still letting the model orchestrate.

### Credential refresh

Access tokens expire. Refreshing network credentials via the existing environment identity replaces rules without wiping the sandbox’s filesystem, packages, or cloned repos. Warm environments stay warm.

## Why this is a July 2026 story

MCP moved from “nice protocol” to “thing cloud agents speak natively.” When major model providers treat remote MCP as a first-class tool type, integration cost drops and governance pressure rises—enterprises will want gateways, allowlists, and audit. Managed Agents are one client in that ecosystem; they are not the whole ecosystem.

## Practical takeaway

Pin agent versions, confirm live docs for exact request fields, and start with a narrow MCP server rather than wiring your entire private network on day one. Background + MCP is powerful; it is also a new surface for runaway spend and over-scoped credentials.
