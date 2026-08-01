'use client'

// app/careers/CareersShell.tsx
//
// Client wrapper that reads the language context, sets dir="rtl" on the page
// root when Arabic is active, swaps in the Tajawal font stack for Arabic, and
// composes all the /careers sections in order. Kept separate from page.tsx
// so page.tsx can stay a server component and export `metadata`.

import { useLanguage } from './LanguageProvider'
import { tajawal } from './fonts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CareersHero from '@/components/careers/CareersHero'
import CareersPainPoints from '@/components/careers/CareersPainPoints'
import CareersExamples from '@/components/careers/CareersExamples'
import CareersPackages from '@/components/careers/CareersPackages'
import CareersHowItWorks from '@/components/careers/CareersHowItWorks'
import CareersTestimonials from '@/components/careers/CareersTestimonials'
import CareersFAQ from '@/components/careers/CareersFAQ'
import CareersBlogTeaser from '@/components/careers/CareersBlogTeaser'
import CareersCTA from '@/components/careers/CareersCTA'
import LangToggle from '@/components/careers/LangToggle'

export default function CareersShell() {
  const { dir } = useLanguage()
  const isRtl = dir === 'rtl'

  return (
    <div
      dir={dir}
      className={tajawal.variable}
      style={isRtl ? { fontFamily: 'var(--font-tajawal), Tajawal, sans-serif' } : undefined}
    >
      {/*
        Scoped RTL font override — only applies inside this page (data
        attribute is unique to /careers) and only swaps headings/body copy,
        never touching the global Syne/DM Sans setup used elsewhere on the
        site.
      */}
      {isRtl && (
        <style>{`
          [data-careers-root="true"] .font-display,
          [data-careers-root="true"] h1,
          [data-careers-root="true"] h2,
          [data-careers-root="true"] h3,
          [data-careers-root="true"] .font-body,
          [data-careers-root="true"] p,
          [data-careers-root="true"] span,
          [data-careers-root="true"] li,
          [data-careers-root="true"] button,
          [data-careers-root="true"] a {
            font-family: var(--font-tajawal), 'Tajawal', sans-serif;
          }
        `}</style>
      )}

      <div data-careers-root="true">
        <Navbar />

        {/*
          Persistent language toggle — fixed below the navbar so it stays
          visible through every section as the user scrolls, not just the
          hero. Uses logical `end-4` (not `right-4`) so it lands top-left
          in RTL and top-right in LTR automatically, matching `dir`, the
          same pattern as the sticky WhatsApp button in CareersCTA.tsx.
        */}
        <div className="fixed top-20 sm:top-24 end-4 sm:end-6 z-40">
          <LangToggle />
        </div>

        <main id="main-content">
          <CareersHero />
          <CareersPainPoints />
          <CareersExamples />
          <CareersPackages />
          <CareersHowItWorks />
          <CareersTestimonials />
          <CareersFAQ />
          <CareersBlogTeaser />
          <CareersCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
