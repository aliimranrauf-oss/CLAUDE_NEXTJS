import type { Metadata } from 'next'
import { spaceGrotesk, inter, plexMono } from './fonts'
import './portfolio.css'
import Header from './_components/Header'
import Footer from './_components/Footer'

export const metadata: Metadata = {
  title: 'Ahmed Al Mansoori — Senior Infrastructure & Program Director',
  description:
    'Portfolio of Ahmed Al Mansoori, a Senior Infrastructure & Program Director based in Abu Dhabi, UAE — 14+ years delivering transit, marine, and mixed-use developments.',
  robots: { index: false, follow: false },
}

export default function Project1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`p1-scope ${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <div className="p1-grid" />
      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
