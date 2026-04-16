'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'Free Tools', href: '/tools' },
  { label: 'Pricing',    href: '/pricing' },
  { label: 'Blog',       href: '/blog' },
  { label: 'About',      href: '/about' },
  { label: 'Contact',    href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const orderHref = pathname === '/' ? '#contact' : '/contact'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="MakeMyStore logo"
            width={36}
            height={36}
            className="rounded-lg object-contain"
            style={{ mixBlendMode: 'lighten' }}
          />
          <span className="font-bold text-xl" style={{ fontFamily: 'Syne, sans-serif' }}>
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
              className={`text-sm font-semibold px-3 py-2 rounded-lg transition-all duration-200 border border-transparent
                ${pathname === l.href
                  ? 'text-[#00d4ff] border-[#00d4ff]/20 bg-[#00d4ff]/[0.06]'
                  : 'text-white/75 hover:text-white hover:border-[#00d4ff]/20 hover:bg-[#00d4ff]/[0.06]'
                }`}
              style={{ textShadow: '0 0 8px rgba(0,212,255,0.4)' }}
            >
              {l.label}
            </Link>
          ))}

          {/* Arabic page — separate styled pill */}
          <Link
            href="/ar/badil-salla-zid"
            className={`text-sm font-semibold px-3 py-2 rounded-lg transition-all duration-200 border
              ${pathname === '/ar/badil-salla-zid'
                ? 'text-[#00d4ff] border-[#00d4ff]/40 bg-[#00d4ff]/10'
                : 'text-white/75 border-white/10 hover:text-white hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/[0.06]'
              }`}
          >
            عربي 🇸🇦
          </Link>

          <a href={orderHref} className="btn-primary ml-2 text-sm">
            Order Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold px-4 py-3 rounded-lg text-white/80 hover:text-[#00d4ff] hover:bg-[#00d4ff]/[0.07] transition-all"
              >
                {l.label}
              </Link>
            ))}

            {/* Arabic link in mobile menu */}
            <Link
              href="/ar/badil-salla-zid"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold px-4 py-3 rounded-lg text-white/80 hover:text-[#00d4ff] hover:bg-[#00d4ff]/[0.07] transition-all"
            >
              عربي 🇸🇦
            </Link>

            
              href={orderHref}
              onClick={() => setOpen(false)}
              className="btn-primary text-center text-sm mt-2"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
