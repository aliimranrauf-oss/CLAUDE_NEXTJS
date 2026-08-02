'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, getSession, DEMO_ACCOUNT } from './auth'

export default function PortalLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState(DEMO_ACCOUNT.email)
  const [password, setPassword] = useState(DEMO_ACCOUNT.password)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (getSession()) router.replace('/project-1/portal/dashboard')
  }, [router])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const ok = signIn(email, password)
      setLoading(false)
      if (ok) {
        router.push('/project-1/portal/dashboard')
      } else {
        setError('Those credentials don\u2019t match the demo account. Use the pre-filled details below.')
      }
    }, 500)
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16 sm:px-8">
      <span className="p1-eyebrow">Client Portal</span>
      <h1 className="p1-display mt-3 text-3xl font-semibold">Sign in to your program</h1>
      <p className="mt-3 text-sm leading-relaxed text-[var(--p1-muted)]">
        Demo access only — no real client data lives behind this login. Credentials are
        pre-filled so you can explore freely.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">
            EMAIL
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        {error && <p className="text-xs text-[var(--p1-danger)]">{error}</p>}

        <button type="submit" disabled={loading} className="p1-btn p1-btn-solid w-full justify-center">
          {loading ? 'Signing in…' : 'Sign in →'}
        </button>
      </form>

      <div className="mt-6 border border-dashed border-[var(--p1-line-strong)] p-4 text-xs leading-relaxed text-[var(--p1-muted-2)]">
        <span className="p1-mono text-[var(--p1-brass)]">DEMO ACCOUNT</span>
        <br />
        {DEMO_ACCOUNT.email} / {DEMO_ACCOUNT.password}
      </div>

      <Link href="/project-1" className="p1-mono mt-8 text-[11px] tracking-wide text-[var(--p1-muted)] hover:text-[var(--p1-text)]">
        ← Back to portfolio
      </Link>
    </div>
  )
}
