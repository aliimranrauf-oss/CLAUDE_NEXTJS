import type { Metadata } from 'next'
import { Suspense } from 'react'
import ReportView from './ReportView'

// This page renders a single visitor's PageSpeed result for a URL they typed
// in — it's not evergreen content, so it stays out of search results.
export const metadata: Metadata = {
  title: 'Your PageSpeed Insights Report | MakeMyStore.online',
  description: 'Your free, real-time Google PageSpeed Insights report — performance, accessibility, Core Web Vitals and top opportunities to fix.',
  robots: {
    index: false,
    follow: false,
  },
}

function ReportLoadingFallback() {
  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center px-4">
      <p className="text-white/50 text-sm">Loading report&hellip;</p>
    </main>
  )
}

export default function ReportPage() {
  return (
    <Suspense fallback={<ReportLoadingFallback />}>
      <ReportView />
    </Suspense>
  )
}
