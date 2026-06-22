# Contributing Agents

evex agents are source-owned packages reviewed through pull requests. The
database stores runtime state only; canonical agent metadata, files,
dependencies, and author identity live in the agent package registry file.

## Package layout

Create each agent under:

```text
packages/agent-registry/agents/<slug>/
  package.json
  README.md
  agent/
    agent.ts
    ...
  registry.json
```

The `agent/` directory contains the Eve source that will be installed into a
consumer Eve app. `README.md` is installed as the agent readme. Do not include
app-level project files such as `package.json`, `tsconfig.json`, or lockfiles in
the public registry item.

## Author identity

`registry.json` must define top-level `author` as the GitHub username of the
agent author:

```json
{
  "author": "githubUsername"
}
```

This value is the canonical public author identity for the registry item.
Reviewers must verify it during PR review. User/profile enrichment in the web
app is joined only through a verified GitHub OAuth username stored on the user
account; manually edited profile links are never used for ownership.

For scaffold convenience, put the same GitHub username in `package.json`:

```json
{
  "author": "githubUsername"
}
```

The scaffold also accepts:

```json
{
  "author": {
    "name": "githubUsername"
  }
}
```

If `package.json.author` is missing, the scaffold omits `author` from
`registry.json`; the author can add it manually before opening the PR.

## Dependencies

`package.json.dependencies` has two jobs:

- it makes the agent package usable during local development;
- it gives the scaffold an initial list for `registry.json.dependencies`.

After `registry.json` exists, the public registry reads
`registry.json.dependencies`. The generator does not infer or overwrite
dependencies from `package.json`; authors can edit the public dependency list
manually.

Use `dependencies` for packages needed at runtime by the installed agent. Keep
tooling and type-only packages in `devDependencies`.

## Scaffold flow

Create the package source, then run:

```bash
pnpm --filter @evex/agent-registry registry:scaffold <slug>
```

The scaffold reads:

- `README.md` for title and description fallbacks;
- `package.json.description`;
- `package.json.dependencies`;
- `package.json.author` or `package.json.author.name`.

It writes an editable `registry.json`. Treat that file as the source of truth
from this point on.

## Editing registry.json

Each agent `registry.json` contains exactly one item:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "items": [
    {
      "name": "my-agent",
      "type": "registry:item",
      "title": "My Agent",
      "description": "What the agent does.",
      "author": "githubUsername",
      "categories": ["coding"],
      "dependencies": ["eve@^0.11.4", "zod@4.3.6"],
      "files": [
        {
          "path": "agent/agent.ts",
          "type": "registry:file",
          "target": "~/agent/agent.ts"
        },
        {
          "path": "README.md",
          "type": "registry:file",
          "target": "~/agent/README.md"
        }
      ],
      "meta": {
        "slug": "my-agent",
        "category": "coding",
        "createdAt": "2026-06-22T00:00:00.000Z",
        "updatedAt": "2026-06-22T00:00:00.000Z"
      }
    }
  ]
}
```

Rules:

- `name` must match the agent folder slug.
- `author` is a GitHub username.
- `dependencies` is the public install dependency list.
- `files` declares every installed file.
- declared file paths must be `README.md` or stay inside `agent/`.
- `meta.author` is not used.

The generator enriches item endpoints with file `content` by reading the
declared files. The catalog endpoint keeps file descriptors only and does not
include content.

## Generate and validate

After editing an agent registry file, regenerate the package output:

```bash
pnpm --filter @evex/agent-registry generate
```

Then run:

```bash
pnpm --filter @evex/agent-registry run check
pnpm check
pnpm build
```

For a narrow registry-only change, at minimum run the registry generate and
registry check commands.

## Review checklist

Before merging a PR:

- `registry.json.author` is present and is the author's GitHub username.
- `registry.json.dependencies` contains the public runtime dependencies.
- `package.json.dependencies` supports local agent development.
- declared files are readable and stay under `agent/` or `README.md`.
- generated `packages/agent-registry/src/generated/registry.ts` is up to date.
- the web build still passes if the change affects public rendering.
