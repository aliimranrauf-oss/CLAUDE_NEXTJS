'use client'

// app/tools/tools/FakeStoreChecker.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

function checkStore(url: string) {
  const lower = url.toLowerCase()
  const redFlags: string[] = []
  const greenFlags: string[] = []
  let riskScore = 0

  if (!lower.includes('https')) { riskScore += 25; redFlags.push('No HTTPS — your data is not encrypted') } else { greenFlags.push('HTTPS enabled') }
  const suspiciousTlds = ['.xyz', '.top', '.club', '.icu', '.store']
  if (suspiciousTlds.some((t) => lower.includes(t))) { riskScore += 20; redFlags.push('Uncommon TLD often used by scam sites') }
  const trustTlds = ['.com', '.co.uk', '.ca', '.au']
  if (trustTlds.some((t) => lower.endsWith(t))) greenFlags.push('Trusted TLD (.com, .co.uk, etc.)')
  if (lower.includes('sale') && lower.includes('cheap')) { riskScore += 15; redFlags.push('"Sale" + "cheap" in URL — common in scam stores') }
  if (/\d{4,}/.test(lower)) { riskScore += 10; redFlags.push('Long number sequence in domain — unusual for real brands') }
  if (lower.includes('brand') || lower.includes('official') || lower.includes('authentic')) { riskScore += 20; redFlags.push('Uses "brand/official/authentic" — often fake impersonation stores') }
  if (lower.includes('myshopify.com')) greenFlags.push('On Shopify platform (some accountability)')
  if (lower.includes('amazon') || lower.includes('ebay')) { riskScore += 30; redFlags.push('Impersonating Amazon/eBay — almost certainly fraudulent') }
  if (lower.length > 50) { riskScore += 10; redFlags.push('Unusually long URL — often used to confuse buyers') }
  const dashes = (lower.match(/-/g) || []).length
  if (dashes >= 3) { riskScore += 15; redFlags.push('Many hyphens in domain — common scam pattern') }

  const riskLevel = riskScore >= 60 ? 'HIGH' : riskScore >= 30 ? 'MEDIUM' : 'LOW'
  const riskColor = riskLevel === 'HIGH' ? '#ff6b6b' : riskLevel === 'MEDIUM' ? '#ffd93d' : '#00ffaa'

  return { redFlags, greenFlags, riskScore: Math.min(100, riskScore), riskLevel, riskColor }
}

export default function FakeStoreChecker() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ReturnType<typeof checkStore> | null>(null)

  const run = () => {
    if (!url.trim()) return
    const r = checkStore(url)
    setResult(r)
    trackToolUsage('fake-store-checker', { url }, r as unknown as Record<string, unknown>)
  }

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
        🛡️ Fake Store Checker
      </h2>
      <p className="text-[#777] text-sm mb-6">
        Detect red flags in any online store URL before you buy or partner.
      </p>

      <div className="flex gap-2.5 mb-6">
        <input
          type="url" placeholder="https://suspicious-store.com" value={url}
          onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && run()}
          className="flex-1 px-3.5 py-2.5 text-sm text-white rounded-lg outline-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
        />
        <button onClick={run} className="btn-primary flex items-center gap-1.5 text-sm">
          <Shield size={15} /> Check
        </button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center p-6 rounded-xl mb-5" style={{ background: `${result.riskColor}11`, border: `1px solid ${result.riskColor}33` }}>
            <div className="text-sm text-[#888] mb-1">Risk Level</div>
            <div className="text-4xl font-black" style={{ color: result.riskColor }}>{result.riskLevel}</div>
            <div className="text-[13px] text-[#666] mt-1">Risk Score: {result.riskScore}/100</div>
          </div>

          {result.redFlags.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)' }}>
              <div className="flex gap-2 text-[#ff6b6b] font-bold mb-2.5"><AlertTriangle size={16} /> Red Flags Found</div>
              {result.redFlags.map((flag, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                  <XCircle size={14} color="#ff6b6b" className="shrink-0 mt-0.5" />{flag}
                </div>
              ))}
            </div>
          )}

          {result.greenFlags.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(0,255,170,0.06)', border: '1px solid rgba(0,255,170,0.15)' }}>
              <div className="flex gap-2 text-[#00ffaa] font-bold mb-2.5"><CheckCircle size={16} /> Trust Signals</div>
              {result.greenFlags.map((flag, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                  <CheckCircle size={14} color="#00ffaa" className="shrink-0 mt-0.5" />{flag}
                </div>
              ))}
            </div>
          )}

          <p className="text-[#555] text-xs mb-4">
            ⚠️ This tool uses URL pattern analysis only. Always verify stores through customer reviews and payment security.
          </p>

          <ToolCTA toolName="fake-store-checker" />
        </motion.div>
      )}
    </div>
  )
}
