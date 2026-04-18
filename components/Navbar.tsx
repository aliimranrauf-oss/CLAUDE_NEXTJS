'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Free Tools', href: '/tools' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const CONTACT_URL = '/contact'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Throttle scroll listener for performance
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const closeMenu = useCallback(() => setOpen(false), [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="MakeMyStore home">
          {/*
            ── CLS fix ───────────────────────────────────────────────────────
            Added explicit width/height attributes AND inline style dimensions.
            Without these the browser doesn't know the image size until it loads,
            causing layout shift (CLS penalty). The preload in layout.tsx ensures
            the image is already cached before render.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="MakeMyStore logo"
            width={36}
            height={36}
            fetchPriority="high"
            decoding="async"
            className="rounded-lg object-contain"
            style={{ mixBlendMode: 'lighten', width: 36, height: 36 }}
          />
          <span
            className="font-bold text-xl"
            style={{ fontFamily: 'var(--font-syne), Syne, sans-serif' }}
          >
            <span className="text-gradient">MakeMyStore</span>
            <span className="text-gray-400">.online</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold px-3 py-2 rounded-lg transition-all duration-200 border border-transparent ${
                pathname === l.href
                  ? 'text-[#00d4ff] border-[#00d4ff]/20 bg-[#00d4ff]/[0.06]'
                  : 'text-white/75 hover:text-white hover:border-[#00d4ff]/20 hover:bg-[#00d4ff]/[0.06]'
              }`}
              style={{ textShadow: '0 0 8px rgba(0,212,255,0.4)' }}
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="/ar/badil-salla-zid"
            className={`text-sm font-semibold px-3 py-2 rounded-lg transition-all duration-200 border ${
              pathname === '/ar/badil-salla-zid'
                ? 'text-[#00d4ff] border-[#00d4ff]/40 bg-[#00d4ff]/10'
                : 'text-white/75 border-white/10 hover:text-white hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/[0.06]'
            }`}
          >
            بديل سلة وزد 🇸🇦
          </Link>

          {/* ── ADDED: Pakistan Urdu page ── */}
          <Link
            href="/pk"
            className={`text-sm font-semibold px-3 py-2 rounded-lg transition-all duration-200 border ${
              pathname === '/pk'
                ? 'text-[#00d4ff] border-[#00d4ff]/40 bg-[#00d4ff]/10'
                : 'text-white/75 border-white/10 hover:text-white hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/[0.06]'
            }`}
          >
            آن لائن اسٹور 🇵🇰
          </Link>

          {/* Order Now → /contact */}
          <Link
            href={CONTACT_URL}
            className="btn-primary ml-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d4ff]"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden glass border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="text-sm font-semibold px-4 py-3 rounded-lg text-white/80 hover:text-[#00d4ff] hover:bg-[#00d4ff]/[0.07] transition-all"
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="/ar/badil-salla-zid"
              onClick={closeMenu}
              className="text-sm font-semibold px-4 py-3 rounded-lg text-white/80 hover:text-[#00d4ff] hover:bg-[#00d4ff]/[0.07] transition-all"
            >
              بديل سلة وزد 🇸🇦
            </Link>

            {/* ── ADDED: Pakistan Urdu page ── */}
            <Link
              href="/pk"
              onClick={closeMenu}
              className="text-sm font-semibold px-4 py-3 rounded-lg text-white/80 hover:text-[#00d4ff] hover:bg-[#00d4ff]/[0.07] transition-all"
            >
              آن لائن اسٹور 🇵🇰
            </Link>

            {/* Order Now → /contact */}
            <Link
              href={CONTACT_URL}
              onClick={closeMenu}
              className="btn-primary text-center text-sm mt-2"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
