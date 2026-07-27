'use client'

// app/website-speed-optimization/report/ReportView.tsx
// Full-page PageSpeed Insights report. Opened in a new tab from the free
// tool on the main speed-optimization page (?url=...&strategy=mobile|desktop).
// Runs the real check itself via /api/pagespeed, then lets the visitor copy
// the report as text or save it as a PDF (browser print → Save as PDF),
// before heading back to or closing the tab.

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import jsPDF from 'jspdf'
import {
  AlertTriangle, CheckCircle2, Gauge, Copy, Check, Users, FlaskConical,
  ArrowLeft, X, Download, Smartphone, Monitor, Wrench, ArrowRight, Send,
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
          <circle
            cx="32" cy="32" r="26" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={score == null ? circumference : offset}
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

export default function ReportView() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = (searchParams.get('url') || '').trim()

  // Strategy is now switchable on this page (not just fixed by the query
  // param that opened the tab), so it lives in state, seeded from the URL.
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>(
    searchParams.get('strategy') === 'desktop' ? 'desktop' : 'mobile'
  )

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PSIResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    if (!url) {
      setLoading(false)
      setError('No URL was provided. Close this tab and run the check again from the speed tool.')
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)
    setProgress(1)

    // Simulated progress — Google's API doesn't report real progress, so this
    // climbs quickly at first and eases off the further it gets. It used to
    // hard-stop at 92% and sit there for the rest of a long scan, which made
    // people think the tool had frozen and refresh/leave mid-check. Instead
    // it now keeps creeping upward in tiny increments all the way to 99%, no
    // matter how long Google's API takes — so there's always visible motion
    // — and only jumps to 100% once the real response actually lands.
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 99) return p
        const step =
          p < 40 ? 6 + Math.random() * 6 :
          p < 75 ? 2 + Math.random() * 3 :
          p < 92 ? 0.4 + Math.random() * 0.8 :
          p < 97 ? 0.12 + Math.random() * 0.18 :
          0.02 + Math.random() * 0.05
        return Math.min(99, p + step)
      })
    }, 300)

    fetch(`/api/pagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}`)
      .then(async (res) => {
        const data = await res.json()
        if (cancelled) return
        if (!res.ok) {
          setError(data?.error || 'Could not analyze that URL. Please try again.')
          return
        }
        setResult(data)
        trackToolUsage('pagespeed-insights', { url: data.url, strategy }, { scores: data.scores })
      })
      .catch(() => {
        if (!cancelled) setError('Something went wrong reaching Google PageSpeed Insights. Please try again.')
      })
      .finally(() => {
        clearInterval(progressTimer)
        if (cancelled) return
        setProgress(100)
        // Brief pause so the bar visibly reaches 100% before switching to results.
        setTimeout(() => {
          if (!cancelled) setLoading(false)
        }, 350)
      })

    return () => {
      cancelled = true
      clearInterval(progressTimer)
    }
  }, [url, strategy])

  const switchStrategy = (next: 'mobile' | 'desktop') => {
    if (next === strategy || loading) return
    setStrategy(next)
    // Keep the URL's ?strategy= in sync so refresh/share/back-button all
    // reflect whichever device is currently showing.
    const params = new URLSearchParams(searchParams.toString())
    params.set('strategy', next)
    router.replace(`?${params.toString()}`, { scroll: false })
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

  // Builds the report PDF and returns the jsPDF doc + a filesystem-safe
  // name — used both for the local "Download PDF" button and for the
  // "Send Report to Us" upload flow, so the two never drift out of sync.
  const buildPdf = () => {
    if (!result) return null

    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageWidth = 210
    const pageHeight = 297
    const margin = 18
    const contentWidth = pageWidth - margin * 2
    let y = 20

    const BRAND = '#0072a8' // darker, print-safe version of the site's #00d4ff accent
    const TEXT = '#1a1a1a'
    const MUTED = '#6b6b6b'
    const BORDER = '#dddddd'

    const scoreColorPdf = (score: number | null) => {
      if (score == null) return MUTED
      if (score >= 90) return '#0a8f5c'
      if (score >= 50) return '#b8860b'
      return '#c0392b'
    }

    const addFooter = () => {
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(MUTED)
        doc.text('makemystore.online/website-speed-optimization', margin, pageHeight - 10)
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 10, { align: 'right' })
      }
    }

    const ensureSpace = (needed: number) => {
      if (y + needed > pageHeight - 20) {
        doc.addPage()
        y = 20
      }
    }

    const sectionLabel = (text: string, color = BRAND) => {
      ensureSpace(10)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(color)
      doc.text(text, margin, y)
      y += 6
      doc.setDrawColor(BORDER)
      doc.line(margin, y, pageWidth - margin, y)
      y += 6
    }

    // ── Header ──────────────────────────────────────────────
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(TEXT)
    doc.text('PageSpeed Insights Report', margin, y)
    y += 8

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(MUTED)
    doc.text(`${result.url}  ·  ${strategy}  ·  ${new Date().toLocaleDateString()}`, margin, y)
    y += 10

    // ── Category scores ─────────────────────────────────────
    sectionLabel('Overall Scores')
    const scoreItems: { label: string; score: number | null }[] = [
      { label: 'Performance', score: result.scores.performance },
      { label: 'Accessibility', score: result.scores.accessibility },
      { label: 'Best Practices', score: result.scores.bestPractices },
      { label: 'SEO', score: result.scores.seo },
    ]
    const boxW = (contentWidth - 3 * 4) / 4
    const boxH = 22
    scoreItems.forEach((item, i) => {
      const x = margin + i * (boxW + 4)
      doc.setDrawColor(BORDER)
      doc.setFillColor('#f7f7f7')
      doc.roundedRect(x, y, boxW, boxH, 2, 2, 'FD')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(16)
      doc.setTextColor(scoreColorPdf(item.score))
      doc.text(String(item.score ?? '–'), x + boxW / 2, y + 12, { align: 'center' })
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(MUTED)
      doc.text(item.label, x + boxW / 2, y + 18, { align: 'center' })
    })
    y += boxH + 10

    // ── Field data ───────────────────────────────────────────
    sectionLabel('In the Field — Real Visitors (28-day Chrome average)', '#6b4fbf')
    if (result.field) {
      const fieldItems = [
        { label: 'LCP', v: result.field.lcp, unit: 'ms', metric: 'lcp' as const },
        { label: 'INP', v: result.field.inp, unit: 'ms', metric: 'inp' as const },
        { label: 'CLS', v: result.field.cls, unit: '', metric: 'cls' as const },
        { label: 'FCP', v: result.field.fcp, unit: 'ms', metric: 'fcp' as const },
      ]
      const fBoxW = (contentWidth - 3 * 4) / 4
      fieldItems.forEach((f, i) => {
        const x = margin + i * (fBoxW + 4)
        const pass = fieldPass(f.metric, f.v)
        const display = f.v != null ? `${f.metric === 'cls' ? f.v.toFixed(2) : Math.round(f.v)}${f.unit}` : 'No data'
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(MUTED)
        doc.text(f.label, x, y)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        doc.setTextColor(pass == null ? MUTED : pass ? '#0a8f5c' : '#c0392b')
        doc.text(display, x, y + 6)
      })
      y += 16
    } else {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(MUTED)
      const lines = doc.splitTextToSize(
        "Google doesn't have enough real-visitor traffic recorded for this URL yet (needs meaningful Chrome traffic over 28 days). The lab results below are a precise, controlled measurement instead.",
        contentWidth
      )
      doc.text(lines, margin, y)
      y += lines.length * 5 + 4
    }
    y += 6

    // ── Lab data ─────────────────────────────────────────────
    sectionLabel('Lab Data — Simulated Single Load')
    const labItems = [
      { label: 'Largest Contentful Paint (LCP)', m: result.lab.lcp },
      { label: 'Cumulative Layout Shift (CLS)', m: result.lab.cls },
      { label: 'Total Blocking Time (TBT)', m: result.lab.tbt },
      { label: 'First Contentful Paint (FCP)', m: result.lab.fcp },
      { label: 'Speed Index', m: result.lab.speedIndex },
      { label: 'Server Response Time (TTFB)', m: result.lab.ttfb },
    ]
    const colW = contentWidth / 2
    labItems.forEach((row, i) => {
      const col = i % 2
      const rowIdx = Math.floor(i / 2)
      if (col === 0) ensureSpace(14)
      const x = margin + col * colW
      const rowY = y + rowIdx * 14
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(MUTED)
      doc.text(row.label, x, rowY)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(scoreColorPdf(row.m?.score != null ? row.m.score * 100 : null))
      doc.text(row.m?.displayValue ?? '–', x, rowY + 6)
    })
    y += Math.ceil(labItems.length / 2) * 14 + 6

    // ── Opportunities ────────────────────────────────────────
    if (result.opportunities.length > 0) {
      sectionLabel('Top Opportunities to Fix')
      doc.setFontSize(9)
      result.opportunities.forEach((o) => {
        const text = `•  ${o.title}${o.displayValue ? `  (${o.displayValue})` : ''}`
        const lines = doc.splitTextToSize(text, contentWidth)
        ensureSpace(lines.length * 5 + 2)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(TEXT)
        doc.text(lines, margin, y)
        y += lines.length * 5 + 2
      })
      y += 4
    }

    // ── Closing note ─────────────────────────────────────────
    if (perf != null && perf >= 90) {
      ensureSpace(14)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor('#0a8f5c')
      doc.text('Great score! We can help you maintain and monitor it.', margin, y)
      y += 10
    } else if (isSlow) {
      ensureSpace(16)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(TEXT)
      const lines = doc.splitTextToSize(
        'A performance score under 70 is usually costing you conversions and Google ranking. I fix exactly this — every Core Web Vital, tested one change at a time.',
        contentWidth
      )
      doc.text(lines, margin, y)
      y += lines.length * 5 + 4
    }

    addFooter()

    const safeName = result.url.replace(/^https?:\/\//, '').replace(/[^a-z0-9.-]+/gi, '-').toLowerCase()
    return { doc, safeName }
  }

  const downloadPdf = () => {
    const built = buildPdf()
    if (!built) return
    built.doc.save(`pagespeed-report-${built.safeName}-${strategy}.pdf`)
  }

  // Builds the pre-filled /contact link used by both the big "Fix My
  // Website" CTA and the "Send Report to Us" button. It carries the
  // domain + a compact score/opportunity summary so the contact form
  // arrives already filled in — the visitor just adds name/email and
  // hits submit, and we get a warm lead with full context attached.
  // `pdfUrl`, when present, is the Supabase Storage link to the PDF that
  // was just uploaded — it rides along so the order saved in Supabase
  // has the actual report file attached, not just a text summary.
  const contactUrl = (pdfUrl?: string | null) => {
    if (!result) return '/contact?service=speed-audit'
    const domain = result.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
    const summary = [
      `Website Speed Report — ${result.url} (${strategy})`,
      `Scores — Performance: ${result.scores.performance ?? '–'}/100, Accessibility: ${result.scores.accessibility ?? '–'}/100, Best Practices: ${result.scores.bestPractices ?? '–'}/100, SEO: ${result.scores.seo ?? '–'}/100`,
      `Core Web Vitals — LCP: ${result.lab.lcp.displayValue ?? '–'}, CLS: ${result.lab.cls.displayValue ?? '–'}, TBT: ${result.lab.tbt.displayValue ?? '–'}, FCP: ${result.lab.fcp.displayValue ?? '–'}`,
      result.opportunities.length
        ? `Top issues found: ${result.opportunities.slice(0, 3).map((o) => o.title).join('; ')}`
        : '',
      '',
      'I ran the free speed check and would like the free advanced audit + a fix quote.',
    ].filter(Boolean).join('\n')

    const params = new URLSearchParams({ service: 'speed-audit', domain, report: summary })
    if (pdfUrl) params.set('pdfUrl', pdfUrl)
    return `/contact?${params.toString()}`
  }

  const [sendingReport, setSendingReport] = useState(false)

  // "Send Report to Us" — builds the PDF, gives the visitor their own local
  // copy, uploads the same PDF to Supabase Storage via /api/upload-report,
  // then takes them to the contact form with the stored PDF link + score
  // summary already filled in. They just add name/email and hit submit —
  // that's the lead, now with the actual report file attached to it.
  const sendReportToUs = async () => {
    if (!result || sendingReport) return
    const built = buildPdf()
    if (!built) return

    setSendingReport(true)
    const { doc, safeName } = built
    const filename = `pagespeed-report-${safeName}-${strategy}.pdf`

    // Let the visitor keep their own copy too — unchanged from before.
    doc.save(filename)

    let pdfUrl: string | null = null
    try {
      const dataUri = doc.output('datauristring')
      const base64 = dataUri.split(',')[1] || ''
      const res = await fetch('/api/upload-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, base64 }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.url) pdfUrl = data.url
    } catch {
      // Upload failed (e.g. offline) — still send them to the contact form
      // with the text summary; it just won't have a stored PDF link.
    }

    setSendingReport(false)
    router.push(contactUrl(pdfUrl))
  }

  const closeTab = () => {
    // Only works if this tab was opened by script (which it was, via
    // window.open from the tool) — browsers silently ignore it otherwise,
    // so the "Back to site" link next to it always covers that case.
    window.close()
  }

  const perf = result?.scores.performance ?? null
  const isSlow = perf != null && perf < 70

  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white px-4 sm:px-6 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Top bar — hidden when printing/saving as PDF */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link href="/website-speed-optimization" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={15} />
            Back to site
          </Link>
          <button onClick={closeTab} className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors">
            <X size={15} />
            Close tab
          </button>
        </div>

        <div
          className="rounded-2xl p-5 sm:p-7"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Gauge size={18} color="#00d4ff" />
            <h1 className="text-lg sm:text-xl font-extrabold" style={{ fontFamily: 'Syne, sans-serif' }}>
              PageSpeed Insights Report
            </h1>
          </div>
          <p className="text-[#999] text-sm mb-4 truncate">
            {url ? (
              <>Results for <span className="text-[#ccc]">{url}</span></>
            ) : (
              'No URL provided'
            )}
          </p>

          {/* Device switcher — re-runs the check for the other strategy without leaving this page */}
          {url && (
            <div
              className="inline-flex items-center gap-0.5 p-1 rounded-lg mb-6 print:hidden"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {(
                [
                  { key: 'mobile' as const, label: 'Mobile', Icon: Smartphone },
                  { key: 'desktop' as const, label: 'Desktop', Icon: Monitor },
                ]
              ).map(({ key, label, Icon }) => {
                const active = strategy === key
                return (
                  <button
                    key={key}
                    onClick={() => switchStrategy(key)}
                    disabled={loading}
                    className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-md transition-colors disabled:cursor-not-allowed"
                    style={{
                      background: active ? 'rgba(0,212,255,0.15)' : 'transparent',
                      color: active ? '#00d4ff' : loading ? '#555' : '#999',
                    }}
                  >
                    <Icon size={13} />
                    {label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="py-12">
              <div className="text-center mb-4">
                <span className="text-xs font-bold tracking-[0.2em] text-white/50">CHECKING YOUR SITE</span>
              </div>
              <div
                className="w-full h-3.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-300 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #00d4ff, #00ffaa)',
                    boxShadow: '0 0 10px rgba(0,255,170,0.5)',
                  }}
                />
              </div>
              <div className="text-center mt-3 text-lg font-extrabold" style={{ color: '#00ffaa' }}>
                {progress >= 92 ? progress.toFixed(1) : Math.round(progress)}%
              </div>
              <p className="text-center text-white/40 text-xs mt-3">
                {progress >= 92
                  ? "Almost there — Google is finishing up the full audit. This step can take a little longer on larger or slower sites, but it's still running."
                  : 'Running Lighthouse + PageSpeed Insights\u2026 this can take up to a minute or two, especially for larger sites.'}
              </p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex items-start gap-2 rounded-xl p-3.5 text-sm" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.25)', color: '#ff9b9b' }}>
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <>
              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 mb-6 print:hidden">
                <button
                  onClick={copyReport}
                  className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: copied ? 'rgba(0,255,170,0.12)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${copied ? 'rgba(0,255,170,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    color: copied ? '#00ffaa' : '#aaa',
                  }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? 'Copied' : 'Copy Report'}
                </button>
                <button
                  onClick={downloadPdf}
                  className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-2 rounded-lg transition-colors"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff' }}
                >
                  <Download size={13} />
                  Download PDF
                </button>
                <button
                  onClick={sendReportToUs}
                  disabled={sendingReport}
                  className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-2 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.35)', color: '#ff9b9b' }}
                >
                  <Send size={13} />
                  {sendingReport ? 'Sending…' : 'Send Report to Us — Free Advanced Audit'}
                </button>
              </div>

              {/* Primary lead-magnet CTA — big and impossible to miss,
                  shown right as soon as the Lighthouse check finishes. */}
              <a
                href={contactUrl()}
                className="print:hidden flex items-center justify-center gap-2.5 w-full rounded-2xl px-6 py-5 mb-6 text-center font-extrabold text-white transition-transform hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff9b3d 100%)',
                  boxShadow: '0 8px 24px rgba(255,107,107,0.3)',
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '17px',
                }}
              >
                <Wrench size={20} />
                Fix My Website
                <ArrowRight size={18} />
              </a>
              <p className="print:hidden text-center text-[12px] text-white/40 -mt-4 mb-6">
                {isSlow
                  ? `Your Performance score is ${perf}/100 — that's likely costing you visitors and sales. We'll fix every issue above, one tested change at a time.`
                  : 'Want these numbers even better, or need help keeping them there? We handle it end-to-end.'}
              </p>

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

              <div className="print:hidden">
                <ToolCTA toolName="pagespeed-insights" />
              </div>
            </>
          )}
        </div>

        {/* Bottom bar — mirrors the top bar, hidden when printing */}
        <div className="flex items-center justify-center gap-6 mt-6 print:hidden">
          <Link href="/website-speed-optimization" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={14} />
            Back to site
          </Link>
          <button onClick={closeTab} className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
            <X size={14} />
            Close this tab
          </button>
        </div>
      </div>
    </main>
  )
}
