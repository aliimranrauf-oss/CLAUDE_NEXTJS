import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle2, Gauge, Zap, ShieldCheck, ArrowRight } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────
// SEO METADATA
// Target keywords: wix website speed optimization, gtmetrix score improvement,
// pagespeed insights fix, wix site slow, improve wix lighthouse score
// ─────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Wix Website Speed Optimization – Improve GTmetrix & PageSpeed Score | MakeMyStore',
  description:
    'Professional Wix website speed optimization. Fix slow load times, compress oversized images and videos, and raise your Google PageSpeed & GTmetrix score — without breaking your site. Real results, real case study.',
  keywords: [
    'wix website speed optimization',
    'improve gtmetrix score',
    'fix slow wix website',
    'google pagespeed insights fix',
    'wix lighthouse score improvement',
    'wix site speed expert',
    'reduce page load time wix',
    'wix performance optimization service',
  ],
  authors: [{ name: 'MakeMyStore.online' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'Wix Website Speed Optimization – Improve GTmetrix & PageSpeed Score',
    description:
      'Fix a slow Wix website the right way. Video/image compression, script cleanup, and Core Web Vitals improvements — done carefully, without breaking your site.',
    url: 'https://www.makemystore.online/website-speed-optimization',
    siteName: 'MakeMyStore.online',
    type: 'website',
    images: [
      {
        url: 'https://www.makemystore.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wix Website Speed Optimization Service',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wix Website Speed Optimization – Improve GTmetrix & PageSpeed Score',
    description: 'Fix a slow Wix website the right way — without breaking anything.',
    images: ['https://www.makemystore.online/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.makemystore.online/website-speed-optimization',
  },
}

// ─────────────────────────────────────────────────────────────────────────
// JSON-LD structured data (Service schema) — helps Google show rich results
// ─────────────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Wix Website Speed Optimization',
  serviceType: 'Website Performance Optimization',
  provider: {
    '@type': 'Organization',
    name: 'MakeMyStore.online',
    url: 'https://www.makemystore.online',
  },
  areaServed: 'Worldwide',
  description:
    'Professional website speed optimization for Wix websites. Video and image compression, script and app cleanup, Core Web Vitals improvement, and GTmetrix/PageSpeed score improvement.',
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
      name: 'Can you really improve my Wix website speed? Wix is a closed platform.',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. While Wix doesn\u2019t allow custom backend code, most slow Wix sites are slow because of oversized videos, uncompressed images, unused apps, and font bloat — all of which are fixable without touching code. I identify the exact bottleneck using GTmetrix and Google PageSpeed Insights before making any change.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will optimizing my site break anything?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Every change is tested individually and published one at a time, with a rollback plan in place before any edit is made. Nothing is changed at random — each fix is verified to not affect layout, forms, or existing functionality before moving to the next task.',
      },
    },
    {
      '@type': 'Question',
      name: 'What score improvement can I expect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Results vary by site, but a 90+ Google PageSpeed Insights score on both desktop and mobile is a realistic, common outcome. GTmetrix\u2019s Performance grade is partly limited by Wix\u2019s own core platform code and cannot be pushed arbitrarily high on any Wix site \u2014 this is explained clearly before work begins, not after.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with platforms other than Wix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wix is a specialty, but the same diagnostic process (image/video compression, script auditing, Core Web Vitals improvement) applies to most website builders and custom sites.',
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// Static content
// ─────────────────────────────────────────────────────────────────────────
const included = [
  'Full GTmetrix + Google PageSpeed Insights audit (mobile & desktop)',
  'Video compression (background/hero videos resized without visible quality loss)',
  'Image compression & correct sizing across key pages and blog posts',
  'Unused app / script audit and safe removal',
  'Core Web Vitals review (LCP, CLS, TBT)',
  'Before/after report with real screenshots and numbers',
]

const process = [
  {
    title: 'Audit',
    desc: 'I run GTmetrix and PageSpeed Insights on your site and identify exactly what is slowing it down \u2014 no guessing.',
  },
  {
    title: 'Fix — one change at a time',
    desc: 'Each fix (video, image, script) is made individually, tested, and published before moving to the next \u2014 so nothing breaks along the way.',
  },
  {
    title: 'Verify & report',
    desc: 'You receive a clear before/after report with real scores, so you know exactly what changed and why.',
  },
]

const stats = [
  { label: 'Homepage page size', before: '~10 MB', after: '~3.4 MB' },
  { label: 'Background video size', before: '7.3 MB', after: '794 KB' },
  { label: 'Google PageSpeed (Desktop)', before: '63', after: '99' },
  { label: 'Google PageSpeed (Mobile)', before: '62', after: '90' },
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
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/[0.06] text-sm text-[#00d4ff] font-semibold mb-6">
              <Gauge size={16} />
              Website Speed &amp; Core Web Vitals Specialist
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Is your <span className="text-gradient">Wix website</span> slow?
              <br />
              Let&apos;s fix that &mdash; without breaking it.
            </h1>

            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              I diagnose and fix the real cause of slow Wix websites &mdash; oversized videos,
              uncompressed images, script bloat &mdash; and turn low GTmetrix and PageSpeed
              scores into fast, healthy ones. Every change is careful, tested, and reversible.
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

        {/* ── CASE STUDY / STATS ──────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
              Real Results, Real Numbers
            </h2>
            <p className="text-white/60 text-center max-w-xl mx-auto mb-12">
              From a recent Wix website speed optimization project (client details kept
              confidential, results verified via GTmetrix &amp; Google PageSpeed Insights):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-xl p-5 border border-white/10 text-center"
                >
                  <div className="text-xs uppercase tracking-wide text-white/50 mb-3">
                    {s.label}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-lg">
                    <span className="text-white/40 line-through">{s.before}</span>
                    <ArrowRight size={14} className="text-[#00d4ff]" />
                    <span className="font-bold text-[#00d4ff]">{s.after}</span>
                  </div>
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
              Speed optimization on a live website is sensitive work. A rollback plan is
              confirmed before any edit, changes are made one at a time, and each fix is
              tested before moving to the next &mdash; so your site stays fully functional
              throughout the process.
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
              Get a free initial speed check &mdash; no obligation.
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
