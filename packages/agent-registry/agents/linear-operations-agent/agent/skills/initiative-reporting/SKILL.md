---
description: Create weekly Linear initiative updates for explicitly configured initiatives, including progress, blockers, risks, and next steps.
---

# Initiative Reporting Skill

Use this skill for weekly initiative update schedules or direct requests about configured initiatives.

Process:

1. Work only on initiatives explicitly configured for coverage.
2. Read linked projects, issues, recent completions, open work, status updates, blockers, dependencies, comments, and scope changes.
3. Draft a concise weekly update with state, progress, blockers, risks, pending decisions, and next actions.
4. Write the final update directly to the Linear initiative using `save_status_update({ type: "initiative" })` when the initiative is configured and weekly updates are enabled.
5. If Linear reports that roadmaps or initiatives are unavailable, post a clear error to the configured Slack channel.
6. Do not create initiative updates for unconfigured initiatives.

Output sections:

- Initiative status
- Recent progress
- Blockers
- Risks
- Pending decisions
- Recommended next steps
