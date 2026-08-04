import type { Metadata } from 'next'
import { playfair, instrumentSerif, inter } from './fonts'
import './portfolio.css'
import Header from './_components/Header'
import Footer from './_components/Footer'
import { SiteSettingsProvider } from './_context/SiteSettingsContext'

export const metadata: Metadata = {
  title: 'Khalid Al-Mansour — Senior Finance Executive',
  description:
    'Portfolio of Khalid Al-Mansour, a Senior Finance Executive based in Riyadh, Saudi Arabia — 15+ years leading corporate finance, FP&A, and enterprise transformation.',
  robots: { index: false, follow: false },
}

export default function Project2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`p2-scope ${playfair.variable} ${instrumentSerif.variable} ${inter.variable}`}>
      <SiteSettingsProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </SiteSettingsProvider>
    </div>
  )
}
