---
title: 'Debugging Agent Failures: From Traces to Root Cause'
description: 'Replaying agent trajectories, instrumentation best practices, and common failure patterns—how to find out why your agent went wrong.'
pubDate: 'Aug 07 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
category: 'karya'
featured: false
tags:
  - debugging
  - troubleshooting
  - agents
---

An agent that fails silently is worse than an agent that crashes. A crash produces an error. A silent failure produces a plausible wrong answer that someone might act on.

Debugging agents requires reconstructing what the model saw, what it decided, and why.

## The debugging workflow

### 1. Replay the trajectory

Load the full trace: every turn, every tool call, every model response. Walk through it turn by turn. The failure is often not where it first appears.

### 2. Check the context

What was in the context window at the critical turn? Was the goal still present? Were the tool schemas correct? Had the trajectory summary dropped something important?

### 3. Check the tool results

Did the tool return what the agent expected? Was the result truncated? Did it contain misleading data? Many agent failures are actually tool failures that the agent handled poorly.

### 4. Check the model's reasoning

If the model provides reasoning traces, read them. Did the model misinterpret the goal? Did it choose the wrong tool for a plausible reason? Reasoning traces often reveal the exact point of failure.

### 5. Reproduce with modifications

Change one variable at a time: different model, different prompt, different tool schema. Does the failure reproduce? If not, you have found the cause.

## Common failure patterns

| Pattern | Signature | Fix |
|---------|-----------|-----|
| Goal drift | Agent starts well, then veers off | Add goal reminder every N turns |
| Tool confusion | Agent calls wrong tool repeatedly | Narrow tool descriptions, reduce tool count |
| Context overflow | Agent forgets early decisions | Compress trajectory, checkpoint decisions |
| Retry storm | Agent retries same failing call | Add repeat detection, circuit breaker |
| Silent truncation | Tool result cut off, agent fills in | Add truncation warnings, increase limits |
| Schema mismatch | Agent invents argument values | Improve tool descriptions, add examples |

## Instrumentation for debugging

Good debugging starts with good instrumentation. Every trace should include:

- Turn number and total budget
- Full context composition (which docs, which tools)
- Model response (raw, before parsing)
- Tool call (name, arguments, result)
- Latency breakdown per phase
- Agent version and model snapshot

Without this, debugging is guessing.

## The principle

Debugging is reconstruction. The better your traces, the faster you can reconstruct what happened. Invest in instrumentation before you need it—because when you need it, you will need it urgently.