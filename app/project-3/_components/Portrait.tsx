'use client'

import Image from 'next/image'

/**
 * Noor's headshot. Two variants sharing the same source image:
 *  - "avatar": small circle, used inline next to the eyebrow on mobile
 *    so a real face is visible in the hero without scrolling.
 *  - "plate": larger framed portrait (matches the .p3-plate brand-guideline
 *    card look — hairline gold border + corner ticks) used in the desktop
 *    hero column alongside the Arabic monogram.
 *
 * Expects the image file at /public/project-3/noor-portrait.jpg — see
 * the image prompt provided alongside this component for generating one.
 */
export default function Portrait({
  variant = 'plate',
  className = '',
}: {
  variant?: 'avatar' | 'plate'
  className?: string
}) {
  if (variant === 'avatar') {
    return (
      <div
        className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[var(--p3-gold)] shadow-[var(--p3-shadow-sm)] ${className}`}
      >
        <Image
          src="/project-3/noor-portrait.jpg"
          alt="Noor Al-Kuwari, Senior Brand & Marketing Strategist"
          fill
          sizes="64px"
          className="object-cover"
          priority
        />
      </div>
    )
  }

  return (
    <div className={`p3-plate relative aspect-[4/5] w-full overflow-hidden ${className}`}>
      <Image
        src="/project-3/noor-portrait.jpg"
        alt="Noor Al-Kuwari, Senior Brand & Marketing Strategist"
        fill
        sizes="(min-width: 1024px) 380px, 220px"
        className="object-cover"
        priority
      />
    </div>
  )
}
