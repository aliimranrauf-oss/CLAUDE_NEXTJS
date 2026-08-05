'use client'

import Link from 'next/link'
import Reveal from './_components/Reveal'
import CountUp from './_components/CountUp'
import Portrait from './_components/Portrait'
import HeroStatCards from './_components/HeroStatCards'
import CredentialsRow from './_components/CredentialsRow'
import PulseLine from './_components/PulseLine'
import { profile, stats, services, experience, testimonials } from './_data/content'
import { useSiteSettings } from './_context/SiteSettingsContext'

function renderHeadingLine(line: string, accentWord: string) {
  if (!accentWord || !line.includes(accentWord)) return line
  const [before, after] = line.split(accentWord)
  return (
    <>
      {before}
      <span className="text-[var(--p4-clay)]">{accentWord}</span>
      {after}
    </>
  )
}

export default function Project4Home() {
  const featured = experience.slice(0, 3)
  const { settings } = useSiteSettings()
  const { hero: h, sections } = settings

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="p4-hero relative border-b border-[var(--p4-border)]">
        <div className="p4-hero-blobs" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:py-24">
          <div>
            <div>
              <span className="p4-eyebrow p4-fade-up">{h.eyebrow}</span>
              <PulseLine className="p4-pulse p4-fade-up mt-1.5" />
            </div>

            <h1 className="p4-display p4-fade-up mt-5 text-[2.5rem] font-medium italic leading-[1.14] text-[var(--p4-sage-2)] sm:text-[3.3rem]" style={{ animationDelay: '0.08s' }}>
              <span className="block">{renderHeadingLine(h.headingLine1, h.accentWord)}</span>
              <span className="block">{renderHeadingLine(h.headingLine2, h.accentWord)}</span>
              <span className="block">{renderHeadingLine(h.headingLine3, h.accentWord)}</span>
            </h1>

            <p className="p4-fade-up mt-6 max-w-md text-[15.5px] leading-relaxed text-[var(--p4-muted)]" style={{ animationDelay: '0.16s' }}>
              {h.paragraph}
            </p>

            <div className="p4-fade-up mt-8 flex flex-wrap gap-4" style={{ animationDelay: '0.24s' }}>
              <Link href="/project-4/treatments" className="p4-btn p4-btn-solid">
                {h.ctaPrimaryLabel} →
              </Link>
              <Link href="/project-4/contact" className="p4-btn p4-btn-outline">
                {h.ctaSecondaryLabel} →
              </Link>
            </div>

            <div className="p4-fade-up" style={{ animationDelay: '0.3s' }}>
              <CredentialsRow />
            </div>

            <p className="p4-arabic p4-fade-up mt-8 text-lg text-[var(--p4-muted-2)]" style={{ animationDelay: '0.34s' }} dir="rtl">
              {profile.nameArabic}
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 lg:items-end">
            <Portrait className="w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px]" />
            <div className="w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px]">
              <HeroStatCards />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────── */}
      {sections.showStats && (
        <section className="border-b border-[var(--p4-border)] bg-[var(--p4-bg)]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <CountUp
                  value={s.value}
                  className="p4-display block text-3xl font-bold text-[var(--p4-sage-2)] sm:text-4xl"
                />
                <div className="mt-2 text-[13px] leading-snug text-[var(--p4-muted)]" dangerouslySetInnerHTML={{ __html: s.label }} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Experience highlights ────────────────────────────── */}
      {sections.showExperienceHighlights && (
        <section className="border-b border-[var(--p4-border)]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <Reveal>
              <span className="p4-eyebrow">Selected experience</span>
              <PulseLine className="p4-pulse mt-1.5" />
              <h2 className="p4-display mt-4 text-3xl font-semibold text-[var(--p4-sage-2)] sm:text-4xl">
                Trusted across Dubai and Abu Dhabi
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featured.map((e, i) => (
                <Reveal key={e.slug} delay={i * 0.08}>
                  <Link href="/project-4/experience" className="group block h-full">
                    <div className="p4-card flex h-full flex-col p-6">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p4-clay)]"
                          dangerouslySetInnerHTML={{ __html: e.category }}
                        />
                        <span className="text-[11px] text-[var(--p4-muted-2)]">{e.year}</span>
                      </div>
                      <h3
                        className="p4-display p4-underline mt-3 inline text-[17px] font-semibold text-[var(--p4-sage-2)]"
                        dangerouslySetInnerHTML={{ __html: e.title }}
                      />
                      <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--p4-muted)]">
                        {e.summary.replace(/&rsquo;/g, '\u2019').slice(0, 118)}…
                      </p>
                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 border-t border-[var(--p4-border)] pt-4 text-[12px]">
                        {e.metrics.slice(0, 2).map((m) => (
                          <span key={m.label} className="text-[var(--p4-muted)]">
                            <span
                              className="font-semibold text-[var(--p4-sage-2)]"
                              dangerouslySetInnerHTML={{ __html: m.value }}
                            />{' '}
                            {m.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <Link href="/project-4/experience" className="p4-btn p4-btn-outline mt-12 inline-flex">
                View full experience →
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Services teaser ──────────────────────────────────── */}
      {sections.showServicesTeaser && (
        <section className="border-b border-[var(--p4-border)] bg-[var(--p4-bg-alt)]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <Reveal>
              <span className="p4-eyebrow">Core treatments</span>
              <PulseLine className="p4-pulse mt-1.5" />
              <h2 className="p4-display mt-4 text-3xl font-semibold text-[var(--p4-sage-2)] sm:text-4xl">
                Where I focus my practice
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <Reveal key={s.code} delay={i * 0.05}>
                  <div className="p4-card h-full p-6">
                    <span className="text-[11px] font-semibold tracking-widest text-[var(--p4-clay)]">
                      {s.code}
                    </span>
                    <h3
                      className="p4-display mt-3 text-[16px] font-semibold text-[var(--p4-sage-2)]"
                      dangerouslySetInnerHTML={{ __html: s.title }}
                    />
                    <p
                      className="mt-2 text-[13.5px] leading-relaxed text-[var(--p4-muted)]"
                      dangerouslySetInnerHTML={{ __html: s.description }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonial ───────────────────────────────────────── */}
      {sections.showTestimonial && (
        <section className="border-b border-[var(--p4-border)]">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
            <Reveal>
              <p className="p4-display text-2xl italic leading-snug text-[var(--p4-sage-2)] sm:text-[28px]">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <p className="mt-6 text-[12px] font-semibold uppercase tracking-widest text-[var(--p4-muted)]">
                {testimonials[0].name} · {testimonials[0].title}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────── */}
      {sections.showFinalCta && (
        <section>
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-20 sm:px-8 md:flex-row md:items-center">
            <div>
              <h2 className="p4-display text-3xl font-semibold text-[var(--p4-sage-2)] sm:text-4xl">
                Ready to talk about
                <br className="hidden sm:block" /> your skin?
              </h2>
            </div>
            <Link href="/project-4/contact" className="p4-btn p4-btn-clay shrink-0">
              Book a consultation →
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
