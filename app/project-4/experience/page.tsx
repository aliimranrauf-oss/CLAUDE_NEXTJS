import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import PulseLine from '../_components/PulseLine'
import { experience } from '../_data/content'

export const metadata: Metadata = {
  title: 'Experience — Dr. Sara Al Naqbi',
}

export default function ExperiencePage() {
  return (
    <>
      <section className="border-b border-[var(--p4-border)] bg-[var(--p4-bg-alt)]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p4-eyebrow">Experience</span>
            <PulseLine className="p4-pulse mt-1.5" />
            <h1 className="p4-display mt-4 text-4xl font-semibold text-[var(--p4-sage-2)] sm:text-5xl">
              Clinical career &amp; training
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--p4-muted)]">
              A career built across clinical leadership, aesthetic medicine, and formal
              dermatology training in the UAE and abroad.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <div className="flex flex-col gap-6">
            {experience.map((e, i) => (
              <Reveal key={e.slug} delay={i * 0.06}>
                <div className="p4-card p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span
                      className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p4-clay)]"
                      dangerouslySetInnerHTML={{ __html: e.category }}
                    />
                    <span className="text-[12px] text-[var(--p4-muted-2)]">{e.year}</span>
                  </div>
                  <h2
                    className="p4-display mt-3 text-xl font-semibold text-[var(--p4-sage-2)] sm:text-2xl"
                    dangerouslySetInnerHTML={{ __html: e.title }}
                  />
                  <span
                    className="mt-1 block text-[13px] text-[var(--p4-muted)]"
                    dangerouslySetInnerHTML={{ __html: e.org }}
                  />
                  <p
                    className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-[var(--p4-text)]"
                    dangerouslySetInnerHTML={{ __html: e.summary }}
                  />
                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[var(--p4-border)] pt-5">
                    {e.metrics.map((m) => (
                      <div key={m.label}>
                        <div
                          className="p4-display text-lg font-semibold text-[var(--p4-sage-2)] sm:text-xl"
                          dangerouslySetInnerHTML={{ __html: m.value }}
                        />
                        <div className="mt-1 text-[11.5px] leading-snug text-[var(--p4-muted)]">
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
