# Product Marketing Context

*Last updated: 2026-06-19*

> Auto-drafted from the repository. Replace assumptions, TBDs, and internal language with customer research, real objections, and live business metrics as they become available.

## Product Overview
**One-liner:** evex-new is the eve agent registry: a community catalog where developers discover, publish, and install reusable eve agent configurations with a shadcn command.

**What it does:** evex-new lets developers browse community-built agents, inspect the files each agent will write into the `agent/` directory of an eve project, and install them through a shadcn-compatible registry flow. It also gives authors a way to publish their own agents, optionally import a public GitHub folder, and build reputation through author profiles, install counts, and the leaderboard.

**Product category:** Developer tool, agent registry, shadcn-compatible distribution layer for eve agents.

**Product type:** Community registry / developer marketplace.

**Business model:** Not explicit in the repo today. The current product appears free and self-serve; pricing and monetization are TBD.

## Target Audience
**Target companies:** AI-native product teams, indie developers, and engineering teams already building with eve or evaluating reusable agent workflows.

**Decision-makers:** Primary users are individual developers and agent authors. Secondary stakeholders are engineering managers, DevEx/platform leads, and founders who want reusable agent workflows without building every agent from scratch.

**Primary use case:** Install a useful eve agent into a project without hand-writing the config, instructions, and tool files.

**Jobs to be done:**
- Find a ready-made eve agent for a specific workflow and install it quickly.
- Evaluate what an agent actually does before trusting it in a project.
- Publish and share an agent configuration so others can reuse it.

**Use cases:**
- Add a coding, research, support, data, productivity, or devops agent to an eve project.
- Turn a public GitHub agent folder into a reusable registry item.
- Discover what the community is using through categories, author pages, installs, and the leaderboard.

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Eve developer | Speed, clarity, low setup friction | Building or wiring an agent from scratch takes time and creates uncertainty | Find an agent, inspect the files, and install it with a repeatable command |
| Agent author | Reach, credibility, reuse | Sharing agent folders through repos or snippets is manual and hard to standardize | Publish once, get a clean registry page, and let others install your work easily |
| DevEx / platform lead | Standardization, reuse, lower support burden | Teams reinvent the same agent scaffolding and pass around inconsistent folders | Provide a common distribution path and a visible catalog of reusable agents |
| Engineering manager / founder | Faster experimentation, leverage from the team | AI-agent work can become one-off, fragile, and hard to scale across projects | Make successful agent patterns discoverable and reusable across the team |

## Problems & Pain Points
**Core problem:** Reusable eve agents are hard to discover, evaluate, standardize, and install. Without a registry, teams end up copying folders from docs, gists, or GitHub by hand.

**Why alternatives fall short:**
- GitHub repos and snippets are not installable in one step.
- Copy-pasting agent files makes dependencies, paths, and setup easy to miss.
- Framework docs help developers start, but they do not solve discovery or distribution of community agents.
- Private folders and internal snippets are hard to share, compare, and reuse across teams.

**What it costs them:** Slower time to first useful agent, duplicated setup work, lower reuse, configuration mistakes, and less confidence in what an installed agent will actually create in the project.

**Emotional tension:** Developers want a working agent, not another half-documented folder to wire up by hand. The tension is speed versus trust.

## Competitive Landscape
**Direct:** No canonical direct competitor list is captured in the repo yet. The closest direct competition is any catalog or registry focused on reusable agent configurations for AI frameworks. This needs explicit market validation.

**Secondary:** GitHub repos, starter templates, docs snippets, and internal folder sharing solve the same problem but fall short because they are manual, inconsistent, and harder to evaluate before install.

**Indirect:** Building every agent from scratch, or avoiding specialized agents entirely, falls short because it slows experimentation and reduces reuse.

## Differentiation
**Key differentiators:**
- One-command install through shadcn, with optional `@evex-new` namespace setup.
- eve-native file layout under `agent/`.
- Full file preview before install.
- Automatic npm dependency declaration support.
- GitHub folder import for publishers.
- Install tracking, author pages, and a public leaderboard.

**How we do it differently:** Instead of treating agents as copy-paste examples, evex-new packages them as registry items developers can browse, inspect, install, and publish in a consistent format.

**Why that's better:** Developers get faster setup, lower risk, a clearer trust surface, and an easier path from individual experiments to reusable community assets.

**Why customers choose us:** They want the fastest path from "I need an agent for this job" to "it is in my eve project and I can inspect every file."

## Objections
| Objection | Response |
|-----------|----------|
| "I can just copy this from GitHub." | Copying works once. evex-new makes the install repeatable, preserves the expected `agent/` structure, surfaces dependencies, and keeps the agent browseable for the next person too. |
| "I do not trust community agents." | evex-new leans into transparent files, author identity, and install counts so users can inspect exactly what they are adding before they run it. |
| "We are not using eve." | evex-new is built specifically for eve projects. If a team is not on eve, they are outside the best-fit audience today. |

**Anti-persona:** Non-technical end users, teams looking for a hosted agent runtime, and teams not using eve.

## Switching Dynamics
**Push:** Manual copy-paste setup, inconsistent agent folders, low discoverability, unclear dependencies, and repeated reinvention.

**Pull:** One-command install, transparent file previews, community discovery, install/social proof, and easy publishing.

**Habit:** Teams already have private snippets, GitHub folders, or a "we will build it ourselves" default.

**Anxiety:** Concerns about agent quality, security, maintenance, and whether a community agent will actually fit the project.

## Customer Language
Current language below is inferred from product copy and UX. Replace with verbatim customer quotes once you have interviews or support data.

**How they describe the problem:**
- "I want an agent that is one command away."
- "I need a ready-made eve agent, not another folder to wire up by hand."
- "Show me what files this agent will add before I install it."

**How they describe us:**
- "the eve agent registry"
- "Install Community Agents with One Command"
- "Browse -> pick -> copy -> install"

**Words to use:** registry, install, publish, community agents, eve project, agent configuration, one command, preview files, install count.

**Words to avoid:** hosted agent platform, no-code, autonomous employee, plug-and-play magic, full marketplace language unless commerce becomes part of the story.

**Glossary:**
| Term | Meaning |
|------|---------|
| eve | The framework evex-new is built around and distributed into |
| evex-new | The registry/community layer for reusable eve agents |
| agent | A bundle of config, instructions, and optionally tools under `agent/` |
| registry item | The shadcn-compatible package representation of an agent |
| namespace setup | The one-time `@evex-new` registry configuration step |
| install count | Public signal of how often an agent has been added |

## Brand Voice
**Tone:** Developer-native, direct, concise, credible.

**Style:** Technical but readable. Prefer commands, file paths, concrete workflows, and plain language over hype.

**Personality:** Precise, transparent, pragmatic, community-driven, low-fluff.

## Proof Points
**Metrics:** The homepage surfaces live counts for agents, installs, and authors. Install counts are tracked when registry items are fetched and are used in the leaderboard. Actual business metrics are not documented in the repo.

**Customers:** No customer logos or named design partners are visible in the repo yet.

**Testimonials:** No testimonials are captured in the repo yet.

> "Review the generated files and configure any credentials required by the agent before running it."
>
> Current product docs language that reinforces transparency and trust.

**Value themes:**
| Theme | Proof |
|-------|-------|
| Faster time-to-install | Hero demo and agent pages show setup once plus install-agent commands |
| Transparency before trust | Agent detail pages expose files, descriptions, dependencies, author identity, and installs |
| Reuse and distribution | The publish flow turns agent folders into reusable registry items |
| Community discovery | Browse, categories, author pages, install counts, and the leaderboard |
| Low-friction authoring | GitHub folder import prefills files for review before publishing |

## Goals
**Business goal:** The inferred goal is to grow both sides of the registry: more quality agents, more installs, and more repeat publishing from authors.

**Conversion action:** Primary consumer action is to add the registry and install an agent. Primary creator action is to sign up and publish an agent.

**Current metrics:** Not documented in the repo beyond live product counters and install tracking.
