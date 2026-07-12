// components/space/PortfolioGrid.tsx
import { Radar, ExternalLink, Satellite } from 'lucide-react'

const featured = {
  label: 'Orbit Watch',
  description:
    'Live ISS & satellite tracker — real-time 3D orbital map built from public TLE data, with visible-pass predictions for any location. Free, no signup.',
  href: 'https://orbit-watch-zeta.vercel.app/',
  tag: 'Live project',
}

const placeholder = {
  icon: Radar,
  label: 'Ground Station Portal',
  tag: 'Case study coming soon',
}

export default function PortfolioGrid() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-semibold tracking-widest text-cyan">EXAMPLES</span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
          The kind of work this looks like
        </h2>
        <p className="mt-4 max-w-xl text-white/65 leading-relaxed">
          One live project below, more real space &amp; aerospace work coming as it ships.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {/* Featured real project */}
          <a
            href={featured.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative sm:col-span-2 aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-2xl border border-cyan/20 flex flex-col items-start justify-end gap-2 p-6 transition-colors hover:border-cyan/40"
            style={{
              background:
                'radial-gradient(circle at 20% 15%, rgba(0,212,255,0.16), transparent 55%), radial-gradient(circle at 85% 85%, rgba(122,92,255,0.14), transparent 55%), #0e1424',
            }}
          >
            <Satellite className="absolute right-6 top-6 text-white/10 group-hover:text-cyan/20 transition-colors" size={64} />
            <span className="rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-cyan">
              {featured.tag}
            </span>
            <span className="font-display text-xl font-bold text-white flex items-center gap-2">
              {featured.label}
              <ExternalLink size={16} className="text-white/50 group-hover:text-cyan transition-colors" />
            </span>
            <p className="text-sm text-white/60 leading-relaxed max-w-md">{featured.description}</p>
          </a>

          {/* Placeholder for what's next */}
          <div
            className="relative aspect-[4/3] sm:aspect-auto overflow-hidden rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3 text-center px-4"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, rgba(0,212,255,0.10), transparent 60%), radial-gradient(circle at 80% 80%, rgba(122,92,255,0.10), transparent 55%), #0e1424',
            }}
          >
            <placeholder.icon className="text-white/25" size={34} />
            <span className="font-display font-bold text-white/70">{placeholder.label}</span>
            <span className="text-xs text-white/35">{placeholder.tag}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
