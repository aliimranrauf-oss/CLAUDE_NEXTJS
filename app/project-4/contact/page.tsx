import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import PulseLine from '../_components/PulseLine'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

export const metadata: Metadata = {
  title: 'Contact — Dr. Sara Al Naqbi',
}

export default function ContactPage() {
  return (
    <section className="border-b border-[var(--p4-border)]">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal>
            <span className="p4-eyebrow">Contact</span>
            <PulseLine className="p4-pulse mt-1.5" />
            <h1 className="p4-display mt-4 text-4xl font-semibold text-[var(--p4-sage-2)] sm:text-[2.75rem]">
              Book a consultation
            </h1>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--p4-muted)]">
              Whether it&rsquo;s a specific skin concern or a general check-up, I&rsquo;m happy
              to talk it through and recommend next steps.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactInfo />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="p4-card p-8 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
