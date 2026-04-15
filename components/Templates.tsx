'use client'

import { useEffect, useState } from 'react'
import { supabase, type Template } from '@/lib/supabaseClient'

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTemplates() {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('is_primary', { ascending: false })
        .order('created_at', { ascending: false })

      if (!error && data) setTemplates(data)
      setLoading(false)
    }
    fetchTemplates()
  }, [])

  const prev = () => setCurrent((c) => (c === 0 ? templates.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === templates.length - 1 ? 0 : c + 1))

  return (
    <section id="templates" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#00d4ff] uppercase tracking-widest mb-3 block">
            Store Templates
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-white"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            Ready-Made Designs,{' '}
            <span className="shimmer-text">Fully Customized</span> for You
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Every template is a starting point — we tailor it completely to your brand, products, and goals.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div
            className="rounded-2xl overflow-hidden animate-pulse max-w-3xl mx-auto"
            style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="aspect-video bg-white/5" />
            <div className="p-6 space-y-3">
              <div className="h-6 bg-white/10 rounded w-1/3" />
              <div className="h-4 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && templates.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Templates coming soon. Check back shortly!</p>
          </div>
        )}

        {/* Carousel */}
        {!loading && templates.length > 0 && (
          <>
            {/* Card */}
            <div
              className="relative rounded-2xl overflow-hidden max-w-3xl mx-auto transition-all duration-300"
              style={{
                background: 'var(--card)',
                border: templates[current].is_primary
                  ? '2px solid rgba(0,212,255,0.4)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: templates[current].is_primary
                  ? '0 0 32px rgba(0,212,255,0.12)'
                  : 'none',
              }}
            >
              {templates[current].is_primary && (
                <div
                  className="absolute top-4 left-4 z-10 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'var(--gradient)', color: '#0b0f1a' }}
                >
                  ⭐ Featured
                </div>
              )}

              {/* Desktop image */}
              <div className="relative w-full aspect-video bg-[#0b0f1a] overflow-hidden">
                {templates[current].desktop_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={templates[current].desktop_image}
                    alt={`${templates[current].name} desktop preview`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    No preview available
                  </div>
                )}

                {/* Mobile thumbnail */}
                {templates[current].mobile_image && (
                  <div className="absolute bottom-3 right-3 w-16 rounded-xl overflow-hidden border-2 border-[#00d4ff]/40 shadow-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={templates[current].mobile_image}
                      alt={`${templates[current].name} mobile preview`}
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3
                    className="font-bold text-white text-xl"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {templates[current].name}
                  </h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 whitespace-nowrap">
                    {templates[current].category}
                  </span>
                </div>
                {templates[current].description && (
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {templates[current].description}
                  </p>
                )}
                <div className="mt-5">
                  <a
                    href="https://www.fiverr.com/s/kLB1m0k"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm inline-block"
                  >
                    Get this template on Fiverr →
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all text-xl font-bold"
                aria-label="Previous template"
              >
                ←
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {templates.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: i === current ? '24px' : '8px',
                      height: '8px',
                      background: i === current ? '#00d4ff' : 'rgba(255,255,255,0.2)',
                    }}
                    aria-label={`Go to template ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all text-xl font-bold"
                aria-label="Next template"
              >
                →
              </button>
            </div>

            {/* Counter */}
            <p className="text-center text-gray-500 text-sm mt-3">
              {current + 1} / {templates.length}
            </p>
          </>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Don't see what you need? We build fully custom too.</p>
          <a
            href="https://www.fiverr.com/s/kLB1m0k"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Request a Custom Design on Fiverr →
          </a>
        </div>
      </div>
    </section>
  )
}
