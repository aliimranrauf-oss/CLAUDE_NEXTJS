'use client'

import { Linkedin, Instagram, X as XIcon, type LucideIcon } from 'lucide-react'
import { socials } from '../_data/content'

const ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  x: XIcon,
  instagram: Instagram,
}

/**
 * Row of social icon links — used in the footer (every page, incl. home)
 * and on the contact page. Demo-only: hrefs in _data/content.ts point to
 * placeholder profile URLs, swap them for real ones when this stops
 * being a portfolio showcase.
 */
export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {socials.map((s) => {
        const Icon = ICONS[s.icon]
        if (!Icon) return null
        return (
          <a
            key={s.platform}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.platform}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--p3-border-strong)] text-[var(--p3-muted)] transition-colors hover:border-[var(--p3-wine)] hover:text-[var(--p3-wine)]"
          >
            <Icon size={15} />
          </a>
        )
      })}
    </div>
  )
}
