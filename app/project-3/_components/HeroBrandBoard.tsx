'use client'

import { Palette, Rocket, TrendingUp, Compass, PenTool, Layers, Target } from 'lucide-react'
import Reveal from './Reveal'
import DonutChart from './DonutChart'
import CountUp from './CountUp'
import { hero } from '../_data/content'
import { useSiteSettings } from '../_context/SiteSettingsContext'

const DISCIPLINE_ICONS = [Compass, PenTool, Layers, Target]

const SPARK_POINTS = '0,30 14,26 28,28 42,18 56,20 70,8 84,6 98,0'

/**
 * "Brand board" strip: Noor's own signature palette, headline stats, and
 * audience-growth figures, laid out as an even row beneath the hero —
 * a live example of her design work. Previously this was stacked inside
 * the hero's right column, which made that column far taller than the
 * text column and pushed/cut off the headline; living in its own
 * full-width section fixes that.
 */
export default function HeroBrandBoard() {
  const { palette, campaigns, audience, disciplines } = hero.cards
  const { settings } = useSiteSettings()
  const { showPaletteCard, showCampaignsCard, showAudienceCard, showDisciplinesCard } = settings.hero

  if (!showPaletteCard && !showCampaignsCard && !showAudienceCard && !showDisciplinesCard) return null

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {showPaletteCard && (
        <Reveal delay={0.05} className="h-full">
          <div className="p3-glass h-full p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p3-muted)]">
                {palette.label}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--p3-gold-tint)] text-[var(--p3-gold)]">
                <Palette size={15} />
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2.5">
              {palette.swatches.map((s) => (
                <span
                  key={s.hex}
                  title={s.name}
                  className="p3-swatch h-8 w-8"
                  style={{ background: s.hex }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {showCampaignsCard && (
        <Reveal delay={0.12} className="h-full">
          <div className="p3-glass h-full p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p3-muted)]">
                  {campaigns.label}
                </span>
                <div className="mt-1.5">
                  <CountUp value={campaigns.value} className="p3-display text-[26px] font-semibold text-[var(--p3-ink)]" />
                </div>
                <span className="mt-0.5 block text-[11px] text-[var(--p3-muted-2)]">{campaigns.sub}</span>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--p3-wine-tint)] text-[var(--p3-wine)]">
                <Rocket size={16} />
              </span>
            </div>
            <svg viewBox="0 0 100 34" className="mt-3 h-8 w-full" preserveAspectRatio="none">
              <polyline
                points={SPARK_POINTS}
                fill="none"
                stroke="var(--p3-gold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Reveal>
      )}

      {showAudienceCard && (
        <Reveal delay={0.19} className="h-full">
          <div className="p3-glass h-full p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p3-muted)]">
                {audience.label}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--p3-gold-tint)] text-[var(--p3-gold)]">
                <TrendingUp size={15} />
              </span>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <DonutChart percent={audience.percent} />
              <div className="flex flex-col gap-1.5 text-[12px]">
                <span className="w-fit rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  {audience.status}
                </span>
                <span className="text-[var(--p3-muted)]">
                  From <span className="font-semibold text-[var(--p3-ink)]">{audience.before}</span>
                </span>
                <span className="text-[var(--p3-muted)]">
                  To <span className="font-semibold text-[var(--p3-ink)]">{audience.after}</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {showDisciplinesCard && (
        <Reveal delay={0.26} className="h-full">
          <div className="p3-glass h-full p-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p3-muted)]">
              {disciplines.label}
            </span>
            <ul className="mt-3 flex flex-col gap-2.5">
              {disciplines.items.map((item, i) => {
                const Icon = DISCIPLINE_ICONS[i % DISCIPLINE_ICONS.length]
                return (
                  <li key={item} className="flex items-center gap-2.5 text-[12.5px] text-[var(--p3-text)]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--p3-wine-tint)] text-[var(--p3-wine)]">
                      <Icon size={12} />
                    </span>
                    {item}
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>
      )}
    </div>
  )
}
