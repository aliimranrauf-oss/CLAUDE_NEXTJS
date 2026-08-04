'use client'

/**
 * The signature campaign-card visual used across the Work grid and
 * homepage highlights. Rather than a stock photo, each card renders a
 * small "brand board" generated from that campaign's own palette (three
 * hex values from _data/content.ts) — a diagonal color-field with a
 * category tag and campaign code, styled like a mounted swatch page
 * from Noor's own guideline decks. Pure CSS/SVG, no image asset needed,
 * and it doubles as proof of the palette-driven design work itself.
 */
export default function WorkPlate({
  palette,
  category,
  code,
}: {
  palette: [string, string, string]
  category: string
  code: string
}) {
  return (
    <div className="p3-plate relative aspect-[4/3] w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[0]} 45%, ${palette[1]} 68%, ${palette[2]} 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 14px)',
        }}
      />
      <div className="absolute left-4 top-4 flex items-center gap-2">
        {palette.map((hex) => (
          <span key={hex} className="p3-swatch h-3.5 w-3.5 border border-white/30" style={{ background: hex }} />
        ))}
      </div>
      <span className="absolute right-4 top-4 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
        {category}
      </span>
      <span className="absolute bottom-4 left-4 font-mono text-[11px] tracking-widest text-white/80">
        {code}
      </span>
    </div>
  )
}
