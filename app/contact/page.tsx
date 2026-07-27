'use client'

import { useState, type FormEvent, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// ── Meta Pixel helper ────────────────────────────
// The base pixel script is loaded in app/layout.tsx (lazyOnload). This just
// safely calls it if it's ready — if the pixel script hasn't finished
// loading yet (rare, since it's lazy), we skip rather than throw.
declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

function trackLead(contentName: string) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: contentName })
  }
}

// ── Icons ────────────────────────────────────────
function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}
function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}
function IconFiverr() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-1.4c.04-.55.24-.85.73-.85.45 0 .71.29.71.85zM21.474 13c-.97 0-1.65.69-1.65 1.73 0 1.09.67 1.73 1.77 1.73.49 0 .97-.13 1.3-.35l-.28-.63c-.26.15-.56.24-.9.24-.57 0-.87-.26-.91-.77h2.19c.01-.08.02-.2.02-.29 0-1.04-.6-1.66-1.54-1.66zm-2.53 3.39c-.17.08-.35.12-.54.12-.37 0-.57-.21-.57-.61v-1.44h1.09v-.73h-1.09v-.91h-.88v.91h-.63v.73h.63v1.5c0 .78.42 1.19 1.17 1.19.3 0 .6-.07.82-.19zm-3.08-3.32h-.88v3.38h.88zm-3.23 2.82c-.46 0-.75-.37-.75-.9s.29-.9.75-.9c.27 0 .51.11.69.3l.56-.59c-.28-.3-.69-.47-1.13-.47-.97 0-1.63.67-1.63 1.66 0 .99.66 1.66 1.63 1.66.44 0 .85-.17 1.13-.47l-.56-.59c-.18.19-.42.3-.69.3zm-2.7-2.82h-.88v3.38h.88zm-1.96 0h-.95l-.76 2.28-.76-2.28h-.97l1.22 3.38h1.01zm-4.09 1.58c0-.5.38-.81.93-.81.28 0 .54.06.77.18v-.74a2.1 2.1 0 0 0-.9-.19c-.97 0-1.66.59-1.66 1.56s.69 1.56 1.66 1.56c.33 0 .64-.07.9-.19v-.73c-.23.12-.49.18-.77.18-.55 0-.93-.31-.93-.82zm-1.96-1.58H.5v3.38h.88v-1.24h.53c.76 0 1.26-.44 1.26-1.07 0-.63-.5-1.07-1.26-1.07zm-.09 1.44H1.38v-.74h.53c.25 0 .4.14.4.37 0 .23-.15.37-.4.37z"/>
    </svg>
  )
}
function IconPayoneer() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.996 0C5.372 0 0 5.372 0 11.996S5.372 24 11.996 24 24 18.628 24 11.996 18.628 0 11.996 0zM9.875 16.09H7.81V8.044h2.066v8.047zm4.274 0h-2.065V8.044h2.065v8.047zm4.266 0H16.35V8.044h2.065v8.047z"/>
    </svg>
  )
}
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function IconSend() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  )
}

// ── Input classes ────────────────────────────────
const inputCls =
  'w-full rounded-lg border border-cyan-400/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all'

const selectCls =
  'w-full rounded-lg border border-cyan-400/15 bg-[#0d1220] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-widest text-cyan-400/70 mb-1.5">
      {children}
    </label>
  )
}

function ContactPageInner() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const isSpeedAudit = searchParams.get('service') === 'speed-audit'
  // Arrive here from the "Fix My Website" / "Send Report to Us" buttons on
  // the speed report page — domain + a score/opportunity summary come
  // pre-filled so the visitor only has to add name/email and hit submit.
  const prefilledDomain = searchParams.get('domain') || ''
  const prefilledReport = searchParams.get('report') || ''
  const prefilledPdfUrl = searchParams.get('pdfUrl') || ''

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.target as HTMLFormElement
    const data = new FormData(form)

    // The /api/orders route + `orders` table don't have a dedicated
    // websiteType column, so we fold the selection into the message field
    // (rather than silently dropping it) — this avoids a DB migration while
    // still making sure the owner sees which type of site was requested.
    const websiteType = String(data.get('websiteType') || '').trim()
    const rawMessage = String(data.get('message') || '').trim()
    const message = websiteType
      ? `Website Type: ${websiteType}${rawMessage ? `\n\n${rawMessage}` : ''}`
      : rawMessage || null

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          domain: data.get('domain') || null,
          platform: data.get('platform') || null,
          package: data.get('package') || null,
          payment: data.get('payment') || null,
          message,
          pdfUrl: prefilledPdfUrl || null,
          website: data.get('website') || '', // honeypot — real users never fill this
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong. Please try again.')
      }

      // Fire Meta Pixel Lead event now that the order is confirmed saved.
      // Distinguish speed-audit leads from general build leads so Ads
      // Manager can eventually report on them separately if needed.
      trackLead(isSpeedAudit ? 'Speed Audit Contact Form' : 'General Contact Form')

      setSent(true)
      form.reset()
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 pt-28">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400 mb-4">
            ONE-TIME BUILD FEE • NO SUBSCRIPTION TO US
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Get Your Custom Store Built
          </h1>
          <p className="text-xl text-white/90 max-w-lg mx-auto">
            Professional ecommerce website in 3–10 days.<br />
            <span className="text-cyan-400 font-semibold">Starting from $399</span>
          </p>
        </div>

        {/* Urgency Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-full border border-cyan-400/20 text-sm">
            🚀 Live in 3-10 days
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-full border border-emerald-400/20 text-sm">
            💰 One-Time Payment Only
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-full border border-white/20 text-sm">
            ⭐ 5000+ Happy Store Owners
          </div>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Form */}
          <div className="lg:col-span-3 rounded-2xl border border-cyan-400/10 bg-white/[0.03] backdrop-blur-sm p-7">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  We&apos;ve received your submission and will reply to your email shortly.
                </p>

                {/* Fiverr push — placed right in the confirmation so people
                    who just submitted the form see it immediately, instead
                    of only finding it in the sidebar. This is the actual
                    payment/order step since Fiverr handles escrow. */}
                <a
                  href="https://www.fiverr.com/s/6YvgzVA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 text-sm"
                >
                  Place Your Order on Fiverr →
                </a>
                <p className="text-xs text-gray-500 max-w-xs">
                  Secure escrow payment · Buyer protection · Fastest way to confirm your order
                </p>

                <button
                  onClick={() => setSent(false)}
                  className="mt-2 text-sm text-cyan-400 hover:underline"
                >
                  Submit another request →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — hidden from real users via CSS, bots that
                    auto-fill every field will trip it. Server checks this
                    in app/api/orders/route.ts. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                  aria-hidden="true"
                />
                {isSpeedAudit && (
                  <p className="text-sm text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-4 py-2.5">
                    ⚡ Requesting a <span className="font-semibold">Free Speed Audit</span> — we&apos;ve pre-selected it below.
                    {prefilledReport && ' Your PageSpeed report is attached below — just add your details and hit submit.'}
                    {prefilledPdfUrl && (
                      <>
                        {' '}
                        <a href={prefilledPdfUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-200">
                          View your PDF report
                        </a>
                        {' '}will be attached to this request.
                      </>
                    )}
                    {' '}Feel free to change it if you meant something else.
                  </p>
                )}
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Name *</Label>
                    <input name="name" required className={inputCls} placeholder="Your full name" />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <input name="email" type="email" required className={inputCls} placeholder="you@example.com" />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Desired Domain</Label>
                    <input name="domain" defaultValue={prefilledDomain} className={inputCls} placeholder="e.g. myshop.com" />
                  </div>
                  <div>
                    <Label>Current Platform</Label>
                    <select name="platform" className={selectCls}>
                      <option value="">Select...</option>
                      <option>Shopify</option>
                      <option>WordPress / WooCommerce</option>
                      <option>Wix / Squarespace</option>
                      <option>None (starting fresh)</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Website Type</Label>
                    <select name="websiteType" className={selectCls} defaultValue="">
                      <option value="">Select...</option>
                      <option>Ecommerce Store</option>
                      <option>Portfolio / Personal</option>
                      <option>Business / Corporate</option>
                      <option>SaaS / Startup Landing</option>
                      <option>Blog / Content Website</option>
                      <option>Custom Website</option>
                    </select>
                  </div>
                  <div>
                    <Label>Package *</Label>
                    <select
                      name="package"
                      className={selectCls}
                      required
                      defaultValue={isSpeedAudit ? 'Website Speed Optimization — Free Audit' : ''}
                    >
                      <option value="">Select Package...</option>
                      <option>Launch — from $399</option>
                      <option>Growth — from $799</option>
                      <option>Scale — from $1,499</option>
                      <option>Website Speed Optimization — Free Audit</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Payment Method</Label>
                    <select name="payment" className={selectCls}>
                      <option value="">Select...</option>
                      <option>Payoneer</option>
                      <option>Fiverr</option>
                      <option>Other / Not sure</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Label>Message / Project Details</Label>
                  <textarea
                    name="message"
                    rows={4}
                    className={inputCls}
                    defaultValue={prefilledReport}
                    placeholder="Tell us about your products, target audience, or any special requirements..."
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                    ⚠ {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-10 py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 text-base"
                >
                  <IconSend />
                  {loading ? 'Submitting...' : 'Submit Details'}
                </button>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  ⚡ Most clients get a reply within minutes • Professional Service
                </p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 px-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400">
                🌍 Available worldwide
              </span>
              <span className="text-xs text-gray-500">Serving USA, UK, UAE &amp; globally</span>
            </div>

            <a
              href="mailto:info@makemystore.online"
              className="group flex items-center gap-4 rounded-2xl border border-cyan-400/10 bg-white/[0.03] hover:border-cyan-400/30 hover:bg-cyan-400/5 p-5 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                <IconMail />
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors text-sm">Email Us</p>
                <p className="text-xs text-gray-400">info@makemystore.online</p>
                <p className="text-xs text-gray-500 mt-0.5">We&apos;ll get back to you shortly</p>
              </div>
            </a>

            <a
              href="https://wa.me/923293943161"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-emerald-400/10 bg-white/[0.03] hover:border-emerald-400/30 hover:bg-emerald-400/5 p-5 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <IconWhatsApp />
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-emerald-400 transition-colors text-sm">WhatsApp Us</p>
                <p className="text-xs text-gray-400">+92 329 394 3161</p>
                <p className="text-xs text-gray-500 mt-0.5">Chat now · Fast replies ⚡</p>
              </div>
            </a>

            <a
              href="https://www.fiverr.com/s/6YvgzVA"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-green-400/10 bg-white/[0.03] hover:border-green-400/30 hover:bg-green-400/5 p-5 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
                <IconFiverr />
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-green-400 transition-colors text-sm">Order on Fiverr</p>
                <p className="text-xs text-gray-400">fiverr.com/s/6YvgzVA</p>
                <p className="text-xs text-gray-500 mt-0.5">Secure escrow payment</p>
              </div>
            </a>

            <a
              href="https://www.makemystore.online/pricing#plans"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-orange-400/10 bg-white/[0.03] hover:border-orange-400/30 hover:bg-orange-400/5 p-5 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                <IconPayoneer />
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-orange-400 transition-colors text-sm">Pay via Payoneer</p>
                <p className="text-xs text-gray-400">View pricing plans</p>
                <p className="text-xs text-gray-500 mt-0.5">Payment after demo review</p>
              </div>
            </a>

            <div className="rounded-2xl border border-cyan-400/10 bg-white/[0.03] p-5">
              <p className="font-semibold text-white text-sm mb-3">Every Order Includes:</p>
              <ul className="space-y-2">
                {[
                  'Full source code ownership',
                  'Free domain setup guidance',
                  'Deployed to any hosting you choose',
                  'Google Analytics setup',
                  'Basic SEO configuration',
                  '7-day post-delivery support',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-emerald-400 shrink-0"><IconCheck /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  )
}
