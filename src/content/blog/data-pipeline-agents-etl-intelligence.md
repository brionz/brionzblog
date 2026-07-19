---
title: 'Data Pipeline Agents: ETL with Intelligence'
description: 'Data validation, transformation, anomaly detection—how to build agents that make data pipelines self-healing.'
pubDate: 'Aug 13 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
category: 'karya'
featured: false
tags:
  - data-engineering
  - pipelines
  - automation
---

Data pipelines are deterministic by design: read, transform, write. But the real world is not deterministic. Schemas change, sources drift, data quality varies. Agents add intelligence to pipelines—not by replacing the deterministic transforms, but by handling the exceptions.

## Where agents add value

### Schema drift detection

A source adds a column, changes a data type, or stops populating a field. Traditional pipelines break. An agent can detect the drift, assess impact, and suggest a schema migration.

### Data quality validation

Beyond type checks and null counts: "Is this revenue figure plausible given historical trends?" Agents can apply business rules that are too complex for declarative validation.

### Anomaly handling

When a record fails validation, the agent decides: drop it, flag it for review, or attempt a correction based on context.

### Pipeline recovery

A pipeline fails at 3 a.m. The agent diagnoses the failure, retries with backoff, and if the failure persists, routes around the broken source.

## Architecture

```text
Raw data
  → Deterministic transform (SQL, Spark, dbt)
  → Agent validation layer
    → Pass: continue to next stage
    → Fail with known fix: apply fix, log, continue
    → Fail without known fix: quarantine, alert, escalate
  → Load to destination
```

The agent sits between deterministic stages, handling the non-deterministic parts.

## What agents should not do

- **Write production data without validation** — agent outputs should be reviewed before affecting production tables
- **Modify source schemas** — schema changes need human approval
- **Make irreversible corrections** — always quarantine before correcting

## Guardrails

- **Read-only by default** — agent can inspect data but not modify it without explicit permission
- **Quarantine before correction** — corrected records go to a staging table for review
- **Audit trail** — every agent decision is logged with rationale
- **Human escalation** — novel anomalies go to a data engineer

## Measuring success

- Anomaly detection rate (what % of real anomalies are caught?)
- False positive rate (how often does the agent flag valid data?)
- Recovery time (how long between pipeline failure and recovery?)
- Human intervention rate (is the agent reducing or increasing the data team's workload?)

## The principle

Data pipeline agents are not about removing data engineers. They are about removing the 3 a.m. pages for trivial failures so data engineers can focus on the hard problems.