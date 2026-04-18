'use client'
import { useState, useEffect, useCallback } from 'react'

const TYPING_TEXT = '✦ Built by Real Experts, Powered by AI — Fully Custom & SEO Optimized'

const TECH_STACK_TEXT = 'Supabase • GitHub • Vercel • Google Analytics • Next.js • Tailwind CSS'
const TICKER_ITEMS = [TECH_STACK_TEXT, TECH_STACK_TEXT, TECH_STACK_TEXT]

const CONTACT_URL = 'https://www.makemystore.online/contact'

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

      {/*
        ── LCP Logo fixes ────────────────────────────────────────────────────
        1. REMOVED animate-float class — CSS animation on the LCP element
           confuses Lighthouse and delays LCP measurement by ~300ms.
           Float animation is a nice-to-have; LCP score is more important.
        2. Explicit width/height on wrapper div prevents CLS.
        3. fetchPriority="high" + decoding="async" already correct.
      */}
      <div className="mb-8" style={{ width: 140, height: 140 }}>
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

      <h1
        className="text-4xl sm:text-[42px] font-bold leading-[1.2] max-w-2xl mx-auto text-white"
        style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', letterSpacing: '-0.01em' }}
      >
        Build Your Ecommerce Website
        <br />
        <span className="text-[#40e0ff] block mt-1">One-Time Setup, Zero Platform Fees</span>
      </h1>

      <p
        className="mt-5 text-gray-500 text-sm sm:text-base max-w-lg mx-auto"
        style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
      >
        Custom online store with Stripe &amp; PayPal, SEO optimized, Self-Hosted Freedom
      </p>

      {/* Benefit badges */}
      <div
        className="mt-5 flex flex-wrap justify-center items-center gap-1 text-[13px] sm:text-sm text-white/70"
        style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
      >
        <span>🚀 Live in 3–10 days</span>
        <span className="text-white/20 mx-1">|</span>
        <span>💳 Stripe &amp; PayPal Ready</span>
        <span className="text-white/20 mx-1">|</span>
        <span>🔒 No platform lock-in</span>
      </div>

      {/* Typing line — min-h prevents CLS when text appears */}
      <p
        className="mt-8 text-sm sm:text-[17px] font-bold min-h-[26px]"
        style={{ color: '#00d4ff', fontFamily: 'var(--font-syne), Syne, sans-serif' }}
        aria-live="polite"
        aria-label={typed}
      >
        <span aria-hidden="true">{typed}</span>
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

      <p
        className="mt-6 text-[12px] sm:text-[13px] text-white/40 max-w-md mx-auto"
        style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
      >
        💡 Most our clients spend <strong className="text-white/60">$0/month</strong> on operations by utilizing professional-grade Free Tiers from Vercel and Supabase.
      </p>

      {/* ── TECH STACK TEXT TICKER ─────────────────────────────────────────── */}
      <div className="mt-10 w-full max-w-3xl mx-auto">
        <p
          className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-4 font-medium"
          style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
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
                style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', letterSpacing: '0.04em' }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hidden SEO block ─────────────────────────────── */}
      <div className="sr-only">
        <h2>Professional Shopify Alternative</h2>
        <p>
          MakeMyStore offers custom-coded ecommerce websites with a one-time payment model.
          Unlike subscription platforms, we provide full ownership, high-speed performance,
          and advanced SEO features for growing businesses. We deploy your store directly to
          your personal Vercel and Supabase accounts, giving you 100% control and eliminating
          the risk of platform price hikes.
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
