'use client'

// components/blog/BlogTopBar.tsx
//
// Renders the normal full-site <Navbar /> for regular blog visitors. But if
// someone arrived via one of the 3 "pain point" cards on /careers (those
// links now carry ?from=careers), we swap in a slim, focused bar instead:
// "Back to Careers" + the other 2 related posts. This keeps that funnel
// from leaking readers into Pricing/Home/etc. and losing them mid-read.
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'

// Keep in sync with app/careers/dictionary.ts painPoints[].slug
const CAREERS_POSTS_EN = [
  { slug: 'ats-cv-rejection-uae-companies', title: 'Why Great CVs Get Rejected' },
  { slug: 'uae-recruiters-google-your-name', title: 'Why Recruiters Google Your Name' },
  { slug: 'linkedin-not-enough-gulf-job-seekers', title: "LinkedIn Isn't Enough Anymore" },
]

const CAREERS_POSTS_AR = [
  { slug: 'ats-cv-rejection-uae-companies-ar', title: 'لماذا تُرفض السير الذاتية؟' },
  { slug: 'uae-recruiters-google-your-name-ar', title: 'لماذا يبحث المسؤولون عن اسمك؟' },
  { slug: 'linkedin-not-enough-gulf-job-seekers-ar', title: 'LinkedIn وحده لم يعد كافيًا' },
]

export default function BlogTopBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const fromCareers = searchParams.get('from') === 'careers'

  if (!fromCareers) {
    return <Navbar />
  }

  const currentSlug = pathname?.split('/').filter(Boolean).pop() ?? ''
  const isAr = currentSlug.endsWith('-ar')
  const list = isAr ? CAREERS_POSTS_AR : CAREERS_POSTS_EN
  const otherPosts = list.filter((p) => p.slug !== currentSlug)

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="sticky top-0 z-50 bg-[#0b0f1a]/95 backdrop-blur border-b border-white/10"
    >
      <div className="max-w-3xl mx-auto px-4 py-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link
          href="/careers"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00d4ff] hover:opacity-80 transition-opacity shrink-0"
        >
          <ArrowLeft size={15} aria-hidden className="rtl:rotate-180" />
          {isAr ? 'العودة إلى صفحة التوظيف' : 'Back to Careers page'}
        </Link>

        {otherPosts.length > 0 && (
          <>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-xs uppercase tracking-wide text-white/40 shrink-0">
              {isAr ? 'اقرأ أيضًا' : 'Also read'}
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}?from=careers`}
                  className="text-sm text-white/60 hover:text-[#00d4ff] transition-colors"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
