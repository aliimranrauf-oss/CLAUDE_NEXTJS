'use client'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <span className="p1-mono text-xs tracking-widest text-[var(--p1-danger)]">DRAWING FAILED TO RENDER</span>
      <h1 className="p1-display mt-4 text-3xl font-semibold">Something went wrong.</h1>
      <p className="mt-3 text-sm leading-relaxed text-[var(--p1-muted)]">
        This section couldn&rsquo;t load. Try again, or head back to the overview.
      </p>
      <button onClick={() => reset()} className="p1-btn p1-btn-solid mt-6">
        Try again
      </button>
    </div>
  )
}
