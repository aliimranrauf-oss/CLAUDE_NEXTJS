import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact Us – Order Your Custom Store | MakeMyStore.online',
  description:
    'Get in touch with MakeMyStore.online to order your custom ecommerce website. One-time build fee from $250, no subscription to us. Reply within hours.',
  keywords: [
    'contact makemystore',
    'order ecommerce website',
    'custom store order',
    'shopify alternative contact',
    'hire ecommerce developer',
  ],
  authors: [{ name: 'MakeMyStore.online' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'Contact Us – Order Your Custom Store | MakeMyStore.online',
    description:
      'Order your custom ecommerce website — no subscriptions to us, no platform lock-in. Built with Next.js, deployed to any hosting you choose.',
    url: 'https://www.makemystore.online/contact',
    siteName: 'MakeMyStore.online',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us – Order Your Custom Store | MakeMyStore.online',
    description: 'Order your custom ecommerce website — no subscription to us, one-time build fee.',
  },
  alternates: { canonical: 'https://www.makemystore.online/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
