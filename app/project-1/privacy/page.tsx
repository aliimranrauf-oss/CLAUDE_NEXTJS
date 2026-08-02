import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'

export const metadata: Metadata = {
  title: 'Privacy Policy — Ahmed Al Mansoori',
  robots: { index: false, follow: false },
}

const sections = [
  {
    heading: '1. Scope',
    body: 'This policy covers information collected through this portfolio site, including the contact form on the Contact page and any demo account activity within the Client Portal.',
  },
  {
    heading: '2. Information collected',
    body: 'The contact form collects the name, email address, organisation, and message you choose to provide. This demonstration site does not transmit that information anywhere — submissions are handled entirely in your browser.',
  },
  {
    heading: '3. Client Portal demo data',
    body: 'The Client Portal uses a demo account with sample project data for illustration only. No real client information is stored, and portal sessions are kept in your browser\u2019s local storage rather than a server.',
  },
  {
    heading: '4. Cookies & analytics',
    body: 'This demonstration site does not use tracking cookies or third-party analytics.',
  },
  {
    heading: '5. Third parties',
    body: 'No information collected on this site is shared with, or sold to, any third party.',
  },
  {
    heading: '6. Contact',
    body: 'Questions about this policy can be raised through the Contact page.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <span className="p1-eyebrow">Legal</span>
        <h1 className="p1-display mt-3 text-4xl font-semibold">Privacy Policy</h1>
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
