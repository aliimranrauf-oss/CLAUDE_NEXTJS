import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import ProjectsBrowser from './ProjectsBrowser'

export const metadata: Metadata = {
  title: 'Projects — Ahmed Al Mansoori',
  description: 'A record of transit, marine, mixed-use, and sustainability projects delivered by Ahmed Al Mansoori.',
  robots: { index: false, follow: false },
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <span className="p1-eyebrow">Project record</span>
        <h1 className="p1-display mt-3 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
          Eleven projects, four disciplines, one delivery standard.
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--p1-muted)]">
          A working record of program and structural delivery across the UAE — filter by
          discipline or search by location.
        </p>
      </Reveal>

      <div className="mt-14">
        <ProjectsBrowser />
      </div>
    </div>
  )
}
