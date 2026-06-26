# Sending Reliability

Ensuring the digest is sent exactly once and that failures are handled gracefully.

## Idempotency

`send_digest_email` accepts a `confirmSend` flag and an `idempotencyKey`. The key is
forwarded to Resend as the `Idempotency-Key` header, and the tool also keeps an
in-process map of sent keys so a replayed Eve step returns the recorded result instead
of issuing a second send.

### Why it matters

Eve replays a tool step that did not complete. Without idempotency, a retried send
after a timeout would duplicate the digest. With idempotency, the same logical send
reuses the same key and the duplicate is suppressed.

### Key generation

Use a deterministic key based on the digest event. The recommended shape is:

```
x-hot-topic-digest-YYYY-MM-DD
```

| Strategy | Example | Use when |
|----------|---------|----------|
| Digest-date-based (recommended) | `x-hot-topic-digest-2026-06-26` | One digest per day |
| Date + recipient | `x-hot-topic-digest-2026-06-26-ops@example.com` | Per-recipient dedup |

**Do not** generate a fresh random key per retry attempt, and do not use `Date.now()`
or a new UUID on each call. The same logical send must produce the same key.

### Key expiration

Idempotency keys are typically cached for 24 hours. Replays within this window return
the original response. After expiration the same key triggers a new send, so complete
retries well within 24 hours.

## The two-step send

1. `preview_digest_email` — no side effect. Resolves `from`/`to`/`subject` from
   configuration and returns the exact payload plus an HTML preview. Use it to review
   before any send.
2. `send_digest_email` — the only path that calls Resend. Requires `confirmSend: true`
   and a stable `idempotencyKey`. If `confirmSend` is omitted or false, the tool returns
   `notConfirmed: true` and sends nothing.

Never skip the preview. Never call `send_digest_email` without `confirmSend` and an
idempotency key.

## Error handling

Common Resend error codes when sending:

| Code | Meaning | Action |
|------|---------|--------|
| 400 | Bad request | Fix the payload (invalid email, missing field) |
| 401 | Unauthorized | Check `RESEND_API_KEY` |
| 403 | Forbidden | Check permissions and domain verification |
| 422 | Validation error | Fix request data |
| 429 | Rate limited | Back off and retry |
| 500 / 503 | Server error | Retry with backoff; the idempotency key makes retry safe |

If `send_digest_email` returns `authRequired: missingEnv RESEND_API_KEY`, stop and
report the missing configuration instead of retrying.

## Related

- [Accessibility](./accessibility.md) — composing the HTML body
