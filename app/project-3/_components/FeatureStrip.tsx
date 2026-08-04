'use client'

import { Target, PenTool, Megaphone, TrendingUp, type LucideIcon } from 'lucide-react'
import Reveal from './Reveal'
import { heroFeatures } from '../_data/content'

const ICONS: Record<string, LucideIcon> = {
  target: Target,
  'pen-tool': PenTool,
  megaphone: Megaphone,
  'trending-up': TrendingUp,
}

/**
 * Full-bleed oxblood strip beneath the hero — four quick proof points
 * with an icon, title, and one-line description. Sits directly under
 * the hero row with no gap, matching the reference layout.
 */
export default function FeatureStrip() {
  return (
    <section className="bg-[var(--p3-wine)]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-12 sm:px-8 md:grid-cols-4 md:gap-x-8">
        {heroFeatures.map((f, i) => {
          const Icon = ICONS[f.icon] ?? Target
          return (
            <Reveal key={f.title} delay={i * 0.06} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--p3-gold-soft)] text-[var(--p3-gold-soft)]">
                <Icon size={16} />
              </span>
              <div>
                <h3 className="p3-display text-[14.5px] font-semibold text-[#fdf6ec]">{f.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[#e9d9c3]">{f.description}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
