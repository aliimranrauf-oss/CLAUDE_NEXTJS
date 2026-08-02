'use client'

import { useState, FormEvent } from 'react'

export default function DashboardSettings() {
  const [saved, setSaved] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifySms, setNotifySms] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2400)
  }

  return (
    <div>
      <span className="p1-eyebrow">Settings</span>
      <h1 className="p1-display mt-2 text-3xl font-semibold">Portal preferences</h1>
      <p className="mt-2 text-sm text-[var(--p1-muted)]">
        Demo settings — changes apply to this session only.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-8">
        <div className="border border-[var(--p1-line)] p-5">
          <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">ORGANISATION PROFILE</span>
          <div className="mt-4 space-y-4">
            <div>
              <label className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">ORGANISATION NAME</label>
              <input defaultValue="Marfa Urban Developments (demo)" className="mt-2 w-full" />
            </div>
            <div>
              <label className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">PRIMARY CONTACT EMAIL</label>
              <input defaultValue="client@marfa-urban.demo" className="mt-2 w-full" />
            </div>
          </div>
        </div>

        <div className="border border-[var(--p1-line)] p-5">
          <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">NOTIFICATIONS</span>
          <div className="mt-4 space-y-3">
            <label className="flex items-center justify-between text-sm">
              Email updates on milestone changes
              <input
                type="checkbox"
                checked={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.checked)}
                className="h-4 w-4 accent-[var(--p1-brass)]"
              />
            </label>
            <label className="flex items-center justify-between text-sm">
              SMS alerts for critical risk items
              <input
                type="checkbox"
                checked={notifySms}
                onChange={(e) => setNotifySms(e.target.checked)}
                className="h-4 w-4 accent-[var(--p1-brass)]"
              />
            </label>
          </div>
        </div>

        <button type="submit" className="p1-btn p1-btn-solid">
          {saved ? 'Saved ✓' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}
