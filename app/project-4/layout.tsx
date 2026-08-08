import type { Metadata } from 'next'
import { newsreader, plusJakarta, reemKufi } from './fonts'
import './portfolio.css'
import Header from './_components/Header'
import Footer from './_components/Footer'
import TemplateActionBar from './_components/TemplateActionBar'
import { SiteSettingsProvider } from './_context/SiteSettingsContext'

export const metadata: Metadata = {
  title: 'Dr. Sara Al Naqbi — Consultant Dermatologist, Dubai',
  description:
    'Portfolio of Dr. Sara Al Naqbi, a Consultant Dermatologist & Aesthetic Medicine specialist based in Dubai, United Arab Emirates — 12+ years in medical and aesthetic dermatology.',
  robots: { index: false, follow: false },
}

export default function Project4Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`p4-scope ${newsreader.variable} ${plusJakarta.variable} ${reemKufi.variable}`}>
      <SiteSettingsProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <TemplateActionBar />
      </SiteSettingsProvider>
    </div>
  )
}
