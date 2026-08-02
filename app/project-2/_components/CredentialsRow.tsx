import { Award, Clock, MapPin, Compass } from 'lucide-react'
import { hero } from '../_data/content'

const ICONS = [Award, Clock, MapPin, Compass]

export default function CredentialsRow() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
      {hero.credentials.map((c, i) => {
        const Icon = ICONS[i % ICONS.length]
        return (
          <div key={c.label} className="flex flex-col items-start gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--p2-gold)]/40 bg-[var(--p2-gold-tint)] text-[var(--p2-gold)]">
              <Icon size={16} />
            </span>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold text-[var(--p2-navy)]">{c.label}</div>
              <div className="text-[11.5px] text-[var(--p2-muted)]">{c.sub}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
