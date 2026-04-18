'use client'

import { useEffect, useState, useCallback, memo } from 'react'
import { Check, Sparkles, ExternalLink, Zap, Shield, Clock, Info } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ─── Types ────────────────────────────────────────────────────────────────────
interface PricingPlan {
  id: string
  name: string
  price: number
  delivery: string | null
  description: string | null
  is_popular: boolean
  is_active: boolean
  created_at: string
}

interface PaymentLink {
  plan_name: string
  payoneer_link: string
}

interface MergedPlan extends PricingPlan {
  payoneerLink: string | null
  features: string[]
}

// ─── Static feature lists ─────────────────────────────────────────────────────
const PLAN_FEATURES: Record<string, string[]> = {
  Launch: [
    '1 product store',
    'Cart + checkout',
    'Stripe or PayPal integration',
    'Mobile-optimized design',
    'Basic SEO setup',
    'Vercel + Supabase deployment',
    'Google Analytics setup',
    'Full Source Code Ownership',
  ],
  Growth: [
    'Unlimited products & categories',
    'Admin dashboard',
    'Product reviews & ratings',
    'Advanced SEO + sitemap',
    'Google Search Console setup',
    'Cloudflare protection',
    'Email notifications',
    'Analytics + tracking',
    'Full Source Code Ownership',
  ],
  Scale: [
    'Everything in Growth',
    'Custom integrations & APIs',
    'Advanced analytics dashboard',
    'Performance optimization',
    'Custom UI/UX system',
    'Priority support (30 days)',
    'Scalable architecture',
    'Full Source Code Ownership',
  ],
}

const BOLD_FEATURES = new Set(['Full Source Code Ownership'])
const getFeatures = (planName: string): string[] => PLAN_FEATURES[planName] ?? []

// ─── WhatsApp helper ──────────────────────────────────────────────────────────
// ⚠️  Replace 923XXXXXXXXX with your real number (no + sign, no spaces)
const WA_NUMBER = '923293943161'
function getWhatsAppLink(planName: string) {
  const msg = encodeURIComponent(
    `Hi Imran, I'm interested in the ${planName} package. Can you help me set up my store ownership?`
  )
  return `https://wa.me/${WA_NUMBER}?text=${msg}`
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
function buildJsonLd(plans: MergedPlan[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MakeMyStore Pricing Plans',
    description: 'One-time payment ecommerce website plans — no monthly fees. Shopify alternative.',
    url: 'https://www.makemystore.online/pricing',
    itemListElement: plans.map((plan, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Offer',
        name: plan.name,
        description: plan.description ?? `${plan.name} ecommerce store plan`,
        price: plan.price,
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: plan.price,
          priceCurrency: 'USD',
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'C62' },
        },
        seller: {
          '@type': 'Organization',
          name: 'MakeMyStore.online',
          url: 'https://www.makemystore.online',
        },
        availability: 'https://schema.org/InStock',
        url: 'https://www.makemystore.online/pricing',
      },
    })),
  }
}

// ─── Static data ──────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: Shield, label: 'Buyer Protection', sub: 'via Fiverr escrow' },
  { icon: Zap,    label: 'Fast Delivery',    sub: '3–10 business days' },
  { icon: Clock,  label: 'No Subscriptions', sub: 'Pay once, own forever' },
] as const

const COMPARISON_ROWS: [string, string, string][] = [
  ['Monthly cost',        'Platform Fee: $0/mo',       '$29–$299/mo'],
  ['Code ownership',      '✓ Full',                    '✗ None'],
  ['Platform lock-in',    '✓ Zero',                    '✗ Total'],
  ['Custom design',       '✓ Pixel-perfect',           '✗ Theme limited'],
  ['Transaction fees',    '✓ None',                    '✗ 0.5–2%'],
  ['Source code access',  '✓ Yes',                     '✗ No'],
  ['Hosting & Database',  'Your Account (Free Tiers)', 'Proprietary/Paid'],
]

const FAQS = [
  {
    q: 'Do I really own the code?',
    a: 'Yes — 100%. You receive the full Next.js source code, deploy it anywhere, and owe us nothing more.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Payoneer (direct transfer) and Fiverr (buyer-protected escrow). Both are listed on each plan card.',
  },
  {
    q: 'Can I upgrade from Launch to Growth later?',
    a: 'Absolutely. Pay the difference and we rebuild/extend your existing store.',
  },
  {
    q: 'Is hosting included?',
    a: 'We handle the entire setup for you! We deploy the store to your personal Vercel and Supabase accounts so you have 100% control and ownership. These platforms have generous Free Tiers that cover most businesses at $0/mo. You only manage your domain name (~$10/year) directly with your provider.',
  },
  {
    q: 'Can you migrate my existing Shopify or Wix store?',
    a: 'Yes! We offer seamless migration from Shopify and Wix. Your products, content, and SEO are preserved. You stop paying monthly platform fees and gain full ownership of your store.',
  },
  {
    q: 'What if I need something not on the list?',
    a: 'Use the "Chat with us" button on any card to reach us on WhatsApp. We quote custom work separately.',
  },
]

// ─── Memoized sub-components ──────────────────────────────────────────────────
const SkeletonCard = memo(function SkeletonCard() {
  return (
    <div className="rounded-2xl p-6 sm:p-7 border border-white/10 bg-white/[0.03] animate-pulse">
      <div className="h-5 bg-white/10 rounded mb-3 w-1/3" />
      <div className="h-3 bg-white/10 rounded mb-5 w-2/3" />
      <div className="h-10 bg-white/10 rounded mb-6 w-1/2" />
      {[1, 2, 3, 4, 5].map((j) => <div key={j} className="h-3 bg-white/10 rounded mb-3" />)}
    </div>
  )
})

const WaIcon = memo(function WaIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
})

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [plans, setPlans]     = useState<MergedPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = useCallback(
    (i: number) => setOpenFaq((prev) => (prev === i ? null : i)),
    []
  )

  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      try {
        // Parallel fetch — cuts waterfall latency in half
        const [{ data: pricingData, error: pErr }, { data: linksData, error: lErr }] =
          await Promise.all([
            supabase.from('pricing_plans').select('*').eq('is_active', true).order('price', { ascending: true }),
            supabase.from('payment_links').select('plan_name, payoneer_link'),
          ])

        if (pErr) throw pErr
        if (lErr) throw lErr
        if (cancelled) return

        const linkMap: Record<string, string> = {}
        ;(linksData as PaymentLink[]).forEach((l) => { linkMap[l.plan_name] = l.payoneer_link })

        setPlans(
          (pricingData as PricingPlan[]).map((plan) => ({
            ...plan,
            payoneerLink: linkMap[plan.name] ?? null,
            features: getFeatures(plan.name),
          }))
        )
      } catch (err) {
        console.error('Failed to load pricing:', err)
        if (!cancelled) setError('Failed to load pricing. Please try again.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [])

  return (
    <>
      {plans.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(plans)) }}
        />
      )}

      <Navbar />

      <main className="min-h-screen bg-[#0b0f1a] text-white">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-28 sm:pt-32 pb-14 sm:pb-16 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-start justify-center">
            <div className="w-[min(700px,100vw)] h-[400px] rounded-full bg-[#00d4ff]/[0.06] blur-[120px] -translate-y-1/2" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#00d4ff 1px,transparent 1px),linear-gradient(90deg,#00d4ff 1px,transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/[0.07] text-[#00d4ff] text-xs font-semibold mb-5 tracking-wide">
              <Sparkles size={12} aria-hidden />
              One-time payment · No subscriptions ever
            </div>

            {/* H1 targets "Shopify Alternative" keyword */}
            <h1
              className="text-[clamp(1.9rem,5.5vw,3.75rem)] font-bold mb-5 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              The Best Shopify Alternative —{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg,#00d4ff 0%,#7b61ff 100%)' }}
              >
                Zero Monthly Fees, Ever
              </span>
            </h1>

            <p
              className="text-white/55 text-base sm:text-lg max-w-xl mx-auto mb-3"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Stop paying Shopify monthly rent. Own your Next.js store outright — full source code,
              $0 platform fees, 100/100 Google PageSpeed.
            </p>

            <p className="text-[#00d4ff]/70 text-sm mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              ✦ Seamless migration from Shopify &amp; Wix available
            </p>

            <div className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.04] text-sm">
              <span className="text-white/45 line-through" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                $29–$299/month on Shopify
              </span>
              <span className="hidden sm:block text-white/25">→</span>
              <span className="text-[#00d4ff] font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                Pay once. Own everything.
              </span>
            </div>
          </div>
        </section>

        {/* ── TRUST BADGES ─────────────────────────────────────────────────── */}
        <section aria-label="Trust signals" className="max-w-3xl mx-auto px-4 sm:px-6 mb-14 sm:mb-16">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 py-3 sm:py-4 px-2 sm:px-3 rounded-xl border border-white/8 bg-white/[0.03] text-center"
              >
                <Icon size={18} className="text-[#00d4ff]" aria-hidden />
                <p className="text-[11px] sm:text-xs font-semibold text-white leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>{label}</p>
                <p className="text-[9px] sm:text-[10px] text-white/40 leading-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PLAN CARDS ───────────────────────────────────────────────────── */}
        <section id="plans" aria-label="Pricing plans" className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
          {loading ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-400" role="alert">{error}</div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
              {plans.map((plan, i) => {
                const isPopular = plan.is_popular
                return (
                  <article
                    key={plan.id}
                    aria-label={`${plan.name} plan`}
                    className={`relative rounded-2xl flex flex-col transition-all duration-300
                      ${isPopular
                        ? 'border border-[#00d4ff]/40 bg-[#00d4ff]/[0.04] shadow-[0_0_40px_rgba(0,212,255,0.08)]'
                        : 'border border-white/10 bg-white/[0.03] hover:border-white/20'
                      }`}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-[#00d4ff] text-[#0b0f1a] text-[11px] font-bold tracking-wide whitespace-nowrap z-10">
                        <Sparkles size={11} aria-hidden />
                        Most Popular
                      </div>
                    )}

                    <div className="p-5 sm:p-7 flex flex-col flex-1">
                      <h2 className="text-lg sm:text-xl font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {plan.name}
                      </h2>

                      {plan.description && (
                        <p className="text-xs font-medium text-[#00d4ff] mb-4 tracking-wide uppercase" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          {plan.description}
                        </p>
                      )}

                      <div className="flex items-end gap-1.5 mb-1">
                        <span className="text-4xl sm:text-5xl font-black text-white leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>
                          ${plan.price.toLocaleString()}
                        </span>
                        <span className="text-white/35 text-sm mb-1.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>one-time</span>
                      </div>

                      {/* No monthly fees + tooltip */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <p className="text-[11px] text-white/35" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          Full ownership · No monthly fees
                        </p>
                        <div className="group relative shrink-0">
                          <Info size={11} className="text-white/25 cursor-help hover:text-[#00d4ff] transition-colors" />
                          <div
                            role="tooltip"
                            className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-[#1a2035] border border-white/15 rounded-lg px-3 py-2.5 text-[11px] text-white/65 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 shadow-xl"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                          >
                            Stores are deployed to your personal Vercel/Supabase accounts. You only pay for your domain renewal (~$10/yr).
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a2035]" />
                          </div>
                        </div>
                      </div>

                      {plan.delivery && (
                        <div className="inline-flex items-center gap-1.5 mt-2 mb-5 sm:mb-6 px-2.5 py-1 rounded-md bg-[#00d4ff]/[0.07] border border-[#00d4ff]/15 text-[11px] text-[#00d4ff] font-medium w-fit" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          <Clock size={10} aria-hidden />
                          Delivery: {plan.delivery}
                        </div>
                      )}

                      <div className="h-px bg-white/8 mb-5 sm:mb-6" />

                      <ul className="space-y-2.5 flex-1 mb-7 sm:mb-8">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                            <Check size={14} className={`mt-0.5 shrink-0 ${isPopular ? 'text-[#00d4ff]' : 'text-white/40'}`} aria-hidden />
                            {BOLD_FEATURES.has(f)
                              ? <span className="font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{f}</span>
                              : <span style={{ fontFamily: 'DM Sans, sans-serif' }}>{f}</span>
                            }
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto space-y-3">
                        <p className="text-[10px] text-white/30 text-center uppercase tracking-widest font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          Choose Payment Method
                        </p>

                        {plan.payoneerLink && (
                          <a
                            href={plan.payoneerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/[0.04] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-full bg-[#FF4800]/15 flex items-center justify-center shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                                  <circle cx="12" cy="12" r="10" fill="#FF4800" opacity="0.9" />
                                  <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-white leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>Payoneer</p>
                                <p className="text-[11px] text-white/40 mt-0.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>Direct secure transfer</p>
                              </div>
                            </div>
                            <ExternalLink size={12} className="text-white/25 group-hover:text-[#00d4ff] transition-colors shrink-0" aria-hidden />
                          </a>
                        )}

                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-px bg-white/8" />
                          <span className="text-[10px] text-white/25" style={{ fontFamily: 'DM Sans, sans-serif' }}>or</span>
                          <div className="flex-1 h-px bg-white/8" />
                        </div>

                        <a
                          href="https://www.fiverr.com/s/ZmjDE2Q"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-green-500/25 bg-green-500/[0.04] hover:border-green-400/50 hover:bg-green-500/[0.08] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="#22c55e" opacity="0.85" />
                                <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="text-sm font-semibold text-white leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>Fiverr</p>
                                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">Buyer Protected</span>
                              </div>
                              <p className="text-[11px] text-white/40 mt-0.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>Payment held until delivered</p>
                            </div>
                          </div>
                          <ExternalLink size={12} className="text-green-500/40 group-hover:text-green-400 transition-colors shrink-0" aria-hidden />
                        </a>

                        <a
                          href={getWhatsAppLink(plan.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-dashed border-white/15 hover:border-[#25D366]/40 text-sm text-white/35 hover:text-[#25D366] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                        >
                          <WaIcon />
                          <span style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            Need custom features? <span className="font-semibold">Chat with us →</span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          <p className="text-center text-xs text-white/30 mt-8 sm:mt-10" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Not sure? View demo stores or request a preview before ordering.
          </p>
        </section>

        {/* ── COMPARISON TABLE ─────────────────────────────────────────────── */}
        <section aria-label="MakeMyStore vs Shopify" className="border-y border-white/8 bg-white/[0.02] py-10 sm:py-12 mb-16 sm:mb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              Why choose us over Shopify?
            </h2>
            <p className="text-white/40 text-sm mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Stop paying monthly rent. Own your store permanently.
            </p>
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-sm min-w-[300px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-4 text-white/40 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>Feature</th>
                    <th className="py-3 px-3 sm:px-4 text-[#00d4ff] font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>MakeMyStore</th>
                    <th className="py-3 px-3 sm:px-4 text-white/30 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>Shopify</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map(([feature, us, them], i) => (
                    <tr key={feature} className={`border-b border-white/5 ${i % 2 !== 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="py-3 pr-4 text-white/55 text-left text-xs sm:text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>{feature}</td>
                      <td className="py-3 px-3 sm:px-4 text-center text-[#00d4ff] font-medium text-xs sm:text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>{us}</td>
                      <td className="py-3 px-3 sm:px-4 text-center text-white/30 text-xs sm:text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>{them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section aria-label="FAQ" className="max-w-2xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-10" style={{ fontFamily: 'Syne, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-2.5 sm:space-y-3">
            {FAQS.map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 sm:py-4 text-left text-sm font-semibold text-white/85 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-inset"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                  onClick={() => toggleFaq(i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span className={`text-[#00d4ff] transition-transform duration-200 shrink-0 text-lg leading-none ${openFaq === i ? 'rotate-45' : ''}`} aria-hidden>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-4 sm:px-5 pb-4 text-sm text-white/50 leading-relaxed border-t border-white/8 pt-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── PERFORMANCE BADGE ────────────────────────────────────────────── */}
        <section aria-label="Performance" className="max-w-3xl mx-auto px-4 sm:px-6 pb-14 sm:pb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 rounded-2xl border border-[#00d4ff]/15 bg-[#00d4ff]/[0.03]">
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#00d4ff] bg-[#00d4ff]/10">
                <span className="text-[10px] font-black text-[#00d4ff]" style={{ fontFamily: 'Syne, sans-serif' }}>100</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <Zap size={16} className="text-[#7a5cff]" aria-hidden />
            </div>
            <p className="text-xs text-white/50 text-center sm:text-left" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="text-white/80 font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                Powered by the MakeMyStore Engine: Next.js + Supabase.
              </span>{' '}
              Built for 100/100 Google PageSpeed scores and instant SEO ranking.
            </p>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
        <section className="pb-24 sm:pb-28 px-4">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-white/40 text-sm mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Still have questions? Chat directly on WhatsApp.
            </p>
            <a
              href={getWhatsAppLink('Custom')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
              style={{
                padding: '12px 32px',
                fontSize: '0.95rem',
                fontFamily: 'Syne, sans-serif',
                background: 'linear-gradient(135deg,#00d4ff 0%,#7a5cff 100%)',
                borderRadius: '0.75rem',
                color: '#0b0f1a',
                boxShadow: '0 4px 20px rgba(0,212,255,0.25)',
                textDecoration: 'none',
              }}
            >
              <WaIcon />
              Talk to us before ordering →
            </a>
          </div>
        </section>

      </main>

      {/* Hidden crawler content */}
      <div className="sr-only">
        <h2>Shopify Migration Service</h2>
        <p>
          MakeMyStore offers seamless Shopify and Wix migration to custom Next.js ecommerce stores.
          One-time payment, zero platform fees, full source code ownership. Stop paying monthly rent.
          Custom ecommerce developer available in UAE, Pakistan, and worldwide.
        </p>
      </div>

      <Footer />
    </>
  )
}
