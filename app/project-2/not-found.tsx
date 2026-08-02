import Link from 'next/link'
import { playfair, instrumentSerif, inter } from './fonts'
import './portfolio.css'

export default function NotFound() {
  return (
    <div className={`p2-scope ${playfair.variable} ${instrumentSerif.variable} ${inter.variable}`}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--p2-gold)]">Page not found</span>
        <h1 className="p2-display mt-4 text-6xl font-semibold text-[var(--p2-navy)]">404</h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--p2-muted)]">
          This page doesn&rsquo;t exist. It may have moved or been renamed.
        </p>
        <Link href="/project-2" className="p2-btn p2-btn-solid mt-8">
          Back to overview →
        </Link>
      </div>
    </div>
  )
}
