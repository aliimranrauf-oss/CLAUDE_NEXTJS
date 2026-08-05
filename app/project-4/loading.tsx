export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center gap-4 px-5">
      <div className="text-xs font-semibold uppercase tracking-widest text-[var(--p4-muted)]">Loading…</div>
      <div className="h-px w-40 overflow-hidden bg-[var(--p4-border-strong)]">
        <div
          className="h-full w-1/3 bg-[var(--p4-clay)]"
          style={{ animation: 'p4-loading-sweep 1.1s ease-in-out infinite' }}
        />
      </div>
      <style>{`
        @keyframes p4-loading-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  )
}
