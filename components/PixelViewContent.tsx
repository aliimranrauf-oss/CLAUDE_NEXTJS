'use client'

import { useEffect } from 'react'

// Fires a Meta Pixel ViewContent event once, on mount. Used on landing
// pages that are server components (so they can't call fbq directly) —
// just drop <PixelViewContent name="..." /> anywhere in the page JSX.
// The base pixel script + PageView event already load globally from
// app/layout.tsx (lazyOnload) — this only adds the extra ViewContent
// event for pages worth tracking separately, like ad landing pages.
export default function PixelViewContent({ name }: { name: string }) {
  useEffect(() => {
    const fire = () => {
      if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
        ;(window as any).fbq('track', 'ViewContent', { content_name: name })
      }
    }

    // The pixel script now loads via DeferredAnalytics — only after the
    // visitor's first interaction, or an 8s timeout fallback (see
    // app/layout.tsx). So fbq may not exist for a little while after
    // mount. Try immediately, then keep polling well past that 8s
    // fallback so this ViewContent event never gets missed on a race.
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      fire()
      return
    }
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
        fire()
        clearInterval(interval)
      }
    }, 500)
    const timeout = setTimeout(() => clearInterval(interval), 15000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [name])

  return null
}
