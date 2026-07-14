---
title: 'Designing MCP Tools That Agents Don’t Misuse'
description: 'Practical tradeoffs for MCP tool schemas, descriptions, and agent-backed tools—so calls succeed on the first try.'
pubDate: 'Jul 01 2026'
heroImage: '../../assets/blog-placeholder-5.jpg'
category: 'karya'
featured: false
tags:
  - mcp
  - tool-design
---

When MCP tools underperform, the protocol is rarely the villain. The usual culprit is tool design: wrapping an existing API as-is and hoping the model invents the missing context.

Large language models are excellent at following clear contracts and weak at reverse-engineering your undocumented REST surface mid-flight.

## Anti-pattern: “export the OpenAPI and pray”

Dumping every endpoint into the tool list creates three failure modes:

1. **Choice overload** — the model picks a near-miss tool.
2. **Argument hallucination** — enums, IDs, and date formats go wrong.
3. **Retry storms** — each failure burns context and patience.

Start from the agent’s job, not your API catalog. Ask: what decisions should the model make, and what should stay inside your service?

## Patterns that work

### 1. Intent-sized tools

Prefer `find_customer_by_email` over `GET /v3/entities`. Narrow tools have fewer parameters and clearer success criteria.

### 2. Descriptions as mini manuals

Tool descriptions are part of the prompt. Include:

- when to use / when not to use
- required identifiers and how to obtain them
- example arguments
- common errors and how to recover

### 3. Structured, teachable errors

Return machine-readable reasons: `unknown_customer_id`, `permission_denied`, `ambiguous_match` with candidates. Vague 400s teach the model nothing.

### 4. Progressive disclosure

Expose a search or list tool that returns IDs, then a detail tool that needs an ID. Do not force the model to invent UUIDs.

### 5. Agentic tools (when accuracy matters)

Sometimes the MCP tool should call an **internal** agent that uses private helpers the client never sees. Externally you expose one natural-language-friendly operation; internally you control the multi-step logic. That trades latency and cost for reliability—worth it for high-stakes domains.

## Tradeoffs to own explicitly

| Approach | Upside | Downside |
|----------|--------|----------|
| Thin API wrap | Fast to ship | High misuse rate |
| Intent tools | Better first-call success | More design work |
| Agentic tool | Strong control | Cost, complexity, harder debugging |

## Evaluation is part of design

Write a golden set of user goals and expected tool sequences. Replay them when you change schemas. MCP’s 2026 roadmap keeps improving transport and enterprise features, but no roadmap fixes a tool named `doStuff` with optional everything.

Design for the model’s next action, not your swagger file’s completeness.
