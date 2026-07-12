// components/space/TechStackStrip.tsx
const stack = ['Next.js', 'Tailwind CSS', 'Supabase', 'Vercel', 'GitHub']

export default function TechStackStrip() {
  return (
    <section className="border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-white/50">
            Same production stack as the rest of MakeMyStore.online — nothing exotic, nothing you
            can't hand to another developer later.
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-3"
            style={{ fontFamily: 'var(--font-space-mono, monospace)' }}
          >
            {stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-bold tracking-wide text-white/75"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
