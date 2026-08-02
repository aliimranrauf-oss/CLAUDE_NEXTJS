import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'

export const metadata: Metadata = {
  title: 'Terms of Engagement — Ahmed Al Mansoori',
  robots: { index: false, follow: false },
}

const sections = [
  {
    heading: '1. Purpose of this site',
    body: 'This website is a portfolio presenting representative program and structural delivery work. Project names, figures, and client references are illustrative and used for demonstration purposes.',
  },
  {
    heading: '2. Engagement basis',
    body: 'Advisory and delivery engagements are agreed individually, in writing, and scoped to the specific program. Nothing on this site constitutes a binding offer of services.',
  },
  {
    heading: '3. Client Portal',
    body: 'The Client Portal on this site is a demonstration environment. Access is provided through a shared demo account and sample data — it is not a live project-management system.',
  },
  {
    heading: '4. Intellectual property',
    body: 'Written content, layout, and visual design on this site may not be reproduced without permission.',
  },
  {
    heading: '5. Limitation',
    body: 'Content on this site is provided for informational purposes and should not be relied upon as engineering, structural, or program-management advice for any specific project.',
  },
]

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <span className="p1-eyebrow">Legal</span>
        <h1 className="p1-display mt-3 text-4xl font-semibold">Terms of Engagement</h1>
        <p className="mt-3 p1-mono text-xs text-[var(--p1-muted)]">Last updated: January 2026</p>
      </Reveal>

      <div className="mt-12 space-y-8">
        {sections.map((s, i) => (
          <Reveal key={s.heading} delay={i * 0.03}>
            <h2 className="p1-display text-lg font-semibold">{s.heading}</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--p1-muted)]">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
