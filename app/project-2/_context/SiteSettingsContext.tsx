'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { defaultSettings, SETTINGS_STORAGE_KEY, SiteSettings } from '../_data/adminDefaults'

interface SiteSettingsContextValue {
  settings: SiteSettings
  setSettings: (next: SiteSettings) => void
  resetSettings: () => void
  hydrated: boolean
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null)

/**
 * Wraps the whole project-2 tree so any component can read the current
 * admin-editable content/visibility settings. Server-rendered output
 * always starts from `defaultSettings` (so there's no hydration
 * mismatch); once mounted in the browser it reads anything saved from
 * the admin panel out of localStorage and re-renders with that instead.
 *
 * This is a static demo site with no backend/database, so this is
 * intentionally per-browser only — see /project-2/admin for the
 * export/import JSON workaround if you need to move settings between
 * browsers or devices.
 */
export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<SiteSettings>(defaultSettings)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        // Shallow-merge each section so older saved settings don't break
        // when new fields are added to defaultSettings later.
        setSettingsState({
          nav: { ...defaultSettings.nav, ...parsed.nav },
          hero: { ...defaultSettings.hero, ...parsed.hero },
          sections: { ...defaultSettings.sections, ...parsed.sections },
          contact: { ...defaultSettings.contact, ...parsed.contact },
          footer: { ...defaultSettings.footer, ...parsed.footer },
        })
      }
    } catch {
      // Corrupt or missing localStorage — fall back to defaults silently.
    } finally {
      setHydrated(true)
    }
  }, [])

  function setSettings(next: SiteSettings) {
    setSettingsState(next)
    try {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Storage full/unavailable — settings still work for this session.
    }
  }

  function resetSettings() {
    setSettingsState(defaultSettings)
    try {
      window.localStorage.removeItem(SETTINGS_STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return (
    <SiteSettingsContext.Provider value={{ settings, setSettings, resetSettings, hydrated }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext)
  if (!ctx) throw new Error('useSiteSettings must be used within SiteSettingsProvider')
  return ctx
}
