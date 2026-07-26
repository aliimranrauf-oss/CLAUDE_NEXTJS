import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ServicesOverview from '@/components/ServicesOverview'
import VideoSection from '@/components/VideoSection'
import Templates from '@/components/Templates'
import ComparisonTable from '@/components/ComparisonTable'
import ReviewsSection from '@/components/ReviewsSection'
import Footer from '@/components/Footer'
import { supabase, type Template } from '@/lib/supabaseClient'

// ── PERF/RELIABILITY FIX ─────────────────────────────────────────────────
// This page previously ran a live, uncached Supabase query on EVERY single
// request (including automated tools like Google's PageSpeed/Lighthouse)
// before it could send any HTML back. If Supabase ever answered slowly —
// a cold start, a brief network blip — the whole page hung waiting on it,
// which is exactly the kind of stall that makes Lighthouse's audit give up
// with a generic "Something went wrong" error. It also meant real visitors
// occasionally got a slow homepage for the same reason.
//
// Two independent fixes:
// 1. `revalidate = 60` turns this into a cached (ISR) page — Next.js
//    serves a cached copy instantly and only re-runs this function in the
//    background at most once a minute, so almost every request (including
//    Lighthouse's) gets an instant response instead of waiting on a live
//    DB round-trip. Template changes in the admin panel still show up
//    within 60 seconds — no manual redeploy needed.
// 2. A 5s timeout around the Supabase call means that even on the rare
//    request that does hit Supabase live, a slow/stalled response can no
//    longer hang the page forever — it just falls back to an empty
//    templates array (Templates.tsx already handles that gracefully with
//    its own "No templates found" state) and the rest of the page still
//    renders normally.
export const revalidate = 60

function withTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T | null> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ])
}

export default async function Home() {
  // ── PERF FIX: fetch templates on the server, before the page is sent ──────
  // Previously Templates.tsx fetched this itself, client-side, after the page
  // loaded — showing a spinner then a shimmer while waiting on Supabase +
  // image download. On slow connections this stretched out Speed Index badly.
  // Fetching here means the first template is already in the HTML the
  // browser receives — no client-side wait, no spinner, no shimmer on load.
  const templatesResult = await withTimeout(
    supabase.from('templates').select('*').order('created_at', { ascending: true }),
    5000
  )
  const templatesData: Template[] = templatesResult?.data ?? []
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'MakeMyStore.online',
        url: 'https://www.makemystore.online',
        logo: 'https://www.makemystore.online/logo.png',
        sameAs: ['https://wa.me/923293943161'],
      },
      {
        '@type': 'WebSite',
        name: 'MakeMyStore.online',
        url: 'https://www.makemystore.online',
      },
      {
        '@type': 'Service',
        serviceType: 'Ecommerce website development',
        provider: { '@type': 'Organization', name: 'MakeMyStore.online' },
        areaServed: 'Worldwide',
        description:
          'Custom ecommerce website development with a one-time build fee, deployed to any hosting of your choice.',
      },
      {
        '@type': 'Service',
        serviceType: 'Website speed optimization',
        provider: { '@type': 'Organization', name: 'MakeMyStore.online' },
        areaServed: 'Worldwide',
        url: 'https://www.makemystore.online/website-speed-optimization',
        description:
          'Website speed audits and performance fixes to improve Core Web Vitals, PageSpeed scores, and conversion rates.',
      },
      {
        '@type': 'Service',
        serviceType: 'Space and aerospace web development',
        provider: { '@type': 'Organization', name: 'MakeMyStore.online' },
        areaServed: 'Worldwide',
        url: 'https://www.makemystore.online/space',
        description:
          'Websites, dashboards, and internal tools for space startups, satellite operators, and aerospace suppliers.',
      },
    ],
  }

  return (
    <>
      {/* Structured data — helps Google show a richer result (org info,
          sitelinks) for the homepage. Subpages like /pricing and /tools
          already had their own JSON-LD; the homepage didn't. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

        {/* 1.5. Services overview — surfaces all 3 services (Ecommerce, Speed
            Audit, Space & Aerospace) so visitors don't have to dig into the
            nav menu to discover Speed Optimization / Space & Aerospace */}
        <ServicesOverview />

        {/* 2. Video — "What is MakeMyStore?" directly below hero */}
        <VideoSection />

        {/* 3. Templates — moved up for early product visibility */}
        <Templates initialTemplates={templatesData} />

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
