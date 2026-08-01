// app/blog/layout.tsx
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Footer from '@/components/Footer'
import BlogTopBar from '@/components/blog/BlogTopBar'
import Navbar from '@/components/Navbar'

// Base metadata inherited by all /blog/* pages (overridden per-page as needed)
export const metadata: Metadata = {
  metadataBase: new URL('https://www.makemystore.online'),
  alternates: { canonical: 'https://www.makemystore.online/blog' },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/*
        BlogTopBar reads the URL's ?from=careers param (via useSearchParams,
        hence the Suspense boundary) to decide whether to show the normal
        full Navbar or the slim "Back to Careers + 2 related posts" bar.
        Fallback while resolving is the plain Navbar so there's no layout
        flash for the common case (direct/organic blog visitors).
      */}
      <Suspense fallback={<Navbar />}>
        <BlogTopBar />
      </Suspense>
      {children}
      <Footer />
    </>
  )
}
