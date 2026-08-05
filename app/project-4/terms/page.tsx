import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'

export const metadata: Metadata = {
  title: 'Terms — Dr. Sara Al Naqbi',
}

export default function TermsPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <Reveal>
          <span className="p4-eyebrow">Legal</span>
          <h1 className="p4-display mt-4 text-3xl font-semibold text-[var(--p4-sage-2)] sm:text-4xl">
            Terms
          </h1>
          <p className="mt-6 text-[14px] leading-relaxed text-[var(--p4-muted)]">
            This page is a fictional demonstration portfolio built to showcase a portfolio-site
            design. The person, clinic names, figures, and patient quotes shown throughout this
            site are illustrative and do not represent a real individual, clinic, or patient.
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-[var(--p4-muted)]">
            No part of this content should be relied upon as medical advice, diagnosis, or
            treatment. Always consult a licensed healthcare provider for medical concerns.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
