'use client'

// app/website-speed-optimization/PageSpeedInsightsTool.tsx
// Real Google PageSpeed Insights lead-magnet tool. Sits at the top of the
// Speed Optimization page — visitor pastes a URL, gets a REAL Lighthouse
// score back (via our own /api/pagespeed proxy), then is pushed toward
// the paid speed-optimization service as the natural next step.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader2, AlertTriangle, CheckCircle2, Gauge, Smartphone, Monitor } from 'lucide-react'
import ToolCTA from '@/app/tools/tools/ToolCTA'
import { trackToolUsage } from '@/app/tools/tools/useToolTracking'

interface MetricBlock {
  value: number | null
  displayValue: string | null
  score: number | null
}

interface PSIResult {
  url: string
  strategy: 'mobile' | 'desktop'
  scores: {
    performance: number | null
    accessibility: number | null
    bestPractices: number | null
    seo: number | null
  }
  lab: {
    lcp: MetricBlock
    cls: MetricBlock
    tbt: MetricBlock
    fcp: MetricBlock
    speedIndex: MetricBlock
    ttfb: MetricBlock
  }
  opportunities: { id: string; title: string; displayValue: string | null }[]
}

function scoreColor(score: number | null) {
  if (score == null) return '#777'
  if (score >= 90) return '#00ffaa'
  if (score >= 50) return '#ffd93d'
  return '#ff6b6b'
}

function ScoreRing({ label, score }: { label: string; score: number | null }) {
  const color = scoreColor(score)
  const pct = score ?? 0
  const circumference = 2 * Math.PI * 26
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-[64px] h-[64px]">
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <motion.circle
            cx="32" cy="32" r="26" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: score == null ? circumference : offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            transform="rotate(-90 32 32)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold" style={{ color }}>
          {score ?? '–'}
        </div>
      </div>
      <span className="text-[11px] text-[#999] text-center leading-tight">{label}</span>
    </div>
  )
}

export default function PageSpeedInsightsTool() {
  const [url, setUrl] = useState('')
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PSIResult | null>(null)

  const run = async () => {
    if (!url.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`/api/pagespeed?url=${encodeURIComponent(url.trim())}&strategy=${strategy}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data?.error || 'Could not analyze that URL. Please try again.')
        return
      }

      setResult(data)
      trackToolUsage('pagespeed-insights', { url: data.url, strategy }, { scores: data.scores })
    } catch {
      setError('Something went wrong reaching Google PageSpeed Insights. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const perf = result?.scores.performance ?? null
  const isSlow = perf != null && perf < 70

  return (
    <section className="relative px-4 sm:px-6 pt-10 pb-4">
      <div className="max-w-3xl mx-auto">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Gauge size={18} color="#00d4ff" />
            <h2 className="text-lg sm:text-xl font-extrabold" style={{ fontFamily: 'Syne, sans-serif' }}>
              Free Google PageSpeed Insights Check
            </h2>
          </div>
          <p className="text-[#999] text-sm mb-5">
            Paste your URL below for a real, live Lighthouse audit powered by Google — same data Google
            uses to judge your site. No sign-up required.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666]" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && run()}
                placeholder="yourstore.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-[#555] focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <button
              onClick={run}
              disabled={!url.trim() || loading}
              className="btn-primary flex items-center justify-center gap-2 px-6 py-3 disabled:opacity-50"
              style={{ cursor: url.trim() && !loading ? 'pointer' : 'not-allowed' }}
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Gauge size={15} />}
              {loading ? 'Scanning...' : 'Check My Speed'}
            </button>
          </div>

          {/* Strategy toggle */}
          <div className="flex gap-2 mb-1">
            {(['mobile', 'desktop'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStrategy(s)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  border: '1px solid',
                  borderColor: strategy === s ? '#00d4ff' : 'rgba(255,255,255,0.1)',
                  background: strategy === s ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.04)',
                  color: strategy === s ? '#00d4ff' : '#888',
                }}
              >
                {s === 'mobile' ? <Smartphone size={12} /> : <Monitor size={12} />}
                {s === 'mobile' ? 'Mobile' : 'Desktop'}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl p-3.5 text-sm" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.25)', color: '#ff9b9b' }}>
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6"
              >
                <div className="text-[12px] text-[#666] mb-4 truncate">
                  Results for <span className="text-[#aaa]">{result.url}</span> &middot; {strategy}
                </div>

                {/* Category scores */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  <ScoreRing label="Performance" score={result.scores.performance} />
                  <ScoreRing label="Accessibility" score={result.scores.accessibility} />
                  <ScoreRing label="Best Practices" score={result.scores.bestPractices} />
                  <ScoreRing label="SEO" score={result.scores.seo} />
                </div>

                {/* Core Web Vitals */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                  {[
                    { label: 'LCP', full: 'Largest Contentful Paint', m: result.lab.lcp },
                    { label: 'CLS', full: 'Cumulative Layout Shift', m: result.lab.cls },
                    { label: 'TBT', full: 'Total Blocking Time', m: result.lab.tbt },
                    { label: 'FCP', full: 'First Contentful Paint', m: result.lab.fcp },
                    { label: 'Speed Index', full: 'Speed Index', m: result.lab.speedIndex },
                    { label: 'TTFB', full: 'Server Response Time', m: result.lab.ttfb },
                  ].map((row) => (
                    <div key={row.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="text-[10px] text-[#666] mb-1">{row.full}</div>
                      <div className="text-base font-extrabold" style={{ color: scoreColor(row.m?.score != null ? row.m.score * 100 : null) }}>
                        {row.m?.displayValue ?? '–'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Opportunities */}
                {result.opportunities.length > 0 && (
                  <div className="rounded-xl p-4 mb-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="font-bold text-[13px] text-[#aaa] mb-2.5">Top Opportunities</div>
                    {result.opportunities.map((o) => (
                      <div key={o.id} className="flex justify-between gap-3 text-[13px] text-[#bbb] mb-1.5">
                        <span className="flex gap-2"><AlertTriangle size={13} color="#ffd93d" className="shrink-0 mt-0.5" />{o.title}</span>
                        {o.displayValue && <span className="text-[#ff6b6b] shrink-0">{o.displayValue}</span>}
                      </div>
                    ))}
                  </div>
                )}

                {perf != null && perf >= 90 && (
                  <div className="rounded-xl p-4 mb-5 text-center" style={{ background: 'rgba(0,255,170,0.06)', border: '1px solid rgba(0,255,170,0.2)' }}>
                    <CheckCircle2 className="mx-auto mb-1" size={20} color="#00ffaa" />
                    <div className="font-bold text-[#00ffaa] text-sm">Great score! We can help you maintain and monitor it.</div>
                  </div>
                )}

                {isSlow && (
                  <p className="text-[#bbb] text-sm mb-4">
                    A performance score under 70 is usually costing you conversions and Google ranking.
                    I fix exactly this — every Core Web Vital, tested one change at a time.
                  </p>
                )}

                <ToolCTA toolName="pagespeed-insights" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
