import { toNextJsHandler } from 'better-auth/next-js'
import { checkBotId } from 'botid/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const { GET, POST: authPOST } = toNextJsHandler(auth.handler)

export { GET }

export async function POST(request: NextRequest) {
  const verification = await checkBotId()

  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  return authPOST(request)
}
