import Link from 'next/link'
import { newsreader, plusJakarta, reemKufi } from './fonts'
import './portfolio.css'

export default function NotFound() {
  return (
    <div className={`p4-scope ${newsreader.variable} ${plusJakarta.variable} ${reemKufi.variable}`}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--p4-clay)]">Page not found</span>
        <h1 className="p4-display mt-4 text-6xl font-semibold text-[var(--p4-sage-2)]">404</h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--p4-muted)]">
          This page doesn&rsquo;t exist. It may have moved or been renamed.
        </p>
        <Link href="/project-4" className="p4-btn p4-btn-solid mt-8">
          Back to overview →
        </Link>
      </div>
    </div>
  )
}
