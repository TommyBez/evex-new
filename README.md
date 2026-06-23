<p align="center">
  <img src="./apps/web/app/icon.svg" alt="evex logo" width="96" height="96" />
</p>

<h1 align="center">evex</h1>

<p align="center">
  <strong>The eve agent registry.</strong><br />
  Discover, contribute, and install eve agents with a single shadcn command.
</p>

<p align="center">
  <a href="https://evex.sh"><img alt="Live at evex.sh" src="https://shieldcn.dev/badge/live-evex.sh-22c55e.png?statusDot=true" /></a>
  <a href="https://github.com/TommyBez/evex"><img alt="GitHub stars" src="https://shieldcn.dev/github/stars/TommyBez/evex.png?logo=github" /></a>
  <a href="#agents"><img alt="Agents in the catalog" src="https://shieldcn.dev/badge/agents-5-006bff.png" /></a>
  <a href="#install-an-agent"><img alt="Install with shadcn" src="https://shieldcn.dev/badge/install-shadcn-000000.png?logo=shadcnui&logoColor=white" /></a>
  <a href="./CONTRIBUTIONS.md"><img alt="Pull requests welcome" src="https://shieldcn.dev/badge/PRs-welcome-006bff.png" /></a>
</p>

<p align="center">
  <a href="https://evex.sh"><strong>Live -> evex.sh</strong></a>
  &nbsp;·&nbsp;
  <a href="https://eve.dev/docs/introduction">eve docs</a>
  &nbsp;·&nbsp;
  <a href="#agents">agents</a>
  &nbsp;·&nbsp;
  <a href="./CONTRIBUTIONS.md">contributing agents</a>
</p>

---

**evex** is an open registry of [Eve](https://eve.dev) agents — small, code-owned
automations you install straight into an Eve app with the `shadcn` CLI. Every
agent is a reviewed, source-owned package: the registry serves its metadata and
files, while the web app at [evex.sh](https://evex.sh) tracks installs,
favorites, and author profiles.

## Install an agent

```bash
# one-time setup
npx shadcn@latest registry add @evex=https://evex.sh/r/{name}.json

# run from an existing Eve app
npx shadcn@latest add @evex/code-reviewer
```

Direct URL installs work too:

```bash
npx shadcn@latest add https://evex.sh/r/code-reviewer.json
```

## Agents

| Agent | What it does | Category |
| --- | --- | --- |
| **[Code Reviewer](https://evex.sh/agents/code-reviewer)** | GitHub PR reviewer — mention it on a pull request for a native review with inline comments, suggestion blocks, and rate limiting on public repos. | `coding` |
| **[GitHub Release Scout](https://evex.sh/agents/github-release-scout)** | Gathers recently merged PRs and drafts release notes that trace back to PR numbers, labels, and rollout risk. | `devops` |
| **[Incident Commander](https://evex.sh/agents/incident-commander)** | Runs the first thirty minutes of an outage — builds a factual timeline, tracks action items, and drafts stakeholder updates. | `devops` |
| **[Linear Sprint Triage](https://evex.sh/agents/linear-sprint-triage)** | Pulls Linear issues, surfaces unassigned or high-priority work, and separates delivery risk from backlog hygiene. | `productivity` |
| **[Resend Lifecycle Mailer](https://evex.sh/agents/resend-lifecycle-mailer)** | Builds event-driven lifecycle emails, previews recipients and HTML, and only sends through Resend when dry-run is off. | `support` |

Browse the full catalog at [evex.sh](https://evex.sh).

## Registry

| Resource | URL |
| --- | --- |
| Catalog | `https://evex.sh/r/registry.json` |
| Item template | `https://evex.sh/r/{name}.json` |

Agent metadata and files are code-owned under
`packages/agent-registry/agents/<slug>`. Runtime data such as installs,
favorites, auth, and profiles lives in the web app database.

## Contributing

Agents are added or changed by pull request. The full workflow is in
[CONTRIBUTIONS.md](./CONTRIBUTIONS.md), including package structure,
`registry.json`, dependencies, author identity, and validation commands.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to run the app locally.

```bash
pnpm check   # lint + format check (ultracite / biome)
pnpm fix     # auto-fix lint and formatting
pnpm build   # build the web app and agent packages
```

Requires Node >= 24 and pnpm. See [AGENTS.md](./AGENTS.md) for environment
variables (database, auth) and other setup notes.

## Stack

<p align="center">
  <img alt="Turborepo" src="https://shieldcn.dev/badge/Turborepo-000000.png?logo=turborepo&variant=branded" />
  <img alt="Next.js" src="https://shieldcn.dev/badge/Next.js-000000.png?logo=nextdotjs&variant=branded" />
  <img alt="React" src="https://shieldcn.dev/badge/React-61DAFB.png?logo=react&variant=branded" />
  <img alt="Tailwind CSS" src="https://shieldcn.dev/badge/Tailwind_CSS-06B6D4.png?logo=tailwindcss&variant=branded" />
  <img alt="shadcn/ui" src="https://shieldcn.dev/badge/shadcn-000000.png?logo=shadcnui&variant=branded" />
  <img alt="Eve" src="https://shieldcn.dev/badge/Eve-006bff.png?variant=branded" />
  <img alt="Drizzle ORM" src="https://shieldcn.dev/badge/Drizzle-C5F74F.png?logo=drizzle&variant=branded" />
  <img alt="Better Auth" src="https://shieldcn.dev/badge/Better_Auth-000000.png?logo=betterauth&variant=branded" />
  <img alt="Vercel" src="https://shieldcn.dev/badge/Vercel-000000.png?logo=vercel&variant=branded" />
</p>

## Star history

<p align="center">
  <a href="https://github.com/TommyBez/evex">
    <img alt="evex star history" src="https://shieldcn.dev/chart/github/stars/TommyBez/evex.png?color=006bff" />
  </a>
</p>

<p align="center">
  <sub>Badges &amp; charts by <a href="https://shieldcn.dev">shieldcn</a>.</sub>
</p>
