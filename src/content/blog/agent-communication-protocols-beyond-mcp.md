---
title: 'Agent Communication Protocols: Beyond MCP'
description: 'A2A protocol, agent-to-agent messaging, and when to build custom protocols vs use existing standards.'
pubDate: 'Aug 04 2026'
heroImage: '../../assets/blog-placeholder-4.jpg'
category: 'karya'
featured: false
tags:
  - protocols
  - interoperability
  - agents
---

MCP standardizes how agents talk to tools. It does not standardize how agents talk to each other. For that, a different set of protocols is emerging—and the landscape is still fragmented.

## MCP is not enough

MCP solves the client-to-server problem: one agent, many tools. But multi-agent systems need agent-to-agent communication: passing context, delegating subtasks, negotiating resources.

The requirements are different:

- **MCP** — tool discovery, schema negotiation, structured I/O
- **A2A** — task delegation, progress reporting, result handoff

## The emerging A2A landscape

Several approaches are competing to become the standard for agent-to-agent communication:

### Google's Agent-to-Agent (A2A) protocol

A2A defines how agents discover each other's capabilities, send tasks, and receive results. It is designed for enterprise scenarios where agents from different vendors need to cooperate.

Key concepts:

- **Agent card** — JSON descriptor of capabilities, tools, and auth requirements
- **Task** — a unit of work with a schema for input and output
- **Streaming** — real-time progress updates for long-running tasks
- **Push/pull** — both polling and webhook delivery

### Custom handoffs

Many teams build their own handoff protocols: structured JSON payloads passed between agents via a shared message queue. Simpler than a full protocol, but creates coupling between agents.

### Shared state

Instead of messaging, agents read and write to a shared state store. One agent writes a decision; another reads it. This works when agents are loosely coupled and the state schema is stable.

## When to use each

| Pattern | Good for | Bad for |
|---------|----------|---------|
| A2A protocol | Cross-vendor, heterogeneous agents | Simple 2-agent systems |
| Custom handoff | In-team, known agents | Scaling beyond the team |
| Shared state | Loosely coupled worker pools | Tightly coupled workflows |

## A pragmatic approach

Start with a simple handoff: one agent writes a structured result, another picks it up. Add a shared schema for task descriptions and results. Scale to a formal protocol only when you have agents from different teams or vendors that need to interoperate.

Protocols are enablers, not features. Choose the simplest one that meets your interoperability needs and upgrade only when the simplicity becomes a constraint.