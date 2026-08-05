'use client'

// components/careers/CareersExamples.tsx
//
// Grid of example portfolio mockups. Follows the same card pattern as
// components/space/PortfolioGrid.tsx. Images are placeholders in
// public/careers/ named clearly (careers-example-1.png ... 4.png) so they
// can be swapped later without touching this file.
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/app/careers/LanguageProvider'

const IMAGES = [
  '/careers/careers-example-1.png',
  '/careers/careers-example-2.png',
  '/careers/careers-example-3.png',
  '/careers/careers-example-4.png',
]

// Live demo portfolios, built one at a time. Empty string = not built yet
// (card renders but isn't clickable). These routes are intentionally not
// linked from the main nav — they're only reachable from these cards.
const LIVE_LINKS = ['/project-2', '/project-1', '/project-3', '/project-4']

export default function CareersExamples() {
  const { dict } = useLanguage()
  const t = dict.examples

  return (
    <section className="py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <span className="font-body text-xs font-semibold tracking-widest text-cyan">{t.eyebrow}</span>
        <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{t.heading}</h2>
        <p className="font-body mt-4 max-w-xl text-white/65 leading-relaxed">{t.subheading}</p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => {
            const href = LIVE_LINKS[i % LIVE_LINKS.length]
            const card = (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 transition-colors ${
                  href ? 'hover:border-cyan/50 cursor-pointer' : 'hover:border-cyan/30'
                }`}
              >
                <Image
                  src={IMAGES[i % IMAGES.length]}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(6,8,16,0.85) 0%, rgba(6,8,16,0.25) 35%, rgba(6,8,16,0) 60%)',
                  }}
                />
                {href && (
                  <span className="absolute top-3 right-3 rounded-full bg-cyan/90 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-[#06080f]">
                    Live demo
                  </span>
                )}
                <span className="absolute bottom-3 left-3 right-3 font-display text-sm font-bold text-white">
                  {item.title}
                </span>
              </motion.div>
            )

            return href ? (
              <Link
                key={item.title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo: ${item.title}`}
              >
                {card}
              </Link>
            ) : (
              <div key={item.title}>{card}</div>
            )
          })}
        </div>

        <p className="font-body mt-6 text-xs text-white/35">{t.note}</p>
      </div>
    </section>
  )
}
