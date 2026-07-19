---
title: 'Building Resilient Agents: Retry, Circuit Breaker, Fallback'
description: 'Error handling patterns for agent loops—how to recover from failures without infinite retries or silent corruption.'
pubDate: 'Jul 24 2026'
heroImage: '../../assets/blog-placeholder-5.jpg'
category: 'karya'
featured: false
tags:
  - resilience
  - error-handling
  - agents
---

Agents fail differently than traditional software. A database query either succeeds or throws. An agent can succeed at the tool level but fail at the goal level—wrong data, wrong interpretation, wrong next step.

Resilience for agents means handling both kinds of failure.

## The failure spectrum

| Type | Example | Detection |
|------|---------|-----------|
| Tool error | API returns 500 | Status code |
| Tool misuse | Agent calls wrong tool with wrong args | Schema validation |
| Context drift | Agent forgets the goal mid-task | Goal check |
| Silent wrong | Agent produces plausible but incorrect result | Verifier agent |
| Loop | Agent repeats the same failing call | Turn budget |
| Degradation | Model quality drops after provider update | Eval suite |

Each type needs a different response.

## Retry with backoff

Tool errors are the easiest to handle. Transient failures (network blips, rate limits, timeouts) should trigger retry with exponential backoff.

```text
Attempt 1: wait 1s
Attempt 2: wait 2s
Attempt 3: wait 4s
Attempt 4: wait 8s → escalate or fail
```

Important: tell the agent about the retry. "The search API returned a 503. Retrying in 2 seconds." This prevents the agent from making decisions based on stale context.

## Circuit breaker for degraded tools

If a tool fails repeatedly, stop calling it. Open the circuit after N consecutive failures, wait for a cooldown period, then try once. If that fails, keep the circuit open.

The agent needs to know which tools are available. A circuit breaker should remove the tool from the agent's tool list, not just block the call silently.

## Fallback strategies

When the primary approach fails, the agent should have a fallback:

- **Tool fallback** — if search_docs fails, try search_web
- **Model fallback** — if frontier model times out, retry with a faster model
- **Strategy fallback** — if direct approach fails, try a different decomposition
- **Human fallback** — if all else fails, escalate

Fallbacks should be declared upfront, not invented mid-task.

## Detecting silent wrongs

The hardest failures to catch are the ones that look like success. Mitigations:

- **Verifier agent** — a second model checks the first model's work
- **Constraint validation** — check output against declared constraints
- **Idempotency checks** — running the same task twice should produce consistent results
- **Human sampling** — randomly review N% of completed tasks

## The infinite loop problem

Agents left to their own devices will sometimes loop: same tool, same arguments, same error, forever. Defenses:

- **Turn budget** — hard limit on steps per task
- **Repeat detection** — if the last 3 tool calls are identical, stop and escalate
- **Diminishing returns** — if progress hasn't increased in N turns, stop
- **Cost budget** — hard limit on total spend

## A resilience checklist

1. What happens when every tool call fails?
2. What happens when the model returns garbage JSON?
3. What happens when the task takes 10× longer than expected?
4. What happens when the agent contradicts itself?
5. What happens when the user disagrees with the agent's conclusion?

If you can answer all five, your agent is resilient enough for production.