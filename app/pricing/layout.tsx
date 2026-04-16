// app/pricing/metadata.ts  — import and re-export from page.tsx if needed,
// or paste this `export const metadata` block directly at the top of page.tsx
// (remove 'use client' and move data-fetching to a Server Component wrapper).
//
// For a quick drop-in with the existing 'use client' page, add this to
// app/pricing/layout.tsx:

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Custom Ecommerce Stores from $99 | MakeMyStore.online',
  description:
    'Launch, Growth, or Scale — own your Next.js ecommerce store with a single one-time payment. No monthly fees, no platform lock-in, full source code included.',
  keywords: [
    'ecommerce pricing',
    'one-time payment ecommerce',
    'no monthly fees online store',
    'shopify alternative pricing',
    'custom ecommerce cost',
    'buy ecommerce website',
  ],
  alternates: { canonical: 'https://www.makemystore.online/pricing' },
  openGraph: {
    title: 'Pricing — Custom Ecommerce Stores from $99 | MakeMyStore.online',
    description:
      'Pay once, own forever. Custom Next.js stores starting at $99 — no subscriptions.',
    url: 'https://www.makemystore.online/pricing',
    siteName: 'MakeMyStore.online',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Custom Ecommerce Stores from $99 | MakeMyStore.online',
    description: 'Pay once, own forever. No Shopify fees, ever.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
