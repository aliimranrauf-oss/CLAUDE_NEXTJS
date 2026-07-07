// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 0

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('blogs')
    .select('slug')
    .eq('is_live', true)

  return posts?.map((post) => ({ slug: post.slug })) ?? []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await supabase
    .from('blogs')
    .select('title, excerpt, image_url, category, published_at, author_name')
    .eq('slug', slug)
    .eq('is_live', true)
    .single()

  if (!post) {
    return { title: 'Post Not Found | MakeMyStore Blog' }
  }

  const ogImage = post.image_url || 'https://www.makemystore.online/og-blog.png'

  return {
    title: `${post.title} | MakeMyStore Blog`,
    description: post.excerpt || 'Read this article on the MakeMyStore blog.',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      url: `https://www.makemystore.online/blog/${slug}`,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: 'summary_large_image', images: [ogImage] },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: post, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('is_live', true)
    .single()

  if (error || !post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: post.image_url,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: { '@type': 'Person', name: post.author_name || 'MakeMyStore Team' },
    publisher: {
      '@type': 'Organization',
      name: 'MakeMyStore',
      url: 'https://www.makemystore.online',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen pt-20 pb-20 px-4 bg-[#0b0f1a]">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] text-gray-500 mb-8">
            <Link href="/" className="hover:text-[#00d4ff]">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#00d4ff]">Blog</Link>
            <span>/</span>
            <span className="text-gray-400 truncate">{post.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.category && (
              <span className="bg-[#00d4ff]/10 text-[#00d4ff] text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                {post.category}
              </span>
            )}
            <span className="text-gray-500 text-sm">
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {post.author_name && <span className="text-gray-500 text-sm">· {post.author_name}</span>}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-400 mb-10 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {post.excerpt}
            </p>
          )}

          {/* Hero Image */}
          {post.image_url && (
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* === MAIN CONTENT CARD - BEST FOR READING === */}
          <div className="bg-white rounded-3xl px-6 md:px-14 py-12 md:py-16 shadow-xl">
            <article
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:font-[Syne,sans-serif]
                prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:text-gray-700 prose-p:leading-[1.85] prose-p:mb-6
                prose-a:text-[#0077b6] prose-a:font-medium hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ul:list-disc prose-ul:pl-6 prose-li:my-2 prose-li:leading-relaxed
                prose-ol:list-decimal prose-ol:pl-6
                prose-blockquote:border-l-4 prose-blockquote:border-[#00d4ff] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
                prose-img:rounded-2xl prose-img:shadow-md"
              style={{ fontFamily: 'Georgia, "DM Sans", serif' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Back Link */}
          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#00d4ff] font-semibold hover:gap-3 transition-all"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
