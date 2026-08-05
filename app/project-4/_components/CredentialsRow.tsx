'use client'

import { BadgeCheck, Clock, MapPin, ShieldCheck } from 'lucide-react'
import { hero } from '../_data/content'
import { useSiteSettings } from '../_context/SiteSettingsContext'

const ICONS = [BadgeCheck, Clock, MapPin, ShieldCheck]

export default function CredentialsRow() {
  const { settings } = useSiteSettings()
  if (!settings.hero.showCredentials) return null

  return (
    <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
      {hero.credentials.map((c, i) => {
        const Icon = ICONS[i % ICONS.length]
        return (
          <div key={c.label} className="flex flex-col items-start gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--p4-clay)]/40 bg-[var(--p4-clay-tint)] text-[var(--p4-clay)]">
              <Icon size={16} />
            </span>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold text-[var(--p4-sage-2)]">{c.label}</div>
              <div className="text-[11.5px] text-[var(--p4-muted)]">{c.sub}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
