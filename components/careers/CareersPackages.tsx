'use client'

// components/careers/CareersPackages.tsx
//
// 3-column package cards. The "Career Brand Package" is marked
// Most Popular / Recommended using the same highlighted-border + badge
// treatment used for the featured tier in app/pricing/page.tsx.
import { motion } from 'framer-motion'
import { Check, MessageCircle, Sparkles } from 'lucide-react'
import { useLanguage } from '@/app/careers/LanguageProvider'
import { buildWhatsappUrl } from '@/app/careers/constants'
import type { PackageItem } from '@/app/careers/dictionary'

function PackageCard({ pkg, index }: { pkg: PackageItem; index: number }) {
  const whatsappHref = buildWhatsappUrl(pkg.whatsappMessage)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      aria-label={pkg.name}
      className={`relative rounded-2xl flex flex-col transition-all duration-300 ${
        pkg.highlight
          ? 'border-2 border-cyan bg-cyan/[0.06] shadow-[0_0_70px_rgba(0,212,255,0.18)] lg:-translate-y-3 lg:scale-[1.04] z-10'
          : 'border border-white/10 bg-white/[0.025] hover:border-white/18'
      }`}
    >
      {pkg.highlight && pkg.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan text-[#0b0f1a] text-xs font-extrabold tracking-wider whitespace-nowrap z-10 font-display shadow-[0_2px_12px_rgba(0,212,255,0.5)]">
          <Sparkles size={12} aria-hidden /> {pkg.badge}
        </div>
      )}

      <div className={`p-6 sm:p-7 flex flex-col flex-1 ${pkg.highlight ? 'sm:pt-9' : ''}`}>
        <h3
          className={`font-display font-bold text-white mb-1 ${
            pkg.highlight ? 'text-2xl sm:text-[26px]' : 'text-xl sm:text-[22px]'
          }`}
        >
          {pkg.name}
        </h3>
        <p className="font-body text-[11px] font-semibold text-cyan mb-4 tracking-widest uppercase">
          {pkg.tagline}
        </p>

        <div className="flex items-end flex-wrap gap-x-3 gap-y-1 mb-5">
          <p
            className={`font-display font-bold text-white leading-none ${
              pkg.highlight ? 'text-4xl sm:text-5xl text-gradient' : 'text-3xl'
            }`}
          >
            {pkg.priceLabel}
          </p>
          {pkg.originalPriceLabel && (
            <span className="font-body text-white/40 line-through text-base sm:text-lg leading-none mb-0.5">
              {pkg.originalPriceLabel}
            </span>
          )}
          {pkg.discountLabel && (
            <span className="font-body text-[11px] font-bold text-cyan bg-cyan/10 border border-cyan/25 rounded-full px-2 py-0.5 leading-none mb-0.5">
              {pkg.discountLabel}
            </span>
          )}
        </div>

        <ul className="flex-1 space-y-3 mb-7">
          {pkg.features.map((feature) => (
            <li
              key={feature}
              className={`font-body flex items-start gap-2.5 text-sm ${
                pkg.highlight ? 'text-white/85' : 'text-white/70'
              }`}
            >
              <Check size={16} className="text-cyan shrink-0 mt-0.5" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 w-full rounded-xl text-sm font-bold transition-all duration-200 ${
            pkg.highlight
              ? 'btn-primary py-3.5 text-[15px] hover:scale-[1.02]'
              : 'py-3 border border-white/10 bg-white/[0.03] hover:border-cyan/25 hover:bg-cyan/[0.04] text-white/80 hover:text-white'
          }`}
        >
          <MessageCircle size={16} aria-hidden />
          {pkg.cta}
        </a>
      </div>
    </motion.article>
  )
}

export default function CareersPackages() {
  const { dict } = useLanguage()
  const t = dict.packages

  return (
    <section id="packages" className="py-16 sm:py-24 border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-body text-xs font-semibold tracking-widest text-cyan">{t.eyebrow}</span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{t.heading}</h2>
          <p className="font-body mt-4 text-white/65 leading-relaxed">{t.subheading}</p>
          {t.discountNote && (
            <p className="font-body mt-4 inline-block text-xs sm:text-sm font-semibold text-cyan bg-cyan/[0.08] border border-cyan/20 rounded-full px-4 py-1.5">
              {t.discountNote}
            </p>
          )}
        </div>

        <div className="mt-14 lg:mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        <p className="font-body text-center text-[11px] text-white/30 mt-8">{t.priceNote}</p>
      </div>
    </section>
  )
}
