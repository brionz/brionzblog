---
title: 'Tool Composition: Building Complex Workflows from Primitives'
description: 'Chaining MCP tools, conditional routing, parallel execution—how to compose simple tool calls into sophisticated agent workflows.'
pubDate: 'Jul 31 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
category: 'karya'
featured: false
tags:
  - tools
  - mcp
  - composition
---

A single tool call does one thing. An agent that calls three tools in sequence can do something useful. An agent that composes tools conditionally, in parallel, and with error handling can do something remarkable—but only if the composition is intentional rather than accidental.

## The composition primitives

### Sequence

Tool A, then Tool B, then Tool C. The simplest pattern and the most common. Works when each step depends on the previous.

```text
search_docs("deployment guide")
  → read_doc(result.id)
  → summarize_doc(result.content)
```

### Conditional

Tool A, then decide: if condition, Tool B; else Tool C. The agent chooses the path based on intermediate results.

```text
check_permission(user, action)
  → if allowed: execute_action(action)
  → if denied: escalate_to_human(user, action)
```

### Parallel

Call multiple tools at once and merge results. Reduces latency when tools are independent.

```text
parallel:
  search_docs("API reference")
  query_metrics("service latency")
  get_recent_incidents()
→ merge_results(docs, metrics, incidents)
```

### Loop

Repeat a tool until a condition is met. Risky without budget limits.

```text
while not cursor.has_next_page():
  fetch_page(cursor)
  → cursor = result.next_page
```

### Fan-out

One input spawns multiple sub-tasks, each handled independently.

```text
files = list_files(directory)
  for each file in files:
    analyze_file(file)
→ aggregate_results(results)
```

## Designing tools for composition

Tools designed for composition share properties:

- **Idempotent** — calling twice produces the same result
- **Stateless** — all needed state is passed as arguments
- **Structured errors** — errors include recovery hints
- **Narrow scope** — one tool does one thing well

If your tools have these properties, the agent can compose them reliably. If not, composition becomes a guessing game.

## When composition fails

- **Hidden dependencies** — Tool B needs state from Tool A that was not captured in Tool A's output
- **Side effects** — Tool A modifies state that Tool B5 assumes unchanged
- **Error cascades** — Tool B fails because Tool A returned a subtly incorrect value
- **Context overload** — the agent cannot hold the full composition plan in working memory

## MCP and composition

MCP servers naturally support composition because each tool is a standalone operation. The agent decides the order. The host manages the loop.

For complex workflows, consider exposing a higher-level "workflow tool" that encapsulates a multi-step process:

```text
tool: deploy_service(service_name, version)
  internally:
    run_tests(service_name)
    → build_image(service_name, version)
    → update_kubernetes(service_name, version)
    → run_healthcheck(service_name)
```

This trades flexibility for reliability. Use it for high-stakes, well-defined sequences.

## Principle

Compose tools the way you compose functions: small, predictable, and testable in isolation. The agent's intelligence is not in the individual calls but in how it chains them toward a goal.