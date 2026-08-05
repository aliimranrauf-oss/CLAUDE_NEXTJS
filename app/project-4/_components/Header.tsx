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
    if (item.href.endsWith('/treatments')) return settings.nav.showTreatments
    if (item.href.endsWith('/experience')) return settings.nav.showExperience
    if (item.href.endsWith('/journal')) return settings.nav.showJournal
    return true
  })

  // Guaranteed non-empty label: falls back to the hardcoded default the
  // instant the saved value is missing, blank, or still hydrating —
  // this button can never render as an empty pill.
  const connectLabel = (settings.nav.connectLabel || 'Book Consultation').trim() || 'Book Consultation'

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-[var(--p4-bg)]/85 backdrop-blur-md border-b border-[var(--p4-border)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/project-4" className="flex items-center gap-3">
          <span className="p4-display flex h-10 w-10 items-center justify-center rounded-full border border-[var(--p4-clay)] text-[15px] font-semibold text-[var(--p4-clay)]">
            {profile.initials}
          </span>
          <span className="text-[13px] font-semibold tracking-[0.1em] text-[var(--p4-sage-2)]">
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
                  active ? 'text-[var(--p4-sage-2)]' : 'text-[var(--p4-muted)] hover:text-[var(--p4-sage-2)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/project-4/admin"
            className="flex items-center gap-1.5 rounded-full border border-[var(--p4-clay)]/40 bg-[var(--p4-clay-tint)] px-3 py-1.5 text-[11.5px] font-semibold tracking-wide text-[var(--p4-clay)] transition-colors hover:border-[var(--p4-clay)]"
            title="Demo feature — client-editable content & visibility panel"
          >
            <LayoutDashboard size={13} />
            ADMIN PANEL
          </Link>
        </nav>

        <Link href="/project-4/contact" className="p4-btn p4-btn-solid hidden md:inline-flex">
          <span style={{ color: '#fff', display: 'inline-block' }}>
            {connectLabel} →
          </span>
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-[var(--p4-border-strong)] md:hidden"
        >
          <span
            className={`block h-px w-4 bg-[var(--p4-sage-2)] transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-4 bg-[var(--p4-sage-2)] transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--p4-border)] bg-[var(--p4-bg)] px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {visibleNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm font-medium tracking-wide text-[var(--p4-muted)]">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/project-4/admin"
                className="flex w-fit items-center gap-1.5 rounded-full border border-[var(--p4-clay)]/40 bg-[var(--p4-clay-tint)] px-3 py-1.5 text-[11.5px] font-semibold tracking-wide text-[var(--p4-clay)]"
              >
                <LayoutDashboard size={13} />
                ADMIN PANEL
              </Link>
            </li>
            <li>
              <Link href="/project-4/contact" className="p4-btn p4-btn-solid w-full justify-center">
                <span style={{ color: '#fff', display: 'inline-block' }}>
                  {connectLabel} →
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
