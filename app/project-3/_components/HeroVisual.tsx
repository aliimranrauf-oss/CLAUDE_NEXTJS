'use client'

import Reveal from './Reveal'
import ArabicMonogram from './ArabicMonogram'
import Portrait from './Portrait'

/**
 * Hero right-column visual: Noor's portrait photo with the Arabic-name
 * monogram plate overlapping its bottom-right corner — a single, clean
 * focal point (matches the reference layout) instead of a tall stack of
 * cards. Deliberately short so it never forces the hero row taller than
 * the text column, which was the cause of the large empty gap / cut-off
 * heading in the previous layout.
 */
export default function HeroVisual() {
  return (
    <Reveal delay={0.05} className="relative mx-auto w-full max-w-[320px] pb-8 pr-6 sm:max-w-[380px] sm:pb-10 sm:pr-8">
      <Portrait variant="plate" />
      <div className="absolute bottom-0 right-0 w-[62%] translate-y-1/3">
        <ArabicMonogram compact />
      </div>
    </Reveal>
  )
}
