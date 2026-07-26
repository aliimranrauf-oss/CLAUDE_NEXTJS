'use client'

// app/website-speed-optimization/PageSpeedInsightsTool.tsx
// Real Google PageSpeed Insights lead-magnet tool. Lives in the hero section
// of the Speed Optimization page — visitor pastes a URL, clicks Check My
// Speed, and the full REAL Lighthouse + CrUX field-data report opens in a
// new tab (app/website-speed-optimization/report), where they can copy it
// or save it as a PDF. This card itself just captures the URL/strategy and
// opens that tab — it doesn't run the check or hold results itself.

import { useState } from 'react'
import { Search, Gauge, Smartphone, Monitor, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function PageSpeedInsightsTool() {
  const [url, setUrl] = useState('')
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile')
  const [inputError, setInputError] = useState<string | null>(null)

  const run = () => {
    const trimmed = url.trim()
    if (!trimmed) {
      setInputError('Enter a URL first — e.g. yourstore.com')
      return
    }
    setInputError(null)

    // window.open must fire synchronously inside the click handler (no
    // await before it) so browsers treat it as a direct user action and
    // don't block it as a popup.
    const reportUrl = `/website-speed-optimization/report?url=${encodeURIComponent(trimmed)}&strategy=${strategy}`
    window.open(reportUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="w-full mx-auto max-w-xl lg:max-w-none">
      <div
        className="rounded-2xl p-5 sm:p-7"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Gauge size={18} color="#00d4ff" />
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
            Free Google PageSpeed Insights Check
          </h2>
        </div>
        <p className="text-[#999] text-sm mb-5">
          Paste your URL for a real, live report — the exact same Lighthouse + Chrome UX data Google itself uses to judge your site. Opens in a new tab, no sign-up required.
        </p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                if (inputError) setInputError(null)
              }}
              onKeyDown={(e) => e.key === 'Enter' && run()}
              placeholder="yourstore.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-[#555] focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>
          <button
            onClick={run}
            className="btn-primary flex items-center justify-center gap-2 px-6 py-3 shrink-0"
          >
            <Gauge size={15} />
            Check My Speed
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

        {/* Input error */}
        {inputError && (
          <div className="mt-4 flex items-start gap-2 rounded-xl p-3.5 text-sm" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.25)', color: '#ff9b9b' }}>
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            {inputError}
          </div>
        )}

        {/* What you'll see — compact inline strip */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              'Performance, Accessibility, Best Practices & SEO scores',
              'Core Web Vitals: LCP, CLS, TBT, FCP & Speed Index',
              'Real visitor field data from Chrome (28-day average)',
              'Top opportunities to fix, ranked by impact',
            ].map((t) => (
              <div key={t} className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-[#00d4ff] shrink-0 mt-0.5" />
                <span className="text-white/60 text-[11px] leading-relaxed">{t}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-white/35 mt-3">
            Powered by Google Lighthouse &amp; PageSpeed Insights. Opens in a new tab &mdash; no sign-up, no email required.
          </p>
        </div>
      </div>
    </div>
  )
}
