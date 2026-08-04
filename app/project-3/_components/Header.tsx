'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { LayoutDashboard } from 'lucide-react'
import { nav, profile } from '../_data/content'
import { useSiteSettings } from '../_context/SiteSettingsContext'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { settings } = useSiteSettings()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visibleNav = nav.slice(1).filter((item) => {
    if (item.href.endsWith('/about')) return settings.nav.showAbout
    if (item.href.endsWith('/work')) return settings.nav.showWork
    if (item.href.endsWith('/services')) return settings.nav.showServices
    if (item.href.endsWith('/journal')) return settings.nav.showJournal
    return true
  })

  // Guaranteed non-empty label: falls back to the hardcoded default the
  // instant the saved value is missing, blank, or still hydrating —
  // this button can never render as an empty pill.
  const connectLabel = (settings.nav.connectLabel || "Let's Talk Brand").trim() || "Let's Talk Brand"

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-[var(--p3-bg)]/90 backdrop-blur-md border-b border-[var(--p3-border)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/project-3" className="flex items-center gap-3">
          <span className="p3-display flex h-10 w-10 items-center justify-center rounded-[3px] border border-[var(--p3-gold)] bg-[var(--p3-wine)] text-[15px] font-semibold italic text-[var(--p3-gold-soft)]">
            {profile.initials}
          </span>
          <span className="text-[13px] font-semibold tracking-[0.14em] text-[var(--p3-ink)]">
            {profile.tagline.toUpperCase()}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {visibleNav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] font-medium tracking-wide transition-colors ${
                  active ? 'text-[var(--p3-ink)]' : 'text-[var(--p3-muted)] hover:text-[var(--p3-ink)]'
                }`}
              >
                {item.label.toUpperCase()}
              </Link>
            )
          })}
          <Link
            href="/project-3/admin"
            className="flex items-center gap-1.5 rounded-full border border-[var(--p3-gold)]/40 bg-[var(--p3-gold-tint)] px-3 py-1.5 text-[11.5px] font-semibold tracking-wide text-[var(--p3-wine)] transition-colors hover:border-[var(--p3-gold)]"
            title="Demo feature — client-editable content & visibility panel"
          >
            <LayoutDashboard size={13} />
            ADMIN PANEL
          </Link>
        </nav>

        <Link href="/project-3/contact" className="p3-btn p3-btn-solid hidden md:inline-flex">
          <span style={{ color: '#fdf6ec', display: 'inline-block' }}>{connectLabel} →</span>
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-[3px] border border-[var(--p3-border-strong)] md:hidden"
        >
          <span
            className={`block h-px w-4 bg-[var(--p3-ink)] transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-4 bg-[var(--p3-ink)] transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--p3-border)] bg-[var(--p3-bg)] px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {visibleNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm font-medium tracking-wide text-[var(--p3-muted)]">
                  {item.label.toUpperCase()}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/project-3/admin"
                className="flex w-fit items-center gap-1.5 rounded-full border border-[var(--p3-gold)]/40 bg-[var(--p3-gold-tint)] px-3 py-1.5 text-[11.5px] font-semibold tracking-wide text-[var(--p3-wine)]"
              >
                <LayoutDashboard size={13} />
                ADMIN PANEL
              </Link>
            </li>
            <li>
              <Link href="/project-3/contact" className="p3-btn p3-btn-solid w-full justify-center">
                <span style={{ color: '#fdf6ec', display: 'inline-block' }}>{connectLabel} →</span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
