import 'server-only'

export const cacheTags = {
  agents: 'agents',
  leaderboard: 'leaderboard',
  registryStats: 'registry-stats',
} as const

export function getAgentTag(slug: string) {
  return `agent:${slug}`
}

export function getAuthorAgentsTag(userId: string) {
  return `author-agents:${userId}`
}

export function getProfileTag(userId: string) {
  return `profile:${userId}`
}
