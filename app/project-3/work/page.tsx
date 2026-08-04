import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import WorkBrowser from './WorkBrowser'

export const metadata: Metadata = {
  title: 'Work — Noor Al-Kuwari',
  description: 'Brand strategy and campaign work across retail, hospitality, fintech, and DTC brands in the GCC.',
  robots: { index: false, follow: false },
}

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <span className="p3-eyebrow">Selected work</span>
        <h1 className="p3-display mt-3 max-w-2xl text-4xl font-semibold leading-tight text-[var(--p3-ink)] sm:text-5xl">
          Six campaigns, four markets, one strategy-first approach.
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--p3-muted)]">
          A working record of brand strategy and campaign direction across the GCC — filter by
          category or search by client.
        </p>
      </Reveal>

      <div className="mt-14">
        <WorkBrowser />
      </div>
    </div>
  )
}
