export type LearnClusterId =
  | 'agent-engineering'
  | 'protocols'
  | 'comparisons'
  | 'distribution'

export interface LearnFaq {
  answer: string
  question: string
}

export interface LearnSection {
  body: readonly string[]
  bullets?: readonly string[]
  heading: string
}

export interface LearnDecisionRow {
  avoidWhen: string
  choice: string
  useWhen: string
}

export interface LearnExample {
  body: string
  label: string
}

export interface LearnPage {
  cluster: LearnClusterId
  decisionRows: readonly LearnDecisionRow[]
  description: string
  examples: readonly LearnExample[]
  faqs: readonly LearnFaq[]
  primaryKeyword: string
  relatedKeywords: readonly string[]
  sections: readonly LearnSection[]
  shortTitle: string
  slug: string
  summary: string
  title: string
}

export interface LearnCluster {
  description: string
  id: LearnClusterId
  label: string
}

export const LEARN_CLUSTERS: readonly LearnCluster[] = [
  {
    id: 'protocols',
    label: 'Protocols',
    description:
      'MCP, skills, tools, resources, and how agents connect to external systems.',
  },
  {
    id: 'agent-engineering',
    label: 'Agent engineering',
    description:
      'Production choices behind workflows, tools, approval, state, and recovery.',
  },
  {
    id: 'comparisons',
    label: 'Comparisons',
    description:
      'Framework tradeoffs for teams choosing how to build and operate agents.',
  },
  {
    id: 'distribution',
    label: 'Distribution',
    description:
      'Registries, source-owned agents, and installable workflow files.',
  },
] as const

export const LEARN_PAGES: readonly LearnPage[] = [
  {
    slug: 'mcp-server-for-ai-agents',
    title: 'MCP server for AI agents: what it gives you and what it does not',
    shortTitle: 'MCP server for AI agents',
    description:
      'A practical guide to MCP servers for agent builders: tools, resources, prompts, permissions, and where MCP stops.',
    cluster: 'protocols',
    primaryKeyword: 'mcp server',
    relatedKeywords: ['model context protocol', 'mcp tools', 'mcp server ai'],
    summary:
      'An MCP server gives agents a standard way to discover and call external capabilities. It does not decide policy for you. The server exposes tools and context; the agent still needs clear instructions, permissions, logging, and workflow boundaries.',
    sections: [
      {
        heading: 'MCP solves integration sprawl',
        body: [
          'Without MCP, every agent client needs custom glue for every system it touches. One client knows how to call GitHub. Another knows how to query a database. A third knows how to search docs. The result is repeated integration work and inconsistent permissions.',
          'An MCP server gives those capabilities a standard shape. The client can discover available tools, resources, and prompts, then expose them to the model through one protocol instead of one-off adapters.',
        ],
      },
      {
        heading: 'What an MCP server actually exposes',
        body: [
          'The useful split is simple. Tools perform actions, such as listing issues or running a read-only query. Resources provide context, such as files, schemas, or documentation. Prompts provide reusable interaction templates.',
          'That does not make every MCP server safe. A broad tool with vague arguments is still broad. A server that exposes write actions still needs consent, authorization, and observability.',
        ],
        bullets: [
          'Tools: executable operations the model can request.',
          'Resources: contextual data the client can attach or retrieve.',
          'Prompts: reusable interaction patterns exposed by the server.',
        ],
      },
      {
        heading: 'Where Eve fits',
        body: [
          'In an Eve project, MCP access usually belongs near connections or narrow tools, while agent behavior stays in instructions, skills, and application code. That keeps external capability separate from the policy that decides when to use it.',
          'This matters for installable agents. A registry item should make it obvious which external systems the agent can reach and which files implement that access.',
        ],
      },
      {
        heading: 'The risk is assuming protocol equals policy',
        body: [
          'MCP standardizes how capabilities are exposed. It does not decide whether the agent should call a tool, whether a user is authorized, whether a result can be trusted, or whether a write needs approval.',
          'Treat MCP as a capability layer. Put policy in the agent, tool wrapper, server permissions, and runtime checks.',
        ],
      },
    ],
    decisionRows: [
      {
        choice: 'MCP server',
        useWhen:
          'Many agents or clients need the same external capabilities through a shared protocol.',
        avoidWhen:
          'The capability is private to one agent and simpler as a local tool.',
      },
      {
        choice: 'Native tool',
        useWhen:
          'The action is specific to one workflow and needs local policy close to the agent.',
        avoidWhen:
          'Multiple clients need the same integration and discovery behavior.',
      },
      {
        choice: 'Skill',
        useWhen: 'The agent needs a procedure for using a capability well.',
        avoidWhen: 'The agent needs live access to an external system.',
      },
    ],
    examples: [
      {
        label: 'Eve example',
        body: 'An Eve data analyst can use a database MCP server for schema and query tools, plus a local skill that defines metric rules and safe query behavior.',
      },
      {
        label: 'Outside Eve',
        body: 'A desktop assistant can connect to the same MCP server, but it still needs client-side permission prompts and a clear display of what the tool will do.',
      },
    ],
    faqs: [
      {
        question: 'Is MCP only for tools?',
        answer:
          'No. MCP can expose tools, resources, and prompts. Tools are the most visible part because they let agents act.',
      },
      {
        question: 'Does MCP make tool use safe?',
        answer:
          'No. MCP gives tools a standard interface. Safety still depends on scopes, validation, approvals, and logging.',
      },
      {
        question: 'When should I build an MCP server?',
        answer:
          'Build one when the same integration should be reused across agents, clients, or teams.',
      },
    ],
  },
  {
    slug: 'agentic-workflows',
    title: 'Agentic workflows: when software should decide the next step',
    shortTitle: 'Agentic workflows',
    description:
      'How to decide when a workflow should be agentic, deterministic, or a hybrid of both.',
    cluster: 'agent-engineering',
    primaryKeyword: 'agentic workflow',
    relatedKeywords: ['ai agent workflow', 'agentic workflows', 'ai workflows'],
    summary:
      'An agentic workflow is useful when the next step depends on judgment. If the path is fixed, ordinary workflow code is clearer. The best production systems usually mix both: deterministic rails around model decisions.',
    sections: [
      {
        heading: 'Do not make everything agentic',
        body: [
          'A workflow becomes agentic when the model observes state, chooses an action, sees the result, and decides what to do next. That flexibility is useful for triage, research, code review, support, and messy operational work.',
          'It is wasteful when the process is already known. If step two always follows step one, a model does not need to decide it. Deterministic software will be cheaper, faster, and easier to test.',
        ],
      },
      {
        heading: 'Use agents for ambiguity',
        body: [
          'Good agentic work has ambiguity at the center. Which issue matters? Which query answers the question? Which source is credible? Which tool should run next? These are judgment calls where a model can add value.',
          'Bad agentic work asks the model to enforce fixed policy. Business rules, permissions, idempotency, and irreversible writes should live in code.',
        ],
      },
      {
        heading: 'Hybrid workflows are the default',
        body: [
          'The practical pattern is a hybrid: a deterministic trigger starts the run, the model makes a bounded decision, tools execute narrow actions, and the workflow records state. Human approval appears only where risk justifies it.',
          'Eve fits this pattern because channels, schedules, tools, skills, and durable sessions can sit around model judgment instead of replacing application structure.',
        ],
      },
    ],
    decisionRows: [
      {
        choice: 'Deterministic workflow',
        useWhen: 'The steps and branches are known before the run starts.',
        avoidWhen:
          'The workflow depends on interpreting messy context or choosing among uncertain actions.',
      },
      {
        choice: 'Agentic workflow',
        useWhen: 'The model must choose the next action based on observations.',
        avoidWhen:
          'The model is being asked to enforce rules that code can enforce exactly.',
      },
      {
        choice: 'Hybrid workflow',
        useWhen: 'You need model judgment inside clear runtime boundaries.',
        avoidWhen:
          'The boundaries are so vague that no one can explain who controls the next step.',
      },
    ],
    examples: [
      {
        label: 'Good fit',
        body: 'A Linear triage agent reads new issues, decides which ones need clarification, and drafts updates while code enforces allowed project fields.',
      },
      {
        label: 'Poor fit',
        body: 'A billing workflow asks a model whether a fixed refund threshold applies. That should be a rule, not a judgment call.',
      },
    ],
    faqs: [
      {
        question: 'Are agentic workflows the same as automations?',
        answer:
          'No. Automations follow predefined steps. Agentic workflows let the model choose some steps based on context.',
      },
      {
        question: 'Where do tools fit?',
        answer:
          'Tools are the bounded actions an agentic workflow can request. They should stay narrow and observable.',
      },
      {
        question: 'What is the first thing to test?',
        answer:
          'Test the failure path: bad input, missing context, duplicate trigger, and rejected approval.',
      },
    ],
  },
  {
    slug: 'ai-agent-frameworks',
    title:
      'AI agent frameworks: compare the mental model, not the feature list',
    shortTitle: 'AI agent frameworks',
    description:
      'A practical framework for comparing LangGraph, CrewAI, AutoGen-style systems, Eve, and other agent frameworks.',
    cluster: 'comparisons',
    primaryKeyword: 'ai agent frameworks',
    relatedKeywords: ['ai agent framework', 'best ai agent framework'],
    summary:
      'Most AI agent frameworks claim tools, memory, workflows, streaming, and observability. The better comparison is mental model. Graphs, crews, conversations, and files each make different problems easier to see.',
    sections: [
      {
        heading: 'Feature lists hide the real tradeoff',
        body: [
          'A checklist can make frameworks look interchangeable. In practice, the hard part is not whether a framework has tools. The hard part is how the team understands the run when it fails.',
          'LangGraph makes state transitions visible. CrewAI makes role-based collaboration quick to describe. AutoGen-style systems emphasize agent conversations. Eve makes the capability inventory visible through files.',
        ],
      },
      {
        heading: 'Pick the model that matches the failure mode',
        body: [
          'If the workflow fails because routing is complex, a graph-first system helps. If it fails because role handoffs are unclear, a crew model may help. If it fails because no one can see what the agent can do, a filesystem-first layout is useful.',
          'This is also why tutorials are misleading. A hello-world agent does not show retries, approvals, duplicate webhooks, bad tool arguments, or source review.',
        ],
      },
      {
        heading: 'Where Eve belongs in the comparison',
        body: [
          'Eve is most interesting for TypeScript teams that want durable backend agents with a visible project layout. It pairs naturally with source-owned distribution because the agent is already organized as files.',
          'That does not make Eve the universal answer. It makes Eve a strong answer when inspectability, installable source, and platform entry points are central.',
        ],
      },
    ],
    decisionRows: [
      {
        choice: 'Graph-first',
        useWhen:
          'The workflow depends on explicit branching, loops, and checkpointed state.',
        avoidWhen:
          'The main challenge is source ownership and capability review.',
      },
      {
        choice: 'Role-first',
        useWhen:
          'The workflow maps cleanly to specialist roles and fast collaboration.',
        avoidWhen:
          'The process needs strict control flow and durable side-effect boundaries.',
      },
      {
        choice: 'Filesystem-first',
        useWhen:
          'The team needs to inspect, install, and modify agent capabilities as source files.',
        avoidWhen:
          'The execution graph is the main artifact the team must reason about.',
      },
    ],
    examples: [
      {
        label: 'Eve-shaped system',
        body: 'A GitHub review agent with channel files, tools, skills, evals, and env examples benefits from a visible project tree.',
      },
      {
        label: 'Graph-shaped system',
        body: 'A claims workflow with many approval states and retry branches benefits from an explicit graph.',
      },
    ],
    faqs: [
      {
        question: 'What is the best AI agent framework?',
        answer:
          'There is no universal best. Match the framework to the workflow shape, team language, and failure modes.',
      },
      {
        question: 'Is TypeScript support enough to choose a framework?',
        answer:
          'No. TypeScript matters, but runtime state, observability, deployment, and project shape matter too.',
      },
      {
        question: 'How should teams evaluate frameworks?',
        answer:
          'Build a failure-path prototype with one external write, one retry, and one approval. Compare how easy it is to debug.',
      },
    ],
  },
  {
    slug: 'ai-agent-tools',
    title: 'AI agent tools: the safe way to give models actions',
    shortTitle: 'AI agent tools',
    description:
      'How to design agent tools with narrow authority, typed inputs, clear descriptions, and observable results.',
    cluster: 'agent-engineering',
    primaryKeyword: 'ai agent tools',
    relatedKeywords: ['agent tools', 'llm tools', 'tool calling'],
    summary:
      'A tool is authority. It lets the model request an action in the world. Good tools are narrow, typed, observable, and honest about side effects. Bad tools turn the agent into an unreviewable API gateway.',
    sections: [
      {
        heading: 'A tool is not just a helper function',
        body: [
          'In agent systems, tools are the bridge between reasoning and action. A model can ask to call a tool, pass arguments, read the result, and decide what to do next.',
          'That makes tool design a security and product decision. The tool name, description, schema, permissions, and output shape all influence how the agent behaves.',
        ],
      },
      {
        heading: 'Narrow tools beat clever tools',
        body: [
          'A broad tool feels flexible, but it moves complexity into the model prompt. A narrow tool gives the model fewer ways to be wrong. Compare `update_ticket_status` with a typed status enum to `run_linear_operation` with a free-form operation string.',
          'The narrow version is easier to test, easier to log, and easier to explain to users.',
        ],
      },
      {
        heading: 'How Eve helps review tools',
        body: [
          'Eve tools live in `agent/tools/`, so every callable action has a file. That layout makes review concrete: what can the model ask the system to do, and where is that behavior implemented?',
          'For registry-installed agents, this is especially useful. Users can inspect tool files before giving the agent credentials or connecting a channel.',
        ],
      },
    ],
    decisionRows: [
      {
        choice: 'Read tool',
        useWhen:
          'The model needs data from a system, such as schema, issue state, or file content.',
        avoidWhen:
          'The data can be attached as static context or a resource without model-controlled execution.',
      },
      {
        choice: 'Write tool',
        useWhen:
          'The agent needs to create, update, send, or trigger something outside itself.',
        avoidWhen:
          'The action is risky and lacks approval, idempotency, or audit logs.',
      },
      {
        choice: 'Composite tool',
        useWhen:
          'A sequence is deterministic and should not be controlled step-by-step by the model.',
        avoidWhen:
          'The sequence contains judgment points the model should inspect between steps.',
      },
    ],
    examples: [
      {
        label: 'Good tool',
        body: '`submit_pr_review` accepts a review body and inline comments, then posts one GitHub review with clear rate limits and logging.',
      },
      {
        label: 'Risky tool',
        body: '`github_action` accepts any operation and arbitrary JSON. It may demo quickly, but it is difficult to permission or test.',
      },
    ],
    faqs: [
      {
        question: 'Should tools be tiny?',
        answer:
          'They should be narrow, not necessarily tiny. A tool can do several deterministic steps if the model should not decide between them.',
      },
      {
        question: 'Where should validation happen?',
        answer:
          'Validate at the tool boundary with schemas and runtime checks. Do not rely on prompt instructions alone.',
      },
      {
        question: 'Should a tool return prose or data?',
        answer:
          'Return structured data when the agent will reason over it. Use prose only when the output is meant for a human.',
      },
    ],
  },
  {
    slug: 'mcp-vs-skills',
    title: 'MCP vs skills: do you need a connection or a playbook?',
    shortTitle: 'MCP vs skills',
    description:
      'A grounded distinction between MCP servers, tools, resources, prompts, and skills for teams extending AI agents.',
    cluster: 'protocols',
    primaryKeyword: 'mcp vs skills',
    relatedKeywords: ['model context protocol', 'ai skills', 'mcp tools'],
    summary:
      'MCP gives an AI application a standard way to reach external capabilities. Skills give an agent a reusable way to approach a task. They often work together, but they are not substitutes.',
    sections: [
      {
        heading: 'The common confusion',
        body: [
          'Both MCP and skills show up when people ask how to give an agent more context. That phrase hides two different needs. Sometimes the agent needs access to a system: list tables, read a file, search docs, create an issue. Sometimes the agent needs a method: review a migration, write in a brand voice, or triage an incident.',
          'MCP is strongest for the first need. Skills are strongest for the second.',
        ],
      },
      {
        heading: 'MCP is an interface to capabilities',
        body: [
          'An MCP server exposes tools, resources, and prompts through a standard protocol. The client can discover what is available and call into those capabilities without each agent inventing a custom integration.',
          'This is useful when the capability should be shared across many clients or agents. A Postgres MCP server, a Linear MCP server, or a docs search MCP server can serve multiple workflows.',
        ],
      },
      {
        heading: 'Skills are procedural context',
        body: [
          'A skill is closer to a field manual. It tells the agent how to perform a class of work: what to check, what to avoid, what output shape to use, what examples matter.',
          'Skills should not hide credentials or grant authority. They can tell the model to use a read-only SQL tool carefully, but the read-only boundary must still live in the tool, database role, MCP server, or runtime policy.',
        ],
      },
    ],
    decisionRows: [
      {
        choice: 'MCP',
        useWhen:
          'The agent needs live access to external tools, resources, or server-provided prompts.',
        avoidWhen: 'The agent only needs local procedure or writing rules.',
      },
      {
        choice: 'Skill',
        useWhen:
          'The agent needs repeatable judgment, checklists, examples, or output standards.',
        avoidWhen: 'The agent needs credentials or live system access.',
      },
      {
        choice: 'Both',
        useWhen:
          'A workflow needs external capability plus domain-specific procedure.',
        avoidWhen:
          'The combination adds indirection without improving reuse or safety.',
      },
    ],
    examples: [
      {
        label: 'Eve example',
        body: 'A database analyst can use MCP for database access and a skill for metric definitions, SQL safety rules, and answer format.',
      },
      {
        label: 'Outside Eve',
        body: 'A coding assistant can connect to an MCP server while loading project-specific skills from the repository.',
      },
    ],
    faqs: [
      {
        question: 'Can a skill call an MCP tool?',
        answer:
          'A skill can tell the agent when and how to use the tool. The runtime still performs the actual tool call.',
      },
      {
        question: 'Can MCP replace skills?',
        answer:
          'No. MCP can expose prompts, but skills remain useful for local, portable procedure and examples.',
      },
      {
        question: 'Which is safer?',
        answer:
          'Neither by default. Safety comes from scopes, validation, approvals, and logs.',
      },
    ],
  },
  {
    slug: 'agent-registry',
    title: 'Agent registry: discovery without trust is just a list',
    shortTitle: 'Agent registry',
    description:
      'What an AI agent registry must expose before developers can reuse agents safely.',
    cluster: 'distribution',
    primaryKeyword: 'agent registry',
    relatedKeywords: [
      'ai agent registry',
      'agent catalog',
      'agent marketplace',
    ],
    summary:
      'An agent registry should help a developer answer whether an agent is safe, maintained, installable, and worth adapting. Discovery is only the first step.',
    sections: [
      {
        heading: 'The registry problem is trust',
        body: [
          'Agents carry instructions, tools, external access, schedules, and sometimes public-facing channels. A card with a name and a nice description is not enough to install anything safely.',
          'A useful registry shows the operational surface: installed files, dependencies, author, update date, install command, and the systems the agent can reach.',
        ],
      },
      {
        heading: 'Registry, catalog, marketplace',
        body: [
          'A catalog helps people browse inventory. A marketplace helps people choose between vendors. A registry should provide structured metadata and installation paths.',
          'For developer agents, the registry model is often the right starting point because the user needs to inspect and own the artifact.',
        ],
      },
      {
        heading: 'What a registry item needs',
        body: [
          'A real registry item has a clear job, source files, target paths, dependencies, setup instructions, author identity, and update metadata. Install counts are useful, but they are secondary to inspectability.',
        ],
        bullets: [
          'Files and target paths',
          'Dependencies and environment variables',
          'Author and source review path',
          'Install command and previewable output',
        ],
      },
    ],
    decisionRows: [
      {
        choice: 'Public registry',
        useWhen:
          'Reusable artifacts should be discoverable and installable across projects.',
        avoidWhen:
          'The agents depend on private infrastructure or internal policy.',
      },
      {
        choice: 'Internal registry',
        useWhen:
          'A company needs approved agents, private tools, and governance.',
        avoidWhen: 'The goal is open contribution and public discovery.',
      },
      {
        choice: 'Marketplace',
        useWhen:
          'Commerce, licensing, reviews, and support are part of the product.',
        avoidWhen: 'The core value is source-owned installation.',
      },
    ],
    examples: [
      {
        label: 'evex-style registry',
        body: 'An agent page shows files, dependencies, author, install command, and related agents. Canonical agent content lives in source.',
      },
      {
        label: 'Enterprise registry',
        body: 'A company registry may track approved MCP servers, internal agents, policy status, owners, and deployment state.',
      },
    ],
    faqs: [
      {
        question: 'What makes an agent registry trustworthy?',
        answer:
          'Transparent files, clear ownership, dependency disclosure, review history, and install previews.',
      },
      {
        question: 'Should a registry store runtime state?',
        answer:
          'It can store metrics and favorites, but canonical source metadata should stay close to the files being installed.',
      },
      {
        question: 'Is evex an agent marketplace?',
        answer:
          'Not in the commerce sense. It is a community registry for reusable Eve agent configurations.',
      },
    ],
  },
  {
    slug: 'shadcn-registry-for-agents',
    title: 'Shadcn registry for agents: installing workflows as source files',
    shortTitle: 'Shadcn registry for agents',
    description:
      'How the shadcn registry model applies to AI agent workflows, where users need source files rather than opaque packages.',
    cluster: 'distribution',
    primaryKeyword: 'shadcn registry',
    relatedKeywords: [
      'custom shadcn registry',
      'registry json',
      'shadcn registry item',
    ],
    summary:
      'The shadcn registry model fits agents because many agent workflows are source bundles: instructions, tools, skills, env examples, evals, and integration files that users need to inspect and adapt.',
    sections: [
      {
        heading: 'A reusable agent is not just a dependency',
        body: [
          'Traditional packages work well when the user wants stable behavior behind an import. Agent workflows often need the opposite. The user wants to see the prompt, adjust the tool, change the channel, remove an integration, or add a stricter approval step.',
          'Source distribution makes that normal. Install the files into the project, own them, and change them.',
        ],
      },
      {
        heading: 'What the registry must show before install',
        body: [
          'A serious agent registry should expose files, target paths, dependencies, author, category, update date, and install command. Otherwise the user cannot answer the basic question: what will this add to my project?',
          'This is especially important for agents because installed files can contain authority: tools that write to APIs, channels that receive webhooks, schedules that run unattended, and skills that shape judgment.',
        ],
      },
      {
        heading: 'Why it pairs well with Eve',
        body: [
          'Eve already organizes agents as files under `agent/`. A shadcn registry item can place those files into the expected locations, while the user keeps ownership of the result.',
          'That is the practical connection: the registry distributes the working shape of the agent, not a black-box runtime.',
        ],
      },
    ],
    decisionRows: [
      {
        choice: 'Shadcn registry item',
        useWhen:
          'Users should own, inspect, and modify the installed agent files.',
        avoidWhen:
          'The artifact is a stable library better consumed as a normal package.',
      },
      {
        choice: 'npm package',
        useWhen:
          'The behavior is reusable code with a stable API and little need for local editing.',
        avoidWhen:
          'Prompts, tools, env files, and workflow policy need project ownership.',
      },
      {
        choice: 'Docs snippet',
        useWhen: 'The setup is tiny and educational.',
        avoidWhen:
          'The workflow has enough files that copy-paste becomes unreliable.',
      },
    ],
    examples: [
      {
        label: 'Eve example',
        body: 'An evex item can install `agent/agent.ts`, `agent/instructions.md`, `agent/tools/run_sql.ts`, a skill folder, README, and `.env.example` into the expected Eve layout.',
      },
      {
        label: 'Outside Eve',
        body: 'The same registry mechanism can distribute project rules, MCP setup, CI workflows, and framework templates.',
      },
    ],
    faqs: [
      {
        question: 'Why not publish every agent as an npm package?',
        answer:
          'Because users often need to inspect and change prompts, tools, schedules, and channel behavior.',
      },
      {
        question: 'What makes a registry item good?',
        answer:
          'A clear job, explicit target paths, dependency declarations, setup docs, and files that belong together.',
      },
      {
        question: 'Is customization expected?',
        answer:
          'Yes. The registry gives users a reviewed starting point, not a permanent black box.',
      },
    ],
  },
  {
    slug: 'langgraph-vs-crewai',
    title: 'LangGraph vs CrewAI: graph control or role-based crews?',
    shortTitle: 'LangGraph vs CrewAI',
    description:
      'A builder-focused comparison of LangGraph and CrewAI, with Eve as a file-based reference point.',
    cluster: 'comparisons',
    primaryKeyword: 'langgraph vs crewai',
    relatedKeywords: [
      'langgraph alternatives',
      'crewai alternatives',
      'ai agent frameworks',
    ],
    summary:
      'LangGraph and CrewAI start from different mental models. LangGraph makes workflow state and transitions explicit. CrewAI makes role-based collaboration quick to model. The right choice depends on which complexity your team needs to see first.',
    sections: [
      {
        heading: 'The real comparison is not popularity',
        body: [
          'Both frameworks can build useful agents. The difference is how they ask you to think. LangGraph asks you to model a stateful graph. CrewAI asks you to model a team of agents with roles and tasks.',
          'Those mental models lead to different debugging experiences. A graph helps when the failure is in routing. A crew helps when the work naturally decomposes into roles.',
        ],
      },
      {
        heading: 'Where LangGraph is stronger',
        body: [
          'LangGraph is a better fit when the workflow needs explicit branching, loops, checkpointed state, and human-in-the-loop transitions. It is also a better fit when you want to reason about the path a run took.',
          'The tradeoff is overhead. Simple workflows can feel verbose when forced into graph terms.',
        ],
      },
      {
        heading: 'Where CrewAI is stronger',
        body: [
          'CrewAI is attractive for fast prototypes and workflows that map to human-like roles: researcher, analyst, writer, reviewer. The abstraction is easy to explain and quick to start.',
          'The tradeoff appears when control flow gets complex. Role metaphors can hide state transitions that should be explicit.',
        ],
      },
      {
        heading: 'Where Eve differs',
        body: [
          'Eve is neither graph-first nor crew-first. It is filesystem-first. That makes it relevant when the agent is a backend project whose tools, skills, channels, schedules, and env requirements should be visible as files.',
        ],
      },
    ],
    decisionRows: [
      {
        choice: 'LangGraph',
        useWhen:
          'State transitions, retries, and explicit routing are the main complexity.',
        avoidWhen:
          'The workflow is simple enough that graph structure adds more weight than clarity.',
      },
      {
        choice: 'CrewAI',
        useWhen:
          'The task maps naturally to roles and fast multi-agent collaboration.',
        avoidWhen:
          'The workflow needs precise state control and durable side-effect boundaries.',
      },
      {
        choice: 'Eve',
        useWhen:
          'The agent should be inspected and installed as source files in a TypeScript project.',
        avoidWhen:
          'The execution graph is the main artifact the team must manage.',
      },
    ],
    examples: [
      {
        label: 'LangGraph-shaped workflow',
        body: 'A claims workflow with branching escalation paths, retries, and approval states benefits from explicit graph control.',
      },
      {
        label: 'CrewAI-shaped workflow',
        body: 'A research pipeline with researcher, analyst, and writer roles can be faster to express as a crew.',
      },
    ],
    faqs: [
      {
        question: 'Is LangGraph more production-ready than CrewAI?',
        answer:
          'It is often stronger for explicit state and control flow. CrewAI can still be useful when the role model fits the work.',
      },
      {
        question: 'Where does Eve fit in this comparison?',
        answer:
          'Eve is a different axis: file-owned backend agents rather than graph-first or role-first orchestration.',
      },
      {
        question: 'How should teams choose?',
        answer:
          'Build the hardest failure path in each candidate framework and compare which one is easier to debug.',
      },
    ],
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
