import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import { services } from '../_data/content'

export const metadata: Metadata = {
  title: 'Services — Noor Al-Kuwari',
}

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-[var(--p3-border)] bg-[var(--p3-bg-alt)]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p3-eyebrow">Services</span>
            <h1 className="p3-display mt-4 text-4xl font-semibold text-[var(--p3-ink)] sm:text-5xl">
              Core capabilities
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--p3-muted)]">
              Six areas where I partner with founders and marketing teams to turn brand
              strategy into campaigns that actually move the market.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.code} delay={i * 0.06}>
                <div className="p3-plate h-full p-8">
                  <span className="p3-display text-3xl font-semibold text-[var(--p3-gold-soft)]">{s.code}</span>
                  <h2 className="p3-display mt-4 text-xl font-semibold text-[var(--p3-ink)]">{s.title}</h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--p3-muted)]">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
