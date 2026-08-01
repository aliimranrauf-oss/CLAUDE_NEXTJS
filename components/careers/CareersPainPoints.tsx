'use client'

// components/careers/CareersPainPoints.tsx
import { motion } from 'framer-motion'
import { Bot, SearchX, Users } from 'lucide-react'
import { useLanguage } from '@/app/careers/LanguageProvider'

const ICONS = [Bot, SearchX, Users]

export default function CareersPainPoints() {
  const { dict } = useLanguage()
  const t = dict.painPoints

  return (
    <section className="py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <span className="font-body text-xs font-semibold tracking-widest text-cyan">{t.eyebrow}</span>
        <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight max-w-2xl">
          {t.heading}
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 hover:border-cyan/25 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-violet/25 bg-violet/[0.08] text-violet mb-5">
                  <Icon size={20} aria-hidden />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
