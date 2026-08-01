'use client'

// app/careers/LanguageProvider.tsx
//
// Small, self-contained language context scoped to /careers only. Defaults
// to English, persists the choice to localStorage so it survives reloads,
// and exposes the active dictionary + a setter to the rest of the page.
// This intentionally does NOT touch app/layout.tsx or any global i18n setup.

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { dictionaries, type Lang, type CareersDictionary } from './dictionary'

const STORAGE_KEY = 'careers_lang'

interface LanguageContextValue {
  lang: Lang
  dict: CareersDictionary
  dir: 'ltr' | 'rtl'
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always default to 'en' on first render (server + client match) — the
  // persisted value (if any) is applied after mount to avoid hydration
  // mismatches.
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'en' || stored === 'ar') {
        setLangState(stored)
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — silently keep default
    }
  }, [])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore persistence failures
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'ar' : 'en')
  }, [lang, setLang])

  const value: LanguageContextValue = {
    lang,
    dict: dictionaries[lang],
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    setLang,
    toggleLang,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider (app/careers scope only)')
  }
  return ctx
}
