'use client'

import { useState } from 'react'
import { portalMessages } from '../../_data/portalData'

export default function DashboardMessages() {
  const [selectedId, setSelectedId] = useState(portalMessages[0].id)
  const [read, setRead] = useState<Record<string, boolean>>({})

  const selected = portalMessages.find((m) => m.id === selectedId)!

  return (
    <div>
      <span className="p1-eyebrow">Messages</span>
      <h1 className="p1-display mt-2 text-3xl font-semibold">Inbox</h1>
      <p className="mt-2 text-sm text-[var(--p1-muted)]">Correspondence tied to your programs.</p>

      <div className="mt-8 grid gap-0 border border-[var(--p1-line)] md:grid-cols-[300px_1fr]">
        <div className="divide-y divide-[var(--p1-line)] border-b border-[var(--p1-line)] md:border-b-0 md:border-r">
          {portalMessages.map((m) => {
            const isUnread = m.unread && !read[m.id]
            return (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedId(m.id)
                  setRead((r) => ({ ...r, [m.id]: true }))
                }}
                className={`block w-full px-4 py-4 text-left transition-colors ${
                  selectedId === m.id ? 'bg-[var(--p1-panel)]' : 'hover:bg-[var(--p1-panel)]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-[var(--p1-muted)]">{m.from}</span>
                  {isUnread && <span className="h-1.5 w-1.5 shrink-0 bg-[var(--p1-brass)]" />}
                </div>
                <p className="mt-1 truncate text-sm font-medium">{m.subject}</p>
                <p className="p1-mono mt-1 text-[10px] text-[var(--p1-muted-2)]">{m.date}</p>
              </button>
            )
          })}
        </div>

        <div className="p-6">
          <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">
            {selected.from.toUpperCase()}
          </span>
          <h2 className="p1-display mt-2 text-xl font-semibold">{selected.subject}</h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--p1-muted)]">{selected.preview}</p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--p1-muted)]">
            This is a demo inbox, so the full thread isn&rsquo;t reproduced here — but on a live
            portal this is where the complete correspondence and attachments would appear.
          </p>
        </div>
      </div>
    </div>
  )
}
