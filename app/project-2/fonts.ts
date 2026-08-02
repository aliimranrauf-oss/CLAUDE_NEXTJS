import { Playfair_Display, Instrument_Serif, Inter } from 'next/font/google'

// Display serif — used sparingly for big hero/section headings.
export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--p2-font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
})

// Secondary accent serif — used for the tiny "IR" logo mark and pull quotes.
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--p2-font-accent',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
})

// Body sans — clean, modern, highly legible.
export const inter = Inter({
  subsets: ['latin'],
  variable: '--p2-font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
