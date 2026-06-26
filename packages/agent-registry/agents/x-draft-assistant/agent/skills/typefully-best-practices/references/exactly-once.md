# Exactly Once

Ensuring a Typefully draft is created exactly once across Eve step replays.

## The problem

Eve replays completed steps from their recorded result, but a step interrupted
mid-execution re-runs. If a `create_x_drafts` call is interrupted after the
Typefully POST succeeds but before the result is recorded, a replay issues a
second POST and creates a duplicate draft.

The Typefully v2 API does not accept a server-side idempotency key, so the
defense is in-process: a per-draft `idempotencyKey` plus a cache of successful
creates keyed by that key.

## Solution: per-draft idempotency keys

Each draft in a `create_x_drafts` call carries a stable `idempotencyKey`. Before
issuing a POST, the tool checks the cache:

- A hit returns the recorded response with `replayed: true` and never issues a
  second POST.
- A miss issues the POST, then stores the response on success. Failures are not
  cached, so the same key can be retried on a later run.

### Key generation strategies

| Strategy | Example | Use when |
|----------|---------|----------|
| Run-indexed (recommended) | `x-draft-assistant-2026-06-26-1` | One draft per candidate per run |
| Run + topic slug | `x-draft-assistant-2026-06-26-ai-sdk-5` | Stable across topic reordering |
| UUID | `crypto.randomUUID()` | No natural key (generate once, reuse on retry) |

**Best practice:** use deterministic keys based on the run date and the candidate
index. If the same logical create is retried, the same key must be regenerated.
Avoid `Date.now()` or random values generated fresh on each attempt.

### Duplicate keys inside one call

Each draft in a single `create_x_drafts` call must have a unique
`idempotencyKey`. The tool rejects a call with duplicate keys before any POST is
issued, so a misconfigured run cannot create one draft and silently drop another.

## Result shape: distinguish `created`, `replayed`, and failures

The tool returns one entry per draft, tagged so the caller can tell them apart:

```typescript
type DraftResult =
  | { created: true; draftId; privateUrl; ... }
  | { replayed: true; draftId; privateUrl; ... }
  | { created: false; error: { message; status? } };
```

A `replayed` entry is a success — the draft already exists and the replay did not
duplicate it. A `created: false` entry is a failure that can be retried with the
same key on a later run.

## Retry logic

A failed create should not be retried inside the same Eve step. The Typefully
per-social-set rate limit on `drafts.create` is small, and a tight retry loop
will burn through it. Surface the failure in the output and let the user retry on
a later run, reusing the same `idempotencyKey` so a successful retry does not
duplicate the draft.

| Error type | Retry? | Notes |
|------------|--------|-------|
| 429 (rate limit) | No, defer to a later run | Wait for the rate limit window |
| 5xx (server error) | Yes, on a later run | Transient, likely to resolve |
| 4xx (client error) | No | Fix the request first |
| Network timeout | Yes, on a later run | Transient |

## The `confirmCreate` guard

`create_x_drafts` requires `confirmCreate: true` before it issues any POST. This
is a separate guard from the idempotency key: the key makes replays safe, the
flag makes accidental creates impossible. Always call `preview_x_draft` first,
review the candidates, then call `create_x_drafts` with the flag set.

## Related

- [X Automation](./x-automation.md) — content and engagement rules for X drafts
