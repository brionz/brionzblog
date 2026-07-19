---
title: 'Agent Monitoring Dashboards: What Metrics Actually Matter'
description: 'Success rate, tool error rate, latency distributions—how to build dashboards that tell you when your agent is degrading.'
pubDate: 'Aug 06 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
category: 'karya'
featured: false
tags:
  - monitoring
  - dashboards
  - metrics
---

A dashboard that shows every metric shows nothing useful. Agent monitoring requires focus: a small set of carefully chosen metrics that distinguish between "everything is fine" and "something is wrong."

## The essential metrics

### Task completion rate

The percentage of agent runs that achieve their stated goal. This is your north star metric. Everything else explains why this number changed.

Track by: agent version, task type, model, time of day.

### Tool error rate

The percentage of tool calls that return an error. A rising tool error rate often precedes a drop in task completion rate. It is a leading indicator.

Track by: tool name, error type, agent version.

### Human intervention rate

The percentage of tasks where a human had to step in. Rising intervention rate suggests the agent is encountering situations it cannot handle.

Track by: task type, complexity, time since last deployment.

### Cost per task

Total cost (model + tool execution) divided by completed tasks. A sudden increase may indicate the agent is taking more turns or using more expensive models.

### Latency distributions

p50, p95, and p99 latency per turn and per task. Watch for p95 creep, which often indicates context bloat or tool degradation.

### Silent wrong rate

The hardest metric to measure and the most important. Estimate through:

- User feedback (thumbs up/down)
- Random sampling with human review
- Verifier agent disagreement rate

## Dashboard layout

```text
Row 1: Health
  Task completion rate (24h trend)
  Active agent runs (current)
  Error rate (24h trend)

Row 2: Performance
  p50/p95/p99 latency per turn
  Cost per task (7d trend)
  Avg turns per task

Row 3: Tools
  Tool call volume (top 10)
  Tool error rate by tool
  Tool latency p95

Row 4: Safety
  Human intervention rate
  Policy violation count
  Silent wrong estimate
```

## Alert thresholds

Alert on:

- Task completion rate drops below 90% of baseline
- Tool error rate exceeds 5% for any critical tool
- Cost per task exceeds 2× baseline
- Any safety policy violation
- Human intervention rate doubles

## The principle

A good dashboard answers three questions in under 10 seconds:

1. Is the agent working?
2. If not, what is failing?
3. Who needs to investigate?

If your dashboard cannot answer these, simplify until it can.