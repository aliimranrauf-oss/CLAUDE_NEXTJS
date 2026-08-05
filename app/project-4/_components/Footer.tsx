'use client'

import Link from 'next/link'
import { profile } from '../_data/content'
import { useSiteSettings } from '../_context/SiteSettingsContext'

export default function Footer() {
  const { settings } = useSiteSettings()
  const { contact, footer, nav: navSettings } = settings

  return (
    <footer className="border-t border-[var(--p4-border)] bg-[var(--p4-bg-alt)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <span className="p4-display text-[17px] font-semibold text-[var(--p4-sage-2)]">
              {profile.name}
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--p4-muted)]">
              {footer.blurb}
            </p>
            {(contact.showEmail || contact.showPhone || contact.showAddress) && (
              <div className="mt-5 flex flex-col gap-1.5 text-sm text-[var(--p4-muted)]">
                {contact.showEmail && <span>{contact.email}</span>}
                {contact.showPhone && <span>{contact.phone}</span>}
                {contact.showAddress && <span>{contact.address}</span>}
              </div>
            )}
          </div>

          <div>
            <span className="p4-eyebrow">Sitemap</span>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-[var(--p4-muted)]">
              {navSettings.showAbout && (
                <li><Link href="/project-4/about" className="hover:text-[var(--p4-sage-2)]">About</Link></li>
              )}
              {navSettings.showTreatments && (
                <li><Link href="/project-4/treatments" className="hover:text-[var(--p4-sage-2)]">Treatments</Link></li>
              )}
              {navSettings.showExperience && (
                <li><Link href="/project-4/experience" className="hover:text-[var(--p4-sage-2)]">Experience</Link></li>
              )}
              {navSettings.showJournal && (
                <li><Link href="/project-4/journal" className="hover:text-[var(--p4-sage-2)]">Patient Journal</Link></li>
              )}
              <li><Link href="/project-4/contact" className="hover:text-[var(--p4-sage-2)]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <span className="p4-eyebrow">Legal</span>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-[var(--p4-muted)]">
              <li><Link href="/project-4/privacy" className="hover:text-[var(--p4-sage-2)]">Privacy Policy</Link></li>
              <li><Link href="/project-4/terms" className="hover:text-[var(--p4-sage-2)]">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 h-px bg-[var(--p4-border)]" />
        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-[var(--p4-muted-2)] sm:flex-row">
          <span>{profile.name} · {profile.location} · {new Date().getFullYear()}</span>
          <span className="flex items-center gap-3">
            Demonstration portfolio — fictional profile built for design showcase purposes only.
            <Link href="/project-4/admin" className="opacity-60 hover:opacity-100 hover:text-[var(--p4-sage-2)]">
              Admin
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
