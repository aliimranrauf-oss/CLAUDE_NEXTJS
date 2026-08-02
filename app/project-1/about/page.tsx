import type { Metadata } from 'next'
import Image from 'next/image'
import Reveal from '../_components/Reveal'
import { timeline, certifications, stats } from '../_data/content'

export const metadata: Metadata = {
  title: 'About — Ahmed Al Mansoori',
  description: 'Background, career timeline, and certifications of Ahmed Al Mansoori.',
  robots: { index: false, follow: false },
}

const skills = [
  { group: 'Program Leadership', items: ['Stage-gate governance', 'Risk & contingency modelling', 'Multi-consultant coordination', 'Executive reporting'] },
  { group: 'Structural & Technical', items: ['Structural review & VE', 'Marine & geotechnical works', 'Seismic & wind loading', 'Constructability analysis'] },
  { group: 'Delivery & Commissioning', items: ['Systems integration', 'MEP commissioning', 'Handover & snagging', 'Measurement & verification'] },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <span className="p1-eyebrow">About</span>
        <h1 className="p1-display mt-3 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
          Fourteen years of turning ambitious drawings into occupied buildings.
        </h1>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 text-[15px] leading-relaxed text-[var(--p1-muted)]">
          <Reveal>
            <p>
              I started as a graduate structural engineer working on foundation design for a
              regional infrastructure consultancy, and the thing that stuck with me from those
              first years was how much the &ldquo;engineering problem&rdquo; on a live site is
              usually a logistics or communication problem wearing structural clothing.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              That instinct followed me through port access works in Khor Fakkan, a five-tower
              mixed-use district in Sharjah, a cable-stayed crossing over a working shipping
              channel in Dubai, and now a multi-billion-dirham metro extension in Abu Dhabi. Each
              project taught me a different way that schedules actually slip — utility diversions
              nobody budgeted float for, commissioning sequences that assume systems will behave
              like their datasheets, marine windows that don&rsquo;t care about your Gantt chart.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              These days I split my time between program direction — the stage gates, the risk
              registers, the executive reporting that keeps a board calm — and staying close
              enough to the technical detail that I can still read a structural drawing and know
              when something is wrong before the RFI arrives. I think that combination is
              increasingly rare, and it&rsquo;s the reason clients bring me in mid-project when
              something has gone quiet in the wrong way.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              Outside delivery work, I mentor two junior engineers through a regional structural
              engineering association, and I&rsquo;m currently leading a portfolio-wide net-zero
              retrofit programme across 42 public facilities — the first project in my career
              where the client success metric is a utility bill rather than a ribbon-cutting.
            </p>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.06} className="relative mb-6 aspect-[16/10] overflow-hidden border border-[var(--p1-line-strong)]">
            <Image
              src="/project-1/hero-ahmed.jpg"
              alt="Ahmed Al Mansoori"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.1} className="p1-plate p-6">
            <span className="p1-eyebrow">At a glance</span>
            <dl className="mt-5 space-y-4">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between border-b border-[var(--p1-line)] pb-3">
                  <dt className="text-xs text-[var(--p1-muted)]">{s.label}</dt>
                  <dd className="p1-mono text-sm text-[var(--p1-brass)]">{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 text-xs leading-relaxed text-[var(--p1-muted-2)]">
              Based in Abu Dhabi, UAE · Available for select advisory engagements
            </div>
          </Reveal>
        </div>
      </div>

      {/* Skills matrix */}
      <div className="mt-24">
        <Reveal>
          <span className="p1-eyebrow">Capability matrix</span>
        </Reveal>
        <div className="mt-8 grid gap-px overflow-hidden border border-[var(--p1-line)] sm:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.06} className="bg-[var(--p1-panel)] p-6">
              <h3 className="p1-display text-sm font-semibold text-[var(--p1-steel)]">{s.group}</h3>
              <ul className="mt-4 space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-[13px] text-[var(--p1-muted)]">
                    <span className="h-1 w-1 shrink-0 bg-[var(--p1-brass)]" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-24">
        <Reveal>
          <span className="p1-eyebrow">Career timeline</span>
        </Reveal>
        <div className="mt-8 border-t border-[var(--p1-line)]">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.05}>
              <div className="grid gap-2 border-b border-[var(--p1-line)] py-6 sm:grid-cols-[180px_1fr]">
                <span className="p1-mono text-xs text-[var(--p1-brass)]">{t.year}</span>
                <div>
                  <h3 className="p1-display text-base font-semibold">{t.role}</h3>
                  <p className="mt-1 text-[13px] text-[var(--p1-muted)]">{t.org}</p>
                  <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[var(--p1-muted-2)]">
                    {t.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mt-24">
        <Reveal>
          <span className="p1-eyebrow">Certifications &amp; education</span>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal
              key={c.name}
              delay={i * 0.04}
              className="flex items-center justify-between border border-[var(--p1-line)] px-5 py-4"
            >
              <div>
                <div className="text-sm font-medium">{c.name}</div>
                <div className="mt-1 text-xs text-[var(--p1-muted)]">{c.body}</div>
              </div>
              <span className="p1-mono text-xs text-[var(--p1-muted)]">{c.year}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
