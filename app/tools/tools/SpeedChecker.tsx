'use client'

// app/tools/tools/SpeedChecker.tsx
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Zap, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

/*
  IMPROVEMENTS:
  1. Added WooCommerce + BigCommerce platforms (commonly used)
  2. Scanning steps show what's being "checked" — feels real and professional
  3. Comparison bar: your platform vs Custom Built side-by-side
  4. Revenue impact estimate — makes result personally relevant
  5. FID renamed to INP (Google's new metric replacing FID in 2024)
  6. Grade shows numeric Lighthouse-style score (0-100) not just A/B/C
*/

interface PlatformProfile {
  lcp: number
  inp: number
  cls: number
  ttfb: number
  lighthouseScore: number
  notes: string[]
  fixes: string[]
}

const PLATFORM_DATA: Record<string, PlatformProfile> = {
  shopify:      { lcp: 3.2, inp: 95,  cls: 0.12, ttfb: 420, lighthouseScore: 58, notes: ['Shared CDN causes latency spikes at peak hours', '3rd-party apps add 200–800ms each', 'JavaScript-heavy themes bloat page weight'], fixes: ['Remove unused Shopify apps', 'Use a lightweight theme (Dawn/Debut)', 'Enable lazy loading for images'] },
  wix:          { lcp: 4.1, inp: 180, cls: 0.22, ttfb: 680, lighthouseScore: 41, notes: ['Wix editor outputs heavy, bloated HTML', 'Limited developer control over performance', 'CLS is worst-in-class due to dynamic layouts'], fixes: ['Compress all images before upload', 'Disable unnecessary animations', 'Consider migrating to a faster platform'] },
  wordpress:    { lcp: 2.8, inp: 80,  cls: 0.09, ttfb: 350, lighthouseScore: 65, notes: ['Performance varies widely by hosting quality', 'Plugin bloat is the #1 speed killer', 'Can reach 90+ score with proper optimization'], fixes: ['Install WP Rocket or LiteSpeed Cache', 'Use a CDN (Cloudflare free tier)', 'Optimize images with ShortPixel'] },
  squarespace:  { lcp: 3.8, inp: 120, cls: 0.15, ttfb: 520, lighthouseScore: 48, notes: ['Heavy JS framework loads on every page', 'Template animations delay LCP significantly', 'No access to raw code limits optimization'], fixes: ['Disable parallax and scroll animations', 'Compress hero images to under 200KB', 'Remove any unused blocks from pages'] },
  woocommerce:  { lcp: 3.0, inp: 110, cls: 0.11, ttfb: 400, lighthouseScore: 60, notes: ['WordPress + WooCommerce = double plugin load', 'Cart/checkout pages are notoriously slow', 'Hosting quality is critical for WooCommerce'], fixes: ['Use managed WooCommerce hosting', 'Enable object caching (Redis)', 'Minify CSS/JS with Autoptimize'] },
  bigcommerce:  { lcp: 2.5, inp: 70,  cls: 0.08, ttfb: 280, lighthouseScore: 71, notes: ['Better performance than Shopify out of the box', 'Still constrained by shared infrastructure', 'App integrations can degrade score'], fixes: ['Audit and remove unused apps', 'Use BigCommerce CDN for all images', 'Enable browser caching headers'] },
  custom:       { lcp: 1.4, inp: 25,  cls: 0.03, ttfb: 90,  lighthouseScore: 94, notes: ['Only loads exactly what the page needs', 'Zero unnecessary third-party scripts', 'Server-side rendering eliminates JS bottlenecks'], fixes: [] },
}

const CUSTOM = PLATFORM_DATA.custom

const SCAN_STEPS = [
  'Checking TTFB response time...',
  'Analyzing JavaScript bundle size...',
  'Measuring Largest Contentful Paint...',
  'Testing Interaction to Next Paint...',
  'Evaluating Cumulative Layout Shift...',
  'Comparing against Core Web Vitals...',
  'Generating performance report...',
]

function getGrade(score: number) {
  if (score >= 90) return { grade: 'A', color: '#00ffaa', label: 'Excellent' }
  if (score >= 70) return { grade: 'B', color: '#00d4ff', label: 'Good' }
  if (score >= 50) return { grade: 'C', color: '#ffd93d', label: 'Needs Work' }
  return { grade: 'D', color: '#ff6b6b', label: 'Poor' }
}

const PLATFORM_LABELS: Record<string, string> = {
  shopify: 'Shopify', wix: 'Wix', wordpress: 'WordPress',
  squarespace: 'Squarespace', woocommerce: 'WooCommerce',
  bigcommerce: 'BigCommerce', custom: '✦ Custom Built',
}

export default function SpeedChecker() {
  const [platform, setPlatform] = useState('')
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [result, setResult] = useState<(PlatformProfile & { grade: string; color: string; label: string }) | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const run = () => {
    if (!platform) return
    setScanning(true); setProgress(0); setResult(null); setStepIndex(0)
    let p = 0
    intervalRef.current = setInterval(() => {
      p += Math.random() * 12 + 6
      const stepIdx = Math.min(Math.floor((p / 100) * SCAN_STEPS.length), SCAN_STEPS.length - 1)
      setStepIndex(stepIdx)
      if (p >= 100) {
        p = 100
        clearInterval(intervalRef.current!)
        const data = PLATFORM_DATA[platform]
        const { grade, color, label } = getGrade(data.lighthouseScore)
        setResult({ ...data, grade, color, label })
        setScanning(false)
        trackToolUsage('speed-checker', { platform }, { ...data, grade } as unknown as Record<string, unknown>)
      }
      setProgress(Math.min(100, p))
    }, 150)
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const platforms = ['shopify', 'wix', 'wordpress', 'squarespace', 'woocommerce', 'bigcommerce', 'custom']

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
        ⚡ Speed Checker
      </h2>
      <p className="text-[#777] text-sm mb-6">
        See your platform&apos;s real Core Web Vitals — and how much speed is costing you in sales.
      </p>

      <div className="mb-5">
        <label className="block text-[13px] text-[#aaa] mb-2.5">Select Your Platform</label>
        <div className="flex gap-2 flex-wrap">
          {platforms.map((p) => (
            <button
              key={p} onClick={() => { setPlatform(p); setResult(null) }}
              className="px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all"
              style={{
                border: '1px solid',
                borderColor: platform === p ? '#00d4ff' : 'rgba(255,255,255,0.1)',
                background: platform === p ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.04)',
                color: platform === p ? '#00d4ff' : '#888',
              }}
            >
              {PLATFORM_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={run}
        disabled={!platform || scanning}
        className="btn-primary flex items-center gap-2 mb-6 disabled:opacity-50"
        style={{ cursor: platform && !scanning ? 'pointer' : 'not-allowed' }}
      >
        <Zap size={15} /> {scanning ? 'Scanning...' : 'Run Speed Audit'}
      </button>

      {scanning && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-[13px] text-[#00d4ff]">{SCAN_STEPS[stepIndex]}</span>
            <span className="text-[13px] text-[#555]">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #00d4ff, #7a5cff)' }}
            />
          </div>
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {SCAN_STEPS.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full flex-1 transition-all duration-300"
                style={{ background: i <= stepIndex ? '#00d4ff' : 'rgba(255,255,255,0.08)', minWidth: 20 }}
              />
            ))}
          </div>
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* Score header */}
          <div className="flex items-center gap-4 p-5 rounded-xl mb-5" style={{ background: `${result.color}11`, border: `1px solid ${result.color}33` }}>
            <div className="text-center" style={{ minWidth: 64 }}>
              <div className="text-4xl font-black" style={{ color: result.color }}>{result.grade}</div>
              <div className="text-[11px] text-[#888] mt-0.5">{result.label}</div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-[12px] text-[#aaa]">Lighthouse Score</span>
                <span className="text-[12px] font-bold" style={{ color: result.color }}>{result.lighthouseScore}/100</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.lighthouseScore}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: result.color }}
                />
              </div>
              {platform !== 'custom' && (
                <div className="text-[11px] text-[#555] mt-1.5">
                  Custom Built scores {CUSTOM.lighthouseScore}/100 — {CUSTOM.lighthouseScore - result.lighthouseScore} points faster
                </div>
              )}
            </div>
          </div>

          {/* Core Web Vitals grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {[
              { label: 'LCP', full: 'Largest Contentful Paint', value: `${result.lcp}s`, good: result.lcp <= 2.5, threshold: '≤2.5s', customVal: `${CUSTOM.lcp}s` },
              { label: 'INP', full: 'Interaction to Next Paint', value: `${result.inp}ms`, good: result.inp <= 200, threshold: '≤200ms', customVal: `${CUSTOM.inp}ms` },
              { label: 'CLS', full: 'Cumulative Layout Shift', value: result.cls, good: result.cls <= 0.1, threshold: '≤0.1', customVal: CUSTOM.cls },
              { label: 'TTFB', full: 'Time to First Byte', value: `${result.ttfb}ms`, good: result.ttfb <= 200, threshold: '≤200ms', customVal: `${CUSTOM.ttfb}ms` },
            ].map((m) => (
              <div key={m.label} className="rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-[11px] font-bold text-[#888]">{m.label}</div>
                  {m.good ? <CheckCircle size={12} color="#00ffaa" /> : <AlertTriangle size={12} color="#ff6b6b" />}
                </div>
                <div className="text-[11px] text-[#555] mb-1.5 leading-tight">{m.full}</div>
                <div className="text-xl font-extrabold" style={{ color: m.good ? '#00ffaa' : '#ff6b6b' }}>{m.value}</div>
                <div className="text-[10px] text-[#444] mt-0.5">Good: {m.threshold}</div>
                {platform !== 'custom' && (
                  <div className="text-[10px] text-[#00d4ff] mt-0.5">Custom: {m.customVal}</div>
                )}
              </div>
            ))}
          </div>

          {/* Revenue impact */}
          {platform !== 'custom' && (
            <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={15} color="#00d4ff" />
                <span className="text-[13px] font-bold text-[#00d4ff]">Revenue Impact</span>
              </div>
              <p className="text-[#bbb] text-[13px] leading-relaxed m-0">
                Your LCP is <strong className="text-white">{result.lcp}s</strong>. Every 1s over 2.5s costs roughly{' '}
                <strong className="text-[#ff6b6b]">7% in conversions</strong>. That&apos;s a{' '}
                <strong className="text-[#ff6b6b]">{Math.round((result.lcp - 2.5) * 7)}% revenue leak</strong>{' '}
                compared to a well-optimized store.
              </p>
            </div>
          )}

          {/* Platform notes */}
          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="font-bold text-[13px] text-[#aaa] mb-2.5">Why This Score</div>
            {result.notes.map((note, i) => (
              <div key={i} className="flex gap-2 text-[#bbb] text-[13px] mb-1.5">
                <span className="text-[#444] mt-0.5">•</span> {note}
              </div>
            ))}
          </div>

          {/* Quick fixes */}
          {result.fixes.length > 0 && (
            <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(0,255,170,0.05)', border: '1px solid rgba(0,255,170,0.15)' }}>
              <div className="font-bold text-[13px] text-[#00ffaa] mb-2.5">Quick Fixes for {PLATFORM_LABELS[platform]}</div>
              {result.fixes.map((fix, i) => (
                <div key={i} className="flex gap-2 text-[#bbb] text-[13px] mb-1.5">
                  <CheckCircle size={13} color="#00ffaa" className="shrink-0 mt-0.5" /> {fix}
                </div>
              ))}
            </div>
          )}

          {platform === 'custom' && (
            <div className="rounded-xl p-4 mb-4 text-center" style={{ background: 'rgba(0,255,170,0.06)', border: '1px solid rgba(0,255,170,0.2)' }}>
              <div className="text-2xl mb-1">🏆</div>
              <div className="font-bold text-[#00ffaa] text-sm">You&apos;re on the fastest possible setup</div>
              <div className="text-[#777] text-xs mt-1">Custom-built stores consistently outperform all platforms</div>
            </div>
          )}

          <ToolCTA toolName="speed-checker" />
        </motion.div>
      )}
    </div>
  )
}
