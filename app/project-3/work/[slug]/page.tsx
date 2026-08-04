import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Reveal from '../../_components/Reveal'
import WorkPlate from '../../_components/WorkPlate'
import { work } from '../../_data/content'

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = work.find((w) => w.slug === slug)
  if (!item) return { title: 'Work not found — Noor Al-Kuwari' }
  return {
    title: `${item.title} — Noor Al-Kuwari`,
    description: item.summary,
    robots: { index: false, follow: false },
  }
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = work.find((w) => w.slug === slug)
  if (!item) notFound()

  const idx = work.findIndex((w) => w.slug === slug)
  const next = work[(idx + 1) % work.length]
  const code = `WRK-0${idx + 1}`

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <Link
          href="/project-3/work"
          className="text-[11px] font-semibold uppercase tracking-wide text-[var(--p3-muted)] hover:text-[var(--p3-ink)]"
        >
          ← All work
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] text-[var(--p3-wine)]">{code}</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p3-muted)]">
            {item.category}
          </span>
        </div>
        <h1 className="p3-display mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[var(--p3-ink)] sm:text-5xl">
          {item.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--p3-muted)]">{item.summary}</p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <WorkPlate palette={item.palette as [string, string, string]} category={item.category} code={code} />
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="grid grid-cols-2 gap-6 border border-[var(--p3-border)] p-6">
            {[
              ['Client', item.client],
              ['Category', item.category],
              ['Year', item.year],
              ['Code', code],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-[var(--p3-muted-2)]">
                  {String(label)}
                </dt>
                <dd className="mt-1 text-sm text-[var(--p3-text)]">{value}</dd>
              </div>
            ))}
            <div className="col-span-2">
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-[var(--p3-muted-2)]">
                Palette
              </dt>
              <dd className="mt-2 flex gap-2">
                {item.palette.map((hex) => (
                  <span key={hex} className="p3-swatch h-6 w-6" style={{ background: hex }} title={hex} />
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      {/* Narrative */}
      <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <span className="p3-eyebrow">The brief</span>
          <p className="mt-5 text-sm leading-relaxed text-[var(--p3-muted)]">
            {item.summary}
          </p>
        </Reveal>

        <div>
          <Reveal>
            <span className="p3-eyebrow">Notes from the engagement</span>
          </Reveal>
          <div className="mt-5 space-y-4">
            {item.narrative.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-[14px] leading-relaxed text-[var(--p3-muted)]">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Outcomes */}
      <div className="mt-20">
        <Reveal>
          <span className="p3-eyebrow">Outcomes</span>
        </Reveal>
        <div className="mt-6 grid gap-px overflow-hidden border border-[var(--p3-border)] sm:grid-cols-3">
          {item.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.05} className="bg-[var(--p3-panel)] p-6">
              <div className="p3-display text-2xl font-semibold text-[var(--p3-wine)]">{m.value}</div>
              <div className="mt-2 text-xs text-[var(--p3-muted)]">{m.label}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Next work */}
      <Reveal delay={0.1} className="mt-24 border-t border-[var(--p3-border)] pt-12">
        <span className="p3-eyebrow">Next in the record</span>
        <Link href={`/project-3/work/${next.slug}`} className="group mt-4 flex items-center justify-between gap-6">
          <h3 className="p3-display p3-underline text-2xl font-semibold text-[var(--p3-ink)] sm:text-3xl">
            {next.title}
          </h3>
          <span className="shrink-0 text-sm text-[var(--p3-wine)]">→</span>
        </Link>
      </Reveal>
    </div>
  )
}
