'use client'

import Link from 'next/link'
import { profile } from '../_data/content'
import { useSiteSettings } from '../_context/SiteSettingsContext'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const { settings } = useSiteSettings()
  const { contact, footer, nav: navSettings } = settings

  return (
    <footer className="border-t border-[var(--p3-border)] bg-[var(--p3-bg-alt)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <span className="p3-display text-[17px] font-semibold text-[var(--p3-ink)]">{profile.name}</span>
            <span className="p3-arabic-font ml-2 text-[15px] text-[var(--p3-gold)]">{profile.arabicName}</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--p3-muted)]">{footer.blurb}</p>
            {(contact.showEmail || contact.showPhone || contact.showAddress) && (
              <div className="mt-5 flex flex-col gap-1.5 text-sm text-[var(--p3-muted)]">
                {contact.showEmail && <span>{contact.email}</span>}
                {contact.showPhone && <span>{contact.phone}</span>}
                {contact.showAddress && <span>{contact.address}</span>}
              </div>
            )}
            <SocialLinks className="mt-6" />
          </div>

          <div>
            <span className="p3-eyebrow">Sitemap</span>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-[var(--p3-muted)]">
              {navSettings.showAbout && (
                <li><Link href="/project-3/about" className="hover:text-[var(--p3-ink)]">About</Link></li>
              )}
              {navSettings.showWork && (
                <li><Link href="/project-3/work" className="hover:text-[var(--p3-ink)]">Work</Link></li>
              )}
              {navSettings.showServices && (
                <li><Link href="/project-3/services" className="hover:text-[var(--p3-ink)]">Services</Link></li>
              )}
              {navSettings.showJournal && (
                <li><Link href="/project-3/journal" className="hover:text-[var(--p3-ink)]">Journal</Link></li>
              )}
              <li><Link href="/project-3/contact" className="hover:text-[var(--p3-ink)]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <span className="p3-eyebrow">Legal</span>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-[var(--p3-muted)]">
              <li><Link href="/project-3/privacy" className="hover:text-[var(--p3-ink)]">Privacy Policy</Link></li>
              <li><Link href="/project-3/terms" className="hover:text-[var(--p3-ink)]">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 h-px bg-[var(--p3-border)]" />
        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-[var(--p3-muted-2)] sm:flex-row">
          <span>{profile.name} · {profile.location} · {new Date().getFullYear()}</span>
          <span className="flex items-center gap-3">
            Demonstration portfolio — fictional profile built for design showcase purposes only.
            <Link href="/project-3/admin" className="opacity-60 hover:opacity-100 hover:text-[var(--p3-ink)]">
              Admin
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
