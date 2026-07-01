import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/metadata'
import { listStaticAgents } from '@/lib/static-agents'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const now = new Date()
  const agents = listStaticAgents()
  const authorUsernames = [
    ...new Set(
      agents
        .map((agent) => agent.authorUsername)
        .filter((username): username is string => Boolean(username)),
    ),
  ]

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/leaderboard`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  const agentRoutes: MetadataRoute.Sitemap = agents.map((agent) => ({
    url: `${siteUrl}/agents/${agent.slug}`,
    lastModified: agent.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const authorRoutes: MetadataRoute.Sitemap = authorUsernames.map(
    (githubUsername) => ({
      url: `${siteUrl}/authors/${githubUsername}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }),
  )

  return [...staticRoutes, ...agentRoutes, ...authorRoutes]
}
