---
title: 'Agent Memory Architectures: Vector DBs, Graphs, and Hybrids'
description: 'When to use embeddings vs knowledge graphs for agent memory—and how to combine them for retrieval that actually works.'
pubDate: 'Jul 30 2026'
heroImage: '../../assets/blog-placeholder-5.jpg'
category: 'karya'
featured: false
tags:
  - memory
  - architecture
  - rag
---

Memory is the difference between an agent that learns and an agent that starts from zero every conversation. But "memory" is not one thing. Vector databases, knowledge graphs, and structured stores each serve different purposes—and choosing wrong means retrieval that returns noise instead of signal.

## Vector databases: similarity search

Embeddings map text to vectors. Similar vectors mean similar meaning. Vector DBs excel at open-ended retrieval: "find me documents related to this concept."

**Good for:** fuzzy recall, semantic search, finding relevant passages without knowing exact keywords.

**Bad for:** precise facts, relational queries, freshness-sensitive data. A vector search for "deployment date of version 3.2" might return a discussion about deployment practices instead of the actual date.

## Knowledge graphs: structured relationships

Graphs store entities and their relationships. They excel at precise, multi-hop queries: "which services depend on this database, and who owns each?"

**Good for:** organizational knowledge, dependency mapping, policy enforcement, questions with right and wrong answers.

**Bad for:** fuzzy concepts, open-ended exploration, content that changes faster than the graph schema.

## Structured stores: facts with timestamps

Sometimes you just need a key-value store with TTLs: "user prefers dark mode," "last deployment was July 15." Simple, fast, and auditable.

**Good for:** user preferences, session state, configuration, any fact that has a single correct value.

**Bad for:** anything that needs similarity search or relationship traversal.

## Hybrid architectures

Most serious agent memory systems combine all three:

```text
User query
  → Vector search (find relevant context)
  → Graph query (resolve relationships)
  → Fact lookup (get precise values)
  → Rank and merge results
  → Present to agent
```

The agent does not need to know which backend answered. The memory layer abstracts the choice.

## Freshness and decay

Memory without decay becomes noise. Implement:

- **TTLs** on ephemeral facts (session data, temporary preferences)
- **Versioning** on durable facts (policies, configurations)
- **Staleness indicators** on retrieved data (show last_updated in results)
- **Reindexing jobs** for vector embeddings (weekly or on change)

## What to put where

| Data type | Store | TTL |
|-----------|-------|-----|
| User preferences | Structured (KV) | Until changed |
| Project decisions | Structured (KV) | Until changed |
| Documentation | Vector DB | Until reindexed |
| Org chart | Knowledge graph | Until changed |
| Session context | Structured (KV) | Session duration |
| Conversation history | Vector DB (summaries) | 30 days |

## The principle

Memory is not storage. It is retrieval that the agent can trust. Design for retrieval quality first—precise, fresh, attributable—and the storage backend becomes an implementation detail.