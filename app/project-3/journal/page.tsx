import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import { journal } from '../_data/content'

export const metadata: Metadata = {
  title: 'Journal — Noor Al-Kuwari',
}

export default function JournalPage() {
  return (
    <>
      <section className="border-b border-[var(--p3-border)] bg-[var(--p3-bg-alt)]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p3-eyebrow">Journal</span>
            <h1 className="p3-display mt-4 text-4xl font-semibold text-[var(--p3-ink)] sm:text-5xl">
              Thinking on Gulf brand building
            </h1>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {journal.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <div className="p3-card h-full p-7">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p3-muted-2)]">
                    {new Date(post.date + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <h2 className="p3-display p3-underline mt-3 inline text-[17px] font-semibold text-[var(--p3-ink)]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--p3-muted)]">{post.excerpt}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
