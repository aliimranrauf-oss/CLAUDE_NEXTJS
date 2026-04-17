import BadilSallaClient from './BadilSallaClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'بديل سلة وزد | متجر إلكتروني مخصص بدفعة واحدة بدون رسوم شهرية',
  description:
    'توقف عن دفع رسوم شهرية لسلة وزد. متجر إلكتروني مخصص كامل الملكية بدفعة واحدة فقط. سرعة فائقة، SEO احترافي، Stripe & PayPal. أفضل بديل سلة وزد في السعودية والخليج.',
  keywords:
    'بديل سلة وزد, بديل زد, متجر إلكتروني مخصص, متجر بدون رسوم شهرية, Salla alternative, Zid alternative, custom ecommerce Saudi Arabia, one time payment store, shopify alternative arabic, متجر الكتروني السعودية',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.makemystore.online/ar/badil-salla-zid',
  },
  openGraph: {
    title: 'بديل سلة وزد | متجر إلكتروني مخصص بدون رسوم شهرية',
    description:
      'متجر إلكتروني مخصص بدفعة واحدة — ملكية كاملة — لا اشتراكات شهرية. أفضل بديل لسلة وزد في السعودية.',
    images: ['/logo.png'],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بديل سلة وزد | متجر إلكتروني مخصص',
    description:
      'متجر إلكتروني مخصص بدفعة واحدة بدون رسوم شهرية — أفضل بديل سلة وزد',
  },
}

export default function Page() {
  return <BadilSallaClient />
}
