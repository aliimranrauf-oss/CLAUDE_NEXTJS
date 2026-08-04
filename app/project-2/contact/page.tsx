import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

export const metadata: Metadata = {
  title: 'Contact — Khalid Al-Mansour',
}

export default function ContactPage() {
  return (
    <section className="border-b border-[var(--p2-border)]">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal>
            <span className="p2-eyebrow">Contact</span>
            <h1 className="p2-display mt-4 text-4xl font-semibold text-[var(--p2-navy)] sm:text-[2.75rem]">
              Schedule a consultation
            </h1>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--p2-muted)]">
              Whether it&rsquo;s a finance transformation program or a single strategic
              question, I&rsquo;m happy to talk it through.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactInfo />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="p2-card p-8 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
