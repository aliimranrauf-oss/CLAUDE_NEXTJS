// app/careers/page.tsx
import type { Metadata } from 'next'
import { LanguageProvider } from './LanguageProvider'
import CareersShell from './CareersShell'

export const metadata: Metadata = {
  title: 'Portfolio Website for Job Seekers — Saudi Arabia & Qatar | MakeMyStore.online',
  description:
    'Get noticed by recruiters in Saudi Arabia and Qatar with a personal portfolio website, ATS-optimized CV, and LinkedIn rewrite. One-time build fee, EN/AR bilingual page.',
  keywords: [
    'portfolio website Saudi Arabia',
    'personal website Qatar professionals',
    'ATS CV portfolio website',
    'career portfolio developer Gulf',
  ],
  alternates: {
    canonical: 'https://www.makemystore.online/careers',
  },
  openGraph: {
    title: 'Portfolio Website for Job Seekers — Saudi Arabia & Qatar | MakeMyStore.online',
    description:
      'A personal portfolio website, ATS-optimized CV, and LinkedIn rewrite to help working professionals in Saudi Arabia and Qatar get noticed by recruiters.',
    url: 'https://www.makemystore.online/careers',
    siteName: 'MakeMyStore.online',
    type: 'website',
    images: [
      {
        // TODO: swap for a dedicated /og-image-careers.png once you have one —
        // reusing the main OG image for now so this doesn't 404.
        url: 'https://www.makemystore.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MakeMyStore Careers — portfolio websites for job seekers in Saudi Arabia and Qatar',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Website for Job Seekers — Saudi Arabia & Qatar | MakeMyStore.online',
    description:
      'A personal portfolio website, ATS-optimized CV, and LinkedIn rewrite to help you get noticed by recruiters.',
    images: ['https://www.makemystore.online/og-image.png'],
  },
}

// Note: this page is bilingual and client-rendered (EN default, AR via
// toggle). The global <html lang> in app/layout.tsx is intentionally left
// as-is — server-side lang switching for metadata is out of scope here.
export default function CareersPage() {
  return (
    <LanguageProvider>
      <CareersShell />
    </LanguageProvider>
  )
}
