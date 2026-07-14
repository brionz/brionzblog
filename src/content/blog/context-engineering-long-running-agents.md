---
title: 'Context Engineering for Long-Running Agents'
description: 'How to feed, trim, and structure context so multi-step agents stay coherent without drowning in tokens.'
pubDate: 'Jul 07 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 'karya'
featured: false
tags:
  - context
  - agents
---

Prompt engineering was about a clever system message. **Context engineering** is about everything the model sees across a long agent run: tools schemas, retrieved docs, scratchpads, compact histories, and environment state.

Long-running agents fail when context becomes a junk drawer.

## The budget is the product

Every token competes with every other token. A 200k window does not mean you should fill it. Attention is uneven; critical instructions drown in logs. Treat context like memory-constrained systems programming.

Allocate deliberately:

- **Stable instructions** — goals, policies, output contracts
- **Tool contracts** — only tools relevant to the current phase
- **Working memory** — current plan, open questions, artifacts
- **Evidence** — retrieved snippets with sources
- **Recent trajectory** — last N tool results, compressed older ones

## Techniques that hold up

### Summarize the past, keep the artifacts

Replace early tool transcripts with a structured summary: decisions made, files touched, blockers. Keep canonical artifacts (final diff, ticket ID) verbatim.

### Retrieve instead of stuffing

Do not paste the whole wiki. Retrieve on demand via MCP or search tools. Teach the agent when to fetch more.

### Phase your tools

Planning phase gets research tools. Execution phase gets write tools. Teardown phase gets reporting tools. Smaller menus, fewer misclicks.

### Make state explicit

Maintain a machine-readable scratch object (`goal`, `constraints`, `done`, `next`) and refresh it each cycle. Models follow structured state better than vibes.

## Failure signatures

- Repeating the same search with tiny query tweaks
- Forgetting constraints stated 40 turns ago
- “Fixing” bugs already fixed because the summary omitted them
- Blowing the budget on verbose chain-of-thought that never becomes action

## A simple operating rule

If a human onboarding to the task could not understand the agent’s next step from the current context pack alone, the context pack is wrong. Fix packing before you swap models.

Context engineering is how agent loops scale from five steps to five hundred without losing the plot.
