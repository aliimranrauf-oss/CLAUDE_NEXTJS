import BadilSallaClient from './BadilSallaClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'بديل سلة وزد | متجر إلكتروني مخصص بدفعة واحدة بدون رسوم شهرية',
  description: 'توقف عن دفع رسوم شهرية لسلة وزد. متجر إلكتروني مخصص كامل الملكية بدفعة واحدة فقط. سرعة فائقة، SEO احترافي، Stripe & PayPal.',
  alternates: { canonical: 'https://www.makemystore.online' },
  openGraph: {
    title: 'بديل سلة وزد | متجر إلكتروني مخصص بدون رسوم شهرية',
    images: ['/logo.png'],
    locale: 'ar_SA',
    type: 'website',
  },
}

export default function Page() {
  return <BadilSallaClient />
}
