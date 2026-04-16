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

      {/* 6. Footer (add your existing pricing / final CTA sections here if separate) */}
      <Footer />
    </>
  )
}
