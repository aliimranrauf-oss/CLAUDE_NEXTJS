// app/blog/layout.tsx
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
