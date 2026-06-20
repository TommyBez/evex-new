'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function InstallCommand({
  command,
  className,
}: {
  command: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard may be unavailable; ignore.
    }
  }

  return (
    <div
      className={cn(
        'graphite-band flex w-full min-w-0 max-w-full items-center gap-2 rounded-md border border-white/10 p-1.5 pl-4',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="select-none font-mono text-brand text-sm"
      >
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-graphite-foreground text-sm">
        {command}
      </code>
      <Button
        aria-label="Copy install command"
        className="size-8 shrink-0 text-graphite-foreground hover:bg-white/10 hover:text-graphite-foreground"
        onClick={copy}
        size="icon"
        type="button"
        variant="ghost"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4 text-brand" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
      </Button>
    </div>
  )
}
