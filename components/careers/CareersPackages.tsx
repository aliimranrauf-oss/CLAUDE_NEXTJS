'use client'

// components/careers/CareersPackages.tsx
//
// Feature-comparison table for the 3 PORTFOLIO packages (Portfolio
// Starter, Portfolio + ATS CV, Career Brand Package). Replaces the old
// 4-card grid (where every tier re-listed everything from the tier
// below it, making the page feel long and repetitive). Now:
//   - Row 1 (sticky header): package name, tagline, price, CTA button.
//   - Below that: features grouped under category headers, one row per
//     feature, with a check / dash / short text per package.
//   - The "Career Brand Package" column is highlighted the same way the
//     old featured card was (cyan border + tint + "Most Popular" badge).
//   - Horizontally scrollable on small screens, with the feature-label
//     column pinned (sticky) so you always know which row you're reading.
//
// The ATS CV Package ($99, CV-only, no website) is intentionally NOT in
// this table — it's a different kind of product (a CV-writing gig, not
// a portfolio-website tier), so comparing it feature-by-feature against
// website packages was confusing. It's shown below the table instead,
// as its own standalone card with its own full feature list.
//
// All copy lives in app/careers/dictionary.ts (packages.items +
// packages.comparisonGroups + packages.standaloneNote) — nothing is
// hardcoded here.
import { motion } from 'framer-motion'
import { Fragment } from 'react'
import { Check, Minus, MessageCircle, Sparkles, FileText } from 'lucide-react'
import { useLanguage } from '@/app/careers/LanguageProvider'
import { buildWhatsappUrl } from '@/app/careers/constants'

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="font-body text-xs sm:text-sm text-white/80 font-semibold">{value}</span>
  }
  return value ? (
    <Check size={18} className="text-cyan mx-auto" aria-label="Included" />
  ) : (
    <Minus size={14} className="text-white/20 mx-auto" aria-label="Not included" />
  )
}

export default function CareersPackages() {
  const { dict } = useLanguage()
  const t = dict.packages

  // Portfolio-website tiers — these go in the comparison table.
  const comparisonItems = t.items.filter((pkg) => pkg.id !== 'ats-cv-only')
  // CV-only gig — shown separately below the table, not compared feature-by-feature.
  const standaloneItem = t.items.find((pkg) => pkg.id === 'ats-cv-only')

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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="mt-14 lg:mt-20 -mx-4 px-4 sm:mx-0 sm:px-0 pt-7 overflow-x-auto"
        >
          <table className="w-full border-separate border-spacing-0 min-w-[600px]">
            <thead>
              <tr>
                <th
                  className="sticky left-0 z-20 bg-[#0b0f1a] text-start align-bottom p-0 w-[200px] sm:w-[240px]"
                  aria-hidden
                />
                {comparisonItems.map((pkg) => (
                  <th
                    key={pkg.id}
                    scope="col"
                    className={`align-bottom text-start sm:text-center p-4 sm:p-5 min-w-[150px] sm:min-w-[180px] relative rounded-t-2xl ${
                      pkg.highlight
                        ? 'border-2 border-b-0 border-cyan bg-cyan/[0.06]'
                        : 'border border-b-0 border-white/10 bg-white/[0.025]'
                    }`}
                  >
                    {pkg.highlight && pkg.badge && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan text-[#0b0f1a] text-[10px] sm:text-xs font-extrabold tracking-wider whitespace-nowrap z-10 font-display shadow-[0_2px_12px_rgba(0,212,255,0.5)]">
                        <Sparkles size={11} aria-hidden /> {pkg.badge}
                      </div>
                    )}

                    <h3
                      className={`font-display font-bold text-white leading-tight ${
                        pkg.highlight ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    <p className="font-body text-[10px] sm:text-[11px] font-semibold text-cyan mt-1 mb-3 tracking-widest uppercase leading-snug">
                      {pkg.tagline}
                    </p>

                    <div className="flex items-end flex-wrap sm:justify-center gap-x-2 gap-y-0.5 mb-4">
                      <p
                        className={`font-display font-bold text-white leading-none ${
                          pkg.highlight ? 'text-2xl sm:text-3xl text-gradient' : 'text-xl sm:text-2xl'
                        }`}
                      >
                        {pkg.priceLabel}
                      </p>
                      {pkg.originalPriceLabel && (
                        <span className="font-body text-white/40 line-through text-xs sm:text-sm leading-none mb-0.5">
                          {pkg.originalPriceLabel}
                        </span>
                      )}
                    </div>

                    <a
                      href={buildWhatsappUrl(pkg.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-1.5 w-full rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 py-2.5 sm:py-3 px-2 ${
                        pkg.highlight
                          ? 'btn-primary hover:scale-[1.02]'
                          : 'border border-white/10 bg-white/[0.03] hover:border-cyan/25 hover:bg-cyan/[0.04] text-white/80 hover:text-white'
                      }`}
                    >
                      <MessageCircle size={14} aria-hidden />
                      <span className="truncate">{pkg.cta}</span>
                    </a>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {t.comparisonGroups.map((group, gi) => (
                <Fragment key={group.title}>
                  <tr>
                    <td
                      colSpan={comparisonItems.length + 1}
                      className={`sticky left-0 bg-[#0b0f1a] font-body text-[11px] font-bold uppercase tracking-widest text-white/45 px-1 sm:px-0 ${
                        gi === 0 ? 'pt-6 pb-2' : 'pt-8 pb-2'
                      }`}
                    >
                      {group.title}
                    </td>
                  </tr>
                  {group.rows.map((row, ri) => {
                    const isLastRowOfLastGroup =
                      gi === t.comparisonGroups.length - 1 && ri === group.rows.length - 1
                    return (
                      <tr key={row.label}>
                        <th
                          scope="row"
                          className="sticky left-0 z-10 bg-[#0b0f1a] text-start font-body font-normal text-xs sm:text-sm text-white/70 py-2.5 pe-3 align-middle"
                        >
                          {row.label}
                        </th>
                        {row.values.map((value, ci) => {
                          const pkg = comparisonItems[ci]
                          const cellBorderClasses = `border-x ${
                            pkg.highlight ? 'border-cyan bg-cyan/[0.06]' : 'border-white/10 bg-white/[0.025]'
                          } ${
                            isLastRowOfLastGroup
                              ? pkg.highlight
                                ? 'border-b-2 rounded-b-2xl'
                                : 'border-b rounded-b-2xl'
                              : ''
                          }`

                          return (
                            <td key={pkg.id} className={`text-center align-middle py-2.5 px-2 sm:px-4 ${cellBorderClasses}`}>
                              <Cell value={value} />
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="font-body text-center text-[11px] text-white/30 mt-8">{t.priceNote}</p>

        {/* ── Standalone CV-only gig ─────────────────────────────────────
            Deliberately separate from the table above: it's a different
            product (a CV rewrite service, no website), not another tier
            to compare feature-by-feature against the portfolio packages. */}
        {standaloneItem && (
          <div className="mt-16 sm:mt-20 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-white/10" />
              <p className="font-body text-xs sm:text-sm text-white/50 text-center shrink-0 max-w-md">
                {t.standaloneNote}
              </p>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/[0.025] hover:border-white/18 transition-all duration-300 p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl border border-cyan/25 bg-cyan/[0.06] text-cyan">
                  <FileText size={22} aria-hidden />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-1">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {standaloneItem.name}
                    </h3>
                    <div className="flex items-end gap-2">
                      <p className="font-display font-bold text-2xl sm:text-3xl text-white leading-none">
                        {standaloneItem.priceLabel}
                      </p>
                      {standaloneItem.originalPriceLabel && (
                        <span className="font-body text-white/40 line-through text-sm leading-none mb-0.5">
                          {standaloneItem.originalPriceLabel}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="font-body text-[11px] font-semibold text-cyan mb-4 tracking-widest uppercase">
                    {standaloneItem.tagline}
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-7">
                    {standaloneItem.features.map((feature) => (
                      <li key={feature} className="font-body flex items-start gap-2.5 text-sm text-white/70">
                        <Check size={16} className="text-cyan shrink-0 mt-0.5" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={buildWhatsappUrl(standaloneItem.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center gap-2 text-sm font-bold rounded-xl py-3 px-6 w-full sm:w-auto hover:scale-[1.02] transition-all duration-200"
                  >
                    <MessageCircle size={16} aria-hidden />
                    {standaloneItem.cta}
                  </a>
                </div>
              </div>
            </motion.article>
          </div>
        )}
      </div>
    </section>
  )
}
