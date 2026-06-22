---
description: Use when severity is ambiguous and the review needs a consistent impact bar.
---

Calibrate findings against user harm, exploitability, reversibility, and detection speed.
Escalate issues that can corrupt state, leak data, bypass authorization, or silently ship
broken behavior. De-escalate issues that are recoverable, obvious, and tightly scoped.

Use the review tool severity labels:
- blocking for probable bugs, security issues, data loss, broken runtime behavior, or user-visible regressions.
- warning for real risks that depend on runtime context, rollout conditions, or materially missing tests.
- nit only for small correctness improvements. Do not use nit for style.
