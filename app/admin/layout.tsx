'use client'

import { usePathname, useRouter } from 'next/navigation'

// ── Admin shell ──────────────────────────────────────────────────────────
// Auth is now enforced server-side by middleware.ts (see project root),
// which checks an httpOnly signed session cookie BEFORE this component,
// or any admin JS, ever reaches the browser. This file no longer contains
// any password — it only renders the dashboard chrome and a logout button.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login'

  const handleLogout = async () => {
    await fetch('/api/admin-auth', { method: 'DELETE' })
    router.replace('/admin/login')
    router.refresh()
  }

  if (isLoginPage) {
    return <div style={{ minHeight: '100vh', background: '#0b0f1a' }}>{children}</div>
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
          onClick={handleLogout}
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
