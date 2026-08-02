'use client'

import { TrendingUp, BarChart3, Target, LineChart, ShieldCheck, Coins } from 'lucide-react'
import Reveal from './Reveal'
import DonutChart from './DonutChart'
import CountUp from './CountUp'
import { hero } from '../_data/content'

const FOCUS_ICONS = [Target, BarChart3, ShieldCheck, Coins]

const SPARK_POINTS = '0,32 14,28 28,30 42,20 56,22 70,10 84,4 98,0'

export default function HeroStatCards() {
  const { revenue, ebitda, budget, focus } = hero.cards

  return (
    <div className="flex w-full max-w-[340px] flex-col gap-4">
      {/* Revenue Growth */}
      <Reveal delay={0.15}>
        <div className="p2-glass p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p2-muted)]">
                {revenue.label}
              </span>
              <div className="mt-1.5 flex items-baseline gap-2">
                <CountUp value={revenue.value} className="p2-display text-[26px] font-bold text-[var(--p2-navy)]" />
              </div>
              <span className="mt-0.5 block text-[11px] text-[var(--p2-muted-2)]">{revenue.sub}</span>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--p2-gold-tint)] text-[var(--p2-gold)]">
              <TrendingUp size={16} />
            </span>
          </div>
          <svg viewBox="0 0 100 36" className="mt-3 h-9 w-full" preserveAspectRatio="none">
            <polyline
              points={SPARK_POINTS}
              fill="none"
              stroke="var(--p2-gold)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Reveal>

      {/* EBITDA Performance */}
      <Reveal delay={0.25}>
        <div className="p2-glass p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p2-muted)]">
                {ebitda.label}
              </span>
              <div className="mt-1.5">
                <span className="p2-display text-[26px] font-bold text-[var(--p2-navy)]">{ebitda.value}</span>
              </div>
              <span className="mt-0.5 block text-[11px] text-[var(--p2-muted-2)]">{ebitda.sub}</span>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--p2-navy)]/8 text-[var(--p2-navy)]">
              <LineChart size={16} />
            </span>
          </div>
          <div className="mt-3 flex h-9 items-end gap-1.5">
            {[40, 55, 48, 70, 62, 85, 78, 96].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-[var(--p2-navy)]"
                style={{ height: `${h}%`, opacity: 0.35 + (i / 10) }}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Budget Performance */}
      <Reveal delay={0.35}>
        <div className="p2-glass p-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p2-muted)]">
            {budget.label}
          </span>
          <div className="mt-3 flex items-center gap-4">
            <DonutChart percent={budget.percent} />
            <div className="flex flex-col gap-1.5 text-[12px]">
              <span className="w-fit rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                {budget.status}
              </span>
              <span className="text-[var(--p2-muted)]">
                Budget <span className="font-semibold text-[var(--p2-navy)]">{budget.budget}</span>
              </span>
              <span className="text-[var(--p2-muted)]">
                Actual <span className="font-semibold text-[var(--p2-navy)]">{budget.actual}</span>
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Strategic Focus Areas */}
      <Reveal delay={0.45}>
        <div className="p2-glass p-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p2-muted)]">
            {focus.label}
          </span>
          <ul className="mt-3 flex flex-col gap-2.5">
            {focus.items.map((item, i) => {
              const Icon = FOCUS_ICONS[i % FOCUS_ICONS.length]
              return (
                <li key={item} className="flex items-center gap-2.5 text-[12.5px] text-[var(--p2-text)]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--p2-gold-tint)] text-[var(--p2-gold)]">
                    <Icon size={12} />
                  </span>
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
      </Reveal>
    </div>
  )
}
