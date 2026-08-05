import { Newsreader, Plus_Jakarta_Sans, Reem_Kufi } from 'next/font/google'

// Display serif — an editorial, medical-journal-adjacent serif with a calm,
// clinical elegance. Deliberately unlike p1's Space Grotesk, p2's Playfair
// Display, or p3's Fraunces.
export const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--p4-font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

// Body sans — clean, modern, highly legible; the "clinic tech" workhorse
// font used everywhere except headings.
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--p4-font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

// Arabic accent — used only for the small Arabic-script rendering of the
// doctor's name (نور the persona's own name) as a UAE-rooted brand touch.
// Reem Kufi is a modern geometric Arabic face, distinct from p3's Amiri.
export const reemKufi = Reem_Kufi({
  subsets: ['arabic', 'latin'],
  variable: '--p4-font-arabic',
  display: 'swap',
  weight: ['400', '700'],
})
