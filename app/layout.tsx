import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`${inter.className} bg-[#0b0f1a] text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
