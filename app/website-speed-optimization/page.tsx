import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle2, Gauge, Zap, ShieldCheck, ArrowRight } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────
// SEO METADATA
// Platform-agnostic: targets speed/performance/GTmetrix/Lighthouse searches
// ─────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://www.makemystore.online'),
  title: 'Website Speed Optimization Service | Improve GTmetrix, PageSpeed & Lighthouse Score',
  description:
    'Get your website loading fast. Professional speed optimization for Wix, WordPress, Shopify, Next.js, and custom sites — fix a low GTmetrix grade, boost your Google PageSpeed Insights score, and pass Core Web Vitals, without breaking anything.',
  keywords: [
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
  ],
  category: 'Web Development Services',
  authors: [{ name: 'MakeMyStore.online' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'Website Speed Optimization Service | Improve GTmetrix, PageSpeed & Lighthouse Score',
    description:
      'Fix a slow website the right way, on any platform. Media compression, script cleanup, and Core Web Vitals improvements — done carefully, without breaking your site.',
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
    title: 'Website Speed Optimization Service | Improve GTmetrix & PageSpeed Score',
    description: 'Fix a slow website the right way, on any platform — without breaking anything.',
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
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
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
        text: 'React, Vite, and Next.js applications, including Tailwind/Shadcn UI, Supabase-backed apps, and Framer Motion-heavy interfaces \u2014 custom landing pages, SaaS dashboards, and ecommerce stores. If it\u2019s a modern frontend built with React or Vite, this applies.',
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
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// Static content
// ─────────────────────────────────────────────────────────────────────────
const included = [
  'Convert all images to WebP with proper width/height attributes',
  'Lazy loading & code splitting (React.lazy, Suspense)',
  'Fix render-blocking resources and unused JS/CSS',
  'Smart caching headers (especially on Vercel/Netlify)',
  'Reduce JavaScript execution time and main-thread work',
  'Preload critical assets and optimize font loading',
]

const youGet = [
  'Full performance audit report',
  'Clean, optimized code committed directly to your repo',
  'Before & after screenshots with real Lighthouse scores',
  '100% Google-friendly \u2014 Core Web Vitals passed',
]

const platforms = [
  'React',
  'Vite',
  'Next.js',
  'Tailwind / Shadcn',
  'Supabase',
  'Framer Motion',
]

const useCases = [
  'Custom landing pages',
  'SaaS dashboards',
  'Ecommerce stores',
  'Any modern frontend built with React or Vite',
]

const process = [
  {
    title: 'Audit',
    desc: 'I run Lighthouse and PageSpeed Insights on your site and identify exactly what is slowing it down \u2014 no guessing, no generic checklist.',
  },
  {
    title: 'Fix \u2014 one change at a time',
    desc: 'Each fix (images, lazy loading, render-blocking resources, JS execution time, caching, fonts) is made individually, tested, and committed before moving to the next \u2014 so nothing breaks along the way.',
  },
  {
    title: 'Verify & report',
    desc: 'You receive a full before/after report with real Lighthouse and PageSpeed scores, so you know exactly what changed and why.',
  },
]

const FIVERR_GIG_URL = 'https://www.fiverr.com/s/ljqAq5g'
const CONTACT_URL = '/contact'

export default function WebsiteSpeedOptimizationPage() {
  return (
    <>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main id="main-content" className="bg-[#0b0f1a] text-white">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text column */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/[0.06] text-sm text-[#00d4ff] font-semibold mb-6">
                <Gauge size={16} />
                Website Speed &amp; Core Web Vitals Specialist
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Is your <span className="text-gradient">website slow</span>?
                <br />
                Let&apos;s fix that &mdash; without breaking it.
              </h1>

              <p className="text-lg text-white/70 max-w-xl mx-auto lg:mx-0 mb-6">
                Tired of slow loading times killing your sales and Google ranking? I fix
                Core Web Vitals (LCP, CLS, INP, FCP) and get you a 90&ndash;100 Lighthouse
                score on both mobile and desktop &mdash; with every change tested and
                committed carefully, not randomly.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                {platforms.map((p) => (
                  <span
                    key={p}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/[0.05] text-[#00d4ff]/80"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-10">
                {useCases.map((u) => (
                  <span
                    key={u}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 text-white/60"
                  >
                    {u}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href={CONTACT_URL} className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
                  Get a Free Speed Audit
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
            </div>

            {/* Hero image column
                ── LCP / CLS SAFETY NOTES ────────────────────────────────────
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
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
              What&apos;s Included
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#00d4ff] shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {process.map((step, i) => (
                <div key={step.title} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/[0.08] flex items-center justify-center font-bold text-[#00d4ff]">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm">{step.desc}</p>
                </div>
              ))}
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
        <section className="py-20 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready for a faster website?
            </h2>
            <p className="text-white/70 mb-8">
              Get a free initial speed check &mdash; no obligation, any platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={CONTACT_URL} className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
                Get a Free Speed Audit
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
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
