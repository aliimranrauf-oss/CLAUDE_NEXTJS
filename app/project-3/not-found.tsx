import Link from 'next/link'
import { fraunces, manrope, amiri } from './fonts'
import './portfolio.css'

export default function NotFound() {
  return (
    <div className={`p3-scope ${fraunces.variable} ${manrope.variable} ${amiri.variable}`}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--p3-wine)]">Page not found</span>
        <h1 className="p3-display mt-4 text-6xl font-semibold text-[var(--p3-ink)]">404</h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--p3-muted)]">
          This page doesn&rsquo;t exist. It may have moved or been renamed.
        </p>
        <Link href="/project-3" className="p3-btn p3-btn-solid mt-8">
          Back to overview →
        </Link>
      </div>
    </div>
  )
}
