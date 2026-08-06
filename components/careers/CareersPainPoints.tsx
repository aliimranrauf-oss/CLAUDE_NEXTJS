'use client'

// components/careers/CareersPainPoints.tsx
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Bot, SearchX, Users, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/app/careers/LanguageProvider'

const ICONS = [Bot, SearchX, Users]

type CareersPainPointsProps = {
  blogImages?: Record<string, string>
}

export default function CareersPainPoints({ blogImages = {} }: CareersPainPointsProps) {
  const { dict, lang } = useLanguage()
  const t = dict.painPoints
  const readMoreLabel = lang === 'ar' ? 'اقرأ المزيد' : 'Read more'

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
            // Arabic slugs end in "-ar" but share the same hero image as
            // their English counterpart, so strip that suffix for lookup.
            const imageKey = item.slug.replace(/-ar$/, '')
            const heroImage = blogImages[imageKey]

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={`/blog/${item.slug}?from=careers`}
                  className="group block h-full rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden hover:border-cyan/25 transition-colors"
                >
                  {heroImage ? (
                    <div className="relative w-full h-40 overflow-hidden">
                      <Image
                        src={heroImage}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a] via-transparent to-transparent" />
                      <div className="absolute bottom-3 start-3 inline-flex items-center justify-center w-10 h-10 rounded-xl border border-violet/25 bg-[#0b0f1a]/80 backdrop-blur text-violet">
                        <Icon size={18} aria-hidden />
                      </div>
                    </div>
                  ) : (
                    <div className="pt-6 px-6">
                      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-violet/25 bg-violet/[0.08] text-violet mb-1">
                        <Icon size={20} aria-hidden />
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
                    <p className="font-body text-sm text-white/60 leading-relaxed">{item.description}</p>
                    <span className="font-body mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      {readMoreLabel}
                      <ArrowRight size={13} aria-hidden className="rtl:rotate-180" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
