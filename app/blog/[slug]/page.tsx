// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 0

export async function generateStaticParams() {
  const { data: posts } = await supabase.from('blogs').select('slug').eq('is_live', true)
  return posts?.map((post) => ({ slug: post.slug })) ?? []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await supabase
    .from('blogs')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('is_live', true)
    .single()

  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | MakeMyStore Blog`,
    description: post.excerpt || '',
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: post } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('is_live', true)
    .single()

  if (!post) notFound()

  return (
    <main className="min-h-screen pt-20 pb-20 px-4 bg-[#0b0f1a]">
      <div className="max-w-3xl mx-auto">
        {/* Title & Meta */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>
        </div>

        {/* Featured Image */}
        {post.image_url && (
          <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-10 bg-[#0d1220]">
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

        {/* White Content Card */}
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl">
          <div 
            className="prose prose-lg max-w-none text-gray-700 [&_h1]:text-gray-900 [&_h2]:text-gray-900 [&_h3]:text-gray-900 [&_h4]:text-gray-900 [&_strong]:text-gray-900 [&_b]:text-gray-900 [&_a]:text-[#00d4ff]"
            style={{ fontFamily: 'Georgia, serif', lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: post.content || '<p>No content available.</p>' }}
          />
        </div>

        <div className="mt-10">
          <Link href="/blog" className="text-[#00d4ff] font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </main>
  )
}
