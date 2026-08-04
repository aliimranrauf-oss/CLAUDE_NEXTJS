'use client'

import Link from 'next/link'
import { profile } from '../_data/content'
import { useSiteSettings } from '../_context/SiteSettingsContext'

export default function Footer() {
  const { settings } = useSiteSettings()
  const { contact, footer, nav: navSettings } = settings

  return (
    <footer className="border-t border-[var(--p2-border)] bg-[var(--p2-bg-alt)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <span className="p2-display text-[17px] font-semibold text-[var(--p2-navy)]">
              {profile.name}
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--p2-muted)]">
              {footer.blurb}
            </p>
            {(contact.showEmail || contact.showPhone || contact.showAddress) && (
              <div className="mt-5 flex flex-col gap-1.5 text-sm text-[var(--p2-muted)]">
                {contact.showEmail && <span>{contact.email}</span>}
                {contact.showPhone && <span>{contact.phone}</span>}
                {contact.showAddress && <span>{contact.address}</span>}
              </div>
            )}
          </div>

          <div>
            <span className="p2-eyebrow">Sitemap</span>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-[var(--p2-muted)]">
              {navSettings.showAbout && (
                <li><Link href="/project-2/about" className="hover:text-[var(--p2-navy)]">About</Link></li>
              )}
              {navSettings.showExpertise && (
                <li><Link href="/project-2/expertise" className="hover:text-[var(--p2-navy)]">Expertise</Link></li>
              )}
              {navSettings.showExperience && (
                <li><Link href="/project-2/experience" className="hover:text-[var(--p2-navy)]">Experience</Link></li>
              )}
              {navSettings.showInsights && (
                <li><Link href="/project-2/insights" className="hover:text-[var(--p2-navy)]">Insights</Link></li>
              )}
              <li><Link href="/project-2/contact" className="hover:text-[var(--p2-navy)]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <span className="p2-eyebrow">Legal</span>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-[var(--p2-muted)]">
              <li><Link href="/project-2/privacy" className="hover:text-[var(--p2-navy)]">Privacy Policy</Link></li>
              <li><Link href="/project-2/terms" className="hover:text-[var(--p2-navy)]">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 h-px bg-[var(--p2-border)]" />
        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-[var(--p2-muted-2)] sm:flex-row">
          <span>{profile.name} · {profile.location} · {new Date().getFullYear()}</span>
          <span>Demonstration portfolio — fictional profile built for design showcase purposes only.</span>
        </div>
      </div>
    </footer>
  )
}
