'use client'

// app/tools/tools/ToolCTA.tsx
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { ArrowRight, Mail, CheckCircle } from 'lucide-react'

interface ToolCTAProps {
  toolName: string
}

export default function ToolCTA({ toolName }: ToolCTAProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await supabase.from('leads').insert({
        email,
        tool_used: toolName,
        created_at: new Date().toISOString(),
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="mt-8 rounded-2xl p-7 text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(122,92,255,0.12))',
        border: '1px solid rgba(0,212,255,0.25)',
      }}
    >
      <div className="text-3xl mb-2">🚀</div>
      <h3
        className="text-xl font-extrabold text-white mb-2"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        Get Your Ecommerce Store Built
      </h3>
      <p className="text-[#999] text-sm mb-5">
        One-time payment. No monthly fees. Live in 3–10 days. Built by real experts — not a
        template.
      </p>

      {submitted ? (
        <div className="flex items-center justify-center gap-2 font-semibold text-[#00ffaa]">
          <CheckCircle size={20} />
          We&apos;ll be in touch shortly!
        </div>
      ) : (
        <>
          <div className="flex gap-2 max-w-sm mx-auto">
            <div className="relative flex-1">
              <Mail
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]"
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full pl-9 pr-3 py-2.5 text-sm text-white rounded-lg outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary text-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              {loading ? '...' : <><span>Get Started</span><ArrowRight size={14} /></>}
            </button>
          </div>

          {error && <p className="text-[#ff6b6b] text-xs mt-2">{error}</p>}
          <p className="text-[#555] text-xs mt-2.5">No spam. Just a free consultation.</p>
        </>
      )}

      <div className="mt-4">
        <a
          href="/pricing"
          className="text-[#00d4ff] text-sm font-semibold inline-flex items-center gap-1 hover:underline"
        >
          View Pricing <ArrowRight size={12} />
        </a>
      </div>
    </div>
  )
}
