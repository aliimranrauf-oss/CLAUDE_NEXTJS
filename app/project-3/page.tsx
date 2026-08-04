'use client'

import Link from 'next/link'
import Reveal from './_components/Reveal'
import CountUp from './_components/CountUp'
import HeroBrandBoard from './_components/HeroBrandBoard'
import CredentialsRow from './_components/CredentialsRow'
import Portrait from './_components/Portrait'
import WorkPlate from './_components/WorkPlate'
import { stats, services, work, testimonials } from './_data/content'
import { useSiteSettings } from './_context/SiteSettingsContext'

function renderHeadingLine(line: string, accentWord: string) {
  if (!accentWord || !line.includes(accentWord)) return line
  const [before, after] = line.split(accentWord)
  return (
    <>
      {before}
      <span className="text-[var(--p3-wine)]">{accentWord}</span>
      {after}
    </>
  )
}

export default function Project3Home() {
  const featured = work.slice(0, 3)
  const { settings } = useSiteSettings()
  const { hero: h, sections } = settings

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="p3-hero relative border-b border-[var(--p3-border)]">
        <div className="p3-arabesque" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:gap-10 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div>
            <div className="flex items-center gap-4">
              <Portrait variant="avatar" className="lg:hidden" />
              <span className="p3-eyebrow p3-fade-up">{h.eyebrow}</span>
            </div>

            <h1
              className="p3-display p3-fade-up mt-4 text-[2.1rem] font-semibold italic leading-[1.14] text-[var(--p3-ink)] sm:mt-5 sm:text-[3.3rem]"
              style={{ animationDelay: '0.08s' }}
            >
              <span className="block">{renderHeadingLine(h.headingLine1, h.accentWord)}</span>
              <span className="block">{renderHeadingLine(h.headingLine2, h.accentWord)}</span>
              <span className="block">{renderHeadingLine(h.headingLine3, h.accentWord)}</span>
            </h1>

            <p
              className="p3-fade-up mt-6 max-w-md text-[15.5px] leading-relaxed text-[var(--p3-muted)]"
              style={{ animationDelay: '0.16s' }}
            >
              {h.paragraph}
            </p>

            <div className="p3-fade-up mt-8 flex flex-wrap gap-4" style={{ animationDelay: '0.24s' }}>
              <Link href="/project-3/work" className="p3-btn p3-btn-solid">
                {h.ctaPrimaryLabel} →
              </Link>
              <Link href="/project-3/contact" className="p3-btn p3-btn-outline">
                {h.ctaSecondaryLabel} →
              </Link>
            </div>

            <div className="p3-fade-up" style={{ animationDelay: '0.3s' }}>
              <CredentialsRow />
            </div>
          </div>

          <div className="hidden justify-center lg:flex lg:justify-end">
            <HeroBrandBoard />
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────── */}
      {sections.showStats && (
        <section className="border-b border-[var(--p3-border)] bg-[var(--p3-bg)]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <CountUp value={s.value} className="p3-display block text-3xl font-semibold text-[var(--p3-ink)] sm:text-4xl" />
                <div className="mt-2 text-[13px] leading-snug text-[var(--p3-muted)]">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Featured work ─────────────────────────────────────── */}
      {sections.showFeaturedWork && (
        <section className="border-b border-[var(--p3-border)]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <Reveal>
              <span className="p3-eyebrow">Selected work</span>
              <h2 className="p3-display mt-4 text-3xl font-semibold text-[var(--p3-ink)] sm:text-4xl">
                Campaigns built to travel
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featured.map((w, i) => (
                <Reveal key={w.slug} delay={i * 0.08}>
                  <Link href={`/project-3/work/${w.slug}`} className="group block h-full">
                    <WorkPlate palette={w.palette as [string, string, string]} category={w.category} code={`WRK-0${i + 1}`} />
                    <h3 className="p3-display p3-underline mt-4 inline text-[16px] font-semibold text-[var(--p3-ink)]">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--p3-muted)]">
                      {w.summary.slice(0, 110)}…
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-[var(--p3-border)] pt-4 text-[12px]">
                      {w.metrics.slice(0, 2).map((m) => (
                        <span key={m.label} className="text-[var(--p3-muted)]">
                          <span className="font-semibold text-[var(--p3-ink)]">{m.value}</span> {m.label}
                        </span>
                      ))}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <Link href="/project-3/work" className="p3-btn p3-btn-outline mt-12 inline-flex">
                View all work →
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Services teaser ──────────────────────────────────── */}
      {sections.showServicesTeaser && (
        <section className="border-b border-[var(--p3-border)] bg-[var(--p3-bg-alt)]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <Reveal>
              <span className="p3-eyebrow">Core capabilities</span>
              <h2 className="p3-display mt-4 text-3xl font-semibold text-[var(--p3-ink)] sm:text-4xl">
                Where I create value
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <Reveal key={s.code} delay={i * 0.05}>
                  <div className="p3-card h-full p-6">
                    <span className="text-[11px] font-semibold tracking-widest text-[var(--p3-wine)]">{s.code}</span>
                    <h3 className="p3-display mt-3 text-[16px] font-semibold text-[var(--p3-ink)]">{s.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--p3-muted)]">{s.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonial ───────────────────────────────────────── */}
      {sections.showTestimonial && (
        <section className="border-b border-[var(--p3-border)]">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
            <Reveal>
              <p className="p3-display text-2xl italic leading-snug text-[var(--p3-ink)] sm:text-[28px]">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <p className="mt-6 text-[12px] font-semibold uppercase tracking-widest text-[var(--p3-muted)]">
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
              <h2 className="p3-display text-3xl font-semibold text-[var(--p3-ink)] sm:text-4xl">
                Ready for a brand that
                <br className="hidden sm:block" /> earns its place in market?
              </h2>
            </div>
            <Link href="/project-3/contact" className="p3-btn p3-btn-solid shrink-0">
              Book a strategy call →
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
