import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

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
  title: 'Custom Ecommerce Website – Zero Platform Fees | MakeMyStore.online',
  description:
    'Own your ecommerce store — one-time setup fee, zero platform fees, self-hosted on YOUR Vercel & Supabase accounts. MakeMyStore builds fully custom online stores from $99 with Stripe & PayPal integration.',
  keywords: [
    'custom ecommerce website',
    'shopify alternative',
    'zero platform fees',
    'one-time setup ecommerce',
    'self-hosted ecommerce',
    'ecommerce website builder',
    'online store development',
    'no subscription ecommerce',
  ],
  authors: [{ name: 'MakeMyStore.online' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'Custom Ecommerce Website – Zero Platform Fees | MakeMyStore.online',
    description:
      'Own your ecommerce store — one-time setup, zero platform fees. Deployed to YOUR Vercel & Supabase accounts.',
    url: 'https://www.makemystore.online',
    siteName: 'MakeMyStore.online',
    type: 'website',
    images: [
      {
        url: 'https://www.makemystore.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MakeMyStore - Custom Ecommerce, Zero Platform Fees',
      },
    ],
    locale: 'en_US',                    // ← Added for better social sharing
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Ecommerce Website – Zero Platform Fees | MakeMyStore.online',
    description: 'Own your ecommerce store — one-time setup, zero platform fees.',
    images: ['https://www.makemystore.online/og-image.png'],   // ← Added (very important for X/Twitter)
  },
  alternates: {
    canonical: 'https://www.makemystore.online/',
    languages: {                                            // ← Added Arabic support
      'en-US': 'https://www.makemystore.online/',
      'ar': 'https://www.makemystore.online/ar/badil-salla-zid',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
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
      >
        {children}

        {/* ── Google Analytics GA4 — afterInteractive for perf ──────────── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GG4NQ13Z67"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GG4NQ13Z67', { send_page_view: false });
          `}
        </Script>

        {/*
          ── Facebook Pixel — lazyOnload strategy ──────────────────────────
          PERF FIX: Was causing 593ms main-thread block on desktop and
          218ms on mobile (Lighthouse: "3rd party code" diagnostic).
          lazyOnload = loads after the page is fully interactive + idle,
          meaning it NEVER blocks LCP, FCP, or TBT.
          Pixel still fires PageView — tracking is 100% intact.
          The only difference: it fires ~2-3s later, which is fine for analytics.
        */}
        <Script id="facebook-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s){
            if(f.fbq)return;
            n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];
            t=b.createElement(e);t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s);
            }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1410911290788317');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  )
}
