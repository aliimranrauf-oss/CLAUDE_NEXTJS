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
export default function ArabicMonogram({ className = '' }: { className?: string }) {
  return (
    <div className={`p3-monogram flex flex-col items-center justify-center gap-3 px-8 py-10 ${className}`}>
      <span className="p3-arabic-font text-[38px] leading-none text-[var(--p3-gold-soft)] sm:text-[46px]">
        {profile.arabicName}
      </span>
      <span className="h-px w-14 bg-[var(--p3-gold-soft)] opacity-60" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f4ece0]">
        {profile.initials} &middot; {profile.role}
      </span>
    </div>
  )
}
