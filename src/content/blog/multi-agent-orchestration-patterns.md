---
title: 'Multi-Agent Workflows: Orchestration Patterns That Stick'
description: 'Manager–worker, pipelines, and debate—patterns for multi-agent systems that survive contact with production.'
pubDate: 'Jul 11 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
category: 'karya'
featured: false
tags:
  - multi-agent
  - orchestration
---

Multi-agent demos look like a newsroom: a planner delegates, specialists work, a critic reviews. Some of those patterns survive production. Many collapse into expensive chat between confused bots.

## Patterns worth keeping

### Pipeline (assembly line)

Agent A retrieves, Agent B drafts, Agent C verifies. Clear inputs/outputs, easy to evaluate. Best when stages are naturally sequential.

### Manager–worker

A coordinator breaks work into tasks and assigns workers with narrow tools. Works when the manager has a strong rubric and workers cannot trampole each other’s state.

### Specialist routers

A cheap router sends billing questions to a billing agent and coding tasks to a coding agent. Often better than one mega-agent with every tool loaded.

### Critic / verifier

A second agent challenges claims, reruns tests, or checks policy. High value when the primary agent is generative and the cost of silent error is high.

## Patterns that usually disappoint

- **Unstructured debate clubs** with no scoring rule
- **Too many agents** sharing one muddy scratchpad
- **Agents that renegotiate the goal** every turn
- **Duplicated tool access** without ownership (everyone can write to prod)

## Orchestration principles

1. **One writer per artifact** whenever possible.
2. Pass **structured handoffs** (JSON contracts), not novels.
3. Budget **tokens per role**.
4. Log the **graph**: who called whom, with what payload.
5. Prefer **deterministic code** for control flow when you do not need an LLM.

## MCP and multi-agent

MCP servers can be shared services: one docs server, many agents. That is good for consistency and dangerous for blast radius—gate writes and identity carefully.

## Start smaller than you think

Two agents with a verifier beat seven agents with vibes. Add roles only when a measured failure mode demands a specialist. Multi-agent is an engineering topology, not a personality cast.
