import 'server-only'

import {
  type CatalogAgent,
  type CatalogAgentAuthor,
  type CatalogAgentFile,
  catalogAgents,
} from '@evex-new/agent-catalog'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { cacheLife, cacheTag } from 'next/cache'
import {
  cacheTags,
  getAgentTag,
  getAuthorAgentsTag,
  getProfileTag,
} from '@/lib/cache-tags'
import { db } from '@/lib/db'
import {
  agentFavorite,
  agentInstallMetric,
  profile,
  user,
} from '@/lib/db/schema'

export interface AgentWithAuthor {
  author: CatalogAgentAuthor
  authorAvatarUrl: string | null
  authorName: string
  category: string
  createdAt: Date
  dependencies: string
  description: string
  id: string
  installCount: number
  name: string
  slug: string
  title: string
  updatedAt: Date
  userId: string
}

export type AgentRegistryFile = CatalogAgentFile & { id: string }

export interface StaticAuthorProfile {
  agentCount: number
  avatarUrl: string | null
  name: string
  totalInstalls: number
  url: string | null
  userId: string
}

const catalogAgentBySlug = new Map(
  catalogAgents.map((agent) => [agent.slug, agent]),
)

function compareByInstalls(left: AgentWithAuthor, right: AgentWithAuthor) {
  if (right.installCount !== left.installCount) {
    return right.installCount - left.installCount
  }
  return right.createdAt.getTime() - left.createdAt.getTime()
}

function matchesSearch(agent: CatalogAgent, search: string): boolean {
  const term = search.trim().toLowerCase()
  if (!term) {
    return true
  }

  return [
    agent.name,
    agent.title,
    agent.description,
    agent.author.name,
    agent.slug,
  ].some((value) => value.toLowerCase().includes(term))
}

async function getInstallCountMap(
  slugs?: string[],
): Promise<Map<string, number>> {
  if (slugs && slugs.length === 0) {
    return new Map()
  }

  try {
    const rows = slugs
      ? await db
          .select({
            installCount: agentInstallMetric.installCount,
            slug: agentInstallMetric.slug,
          })
          .from(agentInstallMetric)
          .where(inArray(agentInstallMetric.slug, slugs))
      : await db
          .select({
            installCount: agentInstallMetric.installCount,
            slug: agentInstallMetric.slug,
          })
          .from(agentInstallMetric)

    return new Map(rows.map((row) => [row.slug, row.installCount]))
  } catch {
    return new Map()
  }
}

function toAgentWithAuthor(
  agent: CatalogAgent,
  installCounts: Map<string, number>,
): AgentWithAuthor {
  return {
    author: agent.author,
    authorAvatarUrl: agent.author.avatarUrl ?? null,
    authorName: agent.author.name,
    category: agent.category,
    createdAt: new Date(agent.createdAt),
    dependencies: agent.dependencies.join(','),
    description: agent.description,
    id: agent.slug,
    installCount: installCounts.get(agent.slug) ?? 0,
    name: agent.name,
    slug: agent.slug,
    title: agent.title,
    updatedAt: new Date(agent.updatedAt),
    userId: agent.author.id,
  }
}

async function hydrateAgents(agents: readonly CatalogAgent[]) {
  const installCounts = await getInstallCountMap(
    agents.map((agent) => agent.slug),
  )
  return agents.map((agent) => toAgentWithAuthor(agent, installCounts))
}

export async function listAgents(opts?: {
  search?: string
  category?: string
}): Promise<AgentWithAuthor[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag(cacheTags.agents)

  const filtered = catalogAgents.filter((agent) => {
    if (
      opts?.category &&
      opts.category !== 'all' &&
      agent.category !== opts.category
    ) {
      return false
    }
    if (opts?.search && !matchesSearch(agent, opts.search)) {
      return false
    }
    return true
  })

  return (await hydrateAgents(filtered)).sort(compareByInstalls)
}

export async function getAgentBySlug(
  slug: string,
): Promise<AgentWithAuthor | null> {
  'use cache'
  cacheLife('minutes')
  cacheTag(cacheTags.agents)
  cacheTag(getAgentTag(slug))

  const agent = catalogAgentBySlug.get(slug)
  if (!agent) {
    return null
  }
  const [hydrated] = await hydrateAgents([agent])
  return hydrated ?? null
}

export function getAgentFiles(slug: string): AgentRegistryFile[] {
  const agent = catalogAgentBySlug.get(slug)
  return (
    agent?.files.map((file) => ({
      ...file,
      id: `${slug}:${file.path}`,
    })) ?? []
  )
}

export async function getAgentsByUser(
  userId: string,
): Promise<AgentWithAuthor[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag(cacheTags.agents)
  cacheTag(getAuthorAgentsTag(userId))

  return (
    await hydrateAgents(
      catalogAgents.filter((agent) => agent.author.id === userId),
    )
  ).sort(compareByInstalls)
}

export async function getStaticAuthorProfile(
  authorId: string,
): Promise<StaticAuthorProfile | null> {
  'use cache'
  cacheLife('minutes')
  cacheTag(cacheTags.agents)
  cacheTag(getAuthorAgentsTag(authorId))

  const agents = await getAgentsByUser(authorId)
  const author = catalogAgents.find(
    (agent) => agent.author.id === authorId,
  )?.author
  if (!author) {
    return null
  }

  return {
    agentCount: agents.length,
    avatarUrl: author.avatarUrl ?? null,
    name: author.name,
    totalInstalls: agents.reduce((sum, agent) => sum + agent.installCount, 0),
    url: author.url ?? null,
    userId: author.id,
  }
}

export async function getFavoriteAgentIds(
  userId: string,
  agentIds?: string[],
): Promise<string[]> {
  if (agentIds && agentIds.length === 0) {
    return []
  }

  const rows = agentIds
    ? await db
        .select({ agentSlug: agentFavorite.agentSlug })
        .from(agentFavorite)
        .where(
          and(
            eq(agentFavorite.userId, userId),
            inArray(agentFavorite.agentSlug, agentIds),
          ),
        )
    : await db
        .select({ agentSlug: agentFavorite.agentSlug })
        .from(agentFavorite)
        .where(eq(agentFavorite.userId, userId))

  return rows
    .map((row) => row.agentSlug)
    .filter((slug) => catalogAgentBySlug.has(slug))
}

export async function getFavoriteAgents(
  userId: string,
): Promise<AgentWithAuthor[]> {
  const rows = await db
    .select({ agentSlug: agentFavorite.agentSlug })
    .from(agentFavorite)
    .where(eq(agentFavorite.userId, userId))
    .orderBy(desc(agentFavorite.createdAt))

  const favoriteAgents = rows
    .map((row) => catalogAgentBySlug.get(row.agentSlug))
    .filter((agent): agent is CatalogAgent => Boolean(agent))

  return await hydrateAgents(favoriteAgents)
}

export interface PublicProfile {
  avatarUrl: string | null
  bio: string
  githubUrl: string | null
  linkedinUrl: string | null
  name: string
  twitterUrl: string | null
  userId: string
  websiteUrl: string | null
}

// Account profile data remains dynamic. It is no longer the source of truth for
// Agent authorship comes from agent.catalog.json in each agent app.
export async function getPublicProfile(
  userId: string,
): Promise<PublicProfile | null> {
  'use cache'
  cacheLife('hours')
  cacheTag(getProfileTag(userId))

  const [row] = await db
    .select({
      userId: user.id,
      name: user.name,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      websiteUrl: profile.websiteUrl,
      githubUrl: profile.githubUrl,
      twitterUrl: profile.twitterUrl,
      linkedinUrl: profile.linkedinUrl,
    })
    .from(user)
    .leftJoin(profile, eq(profile.userId, user.id))
    .where(eq(user.id, userId))
    .limit(1)

  if (!row) {
    return null
  }
  return {
    userId: row.userId,
    name: row.name,
    bio: row.bio ?? '',
    avatarUrl: row.avatarUrl ?? null,
    websiteUrl: row.websiteUrl ?? null,
    githubUrl: row.githubUrl ?? null,
    twitterUrl: row.twitterUrl ?? null,
    linkedinUrl: row.linkedinUrl ?? null,
  }
}

export async function getTopAgents(limit = 20): Promise<AgentWithAuthor[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag(cacheTags.leaderboard)

  return (await hydrateAgents(catalogAgents))
    .sort(compareByInstalls)
    .slice(0, limit)
}

export interface AuthorRanking {
  agentCount: number
  authorName: string
  avatarUrl: string | null
  totalInstalls: number
  userId: string
}

export async function getTopAuthors(limit = 20): Promise<AuthorRanking[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag(cacheTags.leaderboard)

  const agents = await hydrateAgents(catalogAgents)
  const authorMap = new Map<string, AuthorRanking>()

  for (const agent of agents) {
    const existing = authorMap.get(agent.userId) ?? {
      agentCount: 0,
      authorName: agent.authorName,
      avatarUrl: agent.authorAvatarUrl,
      totalInstalls: 0,
      userId: agent.userId,
    }
    existing.agentCount += 1
    existing.totalInstalls += agent.installCount
    authorMap.set(agent.userId, existing)
  }

  return [...authorMap.values()]
    .sort((left, right) => {
      if (right.totalInstalls !== left.totalInstalls) {
        return right.totalInstalls - left.totalInstalls
      }
      return right.agentCount - left.agentCount
    })
    .slice(0, limit)
}

export async function getRegistryStats() {
  'use cache'
  cacheLife('minutes')
  cacheTag(cacheTags.registryStats)

  const agents = await hydrateAgents(catalogAgents)
  return {
    total: agents.length,
    installs: agents.reduce((sum, agent) => sum + agent.installCount, 0),
    authors: new Set(agents.map((agent) => agent.userId)).size,
  }
}
