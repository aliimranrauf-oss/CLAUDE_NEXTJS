// app/pricing/layout.tsx
import type { Metadata, Viewport } from 'next'

// ─── Viewport export (separating from metadata per Next.js 14+ best practice) ──
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0f1a',
}

// ─── Primary SEO Metadata ─────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Title ──────────────────────────────────────────────────────────────────
  title: {
    default: 'Shopify Alternative: One-Time Payment Ecommerce Store | MakeMyStore',
    template: '%s | MakeMyStore.online',
  },

  // ── Description ────────────────────────────────────────────────────────────
  description:
    'Stop paying monthly rent to Shopify. Migrate to a blazing-fast Next.js store — one-time payment, $0 platform fees, zero transaction commissions, 100% source code ownership, and 100/100 Google PageSpeed scores. Seamless migration from Shopify or Wix.',

  // ── Keywords ───────────────────────────────────────────────────────────────
  keywords: [
    'Shopify alternative 2026',
    'Shopify migration service',
    'no monthly fee ecommerce',
    'own your source code',
    'custom ecommerce developer UAE',
    'Next.js ecommerce migration',
    'stop paying Shopify monthly fees',
    'zero platform fees ecommerce',
    'full source code ownership',
    'Wix alternative ecommerce',
    'one-time payment online store',
    'custom ecommerce website Pakistan',
    'buy ecommerce website once',
    'Shopify to Next.js migration',
    'high performance ecommerce store',
  ],

  // ── Canonical & Alternates ─────────────────────────────────────────────────
  alternates: {
    canonical: 'https://www.makemystore.online/pricing',
  },

  // ── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Open Graph (Migration & Ownership focus) ───────────────────────────────
  openGraph: {
    title: 'Own Your Store — Stop Paying Shopify Monthly Bills',
    description:
      'Seamless migration from Shopify/Wix to your own Next.js store. Full source code ownership. Zero platform fees. One-time payment starting at $99.',
    url: 'https://www.makemystore.online/pricing',
    siteName: 'MakeMyStore.online',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.makemystore.online/og-pricing.png', // replace with your real OG image
        width: 1200,
        height: 630,
        alt: 'MakeMyStore Pricing — Shopify Alternative with One-Time Payment',
      },
    ],
  },

  // ── Twitter Card ───────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Stop Paying Shopify Monthly Fees — Own Your Store Once',
    description:
      'Professional Shopify & Wix migration to Next.js. 100% code ownership, $0/mo platform fees, 100/100 PageSpeed. Starting at $99.',
    images: ['https://www.makemystore.online/og-pricing.png'], // same OG image
    creator: '@makemystoreapp', // update with your Twitter handle if you have one
  },

  // ── Additional Meta ────────────────────────────────────────────────────────
  authors: [{ name: 'MakeMyStore.online', url: 'https://www.makemystore.online' }],
  creator: 'MakeMyStore.online',
  publisher: 'MakeMyStore.online',
  category: 'ecommerce',

  // ── Verification (add your tokens when ready) ──────────────────────────────
  // verification: {
  //   google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
  // },
}

// ─── Layout Shell ─────────────────────────────────────────────────────────────
// Inlines critical performance hints as early as possible in the <head>.
export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        ── Resource Hints for Lighthouse / Core Web Vitals ──────────────────────
        These go into <head> automatically in Next.js App Router layout.
        They preload fonts used across the pricing page (Syne + DM Sans)
        and preconnect to third-party origins so DNS/TLS is resolved early.
      */}

      {/* Preconnect to Google Fonts CDN */}
      {/* NOTE: Add these to your root layout's <head> via next/font or <link> tags.
          Shown here as comments for reference — Next.js App Router merges head
          tags from layout files automatically via the Metadata API above.

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          Recommended: Use next/font instead for zero-CLS font loading:
          import { Syne, DM_Sans } from 'next/font/google'
      */}

      {children}
    </>
  )
}
