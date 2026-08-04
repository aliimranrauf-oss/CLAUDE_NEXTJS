import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import Reveal from '../_components/Reveal'
import { about, profile } from '../_data/content'

export const metadata: Metadata = {
  title: 'About — Noor Al-Kuwari',
}

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--p3-border)] bg-[var(--p3-bg-alt)]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p3-eyebrow">About</span>
            <h1 className="p3-display mt-4 text-4xl font-semibold text-[var(--p3-ink)] sm:text-5xl">
              Career narrative &amp; philosophy
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-[var(--p3-border)]">
        <div className="mx-auto grid max-w-5xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            {about.narrative.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className="mb-5 max-w-2xl text-[15.5px] leading-relaxed text-[var(--p3-text)]"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="p3-plate mt-8 p-7">
                <span className="p3-eyebrow">Philosophy</span>
                <p className="p3-display mt-4 text-xl italic leading-relaxed text-[var(--p3-ink)]">
                  &ldquo;{about.philosophy}&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="p3-card p-7">
              <span className="p3-eyebrow">Credentials</span>
              <ul className="mt-5 flex flex-col gap-3.5">
                {about.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-[13.5px] text-[var(--p3-text)]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--p3-wine)]" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-[var(--p3-border)] pt-5 text-[13px] text-[var(--p3-muted)]">
                Based in {profile.location}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
