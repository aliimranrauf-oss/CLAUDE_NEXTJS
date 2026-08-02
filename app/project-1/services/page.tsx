import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '../_components/Reveal'
import { services, testimonials } from '../_data/content'

export const metadata: Metadata = {
  title: 'Services — Ahmed Al Mansoori',
  description: 'Program direction, structural review, delivery, and sustainability advisory services.',
  robots: { index: false, follow: false },
}

const process = [
  { step: '01', title: 'Diagnose', text: 'Review the current program state — schedule, risk register, technical baseline — before proposing anything.' },
  { step: '02', title: 'Structure', text: 'Rebuild governance where needed: stage gates, reporting cadence, and clear ownership of decisions.' },
  { step: '03', title: 'Deliver', text: 'Stay embedded through execution, commissioning, and handover — not just the strategy deck.' },
  { step: '04', title: 'Close out', text: 'Formal handover with a clean baseline record, so the next phase inherits clarity, not debt.' },
]

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <span className="p1-eyebrow">Services</span>
        <h1 className="p1-display mt-3 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
          Four ways I get involved in a project.
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--p1-muted)]">
          Every engagement starts the same way — with a candid look at where the program actually
          stands, not where the last status report said it stood.
        </p>
      </Reveal>

      <div className="mt-16 divide-y divide-[var(--p1-line)] border-t border-[var(--p1-line)]">
        {services.map((s, i) => (
          <Reveal key={s.code}>
            <div className="grid gap-6 py-10 sm:grid-cols-[100px_1fr_1fr]">
              <span className="p1-mono text-sm text-[var(--p1-brass)]">{s.code}</span>
              <div>
                <h2 className="p1-display text-xl font-semibold">{s.title}</h2>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[var(--p1-muted)]">
                  {s.description}
                </p>
              </div>
              <div>
                <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">
                  DELIVERABLES
                </span>
                <ul className="mt-3 space-y-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-2 text-[13px] text-[var(--p1-muted)]">
                      <span className="text-[var(--p1-steel)]">—</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Process */}
      <div className="mt-24">
        <Reveal>
          <span className="p1-eyebrow">How an engagement runs</span>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.06} className="p1-plate p-6">
              <span className="p1-mono text-xs text-[var(--p1-muted-2)]">{p.step}</span>
              <h3 className="p1-display mt-3 text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--p1-muted)]">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Testimonials strip */}
      <div className="mt-24 grid gap-6 border-t border-[var(--p1-line)] pt-16 sm:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <p className="text-[13px] italic leading-relaxed text-[var(--p1-muted)]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="p1-mono mt-4 text-[10px] tracking-widest text-[var(--p1-brass)]">
              {t.name.toUpperCase()}
            </p>
            <p className="text-[11px] text-[var(--p1-muted-2)]">{t.title}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-20 flex flex-col items-start gap-4 border-t border-[var(--p1-line)] pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="p1-display text-2xl font-semibold sm:text-3xl">Discuss a program</h2>
        <Link href="/project-1/contact" className="p1-btn p1-btn-solid">
          Get in touch →
        </Link>
      </Reveal>
    </div>
  )
}
