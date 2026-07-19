---
title: 'Cost Optimization Patterns for Agent Systems'
description: 'Token budgets per task, caching strategies, model routing—how to reduce agent costs without sacrificing quality.'
pubDate: 'Jul 21 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
category: 'karya'
featured: false
tags:
  - cost
  - optimization
  - llm
---

Agent costs surprise teams the same way cloud bills do: gradually, then suddenly. A demo that costs pennies can become a production line item that draws CFO attention.

The fix is not a cheaper model. The fix is architecture that spends tokens deliberately.

## Why agents cost more than chatbots

A chatbot answers one question. An agent may call a model 5–20 times per task, each call carrying system prompts, tool schemas, retrieved context, and trajectory history. The multiplier is real:

- System prompt + tool schemas: 2k–8k tokens per turn
- Retrieved context: 1k–10k tokens per turn
- Trajectory history: grows with each turn
- Reasoning tokens: extended thinking modes multiply cost 2–5×

A single agent task can easily consume 50k–200k tokens. At frontier model prices, that adds up fast.

## Pattern 1: Route before you reason

Not every step needs a frontier model. Classify the task first with a cheap model, then route to the appropriate worker:

- **Router** — small/cheap model (classify intent, extract entities)
- **Worker** — mid-tier model (tool selection, drafting)
- **Escalation** — frontier model (hard reasoning, conflict resolution)

A router that costs $0.0001 per call can save $0.01–0.05 per task by avoiding unnecessary frontier usage.

## Pattern 2: Cache aggressively

### Response caching

Identical tool calls with identical context produce identical results. Cache them. Common candidates:

- Documentation lookups
- Schema introspection
- Policy checks
- Repeated search queries

### Context caching

Some providers offer context caching: pay once for the static portion of the prompt, reuse across turns. This cuts the per-turn cost of long system prompts and tool schemas by 50–90%.

### Semantic caching

Similar questions can reuse previous answers. Use embedding similarity to detect near-duplicate queries. Works well for FAQ-style agent tasks.

## Pattern 3: Budget per task, not per token

Set hard limits before the agent runs:

- Max turns (e.g., 10)
- Max cost (e.g., $0.10)
- Max time (e.g., 30 seconds)

When the budget is exhausted, the agent must stop and report partial progress. This prevents runaway loops and cost surprises.

## Pattern 4: Compress trajectory history

Full trajectory history grows linearly with turns. Compress aggressively:

- Summarize every N turns into a structured update
- Drop tool results after they are summarized
- Keep only decisions, not full transcripts

A 20-turn task can be compressed from 15k tokens to 3k without losing essential context.

## Pattern 5: Batch independent operations

If the agent needs to check three data sources, let it call them in parallel rather than sequentially. Some frameworks support parallel tool calls. This reduces wall-clock time and may reduce cost if the model charges per call rather than per session.

## Measuring what matters

Stop optimizing for price-per-token. Optimize for **cost per successful task**:

```text
Metric                    | Before | After
--------------------------|--------|-------
Cost per completed task   | $0.42  | $0.08
Avg turns per task        | 12     | 6
Frontier model usage      | 100%   | 35%
Cache hit rate            | 0%     | 62%
```

Track these weekly. A 5× cost reduction is achievable without changing the model—just by routing, caching, and compressing better.

## The cheapest token is the one you don't send

Every optimization pattern reduces to that principle. Design your agent to think before it spends, and your cost curve will follow.