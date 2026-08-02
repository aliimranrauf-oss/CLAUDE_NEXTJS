import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'

export const metadata: Metadata = {
  title: 'Terms — Khalid Al-Mansour',
}

export default function TermsPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <Reveal>
          <span className="p2-eyebrow">Legal</span>
          <h1 className="p2-display mt-4 text-3xl font-semibold text-[var(--p2-navy)] sm:text-4xl">
            Terms
          </h1>
          <p className="mt-6 text-[14px] leading-relaxed text-[var(--p2-muted)]">
            This page is a fictional demonstration portfolio built to showcase a portfolio-site
            design. The person, employer names, figures, and case studies shown throughout this
            site are illustrative and do not represent real individuals, organizations, or
            financial results.
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-[var(--p2-muted)]">
            No part of this content should be relied upon as financial, legal, or professional
            advice.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
