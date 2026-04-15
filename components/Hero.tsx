'use client'

import { useState, useEffect } from 'react'

const TYPING_TEXT = '✦ Built by Real Experts, Powered by AI — Fully Custom & SEO Optimized'

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setTyped(TYPING_TEXT.slice(0, i + 1))
      i++
      if (i >= TYPING_TEXT.length) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#00d4ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#7a5cff]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="animate-float mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="MakeMyStore"
          width={100}
          height={100}
          className="mx-auto rounded-2xl object-contain"
          style={{
            mixBlendMode: 'lighten',
            filter: 'drop-shadow(0 0 24px rgba(122,92,255,0.55))',
          }}
        />
      </div>

      {/* Headline — compact font matching RIGHT screenshot */}
      <h1
        className="font-extrabold leading-tight"
        style={{
          fontFamily: 'Syne, sans-serif',
          letterSpacing: '-0.02em',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          maxWidth: '600px',
        }}
      >
        Build Your Ecommerce Website
        <br />
        <span className="shimmer-text">One-Time Cost, No Monthly Fees</span>
      </h1>

      {/* Subtext */}
      <p className="mt-4 text-gray-400 text-base max-w-lg">
        Custom online store with Stripe &amp; PayPal, SEO optimized, fast hosting
      </p>

      {/* Benefit badges */}
      <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
        {['🚀 Live in 3–10 days', '💳 Stripe & PayPal Ready', '🔒 No platform lock-in'].map((b) => (
          <span
            key={b}
            className="glass px-4 py-2 rounded-full text-white/80 border border-[#00d4ff]/15 text-sm"
          >
            {b}
          </span>
        ))}
      </div>

      {/* Typing line */}
      <p
        className="mt-6 font-bold min-h-[26px]"
        style={{ color: '#00d4ff', fontFamily: 'Syne, sans-serif', fontSize: '1rem' }}
      >
        {typed}
        <span className="animate-pulse">|</span>
      </p>

      {/* CTA */}
      <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#pricing"
          className="btn-primary text-base"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Get Your Store →
        </a>
        <a
          href="#templates"
          className="px-7 py-3 rounded-xl border border-white/15 text-white/80 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all duration-200 text-base font-semibold"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          See Templates
        </a>
      </div>

      {/* YouTube lazy embed */}
      <div className="mt-14 w-full max-w-3xl mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden bg-black"
          style={{
            aspectRatio: '16/9',
            border: '2px solid rgba(0,212,255,0.35)',
            boxShadow: '0 0 40px rgba(0,212,255,0.15)',
          }}
        >
          {!videoLoaded ? (
            <button
              onClick={() => setVideoLoaded(true)}
              className="w-full h-full absolute inset-0 group"
              aria-label="Play video"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.ytimg.com/vi/D7jsdZtfeu8/hqdefault.jpg"
                alt="MakeMyStore demo video"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: 'rgba(255,0,0,0.9)', boxShadow: '0 0 30px rgba(255,0,0,0.5)' }}
                >
                  <span className="text-white text-4xl ml-1">▶</span>
                </div>
              </div>
            </button>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/D7jsdZtfeu8?rel=0&modestbranding=1&autoplay=1"
              title="MakeMyStore — Custom Ecommerce"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          )}
        </div>
      </div>
    </section>
  )
}
