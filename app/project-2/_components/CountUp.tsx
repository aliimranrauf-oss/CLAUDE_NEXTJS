'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Animates a stat value like "18%", "SAR 85.4M", or "15+" by counting the
 * numeric portion up from 0 once it scrolls into view, keeping any
 * prefix/suffix text (currency codes, "+", units) static.
 */
export default function CountUp({
  value,
  duration = 1200,
  className = '',
}: {
  value: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  const match = value.match(/^([^\d]*)([\d.]+)([^\d]*)$/)
  const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0
  const initial = match ? `${match[1]}${(0).toFixed(decimals)}${match[3]}` : value

  const [display, setDisplay] = useState(initial)

  useEffect(() => {
    if (!inView || !match) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const [, prefix, numStr, suffix] = match
    const target = parseFloat(numStr)
    const start = performance.now()
    let raf: number

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
