# Linear channel setup

Use when users delegate work to the agent inside Linear via Agent Sessions. Eve
docs: `node_modules/eve/docs/channels/linear.mdx`.

## Route and channel file

- Webhook route: `POST /eve/v1/linear`
- Channel file: `agent/channels/linear.ts` exporting `linearChannel(...)`

Scaffold with `eve channels add linear` or add the file by hand.

## Linear app configuration

1. Create a Linear OAuth app for the agent surface.
2. Configure the authorize URL with `actor=app`.
3. Grant agent scopes, including `app:assignable` and `app:mentionable`.
4. Subscribe the app webhook to `AgentSessionEvent`.
5. Set the webhook URL to `https://<deployment>/eve/v1/linear`.
6. Copy the webhook secret into `LINEAR_WEBHOOK_SECRET`.
7. Create or copy the app access token into `LINEAR_AGENT_ACCESS_TOKEN`.

The channel accepts Agent Session events with action `created` (delegation or
mention) or `prompted` (user continues the session). Other Linear webhook events
are ignored by default.

## Environment variables

```bash
LINEAR_AGENT_ACCESS_TOKEN=   # posts Agent Activities and proactive sessions
LINEAR_WEBHOOK_SECRET=       # verifies Linear-Signature
```

Token fallbacks when not passed explicitly: `LINEAR_ACCESS_TOKEN`,
`LINEAR_API_KEY`, or `LINEAR_API_TOKEN`. Webhook secret falls back to
`LINEAR_WEBHOOK_SECRET`.

## Minimal channel example

```ts
import { linearChannel } from "eve/channels/linear";

export default linearChannel({
  // credentials fall back to LINEAR_AGENT_ACCESS_TOKEN and
  // LINEAR_WEBHOOK_SECRET when the block is omitted
});
```

## Channel vs MCP connection

The Linear **channel** is how users mention or delegate work inside Linear. A
**Linear MCP connection** (`agent/connections/linear.ts` with Vercel Connect) is
how the agent reads and writes Linear data from any surface — Slack, schedules,
or Linear itself. They use different credentials:

| Integration | Purpose | Typical credential |
| --- | --- | --- |
| Linear channel | Agent Sessions, Agent Activities | `LINEAR_AGENT_ACCESS_TOKEN` |
| Linear MCP connection | Issue/project read-write via MCP tools | Vercel Connect Linear UID |

Do not replace an MCP connection with channel credentials or vice versa.

Restrict dispatch to specific teams or projects in `onAgentSession` by inspecting
`event.agentSession.issue`.

## Verification

**Done when**:

- Linear webhook deliveries to `/eve/v1/linear` are accepted with valid
  `Linear-Signature`
- Delegating or mentioning the agent in Linear starts an Agent Session turn
- `eve info --json` lists the `linear` channel at `/eve/v1/linear`

Common failures:

- Invalid signature: `LINEAR_WEBHOOK_SECRET` mismatch or stale
  `webhookTimestamp`
- No Agent Session: webhook not subscribed to `AgentSessionEvent`, or missing
  `app:assignable` / `app:mentionable` scopes

See [channel-routes](./channel-routes.md) for health and session smoke tests.
