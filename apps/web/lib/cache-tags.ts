import 'server-only'

export const cacheTags = {
  agents: 'agents',
  leaderboard: 'leaderboard',
  registryStats: 'registry-stats',
} as const

export function getAgentTag(slug: string) {
  return `agent:${slug}`
}

export function getAuthorAgentsTag(githubUsername: string) {
  return `author-agents:${githubUsername}`
}

export function getProfileTag(userId: string) {
  return `profile:${userId}`
}
