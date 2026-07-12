// components/space/PortfolioGrid.tsx
import { Satellite, Radar, Rocket } from 'lucide-react'

const placeholders = [
  { icon: Satellite, label: 'Satellite Ops Dashboard', tag: 'Case study coming soon' },
  { icon: Radar, label: 'Ground Station Portal', tag: 'Case study coming soon' },
  { icon: Rocket, label: 'Launch Provider Website', tag: 'Case study coming soon' },
]

export default function PortfolioGrid() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-semibold tracking-widest text-cyan">EXAMPLES</span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
          The kind of work this looks like
        </h2>
        <p className="mt-4 max-w-xl text-white/65 leading-relaxed">
          We're building out this section with real space &amp; aerospace projects as they ship.
          Here's the shape of what's coming.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {placeholders.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.label}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3 text-center px-4"
                style={{
                  background:
                    'radial-gradient(circle at 30% 20%, rgba(0,212,255,0.10), transparent 60%), radial-gradient(circle at 80% 80%, rgba(122,92,255,0.10), transparent 55%), #0e1424',
                }}
              >
                <Icon className="text-white/25" size={34} />
                <span className="font-display font-bold text-white/70">{p.label}</span>
                <span className="text-xs text-white/35">{p.tag}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
