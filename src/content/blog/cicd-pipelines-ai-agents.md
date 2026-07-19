---
title: 'CI/CD Pipelines for AI Agents'
description: 'Automated testing, eval gates, and deployment strategies—how to ship agent updates with confidence.'
pubDate: 'Aug 05 2026'
heroImage: '../../assets/blog-placeholder-5.jpg'
category: 'karya'
featured: false
tags:
  - cicd
  - deployment
  - devops
---

CI/CD for agents is harder than CI/CD for traditional software. A bad code change breaks a build. A bad prompt change breaks a thousand conversations. The pipeline must catch both kinds of failure.

## What makes agent CI/CD different

Traditional CI/CD tests deterministic code: fixed input produces fixed output. Agent CI/CD tests probabilistic code: same input can produce different output across runs. The pipeline must assert on distributions, not exact values.

## The agent pipeline stages

### 1. Lint and schema validation

Check prompt formatting, tool schema validity, and configuration consistency. Fast and cheap. Catch typos and structural errors before running expensive tests.

### 2. Unit tests (tool level)

Test each tool in isolation. Schema validation, auth flows, error handling. These run in milliseconds and catch the most common failures.

### 3. Scenario suite

Run 50–200 hand-authored tasks against the new agent version. Score completion rate, tool accuracy, and safety compliance. Compare against the previous version.

**Eval gate**: deploy only if scenario suite scores are within 5% of the previous version.

### 4. Shadow deployment

Deploy the new version alongside production. Compare outcomes without serving them to users. Measure:

- Task completion rate difference
- Tool error rate difference
- Cost per task difference
- Safety policy violation count

**Eval gate**: deploy only if shadow metrics are neutral or improved.

### 5. Canary deployment

Route 5–10% of real traffic to the new version. Monitor production metrics for 15–60 minutes. Watch for regressions in success rate, latency, and cost.

**Eval gate**: canary passes if metrics are within acceptable bounds.

### 6. Full rollout

Route 100% of traffic. Keep monitoring. If regressions appear, roll back and investigate.

## Pipeline as code

```yaml
stages:
  - lint
  - unit_test
  - scenario_eval
  - shadow
  - canary
  - rollout

gates:
  scenario_eval:
    metric: completion_rate
    threshold: previous * 0.95
  shadow:
    metric: cost_per_task
    threshold: previous * 1.1
  canary:
    duration: 30m
    metrics: [completion_rate, tool_error_rate, latency_p95]
```

## Rollback is a feature

Every deployment should have a rollback plan. The rollback might be:

- Reverting a prompt change
- Switching to a previous model snapshot
- Re-enabling a removed tool
- Restoring a previous agent configuration

Test your rollback as rigorously as your deployment. A rollback that fails is worse than a deployment that breaks.

## The principle

CI/CD for agents is not about eliminating bad deployments. It is about detecting them early and recovering quickly. Invest in gates and monitoring before you invest in deployment speed.