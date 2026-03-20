---
name: three-layer-architecture
description: Ensures the agent adheres to the 3-layer architecture (Directive, Orchestration, Execution). Use when creating new features, automations, or scripts.
---

# 3-Layer Architecture Skill

This skill enforces the separation of concerns between probabilistic logic and deterministic execution.

## Core Rules

1.  **Directive Layer (Layer 1)**: Always check `directives/` for an SOP before starting work. If a new task is complex, create a new directive first.
2.  **Orchestration Layer (Layer 2)**: This is the agent's logic. It reads directives and calls execution scripts. It handles errors and retries (self-annealing).
3.  **Execution Layer (Layer 3)**: All deterministic logic (API calls, file parsing, etc.) must live in `execution/` as Python scripts. 

## When to use this skill

-   When the user asks for a new automation.
-   When debugging a failed automated task.
-   When structuring a new project module.

## How to use it

1.  **Identify the need**: Determine if the task requires a new deterministic tool.
2.  **Consult Directives**: Read existing SOPs in `directives/`.
3.  **Create/Update Execution**: If no tool exists, write a Python script in `execution/`.
4.  **Execute & Observe**: Run the script from the orchestration layer and monitor for errors.
5.  **Self-Anneal**: If the script fails, fix the code and update the directive with what was learned.
