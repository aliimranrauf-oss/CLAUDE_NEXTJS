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
    if (message.length < 10) nextErrors.message = 'Add a few more details about your concern.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    // Simulated network round-trip — this demo does not send real data anywhere.
    setTimeout(() => setStatus('success'), 1100)
  }

  if (status === 'success') {
    return (
      <div className="p4-card p-9 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p4-clay)]">
          Request received
        </span>
        <h3 className="p4-display mt-3 text-2xl font-semibold text-[var(--p4-sage-2)]">
          Thank you — that&rsquo;s received.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--p4-muted)]">
          This is a demonstration form, so nothing was actually sent, but on a live site
          the clinic would confirm your appointment within one business day.
        </p>
        <button onClick={() => setStatus('idle')} className="p4-btn p4-btn-outline mt-6">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p4-muted-2)]">
            Full name
          </label>
          <input id="name" name="name" type="text" className="mt-2 w-full" placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p4-muted-2)]">
            Email
          </label>
          <input id="email" name="email" type="email" className="mt-2 w-full" placeholder="you@email.com" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p4-muted-2)]">
          Phone (optional)
        </label>
        <input id="phone" name="phone" type="tel" className="mt-2 w-full" placeholder="+971 5X XXX XXXX" />
      </div>

      <div>
        <label htmlFor="type" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p4-muted-2)]">
          Reason for visit
        </label>
        <select id="type" name="type" className="mt-2 w-full">
          <option>Medical dermatology</option>
          <option>Aesthetic &amp; anti-aging</option>
          <option>Laser &amp; light therapy</option>
          <option>Skin cancer screening</option>
          <option>Bridal / pre-event skin prep</option>
          <option>Pediatric dermatology</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p4-muted-2)]">
          Tell me about your concern
        </label>
        <textarea id="message" name="message" rows={5} className="mt-2 w-full" placeholder="What's going on, and how long it's been happening…" />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button type="submit" disabled={status === 'submitting'} className="p4-btn p4-btn-clay w-full sm:w-auto">
        {status === 'submitting' ? 'Sending…' : 'Request appointment →'}
      </button>
    </form>
  )
}
