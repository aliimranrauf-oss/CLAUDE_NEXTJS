'use client'

// components/careers/CareersHowItWorks.tsx
import { motion } from 'framer-motion'
import { useLanguage } from '@/app/careers/LanguageProvider'

export default function CareersHowItWorks() {
  const { dict } = useLanguage()
  const t = dict.howItWorks

  return (
    <section className="py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-body text-xs font-semibold tracking-widest text-cyan">{t.eyebrow}</span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{t.heading}</h2>
          <p className="font-body mt-4 text-white/65 leading-relaxed">{t.subheading}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-6"
            >
              <span className="font-display text-4xl font-bold text-white/10">{step.step}</span>
              <h3 className="font-display mt-3 text-lg font-bold">{step.title}</h3>
              <p className="font-body mt-2 text-sm text-white/60 leading-relaxed">{step.description}</p>
              <span className="font-body mt-4 inline-flex items-center rounded-full border border-violet/25 bg-violet/[0.08] px-2.5 py-1 text-[11px] font-bold text-violet">
                {step.days}
              </span>

              {/* Connector line, desktop only, skipped on the last item */}
              {i < t.steps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden lg:block absolute top-11 -right-3 w-6 h-px bg-white/15"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
