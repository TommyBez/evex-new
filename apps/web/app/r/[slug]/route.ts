import { NextResponse } from 'next/server'
import { incrementInstallCount } from '@/app/actions/agents'
import { getAgentBySlug, getAgentFiles } from '@/lib/queries'
import { buildAgentRegistryItem } from '@/lib/registry'
import { getBaseUrl } from '@/lib/site-url'

const LEGACY_JSON_SUFFIX = /\.json$/

// Serves a shadcn registry item at /r/[slug] and keeps /r/[slug].json working
// for backwards compatibility. The shadcn CLI writes each `registry:file` to
// its `target` path inside the consumer's project — for eve agents that means
// the `agent/` directory.
//
// Schema: https://ui.shadcn.com/schema/registry-item.json
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug: rawSlug } = await params
  // Accept both `/r/<slug>` and the `.json` item URL `/r/<slug>.json`.
  const slug = rawSlug.replace(LEGACY_JSON_SUFFIX, '')

  const agent = await getAgentBySlug(slug)
  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }

  const [files, baseUrl] = await Promise.all([
    getAgentFiles(agent.slug),
    getBaseUrl(),
  ])
  const registryItem = buildAgentRegistryItem(agent, files, baseUrl)

  // Best-effort install tracking; never block the response on it.
  incrementInstallCount(slug).catch(() => {
    // Best-effort tracking; ignore failures.
  })

  return NextResponse.json(registryItem, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=60',
    },
  })
}
