import { NextResponse } from 'next/server'
import { listAgents } from '@/lib/queries'
import { buildRegistryCatalog } from '@/lib/registry'
import { getBaseUrl } from '@/lib/site-url'

// Public shadcn registry catalog. The catalog powers CLI discovery
// (`list`/`search`), while individual item URLs still serve file contents.
export async function GET() {
  const [agents, baseUrl] = await Promise.all([listAgents(), getBaseUrl()])
  const registry = buildRegistryCatalog(agents, baseUrl)

  return NextResponse.json(registry, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=60',
    },
  })
}
