export interface CatalogAgentAuthor {
  readonly avatarUrl?: string
  readonly githubUsername: string | null
  readonly name: string
  readonly url?: string
}

export interface AgentWithAuthor {
  author: CatalogAgentAuthor
  authorAvatarUrl: string | null
  authorName: string
  authorUsername: string | null
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
}

export interface AgentRegistryFile {
  content: string
  id: string
  path: string
  type: string
}

export interface StaticAuthorProfile {
  agentCount: number
  avatarUrl: string | null
  githubUsername: string
  name: string
  totalInstalls: number
  url: string | null
}
