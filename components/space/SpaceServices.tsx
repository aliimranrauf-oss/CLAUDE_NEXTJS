// components/space/SpaceServices.tsx
import { Globe2, LineChart, Wrench, ShoppingBag, GraduationCap, ShieldCheck } from 'lucide-react'

const services = [
  {
    icon: Globe2,
    title: 'Websites & Landing Pages',
    description:
      'Marketing sites and launch pages built for space startups — fast, credible, and easy to update as your mission evolves.',
    example: 'Example: a company site for a small-sat propulsion startup, ready before a funding round.',
  },
  {
    icon: LineChart,
    title: 'Data Visualization Dashboards',
    description:
      'Real-time dashboards and portals that turn telemetry, orbital, or mission data into something your team and customers can actually read.',
    example: 'Example: a live tracking portal showing satellite health and pass schedules.',
  },
  {
    icon: Wrench,
    title: 'Internal Tools & Web Apps',
    description:
      'Purpose-built internal tools — fleet management, mission planning, ground-station scheduling — instead of forcing your workflow into a generic SaaS tool.',
    example: 'Example: a scheduling tool for coordinating ground-station uplink windows.',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce for Space Merch & Data Products',
    description:
      'Online stores for merchandise, mission patches, or data products — with Stripe/PayPal checkout, built the same way as our main e-commerce platform.',
    example: 'Example: a store selling mission-patch merch and licensed imagery data sets.',
  },
  {
    icon: GraduationCap,
    title: 'Educational & Community Platforms',
    description:
      'Platforms for STEM outreach, cohort-based courses, or community hubs where members can log in, track progress, and discuss.',
    example: 'Example: a members-only hub for a university CubeSat program.',
  },
  {
    icon: ShieldCheck,
    title: 'Investor & Compliance Portals',
    description:
      'Secure, access-controlled portals for sharing investor updates, technical documentation, or export-control-sensitive materials.',
    example: 'Example: a gated data room for investor diligence during a raise.',
  },
]

export default function SpaceServices() {
  return (
    <section id="services" className="py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest text-cyan">WHAT WE BUILD</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Six ways we support space &amp; aerospace teams
          </h2>
          <p className="mt-4 text-white/65 leading-relaxed">
            Every project starts from the same foundation — Next.js, Tailwind, Supabase, deployed
            on Vercel — then gets shaped around what your mission actually needs.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-cyan/25 transition-colors"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{s.description}</p>
                <p className="mt-4 text-xs text-white/40 leading-relaxed border-t border-white/5 pt-3">
                  {s.example}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
