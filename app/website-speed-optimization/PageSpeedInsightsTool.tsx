'use client'

// app/website-speed-optimization/PageSpeedInsightsTool.tsx
// Real Google PageSpeed Insights lead-magnet tool. Lives inside the hero
// section of the Speed Optimization page — visitor pastes a URL, gets a
// REAL Lighthouse + CrUX field-data report back (via our own /api/pagespeed
// proxy), then is pushed toward the paid speed-optimization service.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Loader2, AlertTriangle, CheckCircle2, Gauge, Smartphone, Monitor, Copy, Check, Users, FlaskConical,
} from 'lucide-react'
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
  field: {
    lcp: number | null
    cls: number | null
    inp: number | null
    fcp: number | null
  } | null
  opportunities: { id: string; title: string; displayValue: string | null }[]
}

function scoreColor(score: number | null) {
  if (score == null) return '#777'
  if (score >= 90) return '#00ffaa'
  if (score >= 50) return '#ffd93d'
  return '#ff6b6b'
}

function fieldPass(metric: 'lcp' | 'cls' | 'inp' | 'fcp', value: number | null) {
  if (value == null) return null
  if (metric === 'lcp') return value <= 2500
  if (metric === 'cls') return value <= 0.1
  if (metric === 'inp') return value <= 200
  return value <= 1800 // fcp
}

function ScoreRing({ label, score }: { label: string; score: number | null }) {
  const color = scoreColor(score)
  const pct = score ?? 0
  const circumference = 2 * Math.PI * 26
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-[56px] h-[56px] sm:w-[64px] sm:h-[64px]">
        <svg width="100%" height="100%" viewBox="0 0 64 64">
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
        <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-extrabold" style={{ color }}>
          {score ?? '–'}
        </div>
      </div>
      <span className="text-[10px] sm:text-[11px] text-[#999] text-center leading-tight">{label}</span>
    </div>
  )
}

export default function PageSpeedInsightsTool() {
  const [url, setUrl] = useState('')
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PSIResult | null>(null)
  const [copied, setCopied] = useState(false)

  const run = async () => {
    if (!url.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)
    setCopied(false)

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

  const copyReport = async () => {
    if (!result) return
    const lines = [
      `PageSpeed Insights report — ${result.url} (${strategy})`,
      `Performance: ${result.scores.performance ?? '–'}/100`,
      `Accessibility: ${result.scores.accessibility ?? '–'}/100`,
      `Best Practices: ${result.scores.bestPractices ?? '–'}/100`,
      `SEO: ${result.scores.seo ?? '–'}/100`,
      '',
      'Core Web Vitals (lab):',
      `LCP: ${result.lab.lcp.displayValue ?? '–'}`,
      `CLS: ${result.lab.cls.displayValue ?? '–'}`,
      `TBT: ${result.lab.tbt.displayValue ?? '–'}`,
      `FCP: ${result.lab.fcp.displayValue ?? '–'}`,
      `Speed Index: ${result.lab.speedIndex.displayValue ?? '–'}`,
      `TTFB: ${result.lab.ttfb.displayValue ?? '–'}`,
      ...(result.opportunities.length
        ? ['', 'Top opportunities:', ...result.opportunities.map((o) => `- ${o.title}${o.displayValue ? ` (${o.displayValue})` : ''}`)]
        : []),
      '',
      `Checked at makemystore.online/website-speed-optimization`,
    ]
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked (e.g. insecure context) — fail silently, button just won't show "Copied"
    }
  }

  const perf = result?.scores.performance ?? null
  const isSlow = perf != null && perf < 70

  return (
    <div className={`w-full mx-auto transition-all ${result ? 'max-w-2xl' : 'max-w-4xl'}`}>
      <div className={`grid gap-6 items-start ${result ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[1.3fr_1fr]'}`}>
      <div
        className="rounded-2xl p-5 sm:p-7"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Gauge size={18} color="#00d4ff" />
          <h2 className="text-lg sm:text-xl font-extrabold" style={{ fontFamily: 'Syne, sans-serif' }}>
            Free Google PageSpeed Insights Check
          </h2>
        </div>
        <p className="text-[#999] text-sm mb-5">
          Paste your URL for a real, live report — the exact same Lighthouse + Chrome UX data Google itself uses to judge your site. No sign-up required.
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
            className="btn-primary flex items-center justify-center gap-2 px-6 py-3 disabled:opacity-50 shrink-0"
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
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="text-[12px] text-[#666] truncate">
                  Results for <span className="text-[#aaa]">{result.url}</span> &middot; {strategy}
                </div>
                <button
                  onClick={copyReport}
                  className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shrink-0 transition-colors"
                  style={{
                    background: copied ? 'rgba(0,255,170,0.12)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${copied ? 'rgba(0,255,170,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    color: copied ? '#00ffaa' : '#aaa',
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? 'Copied' : 'Copy Report'}
                </button>
              </div>

              {/* Category scores */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                <ScoreRing label="Performance" score={result.scores.performance} />
                <ScoreRing label="Accessibility" score={result.scores.accessibility} />
                <ScoreRing label="Best Practices" score={result.scores.bestPractices} />
                <ScoreRing label="SEO" score={result.scores.seo} />
              </div>

              {/* Field data (real users, CrUX) */}
              <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(122,92,255,0.06)', border: '1px solid rgba(122,92,255,0.2)' }}>
                <div className="flex items-center gap-2 mb-2.5">
                  <Users size={14} color="#a78bfa" />
                  <span className="text-[12px] font-bold text-[#a78bfa]">In the Field &mdash; Real Visitors (28-day Chrome average)</span>
                </div>
                {result.field ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { label: 'LCP', v: result.field.lcp, unit: 'ms', metric: 'lcp' as const },
                      { label: 'INP', v: result.field.inp, unit: 'ms', metric: 'inp' as const },
                      { label: 'CLS', v: result.field.cls, unit: '', metric: 'cls' as const },
                      { label: 'FCP', v: result.field.fcp, unit: 'ms', metric: 'fcp' as const },
                    ].map((f) => {
                      const pass = fieldPass(f.metric, f.v)
                      return (
                        <div key={f.label}>
                          <div className="text-[10px] text-[#888] mb-0.5">{f.label}</div>
                          <div className="text-sm font-extrabold flex items-center gap-1" style={{ color: pass == null ? '#777' : pass ? '#00ffaa' : '#ff6b6b' }}>
                            {f.v != null ? `${f.metric === 'cls' ? f.v.toFixed(2) : Math.round(f.v)}${f.unit}` : 'No data'}
                            {pass != null && (pass ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-[12px] text-[#999] m-0">
                    Google doesn&apos;t have enough real-visitor traffic recorded for this URL yet (needs meaningful Chrome traffic over 28 days).
                    The lab results below are a precise, controlled measurement instead.
                  </p>
                )}
              </div>

              {/* Lab data label */}
              <div className="flex items-center gap-2 mb-2.5 mt-1">
                <FlaskConical size={14} color="#00d4ff" />
                <span className="text-[12px] font-bold text-[#00d4ff]">Lab Data &mdash; Simulated Single Load</span>
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
                  <div className="font-bold text-[13px] text-[#aaa] mb-2.5">Top Opportunities to Fix</div>
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
                  I fix exactly this &mdash; every Core Web Vital, tested one change at a time.
                </p>
              )}

              <ToolCTA toolName="pagespeed-insights" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!result && !loading && (
        <div
          className="hidden lg:block rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h3 className="font-bold text-sm mb-4 text-white/90">What You&apos;ll See</h3>
          <div className="space-y-3.5">
            {[
              'Performance, Accessibility, Best Practices & SEO scores',
              'Core Web Vitals: LCP, CLS, TBT, FCP & Speed Index',
              'Real visitor field data from Chrome (28-day average)',
              'Top opportunities to fix, ranked by impact',
            ].map((t) => (
              <div key={t} className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-[#00d4ff] shrink-0 mt-0.5" />
                <span className="text-white/65 text-xs leading-relaxed">{t}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-white/35 mt-5 pt-4 border-t border-white/10">
            Powered by Google Lighthouse &amp; PageSpeed Insights. No sign-up, no email required.
          </p>
        </div>
      )}
      </div>
    </div>
  )
}
