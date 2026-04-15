'use client'

import { useState, useEffect } from 'react'

const TYPING_TEXT = '✦ Built by Real Experts, Powered by AI — Fully Custom & SEO Optimized'

export default function LandingPage() {
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
    <div className="bg-black text-white min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#00d4ff]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#7a5cff]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="animate-float mb-8">
          <img
            src="/logo.png"
            alt="MakeMyStore - Custom Ecommerce Solutions"
            width={70} 
            height={70}
            className="mx-auto rounded-2xl object-contain"
            style={{
              mixBlendMode: 'lighten',
              filter: 'drop-shadow(0 0 20px rgba(122,92,255,0.4))',
            }}
          />
        </div>

        {/* Hero Headline - Fixed Size & Font */}
        <h1
          className="text-4xl sm:text-[42px] font-bold leading-[1.2] max-w-2xl mx-auto"
          style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
        >
          Build Your Ecommerce Website
          <br />
          <span className="text-[#40e0ff] block mt-1">One-Time Cost, No Monthly Fees</span>
        </h1>

        <p className="mt-5 text-gray-500 text-sm sm:text-base max-w-lg mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Custom online store with Stripe &amp; PayPal, SEO optimized, fast hosting
        </p>

        <div className="mt-5 flex flex-wrap justify-center items-center gap-1 text-[13px] sm:text-sm text-white/70" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          <span>🚀 Live in 3–10 days</span>
          <span className="text-white/20 mx-1">|</span>
          <span>💳 Stripe &amp; PayPal Ready</span>
          <span className="text-white/20 mx-1">|</span>
          <span>🔒 No platform lock-in</span>
        </div>

        <p className="mt-8 text-sm sm:text-[17px] font-bold min-h-[26px]" style={{ color: '#00d4ff', fontFamily: 'Syne, sans-serif' }}>
          {typed}<span className="animate-pulse ml-0.5">|</span>
        </p>

        <div className="mt-8 flex justify-center">
          <a href="#pricing" className="btn-primary text-sm px-8 py-3.5 rounded-lg font-bold transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)', boxShadow: '0 4px 15px rgba(0,212,255,0.3)' }}>
            Get Your Store →
          </a>
        </div>

        <div className="mt-12 w-full max-w-[700px] mx-auto">
          <div className="relative rounded-xl overflow-hidden bg-black" style={{ aspectRatio: '16/9', border: '1px solid rgba(0,212,255,0.2)', boxShadow: '0 0 30px rgba(0,212,255,0.1)' }}>
            {!videoLoaded ? (
              <button onClick={() => setVideoLoaded(true)} className="w-full h-full absolute inset-0 group">
                <img src="https://i.ytimg.com/vi/D7jsdZtfeu8/hqdefault.jpg" alt="Ecommerce Demo" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                  </div>
                </div>
              </button>
            ) : (
              <iframe src="https://www.youtube.com/embed/D7jsdZtfeu8?rel=0&autoplay=1" title="MakeMyStore Demo" className="absolute inset-0 w-full h-full border-0" allowFullScreen />
            )}
          </div>
        </div>
      </section>

      {/* --- READY-MADE DESIGNS SECTION --- */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 
            className="text-3xl sm:text-[40px] font-bold leading-[1.2] text-white"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            Ready-Made Designs, 
            <br />
            <span className="text-[#40e0ff]">Fully Customized</span> for You
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40">
             <div className="border border-white/10 rounded-2xl h-48 flex items-center justify-center">Design 1</div>
             <div className="border border-white/10 rounded-2xl h-48 flex items-center justify-center">Design 2</div>
             <div className="border border-white/10 rounded-2xl h-48 flex items-center justify-center">Design 3</div>
          </div>
        </div>
      </section>

      {/* --- COMPARISON SECTION --- */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 
            className="text-3xl sm:text-[40px] font-bold leading-[1.2] text-white"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            How We Stack Up 
            <br />
            <span className="text-[#40e0ff]">Against the Rest</span>
          </h2>
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-black/40 text-left">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4">Feature</th>
                  <th className="p-4">Others</th>
                  <th className="p-4 text-[#40e0ff] text-right">MakeMyStore</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/5"><td className="p-4">Monthly Fee</td><td className="p-4 text-red-400">$39+</td><td className="p-4 text-[#40e0ff] text-right font-bold">$0</td></tr>
                <tr><td className="p-4">Ownership</td><td className="p-4">Rented</td><td className="p-4 text-[#40e0ff] text-right font-bold">100% Yours</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h2>Professional Shopify Alternative</h2>
        <p>MakeMyStore offers custom-coded ecommerce websites with a one-time payment model for full ownership and high performance.</p>
      </div>
    </div>
  )
}
