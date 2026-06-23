'use client'

import { useEffect, useRef } from 'react'
import { forceReflow } from '@/components/transitions/force-reflow'
import { cn } from '@/lib/utils'

// transitions-dev "number pop-in": each character re-enters with a blurred
// slide, and the last two characters stagger so the value feels alive on load.
// See packages skill 02-number-pop-in.md.
function getStagger(index: number, length: number): string | undefined {
  if (index === length - 2) {
    return '1'
  }
  if (index === length - 1) {
    return '2'
  }
  return
}

export function PopInNumber({
  value,
  className,
}: {
  value: number | string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const text = String(value)

  useEffect(() => {
    const group = ref.current
    if (!group || text.length === 0) {
      return
    }
    // Replay: drop the class, force a reflow, re-add it so the keyframes run
    // from a clean baseline every time the value changes.
    group.classList.remove('is-animating')
    forceReflow(group)
    group.classList.add('is-animating')
  }, [text])

  // Build per-character keys that are unique without relying on the array index
  // (digits repeat), so React keeps each character node stable across replays.
  const seen = new Map<string, number>()
  const chars = text.split('').map((char) => {
    const occurrence = seen.get(char) ?? 0
    seen.set(char, occurrence + 1)
    return { char, key: `${char}#${occurrence}` }
  })

  return (
    <span className={cn('t-digit-group', className)} ref={ref}>
      {chars.map((item, index) => (
        <span
          className="t-digit"
          data-stagger={getStagger(index, chars.length)}
          key={item.key}
        >
          {item.char}
        </span>
      ))}
    </span>
  )
}
