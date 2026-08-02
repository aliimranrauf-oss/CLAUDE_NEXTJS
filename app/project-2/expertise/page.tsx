import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import { services } from '../_data/content'

export const metadata: Metadata = {
  title: 'Expertise — Khalid Al-Mansour',
}

export default function ExpertisePage() {
  return (
    <>
      <section className="border-b border-[var(--p2-border)] bg-[var(--p2-bg-alt)]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p2-eyebrow">Expertise</span>
            <h1 className="p2-display mt-4 text-4xl font-semibold text-[var(--p2-navy)] sm:text-5xl">
              Core capabilities
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--p2-muted)]">
              Six areas where I partner with leadership teams to translate financial strategy
              into measurable, sustained performance.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.code} delay={i * 0.06}>
                <div className="p2-card h-full p-8">
                  <span className="p2-display text-3xl font-semibold text-[var(--p2-gold-soft)]">
                    {s.code}
                  </span>
                  <h2 className="p2-display mt-4 text-xl font-semibold text-[var(--p2-navy)]">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--p2-muted)]">
                    {s.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
