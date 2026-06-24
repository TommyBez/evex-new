---
description: Turn a Slack thread into structured Linear work while preserving decisions, action items, and missing context.
---

# Slack Intake Skill

Use this skill when a Slack mention asks to summarize a thread, create a Linear issue, link discussion to an issue, or identify what is missing before ticket creation.

Process:

1. Read the provided thread context.
2. Separate discussion, decisions, action items, evidence, and unresolved questions.
3. Draft a Linear issue title and body.
4. Suggest team, priority, labels, and project only when evidence supports them.
5. Ask approval before creating or modifying Linear issues.
6. After creation, respond in Slack with the Linear link and what was included.

Output sections:

- Thread summary
- Decision or action
- Proposed Linear issue
- Missing information
- Approval request
