'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { supabase, type Template } from '@/lib/supabaseClient'

// ── WhatsApp CTA ───────────────────────────────────────────────────────────
const WA_MESSAGE = encodeURIComponent(
  "Hi Imran, I saw the MakeMyStore home page. I want to own my store with a one-time setup fee. How do we start?"
)
const WA_HREF = `https://wa.me/923293943161?text=${WA_MESSAGE}`

// Preload a single image URL into browser cache
function preloadImage(src: string) {
  if (!src || typeof window === 'undefined') return
  const img = new window.Image()
  img.src = src
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [fading, setFading] = useState(false)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Fetch templates ──────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchTemplates() {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        setError('Failed to load templates.')
      } else {
        setTemplates(data ?? [])
        // Preload first 3 images immediately after fetch
        ;(data ?? []).slice(0, 3).forEach((t: Template) => {
          if (t.desktop_image) preloadImage(t.desktop_image)
        })
      }
      setLoading(false)
    }
    fetchTemplates()
  }, [])

  // ── Preload neighbours whenever current changes ──────────────────────────
  useEffect(() => {
    if (templates.length === 0) return
    const prev = (current - 1 + templates.length) % templates.length
    const next = (current + 1) % templates.length
    if (templates[prev]?.desktop_image) preloadImage(templates[prev].desktop_image!)
    if (templates[next]?.desktop_image) preloadImage(templates[next].desktop_image!)
  }, [current, templates])

  // ── Navigate with fade ───────────────────────────────────────────────────
  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (fading || templates.length === 0) return
      setFading(true)
      setImgLoaded(false)
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
      fadeTimer.current = setTimeout(() => {
        setCurrent((c) => (c + dir + templates.length) % templates.length)
        setFading(false)
      }, 160) // short fade-out, then swap
    },
    [fading, templates.length]
  )

  const prev = useCallback(() => navigate(-1), [navigate])
  const next = useCallback(() => navigate(1), [navigate])

  const goTo = useCallback(
    (i: number) => {
      if (i === current || fading) return
      setFading(true)
      setImgLoaded(false)
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
      fadeTimer.current = setTimeout(() => {
        setCurrent(i)
        setFading(false)
      }, 160)
    },
    [current, fading]
  )

  useEffect(() => () => { if (fadeTimer.current) clearTimeout(fadeTimer.current) }, [])

  const t = templates[current]

  return (
    <section id="templates" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-10">
          <p
            className="text-[11px] uppercase tracking-[0.25em] text-white/30 mb-3 font-medium"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Ready-Made Designs
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Browse Our <span className="text-[#00d4ff]">Templates</span>
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="w-8 h-8 rounded-full border-2 border-[#00d4ff]/30 border-t-[#00d4ff] animate-spin" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-16 text-white/40 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && templates.length === 0 && (
          <div className="text-center py-16 text-white/40 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            No templates found. Add some in your Supabase dashboard.
          </div>
        )}

        {/* Card + Arrows */}
        {!loading && !error && templates.length > 0 && t && (
          <>
            <div className="flex items-center gap-3 sm:gap-5">

              {/* ← Prev */}
              <button
                onClick={prev}
                aria-label="Previous template"
                disabled={fading}
                className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/40 text-white/60 hover:text-[#00d4ff] transition-all duration-200 disabled:opacity-40"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Template Card */}
              <div
                className="flex-1 rounded-2xl border border-white/8 bg-[#111827]/80 overflow-hidden"
                style={{ boxShadow: '0 0 40px rgba(0,212,255,0.06)' }}
              >
                {/* Image area */}
                <div className="relative w-full aspect-[16/9] bg-[#0d1220] overflow-hidden">
                  {t.is_primary && (
                    <span className="absolute top-3 left-3 z-10 text-[11px] font-semibold px-3 py-1 rounded-full bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/25">
                      ✦ Featured
                    </span>
                  )}

                  {/* Skeleton shimmer shown until image loads */}
                  {!imgLoaded && (
                    <div className="absolute inset-0 z-10 skeleton-shimmer" aria-hidden="true" />
                  )}

                  {t.desktop_image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={t.desktop_image} // forces re-mount on src change
                      src={t.desktop_image}
                      alt={t.name ?? 'Template preview'}
                      fetchPriority={current === 0 ? 'high' : 'auto'}
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                      style={{
                        opacity: fading || !imgLoaded ? 0 : 1,
                        transition: 'opacity 0.22s ease',
                      }}
                      onLoad={() => setImgLoaded(true)}
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                        setImgLoaded(true)
                      }}
                    />
                  )}

                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0d1220] to-[#1a2035]" />
                </div>

                {/* Card body */}
                <div
                  className="p-5 sm:p-7"
                  style={{
                    opacity: fading ? 0 : 1,
                    transition: 'opacity 0.18s ease',
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3
                      className="text-lg sm:text-xl font-bold text-white"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {t.name ?? 'Untitled Template'}
                    </h3>
                    {t.category && (
                      <span className="flex-shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">
                        {t.category}
                      </span>
                    )}
                  </div>

                  <p
                    className="text-sm text-white/50 leading-relaxed mb-6"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {t.description ?? ''}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Order — WhatsApp CTA */}
                    <a
                      href={WA_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-sm font-bold px-5 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)',
                        boxShadow: '0 4px 15px rgba(0,212,255,0.25)',
                        color: '#fff',
                      }}
                    >
                      Order This Template →
                    </a>

                    {/* Custom design — WhatsApp CTA */}
                    <a
                      href={WA_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-sm font-semibold px-5 py-3 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/[0.06] transition-all duration-200"
                    >
                      Need Custom Design
                    </a>
                  </div>
                </div>
              </div>

              {/* → Next */}
              <button
                onClick={next}
                aria-label="Next template"
                disabled={fading}
                className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/40 text-white/60 hover:text-[#00d4ff] transition-all duration-200 disabled:opacity-40"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {templates.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to template ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-[#00d4ff]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <p
              className="text-center text-xs text-white/20 mt-3"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {current + 1} / {templates.length}
            </p>
          </>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p
            className="text-sm text-white/40 mb-4"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Don&apos;t see what you need? We build fully custom too.
          </p>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-bold px-8 py-3.5 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)',
              boxShadow: '0 4px 15px rgba(0,212,255,0.3)',
              color: '#fff',
            }}
          >
            Start With MakeMyStore Today →
          </a>
        </div>

      </div>

      {/* Skeleton shimmer CSS */}
      <style jsx>{`
        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.03) 0%,
            rgba(255,255,255,0.07) 50%,
            rgba(255,255,255,0.03) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.2s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </section>
  )
}
