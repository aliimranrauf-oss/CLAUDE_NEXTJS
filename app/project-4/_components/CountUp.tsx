'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Animates a stat value like "98%", "6,200+", or "12+" by counting the
 * numeric portion up from 0 once it scrolls into view, keeping any
 * prefix/suffix text (units, "+", commas) static.
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

  const match = value.match(/^([^\d]*)([\d,.]+)([^\d]*)$/)
  const rawNum = match ? match[2].replace(/,/g, '') : ''
  const decimals = rawNum.includes('.') ? rawNum.split('.')[1].length : 0
  const hasComma = match ? match[2].includes(',') : false

  function format(n: number) {
    const fixed = n.toFixed(decimals)
    if (!hasComma) return fixed
    const [intPart, decPart] = fixed.split('.')
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return decPart ? `${withCommas}.${decPart}` : withCommas
  }

  const initial = match ? `${match[1]}${format(0)}${match[3]}` : value
  const [display, setDisplay] = useState(initial)

  useEffect(() => {
    if (!inView || !match) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const [, prefix, , suffix] = match
    const target = parseFloat(rawNum)
    const start = performance.now()
    let raf: number

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(`${prefix}${format(target * eased)}${suffix}`)
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
