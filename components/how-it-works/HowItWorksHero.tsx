'use client'

import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { JOURNEY_NODES } from './nodesData'

const InfrastructureScene = dynamic(() => import('./InfrastructureScene'), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
})

function ScenePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-white/30">
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#00d4ff] animate-spin" />
        <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Booting infrastructure…
        </p>
      </div>
    </div>
  )
}

function StaticFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(circle at 30% 30%, rgba(0,212,255,0.10), transparent 55%), radial-gradient(circle at 70% 60%, rgba(122,92,255,0.10), transparent 55%)',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
          {JOURNEY_NODES.map((n) => (
            <div
              key={n.id}
              className="glass px-4 py-2 rounded-full text-xs text-white/60"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <span style={{ color: n.color }}>0{n.index + 1}</span> · {n.short}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      setSupported(!!gl)
    } catch {
      setSupported(false)
    }
  }, [])
  return supported
}

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
  const webglSupported = useWebGLSupport()
  const reducedMotion = usePrefersReducedMotion()
  const activeNode = JOURNEY_NODES[activeIndex]

  const handleActiveChange = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-[#05070d]">
      {webglSupported === false ? (
        <StaticFallback />
      ) : (
        <InfrastructureScene onActiveIndexChange={handleActiveChange} reducedMotion={reducedMotion} />
      )}

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

      {/* Center headline, sits above the canvas */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
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
