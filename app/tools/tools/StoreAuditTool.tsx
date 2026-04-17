'use client'

// app/tools/tools/StoreAuditTool.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

function scoreUrl(url: string) {
  let seo = 100, speed = 100, trust = 100
  const issues: string[] = []
  const wins: string[] = []
  const lower = url.toLowerCase()

  if (!lower.includes('https')) {
    seo -= 25
    issues.push('Not using HTTPS — Google penalizes this')
  } else {
    wins.push('HTTPS enabled — good for SEO')
  }
  if (lower.includes('myshopify.com')) {
    seo -= 15
    issues.push('Using myshopify.com subdomain hurts brand SEO')
  }
  if (lower.length > 30) {
    seo -= 10
    issues.push('URL is long — shorter domains rank better')
  } else {
    wins.push('Clean, short domain name')
  }

  if (lower.includes('shopify')) {
    speed -= 20
    issues.push('Shopify adds ~400ms latency from shared servers')
  }
  if (lower.includes('wix') || lower.includes('weebly')) {
    speed -= 30
    issues.push('Wix/Weebly sites are often bloated and slow')
  }
  if (lower.includes('wordpress') || lower.includes('wp-')) {
    speed -= 15
    issues.push('WordPress requires aggressive caching or speed suffers')
  }
  if (speed === 100) wins.push('No known slow platform detected')

  if (!lower.includes('https')) trust -= 30
  if (lower.includes('free') || lower.includes('deal') || lower.includes('cheap99')) {
    trust -= 20
    issues.push('Domain name contains "free/deal/cheap" — low-trust signals')
  }
  if (lower.includes('.com')) {
    wins.push('.com domain — highest consumer trust')
  } else {
    trust -= 15
    issues.push('Non-.com TLD reduces perceived trust')
  }

  const clamp = (v: number) => Math.max(0, Math.min(100, v))
  return {
    seo: clamp(seo),
    speed: clamp(speed),
    trust: clamp(trust),
    issues,
    wins,
    overall: clamp(Math.round((seo + speed + trust) / 3)),
  }
}

const ScoreBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="mb-3.5">
    <div className="flex justify-between mb-1.5">
      <span className="text-[13px] text-[#aaa]">{label}</span>
      <span className="text-[13px] font-bold" style={{ color }}>{value}/100</span>
    </div>
    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  </div>
)

export default function StoreAuditTool() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ReturnType<typeof scoreUrl> | null>(null)

  const run = () => {
    if (!url.trim()) return
    const r = scoreUrl(url)
    setResult(r)
    trackToolUsage('store-audit', { url }, r as unknown as Record<string, unknown>)
  }

  const overallColor = result
    ? result.overall >= 70 ? '#00ffaa' : result.overall >= 40 ? '#ffd93d' : '#ff6b6b'
    : '#00d4ff'

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
        🔍 Store Audit Tool
      </h2>
      <p className="text-[#777] text-sm mb-6">
        Enter any ecommerce store URL to get an instant SEO, speed & trust score.
      </p>

      <div className="flex gap-2.5 mb-6">
        <input
          type="url"
          placeholder="https://yourstore.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && run()}
          className="flex-1 px-3.5 py-2.5 text-sm text-white rounded-lg outline-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
        />
        <button
          onClick={run}
          className="btn-primary text-sm flex items-center gap-1.5"
        >
          <Search size={15} /> Audit
        </button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div
            className="text-center p-6 rounded-xl mb-5"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="text-6xl font-black" style={{ color: overallColor }}>{result.overall}</div>
            <div className="text-[#888] text-sm mt-1">Overall Store Score</div>
          </div>

          <ScoreBar label="SEO Score" value={result.seo} color="#00d4ff" />
          <ScoreBar label="Speed Score" value={result.speed} color="#7a5cff" />
          <ScoreBar label="Trust Score" value={result.trust} color="#00ffaa" />

          {result.issues.length > 0 && (
            <div
              className="mt-5 rounded-xl p-4"
              style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)' }}
            >
              <div className="flex items-center gap-2 text-[#ff6b6b] font-bold mb-2.5">
                <AlertTriangle size={16} /> Issues Found
              </div>
              {result.issues.map((issue, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                  <XCircle size={14} color="#ff6b6b" className="shrink-0 mt-0.5" />
                  {issue}
                </div>
              ))}
            </div>
          )}

          {result.wins.length > 0 && (
            <div
              className="mt-3 rounded-xl p-4"
              style={{ background: 'rgba(0,255,170,0.06)', border: '1px solid rgba(0,255,170,0.15)' }}
            >
              <div className="flex items-center gap-2 text-[#00ffaa] font-bold mb-2.5">
                <CheckCircle size={16} /> What&apos;s Working
              </div>
              {result.wins.map((win, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                  <CheckCircle size={14} color="#00ffaa" className="shrink-0 mt-0.5" />
                  {win}
                </div>
              ))}
            </div>
          )}

          <ToolCTA toolName="store-audit" />
        </motion.div>
      )}
    </div>
  )
}
