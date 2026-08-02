'use client'

import { useState, FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

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
    if (message.length < 10) nextErrors.message = 'Add a few more details about the program.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    // Simulated network round-trip — this demo does not send real data anywhere.
    setTimeout(() => setStatus('success'), 1100)
  }

  if (status === 'success') {
    return (
      <div className="p1-plate p-8 text-center">
        <span className="p1-mono text-[11px] tracking-widest text-[var(--p1-brass)]">MESSAGE LOGGED</span>
        <h3 className="p1-display mt-3 text-2xl font-semibold">Thank you — that&rsquo;s received.</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--p1-muted)]">
          This is a demonstration form, so nothing was actually sent, but on a live site
          you&rsquo;d hear back within one business day.
        </p>
        <button onClick={() => setStatus('idle')} className="p1-btn mt-6">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">
            FULL NAME
          </label>
          <input id="name" name="name" type="text" className="mt-2 w-full" placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-[var(--p1-danger)]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">
            EMAIL
          </label>
          <input id="email" name="email" type="email" className="mt-2 w-full" placeholder="you@company.com" />
          {errors.email && <p className="mt-1 text-xs text-[var(--p1-danger)]">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="org" className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">
          ORGANISATION (OPTIONAL)
        </label>
        <input id="org" name="org" type="text" className="mt-2 w-full" placeholder="Company or authority" />
      </div>

      <div>
        <label htmlFor="type" className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">
          ENGAGEMENT TYPE
        </label>
        <select id="type" name="type" className="mt-2 w-full">
          <option>Program direction</option>
          <option>Structural &amp; technical review</option>
          <option>Delivery &amp; commissioning</option>
          <option>Sustainability &amp; retrofit strategy</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">
          TELL ME ABOUT THE PROGRAM
        </label>
        <textarea id="message" name="message" rows={5} className="mt-2 w-full" placeholder="Scope, timeline, and what stage it's at…" />
        {errors.message && <p className="mt-1 text-xs text-[var(--p1-danger)]">{errors.message}</p>}
      </div>

      <button type="submit" disabled={status === 'submitting'} className="p1-btn p1-btn-solid w-full sm:w-auto">
        {status === 'submitting' ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}
