# Eve channel routes

Built-in channel webhook routes. Document the routes you add in README setup.

| Channel | Route | Setup reference |
| --- | --- | --- |
| Eve session API | `/eve/v1/session` | Default HTTP channel — no extra webhook |
| GitHub | `/eve/v1/github` | [github-channel-setup](./github-channel-setup.md) |
| Linear | `/eve/v1/linear` | [linear-channel-setup](./linear-channel-setup.md) |
| Slack | `/eve/v1/slack` | [slack-channel-setup](./slack-channel-setup.md) |

Read the matching Eve guide in `node_modules/eve/docs/channels/` before implementing
a channel (`github.mdx`, `linear.mdx`, `slack.mdx`).

## Post-deploy verification

```bash
curl https://<deployment>/eve/v1/health
curl -X POST https://<deployment>/eve/v1/session \
  -H 'content-type: application/json' \
  -d '{"message":"Smoke test the new agent."}'
```

For preview protection, use `verify_vercel_preview` instead of raw curl. It
brokers `VERCEL_AUTOMATION_BYPASS_SECRET` as `x-vercel-protection-bypass`,
creates a smoke-test session, attaches to the stream, and clears the transform
before returning.

Channel-specific webhooks must reach the deployment over HTTPS. Localhost URLs
do not work for GitHub, Linear, or Slack unless exposed through a tunnel.
