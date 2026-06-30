---
description: Use when creating, modifying, testing, or deploying an Eve agent.
---

# Eve agent delivery

Use this procedure whenever the user asks for a new Eve agent, a change to an
existing Eve agent, tests for an agent, or a Vercel deployment.

## Discovery
1. Find the app root and package manager.
2. Read `package.json`, `tsconfig.json`, existing `agent/` files, `evals/`, env
   examples, Vercel config, and README setup notes.
3. Read `node_modules/eve/docs/README.md`, then the pages for the slots you will
   touch. For most tasks, read project layout, `agent.ts`, instructions, tools,
   channels, sandbox, evals, CLI, and deployment.
4. Identify required credentials, channel routes, webhook URLs, model routing,
   and whether deploy should be preview or production.

## Implementation
- Keep the authored surface small. Add only the files needed for the requested
  behavior.
- Put long operating procedures in skills so the base prompt stays readable.
- Put deterministic side effects behind tools. Use approval for external,
  irreversible, user-visible, or production-impacting actions.
- Keep runtime helpers in `agent/lib/`; only skills and sandbox seed files reach
  the sandbox workspace.
- Declare every environment variable in `.env.example` or the app's existing env
  documentation.
- For channels, document the route and setup:
  - GitHub: `/eve/v1/github`
  - Slack: `/eve/v1/slack`
  - Eve session API: `/eve/v1/session`

## Testing
Run the narrowest checks that prove the changed agent works, then broaden before
deployment.

Preferred local sequence:
1. install dependencies
2. typecheck or repo check
3. `eve info --json`
4. `eve build`
5. `eve eval --skip-report` when evals exist
6. channel smoke test when the channel is part of the change

When a check fails, inspect the artifact or log, fix the root cause, and rerun
the failed check. Do not treat a build-only pass as proof of behavior when an
eval or channel smoke test is available.

## Vercel deployment
Before deployment, confirm:
- the target Vercel project or team
- preview vs production
- required model credentials, usually Vercel AI Gateway OIDC on Vercel or
  `AI_GATEWAY_API_KEY` elsewhere
- channel credentials and webhook destinations
- route auth is not left as a placeholder for production browser traffic

Use `eve deploy` for standalone Eve apps. Use the repository's Vercel command
when Eve is mounted in a host app. After deployment, verify:

```bash
curl https://<deployment>/eve/v1/health
curl -X POST https://<deployment>/eve/v1/session \
  -H 'content-type: application/json' \
  -d '{"message":"Smoke test the new agent."}'
```

If preview protection is enabled, configure `VERCEL_AUTOMATION_BYPASS_SECRET`
locally before remote smoke tests.

## Final report
Return:
- what changed
- tests and commands with pass or fail status
- deployment URL and Vercel target
- live verification evidence
- missing credentials or manual setup that blocked any step
