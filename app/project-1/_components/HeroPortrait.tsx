import Image from 'next/image'

export default function HeroPortrait({
  src = '/project-1/hero-ahmed.jpg',
  label = 'AHMED AL MANSOORI',
}: {
  src?: string
  label?: string
}) {
  return (
    <div className="group relative">
      {/* corner brackets */}
      <span className="pointer-events-none absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-[var(--p1-brass)]" />
      <span className="pointer-events-none absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-[var(--p1-brass)]" />
      <span className="pointer-events-none absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-[var(--p1-brass)]" />
      <span className="pointer-events-none absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-[var(--p1-brass)]" />

      <div className="p1-portrait-frame relative aspect-[4/5] overflow-hidden border border-[var(--p1-line-strong)] bg-[var(--p1-panel)]">
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="p1-portrait-img object-cover"
          priority
        />
        {/* one-time brass scan-line sweep on load — pure CSS, no JS/layout cost */}
        <span className="p1-scan-line" aria-hidden="true" />
        {/* subtle bottom gradient so the label strip stays readable over any photo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
      </div>

      <div className="mt-4 flex items-center justify-end border-t border-[var(--p1-line)] pt-4">
        <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-brass)]">{label}</span>
      </div>
    </div>
  )
}
