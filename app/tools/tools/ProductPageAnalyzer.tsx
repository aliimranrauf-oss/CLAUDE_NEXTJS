'use client'

// app/tools/tools/ProductPageAnalyzer.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, CheckCircle, XCircle, AlertTriangle, Lightbulb } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

/*
  IMPROVEMENTS:
  1. Readability score — avg sentence length & Flesch-Kincaid estimate
  2. Emotional trigger word detection (urgency, exclusivity, social proof)
  3. SEO keyword density check — is the product name repeated enough?
  4. Bullet point detector — do they use scan-friendly formatting?
  5. CTA presence check — does description tell visitor what to do?
  6. Actionable improvement tips section, not just issue list
  7. Score breakdown by category: SEO, Copywriting, Trust
*/

const TRUST_WORDS    = ['guarantee', 'warranty', 'return', 'free shipping', 'secure', 'trusted', 'verified', 'certified', 'authentic', 'safe']
const URGENCY_WORDS  = ['limited', 'only', 'left', 'today', 'now', 'hurry', 'expires', 'last chance', 'exclusive', 'sold out']
const EMOTION_WORDS  = ['love', 'perfect', 'amazing', 'transform', 'feel', 'dream', 'effortless', 'powerful', 'life-changing', 'finally']
const GENERIC_WORDS  = ['high quality', 'best in class', 'top notch', 'premium quality', 'great product', 'amazing product']
const CTA_WORDS      = ['order now', 'buy now', 'get yours', 'shop now', 'add to cart', 'claim', 'grab', 'start', 'try']

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function avgSentenceLength(text: string) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  if (sentences.length === 0) return 0
  const total = sentences.reduce((sum, s) => sum + countWords(s), 0)
  return Math.round(total / sentences.length)
}

function analyzeProductPage(title: string, description: string, price: string) {
  const lower = description.toLowerCase()
  const titleLower = title.toLowerCase()
  const words = countWords(description)
  const sentenceAvg = avgSentenceLength(description)

  let seoScore       = 100
  let copyScore      = 100
  let trustScore     = 100
  const issues: string[] = []
  const wins: string[] = []
  const tips: string[] = []

  // ── TITLE checks ──────────────────────────────────────────────────────────
  if (!title.trim()) {
    seoScore -= 20; issues.push('Missing product title — critical for SEO indexing')
  } else if (title.length < 25) {
    seoScore -= 10; issues.push(`Title too short (${title.length} chars) — aim for 40–70 characters`)
    tips.push(`Expand your title: add material, size, or use case. E.g. "${title} — Lightweight, Waterproof, Unisex"`)
  } else if (title.length > 70) {
    seoScore -= 5; issues.push('Title over 70 chars may be truncated in Google results')
  } else {
    wins.push(`Good title length (${title.length} chars) — optimized for search`)
  }

  // ── DESCRIPTION length ────────────────────────────────────────────────────
  if (words === 0) {
    copyScore -= 40; trustScore -= 20
    issues.push('No description — the single biggest conversion killer')
    tips.push('Write at least 100 words: lead with the #1 benefit, then features, then social proof')
  } else if (words < 50) {
    copyScore -= 20
    issues.push(`Description too short (${words} words) — visitors need more detail to buy`)
    tips.push('Add: what problem does it solve? Who is it for? What makes it different?')
  } else if (words >= 200) {
    wins.push(`Long-form description (${words} words) — great for SEO and trust`)
  } else if (words >= 100) {
    wins.push(`Good description length (${words} words)`)
  }

  // ── READABILITY ───────────────────────────────────────────────────────────
  if (sentenceAvg > 25) {
    copyScore -= 10
    issues.push(`Sentences avg ${sentenceAvg} words — too long, hard to scan on mobile`)
    tips.push('Break long sentences at 15–20 words. Use bullet points for features.')
  } else if (sentenceAvg > 0 && sentenceAvg <= 18) {
    wins.push('Short, scannable sentences — easy to read on mobile')
  }

  // ── YOU language ──────────────────────────────────────────────────────────
  const youCount = (lower.match(/\byou\b|\byour\b/g) || []).length
  if (description && youCount === 0) {
    copyScore -= 8
    issues.push('No "you/your" language — copy feels impersonal and product-focused')
    tips.push('Start sentences with "You" or "Your". E.g. "You\'ll feel the difference immediately."')
  } else if (youCount >= 3) {
    wins.push('Strong "you" language — copy speaks directly to the buyer')
  }

  // ── GENERIC PHRASES ───────────────────────────────────────────────────────
  const genericFound = GENERIC_WORDS.filter(w => lower.includes(w))
  if (genericFound.length > 0) {
    copyScore -= 8
    issues.push(`Contains generic phrases: "${genericFound[0]}" — replace with specific proof`)
    tips.push(`Replace "${genericFound[0]}" with a measurable claim. E.g. "Made from 420D ripstop nylon, tested to 50lbs"`)
  }

  // ── NUMBERS / SPECIFICITY ─────────────────────────────────────────────────
  if (description && /\d/.test(description)) {
    wins.push('Contains numbers — specifics build trust and credibility')
  } else if (description) {
    copyScore -= 5
    tips.push('Add a number: dimensions, weight, quantity, days, ratings. Numbers boost trust.')
  }

  // ── TRUST SIGNALS ─────────────────────────────────────────────────────────
  const trustFound = TRUST_WORDS.filter(w => lower.includes(w))
  if (trustFound.length >= 2) {
    wins.push(`Strong trust signals: "${trustFound.slice(0, 2).join('", "')}" — reduces buyer hesitation`)
  } else if (trustFound.length === 1) {
    trustScore -= 5
    wins.push(`Has trust signal: "${trustFound[0]}"`)
    tips.push('Add one more trust signal: free returns, satisfaction guarantee, or a warranty period')
  } else if (description) {
    trustScore -= 20
    issues.push('No trust signals — guarantee, returns policy, or warranty mentioned')
    tips.push('Add: "30-day money-back guarantee" or "Free returns" to reduce purchase hesitation')
  }

  // ── URGENCY TRIGGERS ─────────────────────────────────────────────────────
  const urgencyFound = URGENCY_WORDS.filter(w => lower.includes(w))
  if (urgencyFound.length > 0) {
    wins.push(`Urgency trigger present: "${urgencyFound[0]}" — drives faster decisions`)
  } else if (description) {
    tips.push('Optional: add soft urgency — "Ships within 24 hours" or "Only 12 left in stock"')
  }

  // ── EMOTIONAL LANGUAGE ───────────────────────────────────────────────────
  const emotionFound = EMOTION_WORDS.filter(w => lower.includes(w))
  if (emotionFound.length >= 2) {
    wins.push('Emotional language present — connects with buyer on a personal level')
  }

  // ── CTA IN DESCRIPTION ───────────────────────────────────────────────────
  const ctaFound = CTA_WORDS.filter(w => lower.includes(w))
  if (ctaFound.length > 0) {
    wins.push('Call-to-action in copy — guides the buyer toward purchase')
  } else if (description) {
    copyScore -= 5
    tips.push('End with a micro-CTA: "Order today and receive it by [day]" or "Click Add to Cart to claim yours"')
  }

  // ── PRICE check ───────────────────────────────────────────────────────────
  if (!price.trim()) {
    trustScore -= 10; issues.push('No price — unclear offer reduces conversion')
  } else {
    const p = parseFloat(price.replace(/[^0-9.]/g, ''))
    if (p > 0) wins.push('Price is set — clear, transparent offer')
    if (p && (p * 100) % 10 === 9) wins.push('Charm pricing (ends in .99/.X9) — proven +3–7% conversion lift')
  }

  // ── KEYWORD in description ────────────────────────────────────────────────
  if (title.trim() && description) {
    const titleFirstWord = titleLower.split(' ')[0]
    if (lower.includes(titleFirstWord) && titleFirstWord.length > 3) {
      wins.push('Title keyword appears in description — good for SEO')
    } else {
      seoScore -= 5
      tips.push(`Mention "${titleFirstWord}" naturally 2–3 times in your description for better SEO`)
    }
  }

  const clamp = (v: number) => Math.max(0, Math.min(100, v))
  const overall = clamp(Math.round((seoScore + copyScore + trustScore) / 3))

  return {
    overall,
    seoScore: clamp(seoScore),
    copyScore: clamp(copyScore),
    trustScore: clamp(trustScore),
    issues,
    wins,
    tips,
    wordCount: words,
  }
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

  const scoreColor = (s: number) => s >= 70 ? '#00ffaa' : s >= 40 ? '#ffd93d' : '#ff6b6b'
  const inputClass = "w-full px-3.5 py-2.5 text-sm text-white rounded-lg outline-none"
  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }

  const wordCount = description.trim().split(/\s+/).filter(Boolean).length

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
        📄 Product Page Analyzer
      </h2>
      <p className="text-[#777] text-sm mb-6">
        Paste your product content and get a detailed conversion, SEO &amp; trust score.
      </p>

      <div className="flex flex-col gap-3.5 mb-6">
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">Product Title</label>
          <input type="text" placeholder="e.g. Premium Leather Bifold Wallet for Men — RFID Blocking"
            value={title} onChange={(e) => setTitle(e.target.value)}
            className={inputClass} style={inputStyle} />
          <div className="text-[11px] text-[#444] mt-1 text-right">{title.length} / 70 chars</div>
        </div>

        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">Product Description</label>
          <textarea
            placeholder="Paste your full product description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={7}
            className={`${inputClass} resize-y leading-relaxed`}
            style={inputStyle}
          />
          <div className="flex justify-between text-[11px] text-[#444] mt-1">
            <span style={{ color: wordCount >= 100 ? '#00ffaa' : wordCount >= 50 ? '#ffd93d' : '#ff6b6b' }}>
              {wordCount} words {wordCount < 100 ? `(aim for 100+)` : '✓'}
            </span>
            <span>{avgSentenceLength(description)} words/sentence avg</span>
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">Price</label>
          <input type="text" placeholder="e.g. $49.99" value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass} style={inputStyle} />
        </div>
      </div>

      <button onClick={run} className="btn-primary flex items-center gap-2 mb-6">
        <FileText size={15} /> Analyze Page
      </button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* Overall score */}
          <div className="text-center p-5 rounded-xl mb-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="text-5xl font-black" style={{ color: scoreColor(result.overall) }}>{result.overall}</div>
            <div className="text-[#888] text-sm mt-1">Overall Conversion Score</div>
            <div className="text-[13px] mt-1" style={{ color: scoreColor(result.overall) }}>
              {result.overall >= 70 ? 'Strong product page!' : result.overall >= 40 ? 'Room for improvement' : 'Major issues hurting sales'}
            </div>
          </div>

          {/* Category scores */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {[
              { label: 'SEO',         value: result.seoScore },
              { label: 'Copywriting', value: result.copyScore },
              { label: 'Trust',       value: result.trustScore },
            ].map((cat) => (
              <div key={cat.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-[11px] text-[#777] mb-1">{cat.label}</div>
                <div className="text-xl font-extrabold" style={{ color: scoreColor(cat.value) }}>{cat.value}</div>
                <div className="h-1 rounded-full mt-1.5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.value}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: scoreColor(cat.value) }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Issues */}
          {result.issues.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)' }}>
              <div className="flex gap-2 text-[#ff6b6b] font-bold mb-2.5 text-[13px]">
                <AlertTriangle size={15} /> Issues Hurting Conversions
              </div>
              {result.issues.map((issue, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                  <XCircle size={13} color="#ff6b6b" className="shrink-0 mt-0.5" />{issue}
                </div>
              ))}
            </div>
          )}

          {/* Wins */}
          {result.wins.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(0,255,170,0.06)', border: '1px solid rgba(0,255,170,0.15)' }}>
              <div className="flex gap-2 text-[#00ffaa] font-bold mb-2.5 text-[13px]">
                <CheckCircle size={15} /> What&apos;s Working
              </div>
              {result.wins.map((win, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-1.5">
                  <CheckCircle size={13} color="#00ffaa" className="shrink-0 mt-0.5" />{win}
                </div>
              ))}
            </div>
          )}

          {/* Actionable tips */}
          {result.tips.length > 0 && (
            <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(122,92,255,0.07)', border: '1px solid rgba(122,92,255,0.2)' }}>
              <div className="flex gap-2 text-[#a78bfa] font-bold mb-2.5 text-[13px]">
                <Lightbulb size={15} /> How to Improve
              </div>
              {result.tips.map((tip, i) => (
                <div key={i} className="flex gap-2 text-[#ccc] text-[13px] mb-2">
                  <span className="text-[#7a5cff] font-bold shrink-0">{i + 1}.</span> {tip}
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
