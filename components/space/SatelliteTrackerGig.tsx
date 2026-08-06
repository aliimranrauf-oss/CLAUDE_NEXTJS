// components/space/SatelliteTrackerGig.tsx
import { Check, ArrowRight } from 'lucide-react'

const CONTACT_URL = '/contact'

const tiers = [
  {
    name: 'ISS Live Tracker',
    price: '$150',
    delivery: '2-day delivery',
    revisions: '1 Revision',
    description: '3D globe with real-time ISS tracking, 2D map view, and pass predictions.',
    features: [
      'Functional website',
      '1 page',
      '1 plugin/extension',
      '1 product',
      'Speed optimization',
      'Hosting setup',
    ],
    highlighted: false,
  },
  {
    name: 'Full Satellite Network',
    price: '$320',
    delivery: '3-day delivery',
    revisions: '2 Revisions',
    description: 'Everything in Basic, plus 14,000+ satellites, advanced filters, and location alerts.',
    features: [
      'Functional website',
      '1 page',
      '1 plugin/extension',
      '1 product',
      'Speed optimization',
      'Hosting setup',
    ],
    highlighted: true,
  },
  {
    name: 'Complete Platform + Source Code',
    price: '$700',
    delivery: '4-day delivery',
    revisions: '3 Revisions',
    description: 'Everything in Standard, plus user accounts, notifications, source code, and support.',
    features: [
      'Functional website',
      '2 pages',
      '1 plugin/extension',
      '1 product',
      'Speed optimization',
      'Hosting setup',
    ],
    highlighted: false,
  },
]

export default function SatelliteTrackerGig() {
  return (
    <section id="order-tracker" className="py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-semibold tracking-widest text-violet">READY-MADE BUILD</span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight max-w-2xl">
          Want the same kind of build as Orbit Watch?
        </h2>
        <p className="mt-4 max-w-xl text-white/65 leading-relaxed">
          A real-time 3D satellite tracker with live ISS tracking, built with Three.js and Next.js,
          deployed on Vercel. Pick a tier and order directly — no back-and-forth scoping needed.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                tier.highlighted
                  ? 'border-cyan/40 bg-cyan/[0.05]'
                  : 'border-white/5 glass'
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-cyan px-3 py-1 text-[11px] font-bold text-[#0b0f1a]">
                  MOST POPULAR
                </span>
              )}

              <h3 className="font-display text-lg font-bold">{tier.name}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed min-h-[3rem]">
                {tier.description}
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold text-gradient">{tier.price}</span>
              </div>
              <p
                className="mt-1 text-xs text-white/45"
                style={{ fontFamily: 'var(--font-space-mono, monospace)' }}
              >
                {tier.delivery} · {tier.revisions}
              </p>

              <ul className="mt-6 space-y-2.5 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                    <Check size={16} className="mt-0.5 shrink-0 text-cyan" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={CONTACT_URL}
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  tier.highlighted
                    ? 'btn-primary'
                    : 'border border-white/15 text-white/80 hover:border-cyan/30 hover:text-white'
                }`}
              >
                Contact Us
                <ArrowRight size={15} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
