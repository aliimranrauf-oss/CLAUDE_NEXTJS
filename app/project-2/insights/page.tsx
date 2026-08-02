import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import { insights } from '../_data/content'

export const metadata: Metadata = {
  title: 'Insights — Khalid Al-Mansour',
}

export default function InsightsPage() {
  return (
    <>
      <section className="border-b border-[var(--p2-border)] bg-[var(--p2-bg-alt)]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p2-eyebrow">Insights</span>
            <h1 className="p2-display mt-4 text-4xl font-semibold text-[var(--p2-navy)] sm:text-5xl">
              Thinking on finance leadership
            </h1>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {insights.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <div className="p2-card h-full p-7">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p2-muted-2)]">
                    {new Date(post.date + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <h2 className="p2-display p2-underline mt-3 inline text-[17px] font-semibold text-[var(--p2-navy)]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--p2-muted)]">
                    {post.excerpt}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
