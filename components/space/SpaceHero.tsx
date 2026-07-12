// components/space/SpaceHero.tsx
import Link from 'next/link'
import { Space_Mono } from 'next/font/google'
import { ArrowRight, Rocket } from 'lucide-react'
import OrbitalGlobe from './OrbitalGlobe'

// Loaded locally to this component only — does not affect the rest of the
// site's typography. Used purely for the telemetry/HUD readouts below.
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

const hud = [
  { label: 'BUILD MODEL', value: 'ONE-TIME FEE' },
  { label: 'SOURCE CODE', value: '100% YOURS' },
  { label: 'DEPLOY TARGET', value: 'VERCEL EDGE' },
  { label: 'STACK', value: 'NEXT.JS 15' },
]

export default function SpaceHero() {
  return (
    <section className={`${spaceMono.variable} relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28`}>
      {/* Ambient background gradient, matches the rest of the site's dark theme */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(1200px 600px at 80% 10%, rgba(0,212,255,0.08), transparent 60%), radial-gradient(900px 500px at 10% 90%, rgba(122,92,255,0.08), transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-14 lg:grid-cols-2 lg:items-center">
        {/* Left: copy */}
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/[0.06] px-3 py-1 text-xs font-semibold tracking-wide text-cyan"
            style={{ fontFamily: 'var(--font-space-mono), monospace' }}
          >
            <Rocket size={14} />
            BUILT FOR SPACE &amp; AEROSPACE TEAMS
          </div>

          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight">
            Web systems for teams
            <br />
            <span className="text-gradient">building beyond the atmosphere</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
            Sites, dashboards, and portals for space startups, satellite operators, and
            aerospace suppliers — one-time build fee, full source code ownership, and
            deployment on Vercel's global edge network. No subscriptions, no lock-in.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
              Get Your Space Project
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#services"
              className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
            >
              See what's included →
            </Link>
          </div>

          {/* HUD strip — mission-control readouts about how the engagement works */}
          <dl
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 sm:gap-4"
            style={{ fontFamily: 'var(--font-space-mono), monospace' }}
          >
            {hud.map((item) => (
              <div key={item.label} className="border-l-2 border-cyan/30 pl-3">
                <dt className="text-[10px] tracking-widest text-white/45">{item.label}</dt>
                <dd className="mt-1 text-sm font-bold text-cyan">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: signature orbital globe */}
        <div className="relative">
          <OrbitalGlobe />
        </div>
      </div>
    </section>
  )
}
