'use client'

import { Command as CommandPrimitive } from 'cmdk'
import {
  ArrowUpRight,
  BookOpen,
  Heart,
  LayoutGrid,
  LogIn,
  Monitor,
  Moon,
  Package,
  Search,
  Sun,
  Trophy,
  UserRound,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { GitHubIcon } from '@/components/social-icons'
import { Button } from '@/components/ui/button'
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Kbd } from '@/components/ui/kbd'
import { AGENT_CATEGORIES } from '@/lib/agents'

const REPO_URL = 'https://github.com/TommyBez/evex'
const DOCS_URL = 'https://eve.dev/docs/introduction'

export const COMMAND_MENU_EVENT = 'evex:command-menu'

// How many agents to render at once. Search runs over the whole catalog, but we
// only mount a bounded number of rows so the dialog stays fast no matter how
// large the registry grows.
const EMPTY_AGENT_LIMIT = 7
const SEARCH_AGENT_LIMIT = 50

// Lightweight projection of an agent — only what the palette needs to search
// (name/category/author) and route. Descriptions are intentionally excluded:
// they were never displayed and shipping them on every page is pure weight.
export interface CommandAgent {
  authorName: string
  category: string
  name: string
  slug: string
}

interface PaletteAction {
  external?: boolean
  icon: ReactNode
  key: string
  label: string
  run: () => void
}

// Imperatively open the palette from anywhere (header pill, mobile icon, etc.)
// without threading state through the React tree.
export function openCommandMenu() {
  window.dispatchEvent(new Event(COMMAND_MENU_EVENT))
}

function getAgentHint(params: {
  query: string
  total: number
  shown: number
}): string | null {
  if (params.shown >= params.total) {
    return null
  }
  if (params.query.length === 0) {
    return `Type to search all ${params.total} agents`
  }
  return `Refine your search to see ${params.total - params.shown} more`
}

export function CommandMenu({
  agents,
  isAuthenticated,
}: {
  agents: readonly CommandAgent[]
  isAuthenticated: boolean
}) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === 'k' || event.key === 'K') &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        setOpen((previous) => !previous)
      }
    }
    const onOpenEvent = () => setOpen(true)

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener(COMMAND_MENU_EVENT, onOpenEvent)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener(COMMAND_MENU_EVENT, onOpenEvent)
    }
  }, [])

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next)
    if (!next) {
      setSearch('')
    }
  }, [])

  const runCommand = useCallback((action: () => void) => {
    setOpen(false)
    setSearch('')
    action()
  }, [])

  const goTo = useCallback(
    (path: string) => runCommand(() => router.push(path)),
    [router, runCommand],
  )

  const openExternal = useCallback(
    (url: string) =>
      runCommand(() => window.open(url, '_blank', 'noopener,noreferrer')),
    [runCommand],
  )

  const query = search.trim().toLowerCase()
  const matchesQuery = (text: string) =>
    query.length === 0 || text.toLowerCase().includes(query)

  const matchedAgents =
    query.length === 0
      ? agents
      : agents.filter((agent) =>
          matchesQuery(`${agent.name} ${agent.category} ${agent.authorName}`),
        )
  const visibleAgents = matchedAgents.slice(
    0,
    query.length === 0 ? EMPTY_AGENT_LIMIT : SEARCH_AGENT_LIMIT,
  )
  const agentHint = getAgentHint({
    query,
    total: matchedAgents.length,
    shown: visibleAgents.length,
  })

  const visibleCategories = AGENT_CATEGORIES.filter((category) =>
    matchesQuery(category),
  )

  const navActions: PaletteAction[] = [
    {
      key: 'browse',
      label: 'Browse agents',
      icon: <Search aria-hidden="true" />,
      run: () => goTo('/'),
    },
    {
      key: 'leaderboard',
      label: 'Leaderboard',
      icon: <Trophy aria-hidden="true" />,
      run: () => goTo('/leaderboard'),
    },
    ...(isAuthenticated
      ? [
          {
            key: 'favorites',
            label: 'Favorites',
            icon: <Heart aria-hidden="true" />,
            run: () => goTo('/favorites'),
          },
          {
            key: 'profile',
            label: 'Edit profile',
            icon: <UserRound aria-hidden="true" />,
            run: () => goTo('/profile'),
          },
        ]
      : [
          {
            key: 'sign-in',
            label: 'Sign in',
            icon: <LogIn aria-hidden="true" />,
            run: () => goTo('/sign-in'),
          },
        ]),
    {
      key: 'submit',
      label: 'Submit an agent',
      icon: <GitHubIcon className="size-4" />,
      run: () => openExternal(REPO_URL),
      external: true,
    },
    {
      key: 'docs',
      label: 'Documentation',
      icon: <BookOpen aria-hidden="true" />,
      run: () => openExternal(DOCS_URL),
      external: true,
    },
  ]
  const visibleNav = navActions.filter((action) => matchesQuery(action.label))

  const themeActions: PaletteAction[] = [
    {
      key: 'light',
      label: 'Light',
      icon: <Sun aria-hidden="true" />,
      run: () => runCommand(() => setTheme('light')),
    },
    {
      key: 'dark',
      label: 'Dark',
      icon: <Moon aria-hidden="true" />,
      run: () => runCommand(() => setTheme('dark')),
    },
    {
      key: 'system',
      label: 'System',
      icon: <Monitor aria-hidden="true" />,
      run: () => runCommand(() => setTheme('system')),
    },
  ]
  const visibleTheme = themeActions.filter((action) =>
    matchesQuery(action.label),
  )

  const showAgents = visibleAgents.length > 0
  const showCategories = visibleCategories.length > 0
  const showNav = visibleNav.length > 0
  const showTheme = visibleTheme.length > 0
  const hasResults = showAgents || showCategories || showNav || showTheme

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent
        className="top-0 left-0 flex h-dvh max-w-none translate-x-0 translate-y-0 flex-col overflow-hidden rounded-none p-0 ring-0 sm:top-[12vh] sm:left-1/2 sm:h-auto sm:max-w-xl sm:-translate-x-1/2 sm:rounded-xl sm:ring-1"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Command menu</DialogTitle>
        <DialogDescription className="sr-only">
          Search agents and jump anywhere on evex.
        </DialogDescription>
        <CommandPrimitive
          className="flex size-full flex-col overflow-hidden bg-popover pt-[env(safe-area-inset-top)] text-popover-foreground sm:pt-0"
          loop
          shouldFilter={false}
        >
          <div className="flex items-center">
            <div className="min-w-0 flex-1">
              <CommandInput
                autoFocus
                onValueChange={setSearch}
                placeholder="Search agents, categories, and pages..."
                value={search}
              />
            </div>
            <DialogClose
              render={
                <Button
                  className="mr-2 shrink-0 sm:hidden"
                  size="sm"
                  variant="ghost"
                />
              }
            >
              Cancel
            </DialogClose>
          </div>
          <CommandList className="max-h-none min-h-0 flex-1 px-1 pb-1 sm:max-h-[60vh] sm:flex-initial">
            {hasResults ? null : (
              <div className="py-6 text-center text-muted-foreground text-sm">
                No results found.
              </div>
            )}

            {showAgents ? (
              <CommandGroup heading="Agents">
                {visibleAgents.map((agent) => (
                  <CommandItem
                    key={agent.slug}
                    onSelect={() => goTo(`/agents/${agent.slug}`)}
                    value={`agent:${agent.slug}`}
                  >
                    <Package aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">
                      {agent.name}
                    </span>
                    <span className="mono-label shrink-0 text-muted-foreground capitalize">
                      {agent.category}
                    </span>
                  </CommandItem>
                ))}
                {agentHint ? (
                  <p className="px-2 py-1.5 text-muted-foreground/70 text-xs">
                    {agentHint}
                  </p>
                ) : null}
              </CommandGroup>
            ) : null}

            {showCategories ? (
              <>
                {showAgents && <CommandSeparator />}
                <CommandGroup heading="Browse by category">
                  {visibleCategories.map((category) => (
                    <CommandItem
                      key={category}
                      onSelect={() => goTo(`/?category=${category}`)}
                      value={`category:${category}`}
                    >
                      <LayoutGrid aria-hidden="true" />
                      <span className="capitalize">{category}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            ) : null}

            {showNav ? (
              <>
                {(showAgents || showCategories) && <CommandSeparator />}
                <CommandGroup heading="Go to">
                  {visibleNav.map((action) => (
                    <CommandItem
                      key={action.key}
                      onSelect={action.run}
                      value={`go:${action.key}`}
                    >
                      {action.icon}
                      {action.label}
                      {action.external ? (
                        <ArrowUpRight
                          aria-hidden="true"
                          className="ml-auto text-muted-foreground"
                        />
                      ) : null}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            ) : null}

            {showTheme ? (
              <>
                {(showAgents || showCategories || showNav) && (
                  <CommandSeparator />
                )}
                <CommandGroup heading="Theme">
                  {visibleTheme.map((action) => (
                    <CommandItem
                      key={action.key}
                      onSelect={action.run}
                      value={`theme:${action.key}`}
                    >
                      {action.icon}
                      {action.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            ) : null}
          </CommandList>

          <div className="hidden items-center gap-3 border-border border-t px-3 py-2 text-muted-foreground text-xs sm:flex">
            <span className="flex items-center gap-1.5">
              <Kbd>↵</Kbd>
              to select
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>esc</Kbd>
              to close
            </span>
          </div>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
}
