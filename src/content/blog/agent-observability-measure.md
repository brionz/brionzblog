---
title: 'Agent Observability: What You Can’t Measure, You Can’t Improve'
description: 'Trace logging, spans, and metrics for agent loops—how to see what your agent actually did and why it went wrong.'
pubDate: 'Jul 20 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
category: 'karya'
featured: false
tags:
  - observability
  - monitoring
  - agents
---

An agent that succeeds is a black box you trust. An agent that fails is a black box you cannot debug. Observability is how you turn that box into glass—before the incident postmortem forces you to.

Most agent teams start with prompt engineering and tool design. They add observability after the first production surprise. That order is backwards.

## What observability means for agents

Traditional software observability tracks requests, errors, and latency. Agent observability tracks **decisions**: why did the model choose that tool, with those arguments, at that point in the trajectory?

The three pillars shift slightly:

- **Logs** — every tool call, model response, and state transition
- **Metrics** — success rate, tool error rate, steps per task, cost per task
- **Traces** — the full agent trajectory as a distributed span tree

Traces are the most important and the most neglected.

## The minimal trace

Every agent turn should produce a span with:

- Turn number and total budget
- Model used and token counts
- Tool name, arguments (redacted), and result summary
- Latency breakdown: model time vs tool execution time
- Decision: why this tool was chosen (if the model provides reasoning)

Connect turns into a trace with a shared trace ID. Store the raw trajectory for replay.

## What to instrument

### Tool calls

Log the full request and response. Redact secrets in transit and at rest. Record HTTP status, error codes, and retry attempts.

### Context composition

Log what was in the context window at each turn: system prompt version, retrieved documents, recent trajectory summary. Context drift is a leading cause of agent degradation.

### State changes

If the agent maintains a scratchpad or plan object, log diffs. Knowing when the plan changed is often more useful than knowing the final plan.

### Cost and latency

Track tokens per turn, cumulative cost, and wall-clock time. Alert when a task exceeds 2× the expected cost or time.

## Tools that work in 2026

- **OpenTelemetry** with custom agent spans — portable across backends
- **LangSmith / LangFuse** — purpose-built for LLM traces
- **Phoenix (Arize)** — open-source, good for self-hosted
- **Custom dashboard** on your metrics store — for team-specific SLAs

Pick one that supports trajectory replay. Raw logs without replay are archaeology, not debugging.

## A practical starting point

```text
Every agent run:
  trace_id: uuid
  spans: [
    { turn: 1, model: "claude-4", tool: "search_docs", tokens: 450, latency_ms: 3200, result: "ok" },
    { turn: 2, model: "claude-4", tool: "create_issue", tokens: 280, latency_ms: 1500, result: "ok" },
    ...
  ]
  outcome: "success" | "failure" | "escalated"
  total_cost: 0.042
  total_steps: 5
```

Store in your observability backend. Query by trace_id, user_id, or date range. Build a dashboard for weekly trends.

## The metric that matters most

**Silent wrong rate**: tasks that completed successfully from the agent's perspective but produced incorrect or harmful results. This is the hardest metric to measure and the most important. Use verifier agents, user feedback buttons, and random sampling.

If you cannot measure silent wrongs, you are flying blind no matter how pretty your dashboard is.

## Closing thought

Observability is not a phase. It is the scaffolding that lets you iterate without fear. Add it before your agent touches production—and definitely before your first "why did it do that?" at 2 a.m.