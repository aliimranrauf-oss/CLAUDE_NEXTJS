import { supabase, type Template } from '@/lib/supabaseClient'
import Image from 'next/image'

async function getTemplates(): Promise<Template[]> {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('is_primary', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error fetching templates:', error.message)
    return []
  }
  return data ?? []
}

function TemplateCard({ t }: { t: Template }) {
  return (
    <article
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 card-glow
        ${t.is_primary
          ? 'border-2 border-[#00d4ff]/40 shadow-[0_0_24px_rgba(0,212,255,0.12)]'
          : 'border border-white/8'
        }`}
      style={{ background: 'var(--card)' }}
    >
      {t.is_primary && (
        <div
          className="absolute top-3 left-3 z-10 text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: 'var(--gradient)', color: '#0b0f1a' }}
        >
          ⭐ Featured
        </div>
      )}

      {/* Desktop image */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#0b0f1a]">
        {t.desktop_image ? (
          <Image
            src={t.desktop_image}
            alt={`${t.name} desktop preview`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
            No preview
          </div>
        )}
        {/* Mobile thumbnail overlay */}
        {t.mobile_image && (
          <div className="absolute bottom-3 right-3 w-14 rounded-lg overflow-hidden border-2 border-[#00d4ff]/40 shadow-lg">
            <Image
              src={t.mobile_image}
              alt={`${t.name} mobile preview`}
              width={56}
              height={100}
              className="object-cover w-full"
            />
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>
            {t.name}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 whitespace-nowrap">
            {t.category}
          </span>
        </div>
        {t.description && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{t.description}</p>
        )}
        <div className="mt-4">
          <a
            href="/contact"
            className="text-sm font-semibold text-[#00d4ff] hover:underline transition-colors"
          >
            Get this template →
          </a>
        </div>
      </div>
    </article>
  )
}

export default async function Templates() {
  const templates = await getTemplates()

  return (
    <section id="templates" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#00d4ff] uppercase tracking-widest mb-3 block">
            Store Templates
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Ready-Made Designs,{' '}
            <span className="text-gradient">Fully Customized</span> for You
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Every template is a starting point — we tailor it completely to your brand, products, and goals.
          </p>
        </div>

        {/* Grid */}
        {templates.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Templates coming soon. Check back shortly!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t) => (
              <TemplateCard key={t.id} t={t} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Don't see what you need? We build fully custom too.</p>
          <a href="/contact" className="btn-primary inline-block">
            Request a Custom Design →
          </a>
        </div>
      </div>
    </section>
  )
}
