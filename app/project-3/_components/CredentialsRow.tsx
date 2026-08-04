'use client'

import { Award, Globe2, Sparkles, MapPin } from 'lucide-react'
import { hero } from '../_data/content'
import { useSiteSettings } from '../_context/SiteSettingsContext'

const ICONS = [Award, Globe2, Sparkles, MapPin]

export default function CredentialsRow() {
  const { settings } = useSiteSettings()
  if (!settings.hero.showCredentials) return null

  return (
    <div className="mt-10 hidden grid-cols-2 gap-x-6 gap-y-5 sm:grid sm:grid-cols-4">
      {hero.credentials.map((c, i) => {
        const Icon = ICONS[i % ICONS.length]
        return (
          <div key={c.label} className="flex flex-col items-start gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--p3-gold)]/40 bg-[var(--p3-gold-tint)] text-[var(--p3-gold)]">
              <Icon size={16} />
            </span>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold text-[var(--p3-ink)]">{c.label}</div>
              <div className="text-[11.5px] text-[var(--p3-muted)]">{c.sub}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
