'use client'

import { useState, FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const message = String(form.get('message') || '').trim()

    const nextErrors: Record<string, string> = {}
    if (name.length < 2) nextErrors.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email address.'
    if (message.length < 10) nextErrors.message = 'Add a few more details about the engagement.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    // Simulated network round-trip — this demo does not send real data anywhere.
    setTimeout(() => setStatus('success'), 1100)
  }

  if (status === 'success') {
    return (
      <div className="p2-card p-9 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p2-gold)]">
          Message received
        </span>
        <h3 className="p2-display mt-3 text-2xl font-semibold text-[var(--p2-navy)]">
          Thank you — that&rsquo;s received.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--p2-muted)]">
          This is a demonstration form, so nothing was actually sent, but on a live site
          you&rsquo;d hear back within one business day.
        </p>
        <button onClick={() => setStatus('idle')} className="p2-btn p2-btn-outline mt-6">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p2-muted-2)]">
            Full name
          </label>
          <input id="name" name="name" type="text" className="mt-2 w-full" placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p2-muted-2)]">
            Email
          </label>
          <input id="email" name="email" type="email" className="mt-2 w-full" placeholder="you@company.com" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="org" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p2-muted-2)]">
          Organization (optional)
        </label>
        <input id="org" name="org" type="text" className="mt-2 w-full" placeholder="Company or group" />
      </div>

      <div>
        <label htmlFor="type" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p2-muted-2)]">
          Engagement type
        </label>
        <select id="type" name="type" className="mt-2 w-full">
          <option>Financial strategy &amp; planning</option>
          <option>Performance optimization</option>
          <option>Risk management</option>
          <option>Investment &amp; growth advisory</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p2-muted-2)]">
          Tell me about the engagement
        </label>
        <textarea id="message" name="message" rows={5} className="mt-2 w-full" placeholder="Scope, timeline, and what stage it's at…" />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button type="submit" disabled={status === 'submitting'} className="p2-btn p2-btn-solid w-full sm:w-auto">
        {status === 'submitting' ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}
