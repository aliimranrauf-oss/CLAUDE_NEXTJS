// components/space/WhyUs.tsx
import { CheckCircle2 } from 'lucide-react'

const points = [
  {
    title: 'One-time fee, no monthly charges',
    body: "You pay once for the build. What you deploy it on afterward — your own hosting, a free-tier host, or Vercel — is your call.",
  },
  {
    title: 'Full source code ownership',
    body: 'The complete codebase ships to your GitHub repo. Nothing is licensed back to us, and nothing breaks if we\'re not involved anymore.',
  },
  {
    title: 'Fast, and built to stay fast',
    body: 'Server-rendered data, optimized images, and lean bundles — the same performance discipline you can see in the rest of this site.',
  },
  {
    title: 'Built for technical audiences',
    body: 'Copy and structure written for engineers, investors, and agencies evaluating your work — not generic startup filler.',
  },
]

export default function WhyUs() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="text-xs font-semibold tracking-widest text-violet">WHY US</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Built like mission hardware, not a template
          </h2>
          <p className="mt-4 text-white/65 leading-relaxed max-w-md">
            Space and aerospace audiences can tell the difference between a real build and a
            themed template. We design for that scrutiny from the start.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 shrink-0 text-cyan" size={20} />
              <div>
                <h3 className="font-display font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
