import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import PulseLine from '../_components/PulseLine'
import { services } from '../_data/content'

export const metadata: Metadata = {
  title: 'Treatments — Dr. Sara Al Naqbi',
}

export default function TreatmentsPage() {
  return (
    <>
      <section className="border-b border-[var(--p4-border)] bg-[var(--p4-bg-alt)]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p4-eyebrow">Treatments</span>
            <PulseLine className="p4-pulse mt-1.5" />
            <h1 className="p4-display mt-4 text-4xl font-semibold text-[var(--p4-sage-2)] sm:text-5xl">
              Medical &amp; aesthetic dermatology
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--p4-muted)]">
              Six areas where I partner with patients — from diagnosing skin conditions to
              considered, natural-looking aesthetic care.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.code} delay={i * 0.06}>
                <div className="p4-card h-full p-8">
                  <span className="p4-display text-3xl font-semibold text-[var(--p4-clay-soft)]">
                    {s.code}
                  </span>
                  <h2
                    className="p4-display mt-4 text-xl font-semibold text-[var(--p4-sage-2)]"
                    dangerouslySetInnerHTML={{ __html: s.title }}
                  />
                  <p
                    className="mt-3 text-[14px] leading-relaxed text-[var(--p4-muted)]"
                    dangerouslySetInnerHTML={{ __html: s.description }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
