import { Badge } from '@evex/ui/badge'
import { Button } from '@evex/ui/button'
import { Card } from '@evex/ui/card'
import { Separator } from '@evex/ui/separator'
import { ArrowLeft, BookOpen, CheckCircle2, TriangleAlert } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import {
  getLearnCluster,
  getLearnPage,
  getRelatedLearnPages,
  listLearnPages,
} from '@/lib/learn-content'
import { createPageMetadata } from '@/lib/metadata'
import {
  createLearnArticleSchema,
  createLearnBreadcrumbSchema,
  createLearnFaqSchema,
} from '@/lib/structured-data'

const RELATED_PAGE_LIMIT = 4

export function generateStaticParams() {
  return listLearnPages().map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getLearnPage(slug)
  if (!page) {
    return createPageMetadata({
      title: 'Guide not found',
      description: 'This evex learning guide is no longer available.',
      path: `/learn/${slug}`,
      noIndex: true,
    })
  }

  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: `/learn/${page.slug}`,
  })
}

export default async function LearnDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getLearnPage(slug)
  if (!page) {
    notFound()
  }

  const cluster = getLearnCluster(page.cluster)
  const relatedPages = getRelatedLearnPages(page, RELATED_PAGE_LIMIT)
  const searchIntent = `This guide targets "${page.primaryKeyword}" and related questions like ${page.relatedKeywords.join(', ')}.`

  return (
    <>
      <JsonLd
        data={[
          createLearnArticleSchema(page),
          createLearnFaqSchema(page),
          createLearnBreadcrumbSchema(page),
        ]}
      />
      <main className="mx-auto w-full min-w-0 max-w-4xl px-4 py-10">
        <Link
          className="inline-flex min-h-9 items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground"
          href="/learn"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Learn
        </Link>

        <article className="mt-6">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{cluster.label}</Badge>
              <span className="mono-label text-muted-foreground">
                {page.audience}
              </span>
            </div>
            <h1 className="mt-4 text-balance font-semibold text-3xl text-foreground sm:text-4xl">
              {page.title}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-muted-foreground leading-relaxed">
              {page.description}
            </p>
          </header>

          <Card className="mt-8 rounded-md border border-border p-5 shadow-[var(--shadow-card)] ring-0">
            <span className="mono-label inline-flex items-center gap-2 text-brand">
              <BookOpen aria-hidden="true" className="size-4" />
              the short version
            </span>
            <p className="mt-3 text-pretty font-medium text-foreground leading-relaxed">
              {page.thesis}
            </p>
          </Card>

          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoBlock title="The problem" value={page.problem} />
            <InfoBlock title="Search intent" value={searchIntent} />
          </section>

          <section className="mt-10">
            <h2 className="font-display font-semibold text-foreground text-xl">
              Decision rules
            </h2>
            <div className="mt-4 grid gap-3">
              {page.decisionRules.map((rule) => (
                <div
                  className="flex gap-3 rounded-md border border-border bg-background p-4"
                  key={rule}
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-brand"
                  />
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            <InfoBlock title="Eve angle" value={page.eveAngle} />
            <InfoBlock title="Outside Eve" value={page.nonEveExample} />
          </section>

          <section className="mt-10 rounded-md border border-border bg-muted/25 p-5">
            <div className="flex items-center gap-2">
              <TriangleAlert aria-hidden="true" className="size-4 text-brand" />
              <h2 className="font-display font-semibold text-foreground text-lg">
                What not to do
              </h2>
            </div>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              {page.antiPattern}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display font-semibold text-foreground text-xl">
              FAQ
            </h2>
            <div className="mt-4 divide-y divide-border rounded-md border border-border">
              {page.faqs.map((faq) => (
                <div className="p-4" key={faq.question}>
                  <h3 className="font-medium text-foreground">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <Separator className="my-10" />

        <section>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display font-semibold text-foreground text-xl">
                Related guides
              </h2>
              <p className="mt-1 text-muted-foreground text-sm">
                Keep moving through the same decision space.
              </p>
            </div>
            <Button render={<Link href="/">Browse installable agents</Link>} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedPages.map((relatedPage) => (
              <Link
                className="rounded-md border border-border p-4 transition-colors hover:border-input hover:bg-muted/40"
                href={`/learn/${relatedPage.slug}`}
                key={relatedPage.slug}
              >
                <span className="mono-label text-muted-foreground">
                  {relatedPage.primaryKeyword}
                </span>
                <h3 className="mt-2 font-medium text-foreground">
                  {relatedPage.shortTitle}
                </h3>
                <p className="mt-2 line-clamp-2 text-muted-foreground text-sm leading-relaxed">
                  {relatedPage.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <Card className="rounded-md border border-border p-5 shadow-[var(--shadow-card)] ring-0">
      <h2 className="font-display font-semibold text-foreground text-lg">
        {title}
      </h2>
      <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
        {value}
      </p>
    </Card>
  )
}
