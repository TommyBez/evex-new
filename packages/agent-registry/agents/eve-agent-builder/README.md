# Eve Agent Builder

Build, test, and deploy Eve agents from an existing Eve app. This agent works
through whatever channel your app already exposes: web chat, the Eve session
API, Slack, GitHub, or another channel.

It reads the repository, writes the smallest Eve surface needed for the request,
runs local Eve checks, deploys to Vercel after approval, and verifies the live
routes.

## Install

Run this in an existing Eve app:

```bash
npx shadcn@latest add @evex/eve-agent-builder
```

This package does not add a channel. Use your existing app UI or channel. If the
app has no interactive surface yet, add one with Eve first, for example a web or
Slack channel.

## What it can do

- create a new Eve agent in an existing project
- add instructions, skills, tools, channels, schedules, subagents, and evals
- load the official Eve skill installed from `npx skills add
  https://github.com/vercel/eve --skill eve`
- read the local Eve docs before using framework APIs
- run `eve info --json`, `eve build`, and `eve eval --skip-report`
- deploy with `eve deploy` or the repo's Vercel command
- smoke-test `/eve/v1/health`, `/eve/v1/session`, streams, and channel routes

The installed `bash` tool requires human approval for Eve and Vercel deploy
commands, including `eve deploy`, `vercel deploy`, and production deploy flags.
Normal install, inspect, build, and test commands can run without that deploy
approval.

## Environment

The registry installs `.env.example` with optional deployment helpers:

```bash
AI_GATEWAY_API_KEY=
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
VERCEL_AUTOMATION_BYPASS_SECRET=
```

On Vercel, the simplest model setup is Vercel AI Gateway OIDC through a linked
project. Outside Vercel, set `AI_GATEWAY_API_KEY` or change `agent/agent.ts` to
use a direct AI SDK provider package and its provider key.

For non-interactive deploys, set the Vercel CLI variables in the deployment or
local environment. If your project is already linked and the CLI is logged in,
the agent can use that existing Vercel setup.

## Example prompts

Create and test a new agent:

```md
Create an Eve agent that answers customer onboarding questions from our docs.
Use the existing web channel, add evals for three common questions, and run the
local checks before you stop.
```

Deploy after review:

```md
Deploy the onboarding agent to a Vercel preview, then verify the health route
and run one smoke-test session against the preview URL.
```

Production deploys should be explicit:

```md
Deploy the tested onboarding agent to Vercel production. The target project is
acme-onboarding-agent.
```

## Smoke tests

After a deploy, the agent should verify the live app:

```bash
curl https://<deployment>/eve/v1/health
curl -X POST https://<deployment>/eve/v1/session \
  -H 'content-type: application/json' \
  -d '{"message":"Smoke test the new agent."}'
```

If the app uses a channel, test that route too. Common routes:

- GitHub: `/eve/v1/github`
- Slack: `/eve/v1/slack`
- Eve session API: `/eve/v1/session`

## Troubleshooting

- `eve info` does not show a file: move it into the correct `agent/` slot and
  rerun `eve info --json`.
- `eve build` fails on docs or discovery: read `.eve/discovery/diagnostics.json`
  and fix the authored file path or config.
- Vercel deploy asks for login: set `VERCEL_TOKEN` or run `vercel login` outside
  the agent.
- Model calls fail locally: set `AI_GATEWAY_API_KEY` or use a direct provider
  model with the matching provider key.
- Preview smoke tests return auth HTML: set `VERCEL_AUTOMATION_BYPASS_SECRET`
  before testing protected previews.
