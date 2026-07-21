import Link from 'next/link'
import { ShoppingCart, Zap, Rocket, ArrowRight } from 'lucide-react'

// ── Server component (no interactivity needed — hover is pure CSS) ────────
// Surfaces all 3 services on the homepage. Previously Site Speed and
// Space & Aerospace were only discoverable via the Navbar menu.

const services = [
  {
    icon: ShoppingCart,
    title: 'Custom Ecommerce Store',
    description: 'Full custom online store, one-time build fee, no subscription.',
    href: '/contact',
    cta: 'Get Started',
  },
  {
    icon: Zap,
    title: 'Website Speed Optimization',
    description: 'Slow site losing customers? Get a free speed audit + fixes.',
    href: '/website-speed-optimization',
    cta: 'Free Speed Audit',
  },
  {
    icon: Rocket,
    title: 'Space & Aerospace Websites',
    description: 'Specialized websites for space-tech, satellite, and aerospace companies.',
    href: '/space',
    cta: 'Explore',
  },
]

export default function ServicesOverview() {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#00d4ff] uppercase tracking-widest mb-3 block">
            Our Services
          </span>
          <h2
            className="text-4xl sm:text-[42px] font-bold leading-[1.2] max-w-2xl mx-auto text-white"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
          >
            What We <span className="text-[#40e0ff]">Build</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Three specialized services, one build-quality standard — pick the one that fits.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, href, cta }) => (
            <Link
              key={href}
              href={href}
              className="group glass card-glow relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1px solid rgba(0,212,255,0.15)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'var(--gradient)' }}
              >
                <Icon size={22} className="text-[#0b0f1a]" strokeWidth={2.5} />
              </div>

              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {title}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                {description}
              </p>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00d4ff] group-hover:gap-2.5 transition-all">
                {cta}
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
