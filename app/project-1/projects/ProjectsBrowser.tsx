'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import ProjectPlate from '../_components/ProjectPlate'
import { projects, categories, type ProjectRecord } from '../_data/content'

export default function ProjectsBrowser() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return projects.filter((p: ProjectRecord) => {
      const matchesCategory = category === 'All' || p.category === category
      const matchesQuery =
        query.trim() === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`p1-mono px-3 py-2 text-[11px] tracking-wide transition-colors ${
                category === c
                  ? 'border border-[var(--p1-brass)] text-[var(--p1-brass)]'
                  : 'border border-[var(--p1-line-strong)] text-[var(--p1-muted)] hover:text-[var(--p1-text)]'
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by title or location…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xs text-sm sm:w-64"
          aria-label="Search projects"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 border border-dashed border-[var(--p1-line-strong)] px-6 py-16 text-center">
          <p className="p1-display text-lg font-semibold">No projects match that search.</p>
          <p className="mt-2 text-sm text-[var(--p1-muted)]">
            Try a different keyword or clear the category filter.
          </p>
          <button
            onClick={() => {
              setCategory('All')
              setQuery('')
            }}
            className="p1-btn mt-6"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.slug} href={`/project-1/projects/${p.slug}`} className="group block">
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
                <p className="mt-1 text-xs text-[var(--p1-muted)]">{p.location}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
