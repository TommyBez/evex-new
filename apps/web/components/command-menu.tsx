'use client'

import { Button } from '@evex/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@evex/ui/command'
import { Kbd, KbdGroup } from '@evex/ui/kbd'
import {
  Heart,
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
import { useCallback, useEffect, useState } from 'react'

export interface CommandMenuAgent {
  authorName: string
  category: string
  name: string
  slug: string
}

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
] as const

/**
 * Global search and navigation palette, opened with ⌘K / Ctrl+K or the header
 * search trigger. Jump to any agent, page, or theme without leaving the
 * keyboard, from anywhere in the app.
 */
export function CommandMenu({
  agents,
  isAuthenticated,
}: {
  agents: CommandMenuAgent[]
  isAuthenticated: boolean
}) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [shortcutKey, setShortcutKey] = useState('⌘')

  useEffect(() => {
    if (!navigator.userAgent.includes('Mac')) {
      setShortcutKey('Ctrl')
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const runCommand = useCallback((action: () => void) => {
    setOpen(false)
    action()
  }, [])

  const goTo = useCallback(
    (path: string) => runCommand(() => router.push(path)),
    [router, runCommand],
  )

  return (
    <>
      <Button
        aria-keyshortcuts="Meta+K Control+K"
        aria-label="Search agents and pages"
        className="rounded-md md:hidden"
        onClick={() => setOpen(true)}
        size="icon-sm"
        variant="ghost"
      >
        <Search aria-hidden="true" className="size-4" />
      </Button>
      <button
        aria-keyshortcuts="Meta+K Control+K"
        className="hidden h-8 w-44 items-center gap-2 rounded-md border border-input bg-background px-2.5 text-muted-foreground text-sm transition-colors hover:border-ring/50 hover:text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:flex lg:w-52"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Search aria-hidden="true" className="size-3.5 shrink-0" />
        <span className="flex-1 truncate text-left">Search agents...</span>
        <KbdGroup>
          <Kbd>{shortcutKey}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </button>
      <CommandDialog
        description="Search agents, pages, and settings"
        onOpenChange={setOpen}
        open={open}
        title="Search"
      >
        <Command>
          <CommandInput placeholder="Search agents, pages..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Agents">
              {agents.map((agent) => (
                <CommandItem
                  key={agent.slug}
                  keywords={[agent.name, agent.category, agent.authorName]}
                  onSelect={() => goTo(`/agents/${agent.slug}`)}
                  value={agent.slug}
                >
                  <Package
                    aria-hidden="true"
                    className="text-muted-foreground"
                  />
                  <span className="min-w-0 flex-1 truncate">{agent.name}</span>
                  <span className="mono-label shrink-0 text-muted-foreground/70">
                    {agent.category}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Pages">
              <CommandItem
                keywords={['home', 'agents', 'registry', 'search']}
                onSelect={() => goTo('/')}
                value="browse"
              >
                <Search aria-hidden="true" className="text-muted-foreground" />
                Browse Agents
              </CommandItem>
              <CommandItem
                keywords={['top', 'popular', 'ranking']}
                onSelect={() => goTo('/leaderboard')}
                value="leaderboard"
              >
                <Trophy aria-hidden="true" className="text-muted-foreground" />
                Leaderboard
              </CommandItem>
              {isAuthenticated ? (
                <>
                  <CommandItem
                    keywords={['saved', 'starred', 'hearts']}
                    onSelect={() => goTo('/favorites')}
                    value="favorites"
                  >
                    <Heart
                      aria-hidden="true"
                      className="text-muted-foreground"
                    />
                    Favorites
                  </CommandItem>
                  <CommandItem
                    keywords={['account', 'settings']}
                    onSelect={() => goTo('/profile')}
                    value="profile"
                  >
                    <UserRound
                      aria-hidden="true"
                      className="text-muted-foreground"
                    />
                    Edit Profile
                  </CommandItem>
                </>
              ) : (
                <CommandItem
                  keywords={['login', 'account', 'register']}
                  onSelect={() => goTo('/sign-in')}
                  value="sign in"
                >
                  <LogIn aria-hidden="true" className="text-muted-foreground" />
                  Sign In
                </CommandItem>
              )}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Theme">
              {THEME_OPTIONS.map(({ value, label, Icon }) => (
                <CommandItem
                  key={value}
                  keywords={['theme', 'appearance', 'mode']}
                  onSelect={() => runCommand(() => setTheme(value))}
                  value={`${value} theme`}
                >
                  <Icon aria-hidden="true" className="text-muted-foreground" />
                  {label} Theme
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
