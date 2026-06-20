import type { Registry, RegistryItem } from 'shadcn/schema'
import type { AgentWithAuthor } from '@/lib/queries'

export const EVEX_REGISTRY_NAME = 'evex-new'
export const EVEX_REGISTRY_NAMESPACE = '@evex-new'

const REGISTRY_SCHEMA_URL = 'https://ui.shadcn.com/schema/registry.json'
const REGISTRY_ITEM_SCHEMA_URL =
  'https://ui.shadcn.com/schema/registry-item.json'

type RegistryAgent = Pick<
  AgentWithAuthor,
  'slug' | 'name' | 'description' | 'category' | 'authorName' | 'installCount'
>

interface RegistryAgentFile {
  content: string
  path: string
}

function categoriesForAgent(agent: RegistryAgent): string[] {
  return [agent.category || 'general']
}

function docsForAgent(agent: RegistryAgent, baseUrl: string): string {
  return [
    `${agent.name} installs as a standalone eve app in ./${agent.slug}.`,
    `Registry page: ${baseUrl}/agents/${agent.slug}`,
    `After install, run: cd ${agent.slug} && pnpm install && pnpm dev`,
    'Review the generated files and configure any credentials required by the agent before running it.',
  ].join('\n')
}

function commonAgentRegistryFields(agent: RegistryAgent, baseUrl: string) {
  return {
    name: agent.slug,
    type: 'registry:file',
    title: agent.name,
    author: agent.authorName,
    description: agent.description,
    dependencies: [],
    categories: categoriesForAgent(agent),
    docs: docsForAgent(agent, baseUrl),
    meta: {
      registry: EVEX_REGISTRY_NAME,
      slug: agent.slug,
      installs: agent.installCount,
    },
  } satisfies Omit<RegistryItem, '$schema' | 'files'>
}

const WINDOWS_ABSOLUTE_PATH = /^[A-Za-z]:\//

function toSafeRegistryFilePath(rawPath: string): string {
  const normalized = rawPath.trim().replace(/\\/g, '/')
  const segments = normalized.split('/')

  if (
    normalized.startsWith('/') ||
    WINDOWS_ABSOLUTE_PATH.test(normalized) ||
    segments.includes('..') ||
    segments.includes('')
  ) {
    throw new Error(`Invalid registry file path: ${rawPath}`)
  }

  return normalized
}

function toRegistryTargetPath(agent: RegistryAgent, rawPath: string): string {
  return `${agent.slug}/${toSafeRegistryFilePath(rawPath)}`
}

export function buildAgentRegistryItem(
  agent: RegistryAgent,
  files: RegistryAgentFile[],
  baseUrl: string,
): RegistryItem {
  return {
    $schema: REGISTRY_ITEM_SCHEMA_URL,
    ...commonAgentRegistryFields(agent, baseUrl),
    files: files.map((file) => {
      const path = toRegistryTargetPath(agent, file.path)

      return {
        path,
        target: path,
        type: 'registry:file',
        content: file.content,
      }
    }),
  }
}

export function buildRegistryCatalog(
  agents: RegistryAgent[],
  baseUrl: string,
): Registry {
  return {
    $schema: REGISTRY_SCHEMA_URL,
    name: EVEX_REGISTRY_NAME,
    homepage: baseUrl,
    items: agents.map((agent) => ({
      ...commonAgentRegistryFields(agent, baseUrl),
    })),
  }
}
