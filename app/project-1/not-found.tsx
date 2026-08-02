import Link from 'next/link'
import { spaceGrotesk, inter, plexMono } from './fonts'
import './portfolio.css'

export default function NotFound() {
  return (
    <div className={`p1-scope ${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <div className="p1-grid" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5 text-center">
        <span className="p1-mono text-xs tracking-widest text-[var(--p1-brass)]">SHEET NOT FOUND</span>
        <h1 className="p1-display mt-4 text-6xl font-semibold">404</h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--p1-muted)]">
          This drawing reference doesn&rsquo;t exist in the set. It may have been renumbered or
          removed.
        </p>
        <Link href="/project-1" className="p1-btn p1-btn-solid mt-8">
          Back to overview →
        </Link>
      </div>
    </div>
  )
}
