'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [pw, setPw] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Wrong password. Try again.')
        return
      }
      router.replace('/admin')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0b0f1a' }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(0,212,255,0.15)',
          borderRadius: 16,
          padding: '2.5rem',
          width: '100%',
          maxWidth: 380,
        }}
      >
        <div className="text-center mb-8">
          <div
            style={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg,#00d4ff,#7a5cff)',
              borderRadius: 12,
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 style={{ color: 'white', fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 22 }}>
            Admin Access
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 }}>MakeMyStore.online</p>
        </div>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="password"
            placeholder="Enter password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value)
              setError(null)
            }}
            autoFocus
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: error ? '1px solid #ff4d6d' : '1px solid rgba(0,212,255,0.2)',
              borderRadius: 10,
              padding: '12px 16px',
              color: 'white',
              fontSize: 14,
              outline: 'none',
              width: '100%',
            }}
          />
          {error && <p style={{ color: '#ff4d6d', fontSize: 12, margin: 0 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg,#00d4ff,#7a5cff)',
              border: 'none',
              borderRadius: 10,
              padding: '12px',
              color: 'white',
              fontWeight: 700,
              fontSize: 14,
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.7 : 1,
              width: '100%',
            }}
          >
            {loading ? 'Checking…' : 'Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}
