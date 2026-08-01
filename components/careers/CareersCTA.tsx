'use client'

// components/careers/CareersCTA.tsx
import { MessageCircle, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/app/careers/LanguageProvider'
import { buildWhatsappUrl, FIVERR_GIG_URL } from '@/app/careers/constants'

export default function CareersCTA() {
  const { dict, dir } = useLanguage()
  const t = dict.finalCta
  const whatsappHref = buildWhatsappUrl(
    "Hi! I'd like to get started on my portfolio website. Can you walk me through the next steps?"
  )

  return (
    <>
      <section className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{t.heading}</h2>
          <p className="font-body mt-4 text-white/65 leading-relaxed">{t.subheading}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <MessageCircle size={16} aria-hidden />
              {t.button}
            </a>
            <a
              href={FIVERR_GIG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
            >
              Fiverr gig ↗
            </a>
          </div>

          <p className="font-body mt-6 inline-flex items-center gap-2 text-xs text-white/35">
            <ShieldCheck size={14} className="text-cyan" aria-hidden />
            {t.guaranteeNote}
          </p>
        </div>
      </section>

      {/*
        Sticky WhatsApp button — fixed bottom corner, mobile only. Uses
        `end-4`/`bottom-5` (logical inline-end) so it lands bottom-left in
        RTL and bottom-right in LTR automatically, matching `dir`.
      */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.stickyLabel}
        dir={dir}
        className="lg:hidden fixed bottom-5 end-4 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_24px_rgba(0,212,255,0.35)]"
        style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)' }}
      >
        <MessageCircle size={24} className="text-[#0b0f1a]" aria-hidden />
      </a>
    </>
  )
}
