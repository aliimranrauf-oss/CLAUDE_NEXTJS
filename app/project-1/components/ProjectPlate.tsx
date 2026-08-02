const PATTERNS: Record<string, string> = {
  transit:
    'repeating-linear-gradient(115deg, rgba(111,163,184,0.16) 0 2px, transparent 2px 26px), linear-gradient(160deg, #17222c, #0d1117)',
  bridge:
    'repeating-linear-gradient(60deg, rgba(210,162,76,0.14) 0 2px, transparent 2px 30px), linear-gradient(160deg, #1a222c, #0d1117)',
  towers:
    'repeating-linear-gradient(90deg, rgba(236,233,226,0.07) 0 1px, transparent 1px 22px), linear-gradient(160deg, #19212b, #0d1117)',
  sustain:
    'repeating-linear-gradient(35deg, rgba(111,163,184,0.14) 0 2px, transparent 2px 24px), linear-gradient(160deg, #172420, #0d1117)',
  port:
    'repeating-linear-gradient(-25deg, rgba(201,106,78,0.12) 0 2px, transparent 2px 28px), linear-gradient(160deg, #1c1a17, #0d1117)',
}

export default function ProjectPlate({
  image,
  code,
  className = '',
}: {
  image: string
  code: string
  className?: string
}) {
  return (
    <div
      className={`relative flex aspect-[4/3] items-end justify-between overflow-hidden border border-[var(--p1-line)] p-4 ${className}`}
      style={{ backgroundImage: PATTERNS[image] ?? PATTERNS.transit }}
    >
      <div className="p1-crosshair absolute inset-6 opacity-40" />
      <span className="p1-mono relative z-10 text-[10px] tracking-widest text-[var(--p1-muted)]">
        {code}
      </span>
      <span className="p1-mono relative z-10 text-[10px] tracking-widest text-[var(--p1-muted)]">
        SCALE N.T.S.
      </span>
    </div>
  )
}
