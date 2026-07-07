import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import VideoSection from '@/components/VideoSection'
import Templates from '@/components/Templates'
import ComparisonTable from '@/components/ComparisonTable'
import ReviewsSection from '@/components/ReviewsSection'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabaseClient'

export default async function Home() {
  // ── PERF FIX: fetch templates on the server, before the page is sent ──────
  // Previously Templates.tsx fetched this itself, client-side, after the page
  // loaded — showing a spinner then a shimmer while waiting on Supabase +
  // image download. On slow connections this stretched out Speed Index badly.
  // Fetching here means the first template is already in the HTML the
  // browser receives — no client-side wait, no spinner, no shimmer on load.
  const { data: templatesData } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: true })
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
        <Templates initialTemplates={templatesData ?? []} />

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
