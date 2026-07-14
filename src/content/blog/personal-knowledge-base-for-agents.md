---
title: 'Building a Personal Knowledge Base Agents Can Query'
description: 'Notes, embeddings, and MCP resources—how to make your second brain actually useful to an agent.'
pubDate: 'Jul 02 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
category: 'hidup'
featured: false
tags:
  - knowledge-base
  - mcp
---

A personal knowledge base fails agents the same way it fails humans: when it is a dumpster of unsorted Markdown. Agents need **retrievable, attributable, fresh enough** knowledge—not a 10,000-file graveyard.

## Design for questions, not storage

Start from the questions you ask weekly:

- What did we decide about X?
- Where is the runbook for Y?
- Which snippet explains our auth model?

Structure folders and tags so retrieval can be precise. Filename and title hygiene matter more than fancy graph visualizations.

## Architecture that stays maintainable

1. **Source of truth** — notes in git or a docs system you already trust
2. **Chunking & index** — embeddings or good lexical search (both is fine)
3. **Access layer** — an MCP server or tool: `search_notes`, `get_note`, `list_recent`
4. **Write path** — optional `capture_note` with templates so agents do not invent chaos
5. **Citations** — always return paths and titles so you can verify

## What to put in vs leave out

Include durable decisions, how-tos, glossaries, and postmortems. Exclude secrets, raw credentials, and transient Slack venting. If an agent should not say it aloud, it should not index it.

## Freshness beats cleverness

A weekly job that reindexes changed files outperforms a perfect ontology you never update. Show `last_modified` in search hits so the model (and you) can discount stale guidance.

## Agent habits to encourage

- Search before answering from memory
- Quote the note; do not paraphrase critical policies
- Ask when sources conflict
- Propose a note update when it learns a new decision from you

Your knowledge base is an MCP resource dressed as a lifestyle brand. Build it like an API for your future self—and for the agent that will query it at 2 a.m.
