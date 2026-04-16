'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, Sparkles, ExternalLink, Zap, Shield, Clock } from 'lucide-react'
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
    'Full source code ownership',
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
    'Full source code ownership',
  ],
  Scale: [
    'Everything in Growth',
    'Custom integrations & APIs',
    'Advanced analytics dashboard',
    'Performance optimization',
    'Custom UI/UX system',
    'Priority support (30 days)',
    'Scalable architecture',
  ],
}

const getFeatures = (planName: string): string[] => PLAN_FEATURES[planName] ?? []

// ─── JSON-LD structured data helpers ─────────────────────────────────────────
function buildJsonLd(plans: MergedPlan[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MakeMyStore Pricing Plans',
    description: 'One-time payment ecommerce website plans — no monthly fees.',
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
          referenceQuantity: {
            '@type': 'QuantitativeValue',
            value: 1,
            unitCode: 'C62', // one-time
          },
        },
        seller: {
          '@type': 'Organization',
          name: 'MakeMyStore.online',
          url: 'https://www.makemystore.online',
        },
        availability: 'https://schema.org/InStock',
        url: `https://www.makemystore.online/pricing`,
      },
    })),
  }
}

// ─── Trust badges ─────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: Shield, label: 'Buyer Protection', sub: 'via Fiverr escrow' },
  { icon: Zap,    label: 'Fast Delivery',    sub: '3–10 business days' },
  { icon: Clock,  label: 'No Subscriptions', sub: 'Pay once, own forever' },
]

// ─── FAQ data ─────────────────────────────────────────────────────────────────
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
    a: 'We deploy to Vercel + Supabase free tiers, which handle most stores at zero cost. You own and control those accounts.',
  },
  {
    q: 'What if I need something not on the list?',
    a: 'Use the "Need custom features?" button on any card to reach us. We quote custom work separately.',
  },
]

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl p-7 border border-white/10 bg-white/[0.03] animate-pulse">
      <div className="h-5 bg-white/10 rounded mb-3 w-1/3" />
      <div className="h-3 bg-white/10 rounded mb-5 w-2/3" />
      <div className="h-10 bg-white/10 rounded mb-6 w-1/2" />
      {[1, 2, 3, 4, 5].map((j) => (
        <div key={j} className="h-3 bg-white/10 rounded mb-3" />
      ))}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [plans, setPlans]     = useState<MergedPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: pricingData, error: pricingError } = await supabase
          .from('pricing_plans')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true })

        if (pricingError) throw pricingError

        const { data: linksData, error: linksError } = await supabase
          .from('payment_links')
          .select('plan_name, payoneer_link')

        if (linksError) throw linksError

        const linkMap: Record<string, string> = {}
        ;(linksData as PaymentLink[]).forEach((l) => {
          linkMap[l.plan_name] = l.payoneer_link
        })

        const merged: MergedPlan[] = (pricingData as PricingPlan[]).map((plan) => ({
          ...plan,
          payoneerLink: linkMap[plan.name] ?? null,
          features: getFeatures(plan.name),
        }))

        setPlans(merged)
      } catch (err) {
        console.error('Failed to load pricing:', err)
        setError('Failed to load pricing. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {/* ── JSON-LD ── */}
      {plans.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(plans)) }}
        />
      )}

      <Navbar />

      <main className="min-h-screen bg-[#0b0f1a] text-white">

        {/* ── HERO SECTION ── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-start justify-center"
          >
            <div className="w-[700px] h-[400px] rounded-full bg-[#00d4ff]/[0.06] blur-[120px] -translate-y-1/2" />
          </div>

          {/* Subtle grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/[0.07] text-[#00d4ff] text-xs font-semibold mb-6 tracking-wide">
              <Sparkles size={12} />
              One-time payment · No subscriptions ever
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Own Your Ecommerce Store{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #00d4ff 0%, #7b61ff 100%)',
                }}
              >
                — No Monthly Fees Ever
              </span>
            </h1>

            <p className="text-white/55 text-lg max-w-xl mx-auto mb-8">
              Built from scratch. Fully yours. No Shopify, no Wix, no limitations.
            </p>

            {/* Value comparison pill */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.04] text-sm">
              <span className="text-white/45 line-through">
                $29–$299/month on other platforms
              </span>
              <span className="hidden sm:block text-white/25">→</span>
              <span className="text-[#00d4ff] font-semibold">
                Pay once. Own everything.
              </span>
            </div>
          </div>
        </section>

        {/* ── TRUST BADGES ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-16">
          <div className="grid grid-cols-3 gap-4">
            {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl border border-white/8 bg-white/[0.03] text-center"
              >
                <Icon size={18} className="text-[#00d4ff]" />
                <p className="text-xs font-semibold text-white leading-tight">{label}</p>
                <p className="text-[10px] text-white/40 leading-tight">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PLAN CARDS ── */}
        <section id="plans" className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-400">{error}</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, i) => {
                const isPopular = plan.is_popular
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl flex flex-col transition-all duration-300
                      ${isPopular
                        ? 'border border-[#00d4ff]/40 bg-[#00d4ff]/[0.04] shadow-[0_0_40px_rgba(0,212,255,0.08)]'
                        : 'border border-white/10 bg-white/[0.03] hover:border-white/20'
                      }`}
                    style={{
                      animationDelay: `${i * 80}ms`,
                    }}
                  >
                    {/* Popular badge */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-[#00d4ff] text-[#0b0f1a] text-[11px] font-bold tracking-wide whitespace-nowrap">
                        <Sparkles size={11} />
                        Most Popular
                      </div>
                    )}

                    <div className="p-7 flex flex-col flex-1">
                      {/* Plan name */}
                      <h2
                        className="text-xl font-bold text-white mb-1"
                        style={{ fontFamily: 'Syne, sans-serif' }}
                      >
                        {plan.name}
                      </h2>

                      {/* Description */}
                      {plan.description && (
                        <p className="text-xs font-medium text-[#00d4ff] mb-4 tracking-wide uppercase">
                          {plan.description}
                        </p>
                      )}

                      {/* Price */}
                      <div className="flex items-end gap-1.5 mb-1">
                        <span className="text-5xl font-black text-white leading-none">
                          ${plan.price.toLocaleString()}
                        </span>
                        <span className="text-white/35 text-sm mb-1.5">one-time</span>
                      </div>

                      <p className="text-[11px] text-white/35 mb-1">
                        Full ownership · No monthly fees
                      </p>

                      {/* Delivery */}
                      {plan.delivery && (
                        <div className="inline-flex items-center gap-1.5 mt-2 mb-6 px-2.5 py-1 rounded-md bg-[#00d4ff]/[0.07] border border-[#00d4ff]/15 text-[11px] text-[#00d4ff] font-medium w-fit">
                          <Clock size={10} />
                          Delivery: {plan.delivery}
                        </div>
                      )}

                      {/* Divider */}
                      <div className="h-px bg-white/8 mb-6" />

                      {/* Features */}
                      <ul className="space-y-2.5 flex-1 mb-8">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                            <Check
                              size={14}
                              className={`mt-0.5 shrink-0 ${isPopular ? 'text-[#00d4ff]' : 'text-white/40'}`}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>

                      {/* CTAs */}
                      <div className="mt-auto space-y-3">
                        <p className="text-[10px] text-white/30 text-center uppercase tracking-widest font-semibold">
                          Choose Payment Method
                        </p>

                        {/* Payoneer */}
                        {plan.payoneerLink && (
                          <a
                            href={plan.payoneerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/[0.04] transition-all duration-200"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-full bg-[#FF4800]/15 flex items-center justify-center shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" fill="#FF4800" opacity="0.9" />
                                  <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-white leading-none">Payoneer</p>
                                <p className="text-[11px] text-white/40 mt-0.5">Direct secure transfer</p>
                              </div>
                            </div>
                            <ExternalLink size={12} className="text-white/25 group-hover:text-[#00d4ff] transition-colors shrink-0" />
                          </a>
                        )}

                        {/* or divider */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-px bg-white/8" />
                          <span className="text-[10px] text-white/25">or</span>
                          <div className="flex-1 h-px bg-white/8" />
                        </div>

                        {/* Fiverr */}
                        <a
                          href="https://www.fiverr.com/s/ZmjDE2Q"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-green-500/25 bg-green-500/[0.04] hover:border-green-400/50 hover:bg-green-500/[0.08] transition-all duration-200"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="#22c55e" opacity="0.85" />
                                <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="text-sm font-semibold text-white leading-none">Fiverr</p>
                                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">
                                  Buyer Protected
                                </span>
                              </div>
                              <p className="text-[11px] text-white/40 mt-0.5">Payment held until delivered</p>
                            </div>
                          </div>
                          <ExternalLink size={12} className="text-green-500/40 group-hover:text-green-400 transition-colors shrink-0" />
                        </a>

                        {/* Contact CTA */}
                        <Link
                          href="/contact"
                          className="block w-full py-2.5 rounded-xl border border-dashed border-white/15 hover:border-[#00d4ff]/35 text-sm text-white/35 hover:text-[#00d4ff] transition-all duration-200 text-center"
                        >
                          Need custom features?{' '}
                          <span className="font-semibold">Contact us →</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Trust line */}
          <p className="text-center text-xs text-white/30 mt-10">
            Not sure? View demo stores or request a preview before ordering.
          </p>
        </section>

        {/* ── COMPARISON STRIP ── */}
        <section className="border-y border-white/8 bg-white/[0.02] py-12 mb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Why not Shopify?
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-6 text-white/40 font-medium">Feature</th>
                    <th className="py-3 px-4 text-[#00d4ff] font-semibold">MakeMyStore</th>
                    <th className="py-3 px-4 text-white/30 font-medium">Shopify</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Monthly cost',        'Free forever',    '$29–$299/mo'],
                    ['Code ownership',      '✓ Full',          '✗ None'],
                    ['Platform lock-in',    '✓ Zero',          '✗ Total'],
                    ['Custom design',       '✓ Pixel-perfect', '✗ Theme limited'],
                    ['Transaction fees',    '✓ None',          '✗ 0.5–2%'],
                    ['Source code access',  '✓ Yes',           '✗ No'],
                  ].map(([feature, us, them], i) => (
                    <tr
                      key={feature}
                      className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}
                    >
                      <td className="py-3 pr-6 text-white/55 text-left">{feature}</td>
                      <td className="py-3 px-4 text-center text-[#00d4ff] font-medium">{us}</td>
                      <td className="py-3 px-4 text-center text-white/30">{them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
          <h2
            className="text-2xl font-bold text-center mb-10"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white/85 hover:text-white transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={`text-[#00d4ff] transition-transform duration-200 shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed border-t border-white/8 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="pb-28 px-4">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-white/40 text-sm mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="btn-primary inline-block"
              style={{ padding: '12px 32px', fontSize: '0.95rem' }}
            >
              Talk to us before ordering →
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
