'use client'

import { Fragment, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Site Speed', href: '/website-speed-optimization' },
  { label: 'Space & Aerospace', href: '/space' },
  { label: 'Careers', href: '/careers' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const CONTACT_URL = '/contact'

// Used only to visually group "Site Speed" + "Space & Aerospace" under a
// "Services" label in the mobile menu — navLinks itself (order/items) is
// untouched so desktop nav and behavior stay exactly as-is.
const SERVICE_HREFS = ['/website-speed-optimization', '/space']

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
        <div className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap text-sm font-semibold px-2.5 py-2 rounded-lg transition-all duration-200 border border-transparent ${
                pathname === l.href
                  ? 'text-[#00d4ff] border-[#00d4ff]/20 bg-[#00d4ff]/[0.06]'
                  : 'text-white/75 hover:text-white hover:border-[#00d4ff]/20 hover:bg-[#00d4ff]/[0.06]'
              }`}
              style={{ textShadow: '0 0 8px rgba(0,212,255,0.4)' }}
            >
              {l.label}
            </Link>
          ))}

          {/* Order Now → /contact */}
          <Link
            href={CONTACT_URL}
            className="btn-primary whitespace-nowrap ml-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d4ff]"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
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
          className="xl:hidden max-h-[calc(100vh-4rem)] overflow-y-auto bg-[#0b0f1a]/98 backdrop-blur-xl border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((l) => (
              <Fragment key={l.href}>
                {/* "Services" divider — inserted right before Site Speed so
                    it and Space & Aerospace read as a grouped set instead of
                    getting lost among the other flat items. */}
                {l.href === '/website-speed-optimization' && (
                  <div className="flex items-center gap-2 px-4 pt-3 pb-1" aria-hidden="true">
                    <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.1)' }} />
                    <span className="text-xs font-semibold text-[#00d4ff]/80 uppercase tracking-widest">
                      Services
                    </span>
                    <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  </div>
                )}
                <Link
                  href={l.href}
                  onClick={closeMenu}
                  className={`text-sm font-semibold px-4 py-3 rounded-lg text-white/80 hover:text-[#00d4ff] hover:bg-[#00d4ff]/[0.07] transition-all ${
                    SERVICE_HREFS.includes(l.href)
                      ? 'ml-3 border-l-2'
                      : ''
                  }`}
                  style={SERVICE_HREFS.includes(l.href) ? { borderColor: 'rgba(0,212,255,0.25)' } : undefined}
                >
                  {l.label}
                </Link>
              </Fragment>
            ))}

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
