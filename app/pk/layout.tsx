import type { Metadata, Viewport } from 'next'

// ── Viewport ────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0f1a',
}

// ── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'پاکستان میں اپنا آن لائن اسٹور بنائیں | بغیر ماہانہ فیس کے | MakeMyStore',
  description:
    'پاکستان میں اپنا آن لائن اسٹور بنائیں صرف ایک بار پیسے دے کر۔ EasyPaisa, JazzCash, COD سب سپورٹ۔ ماہانہ فیس صفر۔ 3-10 دن میں مکمل سٹور تیار۔ WhatsApp پر ابھی رابطہ کریں۔',
  keywords: [
    // ── Your exact required keywords ────────────────────────────────────
    'online store Pakistan',
    'e-commerce website builder Pakistan',
    'Shopify alternative Pakistan',
    'Wix alternative Pakistan',
    'custom coded website Pakistan',
    'MakeMyStore Pakistan',
    'easy online store Urdu',
    // ── Additional keywords from existing layout ─────────────────────────
    'Pakistani e-commerce',
    'create online store Pakistan',
    'EasyPaisa payment integration',
    'JazzCash online store',
    'آن لائن اسٹور پاکستان',
    'ای کامرس ویب سائٹ',
    'EasyPaisa integration',
    'JazzCash payment',
    'Cash on Delivery Pakistan',
    'Leopard courier integration',
    'TCS courier ecommerce',
    'no monthly fee online store',
    'بغیر ماہانہ فیس اسٹور',
    'online store Pakistan one time fee',
  ],
  authors: [{ name: 'MakeMyStore.online' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    title: 'پاکستان میں اپنا آن لائن اسٹور بنائیں | بغیر ماہانہ فیس کے | MakeMyStore',
    description:
      'پاکستان میں اپنا آن لائن اسٹور بنائیں صرف ایک بار پیسے دے کر۔ EasyPaisa, JazzCash, COD سب سپورٹ۔ ماہانہ فیس صفر۔ 3-10 دن میں مکمل سٹور تیار۔',
    url: 'https://www.makemystore.online/pk',
    siteName: 'MakeMyStore.online',
    type: 'website',
    images: [
      {
        url: 'https://www.makemystore.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MakeMyStore Pakistan - آن لائن اسٹور بنائیں',
      },
    ],
    locale: 'ur_PK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'پاکستان میں اپنا آن لائن اسٹور بنائیں | بغیر ماہانہ فیس کے | MakeMyStore',
    description:
      'پاکستان میں اپنا آن لائن اسٹور بنائیں صرف ایک بار پیسے دے کر۔ EasyPaisa, JazzCash, COD سب سپورٹ۔',
    images: ['https://www.makemystore.online/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.makemystore.online/pk',
    languages: {
      'en-US': 'https://www.makemystore.online/',
      ur: 'https://www.makemystore.online/pk',
      ar: 'https://www.makemystore.online/ar/badil-salla-zid',
    },
  },
}

export default function PakistanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
