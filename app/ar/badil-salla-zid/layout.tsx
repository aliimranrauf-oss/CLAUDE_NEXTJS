import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'بديل سلة وزد — متجر إلكتروني بدون رسوم شهرية | MakeMyStore',
  description:
    'أفضل بديل لسلة وزد في السعودية. متجر إلكتروني مخصص 100% بدفعة واحدة فقط — بدون اشتراك شهري، ملكية كاملة، سرعة فائقة، دعم Stripe وPayPal. ابدأ اليوم من $99.',
  keywords: [
    'بديل سلة',
    'بديل زد',
    'بديل زيد',
    'متجر إلكتروني بدون اشتراك',
    'بديل سلة بدون رسوم شهرية',
    'تصميم متجر إلكتروني السعودية',
    'موقع تجارة إلكترونية',
    'متجر اونلاين رخيص',
    'بديل shopify عربي',
    'انشاء متجر الكتروني',
    'salla alternative',
    'zid alternative',
    'custom ecommerce saudi arabia',
    'no monthly fees online store',
  ],
  alternates: {
    canonical: 'https://www.makemystore.online/ar/badil-salla-zid',
    languages: {
      en: 'https://www.makemystore.online',
      ar: 'https://www.makemystore.online/ar/badil-salla-zid',
    },
  },
  openGraph: {
    title: 'بديل سلة وزد — متجر إلكتروني بدون رسوم شهرية',
    description: 'متجر إلكتروني مخصص بدفعة واحدة فقط. لا رسوم شهرية، ملكية كاملة، سرعة فائقة.',
    url: 'https://www.makemystore.online/ar/badil-salla-zid',
    siteName: 'MakeMyStore.online',
    type: 'website',
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بديل سلة وزد — متجر إلكتروني بدون رسوم شهرية',
    description: 'متجر إلكتروني مخصص بدفعة واحدة فقط. لا رسوم شهرية، ملكية كاملة.',
  },
}

export default function ArabicPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
