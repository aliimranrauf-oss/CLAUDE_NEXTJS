import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import VideoSection from '@/components/VideoSection'
import Templates from '@/components/Templates'
import ComparisonTable from '@/components/ComparisonTable'
import ReviewsSection from '@/components/ReviewsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />

      {/*
        ── <main> landmark added ──────────────────────────────────────────────
        Fixes Lighthouse accessibility audit:
        "Document does not have a main landmark"
        Also fixes: "The page contains a heading, skip link, or landmark region"
      */}
      <main id="main-content">
        {/* 1. Hero — headline, badges, CTA */}
        <Hero />

        {/* 2. Video — "What is MakeMyStore?" directly below hero */}
        <VideoSection />

        {/* 3. Templates — moved up for early product visibility */}
        <Templates />

        {/* 4. Comparison table — trust-building after templates */}
        <ComparisonTable />

        {/* 5. Reviews — social proof from 500+ real store owners */}
        <ReviewsSection />
      </main>

      {/* 6. Footer */}
      <Footer />
    </>
  )
}
