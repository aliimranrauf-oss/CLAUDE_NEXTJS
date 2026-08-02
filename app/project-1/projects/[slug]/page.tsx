import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Reveal from '../../_components/Reveal'
import ProjectPlate from '../../_components/ProjectPlate'
import { projects } from '../../_data/content'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: 'Project not found — Ahmed Al Mansoori' }
  return {
    title: `${project.title} — Ahmed Al Mansoori`,
    description: project.summary,
    robots: { index: false, follow: false },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const idx = projects.findIndex((p) => p.slug === slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <Link href="/project-1/projects" className="p1-mono text-[11px] tracking-wide text-[var(--p1-muted)] hover:text-[var(--p1-text)]">
          ← ALL PROJECTS
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="p1-mono text-[11px] text-[var(--p1-brass)]">{project.code}</span>
          <span className="p1-mono text-[11px] text-[var(--p1-muted)]">{project.category.toUpperCase()}</span>
        </div>
        <h1 className="p1-display mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--p1-muted)]">
          {project.summary}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <ProjectPlate image={project.image} code={project.code} className="w-full" />
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="grid grid-cols-2 gap-6 border border-[var(--p1-line)] p-6">
            {[
              ['Location', project.location],
              ['Year', project.year],
              ['Role', project.role],
              ['Duration', project.duration],
              ['Budget', project.budget],
              ['Client', project.client],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">
                  {String(label).toUpperCase()}
                </dt>
                <dd className="mt-1 text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Scope */}
      <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <span className="p1-eyebrow">Scope of involvement</span>
          <ul className="mt-5 space-y-3">
            {project.scope.map((s) => (
              <li key={s} className="flex gap-2 text-sm text-[var(--p1-muted)]">
                <span className="text-[var(--p1-steel)]">—</span> {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <div>
          <Reveal>
            <span className="p1-eyebrow">Notes from the field</span>
          </Reveal>
          <div className="mt-5 space-y-4">
            {project.narrative.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-[14px] leading-relaxed text-[var(--p1-muted)]">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Outcomes */}
      <div className="mt-20">
        <Reveal>
          <span className="p1-eyebrow">Outcomes</span>
        </Reveal>
        <div className="mt-6 grid gap-px overflow-hidden border border-[var(--p1-line)] sm:grid-cols-2 lg:grid-cols-4">
          {project.outcomes.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.05} className="bg-[var(--p1-panel)] p-6">
              <div className="p1-display text-2xl font-semibold text-[var(--p1-brass)]">{o.value}</div>
              <div className="mt-2 text-xs text-[var(--p1-muted)]">{o.label}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Next project */}
      <Reveal delay={0.1} className="mt-24 border-t border-[var(--p1-line)] pt-12">
        <span className="p1-eyebrow">Next in the record</span>
        <Link href={`/project-1/projects/${next.slug}`} className="group mt-4 flex items-center justify-between gap-6">
          <h3 className="p1-display p1-underline text-2xl font-semibold sm:text-3xl">{next.title}</h3>
          <span className="p1-mono shrink-0 text-sm text-[var(--p1-brass)]">→</span>
        </Link>
      </Reveal>
    </div>
  )
}
