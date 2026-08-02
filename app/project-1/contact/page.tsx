import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import ContactForm from './ContactForm'
import { contactInfo } from '../_data/content'

export const metadata: Metadata = {
  title: 'Contact — Ahmed Al Mansoori',
  description: 'Get in touch with Ahmed Al Mansoori about a program, project, or advisory engagement.',
  robots: { index: false, follow: false },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <span className="p1-eyebrow">Contact</span>
            <h1 className="p1-display mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              Let&rsquo;s talk about the program.
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--p1-muted)]">
              {contactInfo.availability}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 space-y-5 border-t border-[var(--p1-line)] pt-8">
            <div>
              <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">BASE</span>
              <p className="mt-1 text-sm">{contactInfo.base}</p>
            </div>
            <div>
              <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">RESPONSE TIME</span>
              <p className="mt-1 text-sm">Within one business day</p>
            </div>
            <div>
              <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">ENGAGEMENT SIZE</span>
              <p className="mt-1 text-sm">Programs from AED 50M and above</p>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-10 border border-dashed border-[var(--p1-line-strong)] p-5 text-xs leading-relaxed text-[var(--p1-muted-2)]">
            This is a demonstration portfolio. The form below simulates a submission and does not
            send data anywhere.
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  )
}
