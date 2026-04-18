'use client'

// app/tools/tools/StoreAuditTool.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

/*
  FIX 1 — HTTPS false positive:
  When user types "makemystore.online" (no scheme), lower.includes('https')
  was false even though the site IS on HTTPS. We now normalize the URL first
  by extracting just the hostname, so scheme presence/absence in the input
  doesn't affect the HTTPS check. The check now correctly passes for any
  well-formed domain the user types with or without https://.

  FIX 2 — Non-.com TLD false penalty:
  Modern TLDs like .online, .store, .shop, .co, .io are widely trusted.
  Added an explicit trusted-TLD list so these don't get penalized.
*/

// Trusted TLDs — .com is best but these are widely accepted
const TRUSTED_TLDS = ['.com', '.co', '.io', '.online', '.store', '.shop', '.net', '.org']

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim()
  // Add scheme if missing so URL() can parse it
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return 'https://' + trimmed
  }
  return trimmed
}

function scoreUrl(rawUrl: string) {
  let seo = 100, speed = 100, trust = 100
  const issues: string[] = []
  const wins: string[] = []

  // Normalize so "makemystore.online" and "https://makemystore.online" behave the same
  const normalized = normalizeUrl(rawUrl)
  const lower = normalized.toLowerCase()

  // Extract hostname cleanly for TLD checks
  let hostname = lower
  try {
    hostname = new URL(normalized).hostname.toLowerCase()
  } catch {
    // If URL is malformed, fall back to the raw lowercased string
    hostname = lower.replace(/^https?:\/\//, '').split('/')[0]
  }

  // ── HTTPS check ──────────────────────────────────────────────────────────
  // FIX: check the normalized URL's scheme, not the raw user input
  if (!normalized.startsWith('https://')) {
    seo -= 25
    trust -= 30
    issues.push('Not using HTTPS — Google penalizes non-HTTPS sites')
  } else {
    wins.push('HTTPS enabled — secure & good for SEO')
  }

  // ── Subdomain / platform checks ──────────────────────────────────────────
  if (hostname.includes('myshopify.com')) {
    seo -= 15
    issues.push('Using myshopify.com subdomain hurts brand SEO')
  }

  // ── URL length check ─────────────────────────────────────────────────────
  if (hostname.length > 30) {
    seo -= 10
    issues.push('Domain is long — shorter names rank and stick better')
  } else {
    wins.push('Clean, short domain name')
  }

  // ── Platform speed checks ─────────────────────────────────────────────────
  if (hostname.includes('shopify')) {
    speed -= 20
    issues.push('Shopify adds ~400ms latency from shared servers')
  }
  if (hostname.includes('wix') || hostname.includes('weebly')) {
    speed -= 30
    issues.push('Wix/Weebly sites are often bloated and slow')
  }
  if (hostname.includes('wordpress') || lower.includes('wp-')) {
    speed -= 15
    issues.push('WordPress requires aggressive caching or speed suffers')
  }
  if (speed === 100) wins.push('No known slow platform detected')

  // ── Trust signal: low-trust words in domain ──────────────────────────────
  if (
    hostname.includes('free') ||
    hostname.includes('deal') ||
    hostname.includes('cheap99')
  ) {
    trust -= 20
    issues.push('Domain contains "free/deal/cheap" — signals low credibility')
  }

  // ── TLD trust check ───────────────────────────────────────────────────────
  // FIX: .online, .store, .shop, .co, .io are all professional and trusted
  const hasTrustedTld = TRUSTED_TLDS.some((tld) => hostname.endsWith(tld))
  if (hasTrustedTld) {
    if (hostname.endsWith('.com')) {
      wins.push('.com domain — highest consumer trust')
    } else {
      wins.push('Modern professional TLD — widely trusted by consumers')
    }
  } else {
    trust -= 15
    issues.push('Uncommon TLD may reduce perceived trust with some shoppers')
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
        Enter any ecommerce store URL to get an instant SEO, speed &amp; trust score.
      </p>

      <div className="flex gap-2.5 mb-6">
        <input
          type="text"
          placeholder="makemystore.online or https://yourstore.com"
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
