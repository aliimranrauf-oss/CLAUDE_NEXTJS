import type { Metadata } from 'next'
import Reveal from '../_components/Reveal'
import PulseLine from '../_components/PulseLine'
import { insights } from '../_data/content'

export const metadata: Metadata = {
  title: 'Patient Journal — Dr. Sara Al Naqbi',
}

export default function JournalPage() {
  return (
    <>
      <section className="border-b border-[var(--p4-border)] bg-[var(--p4-bg-alt)]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="p4-eyebrow">Patient Journal</span>
            <PulseLine className="p4-pulse mt-1.5" />
            <h1 className="p4-display mt-4 text-4xl font-semibold text-[var(--p4-sage-2)] sm:text-5xl">
              Notes on skin, climate &amp; care
            </h1>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {insights.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <div className="p4-card h-full p-7">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p4-muted-2)]">
                    {new Date(post.date + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <h2 className="p4-display p4-underline mt-3 inline text-[17px] font-semibold text-[var(--p4-sage-2)]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--p4-muted)]">
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
