'use client'

import { useState } from 'react'

/**
 * Full-bleed hero photo: soft-daylight Riyadh skyline (Kingdom Centre
 * Tower) seen through floor-to-ceiling glass, with the executive portrait
 * positioned right-of-center. A left-to-right cream scrim keeps the copy
 * column fully legible without a hard panel or box.
 *
 * If /project-2/hero-finance.jpg hasn't been added yet, this falls back
 * to a clean abstract gradient backdrop so the section never looks broken.
 * See app/project-2/README.md for the exact photo spec.
 */
export default function HeroPhoto({ src = '/project-2/hero-finance.jpg' }: { src?: string }) {
  const [errored, setErrored] = useState(false)

  return (
    <div className="p2-hero-photo" aria-hidden="true">
      <div className="p2-hero-fallback" />
      {!errored && (
        // Plain <img> (not next/image) so a missing file fails silently
        // into the CSS fallback instead of rendering a broken-image icon.
        <img
          src={src}
          alt=""
          onError={() => setErrored(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="p2-hero-scrim" />
    </div>
  )
}
