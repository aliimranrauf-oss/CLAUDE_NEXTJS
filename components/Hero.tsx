'use client'
import { useState, useEffect, useCallback } from 'react'

const TYPING_TEXT = '✦ Built by Real Experts — One-Time Build Fee, Any Hosting You Choose'

const TECH_STACK_TEXT = 'Supabase • GitHub • Vercel • Hostinger • GoDaddy • Next.js • Tailwind CSS'
const TICKER_ITEMS = [TECH_STACK_TEXT, TECH_STACK_TEXT, TECH_STACK_TEXT]

const CONTACT_URL = 'https://www.makemystore.online/contact'
const PRICING_URL = 'https://www.makemystore.online/pricing'

export default function Hero() {
  const [typed, setTyped] = useState('')

  // useCallback so the effect dep is stable
  const startTyping = useCallback(() => {
    let i = 0
    const interval = setInterval(() => {
      setTyped(TYPING_TEXT.slice(0, i + 1))
      i++
      if (i >= TYPING_TEXT.length) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [])

  useEffect(startTyping, [startTyping])

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 overflow-hidden">
      {/* Background glow orbs — reduced opacity for LCP perf */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(0,212,255,0.04)' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(122,92,255,0.04)' }}
      />

      {/* Logo — priority load, explicit dimensions for CLS */}
      <div className="animate-float mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="MakeMyStore - Custom Ecommerce Solutions"
          width={140}
          height={140}
          fetchPriority="high"
          decoding="async"
          className="mx-auto rounded-2xl object-contain"
          style={{
            mixBlendMode: 'lighten',
            filter: 'drop-shadow(0 0 20px rgba(122,92,255,0.4))',
          }}
        />
      </div>

      {/* ── Headline: honest positioning — we charge a one-time BUILD fee, hosting is the client's choice ── */}
      <h1
        className="text-4xl sm:text-[42px] font-bold leading-[1.2] max-w-2xl mx-auto text-white"
        style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
      >
        Build Your Ecommerce Website
        <br />
        <span className="text-[#40e0ff] block mt-1">One-Time Build Fee. Host It Anywhere.</span>
      </h1>

      <p
        className="mt-5 text-gray-500 text-sm sm:text-base max-w-lg mx-auto"
        style={{ fontFamily: 'DM Sans, sans-serif' }}
      >
        Custom-coded store with Stripe &amp; PayPal, full source code on GitHub, Supabase backend —
        deployed to Vercel, Hostinger, GoDaddy, or hosting you already own.
      </p>

      {/* Benefit badges */}
      <div
        className="mt-5 flex flex-wrap justify-center items-center gap-1 text-[13px] sm:text-sm text-white/70"
        style={{ fontFamily: 'DM Sans, sans-serif' }}
      >
        <span>🚀 Live in 3–10 days</span>
        <span className="text-white/20 mx-1">|</span>
        <span>💳 Stripe &amp; PayPal Ready</span>
        <span className="text-white/20 mx-1">|</span>
        <span>🌐 Works with any host — no lock-in</span>
      </div>

      {/* Typing line */}
      <p
        className="mt-8 text-sm sm:text-[17px] font-bold min-h-[26px]"
        style={{ color: '#00d4ff', fontFamily: 'Syne, sans-serif' }}
      >
        {typed}
        <span className="animate-pulse ml-0.5" aria-hidden="true">|</span>
      </p>

      {/* CTA → /contact */}
      <div className="mt-8 flex justify-center">
        <a
          href={CONTACT_URL}
          className="btn-primary text-sm px-8 py-3.5 rounded-lg font-bold transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d4ff]"
          style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)',
            boxShadow: '0 4px 15px rgba(0,212,255,0.3)',
          }}
        >
          Get Your Store →
        </a>
      </div>

      {/* Pricing snapshot — real packages, honest framing */}
      <a
        href={PRICING_URL}
        className="mt-5 inline-flex flex-wrap justify-center gap-x-3 gap-y-1 text-[12px] sm:text-[13px] text-white/50 hover:text-white/80 transition-colors"
        style={{ fontFamily: 'DM Sans, sans-serif' }}
      >
        <span>Starter <strong className="text-white/70">$250</strong></span>
        <span className="text-white/20">·</span>
        <span>Business <strong className="text-white/70">$500</strong></span>
        <span className="text-white/20">·</span>
        <span>Pro <strong className="text-white/70">$1000</strong></span>
        <span className="text-white/20">·</span>
        <span className="underline underline-offset-2">See what's included →</span>
      </a>

      {/* ── Cost note: what we charge for vs. what the client pays hosting providers directly ── */}
      <p
        className="mt-6 text-[12px] sm:text-[13px] text-white/40 max-w-md mx-auto"
        style={{ fontFamily: 'DM Sans, sans-serif' }}
      >
        💡 Our fee covers the build — not hosting. You host wherever you like (Vercel, Hostinger,
        GoDaddy, or your current plan). Most hosting and Supabase backends offer{' '}
        <strong className="text-white/60">free tiers</strong> for smaller stores, so many clients pay
        little to nothing to run their site — but hosting costs are between you and your provider, not us.
      </p>

      {/* ── TECH STACK TEXT TICKER ─────────────────────────────────────────── */}
      <div className="mt-10 w-full max-w-3xl mx-auto">
        <p
          className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-4 font-medium"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Tech Stack Used in Our Projects
        </p>

        <div className="relative overflow-hidden" aria-hidden="true">
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to right, #0b0f1a, transparent)' }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to left, #0b0f1a, transparent)' }}
          />
          <div className="flex items-center marquee-track whitespace-nowrap">
            {TICKER_ITEMS.map((text, i) => (
              <span
                key={i}
                className="flex-shrink-0 text-[13px] text-white/30 px-8"
                style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.04em' }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hidden SEO block — honest description, no absolute "$0/mo forever" claims ── */}
      <div className="sr-only">
        <h2>Custom Ecommerce Development — One-Time Build Fee, Any Hosting</h2>
        <p>
          MakeMyStore builds custom-coded ecommerce websites for a one-time build fee. Unlike
          subscription platforms, you get full source code ownership on GitHub and a Supabase backend,
          deployed to the hosting provider of your choice — Vercel, Hostinger, GoDaddy, or an existing
          hosting plan you already have. We charge for the build and setup; hosting and backend costs
          are billed separately by your provider, and many offer free tiers to start.
        </p>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 22s linear infinite;
          width: max-content;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}
