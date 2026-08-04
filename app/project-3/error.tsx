'use client'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-red-500">Failed to render</span>
      <h1 className="p3-display mt-4 text-3xl font-semibold text-[var(--p3-ink)]">Something went wrong.</h1>
      <p className="mt-3 text-sm leading-relaxed text-[var(--p3-muted)]">
        This section couldn&rsquo;t load. Try again, or head back to the overview.
      </p>
      <button onClick={() => reset()} className="p3-btn p3-btn-solid mt-6">
        Try again
      </button>
    </div>
  )
}
