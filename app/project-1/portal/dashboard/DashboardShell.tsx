'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { getSession, signOut } from '../auth'

const LINKS = [
  { href: '/project-1/portal/dashboard', label: 'Overview' },
  { href: '/project-1/portal/dashboard/projects', label: 'Projects' },
  { href: '/project-1/portal/dashboard/messages', label: 'Messages' },
  { href: '/project-1/portal/dashboard/settings', label: 'Settings' },
]

export default function DashboardShell({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const session = getSession()
    if (!session) {
      router.replace('/project-1/portal')
      return
    }
    setEmail(session.email)
    setChecked(true)
  }, [router])

  if (!checked) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-5">
        <span className="p1-mono text-xs tracking-widest text-[var(--p1-muted)]">
          VERIFYING SESSION…
        </span>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[220px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="border border-[var(--p1-line)] p-4">
          <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">SIGNED IN AS</span>
          <p className="mt-1 truncate text-xs">{email}</p>
        </div>
        <nav className="mt-4 flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {LINKS.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`p1-mono whitespace-nowrap px-3 py-2 text-[11px] tracking-wide ${
                  active
                    ? 'border border-[var(--p1-brass)] text-[var(--p1-brass)]'
                    : 'border border-transparent text-[var(--p1-muted)] hover:text-[var(--p1-text)]'
                }`}
              >
                {l.label.toUpperCase()}
              </Link>
            )
          })}
        </nav>
        <button
          onClick={() => {
            signOut()
            router.push('/project-1/portal')
          }}
          className="p1-btn mt-4 w-full justify-center"
        >
          Sign out
        </button>
      </aside>

      <div>{children}</div>
    </div>
  )
}
