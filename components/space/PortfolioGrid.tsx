// components/space/PortfolioGrid.tsx
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, ShoppingCart } from 'lucide-react'

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

        <div className="mt-12">
          {/* Featured real project */}
          <a
            href={featured.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/3] sm:aspect-[21/9] overflow-hidden rounded-2xl border border-cyan/20 flex flex-col items-start justify-end gap-2 p-6 sm:p-8 transition-colors hover:border-cyan/40"
          >
            <Image
              src={featured.image}
              alt="OrbitMap — live ISS and satellite tracker with real-time 3D orbital map"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={false}
            />
            {/* Subtle overlay — only darkens the bottom strip behind the text, rest of the photo stays bright */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(6,8,16,0.85) 0%, rgba(6,8,16,0.35) 25%, rgba(6,8,16,0) 50%)',
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
        </div>

        {/* CTA link */}
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
