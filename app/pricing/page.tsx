'use client'

import { useEffect, useState, useCallback, useRef, useMemo, memo } from 'react'
import Link from 'next/link'
import { Check, Sparkles, ExternalLink, Zap, Shield, Clock, Info, ShoppingCart, Gauge, Rocket, ArrowRight } from 'lucide-react'
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
interface MergedPlan extends PricingPlan {
  features: string[]
  /** Final displayed price after the Website Type adjustment. Null = "Contact for Quote" (Custom Website). */
  displayPrice: number | null
  /** The raw, unmodified base price for this package (Launch/Growth/Scale), before any Website Type adjustment. */
  basePrice: number
}

// ─── Website Type selector ─────────────────────────────────────────────────────
// Same 3 packages (Launch/Growth/Scale) & same base prices — only the price
// adjustment and feature set change based on the type of website selected.
type WebsiteType = 'ecommerce' | 'portfolio' | 'business' | 'saas' | 'blog' | 'custom'

const WEBSITE_TYPES: { id: WebsiteType; label: string; adjustment: number | null }[] = [
  { id: 'portfolio', label: 'Portfolio / Personal',      adjustment: 0 },
  { id: 'business',  label: 'Business / Corporate',      adjustment: 0 },
  { id: 'blog',      label: 'Blog / Content Website',    adjustment: 0 },
  { id: 'ecommerce', label: 'Ecommerce Store',           adjustment: 200 },
  { id: 'saas',      label: 'SaaS / Startup Landing',    adjustment: 300 },
  { id: 'custom',    label: 'Custom Website',            adjustment: null },
]
const getWebsiteType = (id: WebsiteType) => WEBSITE_TYPES.find(t => t.id === id)!

// ─── Feature lists — vary by Website Type, same tier structure for all ────────
// Common features present in every package, every website type (per spec).
const COMMON_FEATURES = [
  'Mobile-optimized design',
  'SEO setup',
  'Google Analytics',
  'Deployment to client hosting (or free-tier Vercel + Supabase)',
  'Full Source Code Ownership',
  'No monthly fee from us',
]

const FEATURES_BY_TYPE: Record<WebsiteType, Record<string, string[]>> = {
  // Unchanged from the original Ecommerce feature set — do not alter.
  ecommerce: {
    Launch: [
      '1 product store',
      'Cart + checkout',
      'Stripe or PayPal integration',
      'Mobile-optimized design',
      'Basic SEO setup',
      'Deployed to your hosting (or free-tier Vercel + Supabase)',
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
  },
  portfolio: {
    Launch: [
      'Up to 5 pages',
      'About + project gallery',
      'Contact form',
      'Mobile-optimized design',
      'Basic SEO setup',
      'Deployed to your hosting (or free-tier Vercel + Supabase)',
      'Google Analytics setup',
      'Full Source Code Ownership',
    ],
    Growth: [
      'Unlimited pages & projects',
      'Blog / case-study section',
      'Testimonials section',
      'Advanced SEO + sitemap',
      'Google Search Console setup',
      'Cloudflare protection',
      'Contact form + email notifications',
      'Analytics + tracking',
      'Full Source Code Ownership',
    ],
    Scale: [
      'Everything in Growth',
      'Custom animations & interactions',
      'Advanced portfolio filtering',
      'Performance optimization',
      'Custom UI/UX system',
      'Priority support (30 days)',
      'Scalable architecture',
      'Full Source Code Ownership',
    ],
  },
  business: {
    Launch: [
      'Up to 5 pages (Home, About, Services, Contact)',
      'Team / staff section',
      'Contact form',
      'Mobile-optimized design',
      'Basic SEO setup',
      'Deployed to your hosting (or free-tier Vercel + Supabase)',
      'Google Analytics setup',
      'Full Source Code Ownership',
    ],
    Growth: [
      'Unlimited pages',
      'Service / product showcase',
      'Client testimonials & case studies',
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
  },
  saas: {
    Launch: [
      'High-converting landing page',
      'Feature / benefits sections',
      'Email capture / waitlist form',
      'Mobile-optimized design',
      'Basic SEO setup',
      'Deployed to your hosting (or free-tier Vercel + Supabase)',
      'Google Analytics setup',
      'Full Source Code Ownership',
    ],
    Growth: [
      'Multi-page site (pricing, features, docs)',
      'Pricing table component',
      'Signup / login flow (auth-ready)',
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
  },
  blog: {
    Launch: [
      'Up to 5 pages + blog',
      'Category & tag system',
      'Contact form',
      'Mobile-optimized design',
      'Basic SEO setup',
      'Deployed to your hosting (or free-tier Vercel + Supabase)',
      'Google Analytics setup',
      'Full Source Code Ownership',
    ],
    Growth: [
      'Unlimited posts & categories',
      'Author bios & comments-ready',
      'Newsletter signup',
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
  },
  custom: {
    Launch: ['Scope tailored to your exact requirements', ...COMMON_FEATURES],
    Growth: ['Scope tailored to your exact requirements', ...COMMON_FEATURES],
    Scale:  ['Scope tailored to your exact requirements', ...COMMON_FEATURES],
  },
}

const BOLD_FEATURES = new Set(['Full Source Code Ownership'])
const getFeatures = (type: WebsiteType, planName: string) => FEATURES_BY_TYPE[type]?.[planName] ?? []

// Portfolio / Personal pricing is pinned to match the /careers page packages
// (Portfolio Starter $149, Portfolio + ATS CV $249, Career Brand Package $399)
// instead of the generic base-price + adjustment formula used by the other
// website types.
const PORTFOLIO_PRICE_OVERRIDES: Record<string, number> = {
  Launch: 149,
  Growth: 249,
  Scale: 399,
}

// Compute the final price shown on a card for a given base plan + website type.
const getAdjustedPrice = (basePrice: number, type: WebsiteType, planName: string): number | null => {
  if (type === 'portfolio' && planName in PORTFOLIO_PRICE_OVERRIDES) {
    return PORTFOLIO_PRICE_OVERRIDES[planName]
  }
  const t = getWebsiteType(type)
  if (t.adjustment === null) return null // Custom Website → "Contact for Quote"
  return basePrice + t.adjustment
}

// ─── Order links — Website Building service ────────────────────────────────
// Single Fiverr gig used for all website-building orders (Portfolio, Business,
// Blog, Ecommerce, SaaS, Custom). Contact button routes to the on-site
// contact form instead of WhatsApp.
const FIVERR_GIG_LINK = 'https://www.fiverr.com/s/2KXW9P4'
const CONTACT_HREF = '/contact'

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
// Uses each package's base price (Launch/Growth/Scale) as the canonical listed
// price — Website Type adjustments are a session-only display change, not part
// of the canonical structured-data listing.
function buildJsonLd(plans: MergedPlan[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MakeMyStore Pricing Plans',
    description: 'One-time payment website plans — Shopify alternative, no monthly fees.',
    url: 'https://www.makemystore.online/pricing',
    itemListElement: plans.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Offer',
        name: p.name,
        price: p.basePrice,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'MakeMyStore.online' },
        url: 'https://www.makemystore.online/pricing',
      },
    })),
  }
}

// ─── Memoized Plan Card (already optimized) ───────────────────────────────────
const PlanCard = memo(({ plan, pop, websiteType }: { plan: MergedPlan; pop: boolean; websiteType: WebsiteType }) => {
  // Portfolio / Personal has no dedicated Fiverr gig — both CTAs go to Contact.
  const isPortfolio = websiteType === 'portfolio'
  return (
    <article
      aria-label={`${plan.name} plan`}
      className={`relative rounded-2xl flex flex-col transition-all duration-300
        ${pop
          ? 'border border-[#00d4ff]/35 bg-[#00d4ff]/[0.035] shadow-[0_0_50px_rgba(0,212,255,0.07)]'
          : 'border border-white/10 bg-white/[0.025] hover:border-white/18'
        }`}
    >
      {pop && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-[#00d4ff] text-[#0b0f1a] text-[11px] font-bold tracking-wider whitespace-nowrap z-10" style={{ fontFamily: 'Syne, sans-serif' }}>
          <Sparkles size={10} aria-hidden /> Most Popular
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h2
          className="text-[22px] font-bold text-white mb-0.5"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {plan.name}
        </h2>

        {plan.description && (
          <p
            className="text-[11px] font-semibold text-[#00d4ff] mb-4 tracking-widest uppercase"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {plan.description}
          </p>
        )}

        <div className="flex items-baseline gap-1 mb-1">
          {plan.displayPrice === null ? (
            <span
              className="text-[28px] sm:text-[32px] font-bold text-white leading-none"
              style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
            >
              Contact for Quote
            </span>
          ) : (
            <>
              <span
                className="text-[36px] sm:text-[42px] font-bold text-white leading-none"
                style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
              >
                ${plan.displayPrice.toLocaleString()}
              </span>
              <span
                className="text-white/30 text-sm ml-1"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                one-time
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[11px] text-white/35" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Full ownership · No monthly fee from us
          </span>
          <div className="group relative shrink-0">
            <Info size={10} className="text-white/20 cursor-help hover:text-[#00d4ff] transition-colors" />
            <div
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-[#161c2e] border border-white/12 rounded-xl px-3 py-2.5 text-[11px] text-white/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-2xl"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Deployed to whatever hosting you already have (Hostinger, GoDaddy, etc.) — or a free-tier host like Vercel + Supabase if you don&apos;t have one yet. Hosting/domain costs depend on your provider, not us.
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#161c2e]" />
            </div>
          </div>
        </div>

        {plan.delivery && (
          <div
            className="inline-flex items-center gap-1.5 mt-1 mb-5 px-2.5 py-1 rounded-lg bg-[#00d4ff]/[0.07] border border-[#00d4ff]/15 text-[11px] text-[#00d4ff] font-semibold w-fit"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <Clock size={10} aria-hidden />
            Delivery: {plan.delivery}
          </div>
        )}

        <div className="h-px bg-white/8 mb-5" />

        <ul className="space-y-2 flex-1 mb-6">
          {plan.features.map(f => (
            <li key={f} className="flex items-start gap-2 text-[13px]">
              <Check size={13} className={`mt-[2px] shrink-0 ${pop ? 'text-[#00d4ff]' : 'text-white/35'}`} aria-hidden />
              {BOLD_FEATURES.has(f)
                ? <span className="font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{f}</span>
                : <span className="text-white/70" style={{ fontFamily: 'DM Sans, sans-serif' }}>{f}</span>
              }
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-2.5">
          <a
            href={isPortfolio ? CONTACT_HREF : FIVERR_GIG_LINK}
            {...(isPortfolio ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            className="group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-green-500/20 bg-green-500/[0.03] hover:border-green-400/40 hover:bg-green-500/[0.06] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-green-500/12 flex items-center justify-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="#22c55e" opacity="0.85" />
                  <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-[13px] font-bold text-white leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>Order on Fiverr</p>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400">Buyer Protected</span>
                </div>
                <p className="text-[10px] text-white/35 mt-0.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>Held until delivered</p>
              </div>
            </div>
            <ExternalLink size={11} className="text-green-500/30 group-hover:text-green-400 transition-colors" aria-hidden />
          </a>

          <Link
            href={CONTACT_HREF}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#00d4ff]/25 hover:bg-[#00d4ff]/[0.04] text-[13px] font-bold text-white/70 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </article>
  )
})
PlanCard.displayName = 'PlanCard'

// ─── Memoized FAQ Item (new optimization for mobile TBT) ───────────────────────
const FaqItem = memo(({ item, index, isOpen, onToggle }: {
  item: { q: string; a: string }
  index: number
  isOpen: boolean
  onToggle: () => void
}) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.025] overflow-hidden">
    <button
      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-inset"
      style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px' }}
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span>{item.q}</span>
      <span
        className={`text-[#00d4ff] transition-transform duration-200 shrink-0 text-xl leading-none font-light ${isOpen ? 'rotate-45' : ''}`}
        aria-hidden
      >+</span>
    </button>
    {isOpen && (
      <div
        className="px-5 pb-4 pt-3 text-[13px] text-white/45 leading-relaxed border-t border-white/8"
        style={{ fontFamily: 'DM Sans, sans-serif' }}
      >
        {item.a}
      </div>
    )}
  </div>
))
FaqItem.displayName = 'FaqItem'

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonCard = memo(() => (
  <div className="rounded-2xl p-6 border border-white/10 bg-white/[0.03] animate-pulse">
    <div className="h-4 bg-white/10 rounded mb-3 w-1/3" />
    <div className="h-3 bg-white/10 rounded mb-5 w-2/3" />
    <div className="h-8 bg-white/10 rounded mb-6 w-1/2" />
    {[1,2,3,4].map(j => <div key={j} className="h-3 bg-white/10 rounded mb-3" />)}
  </div>
))
SkeletonCard.displayName = 'SkeletonCard'

// ─── Static data ──────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: Shield, label: 'Buyer Protection', sub: 'via Fiverr escrow' },
  { icon: Zap,    label: 'Fast Delivery',    sub: '3–10 business days' },
  { icon: Clock,  label: 'No Subscriptions', sub: 'Pay once, own forever' },
] as const

const COMPARISON_ROWS: [string, string, string][] = [
  ['Monthly cost',       'Platform Fee: $0/mo',       '$29–$299/mo'],
  ['Code ownership',     '✓ Full',                    '✗ None'],
  ['Platform lock-in',  '✓ Zero',                    '✗ Total'],
  ['Custom design',     '✓ Pixel-perfect',           '✗ Theme limited'],
  ['Transaction fees',  '✓ None',                    '✗ 0.5–2%'],
  ['Source code',       '✓ Yes',                     '✗ No'],
  ['Hosting & DB',      'Any host you choose',       'Proprietary/Paid'],
]

const FAQS = [
  { q: 'Do I really own the code?',
    a: 'Yes — 100%. You receive the full Next.js source code, deploy it anywhere, and owe us nothing more.' },
  { q: 'What payment methods do you accept?',
    a: 'All orders for website building go through Fiverr (buyer-protected escrow) — just hit "Order on Fiverr" on any plan.' },
  { q: 'Can I upgrade later?',
    a: 'Absolutely. Pay the difference and we rebuild/extend your existing store.' },
  { q: 'Is hosting included?',
    a: 'Our fee covers the build, not hosting. We deploy your finished store wherever you want — your existing hosting (Hostinger, GoDaddy, etc.), your own Supabase/backend account, or, if you don\'t have hosting yet, a free-tier setup on Vercel + Supabase that covers most small stores at $0/mo. Whatever host you use, you own the code and the account.' },
  { q: 'Can you migrate my Shopify or Wix store?',
    a: 'Yes! We offer seamless migration from Shopify and Wix. Your products, content, and SEO are preserved. You stop paying monthly platform fees and gain full ownership.' },
  { q: 'What if I need something custom?',
    a: 'Hit the "Contact Us" button on any card to reach us through our contact form. We quote custom work separately.' },
]

// ─── Other-services pricing (static — no fetch, zero extra network cost) ──────
// Previously /pricing only ever showed the Ecommerce plans pulled from
// Supabase; Speed Optimization and Space & Aerospace had no pricing visible
// here at all, even though both have their own dedicated pages with pricing.
// Rather than duplicating the full Fiverr/Contact order-flow wiring
// those pages already have (which would mean two sources of truth to keep in
// sync), these are lightweight summary cards mirroring the real numbers from
// each service's own page, with a "full details" link through to it.
type ServiceTab = 'ecommerce' | 'speed' | 'space'

const SERVICE_TABS: { id: ServiceTab; label: string; icon: typeof ShoppingCart }[] = [
  { id: 'ecommerce', label: 'Ecommerce Store', icon: ShoppingCart },
  { id: 'speed',     label: 'Website Speed',   icon: Gauge },
  { id: 'space',     label: 'Space & Aerospace', icon: Rocket },
]

// Mirrors app/website-speed-optimization/page.tsx `pricingPlans`
const SPEED_PLANS = [
  { name: 'Basic', price: '$299', tagline: 'Full optimization + report', highlighted: false },
  { name: 'Standard', price: '$699', tagline: 'Everything + lazy loading & caching setup', highlighted: true },
  { name: 'Premium', price: '$1,299', tagline: 'Complex & e-commerce sites + 30-day monitoring', highlighted: false },
] as const
const SPEED_DETAILS_HREF = '/website-speed-optimization#pricing'

// Mirrors components/space/SatelliteTrackerGig.tsx `tiers` — the only
// fixed-price starter packages the Space service currently has. Larger
// custom aerospace/satellite builds are scoped and quoted individually,
// which is called out explicitly rather than inventing a flat number.
const SPACE_PLANS = [
  { name: 'ISS Live Tracker', price: '$150', tagline: 'Real-time 3D tracker, 1 page', highlighted: false },
  { name: 'Full Satellite Network', price: '$320', tagline: '14,000+ satellites, advanced filters', highlighted: true },
  { name: 'Complete Platform + Source', price: '$700', tagline: 'Accounts, notifications, full source', highlighted: false },
] as const
const SPACE_DETAILS_HREF = '/space#order-tracker'

const MiniPlanCard = memo(({ plan, detailsHref }: {
  plan: { name: string; price: string; tagline: string; highlighted: boolean }
  detailsHref: string
}) => (
  <Link
    href={detailsHref}
    className={`group relative rounded-2xl p-6 flex flex-col border transition-all duration-300 ${
      plan.highlighted
        ? 'border-[#00d4ff]/35 bg-[#00d4ff]/[0.035]'
        : 'border-white/10 bg-white/[0.025] hover:border-white/18'
    }`}
  >
    {plan.highlighted && (
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-[#00d4ff] text-[#0b0f1a] text-[11px] font-bold tracking-wider whitespace-nowrap"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        <Sparkles size={10} aria-hidden /> Most Popular
      </span>
    )}
    <h3 className="text-[17px] font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.name}</h3>
    <div className="text-[32px] font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
      {plan.price}
    </div>
    <p className="text-[13px] text-white/50 mb-6 flex-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>{plan.tagline}</p>
    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#00d4ff] group-hover:gap-2.5 transition-all">
      Full details &amp; order <ArrowRight size={14} />
    </span>
  </Link>
))
MiniPlanCard.displayName = 'MiniPlanCard'

// ─── Page ─────────────────────────────────────────────────────────────────────
type RawPlan = PricingPlan

export default function PricingPage() {
  // Raw base plans (Launch/Growth/Scale) straight from Supabase — base prices
  // are untouched by the Website Type selector, exactly as before.
  const [rawPlans, setRawPlans] = useState<RawPlan[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [openFaq, setOpenFaq]   = useState<number | null>(null)
  // Which service's pricing is showing — defaults to Ecommerce so existing
  // behavior (Supabase-driven plans, JSON-LD, anchor scroll) is unchanged.
  const [activeService, setActiveService] = useState<ServiceTab>('ecommerce')
  // Website Type selector — defaults to "Ecommerce Store" to match this
  // page's original ecommerce-only behavior and copy.
  const [websiteType, setWebsiteType] = useState<WebsiteType>('ecommerce')

  const toggleFaq = useCallback((i: number) => {
    setOpenFaq(p => p === i ? null : i)
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data: pd, error: pe } = await supabase
          .from('pricing_plans')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true })
        if (pe) throw pe
        if (cancelled) return
        setRawPlans(pd as PricingPlan[])
      } catch (e) {
        if (!cancelled) setError('Failed to load pricing. Please refresh.')
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  // Merge the raw base plans with the currently selected Website Type —
  // recomputed instantly (no network request) whenever the type changes,
  // so switching types updates price + features with zero reload/flicker.
  const plans = useMemo<MergedPlan[]>(() => rawPlans.map(p => ({
    ...p,
    basePrice: p.price,
    displayPrice: getAdjustedPrice(p.price, websiteType, p.name),
    features: getFeatures(websiteType, p.name),
  })), [rawPlans, websiteType])

  // ── Anchor-scroll fix ────────────────────────────────────────────────────
  // If someone lands directly on /pricing#plans (e.g. from a "View Plans"
  // link elsewhere on the site), the browser tries to scroll to the anchor
  // BEFORE the plans have loaded from Supabase. Once the cards mount, the
  // page height changes and the native scroll position drifts off-target.
  // This re-scrolls to the #plans section once loading is finished.
  const scrolledRef = useRef(false)
  useEffect(() => {
    if (loading || scrolledRef.current) return
    if (typeof window === 'undefined') return
    if (window.location.hash !== '#plans') return

    scrolledRef.current = true
    // Wait a tick for the cards to actually paint before measuring position.
    requestAnimationFrame(() => {
      const el = document.getElementById('plans')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [loading])

  return (
    <>
      {plans.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(plans)) }} />
      )}

      <Navbar />

      <main className="min-h-screen bg-[#0b0f1a] text-white overflow-x-hidden">

        {/* HERO + TRUST BADGES — unchanged */}
        <section className="relative pt-28 pb-16 text-center overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#00d4ff]/[0.07] blur-[100px]" />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(#00d4ff 1px,transparent 1px),linear-gradient(90deg,#00d4ff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

          <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/[0.08] text-[#00d4ff] text-xs font-semibold mb-7 tracking-widest uppercase" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <Sparkles size={11} aria-hidden />
              One-time build fee · No subscription to us
            </div>

            <h1
              className="text-[36px] sm:text-[44px] md:text-[52px] font-bold leading-[1.15] tracking-tight mb-5"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Build Your Ecommerce Store
              <br />
              <span className="text-[#40e0ff]" style={{ WebkitTextFillColor: '#40e0ff' }}>
                One-Time Fee, Any Hosting
              </span>
            </h1>

            <p
              className="text-white/55 text-base sm:text-[17px] max-w-lg mx-auto mb-4 leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Stop paying Shopify monthly rent. Own your Next.js store outright —
              full source code, no recurring fee to us, deployed on the hosting you already have (or a free-tier host we set up for you).
            </p>

            <p className="text-[#00d4ff]/65 text-sm mb-8 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              ✦ Seamless migration from Shopify &amp; Wix available
            </p>

            <div
              className="inline-flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.04] text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <span className="text-white/40 line-through">$29–$299/month on Shopify</span>
              <span className="hidden sm:block text-white/20">→</span>
              <span className="text-[#00d4ff] font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Pay once. Own everything.</span>
            </div>
          </div>
        </section>

        <section aria-label="Trust signals" className="max-w-2xl mx-auto px-5 sm:px-6 mb-14">
          <div className="grid grid-cols-3 gap-3">
            {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl border border-white/8 bg-white/[0.025] text-center">
                <Icon size={17} className="text-[#00d4ff]" aria-hidden />
                <p className="text-xs font-bold text-white leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>{label}</p>
                <p className="text-[10px] text-white/40 leading-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICE TABS — lets visitors see pricing for all 3 services instead
            of only Ecommerce. Switching tabs is a local state change (no
            network request) so it's instant on any connection. */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8">
          <div
            role="tablist"
            aria-label="Choose a service"
            className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl border border-white/8 bg-white/[0.02] w-fit mx-auto"
          >
            {SERVICE_TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeService === id}
                onClick={() => setActiveService(id)}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  activeService === id
                    ? 'bg-[#00d4ff] text-[#0b0f1a]'
                    : 'text-white/55 hover:text-white hover:bg-white/[0.05]'
                }`}
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                <Icon size={14} aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* PLAN CARDS — Ecommerce uses the fully memoized Supabase-driven
            component (unchanged). Speed & Space use lightweight static
            summary cards that link through to their own dedicated pages. */}
        <section id="plans" aria-label="Pricing plans" className="scroll-mt-24 max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          {activeService === 'ecommerce' && (
            <>
              {/* WEBSITE TYPE SELECTOR — same 3 packages & base prices, only the
                  price adjustment and feature set change per type. Purely a
                  local state change, so switching is instant with no reload. */}
              <div className="mb-8">
                <p className="text-center text-[11px] text-white/30 uppercase tracking-widest mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  What type of website do you need?
                </p>
                <div
                  role="tablist"
                  aria-label="Choose a website type"
                  className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl border border-white/8 bg-white/[0.02] w-fit mx-auto max-w-full"
                >
                  {WEBSITE_TYPES.map(({ id, label }) => (
                    <button
                      key={id}
                      role="tab"
                      aria-selected={websiteType === id}
                      onClick={() => setWebsiteType(id)}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl text-[12px] sm:text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${
                        websiteType === id
                          ? 'bg-[#00d4ff] text-[#0b0f1a]'
                          : 'text-white/55 hover:text-white hover:bg-white/[0.05]'
                      }`}
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {websiteType === 'custom' && (
                  <p className="text-center text-[12px] text-white/35 mt-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Custom builds are scoped individually — chat with us for an exact quote.
                  </p>
                )}
              </div>

              {loading ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {[1,2,3].map(i => <SkeletonCard key={i} />)}
                </div>
              ) : error ? (
                <p className="text-center py-20 text-red-400" role="alert">{error}</p>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {plans.map((plan) => {
                    const pop = plan.is_popular
                    return <PlanCard key={plan.id} plan={plan} pop={pop} websiteType={websiteType} />
                  })}
                </div>
              )}

              <p className="text-center text-[11px] text-white/25 mt-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Not sure? View demo stores or request a preview before ordering.
              </p>
            </>
          )}

          {activeService === 'speed' && (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {SPEED_PLANS.map((plan) => (
                  <MiniPlanCard key={plan.name} plan={plan} detailsHref={SPEED_DETAILS_HREF} />
                ))}
              </div>
              <p className="text-center text-[11px] text-white/25 mt-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Free speed audit before you commit —{' '}
                <Link href="/website-speed-optimization" className="text-[#00d4ff] hover:underline">
                  see the full breakdown
                </Link>.
              </p>
            </>
          )}

          {activeService === 'space' && (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {SPACE_PLANS.map((plan) => (
                  <MiniPlanCard key={plan.name} plan={plan} detailsHref={SPACE_DETAILS_HREF} />
                ))}
              </div>
              <p className="text-center text-[11px] text-white/25 mt-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Packages above are starter pricing for a satellite tracker build. Larger custom
                aerospace/satellite projects are scoped individually —{' '}
                <Link href="/space" className="text-[#00d4ff] hover:underline">
                  view the Space &amp; Aerospace service
                </Link>.
              </p>
            </>
          )}
        </section>

        {/* COMPARISON TABLE — unchanged */}
        <section aria-label="MakeMyStore vs Shopify" className="border-y border-white/8 bg-white/[0.015] py-12 mb-20">
          <div className="max-w-2xl mx-auto px-5 sm:px-6 text-center">
            <h2 className="text-[28px] sm:text-[34px] font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Why not Shopify?</h2>
            <p className="text-white/40 text-sm mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>Stop paying monthly rent. Own your store permanently.</p>
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-sm min-w-[300px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-4 text-white/35 font-medium text-xs tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif' }}>Feature</th>
                    <th className="py-3 px-3 text-[#00d4ff] font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>MakeMyStore</th>
                    <th className="py-3 px-3 text-white/25 font-medium text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>Shopify</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map(([feat, us, them], i) => (
                    <tr key={feat} className={`border-b border-white/5 ${i % 2 !== 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="py-2.5 pr-4 text-white/50 text-left text-xs sm:text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>{feat}</td>
                      <td className="py-2.5 px-3 text-center text-[#00d4ff] font-semibold text-xs sm:text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>{us}</td>
                      <td className="py-2.5 px-3 text-center text-white/25 text-xs sm:text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>{them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ — now using fully memoized FaqItem */}
        <section aria-label="FAQ" className="max-w-2xl mx-auto px-5 sm:px-6 pb-20">
          <h2 className="text-[28px] sm:text-[34px] font-bold text-center mb-10" style={{ fontFamily: 'Syne, sans-serif' }}>Frequently Asked Questions</h2>
          <div className="space-y-2.5">
            {FAQS.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                index={i}
                isOpen={openFaq === i}
                onToggle={() => toggleFaq(i)}
              />
            ))}
          </div>
        </section>

        {/* PERFORMANCE BADGE + FINAL CTA — unchanged */}
        <section aria-label="Performance" className="max-w-2xl mx-auto px-5 sm:px-6 pb-14">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-[#00d4ff]/12 bg-[#00d4ff]/[0.025]">
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#00d4ff] bg-[#00d4ff]/10">
                <span className="text-[10px] font-black text-[#00d4ff]" style={{ fontFamily: 'Syne, sans-serif' }}>100</span>
              </div>
              <div className="w-px h-5 bg-white/10" />
              <Zap size={15} className="text-[#7a5cff]" aria-hidden />
            </div>
            <p className="text-[12px] text-white/45 text-center sm:text-left" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="text-white/75 font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Powered by the MakeMyStore Engine: Next.js + Supabase.</span>
              {' '}Built for 100/100 Google PageSpeed scores and instant SEO ranking.
            </p>
          </div>
        </section>

        <section className="pb-24 px-4">
          <div className="max-w-md mx-auto text-center">
            <p className="text-white/35 text-sm mb-5" style={{ fontFamily: 'DM Sans, sans-serif' }}>Still have questions? Get in touch before ordering.</p>
            <Link
              href={CONTACT_HREF}
              className="inline-flex items-center gap-2 text-sm font-bold px-8 py-3.5 rounded-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
              style={{
                fontFamily: 'Syne, sans-serif',
                background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)',
                boxShadow: '0 4px 20px rgba(0,212,255,0.25)',
                color: '#0b0f1a',
                textDecoration: 'none',
              }}
            >
              Contact Us →
            </Link>
          </div>
        </section>

      </main>

      <div className="sr-only">
        <h2>Shopify Migration Service</h2>
        <p>MakeMyStore offers seamless Shopify and Wix migration to custom Next.js ecommerce stores. One-time payment, zero platform fees, full source code ownership. Stop paying monthly rent. Custom ecommerce developer available in UAE, Pakistan, and worldwide.</p>
      </div>

      <Footer />
    </>
  )
}
