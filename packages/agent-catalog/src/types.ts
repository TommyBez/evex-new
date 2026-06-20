export interface CatalogAgentAuthor {
  readonly avatarUrl?: string
  readonly id: string
  readonly name: string
  readonly url?: string
}

export interface CatalogAgentFile {
  readonly content: string
  readonly path: string
  readonly type: 'registry:file'
}

export interface CatalogAgent {
  readonly appRoot: string
  readonly author: CatalogAgentAuthor
  readonly category: string
  readonly createdAt: string
  readonly dependencies: readonly string[]
  readonly description: string
  readonly files: readonly CatalogAgentFile[]
  readonly name: string
  readonly slug: string
  readonly title: string
  readonly updatedAt: string
}
