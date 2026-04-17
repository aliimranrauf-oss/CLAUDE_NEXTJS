'use client'

import { useState } from 'react'
import Link from 'next/link'

// ── Replace this array with your real template data ──────────────────────────
const templates = [
  {
    id: 1,
    category: 'Electronics',
    title: 'Electronics Ecommerce',
    description:
      'Modern high-performance complete eCommerce website solution built with powerful custom code, designed for fast loading, SEO ranking, and maximum conversions. Developed using GitHub, powered by a scalable Supabase backend, and deployed on Vercel for ultra-fast performance. This is a fully functional, ready-to-launch online store with secure payment integrations (Stripe & PayPal), Google Analytics tracking, sitemap setup, Cloudflare optimization, and full search engine indexing to help your business rank on Google and grow faster. Clean, modern UI/UX optimized for both desktop and mobile devices, delivering a smooth shopping experience that increases customer engagement and sales. Fully customizable — you can modify design, features, products, and branding to match your business needs.',
    image: '/templates/electronics.png',
    badge: 'Featured',
  },
  {
    id: 2,
    category: 'Fashion',
    title: 'Fashion & Apparel Store',
    description:
      'Elegant fashion ecommerce store with lookbook-style layouts, size guide, and advanced product filtering. Built for conversion with a clean modern design, full mobile optimization, Stripe checkout, and SEO-ready structure.',
    image: '/templates/fashion.png',
    badge: null,
  },
  {
    id: 3,
    category: 'Food & Beverage',
    title: 'Food & Restaurant Store',
    description:
      'Beautiful food & beverage ecommerce template with category filtering, order tracking, and loyalty features. Fast, SEO optimized, and ready to launch with PayPal and Stripe payment gateways built in.',
    image: '/templates/food.png',
    badge: null,
  },
  {
    id: 4,
    category: 'Health & Beauty',
    title: 'Health & Beauty Shop',
    description:
      'Clean, minimal health and beauty store with ingredient highlights, before/after galleries, and subscription support. Deployed on Vercel with Supabase backend, Google Analytics, and full SEO configuration.',
    image: '/templates/beauty.png',
    badge: null,
  },
]

export default function Templates() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + templates.length) % templates.length)
  const next = () => setCurrent((c) => (c + 1) % templates.length)

  const t = templates[current]

  return (
    <section id="templates" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/30 mb-3 font-medium"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Ready-Made Designs
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Browse Our <span className="text-[#00d4ff]">Templates</span>
          </h2>
        </div>

        {/* ── Card + Arrows row ──────────────────────────────────────────── */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* ← Left Arrow */}
          <button
            onClick={prev}
            aria-label="Previous template"
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/40 text-white/60 hover:text-[#00d4ff] transition-all duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* ── Template Card ─────────────────────────────────────────────── */}
          <div className="flex-1 rounded-2xl border border-white/8 bg-[#111827]/80 overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(0,212,255,0.06)' }}>

            {/* Preview image */}
            <div className="relative w-full aspect-[16/9] bg-[#0d1220] overflow-hidden">
              {t.badge && (
                <span className="absolute top-3 left-3 z-10 text-[11px] font-semibold px-3 py-1 rounded-full bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/25">
                  ✦ {t.badge}
                </span>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.image}
                alt={t.title}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback placeholder if image missing
                  const el = e.currentTarget as HTMLImageElement
                  el.style.display = 'none'
                }}
              />
              {/* Fallback gradient bg when no image */}
              <div className="absolute inset-0 -z-0 bg-gradient-to-br from-[#0d1220] to-[#1a2035]" />
            </div>

            {/* Card body */}
            <div className="p-5 sm:p-7">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-white"
                  style={{ fontFamily: 'Syne, sans-serif' }}>
                  {t.title}
                </h3>
                <span className="flex-shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">
                  {t.category}
                </span>
              </div>

              <p className="text-sm text-white/50 leading-relaxed mb-6"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* ── CHANGE 3a: "Order This Template" → /contact ── */}
                <Link
                  href="https://www.makemystore.online/contact"
                  className="flex-1 text-center text-sm font-bold px-5 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)',
                    boxShadow: '0 4px 15px rgba(0,212,255,0.25)',
                    color: '#fff',
                  }}
                >
                  Order This Template →
                </Link>

                {/* ── CHANGE 4: "Need Custom Design" → /contact ── */}
                <Link
                  href="https://www.makemystore.online/contact"
                  className="flex-1 text-center text-sm font-semibold px-5 py-3 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/[0.06] transition-all duration-200"
                >
                  Need Custom Design
                </Link>
              </div>
            </div>
          </div>

          {/* → Right Arrow */}
          <button
            onClick={next}
            aria-label="Next template"
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/40 text-white/60 hover:text-[#00d4ff] transition-all duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {templates.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to template ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-[#00d4ff]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-xs text-white/20 mt-3"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {current + 1} / {templates.length}
        </p>

        {/* ── CHANGE 5: "Start With MakeMyStore Today" → /pricing ── */}
        <div className="text-center mt-10">
          <p className="text-sm text-white/40 mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Don&apos;t see what you need? We build fully custom too.
          </p>
          <Link
            href="https://www.makemystore.online/pricing"
            className="inline-block text-sm font-bold px-8 py-3.5 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)',
              boxShadow: '0 4px 15px rgba(0,212,255,0.3)',
              color: '#fff',
            }}
          >
            Start With MakeMyStore Today →
          </Link>
        </div>

      </div>
    </section>
  )
}
