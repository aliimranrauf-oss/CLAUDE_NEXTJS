'use client'

import { useEffect, useRef, useState } from 'react'
import DataFlowDiagram from './DataFlowDiagram'
import { JOURNEY_NODES } from './nodesData'

const HOLD_MS = 2200

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const listener = () => setReduced(mq.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])
  return reduced
}

export default function HowItWorksHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const activeNode = JOURNEY_NODES[activeIndex]
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (reducedMotion) return
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % JOURNEY_NODES.length)
    }, HOLD_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [reducedMotion])

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-[#05070d]">
      {/* Ambient glow backdrop — replaces the old 3D canvas background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 25% 20%, rgba(0,212,255,0.12), transparent 55%), radial-gradient(circle at 75% 78%, rgba(122,92,255,0.12), transparent 55%)',
        }}
      />

      {/* Live animated data-flow diagram */}
      <DataFlowDiagram activeIndex={activeIndex} reducedMotion={reducedMotion} />

      {/* Top-left HUD readout */}
      <div className="absolute top-24 left-4 sm:left-8 pointer-events-none">
        <div
          className="glass rounded-xl px-4 py-3 max-w-[220px] transition-opacity duration-500"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-1">
            Step {activeIndex + 1} / {JOURNEY_NODES.length}
          </p>
          <p className="text-sm font-semibold text-white/85">{activeNode.title}</p>
          <p className="text-xs text-white/45 mt-1 leading-relaxed">{activeNode.detail}</p>
        </div>
      </div>

      {/* Center headline */}
      <div className="absolute inset-x-0 top-[18%] flex flex-col items-center text-center px-4 pointer-events-none">
        <h1
          className="text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-[1.15]"
          style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
        >
          Watch Your Store
          <br />
          <span className="text-[#40e0ff]">Come to Life</span>
        </h1>
        <p
          className="mt-4 text-sm sm:text-base text-white/50 max-w-md"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          From first consultation to full ownership — here&apos;s exactly what happens.
        </p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35 pointer-events-none">
        <span className="text-[11px] uppercase tracking-[0.2em]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Scroll to explore
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
