// Shared helpers and types for working with eve agents in the registry.

export const AGENT_CATEGORIES = [
  'general',
  'coding',
  'research',
  'support',
  'data',
  'productivity',
  'devops',
] as const

export type AgentCategory = (typeof AGENT_CATEGORIES)[number]

const DEPENDENCY_SPLIT = /[\s,]+/

// Parse the comma/space separated dependency string into a clean array.
export function parseDependencies(raw: string): string[] {
  return raw
    .split(DEPENDENCY_SPLIT)
    .map((dependency) => dependency.trim())
    .filter(Boolean)
}
