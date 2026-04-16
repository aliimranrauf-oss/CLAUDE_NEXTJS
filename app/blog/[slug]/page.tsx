import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('blogs')
    .select('slug')
    .eq('is_live', true)

  return posts?.map((post) => ({ slug: post.slug })) ?? []
}

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

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 bg-[#0b0f1a]">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-6">
          <span className="bg-[#00d4ff]/10 text-[#00d4ff] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-gray-500 text-[11px]">
            {new Date(post.published_at).toLocaleDateString()}
          </span>
          {post.author_name && (
            <span className="text-gray-500 text-[11px]">· {post.author_name}</span>
          )}
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {post.title}
        </h1>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl mb-10"
          />
        )}

        <div
          className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  )
}
