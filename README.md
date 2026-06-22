<p align="center">
  <img src="./apps/web/app/icon.svg" alt="evex" width="96" height="96" />
</p>

<h1 align="center">evex</h1>

<p align="center">
  <strong>The eve agent registry.</strong><br />
  Discover, contribute, and install eve agents with a single shadcn command.
</p>

<p align="center">
  <a href="https://evex.sh"><strong>Live -> evex.sh</strong></a>
  &nbsp;·&nbsp;
  <a href="https://eve.dev/docs/introduction">eve docs</a>
  &nbsp;·&nbsp;
  <a href="./CONTRIBUTIONS.md">contributing agents</a>
</p>

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
pnpm check
pnpm fix
pnpm build
```

## Stack

Turborepo · Next.js · React · Tailwind CSS · shadcn/ui · Eve · Drizzle · Better Auth · Vercel
