---
title: 'From Chatbots to Agents: The Tool-Use Loop'
description: 'How tool calling turns a language model into a system that can search, code, and change the world outside the chat window.'
pubDate: 'Jun 18 2026'
heroImage: '../../assets/blog-placeholder-4.jpg'
category: 'karya'
featured: false
tags:
  - tools
  - agentic-ai
---

Chatbots generate tokens. Agents generate **actions**. The bridge between those two is tool use: structured calls the model emits so a host runtime can run real functions and return results.

Understanding that loop is the fastest way to debug why an “agent” feels magical one day and stuck the next.

## Anatomy of a tool call

A typical turn looks like this:

1. The host sends messages (system, user, prior tool results) to the model.
2. The model either replies in natural language **or** requests a tool with a name and JSON arguments.
3. The host validates the call, executes it, and appends a tool result message.
4. The model continues—often with another tool call—until it produces a final answer.

Providers package this as function calling, tools, or “actions.” The names differ; the contract does not. The model never truly “runs code” unless the host lets it. That separation is a feature: you can sandbox, log, rate-limit, and refuse dangerous calls.

## Why loops fail

Most agent failures are loop failures, not intelligence failures:

- **Overloaded tools.** One mega-API with 40 parameters invites bad guesses.
- **Opaque errors.** Returning `500 Internal Error` without a recoverable hint wastes the next turn.
- **No stop conditions.** Agents retry the same broken call until the token budget dies.
- **Missing observation.** Skipping tool results or truncating them too aggressively creates confident nonsense.

Good hosts treat each tool result as a first-class message: short, structured, and actionable.

## Design tips that still hold in 2026

- Prefer **small, intent-named tools** (`search_docs`, `create_issue`) over raw REST dumps.
- Return **examples of success** in tool descriptions; models pattern-match hard.
- Cap recursion: max steps, max dollars, max writes.
- Require confirmation for irreversible side effects until trust is earned.

## Chat UX vs agent UX

Users still talk in chat, but agent products need more than a message list. Show the plan, the tool trail, and the artifact (diff, ticket, report). Transparency is not just ethics—it is how operators learn when to intervene.

Once the loop is solid, the next leap is standardized tool sockets such as MCP, so the same agent can plug into many systems without rewriting every integration.
