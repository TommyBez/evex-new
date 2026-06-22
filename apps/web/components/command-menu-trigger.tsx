'use client'

import { Search } from 'lucide-react'
import { openCommandMenu } from '@/components/command-menu'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'

// Desktop: a search-field-shaped button that reveals the ⌘K palette. It only
// looks like an input — activating it opens the command menu.
export function CommandMenuBarTrigger({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        'flex h-8 w-48 items-center gap-2 rounded-md border border-input bg-background px-2.5 text-muted-foreground text-sm outline-none transition-colors hover:border-ring/40 hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 lg:w-56 dark:bg-input/30 dark:hover:bg-input/50',
        className,
      )}
      onClick={openCommandMenu}
      type="button"
    >
      <Search aria-hidden="true" className="size-4 shrink-0" />
      <span className="flex-1 truncate text-left">Search agents...</span>
      <Kbd>⌘K</Kbd>
    </button>
  )
}

// Compact entry point for narrow viewports where the full pill does not fit.
export function CommandMenuIconTrigger({ className }: { className?: string }) {
  return (
    <Button
      aria-label="Search agents"
      className={cn('rounded-md', className)}
      onClick={openCommandMenu}
      size="icon-sm"
      type="button"
      variant="ghost"
    >
      <Search aria-hidden="true" className="size-4" />
    </Button>
  )
}
