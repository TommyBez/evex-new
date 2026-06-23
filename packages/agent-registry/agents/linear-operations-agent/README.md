# Linear Operations Agent

An Eve agent for Linear operations across Linear, Slack, and scheduled runs.

Linear is the source of truth. Slack is used for intake, coordination, notification, and scheduled report delivery. Scheduled initiative updates are written directly to Linear for explicitly configured initiatives.

## Capabilities

- Linear issue triage, clarification, decomposition, duplicate detection, and incident support.
- Slack thread intake that prepares or creates structured Linear work after approval.
- Scheduled daily triage, cycle health, backlog hygiene, project summaries, P0/P1 monitoring, and weekly initiative updates.
- One Linear MCP connection with dynamic approval policy. No custom Linear SDK tools are included.

## Linear Agent App Setup

Create a Linear OAuth app for the agent surface:

- Use the authorize URL with `actor=app`.
- Grant app scopes including `app:assignable` and `app:mentionable`.
- Subscribe to `AgentSessionEvent`.
- Configure the webhook URL as `/eve/v1/linear`.
- Set `LINEAR_AGENT_ACCESS_TOKEN` for Agent Activities and proactive sessions.
- Set `LINEAR_WEBHOOK_SECRET` for webhook verification.

The Linear channel accepts only `created` and `prompted` Agent Session events.

## Linear MCP OAuth Setup

The agent uses one MCP client connection:

- URL: `https://mcp.linear.app/mcp`
- Auth: Vercel Connect via `connect(process.env.LINEAR_CONNECT_UID ?? "oauth/linear")`
- Default Connect UID: `oauth/linear`

Configure a Vercel Connect client for Linear and ensure the authenticated user has access to the workspace data the agent should read or update.

## Slack Setup

The Slack channel uses Vercel Connect:

- Default Connect UID: `slack/linear-operations-agent`
- Trigger path: `/eve/v1/slack`
- Configure `SLACK_CONNECT_UID` if you use a different Connect UID.

Slack is not the final system of record. For operational work, the agent should create or update Linear after approval, then reply in Slack with the result.

## Configuration

Use `.env.example` as the configuration contract.

`LINEAR_OPS_COVERED_TEAMS` and `LINEAR_OPS_COVERED_PROJECTS` are comma-separated allow-lists. Empty values mean all teams or all projects.

`LINEAR_OPS_COVERED_INITIATIVES` is comma-separated and supports:

```text
initiative-id-or-name|optional-slack-channel-id|optional-enabled-flag
```

Example:

```text
Payments Revamp|C0123ABC|true,Mobile Foundations||false
```

Weekly initiative updates are automatic only when the initiative is explicitly configured and `weeklyUpdateEnabled` is not `false`. If the Linear workspace does not have roadmaps or initiatives enabled, the schedule should publish a clear Slack error instead of a generic digest.

Project-to-channel mappings use:

```text
LINEAR_OPS_PROJECT_CHANNELS=Payments Revamp:C0123ABC,Mobile:C0456DEF
```

## Approval Policy

Read tools do not require approval. Non-destructive comments do not require approval. Initiative status updates do not require approval only when `type === "initiative"` and the initiative is explicitly configured.

Approval is required for:

- Creating issues.
- Changing issue state, priority, assignee, delegate, project, cycle, duplicate, parent, blocker, or related relationships.
- High-priority issue writes where priority is `1` or `2`.
- Project writes.
- Document writes.
- Status update deletes.
- Bulk or irreversible actions.

The approval predicate is synchronous and input-based. If deciding safely requires reading current Linear state, the agent must read with MCP first, then ask for approval before the sensitive write.

## Commands

```bash
pnpm install
pnpm info
pnpm build
```

During development, trigger a schedule with:

```bash
curl -X POST http://localhost:3000/eve/v1/dev/schedules/daily-triage-digest
```

Other schedule ids are `cycle-health`, `weekly-backlog-hygiene`, `weekly-project-summary`, `weekly-initiative-updates`, and `p1-monitoring`.
