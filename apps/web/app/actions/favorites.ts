'use server'

import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { checkHuman } from '@/lib/bot-id'
import { getCurrentUser } from '@/lib/current-user'
import { db } from '@/lib/db'
import { agentFavorite } from '@/lib/db/schema'
import { getAgentBySlug } from '@/lib/queries'

export type ToggleFavoriteResult =
  | { ok: true; isFavorite: boolean }
  | { ok: false; error: string }

export async function toggleFavorite(
  agentId: string,
  shouldFavorite: boolean,
): Promise<ToggleFavoriteResult> {
  const botCheck = await checkHuman()
  if (!botCheck.ok) {
    return { ok: false, error: botCheck.error }
  }

  const user = await getCurrentUser()
  if (!user) {
    return { ok: false, error: 'Sign in to save favorites.' }
  }

  const agentSlug = agentId.trim()
  if (!agentSlug) {
    return { ok: false, error: 'Invalid agent id.' }
  }

  if (typeof shouldFavorite !== 'boolean') {
    return { ok: false, error: 'Invalid favorite state.' }
  }

  const agent = await getAgentBySlug(agentSlug)
  if (!agent) {
    return { ok: false, error: 'Agent not found.' }
  }

  if (shouldFavorite) {
    await db
      .insert(agentFavorite)
      .values({ userId: user.id, agentSlug })
      .onConflictDoNothing()
  } else {
    await db
      .delete(agentFavorite)
      .where(
        and(
          eq(agentFavorite.userId, user.id),
          eq(agentFavorite.agentSlug, agentSlug),
        ),
      )
  }

  revalidateFavoritePaths(agentSlug, agent.userId)
  return { ok: true, isFavorite: shouldFavorite }
}

function revalidateFavoritePaths(slug: string, authorId: string) {
  revalidatePath('/')
  revalidatePath('/favorites')
  revalidatePath(`/agents/${slug}`)
  revalidatePath(`/authors/${authorId}`)
}
