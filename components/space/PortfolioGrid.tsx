// components/space/PortfolioGrid.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Radar, ExternalLink, ShoppingCart } from 'lucide-react'

const featured = {
  label: 'OrbitMap',
  description:
    'Live ISS & satellite tracker — real-time 3D orbital map built from public TLE data, with visible-pass predictions for any location. Free, no signup.',
  href: 'https://www.orbitmap.space',
  tag: 'Live project',
  // This is ONLY the thumbnail photo shown on the "OrbitMap" project card
  // below, in this PortfolioGrid component. It has nothing to do with
  // SpaceHero.tsx (your page's main hero section) — that file is untouched.
  // Place the uploaded image at public/space/orbitmap-card.jpg in your project
  image: '/space/orbitmap-card.jpg',
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

        {/*
          Featured card and placeholder card sit side-by-side in a single
          grid row (placeholder stretches to match the featured card's
          height automatically). The CTA link is placed BELOW the grid,
          not inside it, so it can never affect row sizing.
        */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {/* Featured real project */}
          <a
            href={featured.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative sm:col-span-2 aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-2xl border border-cyan/20 flex flex-col items-start justify-end gap-2 p-6 transition-colors hover:border-cyan/40"
          >
            <Image
              src={featured.image}
              alt="OrbitMap — live ISS and satellite tracker with real-time 3D orbital map"
              fill
              sizes="(min-width: 640px) 66vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={false}
            />
            {/* Overlay for text legibility over the photo */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(6,8,16,0.92) 0%, rgba(6,8,16,0.55) 45%, rgba(6,8,16,0.15) 100%)',
              }}
            />

            <span className="relative rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-cyan backdrop-blur-sm">
              {featured.tag}
            </span>
            <span className="relative font-display text-xl font-bold text-white flex items-center gap-2">
              {featured.label}
              <ExternalLink size={16} className="text-white/50 group-hover:text-cyan transition-colors" />
            </span>
            <p className="relative text-sm text-white/70 leading-relaxed max-w-md">
              {featured.description}
            </p>
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

        {/* CTA link — sits below the grid, full width, not tied to grid row sizing */}
        <Link
          href="#order-tracker"
          className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-cyan hover:text-white transition-colors"
        >
          <ShoppingCart size={14} />
          Want one like this built for you? See pricing ↓
        </Link>
      </div>
    </section>
  )
}
