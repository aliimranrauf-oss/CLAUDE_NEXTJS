// app/blog/page.tsx
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Ecommerce Blog — Tips, SEO & Store Growth | MakeMyStore',
  description:
    'Free ecommerce guides on SEO, store growth, dropshipping, Shopify alternatives, and how to run a profitable online store without paying monthly platform fees.',
  keywords: [
    'ecommerce blog',
    'ecommerce tips',
    'online store seo tips',
    'dropshipping guide',
    'shopify alternative tips',
    'ecommerce profit tips',
    'how to grow online store',
    'ecommerce marketing tips',
    'free ecommerce resources',
    'makemystore blog',
  ],
  alternates: { canonical: 'https://www.makemystore.online/blog' },
  openGraph: {
    title: 'Ecommerce Blog — Tips, SEO & Store Growth | MakeMyStore',
    description:
      'Free guides on ecommerce SEO, store growth, and running a profitable online store without monthly fees.',
    url: 'https://www.makemystore.online/blog',
    type: 'website',
    siteName: 'MakeMyStore',
    images: [
      {
        url: 'https://www.makemystore.online/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'MakeMyStore Blog — Ecommerce Tips & Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecommerce Blog — Tips, SEO & Store Growth | MakeMyStore',
    description:
      'Free guides on ecommerce SEO, store growth, and running a profitable online store without monthly fees.',
    images: ['https://www.makemystore.online/og-blog.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'MakeMyStore Blog',
  description:
    'Ecommerce tips, SEO guides, and insights on running a profitable online store without monthly platform fees.',
  url: 'https://www.makemystore.online/blog',
  publisher: {
    '@type': 'Organization',
    name: 'MakeMyStore',
    url: 'https://www.makemystore.online',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.makemystore.online/logo.png',
    },
  },
}

export const revalidate = 3600

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from('blogs')
    .select('id, slug, title, excerpt, category, published_at, image_url, author_name')
    .eq('is_live', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Supabase Error:', error.message)
  }

  const [featured, ...rest] = posts ?? []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen pt-24 pb-20 px-4 bg-[#0b0f1a]">
        <div className="max-w-7xl mx-auto">

          {/* ── Header ── */}
          <div className="text-center mb-14">
            <p
              className="text-[#00d4ff] font-bold tracking-[0.2em] uppercase text-[11px] mb-3"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Resources
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Ecommerce Insights &amp; Tips
            </h1>
            <p
              className="text-gray-400 max-w-2xl mx-auto text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Tips on ecommerce, SEO, and how to run a profitable online store without
              paying monthly platform fees.
            </p>
          </div>

          {/* ── Featured Post (first post gets hero treatment) ── */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block mb-14 rounded-2xl overflow-hidden border border-white/5 hover:border-[#00d4ff]/30 transition-all duration-300 card-glow"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-56 md:h-full min-h-[240px] overflow-hidden">
                  {featured.image_url ? (
                    <Image
                      src={featured.image_url}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0d1220]" />
                  )}
                </div>
                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#00d4ff]/10 text-[#00d4ff] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {featured.category || 'Ecommerce'}
                    </span>
                    <span className="text-gray-500 text-[11px]">
                      {new Date(featured.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#00d4ff] transition-colors leading-tight mb-4"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {featured.excerpt}
                  </p>
                  <span className="text-[#00d4ff] text-sm font-bold inline-flex items-center gap-2">
                    Read article →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* ── Blog Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article
                key={post.id}
                className="glass rounded-2xl overflow-hidden flex flex-col group border border-white/5 hover:border-[#00d4ff]/30 transition-all duration-300 card-glow"
              >
                {/* Card image with next/image for lazy loading */}
                <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden bg-[#0d1220]">
                  {post.image_url ? (
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0d1220]" />
                  )}
                </Link>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#00d4ff]/10 text-[#00d4ff] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {post.category || 'Ecommerce Tips'}
                    </span>
                    <span className="text-gray-500 text-[11px]">
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <h2
                    className="text-lg font-bold mb-2 text-white group-hover:text-[#00d4ff] transition-colors leading-snug"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p
                    className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2 flex-grow"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#00d4ff] text-sm font-bold inline-flex items-center gap-1 mt-auto"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Empty state */}
          {(!posts || posts.length === 0) && (
            <p className="text-center text-gray-500 mt-20">No posts yet. Check back soon.</p>
          )}
        </div>
      </main>
    </>
  )
}
