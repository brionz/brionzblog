---
title: 'Agent Testing Strategies: From Unit Tests to Chaos Engineering'
description: 'Golden trajectories, fuzzing tool calls, adversarial testing—how to test systems that behave differently every time.'
pubDate: 'Jul 25 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
category: 'karya'
featured: false
tags:
  - testing
  - quality
  - agents
---

Testing an agent is harder than testing a function because the same input can produce different outputs. That does not mean testing is impossible—it means the testing strategy must shift from asserting exact outputs to asserting constraints and outcomes.

## The testing pyramid for agents

### Unit tests (tool level)

Test each tool in isolation: schema validation, auth failures, edge cases in arguments. These are deterministic and should be as strict as any traditional unit test.

```text
test("search_docs rejects empty query")
test("create_issue requires title and project_id")
test("tool returns structured error for unknown ID")
```

### Integration tests (tool + model)

Test that the model can correctly invoke tools given a prompt. Use recorded model responses or a test model with deterministic behavior. Assert that the tool call matches expected schema.

### Scenario tests (full trajectory)

Hand-author 20–50 realistic tasks with known ground truth. Run the agent and score:

- Did it complete the task?
- Did it use the correct tools in the correct order?
- Did it avoid prohibited actions?
- Did it stay within budget?

Score trajectories automatically where possible. Use LLM-as-judge for open-ended tasks.

### Regression tests

Re-run your scenario suite on every change to prompts, tools, or model versions. A regression in tool-calling accuracy or task completion rate should block deployment.

### Chaos tests

Intentionally inject failures to test resilience:

- Random tool timeouts
- Malformed tool responses
- Rate limit errors
- Mid-task model swaps

A resilient agent should handle these gracefully, not collapse.

## Testing non-determinism

Since agents can take different paths to the same goal, assert on outcomes and constraints rather than exact sequences:

- **Outcome assertions** — "ticket was created with correct priority"
- **Constraint assertions** — "agent never called delete_tool"
- **Budget assertions** — "agent completed in under 10 turns"
- **Safety assertions** — "agent never exposed credentials"

## Adversarial testing

Test how the agent handles hostile inputs:

- Prompt injection in tool results
- Contradictory instructions from different sources
- Missing or ambiguous information
- Deliberately confusing tool names

These tests reveal whether your guardrails actually work.

## A minimal test suite

```text
tests/
  tools/
    test_search_docs.py
    test_create_issue.py
    test_schema_validation.py
  scenarios/
    test_research_vendor.py
    test_refactor_module.py
    test_file_ticket.py
  resilience/
    test_tool_timeout.py
    test_malformed_response.py
    test_budget_exceeded.py
  adversarial/
    test_prompt_injection.py
    test_contradictory_goal.py
```

## The metric that matters

**Test reliability**: how often do your tests catch regressions before production? If your test suite passes but production breaks, your tests are testing the wrong things.

Agent testing is not about eliminating non-determinism. It is about bounding it within safe, measurable corridors.