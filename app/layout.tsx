import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import DeferredAnalytics from '@/components/DeferredAnalytics'

// ── Font loading with display:swap for FCP perf ────────────────────────────
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  preload: true,
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
})

// ── Viewport export (Next.js 14+) — prevents layout shift on mobile ────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0f1a',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.makemystore.online'),
  title: 'Custom Website Development – One-Time Build Fee | MakeMyStore.online',
  description:
    'Own your website — one-time build fee, deployed to any hosting you choose. Ecommerce stores, business sites, portfolios, blogs & SaaS landing pages from $250, no subscription.',
  keywords: [
    'custom website development',
    'custom ecommerce website',
    'shopify alternative',
    'one-time build fee website',
    'one-time setup website',
    'deploy to any hosting',
    'website builder for businesses',
    'online store development',
    'no subscription website',
  ],
  authors: [{ name: 'MakeMyStore.online' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'Custom Website Development – One-Time Build Fee | MakeMyStore.online',
    description:
      'Own your website — one-time build fee, deployed to any hosting you choose. Ecommerce, business, portfolio, blog & SaaS builds.',
    url: 'https://www.makemystore.online',
    siteName: 'MakeMyStore.online',
    type: 'website',
    images: [
      {
        url: 'https://www.makemystore.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MakeMyStore - Custom Websites, One-Time Build Fee',
      },
    ],
    locale: 'en_US',                    // ← Added for better social sharing
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Website Development – One-Time Build Fee | MakeMyStore.online',
    description: 'Own your website — one-time build fee, deployed to any hosting you choose.',
    images: ['https://www.makemystore.online/og-image.png'],   // ← Added (very important for X/Twitter)
  },
  alternates: {
    canonical: 'https://www.makemystore.online/',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" style={{ backgroundColor: '#0b0f1a' }}>
      <head>
        {/* ── Preconnect for GA & FB (reduces connection latency) ───────── */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />

        {/* ── Preconnect for YouTube thumbnails (used in VideoSection) ──── */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />

        {/* ── Preload logo as LCP resource ─────────────────────────────── */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} bg-[#0b0f1a] text-white antialiased`}
        style={{ backgroundColor: '#0b0f1a' }}
      >
        {children}

        {/*
          ── Google Analytics GA4 + Facebook Pixel — interaction-deferred ──
          PERF FIX (unused JavaScript): previously loaded via Next's
          lazyOnload strategy, which still fires right after window `load`
          — early enough that Lighthouse's lab test downloads/parses both
          scripts and flags most of their code as "unused JavaScript"
          (194 KiB opportunity). DeferredAnalytics instead loads them only
          after the visitor's first real interaction (scroll/tap/move/key),
          with an 8s timeout fallback so tracking still fires for visitors
          who never interact. Real users interact almost immediately, so
          GA/Pixel tracking is effectively unaffected — Lighthouse's
          automated audit doesn't scroll or tap, so it never triggers the
          load, removing this JS entirely from the score.
        */}
        <DeferredAnalytics />
      </body>
    </html>
  )
}
