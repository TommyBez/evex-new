# GitHub channel setup

Use when the agent should respond to `@mentions` on GitHub issues, pull requests,
or review comments. Eve docs: `node_modules/eve/docs/channels/github.mdx`.

## Route and channel file

- Webhook route: `POST /eve/v1/github`
- Channel file: `agent/channels/github.ts` exporting `githubChannel(...)`

Scaffold with `eve channels add github` or add the file by hand.

## GitHub App configuration

1. Create a GitHub App (Settings → Developer settings → GitHub Apps).
2. Set the webhook URL to `https://<deployment>/eve/v1/github`.
3. Generate a webhook secret and store it as `GITHUB_WEBHOOK_SECRET`.
4. Copy the App ID to `GITHUB_APP_ID`.
5. Generate a private key PEM and store it as `GITHUB_APP_PRIVATE_KEY` (use `\n`
   for newlines in a single-line env var).
6. Install the app on the target repositories.

## Webhook events

For mention-driven turns, subscribe to:

- `issue_comment`
- `pull_request_review_comment`

Add `issues`, `pull_request`, `check_suite`, `check_run`, or `workflow_run` only
when you wire custom `onIssue`, `onPullRequest`, or CI hooks in the channel file.

## Environment variables

```bash
GITHUB_APP_ID=
GITHUB_APP_PRIVATE_KEY=
GITHUB_WEBHOOK_SECRET=
GITHUB_APP_SLUG=          # matches the @mention users type
```

`botName` in the channel config can come from `GITHUB_APP_SLUG` when not set
explicitly.

## Minimal channel example

```ts
import { githubChannel } from "eve/channels/github";

export default githubChannel({
  botName: "my-agent",
  // credentials fall back to GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY,
  // and GITHUB_WEBHOOK_SECRET when the block is omitted
});
```

## Permissions

Use the narrowest permissions the agent needs. A PR review agent typically needs:

- Metadata: read
- Contents: read
- Pull requests: read/write
- Issues: read/write (for PR timeline comments)

## Verification

**Done when**:

- GitHub webhook deliveries to `/eve/v1/github` return HTTP 200 (including `ping`)
- An `@mention` on a PR or issue starts an agent turn
- `eve info --json` lists the `github` channel at `/eve/v1/github`

Common failures:

- HTTP 401: `GITHUB_WEBHOOK_SECRET` does not match the GitHub App webhook secret
- No response to mentions: wrong event subscription, app not installed on the
  repo, or `botName` / `GITHUB_APP_SLUG` mismatch

See [channel-routes](./channel-routes.md) for health and session smoke tests.
