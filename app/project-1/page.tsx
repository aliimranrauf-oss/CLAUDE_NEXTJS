import Link from 'next/link'
import Reveal from './_components/Reveal'
import ProjectPlate from './_components/ProjectPlate'
import { projects, stats, services, testimonials } from './_data/content'

export default function Project1Home() {
  const featured = projects.slice(0, 3)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--p1-line)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="p1-eyebrow">Program &amp; Structural Delivery — Abu Dhabi, UAE</span>
            <h1 className="p1-display mt-5 text-[2.6rem] font-semibold leading-[1.06] tracking-tight sm:text-6xl">
              Complex infrastructure,
              <br />
              delivered on the line
              <br />
              that matters.
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[var(--p1-muted)]">
              I&rsquo;m Ahmed Al Mansoori — a program director and structural engineer who has
              spent fourteen years turning ambitious transit, marine, and mixed-use schemes into
              buildings people actually use, on budgets that hold.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/project-1/projects" className="p1-btn p1-btn-solid">
                View the projects →
              </Link>
              <Link href="/project-1/contact" className="p1-btn">
                Start a conversation
              </Link>
            </div>
          </div>

          <div className="p1-plate p-6">
            <svg viewBox="0 0 400 260" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="var(--p1-steel)" strokeWidth="1.4">
                <polyline className="p1-draw" points="10,240 10,120 45,120 45,160 80,160 80,90 115,90 115,240" />
                <polyline
                  className="p1-draw"
                  style={{ animationDelay: '0.3s' }}
                  points="140,240 140,60 165,60 165,40 190,40 190,240"
                />
                <polyline
                  className="p1-draw"
                  style={{ animationDelay: '0.6s' }}
                  points="215,240 215,150 260,150 260,180 300,180 300,110 340,110 340,240"
                />
                <polyline
                  className="p1-draw"
                  style={{ animationDelay: '0.9s' }}
                  stroke="var(--p1-brass)"
                  points="10,240 390,240"
                />
              </g>
              <g className="p1-mono" fill="var(--p1-muted)" fontSize="9">
                <text x="10" y="252">A</text>
                <text x="115" y="252">B</text>
                <text x="215" y="252">C</text>
                <text x="340" y="252">D</text>
              </g>
            </svg>
            <div className="mt-4 flex items-center justify-between border-t border-[var(--p1-line)] pt-4">
              <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted)]">
                ELEVATION · GRID A–D
              </span>
              <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted)]">
                DWG 001
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <section className="border-b border-[var(--p1-line)]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-12 sm:px-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="p1-display text-3xl font-semibold text-[var(--p1-brass)] sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 text-xs leading-snug text-[var(--p1-muted)]">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Featured projects ────────────────────────────────── */}
      <section className="border-b border-[var(--p1-line)]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p1-eyebrow">Selected work</span>
            <h2 className="p1-display mt-3 text-3xl font-semibold sm:text-4xl">
              Three problems worth solving
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/project-1/projects/${p.slug}`} className="group block">
                  <ProjectPlate image={p.image} code={p.code} />
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-steel)]">
                        {p.category.toUpperCase()}
                      </span>
                      <span className="p1-mono text-[10px] text-[var(--p1-muted)]">{p.year}</span>
                    </div>
                    <h3 className="p1-display p1-underline mt-2 inline text-lg font-semibold">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--p1-muted)]">
                      {p.summary.slice(0, 108)}…
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Link href="/project-1/projects" className="p1-btn mt-12 inline-flex">
              All 11 projects →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Services teaser ──────────────────────────────────── */}
      <section className="border-b border-[var(--p1-line)] bg-[var(--p1-panel)]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p1-eyebrow">Capability</span>
            <h2 className="p1-display mt-3 text-3xl font-semibold sm:text-4xl">
              Where I help
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-[var(--p1-line)] sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal
                key={s.code}
                delay={i * 0.05}
                className="bg-[var(--p1-bg)] p-6"
              >
                <span className="p1-mono text-[10px] text-[var(--p1-brass)]">{s.code}</span>
                <h3 className="p1-display mt-3 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--p1-muted)]">
                  {s.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ───────────────────────────────────────── */}
      <section className="border-b border-[var(--p1-line)]">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
          <Reveal>
            <p className="p1-display text-2xl font-medium leading-snug sm:text-3xl">
              &ldquo;{testimonials[0].quote}&rdquo;
            </p>
            <p className="p1-mono mt-6 text-xs tracking-widest text-[var(--p1-muted)]">
              {testimonials[0].name.toUpperCase()} · {testimonials[0].title.toUpperCase()}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-20 sm:px-8 md:flex-row md:items-center">
          <div>
            <h2 className="p1-display text-3xl font-semibold sm:text-4xl">
              Have a program that needs
              <br className="hidden sm:block" /> a steady hand?
            </h2>
          </div>
          <Link href="/project-1/contact" className="p1-btn p1-btn-solid shrink-0">
            Get in touch →
          </Link>
        </div>
      </section>
    </>
  )
}
