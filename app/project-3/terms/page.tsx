import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'

export const metadata: Metadata = {
  title: 'Terms — Noor Al-Kuwari',
}

export default function TermsPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <Reveal>
          <span className="p3-eyebrow">Legal</span>
          <h1 className="p3-display mt-4 text-3xl font-semibold text-[var(--p3-ink)] sm:text-4xl">
            Terms
          </h1>
          <p className="mt-6 text-[14px] leading-relaxed text-[var(--p3-muted)]">
            This page is a fictional demonstration portfolio built to showcase a portfolio-site
            design. The person, client names, figures, and case studies shown throughout this
            site are illustrative and do not represent real individuals, organizations, or
            campaign results.
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-[var(--p3-muted)]">
            No part of this content should be relied upon as marketing, legal, or professional
            advice.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
