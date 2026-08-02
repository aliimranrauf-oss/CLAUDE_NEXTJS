import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import { experience } from '../_data/content'

export const metadata: Metadata = {
  title: 'Experience — Khalid Al-Mansour',
}

export default function ExperiencePage() {
  return (
    <>
      <section className="border-b border-[var(--p2-border)] bg-[var(--p2-bg-alt)]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p2-eyebrow">Experience</span>
            <h1 className="p2-display mt-4 text-4xl font-semibold text-[var(--p2-navy)] sm:text-5xl">
              Impact &amp; transformation
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--p2-muted)]">
              A selection of programs led across group finance, capital allocation, FP&amp;A,
              and enterprise risk.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <div className="flex flex-col gap-6">
            {experience.map((e, i) => (
              <Reveal key={e.slug} delay={i * 0.06}>
                <div className="p2-card p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p2-gold)]">
                      {e.category}
                    </span>
                    <span className="text-[12px] text-[var(--p2-muted-2)]">{e.year}</span>
                  </div>
                  <h2 className="p2-display mt-3 text-xl font-semibold text-[var(--p2-navy)] sm:text-2xl">
                    {e.title}
                  </h2>
                  <span className="mt-1 block text-[13px] text-[var(--p2-muted)]">{e.org}</span>
                  <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-[var(--p2-text)]">
                    {e.summary}
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[var(--p2-border)] pt-5">
                    {e.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="p2-display text-lg font-semibold text-[var(--p2-navy)] sm:text-xl">
                          {m.value}
                        </div>
                        <div className="mt-1 text-[11.5px] leading-snug text-[var(--p2-muted)]">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
