---
description: Use when composing or sending transactional email through Resend — idempotent sends, deliverability, and accessible HTML.
---

Guidance for building deliverable, accessible, exactly-once transactional emails sent
through an email API such as Resend. Apply the rules below whenever an email is being
drafted or sent.

## Sending exactly once

Network issues, timeouts, and server errors can leave a send's outcome uncertain.
Retrying without protection duplicates the email. Use an idempotency key: a stable value
derived from the business event, sent with the request, so a retried send with the same
key returns the original outcome instead of issuing a second email.

- Derive the key from the event, not from `Date.now()` or a fresh random value per
  attempt. The same logical send must produce the same key.
- Keys are typically cached by the provider for ~24 hours; complete retries well within
  that window.
- Email APIs (including Resend) often resolve with `{ data, error }` rather than
  throwing on failure. Check `error` before treating a send as delivered: an unverified
  sender, invalid recipient, rate limit, or validation error comes back as an error
  result, not a thrown exception.
- A failed send should not be cached as a success. Only successful sends are safe to
  short-circuit on replay; failures need to be retried with the same key.

See [sending-reliability](./references/sending-reliability.md) for the idempotency and
retry model in detail.

## Deliverability

The sender domain must be authenticated (SPF/DKIM/DMARC) and the sender address verified
by the provider. Unverified senders are the most common cause of bounces and spam
filtering — Gmail and Yahoo reject unauthenticated email outright.

## Composing accessible HTML

Email must be readable by screen readers, dark-mode clients, translation tools, and AI
clients, not just sighted readers on a default inbox.

- Set `lang` and `dir` on `<html>` and on `<body>`'s direct children (some clients strip
  them from `<html>`).
- Include a `<title>` that names the specific email, not just the brand.
- Use one `<h1>` and nest `<h2>`/`<h3>` in order. Never skip levels or fake headings with
  bold text.
- Layout tables must carry `role="presentation"`.
- Every link must have discernible text that describes its destination — never "click
  here", bare URLs, or linked images with empty alt.
- Meaningful images need descriptive `alt`; decorative images need an explicit `alt=""`.
- Body text must pass 4.5:1 contrast and stay readable in dark mode.
- Send a plain-text alternative alongside the HTML.

See [accessibility](./references/accessibility.md) for the full checklist and priority
order.
