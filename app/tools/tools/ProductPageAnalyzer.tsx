'use client'

// app/tools/tools/ProductPageAnalyzer.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

function analyzeProductPage(title: string, description: string, price: string) {
  const issues: string[] = []
  const wins: string[] = []
  let score = 100

  if (!title.trim()) {
    score -= 20; issues.push('No product title — critical for SEO')
  } else if (title.length < 20) {
    score -= 10; issues.push('Title too short — aim for 40–60 chars for SEO')
  } else {
    wins.push('Good product title length')
  }

  const words = description.trim().split(/\s+/).filter(Boolean).length
  if (words === 0) {
    score -= 30; issues.push('No product description — massive conversion killer')
  } else if (words < 50) {
    score -= 15; issues.push('Description too short (<50 words) — add benefits, features')
  } else if (words >= 150) {
    wins.push('Strong description length (150+ words)')
  } else {
    wins.push('Decent description length')
  }

  if (description && !description.includes('you')) { score -= 5; issues.push("Use 'you' language — speak directly to the buyer") }
  if (description && description.toLowerCase().includes('high quality')) { score -= 5; issues.push('"High quality" is generic — replace with specific benefits') }
  if (description && /\d/.test(description)) wins.push('Includes numbers — great for trust and specificity')
  if (description && description.includes('?')) wins.push('Uses questions — engages reader curiosity')
  if (description && description.toLowerCase().includes('guarantee')) wins.push('Mentions guarantee — strong trust signal')
  if (description && !description.toLowerCase().match(/\b(free shipping|guarantee|return|support)\b/)) {
    score -= 10; issues.push('No trust signals (guarantee, free shipping, returns)')
  }

  if (!price.trim()) {
    score -= 10; issues.push('No price entered — unclear offer')
  } else {
    const p = parseFloat(price.replace(/[^0-9.]/g, ''))
    if (p > 0) wins.push('Price is set — clear offer')
    if (p && p.toString().endsWith('9')) wins.push('Charm pricing (ends in 9) — proven conversion booster')
  }

  return { score: Math.max(0, Math.min(100, score)), issues, wins, wordCount: words }
}

export default function ProductPageAnalyzer() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [result, setResult] = useState<ReturnType<typeof analyzeProductPage> | null>(null)

  const run = () => {
    const r = analyzeProductPage(title, description, price)
    setResult(r)
    trackToolUsage('product-page-analyzer', { title, wordCount: r.wordCount, price }, r as unknown as Record<string, unknown>)
  }

  const scoreColor = result
    ? result.score >= 70 ? '#00ffaa' : result.score >= 40 ? '#ffd93d' : '#ff6b6b'
    : '#00d4ff'

  const inputClass = "w-full px-3.5 py-2.5 text-sm text-white rounded-lg outline-none"
  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
        📄 Product Page Analyzer
      </h2>
      <p className="text-[#777] text-sm mb-6">
        Paste your product page content and get an instant conversion score.
      </p>

      <div className="flex flex-col gap-3.5 mb-6">
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">Product Title</label>
          <input type="text" placeholder="e.g. Premium Leather Wallet for Men" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">Product Description</label>
          <textarea
            placeholder="Paste your product description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className={`${inputClass} resize-y leading-relaxed`}
            style={inputStyle}
          />
          <div className="text-xs text-[#555] text-right mt-1">
            {description.trim().split(/\s+/).filter(Boolean).length} words
          </div>
        </div>
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">Price</label>
          <input type="text" placeholder="e.g. $49.99" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} style={inputStyle} />
        </div>
      </div>

      <button onClick={run} className="btn-primary flex items-center gap-2 mb-6">
        <FileText size={15} /> Analyze Page
      </button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center p-5 rounded-xl mb-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="text-5xl font-black" style={{ color: scoreColor }}>{result.score}</div>
            <div className="text-[#888] text-sm mt-1">Conversion Score</div>
            <div className="text-[13px] text-[#555] mt-1">
              {result.score >= 70 ? 'Strong product page!' : result.score >= 40 ? 'Needs improvement' : 'Major issues found'}
            </div>
          </div>

          {result.issues.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)' }}>
              <div className="flex gap-2 text-[#ff6b6b] font-bold mb-2.5"><AlertTriangle size={16} /> Problems Hurting Conversions</div>
              {result.issues.map((issue, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                  <XCircle size={14} color="#ff6b6b" className="shrink-0 mt-0.5" />{issue}
                </div>
              ))}
            </div>
          )}

          {result.wins.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(0,255,170,0.06)', border: '1px solid rgba(0,255,170,0.15)' }}>
              <div className="flex gap-2 text-[#00ffaa] font-bold mb-2.5"><CheckCircle size={16} /> What&apos;s Working</div>
              {result.wins.map((win, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                  <CheckCircle size={14} color="#00ffaa" className="shrink-0 mt-0.5" />{win}
                </div>
              ))}
            </div>
          )}

          <ToolCTA toolName="product-page-analyzer" />
        </motion.div>
      )}
    </div>
  )
}
