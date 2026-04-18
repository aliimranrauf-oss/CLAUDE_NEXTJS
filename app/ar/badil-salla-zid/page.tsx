import BadilSallaClient from './BadilSallaClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'بديل سلة وزد | متجر إلكتروني مخصص بدفعة واحدة بدون رسوم شهرية',
  description:
    'توقف عن دفع رسوم شهرية لسلة وزد. احصل على متجر إلكتروني احترافي بملكية كاملة للكود. سرعة فائقة، SEO احترافي، ودعم Stripe & PayPal. ادفع مرة واحدة وامتلك متجرك للأبد.',
  keywords:
    'بديل سلة, بديل زد, إنشاء متجر إلكتروني السعودية, متجر بدون اشتراك, برمجة متاجر إلكترونية, Salla alternative, Zid alternative, custom ecommerce Saudi Arabia, one time payment store, shopify alternative arabic, متجر الكتروني السعودية',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.makemystore.online/ar/badil-salla-zid',
  },
  openGraph: {
    title: 'بديل سلة وزد | متجر إلكتروني مخصص بدفعة واحدة بدون رسوم شهرية',
    description:
      'متجر إلكتروني بملكية كاملة للكود — دفعة واحدة — لا اشتراكات شهرية. أفضل بديل لسلة وزد في السعودية.',
    images: ['/logo.png'],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بديل سلة وزد | متجر إلكتروني مخصص بدفعة واحدة',
    description:
      'متجر إلكتروني بملكية كاملة للكود — دفعة واحدة بدون رسوم منصة — أفضل بديل سلة وزد',
  },
}

export default function Page() {
  return <BadilSallaClient />
}
