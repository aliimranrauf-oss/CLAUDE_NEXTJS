'use client'

import { Users, Smile, Activity, Sparkles, ScanFace, ShieldAlert } from 'lucide-react'
import Reveal from './Reveal'
import DonutChart from './DonutChart'
import CountUp from './CountUp'
import { hero } from '../_data/content'
import { useSiteSettings } from '../_context/SiteSettingsContext'

const FOCUS_ICONS = [Activity, Sparkles, ScanFace, ShieldAlert]

export default function HeroStatCards() {
  const { patients, satisfaction, success, focus } = hero.cards
  const { settings } = useSiteSettings()
  const { showPatientsCard, showSatisfactionCard, showSuccessCard, showFocusCard } = settings.hero

  if (!showPatientsCard && !showSatisfactionCard && !showSuccessCard && !showFocusCard) return null

  return (
    <div className="flex w-full max-w-[340px] flex-col gap-4">
      {/* Patients Treated */}
      {showPatientsCard && (
        <Reveal delay={0.15}>
          <div className="p4-glass p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p4-muted)]">
                  {patients.label}
                </span>
                <div className="mt-1.5">
                  <CountUp value={patients.value} className="p4-display text-[26px] font-bold text-[var(--p4-sage-2)]" />
                </div>
                <span className="mt-0.5 block text-[11px] text-[var(--p4-muted-2)]">{patients.sub}</span>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--p4-clay-tint)] text-[var(--p4-clay)]">
                <Users size={16} />
              </span>
            </div>
          </div>
        </Reveal>
      )}

      {/* Patient Satisfaction */}
      {showSatisfactionCard && (
        <Reveal delay={0.25}>
          <div className="p4-glass p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p4-muted)]">
                  {satisfaction.label}
                </span>
                <div className="mt-1.5">
                  <CountUp value={satisfaction.value} className="p4-display text-[26px] font-bold text-[var(--p4-sage-2)]" />
                </div>
                <span className="mt-0.5 block text-[11px] text-[var(--p4-muted-2)]">{satisfaction.sub}</span>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--p4-sage-tint)] text-[var(--p4-sage)]">
                <Smile size={16} />
              </span>
            </div>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < 9.8 ? 'var(--p4-sage)' : 'var(--p4-border-strong)' }} />
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Treatment Success Rate */}
      {showSuccessCard && (
        <Reveal delay={0.35}>
          <div className="p4-glass p-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p4-muted)]">
              {success.label}
            </span>
            <div className="mt-3 flex items-center gap-4">
              <DonutChart percent={success.percent} />
              <div className="flex flex-col gap-1.5 text-[12px]">
                <span className="w-fit rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  {success.status}
                </span>
                <span className="text-[var(--p4-muted)]">
                  Procedures <span className="font-semibold text-[var(--p4-sage-2)]">{success.procedures}</span>
                </span>
                <span className="text-[var(--p4-muted)]">
                  Follow-ups <span className="font-semibold text-[var(--p4-sage-2)]">{success.followUps}</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* Areas of Focus */}
      {showFocusCard && (
        <Reveal delay={0.45}>
          <div className="p4-glass p-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p4-muted)]">
              {focus.label}
            </span>
            <ul className="mt-3 flex flex-col gap-2.5">
              {focus.items.map((item, i) => {
                const Icon = FOCUS_ICONS[i % FOCUS_ICONS.length]
                return (
                  <li key={item} className="flex items-center gap-2.5 text-[12.5px] text-[var(--p4-text)]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--p4-clay-tint)] text-[var(--p4-clay)]">
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
