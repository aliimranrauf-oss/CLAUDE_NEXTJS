'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function DonutChart({
  percent,
  size = 76,
  stroke = 8,
}: {
  percent: number
  size?: number
  stroke?: number
}) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [animatedPercent, setAnimatedPercent] = useState(0)

  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedPercent / 100) * circumference

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setAnimatedPercent(percent), 80)
    return () => clearTimeout(t)
  }, [inView, percent])

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg ref={ref} width={size} height={size} className="p3-donut">
        <circle className="p3-donut-track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} />
        <circle
          className="p3-donut-value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[15px] font-bold text-[var(--p3-ink)]">{percent}%</span>
      </div>
    </div>
  )
}
