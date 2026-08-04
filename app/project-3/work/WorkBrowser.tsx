'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import WorkPlate from '../_components/WorkPlate'
import { work } from '../_data/content'

const CATEGORIES = ['All', ...Array.from(new Set(work.map((w) => w.category)))] as const

export default function WorkBrowser() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return work.filter((w) => {
      const matchesCategory = category === 'All' || w.category === category
      const matchesQuery =
        query.trim() === '' ||
        w.title.toLowerCase().includes(query.toLowerCase()) ||
        w.client.toLowerCase().includes(query.toLowerCase()) ||
        w.category.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                category === c
                  ? 'border border-[var(--p3-wine)] text-[var(--p3-wine)]'
                  : 'border border-[var(--p3-border-strong)] text-[var(--p3-muted)] hover:text-[var(--p3-ink)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by title or client…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xs text-sm sm:w-64"
          aria-label="Search work"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 border border-dashed border-[var(--p3-border-strong)] px-6 py-16 text-center">
          <p className="p3-display text-lg font-semibold text-[var(--p3-ink)]">No campaigns match that search.</p>
          <p className="mt-2 text-sm text-[var(--p3-muted)]">Try a different keyword or clear the category filter.</p>
          <button
            onClick={() => {
              setCategory('All')
              setQuery('')
            }}
            className="p3-btn p3-btn-outline mt-6"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w, i) => (
            <Link key={w.slug} href={`/project-3/work/${w.slug}`} className="group block">
              <WorkPlate palette={w.palette as [string, string, string]} category={w.category} code={`WRK-0${i + 1}`} />
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--p3-wine)]">
                    {w.category}
                  </span>
                  <span className="text-[10px] text-[var(--p3-muted-2)]">{w.year}</span>
                </div>
                <h3 className="p3-display p3-underline mt-2 inline text-lg font-semibold text-[var(--p3-ink)]">
                  {w.title}
                </h3>
                <p className="mt-1 text-xs text-[var(--p3-muted)]">{w.client}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
