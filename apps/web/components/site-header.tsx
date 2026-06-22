import { headers } from 'next/headers'
import Link from 'next/link'
import { BrandMark } from '@/components/brand-mark'
import { type CommandAgent, CommandMenu } from '@/components/command-menu'
import {
  CommandMenuBarTrigger,
  CommandMenuIconTrigger,
} from '@/components/command-menu-trigger'
import { GitHubStarButton } from '@/components/github-star-button'
import { MobileNavMenu } from '@/components/mobile-nav-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { UserMenu } from '@/components/user-menu'
import { auth } from '@/lib/auth'
import { listStaticAgents } from '@/lib/static-agents'

function getCommandAgents(): CommandAgent[] {
  return listStaticAgents().map((agent) => ({
    slug: agent.slug,
    name: agent.name,
    category: agent.category,
    description: agent.description,
    authorName: agent.authorName,
  }))
}

export function SiteHeaderFallback() {
  return (
    <header className="sticky top-0 z-40 w-full border-border border-b bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full min-w-0 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-6">
          <Link className="flex items-center gap-2 text-foreground" href="/">
            <BrandMark />
            <span className="brand-wordmark">evex</span>
          </Link>
          <Link
            className="hidden font-medium text-muted-foreground text-sm sm:inline-flex"
            href="/"
          >
            Browse
          </Link>
          <Link
            className="hidden font-medium text-muted-foreground text-sm sm:inline-flex"
            href="/leaderboard"
          >
            Leaderboard
          </Link>
          <Skeleton className="hidden h-8 w-48 rounded-md lg:block lg:w-56" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-md lg:hidden" />
          <Skeleton className="h-7 w-14 sm:w-20" />
          <Skeleton className="size-7 rounded-md" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </header>
  )
}

export async function SiteHeader() {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user
  const commandAgents = getCommandAgents()

  return (
    <header className="sticky top-0 z-40 w-full border-border border-b bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full min-w-0 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-6">
          <Link className="flex items-center gap-2 text-foreground" href="/">
            <BrandMark />
            <span className="brand-wordmark">evex</span>
          </Link>
          <Link
            className="hidden font-medium text-muted-foreground text-sm transition-colors hover:text-foreground sm:inline-flex"
            href="/"
          >
            Browse
          </Link>
          <Link
            className="hidden font-medium text-muted-foreground text-sm transition-colors hover:text-foreground sm:inline-flex"
            href="/leaderboard"
          >
            Leaderboard
          </Link>
          {user ? (
            <Link
              className="hidden font-medium text-muted-foreground text-sm transition-colors hover:text-foreground sm:inline-flex"
              href="/favorites"
            >
              Favorites
            </Link>
          ) : null}
          <CommandMenuBarTrigger className="hidden lg:flex" />
        </div>

        <nav className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <CommandMenuIconTrigger className="lg:hidden" />
          <GitHubStarButton />
          <ThemeToggle />
          {user ? (
            <UserMenu email={user.email} name={user.name} />
          ) : (
            <Button
              className="hidden px-3 min-[430px]:inline-flex"
              render={<Link href="/sign-in">Sign In</Link>}
              size="sm"
              variant="ghost"
            />
          )}
          <MobileNavMenu isAuthenticated={Boolean(user)} />
        </nav>
      </div>

      <CommandMenu agents={commandAgents} isAuthenticated={Boolean(user)} />
    </header>
  )
}
