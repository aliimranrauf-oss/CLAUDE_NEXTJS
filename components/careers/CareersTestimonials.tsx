'use client'

// components/careers/CareersTestimonials.tsx
//
// Adapts the visual language of components/ReviewsSection.tsx (dark cards,
// cyan star ratings, initial-letter avatars, cyan accent eyebrow) as a
// static grid rather than duplicating its Supabase-fetch + marquee logic,
// since this section only needs a handful of curated testimonials.
//
// PLACEHOLDER CONTENT: all 3 testimonials below are draft placeholders —
// see app/careers/dictionary.ts to swap in real client quotes.
import { motion } from 'framer-motion'
import { useLanguage } from '@/app/careers/LanguageProvider'

function StarRating({ rating }: { rating: number }) {
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < rating ? '#00d4ff' : 'rgba(255,255,255,0.12)'}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  )
}

function InitialAvatar({ name }: { name: string }) {
  const hue = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  return (
    <div
      aria-hidden="true"
      className="w-9 h-9 rounded-full flex items-center justify-center font-display text-sm font-bold shrink-0"
      style={{
        background: `hsl(${hue}, 60%, 25%)`,
        border: '2px solid rgba(0,212,255,0.25)',
        color: `hsl(${hue}, 80%, 75%)`,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

export default function CareersTestimonials() {
  const { dict } = useLanguage()
  const t = dict.testimonials

  return (
    <section className="py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-body text-xs font-semibold tracking-widest text-cyan">{t.eyebrow}</span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{t.heading}</h2>
          <p className="font-body mt-4 text-white/65 leading-relaxed">{t.subheading}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {t.items.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl border border-cyan/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <InitialAvatar name={review.name} />
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-white truncate">{review.name}</p>
                  <p className="font-body text-xs text-white/60 truncate">{review.role}</p>
                </div>
                <div className="ms-auto">
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className="font-body text-sm text-white/75 leading-relaxed">&ldquo;{review.message}&rdquo;</p>
            </motion.div>
          ))}
        </div>

        {/* Draft-content notice, visible so it's clear these need to be replaced before launch */}
        <p className="font-body text-center text-[11px] text-white/30 mt-8">{t.placeholderNote}</p>
      </div>
    </section>
  )
}
