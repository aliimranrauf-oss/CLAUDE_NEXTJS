import Link from 'next/link'
import Reveal from './_components/Reveal'
import CountUp from './_components/CountUp'
import HeroPhoto from './_components/HeroPhoto'
import HeroStatCards from './_components/HeroStatCards'
import CredentialsRow from './_components/CredentialsRow'
import { hero, stats, services, experience, testimonials } from './_data/content'

export default function Project2Home() {
  const featured = experience.slice(0, 3)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="p2-hero relative border-b border-[var(--p2-border)]">
        <HeroPhoto />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div>
            <span className="p2-eyebrow p2-fade-up">{hero.eyebrow}</span>

            <h1 className="p2-display p2-fade-up mt-5 text-[2.5rem] font-semibold italic leading-[1.12] text-[var(--p2-navy)] sm:text-[3.4rem]" style={{ animationDelay: '0.08s' }}>
              {hero.headingLines.map((line, i) => (
                <span key={i} className="block">
                  {typeof line.accent === 'string' && line.accent ? (
                    <>
                      {line.text.split(line.accent)[0]}
                      <span className="text-[var(--p2-gold)]">{line.accent}</span>
                      {line.text.split(line.accent)[1]}
                    </>
                  ) : (
                    line.text
                  )}
                </span>
              ))}
            </h1>

            <p className="p2-fade-up mt-6 max-w-md text-[15.5px] leading-relaxed text-[var(--p2-muted)]" style={{ animationDelay: '0.16s' }}>
              {hero.paragraph}
            </p>

            <div className="p2-fade-up mt-8 flex flex-wrap gap-4" style={{ animationDelay: '0.24s' }}>
              <Link href={hero.ctaPrimary.href} className="p2-btn p2-btn-solid">
                {hero.ctaPrimary.label} →
              </Link>
              <Link href={hero.ctaSecondary.href} className="p2-btn p2-btn-outline">
                {hero.ctaSecondary.label} →
              </Link>
            </div>

            <div className="p2-fade-up" style={{ animationDelay: '0.3s' }}>
              <CredentialsRow />
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroStatCards />
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <section className="border-b border-[var(--p2-border)] bg-[var(--p2-bg)]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <CountUp
                value={s.value}
                className="p2-display block text-3xl font-bold text-[var(--p2-navy)] sm:text-4xl"
              />
              <div className="mt-2 text-[13px] leading-snug text-[var(--p2-muted)]">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Experience highlights ────────────────────────────── */}
      <section className="border-b border-[var(--p2-border)]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p2-eyebrow">Selected experience</span>
            <h2 className="p2-display mt-4 text-3xl font-semibold text-[var(--p2-navy)] sm:text-4xl">
              Impact across the finance function
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((e, i) => (
              <Reveal key={e.slug} delay={i * 0.08}>
                <Link href="/project-2/experience" className="group block h-full">
                  <div className="p2-card flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p2-gold)]">
                        {e.category}
                      </span>
                      <span className="text-[11px] text-[var(--p2-muted-2)]">{e.year}</span>
                    </div>
                    <h3 className="p2-display p2-underline mt-3 inline text-[17px] font-semibold text-[var(--p2-navy)]">
                      {e.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--p2-muted)]">
                      {e.summary.slice(0, 118)}…
                    </p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 border-t border-[var(--p2-border)] pt-4 text-[12px]">
                      {e.metrics.slice(0, 2).map((m) => (
                        <span key={m.label} className="text-[var(--p2-muted)]">
                          <span className="font-semibold text-[var(--p2-navy)]">{m.value}</span> {m.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Link href="/project-2/experience" className="p2-btn p2-btn-outline mt-12 inline-flex">
              View full experience →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Services teaser ──────────────────────────────────── */}
      <section className="border-b border-[var(--p2-border)] bg-[var(--p2-bg-alt)]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p2-eyebrow">Core capabilities</span>
            <h2 className="p2-display mt-4 text-3xl font-semibold text-[var(--p2-navy)] sm:text-4xl">
              Where I create value
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.code} delay={i * 0.05}>
                <div className="p2-card h-full p-6">
                  <span className="text-[11px] font-semibold tracking-widest text-[var(--p2-gold)]">
                    {s.code}
                  </span>
                  <h3 className="p2-display mt-3 text-[16px] font-semibold text-[var(--p2-navy)]">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--p2-muted)]">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ───────────────────────────────────────── */}
      <section className="border-b border-[var(--p2-border)]">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
          <Reveal>
            <p className="p2-accent text-2xl italic leading-snug text-[var(--p2-navy)] sm:text-[28px]">
              &ldquo;{testimonials[0].quote}&rdquo;
            </p>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-widest text-[var(--p2-muted)]">
              {testimonials[0].name} · {testimonials[0].title}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-20 sm:px-8 md:flex-row md:items-center">
          <div>
            <h2 className="p2-display text-3xl font-semibold text-[var(--p2-navy)] sm:text-4xl">
              Ready for a finance function
              <br className="hidden sm:block" /> built to scale?
            </h2>
          </div>
          <Link href="/project-2/contact" className="p2-btn p2-btn-solid shrink-0">
            Schedule a consultation →
          </Link>
        </div>
      </section>
    </>
  )
}
