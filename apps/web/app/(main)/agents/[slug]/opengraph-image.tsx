import { createOgImage, ogImageContentType, ogImageSize } from '@/lib/og-image'
import { getAgentBySlug } from '@/lib/queries'

export const alt = 'Agent on evex-new'
export const size = ogImageSize
export const contentType = ogImageContentType
export const runtime = 'nodejs'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const agent = await getAgentBySlug(slug)

  if (!agent) {
    return createOgImage(
      {
        eyebrow: 'agent',
        title: 'Agent not found',
        description: 'This evex-new registry item is no longer available.',
      },
      { status: 404 },
    )
  }

  return createOgImage({
    eyebrow: `${agent.category} agent`,
    title: agent.name,
    description: agent.title || agent.description,
    footer: `npx shadcn@latest add @evex-new/${agent.slug}`,
    meta: [
      `by ${agent.authorName}`,
      `${agent.installCount} installs`,
      `@evex-new/${agent.slug}`,
    ],
  })
}
