# Slack channel setup

Use when the agent should answer `@mentions` and DMs in Slack. Eve docs:
`node_modules/eve/docs/channels/slack.mdx`.

Credentials run through Vercel Connect — there is no `SLACK_BOT_TOKEN` or
`SLACK_SIGNING_SECRET` to manage directly.

## Route and channel file

- Webhook route: `POST /eve/v1/slack`
- Channel file: `agent/channels/slack.ts` exporting `slackChannel(...)`
- Dependency: `@vercel/connect`

Scaffold with `eve channels add slack` or add the file by hand.

## Vercel Connect setup

```bash
npm install -g vercel@latest
export FF_CONNECT_ENABLED=1
vercel connect create slack --name <agent-name> --triggers --format=json
vercel connect detach <uid> --yes
vercel connect attach <uid> --triggers --trigger-path /eve/v1/slack --yes
```

`--triggers` enables Slack Event Subscriptions. Without it, Slack never delivers
`app_mention` or `message.im`. Detach then attach re-points the trigger from
Connect's default path to Eve's Slack route.

With `run_vercel_cli` in this agent:

1. `connect_create_slack` — creates the Connect client with triggers
2. `connect_detach` — detaches from the default destination
3. `connect_attach_slack` — attaches to `/eve/v1/slack` with triggers

Store the returned Connect UID in `.env.example` (for example
`SLACK_CONNECT_UID`).

## Minimal channel example

```ts
import { connectSlackCredentials } from "@vercel/connect/eve";
import { slackChannel } from "eve/channels/slack";

export default slackChannel({
  credentials: connectSlackCredentials("slack/my-agent"),
});
```

Replace `"slack/my-agent"` with the Connect UID returned by
`vercel connect create slack`.

For thread intake (common for ops agents), load context since the last agent
reply:

```ts
export default slackChannel({
  credentials: connectSlackCredentials("slack/my-agent"),
  threadContext: { since: "last-agent-reply" },
});
```

## Deploy

```bash
VERCEL_USE_EXPERIMENTAL_FRAMEWORKS=1 vercel deploy --prod
```

Eve's setup commands set the same flag so Vercel recognizes the framework.

## Verification

**Done when**:

- Slack `app_mention` and DM events reach `/eve/v1/slack`
- `eve info --json` lists the `slack` channel at `/eve/v1/slack`
- The Connect trigger is attached with `--trigger-path /eve/v1/slack`

Common failures:

- No events: Connect client missing `--triggers`, or UID not attached to Eve's
  route
- Auth errors: `SLACK_CONNECT_UID` does not match the created connector

See [channel-routes](./channel-routes.md) for health and session smoke tests.
