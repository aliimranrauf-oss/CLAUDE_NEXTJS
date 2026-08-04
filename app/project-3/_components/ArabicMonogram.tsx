'use client'

import { profile } from '../_data/content'

/**
 * The hero's signature brand mark: Noor's name rendered in elegant
 * Arabic calligraphy (Amiri) in brass on an oxblood plate, with the
 * Latin initials underneath — styled like a mounted page from her own
 * brand guideline deck. This stands in for a personal photo: on a
 * brand-strategist portfolio, a crafted monogram plate is more on-brand
 * (and more honest, since there's no real client photo to use) than a
 * generic headshot placeholder.
 */
export default function ArabicMonogram({
  className = '',
  compact = false,
}: {
  className?: string
  /** Smaller text/padding/label — used when the plate overlaps the hero portrait. */
  compact?: boolean
}) {
  return (
    <div
      className={`p3-monogram flex flex-col items-center justify-center gap-2 ${
        compact ? 'px-3 py-4 sm:gap-2.5 sm:px-4 sm:py-5' : 'gap-3 px-8 py-10'
      } ${className}`}
    >
      <span
        className={`p3-arabic-font leading-none text-[var(--p3-gold-soft)] ${
          compact ? 'text-[20px] sm:text-[24px]' : 'text-[38px] sm:text-[46px]'
        }`}
      >
        {profile.arabicName}
      </span>
      <span className={`bg-[var(--p3-gold-soft)] opacity-60 ${compact ? 'h-px w-8' : 'h-px w-14'}`} />
      <span
        className={`text-center font-semibold uppercase tracking-[0.2em] text-[#f4ece0] ${
          compact ? 'text-[8.5px] leading-tight sm:text-[9.5px]' : 'text-[11px] tracking-[0.28em]'
        }`}
      >
        {profile.initials} &middot; {compact ? 'Strategist' : profile.role}
      </span>
    </div>
  )
}
