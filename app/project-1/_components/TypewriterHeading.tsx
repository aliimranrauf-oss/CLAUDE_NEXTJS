'use client'

import { useEffect, useState } from 'react'

/**
 * Types out `lines` (joined with line breaks) one character at a time.
 * Accessible: the full text is exposed immediately via aria-label so
 * screen readers and SEO crawlers aren't affected by the animation —
 * only the visual characters are revealed progressively.
 */
export default function TypewriterHeading({
  lines,
  speed = 34,
  startDelay = 250,
  className = '',
}: {
  lines: string[]
  speed?: number
  startDelay?: number
  className?: string
}) {
  const full = lines.join('\n')
  const [count, setCount] = useState(0)
  const [blinkOnly, setBlinkOnly] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setCount(full.length)
      setBlinkOnly(true)
      return
    }

    let interval: ReturnType<typeof setInterval>
    const timer = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= full.length) {
          clearInterval(interval)
          setBlinkOnly(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [full, speed, startDelay])

  const typedLines = full.slice(0, count).split('\n')

  return (
    <h1 className={className} aria-label={lines.join(' ')}>
      <span aria-hidden="true">
        {typedLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < typedLines.length - 1 && <br />}
          </span>
        ))}
        <span
          className="p1-cursor"
          style={{ opacity: blinkOnly ? undefined : 1 }}
        />
      </span>
    </h1>
  )
}
