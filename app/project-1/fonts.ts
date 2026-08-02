import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google'

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--p1-font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--p1-font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--p1-font-mono',
  display: 'swap',
  weight: ['400', '500'],
})
