import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })

export const metadata: Metadata = {
  title: 'Custom Ecommerce Website – Zero Monthly Fees | MakeMyStore.online',
  description:
    'Own your ecommerce store — no subscriptions, no platform lock-in. MakeMyStore builds fully custom online stores from $99 one-time payment, with Stripe & PayPal integration and lifetime free hosting.',
  keywords: [
    'custom ecommerce website',
    'shopify alternative',
    'no monthly fees',
    'one-time payment ecommerce',
    'ecommerce website builder',
    'online store development',
    'zero subscription ecommerce',
  ],
  authors: [{ name: 'MakeMyStore.online' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'Custom Ecommerce Website – Zero Monthly Fees | MakeMyStore.online',
    description:
      'Own your ecommerce store — no subscriptions, no platform lock-in. Built with Next.js, Vercel & Supabase.',
    url: 'https://www.makemystore.online',
    siteName: 'MakeMyStore.online',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Ecommerce Website – Zero Monthly Fees | MakeMyStore.online',
    description: 'Own your ecommerce store — no subscriptions, no platform lock-in.',
  },
  alternates: { canonical: 'https://www.makemystore.online/' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${syne.variable} ${dmSans.variable} bg-[#0b0f1a] text-white antialiased`}>
        {children}

        {/* ── Google Analytics GA4 ─────────────────────────────────────────── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GG4NQ13Z67"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GG4NQ13Z67');
          `}
        </Script>

        {/* ── Facebook Pixel ───────────────────────────────────────────────── */}
        <Script id="facebook-pixel" strategy="afterInteractive">
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
