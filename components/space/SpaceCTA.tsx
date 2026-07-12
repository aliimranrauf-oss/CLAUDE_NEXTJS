// components/space/SpaceCTA.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function SpaceCTA() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
          Ready to build your space project?
        </h2>
        <p className="mt-4 text-white/65 leading-relaxed max-w-xl mx-auto">
          Tell us what you're building — a public site, an internal tool, or a data portal — and
          we'll scope a one-time build fee with full source code ownership.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
            Get Your Space Project
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            See pricing →
          </Link>
        </div>
      </div>
    </section>
  )
}
