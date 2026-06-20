import { checkBotId } from 'botid/server'

export type BotCheckResult = { ok: true } | { ok: false; error: string }

export async function checkHuman(): Promise<BotCheckResult> {
  const verification = await checkBotId()

  if (verification.isBot) {
    return { ok: false, error: 'Access denied.' }
  }

  return { ok: true }
}

export async function requireHuman(): Promise<void> {
  const result = await checkHuman()
  if (!result.ok) {
    throw new Error(result.error)
  }
}
