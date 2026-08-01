'use client'

// components/careers/CareersFAQ.tsx
//
// Simple accordion built with useState, matching the visual pattern already
// used for FaqItem in app/pricing/page.tsx (rounded card, +/× toggle icon).
import { useState } from 'react'
import { useLanguage } from '@/app/careers/LanguageProvider'

function FaqRow({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="font-display w-full flex items-center justify-between gap-4 px-5 py-4 text-start font-semibold text-white/80 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-inset"
      >
        <span>{question}</span>
        <span
          aria-hidden
          className={`text-cyan transition-transform duration-200 shrink-0 text-xl leading-none font-light ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="font-body px-5 pb-4 pt-3 text-[13px] text-white/50 leading-relaxed border-t border-white/8">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function CareersFAQ() {
  const { dict } = useLanguage()
  const t = dict.faq
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <span className="font-body text-xs font-semibold tracking-widest text-cyan">{t.eyebrow}</span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{t.heading}</h2>
        </div>

        <div className="mt-10 space-y-2.5">
          {t.items.map((item, i) => (
            <FaqRow
              key={item.q}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
