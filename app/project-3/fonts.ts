import { Fraunces, Manrope, Amiri } from 'next/font/google'

// Display serif — elegant, editorial, used for headings. Fraunces has a
// distinctive "soft" optical-size personality that reads as brand-studio
// rather than corporate (deliberately unlike p1's Space Grotesk or p2's
// Playfair Display).
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--p3-font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT'],
})

// Body sans — warm, modern, highly legible at small sizes.
export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--p3-font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

// Arabic calligraphic serif — used only for the small Arabic wordmark
// accents (persona name in Arabic script). Loaded with the 'arabic'
// subset specifically for that glyph set.
export const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  variable: '--p3-font-arabic',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})
