---
title: 'Agent Memory: Short-Term, Long-Term, and What to Persist'
description: 'Working memory, session summaries, and durable stores—practical guidance on what agents should remember and what they should forget.'
pubDate: 'Jul 14 2026'
heroImage: '../../assets/blog-placeholder-4.jpg'
category: 'hidup'
featured: false
tags:
  - memory
  - agents
---

Memory is where agent product myths go to die. People want a colleague that “remembers everything.” Operators need a system that remembers **the right things**, forgets secrets, and stays correct when the world changes.

## Three layers

### Short-term (working memory)

The active context window: current goal, recent tool results, open files. Engineered continuously; discarded when the task ends. This is context engineering territory.

### Session memory

Summaries and artifacts from the current project thread—useful across hours or days. Store structured state (`decisions`, `paths`, `blockers`) rather than raw transcripts alone.

### Long-term memory

Cross-session knowledge: user preferences, org policies, recurring facts. Usually a database plus retrieval, sometimes exposed as MCP resources. Requires governance: who can write, what is allowed to stick, how to unlearn.

## What to persist

- Stable preferences (tone, language, review strictness)
- Project facts that change slowly (service owners, deploy rituals)
- Pointers to sources of truth (links to runbooks), not copies of secrets
- Outcomes of irreversible decisions with dates

## What not to persist

- Raw credentials and tokens
- One-off emotional venting
- Unverified claims from the open web
- Entire tool transcripts forever without retention limits

## Consistency beats clever embeddings

A wrong memory is worse than no memory. Prefer write paths that require confirmation for durable facts. Add TTLs. Show users what the agent believes about them—and give a delete button.

## Implementation sketch

```text
Task scratchpad  → ephemeral
Thread summary   → session DB
User profile     → long-term DB (reviewed fields)
Company policy   → docs system via MCP (not a second copy)
```

Managed agent platforms increasingly keep sandbox filesystems warm across credential refreshes; that is **environment memory**, not user memory. Do not confuse disk state with grounded knowledge.

## Closing principle

Remember actions and decisions. Re-fetch facts that drift. Forget anything that would embarrass you in an audit log. That is adult agent memory—less sci-fi, more reliable.
