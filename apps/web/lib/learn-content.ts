export type LearnClusterId =
  | 'agent-engineering'
  | 'eve-architecture'
  | 'protocols'
  | 'comparisons'
  | 'distribution'

export interface LearnFaq {
  answer: string
  question: string
}

export interface LearnPage {
  antiPattern: string
  audience: string
  cluster: LearnClusterId
  decisionRules: readonly string[]
  description: string
  eveAngle: string
  faqs: readonly LearnFaq[]
  nonEveExample: string
  primaryKeyword: string
  problem: string
  relatedKeywords: readonly string[]
  shortTitle: string
  slug: string
  thesis: string
  title: string
}

export interface LearnCluster {
  description: string
  id: LearnClusterId
  label: string
}

export const LEARN_CLUSTERS: readonly LearnCluster[] = [
  {
    id: 'agent-engineering',
    label: 'Agent engineering',
    description:
      'Concepts developers need before they turn a chat loop into production software.',
  },
  {
    id: 'eve-architecture',
    label: 'Eve architecture',
    description:
      'Eve as a case study for filesystem-first, durable TypeScript agents.',
  },
  {
    id: 'protocols',
    label: 'Protocols and integrations',
    description:
      'How MCP, channels, tools, skills, and connections fit into agent systems.',
  },
  {
    id: 'comparisons',
    label: 'Comparisons',
    description:
      'Plain-English tradeoffs between Eve and adjacent agent frameworks or distribution models.',
  },
  {
    id: 'distribution',
    label: 'Distribution',
    description:
      'How reusable agent files move across teams without becoming opaque packages.',
  },
] as const

const COMMON_FAQ = {
  copyDocs: {
    question: 'Is this a replacement for the official Eve docs?',
    answer:
      'No. The official docs explain the API and project model. This page focuses on architecture decisions, tradeoffs, and when a pattern is useful.',
  },
  evexRole: {
    question: 'Where does evex fit?',
    answer:
      'evex is the distribution layer for reusable Eve agent configurations. Use it when you want to inspect and install working agent files instead of rebuilding the same layout by hand.',
  },
} as const

function makeFaq(topic: string, answer: string): readonly LearnFaq[] {
  return [
    {
      question: `What is the main decision behind ${topic}?`,
      answer,
    },
    COMMON_FAQ.copyDocs,
    COMMON_FAQ.evexRole,
  ]
}

export const LEARN_PAGES: readonly LearnPage[] = [
  {
    slug: 'tools-vs-skills-vs-subagents',
    title: 'Tools vs skills vs subagents: how to choose the right abstraction',
    shortTitle: 'Tools vs skills vs subagents',
    description:
      'A practical decision guide for choosing between callable tools, loaded skills, and delegated subagents in AI agent systems.',
    cluster: 'agent-engineering',
    primaryKeyword: 'tools vs skills vs subagents',
    relatedKeywords: ['AI agent tools', 'agent skills', 'subagents'],
    audience: 'Developers designing agent capabilities',
    thesis:
      'Use a tool when the agent needs an action, a skill when it needs a playbook, and a subagent when another reasoning loop should own the work.',
    problem:
      'Teams often turn every capability into a tool because tools feel concrete. That makes agents brittle. Some work needs procedure, some work needs data access, and some work needs a separate context window.',
    eveAngle:
      'Eve makes the distinction visible in the file tree: `tools/` holds typed actions, `skills/` holds loaded guidance, and `subagents/` holds specialists. The shape of the directory becomes an architecture review.',
    nonEveExample:
      'In LangGraph, this maps to nodes and callable functions. In Claude Code, it maps to tool calls, skills, and subagents. The names vary, but the control question is the same.',
    antiPattern:
      'Do not turn a multi-step judgment into a single mega-tool. The model loses visibility into the intermediate choices, and failures become harder to debug.',
    decisionRules: [
      'Choose a tool for deterministic input/output work such as querying an API.',
      'Choose a skill for repeatable judgment such as reviewing a pull request.',
      'Choose a subagent when a task needs its own memory, tools, or acceptance criteria.',
    ],
    faqs: makeFaq(
      'tools vs skills vs subagents',
      'The decision is about control. Tools execute, skills instruct, and subagents reason independently before returning a result.',
    ),
  },
  {
    slug: 'durable-ai-agents',
    title: 'Durable AI agents: why saving chat history is not enough',
    shortTitle: 'Durable AI agents',
    description:
      'A guide to durable execution, checkpoints, retries, approval pauses, and why production agents need more than conversation memory.',
    cluster: 'agent-engineering',
    primaryKeyword: 'durable AI agents',
    relatedKeywords: ['durable execution', 'agent checkpoints', 'AI workflows'],
    audience: 'Engineers shipping long-running agent workflows',
    thesis:
      'Durability means the run can survive failures without repeating expensive or dangerous side effects.',
    problem:
      'A chat transcript can tell you what the model said, but it cannot prove which tool already ran, which approval was granted, or whether a retry would send the same email twice.',
    eveAngle:
      'Eve treats sessions as durable work rather than disposable requests. That matters when an agent pauses for a human, calls tools, or resumes after a deployment.',
    nonEveExample:
      'Temporal, LangGraph checkpointing, and workflow engines solve similar problems with event histories, resumable steps, and explicit retry boundaries.',
    antiPattern:
      'Do not rely on an LLM to remember that a side effect already happened. Persist the boundary where the side effect completed.',
    decisionRules: [
      'Use durable execution when runs can outlive a single request.',
      'Persist approvals with the exact artifact that was approved.',
      'Test recovery by crashing after tool calls, not only before them.',
    ],
    faqs: makeFaq(
      'durable AI agents',
      'The main decision is whether a failed run may safely restart from scratch. If not, the agent needs durable execution boundaries.',
    ),
  },
  {
    slug: 'human-in-the-loop-agents',
    title: 'Human-in-the-loop agents: approval gates without unsafe replay',
    shortTitle: 'Human-in-the-loop agents',
    description:
      'How to design human approval flows for AI agents without losing auditability or replay safety.',
    cluster: 'agent-engineering',
    primaryKeyword: 'human in the loop agents',
    relatedKeywords: ['agent approvals', 'AI approval workflow', 'HITL agents'],
    audience: 'Teams adding approval gates to agent workflows',
    thesis:
      'Human review is not just UX. It is a state transition that must survive retries, timeouts, and changed artifacts.',
    problem:
      'Many agents ask for approval in chat, then continue with mutable context. That is fine for drafts and dangerous for writes, deploys, billing changes, or customer messages.',
    eveAngle:
      'Eve agents can model approval as part of the runtime flow, while evex-distributed agents can include the exact instructions and files that enforce review points.',
    nonEveExample:
      'Workflow engines often treat approval as a callback or signal. The common pattern is to pause compute, persist the pending state, and resume only with a valid response.',
    antiPattern:
      'Do not approve a summary while executing a different payload. The reviewed object and the executed object must match.',
    decisionRules: [
      'Require approval for external writes, irreversible actions, and user-visible messages.',
      'Store the approved payload, reviewer, timestamp, and next action.',
      'Timeout approvals deliberately instead of letting stale runs linger silently.',
    ],
    faqs: makeFaq(
      'human-in-the-loop agents',
      'The core decision is which actions deserve a durable pause because a mistaken retry or changed payload would create risk.',
    ),
  },
  {
    slug: 'scheduled-ai-agents',
    title: 'Scheduled AI agents: when cron is not enough',
    shortTitle: 'Scheduled AI agents',
    description:
      'How scheduled agents differ from cron jobs, and how to design recurring AI work that can recover, report, and stay useful.',
    cluster: 'agent-engineering',
    primaryKeyword: 'scheduled AI agents',
    relatedKeywords: ['AI cron jobs', 'recurring agents', 'agent schedules'],
    audience: 'Developers building recurring AI workflows',
    thesis:
      'A scheduled agent is a recurring judgment loop, not just a timer that wakes up code.',
    problem:
      'Cron can trigger work, but it does not decide what changed, what deserves attention, how to summarize it, or how to recover from a half-finished run.',
    eveAngle:
      'Eve has a `schedules/` home for recurring work. That makes scheduled behavior inspectable next to tools, instructions, and delivery channels.',
    nonEveExample:
      'n8n, GitHub Actions, and managed workflow platforms can trigger scheduled AI tasks, but the agent still needs policies for retries, dedupe, and summaries.',
    antiPattern:
      'Do not create scheduled noise. If a daily agent posts nothing useful three days in a row, it needs better filtering or a lower cadence.',
    decisionRules: [
      'Use schedules for recurring monitoring, digests, hygiene, and reporting.',
      'Design idempotency before the first production run.',
      'Make “no meaningful change” a valid output.',
    ],
    faqs: makeFaq(
      'scheduled AI agents',
      'The decision is whether the job needs judgment, context, and recovery. If it only runs a deterministic task, cron may be enough.',
    ),
  },
  {
    slug: 'agent-channels',
    title:
      'Agent channels: separating where messages arrive from how work runs',
    shortTitle: 'Agent channels',
    description:
      'A practical explanation of agent channels across Slack, GitHub, HTTP, and other entry points.',
    cluster: 'agent-engineering',
    primaryKeyword: 'agent channels',
    relatedKeywords: ['Slack AI agent', 'GitHub agent channel', 'HTTP agent'],
    audience: 'Teams connecting agents to real user surfaces',
    thesis:
      'A channel should translate platform events into agent work without leaking platform details into every tool.',
    problem:
      'Agents often start as a chat endpoint. Then Slack threads, GitHub webhooks, and HTTP clients all get bolted onto the same handler until behavior becomes hard to reason about.',
    eveAngle:
      'Eve gives channels their own directory, so Slack delivery, GitHub events, and HTTP routes can feed the same agent runtime without becoming the whole agent.',
    nonEveExample:
      'Bot frameworks and webhook handlers solve ingress too, but they often leave the reasoning loop and durable state model to application code.',
    antiPattern:
      'Do not put business policy inside Slack formatting code. Keep platform translation separate from the agent’s actual work.',
    decisionRules: [
      'Use a channel when the same agent should serve a specific surface.',
      'Normalize events before they reach tools.',
      'Keep auth, formatting, and delivery close to the channel.',
    ],
    faqs: makeFaq(
      'agent channels',
      'The decision is whether a platform deserves its own ingress and delivery rules while sharing the same core agent behavior.',
    ),
  },
  {
    slug: 'agent-sandboxing',
    title: 'Agent sandboxing: where autonomous code should be allowed to run',
    shortTitle: 'Agent sandboxing',
    description:
      'How to think about sandboxes for AI agents that read files, run commands, or generate code.',
    cluster: 'agent-engineering',
    primaryKeyword: 'AI agent sandbox',
    relatedKeywords: [
      'agent security',
      'sandboxed code execution',
      'AI code agents',
    ],
    audience: 'Developers running agents with filesystem or shell access',
    thesis:
      'Sandboxing is the line between useful autonomy and accidental damage.',
    problem:
      'A coding agent that can run commands is powerful, but the blast radius changes when it can read secrets, mutate repositories, or call external services.',
    eveAngle:
      'Eve includes sandbox concepts in the agent layout, which makes execution boundaries part of the authored agent rather than an afterthought.',
    nonEveExample:
      'AutoGen-style code execution, containerized workers, and cloud sandboxes all solve the same trust problem with different ergonomics.',
    antiPattern:
      'Do not give broad shell access to compensate for missing tools. Build narrow tools first, and widen the sandbox only when the job requires it.',
    decisionRules: [
      'Start with read-only or isolated workspaces for exploratory agents.',
      'Treat secrets and network access as separate permissions.',
      'Log commands and file writes for later review.',
    ],
    faqs: makeFaq(
      'agent sandboxing',
      'The main decision is how much authority the agent needs to complete real work without putting unrelated systems at risk.',
    ),
  },
  {
    slug: 'agent-observability',
    title: 'Agent observability: traces, runs, decisions, and cost',
    shortTitle: 'Agent observability',
    description:
      'What to log and inspect when AI agents use tools, delegate work, retry, or run in the background.',
    cluster: 'agent-engineering',
    primaryKeyword: 'agent observability',
    relatedKeywords: [
      'AI agent tracing',
      'agent run logs',
      'LLM observability',
    ],
    audience: 'Teams debugging production agents',
    thesis:
      'If you cannot replay the decision path, you cannot operate the agent with confidence.',
    problem:
      'Traditional logs show function calls. Agent runs also need model prompts, tool choices, approvals, token cost, retries, and final delivery state.',
    eveAngle:
      'Eve’s runtime model treats agent runs as inspectable work. evex complements that by making the installed files visible before the run ever starts.',
    nonEveExample:
      'LangSmith, OpenTelemetry, vendor dashboards, and custom traces all try to answer the same question: why did the agent do that?',
    antiPattern:
      'Do not log only the final answer. The failure usually lives in retrieved context, tool arguments, or a missed guardrail.',
    decisionRules: [
      'Trace model calls, tool inputs, tool outputs, approvals, and delivery attempts.',
      'Capture enough context to debug without exposing secrets.',
      'Track cost per run type, not only aggregate token spend.',
    ],
    faqs: makeFaq(
      'agent observability',
      'The decision is which parts of the agent loop must be inspectable to explain failures and control cost.',
    ),
  },
  {
    slug: 'agent-memory-vs-state',
    title: 'Agent memory vs state: what should the model remember?',
    shortTitle: 'Agent memory vs state',
    description:
      'A decision guide for separating model memory, durable state, session history, and application data.',
    cluster: 'agent-engineering',
    primaryKeyword: 'agent memory vs state',
    relatedKeywords: ['AI agent memory', 'agent state', 'conversation state'],
    audience: 'Developers designing long-lived agent products',
    thesis:
      'Memory helps the model reason. State tells the system what has happened and what is allowed next.',
    problem:
      'Teams overuse memory for facts that belong in a database and underuse state for workflow decisions that must be exact.',
    eveAngle:
      'Eve’s durable session model is useful because it keeps runtime state separate from authored instructions and tool code.',
    nonEveExample:
      'LangGraph exposes state directly in graph execution, while chat products often hide state behind conversation history.',
    antiPattern:
      'Do not store authorization, approvals, or billing status as natural-language memories. Persist those as typed application state.',
    decisionRules: [
      'Use memory for preference and context that can tolerate fuzziness.',
      'Use state for workflow position, permissions, and completed side effects.',
      'Use retrieval for external knowledge that changes independently of the run.',
    ],
    faqs: makeFaq(
      'agent memory vs state',
      'The decision is whether the information must be exact. Exact information belongs in state, not model memory.',
    ),
  },
  {
    slug: 'agent-evals',
    title: 'Agent evals: testing behavior instead of vibes',
    shortTitle: 'Agent evals',
    description:
      'How to evaluate AI agents with scenarios, tool expectations, and regression checks.',
    cluster: 'agent-engineering',
    primaryKeyword: 'agent evals',
    relatedKeywords: ['AI agent evaluation', 'LLM evals', 'agent tests'],
    audience: 'Teams reviewing agent quality before release',
    thesis:
      'Agent evals should test decisions, tool use, and refusal behavior, not only answer style.',
    problem:
      'A demo can look good while the agent fails on edge cases, unsafe actions, or routine workflow changes.',
    eveAngle:
      'Eve agents can ship with eval files next to the agent source. evex can distribute those evals with the rest of the agent so users inherit the quality bar.',
    nonEveExample:
      'OpenAI evals, LangSmith datasets, and CI checks all serve the same role: make behavior regressions visible before users find them.',
    antiPattern:
      'Do not evaluate only happy-path prompts. The bugs that matter are usually ambiguous, adversarial, or boringly repetitive.',
    decisionRules: [
      'Write evals for tool calls, approval boundaries, and “do nothing” cases.',
      'Keep fixtures close to the agent files they test.',
      'Run evals before publishing reusable agents.',
    ],
    faqs: makeFaq(
      'agent evals',
      'The main decision is which behaviors would damage trust if they regressed silently.',
    ),
  },
  {
    slug: 'filesystem-first-agents',
    title: 'Filesystem-first agents: why agent architecture can live in files',
    shortTitle: 'Filesystem-first agents',
    description:
      'A practical look at filesystem-first agent design, where folders encode capabilities and reviewability.',
    cluster: 'eve-architecture',
    primaryKeyword: 'filesystem-first agents',
    relatedKeywords: ['Eve agent framework', 'agent project structure'],
    audience: 'Developers comparing agent architecture styles',
    thesis:
      'Filesystem-first design makes agent capability visible before the code runs.',
    problem:
      'Large configuration objects can hide what an agent can do. A reviewer has to inspect code paths instead of reading the project shape.',
    eveAngle:
      'Eve’s core bet is that the `agent/` tree is the authoring interface. Instructions, tools, skills, channels, and schedules each get a predictable home.',
    nonEveExample:
      'Graph and code-first frameworks offer more explicit control flow, but the capability inventory often lives inside application code.',
    antiPattern:
      'Do not treat the file tree as decoration. If a capability is real, put it where future maintainers expect to find it.',
    decisionRules: [
      'Use filesystem-first design when reviewability and ownership matter.',
      'Use code-first graphs when dynamic routing is the dominant complexity.',
      'Keep generated files readable enough for human review.',
    ],
    faqs: makeFaq(
      'filesystem-first agents',
      'The decision is whether visible project structure is more valuable than centralizing all behavior in code.',
    ),
  },
  {
    slug: 'eve-project-structure',
    title: 'Eve project structure: reading an agent before you run it',
    shortTitle: 'Eve project structure',
    description:
      'How to inspect an Eve agent project as an architecture document, not just a folder of files.',
    cluster: 'eve-architecture',
    primaryKeyword: 'Eve project structure',
    relatedKeywords: ['Eve agent directory', 'agent folder structure'],
    audience: 'Developers evaluating or reviewing Eve agents',
    thesis:
      'An Eve project tree should answer what the agent knows, what it can do, where it listens, and when it acts.',
    problem:
      'Reusable agents are hard to trust when the install surface does not reveal capabilities, dependencies, and entry points.',
    eveAngle:
      'The Eve layout gives reviewers a checklist: `instructions.md`, `tools/`, `skills/`, `channels/`, `connections/`, `schedules/`, and shared `lib/` code.',
    nonEveExample:
      'In many Python agent stacks, equivalent capabilities may live in decorators, graph nodes, YAML, and runtime wiring spread across files.',
    antiPattern:
      'Do not bury external writes or scheduled behavior in generic helpers. A reviewer should see them from the top-level agent layout.',
    decisionRules: [
      'Start inspection with channels and schedules because they trigger runs.',
      'Read tools next because they define the agent’s authority.',
      'Read skills and instructions to understand judgment and tone.',
    ],
    faqs: makeFaq(
      'Eve project structure',
      'The main decision is whether the file layout clearly exposes the agent’s capabilities before installation.',
    ),
  },
  {
    slug: 'eve-tools',
    title: 'Eve tools as typed authority boundaries',
    shortTitle: 'Eve tools',
    description:
      'How to think about Eve tools as the boundary between model reasoning and executable authority.',
    cluster: 'eve-architecture',
    primaryKeyword: 'Eve tools',
    relatedKeywords: ['defineTool', 'AI agent tools', 'typed agent tools'],
    audience: 'TypeScript developers building agent actions',
    thesis:
      'A tool is not just a helper function. It is a permission the model can request.',
    problem:
      'Teams write tools for convenience, then accidentally expose broad authority with vague descriptions and loose inputs.',
    eveAngle:
      'Eve tools live as files and use typed schemas, which makes each callable action reviewable as a separate permission boundary.',
    nonEveExample:
      'MCP tools and OpenAI function calls use the same broad idea: describe a callable action with validated inputs and observable outputs.',
    antiPattern:
      'Do not create a `run_anything` tool unless the sandbox and approvals are strong enough to handle anything.',
    decisionRules: [
      'Give every tool one clear action and one clear risk profile.',
      'Validate inputs at the tool boundary.',
      'Describe side effects plainly in the tool description.',
    ],
    faqs: makeFaq(
      'Eve tools',
      'The decision is what authority the model should be able to request through a typed interface.',
    ),
  },
  {
    slug: 'eve-skills',
    title: 'Eve skills: keeping procedures out of the always-on prompt',
    shortTitle: 'Eve skills',
    description:
      'Why skills are useful when agents need repeatable domain procedure without bloating the system prompt.',
    cluster: 'eve-architecture',
    primaryKeyword: 'Eve skills',
    relatedKeywords: ['agent skills', 'AI skills', 'SKILL.md'],
    audience: 'Developers packaging agent knowledge',
    thesis:
      'Skills are best for procedures the agent should load only when the task calls for them.',
    problem:
      'Stuffing every workflow into the main instructions makes agents harder to steer and more expensive to run.',
    eveAngle:
      'Eve gives skills their own directory, so longer playbooks can travel with an agent while staying outside the default prompt.',
    nonEveExample:
      'Claude Code skills and portable `SKILL.md` folders solve the same context problem across coding agents.',
    antiPattern:
      'Do not put hard authority inside a skill. A skill can guide behavior, but tools and runtime policy still enforce actions.',
    decisionRules: [
      'Use a skill for multi-step procedure or domain judgment.',
      'Keep core identity and safety rules in instructions.',
      'Link references from the skill instead of copying giant context blocks.',
    ],
    faqs: makeFaq(
      'Eve skills',
      'The decision is whether the knowledge should load on demand rather than live in every model call.',
    ),
  },
  {
    slug: 'eve-connections',
    title: 'Eve connections: integrating external systems without messy tools',
    shortTitle: 'Eve connections',
    description:
      'How connection files keep OAuth, MCP, and external service access separate from agent behavior.',
    cluster: 'eve-architecture',
    primaryKeyword: 'Eve connections',
    relatedKeywords: [
      'agent connections',
      'MCP connection',
      'agent integrations',
    ],
    audience: 'Developers wiring agents to external services',
    thesis:
      'Connections should own how an agent reaches a system; tools should own what the agent does with it.',
    problem:
      'When auth, client setup, retries, and model-facing tool descriptions live together, integrations become hard to review or reuse.',
    eveAngle:
      'Eve connections give external services a clear authored home, keeping integration setup separate from skills and channel code.',
    nonEveExample:
      'MCP clients, SDK wrappers, and OAuth connection managers all try to isolate integration details from business behavior.',
    antiPattern:
      'Do not copy tokens or service clients into every tool. Centralize connection setup and pass narrow capabilities onward.',
    decisionRules: [
      'Use connections for shared external access and auth.',
      'Use tools for task-specific actions against that access.',
      'Keep credential requirements visible in `.env.example`.',
    ],
    faqs: makeFaq(
      'Eve connections',
      'The decision is whether integration setup deserves a separate reusable layer from model-facing actions.',
    ),
  },
  {
    slug: 'eve-schedules',
    title: 'Eve schedules: recurring agent work that deserves inspection',
    shortTitle: 'Eve schedules',
    description:
      'How to evaluate scheduled Eve agents that run digests, monitors, hygiene checks, and reports.',
    cluster: 'eve-architecture',
    primaryKeyword: 'Eve schedules',
    relatedKeywords: [
      'agent schedules',
      'scheduled Eve agent',
      'AI digest agent',
    ],
    audience: 'Teams reviewing recurring Eve agents',
    thesis:
      'Scheduled behavior should be visible because it acts when nobody is watching.',
    problem:
      'A hidden background trigger can spam channels, duplicate work, or call APIs unexpectedly.',
    eveAngle:
      'Eve places recurring work in `schedules/`, so reviewers can see what runs without searching the whole project.',
    nonEveExample:
      'Other systems may use cron, queues, workflow schedules, or hosted automation products. The review question stays the same: what wakes up, and what can it do?',
    antiPattern:
      'Do not ship a schedule without a clear no-op path, idempotency, and a human-readable output policy.',
    decisionRules: [
      'Inspect cadence, target channel, and dedupe behavior together.',
      'Require explicit configuration for external destinations.',
      'Prefer summaries over raw event forwarding.',
    ],
    faqs: makeFaq(
      'Eve schedules',
      'The decision is whether recurring work is inspectable enough to trust when it runs unattended.',
    ),
  },
  {
    slug: 'eve-channels',
    title: 'Eve channels: one agent, multiple surfaces',
    shortTitle: 'Eve channels',
    description:
      'How Eve channels let the same agent work across Slack, GitHub, HTTP, and other surfaces.',
    cluster: 'eve-architecture',
    primaryKeyword: 'Eve channels',
    relatedKeywords: [
      'Eve Slack channel',
      'Eve GitHub channel',
      'agent channels',
    ],
    audience: 'Developers exposing agents outside a web app',
    thesis:
      'Channels should adapt the platform to the agent, not rewrite the agent for each platform.',
    problem:
      'A useful agent often starts in one UI and then needs to work in Slack, GitHub, or an HTTP route with consistent behavior.',
    eveAngle:
      'Eve channel files make platform ingress explicit while sharing the same instructions, tools, and runtime model.',
    nonEveExample:
      'Bot SDKs give you platform primitives, but you still need an agent runtime behind them if the work should be portable.',
    antiPattern:
      'Do not fork agent behavior per platform unless the user intent truly differs. Fork formatting, not core judgment.',
    decisionRules: [
      'Add a channel when users naturally ask for that workflow in a platform.',
      'Keep channel auth and delivery policy local to the channel.',
      'Route platform-specific context into shared agent work.',
    ],
    faqs: makeFaq(
      'Eve channels',
      'The decision is whether a new surface should reuse the same agent instead of becoming a separate bot.',
    ),
  },
  {
    slug: 'mcp-vs-skills',
    title: 'MCP vs skills: external capabilities or procedural knowledge?',
    shortTitle: 'MCP vs skills',
    description:
      'A decision guide for choosing MCP servers, skills, or both when extending AI agents.',
    cluster: 'protocols',
    primaryKeyword: 'MCP vs skills',
    relatedKeywords: ['Model Context Protocol', 'AI skills', 'MCP tools'],
    audience: 'Developers extending agents with context and actions',
    thesis:
      'Use MCP when the agent needs to reach a system. Use a skill when the agent needs to follow a procedure.',
    problem:
      'MCP and skills are often discussed as competing concepts, but they solve different parts of the agent context problem.',
    eveAngle:
      'An Eve agent can use connections or tools for external capability and skills for procedural guidance. evex can package both as installable source.',
    nonEveExample:
      'Cursor, Claude Desktop, and other clients can connect to MCP servers while also loading local skills for domain workflows.',
    antiPattern:
      'Do not put API credentials or live system access inside a skill. Skills are instructions, not secure integration boundaries.',
    decisionRules: [
      'Choose MCP for live tools, resources, and server-provided prompts.',
      'Choose skills for repeatable reasoning patterns and domain rules.',
      'Use both when a workflow needs external access plus local procedure.',
    ],
    faqs: makeFaq(
      'MCP vs skills',
      'The decision is whether the agent needs a connection to an external system or guidance on how to perform a workflow.',
    ),
  },
  {
    slug: 'mcp-tools-vs-native-tools',
    title: 'MCP tools vs native tools: where should an agent action live?',
    shortTitle: 'MCP tools vs native tools',
    description:
      'How to decide whether to expose an action through MCP or implement it as a native agent tool.',
    cluster: 'protocols',
    primaryKeyword: 'MCP tools vs native tools',
    relatedKeywords: ['MCP tools', 'agent tools', 'native tools'],
    audience: 'Developers designing agent integrations',
    thesis:
      'MCP tools are best for reusable external capability. Native tools are best for agent-specific policy and behavior.',
    problem:
      'Putting every action behind MCP can hide product-specific rules. Putting every action inside one agent can duplicate integrations across teams.',
    eveAngle:
      'Eve lets you author native tools close to the agent while using connections for external systems that should remain shared.',
    nonEveExample:
      'Claude Desktop might call the same MCP server from many contexts. A product-specific agent might still wrap that capability with stricter rules.',
    antiPattern:
      'Do not expose a broad MCP tool and assume each agent will use it safely. The consuming agent still needs policy.',
    decisionRules: [
      'Use MCP when many agents or clients need the same integration.',
      'Use native tools when behavior is specific to one agent’s job.',
      'Wrap broad external tools with narrower task tools when risk is high.',
    ],
    faqs: makeFaq(
      'MCP tools vs native tools',
      'The decision is whether the action should be reusable infrastructure or local agent behavior.',
    ),
  },
  {
    slug: 'agent-resources-vs-tools',
    title: 'Agent resources vs tools: read context or take action?',
    shortTitle: 'Resources vs tools',
    description:
      'A guide to separating passive context from executable actions in agent systems.',
    cluster: 'protocols',
    primaryKeyword: 'agent resources vs tools',
    relatedKeywords: ['MCP resources', 'agent tools', 'AI context'],
    audience: 'Developers shaping context access for agents',
    thesis:
      'Resources inform the model. Tools let it change or query the world.',
    problem:
      'When read-only context and executable actions are mixed together, permissioning and model behavior both get murky.',
    eveAngle:
      'Eve projects can keep static references in skills and active operations in tools or connections, making authority easier to inspect.',
    nonEveExample:
      'MCP formalizes the distinction with resources and tools. Many frameworks have the same split even if they use different names.',
    antiPattern:
      'Do not make a read-only lookup tool mutate state because it was convenient. The name and risk profile should match.',
    decisionRules: [
      'Use resources for context that can be attached without model-controlled execution.',
      'Use tools for actions with arguments, latency, errors, or side effects.',
      'Document whether returned data is authoritative, cached, or user-provided.',
    ],
    faqs: makeFaq(
      'agent resources vs tools',
      'The decision is whether the agent is reading information or actively invoking an operation.',
    ),
  },
  {
    slug: 'agent-registries',
    title: 'Agent registries: discovery, trust, and reuse for AI agents',
    shortTitle: 'Agent registries',
    description:
      'What agent registries are, how they differ, and why source-visible distribution matters for developer trust.',
    cluster: 'distribution',
    primaryKeyword: 'agent registry',
    relatedKeywords: [
      'AI agent registry',
      'agent marketplace',
      'agent catalog',
    ],
    audience: 'Teams evaluating reusable agent distribution',
    thesis:
      'An agent registry is useful only if discovery comes with enough context to trust what will run.',
    problem:
      'A list of agent names does not solve reuse. Developers need files, dependencies, authorship, permissions, and install paths.',
    eveAngle:
      'evex focuses on source-owned Eve agents: registry items map to files users can inspect before install.',
    nonEveExample:
      'Enterprise registries often emphasize governance and runtime inventory. Marketplace-style registries emphasize discovery and installability.',
    antiPattern:
      'Do not treat an agent registry as a folder of prompts. Real agents include tools, channels, dependencies, and runtime assumptions.',
    decisionRules: [
      'Prefer registries that show files and dependencies before install.',
      'Separate canonical source metadata from runtime metrics.',
      'Make authorship and update history visible.',
    ],
    faqs: makeFaq(
      'agent registries',
      'The decision is whether a registry helps developers trust, install, and reuse agents rather than just browse names.',
    ),
  },
  {
    slug: 'source-owned-agents',
    title: 'Source-owned agents: why copyable files beat opaque packages',
    shortTitle: 'Source-owned agents',
    description:
      'Why agent distribution often works better when users own the installed source files.',
    cluster: 'distribution',
    primaryKeyword: 'source-owned agents',
    relatedKeywords: [
      'copy paste agents',
      'agent source files',
      'shadcn agents',
    ],
    audience: 'Developers deciding how to share agent configurations',
    thesis:
      'Agents are easier to trust when installation gives you source you can read, change, and review.',
    problem:
      'Opaque packages are convenient until the first policy mismatch. Agents encode judgment, authority, and delivery behavior, so teams often need local ownership.',
    eveAngle:
      'evex uses shadcn-compatible registry items to place Eve files directly into the user’s project.',
    nonEveExample:
      'shadcn/ui proved this pattern for UI components. Agent workflows have a similar need for ownership and customization.',
    antiPattern:
      'Do not hide agent behavior behind a package when the user must audit prompts, tools, or external writes.',
    decisionRules: [
      'Use source-owned distribution for workflows teams will customize.',
      'Use packages for stable libraries and clients.',
      'Keep generated source small enough for review.',
    ],
    faqs: makeFaq(
      'source-owned agents',
      'The decision is whether users need to own and modify the behavior rather than call it as a black box.',
    ),
  },
  {
    slug: 'shadcn-registry-for-agents',
    title: 'Shadcn registry for agents: distributing workflows as files',
    shortTitle: 'Shadcn registry for agents',
    description:
      'How the shadcn registry model applies to AI agent files, workflows, instructions, and tools.',
    cluster: 'distribution',
    primaryKeyword: 'shadcn registry for agents',
    relatedKeywords: ['shadcn agent registry', 'registry.json agents'],
    audience: 'Developers packaging reusable agent workflows',
    thesis:
      'The shadcn registry model works for agents because agents are made of files users want to own.',
    problem:
      'Agent workflows do not fit cleanly into a single package. They include instructions, tools, env examples, evals, and platform-specific files.',
    eveAngle:
      'Eve’s filesystem layout pairs naturally with shadcn registry items because both care about where files land in a project.',
    nonEveExample:
      'GitHub registries and custom shadcn registries can distribute rules, docs, templates, and workflows even outside Eve.',
    antiPattern:
      'Do not use a registry item as a dumping ground. Files should belong together as one usable workflow.',
    decisionRules: [
      'Use registry items for coherent installable workflows.',
      'Declare target paths explicitly.',
      'Include env examples and README guidance with the files.',
    ],
    faqs: makeFaq(
      'shadcn registry for agents',
      'The decision is whether a workflow can be installed as owned files with clear target paths.',
    ),
  },
  {
    slug: 'registry-json-for-agent-workflows',
    title: 'registry.json for agent workflows: what belongs in the manifest',
    shortTitle: 'registry.json for workflows',
    description:
      'A practical guide to modeling agent files, dependencies, and metadata in a shadcn registry manifest.',
    cluster: 'distribution',
    primaryKeyword: 'registry.json agent workflows',
    relatedKeywords: [
      'registry.json',
      'shadcn registry item',
      'agent manifest',
    ],
    audience: 'Agent authors preparing reusable workflow packages',
    thesis:
      'A registry manifest should make installation predictable before a file is written.',
    problem:
      'If the manifest hides dependencies, targets, or metadata, the user cannot evaluate the install until after it changes their project.',
    eveAngle:
      'evex agent manifests declare title, description, category, dependencies, author, files, and target paths for Eve projects.',
    nonEveExample:
      'Custom shadcn registries use the same core idea for UI blocks, config files, rules, and docs.',
    antiPattern:
      'Do not rely on README text to define what the CLI will install. The manifest should be the source of truth.',
    decisionRules: [
      'List every file that belongs to the workflow.',
      'Keep dependency declarations close to the registry item.',
      'Use metadata for browsing, filtering, and auditability.',
    ],
    faqs: makeFaq(
      'registry.json for agent workflows',
      'The decision is whether the manifest gives enough information to preview and trust an install.',
    ),
  },
  {
    slug: 'ai-agent-marketplace-vs-registry',
    title:
      'AI agent marketplace vs registry: discovery is not the same as trust',
    shortTitle: 'Marketplace vs registry',
    description:
      'How marketplaces, registries, catalogs, and source-owned agent libraries differ.',
    cluster: 'distribution',
    primaryKeyword: 'AI agent marketplace vs registry',
    relatedKeywords: [
      'agent marketplace',
      'agent registry',
      'AI agent catalog',
    ],
    audience: 'Teams choosing a distribution model for agents',
    thesis:
      'A marketplace optimizes selection. A registry should also optimize evaluation and installation.',
    problem:
      'Agent listings can look impressive while hiding the exact files, permissions, dependencies, and maintenance model.',
    eveAngle:
      'evex leans registry-first: installable files, source ownership, and author identity matter more than commerce today.',
    nonEveExample:
      'Enterprise catalogs may focus on approval and governance. Public marketplaces may focus on ratings and discovery.',
    antiPattern:
      'Do not use marketplace language if the product does not handle payment, licensing, reviews, or support expectations.',
    decisionRules: [
      'Use marketplace framing when buyers compare vendors.',
      'Use registry framing when developers install owned artifacts.',
      'Expose trust signals before growth mechanics.',
    ],
    faqs: makeFaq(
      'AI agent marketplace vs registry',
      'The decision is whether the site exists mainly to sell choices or to help developers safely reuse artifacts.',
    ),
  },
  {
    slug: 'eve-vs-langgraph',
    title:
      'Eve vs LangGraph: filesystem-first agents or explicit workflow graphs?',
    shortTitle: 'Eve vs LangGraph',
    description:
      'A balanced comparison of Eve and LangGraph for durable agents, TypeScript teams, and explicit workflow control.',
    cluster: 'comparisons',
    primaryKeyword: 'Eve vs LangGraph',
    relatedKeywords: [
      'LangGraph alternatives',
      'Eve framework',
      'AI agent frameworks',
    ],
    audience: 'Teams choosing an agent framework',
    thesis:
      'Choose Eve when the project should read like files. Choose LangGraph when graph control is the central requirement.',
    problem:
      'Both frameworks can support serious agent work, but they optimize for different developer mental models.',
    eveAngle:
      'Eve emphasizes a filesystem-first TypeScript project with durable sessions and deployable backend agents.',
    nonEveExample:
      'LangGraph emphasizes explicit state graphs, nodes, edges, and checkpointing, especially in Python-heavy LangChain ecosystems.',
    antiPattern:
      'Do not pick Eve just because it is simpler to browse, or LangGraph just because it is more explicit. Match the workflow shape.',
    decisionRules: [
      'Prefer Eve for source-visible agent projects in TypeScript.',
      'Prefer LangGraph for complex graph routing and explicit state machines.',
      'Prototype the hardest failure path before choosing.',
    ],
    faqs: makeFaq(
      'Eve vs LangGraph',
      'The decision is whether filesystem readability or graph-level control matters more for the agent you are building.',
    ),
  },
  {
    slug: 'eve-vs-crewai',
    title: 'Eve vs CrewAI: file-based backend agents or role-based crews?',
    shortTitle: 'Eve vs CrewAI',
    description:
      'A practical comparison of Eve and CrewAI for teams deciding between file-based agents and role-based multi-agent workflows.',
    cluster: 'comparisons',
    primaryKeyword: 'Eve vs CrewAI',
    relatedKeywords: ['CrewAI alternatives', 'AI crew framework', 'Eve agents'],
    audience: 'Developers comparing agent frameworks',
    thesis:
      'Choose CrewAI for quick role-based prototypes. Choose Eve when the agent should become a durable, inspectable backend project.',
    problem:
      'Role metaphors are fast to start, but production agents also need file ownership, channels, schedules, tools, and recovery behavior.',
    eveAngle:
      'Eve maps capabilities to files and focuses on durable backend agents in TypeScript.',
    nonEveExample:
      'CrewAI maps workflows to agents with roles, goals, and tasks, which can be intuitive for research and content pipelines.',
    antiPattern:
      'Do not model every technical workflow as a pretend human team. Sometimes a typed tool and a clear instruction are enough.',
    decisionRules: [
      'Prefer CrewAI when the workflow naturally maps to role collaboration.',
      'Prefer Eve when deployment, file review, and platform channels matter.',
      'Avoid extra agents when one agent with good tools is clearer.',
    ],
    faqs: makeFaq(
      'Eve vs CrewAI',
      'The decision is whether the system benefits from role-based collaboration or from a source-owned backend agent layout.',
    ),
  },
  {
    slug: 'eve-vs-autogen',
    title: 'Eve vs AutoGen: durable backend agents or conversational teams?',
    shortTitle: 'Eve vs AutoGen',
    description:
      'How Eve and AutoGen differ across durability, conversation loops, code execution, and production ownership.',
    cluster: 'comparisons',
    primaryKeyword: 'Eve vs AutoGen',
    relatedKeywords: [
      'AutoGen alternatives',
      'multi-agent conversations',
      'Eve framework',
    ],
    audience: 'Teams evaluating conversational multi-agent systems',
    thesis:
      'Choose AutoGen-style systems for conversational collaboration. Choose Eve when the agent is a backend service with files, channels, and schedules.',
    problem:
      'Conversation among agents can be useful, but it can also hide control flow and make operational behavior harder to inspect.',
    eveAngle:
      'Eve’s file layout gives each capability a stable home, which helps teams review and ship agents as software projects.',
    nonEveExample:
      'AutoGen’s strength is agent-to-agent conversation, debate, and code execution loops, especially for exploratory tasks.',
    antiPattern:
      'Do not add multiple conversational agents when the real need is a deterministic workflow with one approval gate.',
    decisionRules: [
      'Prefer AutoGen-style patterns for debate, research, and code iteration loops.',
      'Prefer Eve for platform-connected backend agents.',
      'Keep conversational loops bounded by explicit stop conditions.',
    ],
    faqs: makeFaq(
      'Eve vs AutoGen',
      'The decision is whether the work needs multi-agent conversation or a durable service-like agent.',
    ),
  },
  {
    slug: 'eve-vs-mastra',
    title: 'Eve vs Mastra: agent project layout or TypeScript agent platform',
    shortTitle: 'Eve vs Mastra',
    description:
      'A comparison of Eve and Mastra for TypeScript teams building AI agents and workflows.',
    cluster: 'comparisons',
    primaryKeyword: 'Eve vs Mastra',
    relatedKeywords: [
      'Mastra alternatives',
      'TypeScript agent framework',
      'Eve framework',
    ],
    audience: 'TypeScript developers choosing an agent stack',
    thesis:
      'Both appeal to TypeScript teams. The key difference is whether you want Eve’s filesystem contract or Mastra’s broader agent application framework.',
    problem:
      'TypeScript agent teams often compare feature lists, but the deeper choice is how much structure the framework should impose.',
    eveAngle:
      'Eve centers the `agent/` directory and Vercel-native runtime concepts.',
    nonEveExample:
      'Mastra offers a TypeScript framework for agents, workflows, RAG, and app-level AI features with its own abstractions.',
    antiPattern:
      'Do not choose a framework only because both use TypeScript. Compare deployment model, observability, and how agents are packaged.',
    decisionRules: [
      'Prefer Eve if the file layout is a core part of the team’s review process.',
      'Prefer Mastra if the broader app framework fits your existing AI product surface.',
      'Compare how each handles tools, memory, workflows, and deployment.',
    ],
    faqs: makeFaq(
      'Eve vs Mastra',
      'The decision is whether your priority is Eve’s filesystem-first agent model or a broader TypeScript AI application framework.',
    ),
  },
  {
    slug: 'eve-vs-openai-agents-sdk',
    title: 'Eve vs OpenAI Agents SDK: framework ownership and model surface',
    shortTitle: 'Eve vs OpenAI Agents SDK',
    description:
      'How to compare Eve with the OpenAI Agents SDK when choosing where agent behavior should live.',
    cluster: 'comparisons',
    primaryKeyword: 'Eve vs OpenAI Agents SDK',
    relatedKeywords: ['OpenAI Agents SDK alternatives', 'Eve agents'],
    audience: 'Developers comparing vendor SDKs and framework projects',
    thesis:
      'Choose Eve for a framework-shaped agent project. Choose a vendor SDK when tight model-platform integration matters more.',
    problem:
      'Vendor SDKs can move fast and integrate deeply, but teams must decide how much of their agent architecture should depend on one provider surface.',
    eveAngle:
      'Eve organizes agent behavior as project files and can route models through platform infrastructure.',
    nonEveExample:
      'The OpenAI Agents SDK gives provider-native primitives for agents, tools, handoffs, and tracing in that ecosystem.',
    antiPattern:
      'Do not confuse model convenience with architecture portability. They overlap, but they are not the same decision.',
    decisionRules: [
      'Prefer vendor SDKs for provider-specific features and fastest access to new primitives.',
      'Prefer Eve when project layout and framework ownership matter more.',
      'Keep business policy outside provider-specific glue where possible.',
    ],
    faqs: makeFaq(
      'Eve vs OpenAI Agents SDK',
      'The decision is whether provider-native features or project-level architecture should drive the implementation.',
    ),
  },
  {
    slug: 'eve-vs-agentcn',
    title: 'Eve vs Agentcn: framework or recipe registry?',
    shortTitle: 'Eve vs Agentcn',
    description:
      'Why Eve and Agentcn solve different problems, and where evex sits in the same ecosystem.',
    cluster: 'comparisons',
    primaryKeyword: 'Eve vs Agentcn',
    relatedKeywords: ['Agentcn alternatives', 'Eve recipes', 'agent registry'],
    audience: 'Developers sorting out frameworks and registries',
    thesis:
      'Eve is a framework. Agentcn is a recipe registry. evex is a registry specifically for Eve agent configurations.',
    problem:
      'Search results often mix frameworks, registries, marketplaces, and recipe libraries. That makes tool selection noisier than it needs to be.',
    eveAngle:
      'Eve defines how the agent runs and where files belong. evex distributes reusable Eve agent folders through shadcn.',
    nonEveExample:
      'Agentcn distributes agent recipes across frameworks, positioning itself as a shadcn-style registry for backend agent files.',
    antiPattern:
      'Do not compare a runtime framework with a registry as if they are substitutes. They can be complementary layers.',
    decisionRules: [
      'Pick a framework to define runtime and authoring model.',
      'Pick a registry to discover and install reusable artifacts.',
      'Check whether the registry’s recipes match your chosen framework.',
    ],
    faqs: makeFaq(
      'Eve vs Agentcn',
      'The decision is whether you are choosing a runtime framework, a recipe source, or both.',
    ),
  },
  {
    slug: 'langgraph-vs-crewai-vs-eve',
    title: 'LangGraph vs CrewAI vs Eve: three mental models for agents',
    shortTitle: 'LangGraph vs CrewAI vs Eve',
    description:
      'A comparison of graph-based, role-based, and filesystem-first mental models for building AI agents.',
    cluster: 'comparisons',
    primaryKeyword: 'LangGraph vs CrewAI vs Eve',
    relatedKeywords: ['AI agent frameworks comparison', 'Eve alternatives'],
    audience: 'Teams selecting an agent framework family',
    thesis:
      'LangGraph thinks in graphs, CrewAI thinks in teams, and Eve thinks in files.',
    problem:
      'Framework selection gets fuzzy when every option claims tools, agents, memory, and workflows. The mental model matters more than the checklist.',
    eveAngle:
      'Eve is compelling when the agent’s file layout should be readable, installable, and reviewable.',
    nonEveExample:
      'LangGraph offers explicit control flow. CrewAI offers fast role-based composition. Each wins for different workflows.',
    antiPattern:
      'Do not pick the framework with the most features if its mental model fights the way your team debugs software.',
    decisionRules: [
      'Choose graph-first for complex state transitions.',
      'Choose crew-first for role-based collaboration and fast prototypes.',
      'Choose file-first for inspectable backend agents and source distribution.',
    ],
    faqs: makeFaq(
      'LangGraph vs CrewAI vs Eve',
      'The decision is which mental model makes your hardest workflow easiest to inspect and operate.',
    ),
  },
  {
    slug: 'ai-agent-tools',
    title: 'AI agent tools: the safe way to give models actions',
    shortTitle: 'AI agent tools',
    description:
      'A practical guide to designing tools that agents can call without giving them vague or excessive authority.',
    cluster: 'agent-engineering',
    primaryKeyword: 'AI agent tools',
    relatedKeywords: ['LLM tools', 'tool calling', 'agent actions'],
    audience: 'Developers exposing APIs to agents',
    thesis:
      'A good agent tool is narrow, typed, observable, and honest about side effects.',
    problem:
      'Models are good at choosing among well-described actions and bad at safely improvising around broad, ambiguous powers.',
    eveAngle:
      'Eve tools as files make each action easy to inspect before an agent is installed or deployed.',
    nonEveExample:
      'OpenAI function calling, MCP tools, and LangChain tools all rely on the same basic contract: schema in, result out.',
    antiPattern:
      'Do not give the model one giant tool with an `operation` string and dozens of optional fields. That recreates an unsafe API gateway.',
    decisionRules: [
      'Make the tool name and description match the exact action.',
      'Use schemas to reject invalid arguments early.',
      'Return structured results that the model can reason about.',
    ],
    faqs: makeFaq(
      'AI agent tools',
      'The main decision is how narrowly to define executable authority so the model can act without guessing.',
    ),
  },
  {
    slug: 'ai-agent-skills',
    title: 'AI agent skills: packaging judgment without adding tools',
    shortTitle: 'AI agent skills',
    description:
      'How skills help agents load domain procedure, checklists, and examples only when relevant.',
    cluster: 'agent-engineering',
    primaryKeyword: 'AI agent skills',
    relatedKeywords: ['agent skills', 'SKILL.md', 'procedural knowledge'],
    audience: 'Teams standardizing repeatable AI workflows',
    thesis:
      'Skills package how to think about a task, not new authority to perform it.',
    problem:
      'Repeated prompt instructions drift across teammates and chats. Skills make domain procedure portable and inspectable.',
    eveAngle:
      'Eve skills can travel with installable agents, so a reusable agent includes both its runtime files and the judgment it should apply.',
    nonEveExample:
      'Claude Code and Cursor skills use similar progressive loading to avoid stuffing every workflow into the system prompt.',
    antiPattern:
      'Do not use skills as a secret policy layer. If a rule matters for safety, enforce it in code or runtime checks too.',
    decisionRules: [
      'Use skills for playbooks, rubrics, examples, and domain rules.',
      'Keep them specific enough to trigger only when useful.',
      'Pair skills with evals when they encode important judgment.',
    ],
    faqs: makeFaq(
      'AI agent skills',
      'The decision is whether repeatable procedure should be packaged as loadable context instead of copy-pasted prompts.',
    ),
  },
  {
    slug: 'ai-subagents',
    title: 'AI subagents: delegation without bloating the main context',
    shortTitle: 'AI subagents',
    description:
      'When to split work into subagents, and when a tool or skill is the simpler choice.',
    cluster: 'agent-engineering',
    primaryKeyword: 'AI subagents',
    relatedKeywords: ['subagents', 'multi-agent systems', 'agent delegation'],
    audience: 'Developers designing multi-agent systems',
    thesis:
      'A subagent earns its place when independent reasoning is worth the extra coordination cost.',
    problem:
      'Multi-agent designs look powerful, but each delegation adds latency, cost, and another place for context to drift.',
    eveAngle:
      'Eve gives subagents a file-based home, making delegation visible in the project instead of hidden in runtime code.',
    nonEveExample:
      'CrewAI, AutoGen, Claude Code, and LangGraph can all model specialist workers with different mechanics.',
    antiPattern:
      'Do not add subagents for branding or symmetry. If a deterministic function can do it, use a tool.',
    decisionRules: [
      'Use subagents for specialist judgment with its own context.',
      'Avoid subagents for simple API calls or formatting tasks.',
      'Define what the parent expects back before delegating.',
    ],
    faqs: makeFaq(
      'AI subagents',
      'The decision is whether the subtask needs its own reasoning loop or just another capability.',
    ),
  },
  {
    slug: 'agentic-workflows',
    title: 'Agentic workflows: when software should decide the next step',
    shortTitle: 'Agentic workflows',
    description:
      'A guide to deciding when a workflow should be agentic, deterministic, or a hybrid of both.',
    cluster: 'agent-engineering',
    primaryKeyword: 'agentic workflows',
    relatedKeywords: ['AI workflows', 'agentic systems', 'workflow automation'],
    audience: 'Teams adding AI to existing workflows',
    thesis:
      'Make a workflow agentic only where judgment changes the next step.',
    problem:
      'Teams often replace deterministic workflows with agents because agents feel flexible. That trades reliable control for model judgment even when no judgment is needed.',
    eveAngle:
      'Eve can host hybrid workflows where channels, tools, schedules, and skills surround model judgment with explicit code.',
    nonEveExample:
      'LangGraph and workflow engines often make this split explicit with deterministic nodes around model calls.',
    antiPattern:
      'Do not ask the model to decide fixed business rules. Encode rules in software and let the model handle ambiguity.',
    decisionRules: [
      'Use deterministic code for known branches and policy.',
      'Use the model for interpretation, synthesis, and ambiguous prioritization.',
      'Keep side effects behind typed tools and approvals.',
    ],
    faqs: makeFaq(
      'agentic workflows',
      'The decision is where uncertainty requires model judgment and where regular software should stay in charge.',
    ),
  },
  {
    slug: 'agent-context-engineering',
    title: 'Agent context engineering: giving models the right working set',
    shortTitle: 'Context engineering',
    description:
      'How to design agent context with instructions, skills, resources, retrieval, and runtime state.',
    cluster: 'agent-engineering',
    primaryKeyword: 'agent context engineering',
    relatedKeywords: ['context engineering', 'AI agent context', 'LLM context'],
    audience: 'Developers improving agent reliability',
    thesis:
      'Context engineering is deciding what the model sees now, what it can fetch later, and what it should never guess.',
    problem:
      'Agents fail when the prompt is bloated, stale, missing key facts, or mixed with data that should be retrieved on demand.',
    eveAngle:
      'Eve’s layout separates instructions, skills, tools, and connections, which helps keep context sources deliberate.',
    nonEveExample:
      'RAG systems, MCP resources, memory stores, and prompt routers all exist to control the model’s working set.',
    antiPattern:
      'Do not solve every failure by adding more permanent prompt text. More context can make the right detail harder to find.',
    decisionRules: [
      'Put stable identity in instructions.',
      'Put procedural depth in skills.',
      'Fetch changing facts through tools, resources, or retrieval.',
    ],
    faqs: makeFaq(
      'agent context engineering',
      'The decision is what belongs in always-on context, on-demand context, or external state.',
    ),
  },
  {
    slug: 'agent-permissions',
    title: 'Agent permissions: designing authority before autonomy',
    shortTitle: 'Agent permissions',
    description:
      'How to think about permission boundaries for agents that can read, write, deploy, or message users.',
    cluster: 'agent-engineering',
    primaryKeyword: 'agent permissions',
    relatedKeywords: [
      'AI agent security',
      'agent authorization',
      'tool permissions',
    ],
    audience: 'Teams deploying agents with real authority',
    thesis:
      'Autonomy should be granted one permission at a time, with logs and fallback paths.',
    problem:
      'The fastest way to make an impressive demo is to give the agent broad access. The fastest way to lose trust is to ship that access unchanged.',
    eveAngle:
      'Eve’s file-based capabilities make it easier to review where authority enters the system: tools, connections, channels, schedules, and sandbox settings.',
    nonEveExample:
      'MCP, cloud IAM, OAuth scopes, and GitHub App permissions all show the same principle at different layers.',
    antiPattern:
      'Do not let a model infer authorization from natural language. Check permissions in code.',
    decisionRules: [
      'Grant read, draft, and write permissions separately.',
      'Require approval where damage is hard to undo.',
      'Log the actor, tool, arguments, and result for privileged actions.',
    ],
    faqs: makeFaq(
      'agent permissions',
      'The decision is which actions the agent may take alone and which require explicit human or system approval.',
    ),
  },
  {
    slug: 'ai-agent-frameworks',
    title: 'AI agent frameworks: how to compare them without feature bingo',
    shortTitle: 'AI agent frameworks',
    description:
      'A practical framework for comparing AI agent frameworks by mental model, runtime, state, tools, and deployment.',
    cluster: 'comparisons',
    primaryKeyword: 'AI agent frameworks',
    relatedKeywords: ['best AI agent framework', 'agent framework comparison'],
    audience: 'Teams shortlisting agent frameworks',
    thesis:
      'Compare frameworks by the shape of work they make easy, not by the number of nouns on the homepage.',
    problem:
      'Most frameworks claim tools, memory, workflows, evals, and observability. The harder question is which tradeoffs appear when the workflow breaks.',
    eveAngle:
      'Eve’s distinctive bet is filesystem-first durable backend agents in TypeScript.',
    nonEveExample:
      'LangGraph, CrewAI, AutoGen, Mastra, and vendor SDKs each privilege a different model of control and deployment.',
    antiPattern:
      'Do not choose based on the first tutorial. Build a failure-path prototype with approvals, retries, and one real external system.',
    decisionRules: [
      'Compare mental model before feature list.',
      'Check state, retries, and observability early.',
      'Choose the framework your team can debug under pressure.',
    ],
    faqs: makeFaq(
      'AI agent frameworks',
      'The decision is which framework makes your real workflow easiest to operate, not just easiest to demo.',
    ),
  },
] as const

const LEARN_PAGE_MAP = new Map(
  LEARN_PAGES.map((page) => [page.slug, page] as const),
)

export function listLearnPages(): readonly LearnPage[] {
  return LEARN_PAGES
}

export function getLearnPage(slug: string): LearnPage | null {
  return LEARN_PAGE_MAP.get(slug) ?? null
}

export function getLearnCluster(id: LearnClusterId): LearnCluster {
  const cluster = LEARN_CLUSTERS.find((entry) => entry.id === id)
  if (!cluster) {
    throw new Error(`Unknown learn cluster: ${id}`)
  }
  return cluster
}

export function getLearnPagesByCluster(
  id: LearnClusterId,
): readonly LearnPage[] {
  return LEARN_PAGES.filter((page) => page.cluster === id)
}

export function getRelatedLearnPages(
  page: LearnPage,
  limit: number,
): readonly LearnPage[] {
  const sameCluster = LEARN_PAGES.filter(
    (candidate) =>
      candidate.cluster === page.cluster && candidate.slug !== page.slug,
  )
  const otherClusters = LEARN_PAGES.filter(
    (candidate) =>
      candidate.cluster !== page.cluster && candidate.slug !== page.slug,
  )

  return [...sameCluster, ...otherClusters].slice(0, limit)
}
