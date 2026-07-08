import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HowItWorksHero from '@/components/how-it-works/HowItWorksHero'
import ProcessSteps from '@/components/how-it-works/ProcessSteps'
import PricingTransparency from '@/components/how-it-works/PricingTransparency'

export const metadata: Metadata = {
  title: 'How It Works – Custom Ecommerce Development Process | MakeMyStore.online',
  description:
    'See exactly how we build your custom ecommerce store, from free consultation to full ownership handover \u2014 one-time build fee, no subscription to us, deployed to any hosting you choose.',
  alternates: {
    canonical: 'https://www.makemystore.online/how-it-works',
  },
  openGraph: {
    title: 'How It Works – MakeMyStore.online',
    description:
      'From free consultation to full ownership handover \u2014 see our full ecommerce development process.',
    url: 'https://www.makemystore.online/how-it-works',
    type: 'website',
  },
}

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HowItWorksHero />
        <ProcessSteps />
        <PricingTransparency />
      </main>
      <Footer />
    </>
  )
}
