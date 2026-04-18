import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'بديل سلة وزد | متجر إلكتروني مخصص بدفعة واحدة بدون رسوم شهرية',
  description:
    'توقف عن دفع رسوم شهرية لسلة وزد. احصل على متجر إلكتروني احترافي بملكية كاملة للكود. سرعة فائقة، SEO احترافي، ودعم Stripe & PayPal. ادفع مرة واحدة وامتلك متجرك للأبد.',
  keywords: [
    'بديل سلة',
    'بديل زد',
    'إنشاء متجر إلكتروني السعودية',
    'متجر بدون اشتراك',
    'برمجة متاجر إلكترونية',
    'متجر إلكتروني مخصص',
    'متجر بدون رسوم شهرية',
    'تصميم متجر إلكتروني السعودية',
    'موقع تجارة إلكترونية',
    'متجر اونلاين رخيص',
    'بديل shopify عربي',
    'انشاء متجر الكتروني',
    'Salla alternative',
    'Zid alternative',
    'custom ecommerce Saudi Arabia',
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
    title: 'بديل سلة وزد | متجر إلكتروني مخصص بدفعة واحدة بدون رسوم شهرية',
    description: 'توقف عن دفع رسوم شهرية لسلة وزد. متجر إلكتروني بملكية كاملة للكود، سرعة فائقة، وصفر رسوم منصة.',
    url: 'https://www.makemystore.online/ar/badil-salla-zid',
    siteName: 'MakeMyStore.online',
    type: 'website',
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بديل سلة وزد | متجر إلكتروني مخصص بدفعة واحدة',
    description: 'متجر إلكتروني بملكية كاملة للكود. ادفع مرة واحدة وامتلك متجرك للأبد — صفر رسوم منصة.',
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
