'use client'

import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const saved = sessionStorage.getItem('mms_admin')
    if (saved === ADMIN_PASSWORD) setAuthed(true)
    setChecking(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('mms_admin', pw)
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (checking) return null

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0b0f1a' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(0,212,255,0.15)',
          borderRadius: 16,
          padding: '2.5rem',
          width: '100%',
          maxWidth: 380,
        }}>
          <div className="text-center mb-8">
            <div style={{
              width: 48, height: 48,
              background: 'linear-gradient(135deg,#00d4ff,#7a5cff)',
              borderRadius: 12,
              margin: '0 auto 1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h1 style={{ color: 'white', fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 22 }}>Admin Access</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 }}>MakeMyStore.online</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="password"
              placeholder="Enter password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false) }}
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
            {error && <p style={{ color: '#ff4d6d', fontSize: 12, margin: 0 }}>Wrong password. Try again.</p>}
            <button type="submit" style={{
              background: 'linear-gradient(135deg,#00d4ff,#7a5cff)',
              border: 'none',
              borderRadius: 10,
              padding: '12px',
              color: 'white',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              width: '100%',
            }}>
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0f1a' }}>
      {/* Top bar */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg,#00d4ff,#7a5cff)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          </div>
          <span style={{ color: 'white', fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 16 }}>
            MMS <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>Admin</span>
          </span>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem('mms_admin'); setAuthed(false) }}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: '6px 14px',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  )
}
