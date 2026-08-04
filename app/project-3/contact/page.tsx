import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

export const metadata: Metadata = {
  title: 'Contact — Noor Al-Kuwari',
}

export default function ContactPage() {
  return (
    <section className="border-b border-[var(--p3-border)]">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal>
            <span className="p3-eyebrow">Contact</span>
            <h1 className="p3-display mt-4 text-4xl font-semibold text-[var(--p3-ink)] sm:text-[2.75rem]">
              Book a strategy call
            </h1>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--p3-muted)]">
              Whether it&rsquo;s a full rebrand or a single market-entry question, I&rsquo;m happy
              to talk it through.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactInfo />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="p3-plate p-8 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
