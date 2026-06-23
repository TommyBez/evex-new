---
description: Find likely duplicate Linear issues, compare evidence, and propose link, merge, or closure actions.
---

# Duplicate Detection Skill

Use this skill when a user asks whether an issue is duplicated or related.

Process:

1. Extract search terms from title, description, error messages, product area, labels, and comments.
2. Use `list_issues` with targeted queries.
3. Use `get_issue` on the strongest candidates before making a recommendation.
4. Compare scope, symptoms, environment, impacted user flow, and current status.
5. Recommend the canonical issue to keep open.
6. Ask approval before writing duplicate links, changing status, or closing anything.

Output sections:

- Candidate duplicates
- Why they match or do not match
- Recommended canonical issue
- Proposed Linear action
- Approval request
