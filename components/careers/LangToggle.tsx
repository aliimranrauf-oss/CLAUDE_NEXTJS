'use client'

// components/careers/LangToggle.tsx
import { Languages } from 'lucide-react'
import { useLanguage } from '@/app/careers/LanguageProvider'

export default function LangToggle() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Switch language / تبديل اللغة"
      className="inline-flex items-center gap-1.5 rounded-full border border-cyan/25 bg-cyan/[0.06] px-3 py-1.5 text-xs font-bold tracking-wide text-cyan hover:border-cyan/45 hover:bg-cyan/[0.1] transition-colors"
    >
      <Languages size={13} aria-hidden />
      <span className={lang === 'en' ? 'text-white' : 'text-cyan'}>EN</span>
      <span className="text-white/25">/</span>
      <span className={lang === 'ar' ? 'text-white' : 'text-cyan'}>عربي</span>
    </button>
  )
}
