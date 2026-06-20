import 'server-only'

import { getCurrentUser } from '@/lib/current-user'
import { getFavoriteAgentIds } from '@/lib/queries'

interface FavoriteState {
  favoriteAgentIdSet: Set<string>
  isAuthenticated: boolean
}

export async function resolveFavoriteState(
  agentIds: string[],
): Promise<FavoriteState> {
  const user = await getCurrentUser()
  if (!user || agentIds.length === 0) {
    return {
      favoriteAgentIdSet: new Set<string>(),
      isAuthenticated: Boolean(user),
    }
  }

  const favoriteAgentIds = await getFavoriteAgentIds(user.id, agentIds)
  return {
    favoriteAgentIdSet: new Set(favoriteAgentIds),
    isAuthenticated: true,
  }
}
