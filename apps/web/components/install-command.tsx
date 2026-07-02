'use client'

import { Button } from '@evex/ui/button'
import { cn } from '@evex/ui/lib/utils'
import { Check, Copy } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { usePackageManager } from '@/hooks/use-package-manager'
import {
  buildInstallCommandForManager,
  PACKAGE_MANAGERS,
} from '@/lib/package-managers'

function getCopyLabel({
  copyState,
  label,
}: {
  copyState: 'copied' | 'failed' | 'idle'
  label: string
}): string {
  if (copyState === 'copied') {
    return `Copied ${label}`
  }
  if (copyState === 'failed') {
    return `Copy failed for ${label}`
  }
  return `Copy ${label}`
}

export function InstallCommand({
  slug,
  className,
  label = 'install command',
}: {
  slug: string
  className?: string
  label?: string
}) {
  const [packageManager, setPackageManager] = usePackageManager()
  const command = buildInstallCommandForManager(packageManager, slug)
  const {
    status: copyState,
    copied,
    copy: copyToClipboard,
  } = useCopyToClipboard()

  const copy = () => {
    copyToClipboard(command, { successMessage: 'Copied install command' })
  }

  const copyLabel = getCopyLabel({ copyState, label })

  return (
    <div
      className={cn(
        'graphite-band w-full min-w-0 max-w-full rounded-md border border-white/10',
        className,
      )}
    >
      <fieldset className="flex items-center gap-1 border-white/10 border-b px-2 py-1.5">
        <legend className="sr-only">Package manager</legend>
        {PACKAGE_MANAGERS.map((manager) => (
          <button
            aria-pressed={manager.id === packageManager}
            className={cn(
              'mono-label rounded-md px-2 py-1 normal-case transition-colors',
              manager.id === packageManager
                ? 'bg-white/10 text-brand'
                : 'text-graphite-foreground/60 hover:bg-white/5 hover:text-graphite-foreground',
            )}
            key={manager.id}
            onClick={() => setPackageManager(manager.id)}
            type="button"
          >
            {manager.label}
          </button>
        ))}
      </fieldset>
      <div className="flex w-full min-w-0 max-w-full items-center gap-2 p-1.5 pl-4">
        <span
          aria-hidden="true"
          className="select-none font-mono text-brand text-sm"
        >
          $
        </span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-pre-wrap break-words font-mono text-graphite-foreground text-sm sm:whitespace-nowrap">
          {command}
        </code>
        <Button
          aria-label={copyLabel}
          className="min-h-11 min-w-11 shrink-0 text-graphite-foreground hover:bg-white/10 hover:text-graphite-foreground sm:min-h-8 sm:min-w-8"
          onClick={copy}
          size="icon"
          type="button"
          variant="ghost"
        >
          {/* Icon swap: Copy <-> Check cross-fade, matching the agent card's
              copy button. Feedback is the toast, not inline text. */}
          <span className="t-icon-swap" data-state={copied ? 'b' : 'a'}>
            <Copy aria-hidden="true" className="t-icon size-4" data-icon="a" />
            <Check
              aria-hidden="true"
              className="t-icon size-4 text-brand"
              data-icon="b"
            />
          </span>
        </Button>
      </div>
    </div>
  )
}
