import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'

export const metadata: Metadata = {
  title: 'Privacy Policy — Noor Al-Kuwari',
}

export default function PrivacyPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <Reveal>
          <span className="p3-eyebrow">Legal</span>
          <h1 className="p3-display mt-4 text-3xl font-semibold text-[var(--p3-ink)] sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-[14px] leading-relaxed text-[var(--p3-muted)]">
            This site is a demonstration portfolio built for design showcase purposes only. It
            does not collect, store, or process any real personal data. The contact form on this
            site is simulated — messages submitted here are not sent anywhere and are discarded
            when you leave the page.
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-[var(--p3-muted)]">
            No cookies, analytics, or tracking scripts specific to this demo are used to profile
            visitors of this page beyond what the host site already uses.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
