import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Templates from '@/components/Templates'
import ComparisonTable from '@/components/ComparisonTable'
import Footer from '@/components/Footer'

function TemplatesLoading() {
  return (
    <section id="templates" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="h-4 w-32 bg-white/10 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-96 bg-white/10 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden animate-pulse"
              style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="aspect-video bg-white/5" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-white/10 rounded w-3/4" />
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Suspense fallback={<TemplatesLoading />}>
        <Templates />
      </Suspense>
      <ComparisonTable />
      <Footer />
    </main>
  )
}
