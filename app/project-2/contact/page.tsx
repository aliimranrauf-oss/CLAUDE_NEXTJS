import type { Metadata } from 'next'
import { MapPin, Mail, Clock } from 'lucide-react'
import Reveal from '../_components/Reveal'
import ContactForm from './ContactForm'
import { profile } from '../_data/content'

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
            <div className="p2-card mt-9 flex flex-col gap-5 p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--p2-gold-tint)] text-[var(--p2-gold)]">
                  <MapPin size={16} />
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-[var(--p2-navy)]">Location</div>
                  <div className="text-[13px] text-[var(--p2-muted)]">{profile.location}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--p2-gold-tint)] text-[var(--p2-gold)]">
                  <Mail size={16} />
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-[var(--p2-navy)]">Email</div>
                  <div className="text-[13px] text-[var(--p2-muted)]">hello@khalidalmansour.demo</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--p2-gold-tint)] text-[var(--p2-gold)]">
                  <Clock size={16} />
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-[var(--p2-navy)]">Response time</div>
                  <div className="text-[13px] text-[var(--p2-muted)]">Within one business day</div>
                </div>
              </div>
            </div>
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
