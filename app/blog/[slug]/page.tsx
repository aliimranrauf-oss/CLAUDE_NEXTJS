// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 0

// ── Static params for ISR ──
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('blogs')
    .select('slug')
    .eq('is_live', true)

  return posts?.map((post) => ({ slug: post.slug })) ?? []
}

// ── Dynamic per-post metadata ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const { data: post } = await supabase
    .from('blogs')
    .select('title, excerpt, image_url, category, published_at, author_name')
    .eq('slug', slug)
    .eq('is_live', true)
    .single()

  if (!post) {
    return {
      title: 'Post Not Found | MakeMyStore Blog',
    }
  }

  const ogImage = post.image_url || 'https://www.makemystore.online/og-blog.png'

  return {
    title: `${post.title} | MakeMyStore Blog`,
    description: post.excerpt || `Read this article on the MakeMyStore blog.`,
    keywords: [
      post.category,
      'ecommerce tips',
      'online store guide',
      'makemystore blog',
    ].filter(Boolean) as string[],
    alternates: {
      canonical: `https://www.makemystore.online/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      url: `https://www.makemystore.online/blog/${slug}`,
      type: 'article',
      siteName: 'MakeMyStore',
      publishedTime: post.published_at,
      authors: post.author_name ? [post.author_name] : ['MakeMyStore'],
      tags: [post.category],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
  }
}

// ── Page ──
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: post, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('is_live', true)
    .single()

  if (error || !post) {
    notFound()
  }

  // JSON-LD Article schema for Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: post.image_url || 'https://www.makemystore.online/og-blog.png',
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      '@type': 'Person',
      name: post.author_name || 'MakeMyStore Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MakeMyStore',
      url: 'https://www.makemystore.online',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.makemystore.online/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.makemystore.online/blog/${slug}`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.makemystore.online' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.makemystore.online/blog' },
        { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.makemystore.online/blog/${slug}` },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen pt-20 pb-20 px-4 bg-[#0b0f1a]">
        {/* Header block stays on the dark site background, matches brand */}
        <div className="max-w-3xl mx-auto">
          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-2 text-[11px] text-gray-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#00d4ff] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-400 truncate max-w-[180px]">{post.title}</span>
          </nav>

          {/* ── Meta row ── */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {post.category && (
              <span className="bg-[#00d4ff]/10 text-[#00d4ff] text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                {post.category}
              </span>
            )}
            <span className="text-gray-500 text-[11px]">
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {post.author_name && (
              <span className="text-gray-500 text-[11px]">· {post.author_name}</span>
            )}
          </div>

          {/* ── Title ── */}
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {post.excerpt}
            </p>
          )}

          {/* ── Hero image — next/image with priority for LCP ── */}
          {post.image_url && (
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-0 md:mb-2">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* ── Reading card ──
            Long-form dark-on-dark text is genuinely harder to read than a
            light "paper" surface for the article body — this is why
            Medium, Google's own blogs, and most publications put the
            actual reading area on a light background even inside a dark
            or branded chrome. Nav/hero stay dark for brand identity;
            the article body switches to a light card for readability. */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl md:rounded-3xl px-6 py-10 md:px-14 md:py-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
            <div
              className="prose prose-base md:prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:font-[Syne,sans-serif]
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pt-2
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-[1.85] prose-p:mb-5
                prose-a:text-[#0077b6] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-5 prose-li:text-gray-700 prose-li:leading-relaxed prose-li:my-1.5
                prose-ol:my-5
                prose-blockquote:border-l-4 prose-blockquote:border-[#00d4ff] prose-blockquote:text-gray-600 prose-blockquote:italic
                prose-code:text-[#0077b6] prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-img:rounded-xl prose-img:w-full"
              style={{ fontFamily: 'Georgia, "DM Sans", serif' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* ── Back link ── */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className="text-[#00d4ff] text-sm font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
