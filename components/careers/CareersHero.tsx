'use client'

// components/careers/CareersHero.tsx
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MessageCircle, Briefcase } from 'lucide-react'
import { useLanguage } from '@/app/careers/LanguageProvider'
import { buildWhatsappUrl, HERO_IMAGES, HERO_SLIDE_INTERVAL_MS } from '@/app/careers/constants'

export default function CareersHero() {
  const { dict } = useLanguage()
  const t = dict.hero
  const whatsappHref = buildWhatsappUrl(
    "Hi! I'm exploring portfolio website packages for my job search. Can you tell me more?"
  )

  // ── Hero image slideshow ──────────────────────────────────────────────
  // Cycles through HERO_IMAGES (see app/careers/constants.ts) one at a
  // time, crossfading between them. Pauses automatically if the array
  // only has one image, and respects prefers-reduced-motion.
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length)
    }, HERO_SLIDE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(1200px 600px at 80% 10%, rgba(0,212,255,0.08), transparent 60%), radial-gradient(900px 500px at 10% 90%, rgba(122,92,255,0.08), transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/[0.06] px-3 py-1 text-xs font-semibold tracking-wide text-cyan">
              <Briefcase size={14} aria-hidden />
              {t.badge}
            </div>

            <h1 className="font-display mt-6 text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              {t.headline}{' '}
              <span className="text-gradient">{t.headlineAccent}</span>
            </h1>

            <p className="font-body mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
              {t.subheadline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <MessageCircle size={16} aria-hidden />
                {t.ctaPrimary}
              </a>
              <a
                href="#packages"
                className="font-body text-sm font-semibold text-white/70 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                {t.ctaSecondary}
                <ArrowRight size={14} aria-hidden />
              </a>
            </div>
          </motion.div>

          {/* Right: portfolio mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            {/*
              Back to aspect-[4/3] — the current hero image is generated at
              a true 4:3 ratio, so no cropping happens here. If you ever
              swap in a differently-shaped image, update this to match.
            */}
            <div className="relative rounded-2xl overflow-hidden border border-cyan/20 shadow-[0_0_60px_rgba(0,212,255,0.08)] aspect-[4/3]">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={HERO_IMAGES[activeSlide]?.src ?? activeSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={HERO_IMAGES[activeSlide]?.src ?? '/careers/careers-hero-1.jpg'}
                    alt={HERO_IMAGES[activeSlide]?.alt ?? t.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={activeSlide === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Slide indicator dots — only shown when there's more than one image */}
              {HERO_IMAGES.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
                  {HERO_IMAGES.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      aria-label={`Show slide ${i + 1}`}
                      onClick={() => setActiveSlide(i)}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === activeSlide ? '18px' : '6px',
                        background:
                          i === activeSlide ? '#00d4ff' : 'rgba(255,255,255,0.35)',
                      }}
                    />
                  ))}
                </div>
              )}

              {/*
                Flowing border line — same technique as DataFlowDiagram.tsx
                on /how-it-works: a faint base line, a bright gradient
                sweep, and a glowing pulse dot traveling continuously.
                Copied as-is (same colors, same glow) and run along the
                bottom edge of the hero image instead of a horizontal
                pipeline between icons.
              */}
              <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] pointer-events-none">
                {/* base line */}
                <div
                  className="absolute inset-0 h-[2px]"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                />
                {/* flowing current sweep */}
                <div
                  className="absolute inset-0 h-[2px] hero-flow-sweep"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, #00d4ff 12%, #7a5cff 30%, transparent 48%, transparent 100%)',
                    backgroundSize: '260% 100%',
                  }}
                />
                {/* traveling pulse */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full hero-flow-pulse"
                  style={{
                    background: '#bff6ff',
                    boxShadow: '0 0 16px 5px rgba(0,212,255,0.65)',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .hero-flow-sweep {
          animation: heroFlowSweep 3.4s linear infinite;
        }
        @keyframes heroFlowSweep {
          0% {
            background-position: 130% 0;
          }
          100% {
            background-position: -160% 0;
          }
        }
        .hero-flow-pulse {
          left: 0%;
          animation: heroFlowPulse 6.8s linear infinite;
        }
        @keyframes heroFlowPulse {
          0% {
            left: 0%;
            opacity: 0;
          }
          6% {
            opacity: 1;
          }
          94% {
            opacity: 1;
          }
          100% {
            left: calc(100% - 10px);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-flow-sweep,
          .hero-flow-pulse {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  )
}
