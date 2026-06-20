import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { AuthForm } from '@/components/auth-form'
import { Skeleton } from '@/components/ui/skeleton'
import { auth } from '@/lib/auth'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Sign up',
  description: 'Create an evex-new account to publish and manage eve agents.',
  path: '/sign-up',
  noIndex: true,
})

export default function SignUpPage() {
  return (
    <Suspense fallback={<AuthPageSkeleton />}>
      <SignUpContent />
    </Suspense>
  )
}

async function SignUpContent() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) {
    redirect('/favorites')
  }
  return <AuthForm mode="sign-up" />
}

function AuthPageSkeleton() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="space-y-4 rounded-md border border-border p-6">
          <div className="space-y-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </main>
  )
}
