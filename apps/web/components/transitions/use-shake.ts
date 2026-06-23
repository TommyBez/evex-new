'use client'

import { useCallback, useRef } from 'react'
import { forceReflow } from '@/components/transitions/force-reflow'

const SHAKE_CLEANUP_BUFFER_MS = 20
const DEFAULT_SHAKE_DUR_A_MS = 80
const DEFAULT_SHAKE_DUR_B_MS = 60

// transitions-dev "error state shake": replay the percussive shake from a clean
// baseline (remove -> reflow -> add) and clear the class once the keyframes
// finish. The timing is read from the shared :root tokens so it stays in sync
// with the CSS. See packages skill 12-error-state-shake.md.
export function useShake<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const cleanupTimerRef = useRef<number | null>(null)

  const trigger = useCallback(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const styles = getComputedStyle(document.documentElement)
    const readMs = (name: string, fallback: number): number => {
      const value = Number.parseFloat(styles.getPropertyValue(name))
      return Number.isFinite(value) ? value : fallback
    }

    element.classList.remove('is-shaking')
    forceReflow(element) // restart the animation from a clean baseline
    element.classList.add('is-shaking')

    const shakeMs =
      readMs('--shake-dur-a', DEFAULT_SHAKE_DUR_A_MS) * 2 +
      readMs('--shake-dur-b', DEFAULT_SHAKE_DUR_B_MS) * 2
    // Cancel any pending cleanup so an earlier timer can't strip is-shaking
    // midway through a freshly triggered shake.
    if (cleanupTimerRef.current !== null) {
      window.clearTimeout(cleanupTimerRef.current)
    }
    cleanupTimerRef.current = window.setTimeout(() => {
      element.classList.remove('is-shaking')
      cleanupTimerRef.current = null
    }, shakeMs + SHAKE_CLEANUP_BUFFER_MS)
  }, [])

  return { ref, trigger }
}
