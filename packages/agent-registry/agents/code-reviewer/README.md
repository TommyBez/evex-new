# Code Reviewer

Review GitHub pull requests from a native GitHub App channel. Mention
`@code-reviewer` on a pull request and it publishes a GitHub review with inline
comments for concrete findings. Small, local fixes may include GitHub suggestion
blocks that the PR author can apply manually.

The agent reviews changed behavior rather than style. It looks for bugs,
regressions, security issues, rollout risk, and materially missing tests.

## How it works

1. Install this agent into an existing Eve app.
2. Create a GitHub App and point its webhook to `/eve/v1/github`.
3. Subscribe the GitHub App to `issue_comment` and
   `pull_request_review_comment`.
4. Comment on a pull request:

```md
@code-reviewer review this
```

The GitHub channel injects PR metadata and diff context, checks out the
repository into the Eve sandbox, and lets the agent inspect relevant files. The
agent does not push commits, open branches, or modify the pull request. It only
publishes review comments and optional suggestion blocks.

## GitHub App permissions

Use the narrowest permissions that support review comments:

- Metadata: read
- Contents: read
- Pull requests: read/write
- Issues: read/write

The issues permission is needed for PR timeline comments and fallback replies.

## Environment

Set the GitHub App credentials:

```bash
GITHUB_APP_ID=
GITHUB_APP_PRIVATE_KEY=
GITHUB_WEBHOOK_SECRET=
GITHUB_APP_SLUG=code-reviewer
```

Set Upstash Redis credentials for rate limiting:

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

The default rate limits are intentionally stricter on public repositories:

- one review every 15 minutes per PR
- one review every 30 minutes per user per PR
- 25 reviews per private repository per day
- 10 reviews per public repository per day
- one cooldown reply every 15 minutes per PR

For local development only, you can disable rate limiting:

```bash
CODE_REVIEWER_RATE_LIMIT_ENABLED=false
```

Production public deployments should keep rate limiting enabled. If Upstash is
unavailable, the default failure mode blocks public repositories and allows
private repositories.

## Development

```bash
pnpm install
pnpm dev
```

Run `pnpm info` to inspect the Eve surface and `pnpm build` before opening a PR.
Use `pnpm eval -- --skip-report` for lightweight agent behavior checks.
