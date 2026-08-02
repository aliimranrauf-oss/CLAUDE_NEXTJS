'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV = [
  { href: '/project-1', label: 'Overview' },
  { href: '/project-1/about', label: 'About' },
  { href: '/project-1/services', label: 'Services' },
  { href: '/project-1/projects', label: 'Projects' },
  { href: '/project-1/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--p1-line)] bg-[var(--p1-bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/project-1" className="flex items-center gap-3">
          <span className="p1-mono flex h-9 w-9 items-center justify-center border border-[var(--p1-brass)] text-[13px] text-[var(--p1-brass)]">
            AM
          </span>
          <span className="p1-display text-[15px] font-semibold tracking-tight">
            Ahmed Al Mansoori
            <span className="p1-mono ml-2 hidden text-[10px] font-normal tracking-widest text-[var(--p1-muted)] sm:inline">
              PROGRAM &amp; STRUCTURAL DELIVERY
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`p1-mono text-[12px] tracking-wide ${
                  active ? 'text-[var(--p1-brass)]' : 'text-[var(--p1-muted)] hover:text-[var(--p1-text)]'
                } transition-colors`}
              >
                {item.label.toUpperCase()}
              </Link>
            )
          })}
          <Link href="/project-1/portal" className="p1-btn">
            Client Portal
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-[var(--p1-line-strong)] md:hidden"
        >
          <span
            className={`block h-px w-4 bg-[var(--p1-text)] transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-4 bg-[var(--p1-text)] transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--p1-line)] px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="p1-mono text-sm tracking-wide text-[var(--p1-muted)]">
                  {item.label.toUpperCase()}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/project-1/portal" className="p1-btn w-full justify-center">
                Client Portal
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
