// Notice the import name matches your filename "supabaseClient"
import { supabase } from '@/lib/supabaseClient' 
import Link from 'next/link'

export const revalidate = 3600 

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_live', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Supabase Error:', error.message)
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 bg-[#0b0f1a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-[#00d4ff] font-bold tracking-[0.2em] uppercase text-[11px] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            Resources
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Ecommerce Insights & Tips
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Tips on ecommerce, SEO, and how to run a profitable online store without 
            paying monthly platform fees.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <article 
              key={post.id} 
              className="glass rounded-2xl overflow-hidden flex flex-col group border border-white/5 hover:border-[#00d4ff]/30 transition-all duration-300 card-glow"
            >
              <Link href={`/blog/${post.slug}`} className="block overflow-hidden h-52 relative">
                <img 
                  src={post.image_url || '/placeholder-blog.jpg'} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#00d4ff]/10 text-[#00d4ff] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {post.category || 'Ecommerce Tips'}
                  </span>
                  <span className="text-gray-500 text-[11px]">
                    {new Date(post.published_at).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-3 text-white group-hover:text-[#00d4ff] transition-colors leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {post.excerpt}
                </p>

                <Link 
                  href={`/blog/${post.slug}`} 
                  className="mt-auto text-[#00d4ff] text-sm font-bold inline-flex items-center gap-2"
                >
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
