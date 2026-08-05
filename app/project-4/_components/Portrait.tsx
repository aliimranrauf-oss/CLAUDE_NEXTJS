'use client'

import { useState } from 'react'
import { Stethoscope } from 'lucide-react'

/**
 * Dr. Sara Al Naqbi's hero portrait: a rounded "clinical frame" card
 * (not a full-bleed photo) with a hairline ring offset behind it and the
 * soft sage/clay gradient blobs from .p4-hero-blobs showing through
 * around the edges — reads as a boutique clinic portfolio rather than a
 * corporate skyline photo.
 *
 * Expects the image file at /project-4/hero-doctor.jpg — see the image
 * prompt in PROJECT-4-README.md for generating one. If the file hasn't
 * been added yet, this falls back to a clean sage placeholder icon so
 * the hero never looks broken.
 */
export default function Portrait({
  src = '/project-4/hero-doctor.jpg',
  variant = 'plate',
  className = '',
}: {
  src?: string
  variant?: 'avatar' | 'plate'
  className?: string
}) {
  const [errored, setErrored] = useState(false)

  if (variant === 'avatar') {
    return (
      <div
        className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[var(--p4-clay)] shadow-[var(--p4-shadow-sm)] ${className}`}
      >
        {!errored ? (
          <img
            src={src}
            alt="Dr. Sara Al Naqbi, Consultant Dermatologist"
            onError={() => setErrored(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="p4-portrait-fallback">
            <Stethoscope size={22} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div className="p4-portrait-ring" aria-hidden="true" />
      <div className="p4-portrait-frame relative aspect-[4/5] w-full">
        {!errored ? (
          <img
            src={src}
            alt="Dr. Sara Al Naqbi, Consultant Dermatologist &amp; Aesthetic Medicine, Dubai"
            onError={() => setErrored(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="p4-portrait-fallback">
            <Stethoscope size={44} strokeWidth={1.4} />
          </div>
        )}
      </div>
    </div>
  )
}
