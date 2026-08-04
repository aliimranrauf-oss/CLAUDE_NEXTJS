'use client'

import { MapPin, Mail, Phone } from 'lucide-react'
import { useSiteSettings } from '../_context/SiteSettingsContext'
import SocialLinks from '../_components/SocialLinks'

export default function ContactInfo() {
  const { settings } = useSiteSettings()
  const { contact } = settings

  const rows = [
    { show: contact.showAddress, icon: MapPin, label: 'Location', value: contact.address },
    { show: contact.showEmail, icon: Mail, label: 'Email', value: contact.email },
    { show: contact.showPhone, icon: Phone, label: 'Phone', value: contact.phone },
  ].filter((r) => r.show && r.value)

  return (
    <div className="mt-9 flex flex-col gap-6">
      {rows.length > 0 && (
        <div className="p3-card flex flex-col gap-5 p-6">
          {rows.map((row) => (
            <div key={row.label} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--p3-gold-tint)] text-[var(--p3-wine)]">
                <row.icon size={16} />
              </span>
              <div>
                <div className="text-[13px] font-semibold text-[var(--p3-ink)]">{row.label}</div>
                <div className="text-[13px] text-[var(--p3-muted)]">{row.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <span className="p3-eyebrow">Follow along</span>
        <SocialLinks className="mt-4" />
      </div>
    </div>
  )
}
