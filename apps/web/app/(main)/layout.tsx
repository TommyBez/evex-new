import { Suspense } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader, SiteHeaderFallback } from '@/components/site-header'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Suspense fallback={<SiteHeaderFallback />}>
        <SiteHeader />
      </Suspense>
      <div className="flex w-full min-w-0 flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  )
}
