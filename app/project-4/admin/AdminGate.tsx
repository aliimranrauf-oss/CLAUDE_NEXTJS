'use client'

import { useEffect, useState, FormEvent } from 'react'
import AdminDashboard from './AdminDashboard'

// Not real security — this is a static demo site with no backend/auth,
// so anyone with the code (or dev tools) can get past this. It exists
// purely to keep the panel from being casually stumbled into. Change
// this constant to whatever you'd like before sharing the demo link.
const ADMIN_PIN = 'project4'
const SESSION_KEY = 'p4_admin_unlocked'

export default function AdminGate() {
  const [unlocked, setUnlocked] = useState(false)
  const [checked, setChecked] = useState(false)
  // Pre-filled so the code field always matches ADMIN_PIN above — change
  // ADMIN_PIN and this default together if you want to update the code.
  const [pin, setPin] = useState(ADMIN_PIN)
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      setUnlocked(window.sessionStorage.getItem(SESSION_KEY) === '1')
    } catch {
      // ignore
    } finally {
      setChecked(true)
    }
  }, [])

  function unlock() {
    setUnlocked(true)
    setError(false)
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // ignore
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      unlock()
    } else {
      setError(true)
    }
  }

  if (!checked) return null

  if (!unlocked) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-5 text-center">
        <span className="p4-eyebrow">Admin</span>
        <h1 className="p4-display mt-4 text-2xl font-semibold text-[var(--p4-sage-2)]">
          Enter access code
        </h1>
        <p className="mt-2 text-[13px] text-[var(--p4-muted)]">
          This panel edits demo content — the code is pre-filled, just press Continue.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 w-full" autoComplete="off">
          <input
            type="text"
            inputMode="text"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value)
              setError(false)
            }}
            autoFocus
            onFocus={(e) => e.currentTarget.select()}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-1p-ignore="true"
            data-form-type="other"
            name="p4-admin-code"
            className="w-full text-center tracking-widest"
            style={{ WebkitTextSecurity: 'disc' } as React.CSSProperties}
            placeholder="Access code"
          />
          {error && <p className="mt-2 text-xs text-red-500">Incorrect code — try again.</p>}
          <button type="submit" className="p4-btn p4-btn-solid mt-4 w-full justify-center">
            Continue →
          </button>
        </form>
        <button
          type="button"
          onClick={unlock}
          className="p4-underline mt-4 text-[12px] text-[var(--p4-muted-2)]"
        >
          Trouble with the code? Skip straight in →
        </button>
      </div>
    )
  }

  return <AdminDashboard />
}
