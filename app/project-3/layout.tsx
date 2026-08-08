import type { Metadata } from 'next'
import { fraunces, manrope, amiri } from './fonts'
import './portfolio.css'
import Header from './_components/Header'
import Footer from './_components/Footer'
import TemplateActionBar from './_components/TemplateActionBar'
import { SiteSettingsProvider } from './_context/SiteSettingsContext'

export const metadata: Metadata = {
  title: 'Noor Al-Kuwari — Senior Brand & Marketing Strategist',
  description:
    'Portfolio of Noor Al-Kuwari, a Senior Brand & Marketing Strategist based in Doha, Qatar — 12+ years building brand strategy, identity systems, and go-to-market campaigns across the GCC.',
  robots: { index: false, follow: false },
}

export default function Project3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`p3-scope ${fraunces.variable} ${manrope.variable} ${amiri.variable}`}>
      <SiteSettingsProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <TemplateActionBar />
      </SiteSettingsProvider>
    </div>
  )
}
