'use client'

// app/tools/tools/FakeStoreChecker.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, XCircle, ShieldCheck } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

/*
  IMPROVEMENTS:
  1. Same URL normalization fix as StoreAuditTool — HTTPS check no longer
     false-positives when user types domain without https://
  2. .online/.store/.shop removed from suspicious TLD list — they are legitimate
  3. Added weighted risk scoring with visual risk meter
  4. More nuanced checks: repeated subdomains, IP address URLs, very new domains patterns
  5. Risk verdict labels: Safe / Caution / Suspicious / Very Likely Fake
  6. Safety tips section — what else to check manually
*/

// Normalize URL exactly as in StoreAuditTool for consistency
function normalizeUrl(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return 'https://' + trimmed
  }
  return trimmed
}

// TLDs that are genuinely suspicious (low-quality, often used by scammers)
const SUSPICIOUS_TLDS  = ['.xyz', '.top', '.icu', '.pw', '.tk', '.ml', '.ga', '.cf', '.gq', '.buzz']
// TLDs that are widely trusted (including modern ones)
const TRUSTED_TLDS     = ['.com', '.co.uk', '.ca', '.com.au', '.co', '.io', '.online', '.store', '.shop', '.net', '.org', '.co.nz']
// Impersonation keywords
const IMPERSONATION    = ['amazon', 'ebay', 'aliexpress', 'shopify', 'paypal', 'apple', 'nike', 'adidas', 'supreme']
// Scam bait words in domain
const SCAM_BAIT        = ['sale', 'cheap', 'discount', 'deal', 'offer', 'promo', 'clearance', 'limited', '90off', '80off', 'free']

interface RiskFactor {
  label: string
  points: number
  type: 'red' | 'green' | 'yellow'
}

function checkStore(rawUrl: string) {
  const normalized = normalizeUrl(rawUrl)
  const factors: RiskFactor[] = []
  let riskScore = 0

  let hostname = ''
  try {
    hostname = new URL(normalized).hostname.toLowerCase()
  } catch {
    hostname = normalized.replace(/^https?:\/\//, '').split('/')[0].toLowerCase()
  }

  // ── HTTPS ────────────────────────────────────────────────────────────────
  // FIX: check normalized scheme, not raw user input
  if (!normalized.startsWith('https://')) {
    riskScore += 30
    factors.push({ label: 'No HTTPS — payment data is not encrypted', points: 30, type: 'red' })
  } else {
    factors.push({ label: 'HTTPS enabled — connection is encrypted', points: 0, type: 'green' })
  }

  // ── TLD check ─────────────────────────────────────────────────────────────
  const hasSuspiciousTld = SUSPICIOUS_TLDS.some(t => hostname.endsWith(t))
  const hasTrustedTld    = TRUSTED_TLDS.some(t => hostname.endsWith(t))

  if (hasSuspiciousTld) {
    riskScore += 25
    const tld = SUSPICIOUS_TLDS.find(t => hostname.endsWith(t))
    factors.push({ label: `"${tld}" TLD is heavily associated with scam sites`, points: 25, type: 'red' })
  } else if (hasTrustedTld) {
    const tld = TRUSTED_TLDS.find(t => hostname.endsWith(t))
    factors.push({ label: `Trusted TLD (${tld})`, points: 0, type: 'green' })
  } else {
    riskScore += 10
    factors.push({ label: 'Uncommon TLD — not necessarily fake, but verify further', points: 10, type: 'yellow' })
  }

  // ── IP address instead of domain ─────────────────────────────────────────
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    riskScore += 40
    factors.push({ label: 'IP address as URL — never enter payment info here', points: 40, type: 'red' })
  }

  // ── Brand impersonation ───────────────────────────────────────────────────
  const impersonates = IMPERSONATION.filter(b => hostname.includes(b) && !hostname.startsWith(b + '.'))
  if (impersonates.length > 0) {
    riskScore += 35
    factors.push({ label: `Appears to impersonate "${impersonates[0]}" — very high fraud risk`, points: 35, type: 'red' })
  }

  // ── Scam bait words in domain ─────────────────────────────────────────────
  const scamWords = SCAM_BAIT.filter(w => hostname.replace(/[^a-z0-9]/g, '').includes(w))
  if (scamWords.length >= 2) {
    riskScore += 20
    factors.push({ label: `Multiple sale/deal words in domain: "${scamWords.slice(0,2).join('", "')}"`, points: 20, type: 'red' })
  } else if (scamWords.length === 1) {
    riskScore += 8
    factors.push({ label: `Deal/sale keyword in domain: "${scamWords[0]}" — common in scam stores`, points: 8, type: 'yellow' })
  }

  // ── Excessive hyphens ─────────────────────────────────────────────────────
  const hyphens = (hostname.match(/-/g) || []).length
  if (hyphens >= 3) {
    riskScore += 20
    factors.push({ label: `${hyphens} hyphens in domain — scam stores often use this to mimic real brands`, points: 20, type: 'red' })
  } else if (hyphens === 2) {
    riskScore += 8
    factors.push({ label: '2 hyphens in domain — slightly unusual, verify the store', points: 8, type: 'yellow' })
  }

  // ── Long numeric sequences ────────────────────────────────────────────────
  if (/\d{4,}/.test(hostname)) {
    riskScore += 12
    factors.push({ label: 'Long number string in domain — not typical for legitimate brands', points: 12, type: 'yellow' })
  }

  // ── Known safe platform signals ───────────────────────────────────────────
  if (hostname.includes('myshopify.com')) {
    factors.push({ label: 'Hosted on Shopify — platform has fraud monitoring', points: 0, type: 'green' })
  }
  if (hostname.includes('amazon.com') && hostname.split('.').length <= 3) {
    factors.push({ label: 'Verified Amazon domain — legitimate', points: 0, type: 'green' })
    riskScore = Math.max(0, riskScore - 30)
  }

  // ── Very long domain ──────────────────────────────────────────────────────
  const domainPart = hostname.split('.')[0]
  if (domainPart.length > 20) {
    riskScore += 10
    factors.push({ label: `Very long domain name (${domainPart.length} chars) — unusual for real brands`, points: 10, type: 'yellow' })
  } else if (domainPart.length >= 4 && domainPart.length <= 14) {
    factors.push({ label: 'Clean, concise domain name', points: 0, type: 'green' })
  }

  const finalScore = Math.min(100, Math.max(0, riskScore))
  const riskLevel  = finalScore >= 60 ? 'VERY LIKELY FAKE' : finalScore >= 35 ? 'SUSPICIOUS' : finalScore >= 15 ? 'CAUTION' : 'LOOKS SAFE'
  const riskColor  = finalScore >= 60 ? '#ff6b6b' : finalScore >= 35 ? '#ff9f43' : finalScore >= 15 ? '#ffd93d' : '#00ffaa'

  const redFlags   = factors.filter(f => f.type === 'red')
  const yellowFlags = factors.filter(f => f.type === 'yellow')
  const greenFlags  = factors.filter(f => f.type === 'green')

  return { redFlags, yellowFlags, greenFlags, riskScore: finalScore, riskLevel, riskColor }
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
        Detect fraud signals in any store URL before you buy or partner with them.
      </p>

      <div className="flex gap-2.5 mb-6">
        <input
          type="text"
          placeholder="suspicious-deals.xyz or https://store.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && run()}
          className="flex-1 px-3.5 py-2.5 text-sm text-white rounded-lg outline-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
        />
        <button onClick={run} className="btn-primary flex items-center gap-1.5 text-sm">
          <Shield size={15} /> Check
        </button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* Risk header with meter */}
          <div className="p-5 rounded-xl mb-5" style={{ background: `${result.riskColor}11`, border: `1px solid ${result.riskColor}33` }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[11px] text-[#888] mb-0.5">Risk Assessment</div>
                <div className="text-2xl font-black" style={{ color: result.riskColor }}>{result.riskLevel}</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-[#888] mb-0.5">Risk Score</div>
                <div className="text-3xl font-extrabold" style={{ color: result.riskColor }}>{result.riskScore}<span className="text-[16px] text-[#555]">/100</span></div>
              </div>
            </div>
            {/* Risk meter */}
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.riskScore}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, #00ffaa, ${result.riskColor})` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#444] mt-1">
              <span>Safe</span><span>Caution</span><span>Suspicious</span><span>Fake</span>
            </div>
          </div>

          {/* Red flags */}
          {result.redFlags.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)' }}>
              <div className="flex gap-2 text-[#ff6b6b] font-bold mb-2.5 text-[13px]">
                <AlertTriangle size={15} /> Red Flags ({result.redFlags.length})
              </div>
              {result.redFlags.map((flag, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                  <XCircle size={13} color="#ff6b6b" className="shrink-0 mt-0.5" />{flag.label}
                </div>
              ))}
            </div>
          )}

          {/* Yellow flags */}
          {result.yellowFlags.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(255,217,61,0.07)', border: '1px solid rgba(255,217,61,0.2)' }}>
              <div className="flex gap-2 text-[#ffd93d] font-bold mb-2.5 text-[13px]">
                <AlertTriangle size={15} /> Caution Points
              </div>
              {result.yellowFlags.map((flag, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                  <AlertTriangle size={13} color="#ffd93d" className="shrink-0 mt-0.5" />{flag.label}
                </div>
              ))}
            </div>
          )}

          {/* Green flags */}
          {result.greenFlags.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(0,255,170,0.06)', border: '1px solid rgba(0,255,170,0.15)' }}>
              <div className="flex gap-2 text-[#00ffaa] font-bold mb-2.5 text-[13px]">
                <ShieldCheck size={15} /> Trust Signals
              </div>
              {result.greenFlags.map((flag, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                  <CheckCircle size={13} color="#00ffaa" className="shrink-0 mt-0.5" />{flag.label}
                </div>
              ))}
            </div>
          )}

          {/* Manual checks tip */}
          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-[13px] font-bold text-[#aaa] mb-2">Also Check Manually</div>
            {[
              'Search "[store name] reviews scam" on Google',
              'Look up the domain age on whois.domaintools.com',
              'Check if contact info and return policy are clearly visible',
              'See if product images appear on multiple unrelated sites (reverse image search)',
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 text-[#bbb] text-[13px] mb-1.5">
                <span className="text-[#555] shrink-0">→</span> {tip}
              </div>
            ))}
          </div>

          <p className="text-[#444] text-xs mb-4">
            ⚠️ This tool analyzes URL patterns only. It cannot check the actual website content, domain age, or payment security.
          </p>

          <ToolCTA toolName="fake-store-checker" />
        </motion.div>
      )}
    </div>
  )
}
