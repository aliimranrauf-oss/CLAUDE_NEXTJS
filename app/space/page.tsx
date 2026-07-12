// app/space/page.tsx
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SpaceHero from '@/components/space/SpaceHero'
import SpaceServices from '@/components/space/SpaceServices'
import TechStackStrip from '@/components/space/TechStackStrip'
import WhyUs from '@/components/space/WhyUs'
import PortfolioGrid from '@/components/space/PortfolioGrid'
import SatelliteTrackerGig from '@/components/space/SatelliteTrackerGig'
import SpaceCTA from '@/components/space/SpaceCTA'

export const metadata: Metadata = {
  title: 'Space & Aerospace Web Development – One-Time Build Fee | MakeMyStore.online',
  description:
    'Websites, dashboards, and internal tools for space startups, satellite operators, and aerospace suppliers. One-time build fee, full source code ownership, deployed on Vercel.',
  keywords: [
    'space startup website',
    'aerospace web development',
    'satellite dashboard development',
    'space industry website design',
    'aerospace software development',
    'one-time build fee website',
  ],
  alternates: {
    canonical: 'https://www.makemystore.online/space',
  },
  openGraph: {
    title: 'Space & Aerospace Web Development – One-Time Build Fee | MakeMyStore.online',
    description:
      'Websites, dashboards, and internal tools for space startups, satellite operators, and aerospace suppliers.',
    url: 'https://www.makemystore.online/space',
    siteName: 'MakeMyStore.online',
    type: 'website',
    images: [
      {
        // TODO: swap for a dedicated /og-image-space.png once you have one —
        // reusing the main OG image for now so this doesn't 404.
        url: 'https://www.makemystore.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MakeMyStore for Space & Aerospace — one-time build fee, full source ownership',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Space & Aerospace Web Development | MakeMyStore.online',
    description:
      'Websites, dashboards, and internal tools for space startups, satellite operators, and aerospace suppliers.',
    images: ['https://www.makemystore.online/og-image.png'],
  },
}

export default function SpacePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <SpaceHero />
        <SpaceServices />
        <TechStackStrip />
        <WhyUs />
        <PortfolioGrid />
        <SatelliteTrackerGig />
        <SpaceCTA />
      </main>
      <Footer />
    </>
  )
}
