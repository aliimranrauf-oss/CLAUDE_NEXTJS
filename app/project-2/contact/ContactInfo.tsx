'use client'

import { MapPin, Mail, Phone } from 'lucide-react'
import { useSiteSettings } from '../_context/SiteSettingsContext'

export default function ContactInfo() {
  const { settings } = useSiteSettings()
  const { contact } = settings

  const rows = [
    { show: contact.showAddress, icon: MapPin, label: 'Location', value: contact.address },
    { show: contact.showEmail, icon: Mail, label: 'Email', value: contact.email },
    { show: contact.showPhone, icon: Phone, label: 'Phone', value: contact.phone },
  ].filter((r) => r.show && r.value)

  if (rows.length === 0) return null

  return (
    <div className="p2-card mt-9 flex flex-col gap-5 p-6">
      {rows.map((row) => (
        <div key={row.label} className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--p2-gold-tint)] text-[var(--p2-gold)]">
            <row.icon size={16} />
          </span>
          <div>
            <div className="text-[13px] font-semibold text-[var(--p2-navy)]">{row.label}</div>
            <div className="text-[13px] text-[var(--p2-muted)]">{row.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
