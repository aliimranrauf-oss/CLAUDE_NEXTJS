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

    // The pixel script loads with Next's lazyOnload strategy, so it may
    // not be ready on the very first render. Try immediately, then retry
    // a couple of times in case the script is still loading.
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
    const timeout = setTimeout(() => clearInterval(interval), 8000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [name])

  return null
}
