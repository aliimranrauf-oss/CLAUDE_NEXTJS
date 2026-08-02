export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center gap-4 px-5">
      <div className="p1-mono text-xs tracking-widest text-[var(--p1-muted)]">LOADING SHEET…</div>
      <div className="h-px w-40 overflow-hidden bg-[var(--p1-line-strong)]">
        <div
          className="h-full w-1/3 bg-[var(--p1-brass)]"
          style={{ animation: 'p1-loading-sweep 1.1s ease-in-out infinite' }}
        />
      </div>
      <style>{`
        @keyframes p1-loading-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  )
}
