'use client'

// components/careers/CareersBlogTeaser.tsx
//
// 3 blog cards for clients who want more context before committing — links
// out to /blog/[slug] for each post. Card visual pattern matches
// CareersExamples.tsx. Content itself lives in app/careers/dictionary.ts
// (blogTeaser.items) so it stays bilingual like the rest of the page; the
// actual blog posts live in the `blogs` Supabase table.
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useLanguage } from '@/app/careers/LanguageProvider'

export default function CareersBlogTeaser() {
  const { dict } = useLanguage()
  const t = dict.blogTeaser

  return (
    <section className="py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-body text-xs font-semibold tracking-widest text-cyan">{t.eyebrow}</span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{t.heading}</h2>
          <p className="font-body mt-4 text-white/65 leading-relaxed">{t.subheading}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {t.items.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                aria-label={post.alt}
                className="group flex flex-col h-full rounded-2xl border border-white/10 bg-white/[0.025] p-6 hover:border-cyan/30 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-cyan/25 bg-cyan/[0.08] text-cyan mb-5">
                  <BookOpen size={18} aria-hidden />
                </div>
                <h3 className="font-display text-base font-bold leading-snug mb-2 group-hover:text-cyan transition-colors">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-white/60 leading-relaxed flex-1">{post.excerpt}</p>
                <span className="font-body mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan">
                  {t.readMore}
                  <ArrowRight size={13} aria-hidden className="rtl:rotate-180" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
