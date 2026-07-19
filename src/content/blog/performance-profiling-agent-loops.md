---
title: 'Performance Profiling: Where Agents Actually Spend Time'
description: 'Profiling LLM calls, tool execution, network latency—how to identify and fix bottlenecks in agent loops.'
pubDate: 'Aug 03 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 'karya'
featured: false
tags:
  - performance
  - profiling
  - optimization
---

Your agent feels slow. The question is *which part* is slow. Without profiling, you guess. With profiling, you measure—and the answer is often not what you expected.

## The four contributors to latency

### 1. LLM inference (40–70% of total time)

The model call dominates. Time-to-first-token, total generation time, and reasoning mode overhead all add up. Profiling reveals whether you are waiting on the model or on something else.

### 2. Tool execution (15–35% of total time)

API calls, database queries, filesystem operations—each tool call adds latency. Some tools are slow intrinsically (external API); some are slow because of bad design (N+1 queries, missing indexes).

### 3. Context composition (5–15% of total time)

Retrieving documents, building the prompt, serializing state. This happens between turns and is often overlooked.

### 4. Overhead (5–10% of total time)

Serialization, transport, logging, observability instrumentation. These add up across many turns.

## How to profile

### Instrument each phase

Add timing spans around:

- LLM call start → first token → completion
- Context assembly start → end
- Each tool call start → end
- Turn start → end

Store these in your observability backend. Query by percentile (p50, p95, p99) to understand typical and worst-case performance.

### Profile end-to-end, not just one turn

A 5-turn task that takes 30 seconds is a different problem than a 20-turn task that takes 30 seconds. The first is slow per turn; the second has too many turns.

### Profile in production conditions

Local profiling with mocked tools tells you about model latency. Production profiling tells you about real-world tool latency, network conditions, and contention.

## Common bottlenecks

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| High p50 per turn, no variation | Model inference | Switch to faster model or reduce context |
| High p95, occasional spikes | Tool timeout or rate limit | Add timeout, retry with backoff |
| Latency grows with turn count | Context bloat | Compress trajectory, use summary |
| Tool calls that take seconds | External API | Cache results, batch requests |
| Slow first turn, fast rest | Context caching cold | Warm cache proactively |

## Optimization targets

Focus on the biggest contributor first. A 50% improvement in model latency (if that is 60% of total) yields 30% end-to-end improvement. A 50% improvement in overhead (if that is 5% of total) yields 2.5%.

## The principle

Measure before you optimize. The bottleneck you suspect is often not the real one. Profile in production, at scale, and let the data tell you where to invest.