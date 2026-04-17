'use client'

// app/tools/tools/SpeedChecker.tsx
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Zap, AlertTriangle, CheckCircle } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

const PLATFORM_DATA: Record<string, { lcp: number; fid: number; cls: number; ttfb: number; notes: string[] }> = {
  shopify:     { lcp: 3.2, fid: 95,  cls: 0.12, ttfb: 420, notes: ['Shared CDN causes latency spikes', '3rd party apps add 200–800ms', 'JavaScript-heavy themes slow LCP'] },
  wix:         { lcp: 4.1, fid: 180, cls: 0.22, ttfb: 680, notes: ['Wix sites score poorly on Core Web Vitals', 'Bloated editor output', 'Limited control over performance'] },
  wordpress:   { lcp: 2.8, fid: 80,  cls: 0.09, ttfb: 350, notes: ['Needs caching plugin (WP Rocket etc.)', 'Plugin bloat a common issue', 'Can be fast with proper tuning'] },
  squarespace: { lcp: 3.8, fid: 120, cls: 0.15, ttfb: 520, notes: ['Heavy JS framework', 'Limited performance control', 'Template animations slow LCP'] },
  custom:      { lcp: 1.4, fid: 25,  cls: 0.03, ttfb: 90,  notes: ['Custom-built = only load what you need', 'No unnecessary app scripts', 'Optimized CDN & image handling'] },
}

function getGrade(lcp: number) {
  if (lcp <= 1.5) return { grade: 'A', color: '#00ffaa', label: 'Excellent' }
  if (lcp <= 2.5) return { grade: 'B', color: '#00d4ff', label: 'Good' }
  if (lcp <= 4.0) return { grade: 'C', color: '#ffd93d', label: 'Needs Work' }
  return { grade: 'D', color: '#ff6b6b', label: 'Poor' }
}

export default function SpeedChecker() {
  const [platform, setPlatform] = useState('')
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<((typeof PLATFORM_DATA)[string] & { grade: string; color: string; label: string }) | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const run = () => {
    if (!platform) return
    setScanning(true); setProgress(0); setResult(null)
    let p = 0
    intervalRef.current = setInterval(() => {
      p += Math.random() * 15 + 5
      if (p >= 100) {
        p = 100
        clearInterval(intervalRef.current!)
        const data = PLATFORM_DATA[platform]
        const { grade, color, label } = getGrade(data.lcp)
        setResult({ ...data, grade, color, label })
        setScanning(false)
        trackToolUsage('speed-checker', { platform }, { ...data, grade } as unknown as Record<string, unknown>)
      }
      setProgress(Math.min(100, p))
    }, 120)
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const platforms = ['shopify', 'wix', 'wordpress', 'squarespace', 'custom']

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
        ⚡ Speed Checker
      </h2>
      <p className="text-[#777] text-sm mb-6">
        See how your platform&apos;s speed affects sales — based on real Core Web Vitals data.
      </p>

      <div className="mb-5">
        <label className="block text-[13px] text-[#aaa] mb-2.5">Select Your Platform</label>
        <div className="flex gap-2 flex-wrap">
          {platforms.map((p) => (
            <button
              key={p} onClick={() => setPlatform(p)}
              className="px-4 py-2 rounded-lg text-[13px] font-semibold capitalize transition-all"
              style={{
                border: '1px solid',
                borderColor: platform === p ? '#00d4ff' : 'rgba(255,255,255,0.1)',
                background: platform === p ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.04)',
                color: platform === p ? '#00d4ff' : '#888',
              }}
            >
              {p === 'custom' ? '✦ Custom Built' : p.charAt(0).toUpperCase() + p.slice(1)}
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
          <div className="flex justify-between mb-1.5">
            <span className="text-[13px] text-[#aaa]">Analyzing platform performance...</span>
            <span className="text-[13px] text-[#00d4ff]">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #00d4ff, #7a5cff)' }}
            />
          </div>
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center p-6 rounded-xl mb-5" style={{ background: `${result.color}11`, border: `1px solid ${result.color}33` }}>
            <div className="text-5xl font-black" style={{ color: result.color }}>{result.grade}</div>
            <div className="text-[#aaa] text-sm mt-1">{result.label} Performance</div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {[
              { label: 'LCP (Largest Contentful Paint)', value: `${result.lcp}s`, good: result.lcp <= 2.5, unit: '≤2.5s is good' },
              { label: 'FID (First Input Delay)', value: `${result.fid}ms`, good: result.fid <= 100, unit: '≤100ms is good' },
              { label: 'CLS (Layout Shift)', value: result.cls, good: result.cls <= 0.1, unit: '≤0.1 is good' },
              { label: 'TTFB (Time to First Byte)', value: `${result.ttfb}ms`, good: result.ttfb <= 200, unit: '≤200ms is good' },
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex justify-between items-start">
                  <div className="text-[11px] text-[#666] mb-1 leading-tight">{metric.label}</div>
                  {metric.good ? <CheckCircle size={12} color="#00ffaa" /> : <AlertTriangle size={12} color="#ff6b6b" />}
                </div>
                <div className="text-xl font-extrabold" style={{ color: metric.good ? '#00ffaa' : '#ff6b6b' }}>{metric.value}</div>
                <div className="text-[11px] text-[#555]">{metric.unit}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="font-bold text-[13px] text-[#aaa] mb-2">Platform Notes</div>
            {result.notes.map((note, i) => (
              <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                <span className="text-[#555]">•</span> {note}
              </div>
            ))}
          </div>

          {platform !== 'custom' && (
            <div className="rounded-xl p-3.5 flex gap-2.5 mb-4" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)' }}>
              <AlertTriangle size={16} color="#ff6b6b" className="shrink-0 mt-0.5" />
              <p className="text-[#ccc] text-[13px] leading-relaxed m-0">
                Every 1 second delay in load time = 7% drop in conversions. A custom-built store is
                typically 2–3× faster than {platform}.
              </p>
            </div>
          )}

          <ToolCTA toolName="speed-checker" />
        </motion.div>
      )}
    </div>
  )
}
