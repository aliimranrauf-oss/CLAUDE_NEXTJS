'use client'
import { useState, useEffect, useCallback } from 'react'

const TYPING_TEXT = '✦ Built by Real Experts, Powered by AI — Fully Custom & SEO Optimized'
const TECH_STACK_TEXT = 'Supabase • GitHub • Vercel • Google Analytics • Next.js • Tailwind CSS'
const TICKER_ITEMS = [TECH_STACK_TEXT, TECH_STACK_TEXT, TECH_STACK_TEXT]
const CONTACT_URL = 'https://www.makemystore.online/contact'

export default function Hero() {
  const [typed, setTyped] = useState('')

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
      {/*
        CLS FIX: will-change:transform promotes orbs to their own compositor
        layer — stops them participating in layout recalculation, eliminating
        the 0.124 CLS score they were causing.
      */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(0,212,255,0.04)', willChange: 'transform' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(122,92,255,0.04)', willChange: 'transform' }}
      />

      {/* LCP logo — no animate-float, explicit wrapper size prevents CLS */}
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
          style={{ mixBlendMode: 'lighten', filter: 'drop-shadow(0 0 20px rgba(122,92,255,0.4))' }}
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

      {/* CONTRAST FIX: text-gray-500 (3.1:1 ratio) → text-gray-400 (4.6:1, passes WCAG AA) */}
      <p
        className="mt-5 text-gray-400 text-sm sm:text-base max-w-lg mx-auto"
        style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
      >
        Custom online store with Stripe &amp; PayPal, SEO optimized, Self-Hosted Freedom
      </p>

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

      {/*
        ARIA FIX: Removed aria-label from <p>.
        aria-label is prohibited on elements with generic roles (like <p>).
        Lighthouse audit: "Elements use prohibited ARIA attributes".
        aria-live="polite" is kept — it announces typing text to screen readers
        without needing aria-label. The visible text IS the accessible name.
      */}
      <p
        className="mt-8 text-sm sm:text-[17px] font-bold min-h-[26px]"
        style={{ color: '#00d4ff', fontFamily: 'var(--font-syne), Syne, sans-serif' }}
        aria-live="polite"
      >
        {typed}
        <span className="animate-pulse ml-0.5" aria-hidden="true">|</span>
      </p>

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

      {/* CONTRAST FIX: text-white/40 (3.4:1) → text-white/60 (5.5:1, passes AA) */}
      <p
        className="mt-6 text-[12px] sm:text-[13px] text-white/60 max-w-md mx-auto"
        style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
      >
        💡 Most our clients spend <strong className="text-white/80">$0/month</strong> on operations by utilizing professional-grade Free Tiers from Vercel and Supabase.
      </p>

      <div className="mt-10 w-full max-w-3xl mx-auto">
        {/* CONTRAST FIX: text-white/25 fails AA → text-white/50 passes */}
        <p
          className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-4 font-medium"
          style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
        >
          Tech Stack Used in Our Projects
        </p>

        <div className="relative overflow-hidden" aria-hidden="true">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to right, #0b0f1a, transparent)' }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to left, #0b0f1a, transparent)' }} />
          <div className="flex items-center marquee-track whitespace-nowrap">
            {TICKER_ITEMS.map((text, i) => (
              <span
                key={i}
                className="flex-shrink-0 text-[13px] text-white/50 px-8"
                style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', letterSpacing: '0.04em' }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="sr-only">
        <h2>Professional Shopify Alternative</h2>
        <p>MakeMyStore offers custom-coded ecommerce websites with a one-time payment model. Unlike subscription platforms, we provide full ownership, high-speed performance, and advanced SEO features for growing businesses.</p>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 22s linear infinite;
          width: max-content;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}
