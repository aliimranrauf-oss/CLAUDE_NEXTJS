import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PixelViewContent from '@/components/PixelViewContent'
import PageSpeedInsightsTool from './PageSpeedInsightsTool'
import { CheckCircle2, Gauge, Zap, ShieldCheck, ArrowRight, Image as ImageIcon, Layers, Server, Cpu, FileSearch, Sparkles } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────
// SEO METADATA
// Platform-agnostic: targets speed/performance/GTmetrix/Lighthouse searches
// ─────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://www.makemystore.online'),
  title: 'Free Website Speed Test & Lighthouse Checker | PageSpeed, GTmetrix & Core Web Vitals Tool',
  description:
    'Free website speed test powered by real Google Lighthouse and PageSpeed Insights data — check your Core Web Vitals (LCP, CLS, INP, FCP), get a GTmetrix-style score, and download or copy your PDF report instantly, no sign-up required. Plus professional speed optimization for Wix, WordPress, Shopify, Next.js, and custom sites.',
  keywords: [
    'free website speed test',
    'free lighthouse speed test',
    'free pagespeed insights checker',
    'google pagespeed insights checker',
    'core web vitals checker',
    'core web vitals test free',
    'gtmetrix checker free',
    'gtmetrix alternative',
    'website speed test online',
    'lighthouse score checker',
    'lighthouse report pdf',
    'download speed test report pdf',
    'check my website speed',
    'website speed optimization',
    'improve gtmetrix score',
    'improve lighthouse score',
    'improve pagespeed insights score',
    'fix low gtmetrix grade',
    'core web vitals optimization service',
    'website performance audit',
    'reduce website load time',
    'speed up my website',
    'website too slow fix',
    'wordpress speed optimization service',
    'shopify site speed optimization',
    'next.js performance optimization',
    'wix website speed optimization',
    // ── Additional long-tail / intent-based terms ──────────────────────
    'test website speed google',
    'website speed checker no sign up',
    'free page speed test tool',
    'site speed test tool free',
    'mobile website speed test',
    'desktop website speed test',
    'check website loading time free',
    'free website performance checker',
    'online lighthouse audit tool',
    'free core web vitals test online',
    'LCP CLS FCP checker free',
    'chrome ux report checker',
    'why is my website slow',
    'website speed test for SEO',
    'page speed test for Google ranking',
    'free website audit tool online',
    'speed test before hiring developer',
    'check ecommerce store speed free',
    'speed optimization expert near me',
    'hire someone to fix website speed',
  ],
  category: 'Web Development Services',
  authors: [{ name: 'MakeMyStore.online' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'Free Website Speed Test & Lighthouse Checker | PageSpeed, GTmetrix & Core Web Vitals Tool',
    description:
      'Run a free Lighthouse + PageSpeed Insights speed test, see your Core Web Vitals and GTmetrix-style score, and download or copy a PDF report instantly. Then get expert help fixing what\u2019s slow, on any platform, without breaking anything.',
    url: 'https://www.makemystore.online/website-speed-optimization',
    siteName: 'MakeMyStore.online',
    type: 'website',
    images: [
      {
        url: 'https://www.makemystore.online/speed-hero.webp',
        width: 1200,
        height: 900,
        alt: 'Website speed optimization — performance gauge showing improved page speed score',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Website Speed Test & Lighthouse Checker | PageSpeed & GTmetrix Tool',
    description: 'Free Lighthouse + PageSpeed speed test with Core Web Vitals and a downloadable PDF report — no sign-up required.',
    images: ['https://www.makemystore.online/speed-hero.webp'],
  },
  alternates: {
    canonical: 'https://www.makemystore.online/website-speed-optimization',
  },
}

// ─────────────────────────────────────────────────────────────────────────
// JSON-LD structured data
// ─────────────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Website Speed Optimization',
  serviceType: 'Website Performance Optimization',
  provider: {
    '@type': 'Organization',
    name: 'MakeMyStore.online',
    url: 'https://www.makemystore.online',
  },
  areaServed: 'Worldwide',
  description:
    'Professional website speed optimization for any platform. Media compression, script and asset cleanup, and Core Web Vitals improvement to raise PageSpeed and GTmetrix scores.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Basic',
      price: '70',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Standard',
      price: '150',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Premium',
      price: '300',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  ],
}

const toolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Website Speed Test & Lighthouse Checker',
  alternateName: ['Free PageSpeed Insights Checker', 'Free GTmetrix-Style Speed Checker'],
  url: 'https://www.makemystore.online/website-speed-optimization',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (web-based)',
  description:
    'A free online tool that runs a real Google Lighthouse and PageSpeed Insights check on any website, showing Performance, Accessibility, Best Practices, and SEO scores plus Core Web Vitals (LCP, CLS, INP, FCP, Speed Index) and real-visitor Chrome UX field data. The full report can be downloaded as a PDF or copied, with no sign-up or email required.',
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  screenshot: 'https://www.makemystore.online/speed-hero.webp',
  publisher: {
    '@type': 'Organization',
    name: 'MakeMyStore.online',
    url: 'https://www.makemystore.online',
  },
  featureList: [
    'Real Google Lighthouse Performance, Accessibility, Best Practices & SEO scores',
    'Core Web Vitals: LCP, CLS, INP/TBT, FCP & Speed Index',
    'Real visitor field data from Chrome UX Report (28-day average)',
    'Top opportunities to fix, ranked by impact',
    'Downloadable PDF report',
    'Copyable report text',
    'Mobile and desktop testing',
    'No sign-up or email required',
  ],
}

// Breadcrumb rich result — helps this page show a Home > Website Speed
// Optimization trail directly in the Google search snippet.
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.makemystore.online/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Website Speed Optimization',
      item: 'https://www.makemystore.online/website-speed-optimization',
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What kind of websites and apps do you work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any website on any platform \u2014 WordPress, WooCommerce, Shopify, Wix, Squarespace, Webflow, as well as custom-built React, Next.js, and Vite applications. Landing pages, SaaS dashboards, blogs, and ecommerce stores are all covered.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will optimizing my site break anything?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Every change is tested individually and published one at a time, with a rollback plan confirmed before any edit is made. Nothing is changed at random \u2014 each fix is verified to not affect layout, forms, or existing functionality before moving to the next task.',
      },
    },
    {
      '@type': 'Question',
      name: 'What score improvement can I expect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Results depend on the current state of the site and the platform it\u2019s built on, but a 90+ Google PageSpeed Insights score on both desktop and mobile is a realistic, common outcome for most sites once the real bottlenecks are addressed. Every platform has its own constraints, and those are explained clearly up front, not after the work is done.',
      },
    },
    {
      '@type': 'Question',
      name: 'What usually makes a website slow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most commonly: oversized or uncompressed images and videos, unnecessary third-party scripts and apps, unoptimized fonts, and render-blocking resources. A proper audit with GTmetrix and PageSpeed Insights identifies the exact cause on your specific site rather than guessing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the speed test tool on this page really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. It runs a real Google Lighthouse and PageSpeed Insights check \u2014 the same data Google itself uses \u2014 with no sign-up, no email, and no cost. The report can be downloaded as a PDF or copied directly from the results page.',
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// Static content
// ─────────────────────────────────────────────────────────────────────────
const youGet = [
  'Full performance audit report',
  'Clean, optimized code committed directly to your repo',
  'Before & after screenshots with real Lighthouse scores',
  '100% Google-friendly \u2014 Core Web Vitals passed',
]

const platforms = [
  'WordPress',
  'Shopify',
  'Wix',
  'Squarespace',
  'Webflow',
  'React / Next.js / Vite',
  'Any Custom-Built Site',
]

const useCases = [
  'WordPress & WooCommerce sites',
  'Shopify & Wix stores',
  'Custom landing pages',
  'SaaS dashboards',
  'Any website on any platform',
]

const featureHighlights = [
  { icon: ImageIcon, title: 'Image Optimization', desc: 'All images converted to WebP with proper width/height so nothing shifts on load.' },
  { icon: Layers, title: 'Lazy Loading & Code Splitting', desc: 'Only what\u2019s visible loads first \u2014 the rest loads as the visitor scrolls.' },
  { icon: Zap, title: 'Render-Blocking Fixes', desc: 'Unused JS/CSS removed so the page can paint without waiting on it.' },
  { icon: Server, title: 'Smart Caching Headers', desc: 'Proper cache rules configured, especially for Vercel/Netlify hosting.' },
  { icon: Cpu, title: 'Less JavaScript Work', desc: 'Reduced execution time and main-thread work for a snappier feel.' },
  { icon: FileSearch, title: 'Preload & Font Optimization', desc: 'Critical assets and fonts preloaded so text and content appear faster.' },
]

const toolsUsed = [
  { name: 'Google Lighthouse', desc: 'The audit engine behind every score' },
  { name: 'PageSpeed Insights', desc: 'Real lab + real-user field data' },
  { name: 'GTmetrix', desc: 'Cross-checks results on a second engine' },
]

// Illustrative example only \u2014 not a specific client's real data.
// Consistent with the FAQ claim that 90+ is a realistic common outcome,
// and with the "custom built" numbers already used in the free tools page.
const impactExample = { before: 52, after: 94 }

const process = [
  {
    title: 'Audit',
    desc: 'I run Lighthouse and PageSpeed Insights on your site and identify exactly what is slowing it down \u2014 no guessing, no generic checklist.',
  },
  {
    title: 'Fix \u2014 one change at a time',
    desc: 'Each fix (images, lazy loading, render-blocking resources, JS execution time, caching, fonts) is made individually and committed before moving to the next \u2014 so nothing breaks along the way.',
  },
  {
    title: 'Test',
    desc: 'Every single change is verified against the live site before the next one starts, confirming layout, forms, and functionality all still work exactly as before.',
  },
  {
    title: 'Deliver',
    desc: 'You receive a full before/after report with real Lighthouse and PageSpeed scores, so you know exactly what changed and why.',
  },
]

// Old (pre-discount) prices are kept as numbers so the % off shown on each
// card is always calculated from oldPrice -> price, instead of being typed
// in by hand and risking going out of sync.
const pricingPlans = [
  {
    name: 'Basic',
    oldPrice: 299,
    price: 70,
    tagline: 'Full optimization + report',
    bestFor: 'Best for small sites needing a quick, focused fix',
    delivery: '3\u20135 day delivery',
    features: [
      'Speed optimization',
      'Browser caching',
      'Image resizing & compression',
      'Minification (CSS/JS/HTML)',
      'Database optimization',
    ],
    highlighted: false,
  },
  {
    name: 'Standard',
    oldPrice: 699,
    price: 150,
    tagline: 'Everything + lazy loading & caching setup',
    bestFor: 'Best for most sites aiming for a 90+ score',
    delivery: '5\u20137 day delivery',
    features: [
      'Everything in Basic',
      'Lazy loading setup',
      'Advanced caching configuration',
      'Priority support during delivery',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    oldPrice: 1299,
    price: 300,
    tagline: 'Complex & e-commerce sites + 30-day monitoring',
    bestFor: 'Best for large, complex, or e-commerce sites',
    delivery: '7\u201310 day delivery + 30 days monitoring',
    features: [
      'Everything in Standard',
      'Built for complex & e-commerce sites',
      '30-day performance monitoring',
      'Monthly performance report during monitoring',
      'Priority support',
    ],
    highlighted: false,
  },
]

// e.g. oldPrice 299, price 70 -> 77
function getDiscountPercent(oldPrice: number, price: number) {
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

const FIVERR_GIG_URL = 'https://www.fiverr.com/s/ljqAq5g'
const NEW_FIVERR_GIG_URL = 'https://www.fiverr.com/s/NN7qXxa'
const CONTACT_URL = '/contact?service=speed-audit'

export default function WebsiteSpeedOptimizationPage() {
  return (
    <>
      <Navbar />
      <PixelViewContent name="Speed Audit Landing Page" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main id="main-content" className="bg-[#0b0f1a] text-white">
        {/* ── HERO (includes the free PageSpeed tool as its lead element) ── */}
        <section className="relative pt-28 pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* ── ROW 1: TOOL (left) + EXAMPLE RESULT IMAGE (right) ─────────
                First thing visible inside the hero, in one glance — the free
                PageSpeed tool paired with visual proof of the outcome.
                Real Google PageSpeed Insights data via /api/pagespeed,
                funnels straight into the paid offer below via <ToolCTA />. */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-start mb-14 sm:mb-16">
              <PageSpeedInsightsTool />

              {/* Hero image column
                  ── LCP / CLS SAFETY NOTES ────────────────────────────────
                  - `priority` preloads this image and marks it high fetch priority,
                    since it's almost certainly the Largest Contentful Paint element.
                  - Explicit width/height (and the wrapping aspect-ratio div) reserve
                    the exact space before the image loads, so CLS stays at ~0.
                  - next/image automatically serves AVIF/WebP to supporting browsers
                    and generates responsive srcset sizes — no manual compression step
                    needed beyond starting with a reasonably sized source file
                    (see instructions for recommended source specs).
                  - `sizes` tells the browser the real rendered width at each
                    breakpoint so it never downloads a larger version than needed.
              */}
              <div className="rounded-2xl p-4 sm:p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Gauge size={15} className="text-[#00d4ff]" />
                  <span className="text-xs font-semibold text-white/70">Example Result After Optimization</span>
                </div>
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src="/speed-hero.webp"
                    alt="Website speed optimization dashboard showing a performance gauge and improved page load score"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {[
                    { label: 'LCP', value: '1.4s' },
                    { label: 'INP', value: '25ms' },
                    { label: 'CLS', value: '0.03' },
                    { label: 'Score', value: '94' },
                  ].map((m) => (
                    <div key={m.label} className="rounded-lg py-2 text-center" style={{ background: 'rgba(0,255,170,0.06)', border: '1px solid rgba(0,255,170,0.15)' }}>
                      <div className="text-sm font-extrabold text-[#00ffaa]">{m.value}</div>
                      <div className="text-[10px] text-white/50">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── ROW 2: headline, pitch, CTAs — everything else, below the fold ── */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/[0.06] text-sm text-[#00d4ff] font-semibold">
                  <Gauge size={16} />
                  Website Speed &amp; Core Web Vitals Specialist
                </div>
                <Link
                  href="#pricing"
                  aria-label="See discounted packages"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#00d4ff] text-[#0b0f1a] font-bold text-xs sm:text-sm px-4 py-1.5 shadow-lg shadow-[#00d4ff]/30 hover:scale-105 transition-transform"
                >
                  <Zap size={14} />
                  Up to 79% OFF
                </Link>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Is your <span className="text-gradient">website slow</span>?
                <br />
                Let&apos;s fix that &mdash; without breaking it.
              </h1>

              <p className="text-lg text-white/70 max-w-xl mx-auto mb-5">
                Tired of slow loading times killing your sales and Google ranking? I fix
                Core Web Vitals (LCP, CLS, INP, FCP) and get you a 90&ndash;100 Lighthouse
                score on both mobile and desktop &mdash; with every change tested and
                committed carefully, not randomly.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-7 text-sm text-white/75">
                {['90+ Lighthouse Score', 'Core Web Vitals Fixed', 'Better Rankings & Sales'].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#00ffaa]" />
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-7">
                <Link href={CONTACT_URL} className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
                  Ask a Question
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={FIVERR_GIG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold px-8 py-3 rounded-lg border border-white/15 text-white/80 hover:text-white hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/[0.06] transition-all"
                >
                  Order on Fiverr
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {[...platforms, ...useCases].map((p) => (
                  <span
                    key={p}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10 text-white/45"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU GET ─────────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
              What You Get
            </h2>
            <p className="text-white/60 text-center max-w-xl mx-auto mb-12">
              A clear, verifiable outcome &mdash; not just a promise.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {youGet.map((item) => (
                <div
                  key={item}
                  className="glass rounded-xl p-5 border border-white/10 flex items-start gap-3"
                >
                  <CheckCircle2 size={20} className="text-[#00d4ff] shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ──────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
              What&apos;s Included
            </h2>
            <p className="text-white/60 text-center max-w-xl mx-auto mb-12">
              Every fix that actually moves the needle on your score.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
              {featureHighlights.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="glass rounded-2xl p-5 border border-white/10 text-center sm:text-left h-full flex flex-col">
                    <div className="w-11 h-11 mx-auto sm:mx-0 rounded-xl flex items-center justify-center mb-3.5" style={{ background: 'rgba(0,212,255,0.12)' }}>
                      <Icon size={20} className="text-[#00d4ff]" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
                    <p className="text-white/55 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────────── */}
        <section id="pricing" className="py-16 px-4 sm:px-6 border-t border-white/5 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
              Packages &amp; Pricing
            </h2>
            <p className="text-white/60 text-center max-w-xl mx-auto mb-12">
              Choose the package that fits your site &mdash; on any platform.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-6 flex flex-col border ${
                    plan.highlighted
                      ? 'border-[#00d4ff]/40 bg-[#00d4ff]/[0.06]'
                      : 'glass border-white/10'
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full bg-[#00d4ff] text-[#0b0f1a]">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                  <p className="text-[11px] font-medium text-[#00d4ff]/80 mb-3">{plan.bestFor}</p>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-base text-white/40 line-through">${plan.oldPrice}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#00d4ff]/15 text-[#00d4ff]">
                      {getDiscountPercent(plan.oldPrice, plan.price)}% OFF
                    </span>
                  </div>

                  <p className="text-white/60 text-sm mb-1">{plan.tagline}</p>
                  <p className="text-white/55 text-xs mb-6">{plan.delivery}</p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                        <CheckCircle2 size={16} className="text-[#00d4ff] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={NEW_FIVERR_GIG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      plan.highlighted
                        ? 'btn-primary text-sm px-6 py-2.5 text-center inline-block'
                        : 'text-sm font-semibold px-6 py-2.5 rounded-lg border border-white/15 text-white/80 hover:text-white hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/[0.06] transition-all text-center'
                    }
                  >
                    Order Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
              Our Proven Process
            </h2>
            <p className="text-white/60 text-center max-w-xl mx-auto mb-14">
              A simple 4-step process, the same way every time.
            </p>
            {/* Mobile: vertical timeline so the sequence stays readable on small screens */}
            <div className="sm:hidden relative">
              {process.map((step, i) => (
                <div key={step.title} className="relative pl-14 pb-10 last:pb-0">
                  {i < process.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-px border-l border-dashed border-[#00d4ff]/25" />
                  )}
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full border border-[#00d4ff]/30 bg-[#0b0f1a] flex items-center justify-center font-bold text-[#00d4ff] z-10">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Desktop/tablet: original horizontal 4-column layout, unchanged */}
            <div className="hidden sm:grid sm:grid-cols-4 gap-y-10 gap-x-4 relative">
              <div className="hidden sm:block absolute top-6 left-[12.5%] right-[12.5%] h-px border-t border-dashed border-[#00d4ff]/25" />
              {process.map((step, i) => (
                <div key={step.title} className="text-center relative">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-[#00d4ff]/30 bg-[#0b0f1a] flex items-center justify-center font-bold text-[#00d4ff] relative z-10">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-white/55 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS WE USE / SEE THE IMPACT ────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6 sm:p-7 border border-white/10">
              <h3 className="font-bold text-lg mb-1">Tools I Use</h3>
              <p className="text-white/55 text-xs mb-6">Industry-standard tools for accurate, verifiable results.</p>
              <div className="space-y-4">
                {toolsUsed.map((t) => (
                  <div key={t.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(0,212,255,0.1)' }}>
                      <Sparkles size={16} className="text-[#00d4ff]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/90">{t.name}</div>
                      <div className="text-xs text-white/50">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 sm:p-7 border border-white/10">
              <h3 className="font-bold text-lg mb-1">See the Impact</h3>
              <p className="text-white/55 text-xs mb-6">A typical example of what proper optimization changes.</p>
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-[11px] text-white/50 mb-1.5">Before</div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#ff6b6b]/40 flex items-center justify-center text-xl sm:text-2xl font-extrabold text-[#ff6b6b]">
                    {impactExample.before}
                  </div>
                </div>
                <ArrowRight size={22} className="text-white/30 shrink-0" />
                <div className="text-center">
                  <div className="text-[11px] text-white/50 mb-1.5">After</div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#00ffaa]/50 flex items-center justify-center text-xl sm:text-2xl font-extrabold text-[#00ffaa]">
                    {impactExample.after}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-6 text-xs text-white/70">
                {['Faster Load Time', 'Better User Experience', 'Higher Search Rankings', 'More Conversions & Sales'].map((s) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-[#00ffaa] shrink-0" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY IT'S SAFE ────────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto glass rounded-2xl p-8 border border-white/10 text-center">
            <ShieldCheck size={32} className="text-[#00d4ff] mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              Careful, Not Random
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              Speed optimization on a live website is sensitive work, regardless of
              platform. A rollback plan is confirmed before any edit, changes are made
              one at a time, and each fix is tested before moving to the next &mdash; so
              your site stays fully functional throughout the process.
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqJsonLd.mainEntity.map((q) => (
                <div key={q.name} className="border-b border-white/10 pb-6">
                  <h3 className="font-semibold text-white mb-2 flex items-start gap-2">
                    <Zap size={18} className="text-[#00d4ff] shrink-0 mt-0.5" />
                    {q.name}
                  </h3>
                  <p className="text-white/65 text-sm pl-6">{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────── */}
        <section
          className="py-12 px-4 sm:px-6"
          style={{ background: 'linear-gradient(90deg, #00d4ff, #7a5cff)' }}
        >
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Zap size={22} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Ready for a faster website?
                </h2>
                <p className="text-white/85 text-sm">
                  Get a free initial speed check &mdash; no obligation, any platform.
                </p>
              </div>
            </div>
            <Link
              href={CONTACT_URL}
              className="shrink-0 bg-white text-[#0b0f1a] font-bold text-sm px-7 py-3 rounded-xl inline-flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Get Started Now
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
