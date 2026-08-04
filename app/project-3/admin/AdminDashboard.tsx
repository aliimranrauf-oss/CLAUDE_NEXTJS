'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSiteSettings } from '../_context/SiteSettingsContext'
import { SiteSettings, defaultSettings } from '../_data/adminDefaults'
import AdminSection from './_components/AdminSection'
import Switch from './_components/Switch'
import Field from './_components/Field'

type SaveState = 'idle' | 'saving' | 'saved'

export default function AdminDashboard() {
  const { settings, setSettings, resetSettings, hydrated } = useSiteSettings()
  const [draft, setDraft] = useState<SiteSettings>(settings)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Keep the draft in sync once localStorage has been read on mount.
  useEffect(() => {
    if (hydrated) setDraft(settings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated])

  // Autosave: any change to the draft is written to context/localStorage
  // ~500ms after the person stops typing/toggling.
  useEffect(() => {
    if (!hydrated) return
    setSaveState('saving')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setSettings(draft)
      setSaveState('saved')
    }, 500)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, hydrated])

  function update<K extends keyof SiteSettings>(section: K, patch: Partial<SiteSettings[K]>) {
    setDraft((prev) => ({ ...prev, [section]: { ...prev[section], ...patch } }))
  }

  function handleReset() {
    if (!confirm('Reset every field and toggle back to the original demo defaults?')) return
    resetSettings()
    setDraft(defaultSettings)
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'project-3-settings.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportClick() {
    fileInputRef.current?.click()
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        setDraft({
          nav: { ...defaultSettings.nav, ...parsed.nav },
          hero: { ...defaultSettings.hero, ...parsed.hero },
          sections: { ...defaultSettings.sections, ...parsed.sections },
          contact: { ...defaultSettings.contact, ...parsed.contact },
          footer: { ...defaultSettings.footer, ...parsed.footer },
        })
      } catch {
        alert("That file doesn't look like a valid settings export.")
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
      {/* Top bar */}
      <div className="p3-card sticky top-[76px] z-30 mb-8 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
        <div>
          <span className="p3-eyebrow">Admin</span>
          <h1 className="p3-display mt-1 text-xl font-semibold text-[var(--p3-ink)]">
            Content &amp; visibility editor
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[12px] text-[var(--p3-muted-2)]">
            {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved ✓' : ''}
          </span>
          <button onClick={handleExport} className="p3-btn p3-btn-outline !px-4 !py-2 text-[11px]">
            Export JSON
          </button>
          <button onClick={handleImportClick} className="p3-btn p3-btn-outline !px-4 !py-2 text-[11px]">
            Import JSON
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImportFile} className="hidden" />
          <button onClick={handleReset} className="p3-btn p3-btn-outline !px-4 !py-2 text-[11px] text-red-500">
            Reset
          </button>
          <Link href="/project-3" target="_blank" className="p3-btn p3-btn-solid !px-4 !py-2 text-[11px]">
            View live site ↗
          </Link>
        </div>
      </div>

      <p className="mb-8 max-w-xl text-[13.5px] leading-relaxed text-[var(--p3-muted)]">
        Changes save automatically to this browser and reflect on the site immediately —
        open <Link href="/project-3" target="_blank" className="p3-underline text-[var(--p3-ink)]">the live page</Link> in
        another tab to watch them update. This is a static demo with no backend, so settings
        are stored locally in this browser only — use <strong>Export JSON</strong> to back up
        or move your changes to another browser/device.
      </p>

      <div className="flex flex-col gap-6">
        <AdminSection title="Navigation" description="Show or hide top-nav links, and edit the connect button label.">
          <Switch label="About" checked={draft.nav.showAbout} onChange={(v) => update('nav', { showAbout: v })} />
          <Switch label="Work" checked={draft.nav.showWork} onChange={(v) => update('nav', { showWork: v })} />
          <Switch label="Services" checked={draft.nav.showServices} onChange={(v) => update('nav', { showServices: v })} />
          <Switch label="Journal" checked={draft.nav.showJournal} onChange={(v) => update('nav', { showJournal: v })} />
          <Field
            label="Connect button label"
            value={draft.nav.connectLabel}
            onChange={(v) => update('nav', { connectLabel: v })}
            hint="Shown in the header button, e.g. “Let's Talk Brand”."
          />
        </AdminSection>

        <AdminSection title="Hero — copy" description="The headline, supporting text, and CTA button labels.">
          <Field label="Eyebrow label" value={draft.hero.eyebrow} onChange={(v) => update('hero', { eyebrow: v })} />
          <Field label="Heading — line 1" value={draft.hero.headingLine1} onChange={(v) => update('hero', { headingLine1: v })} />
          <Field label="Heading — line 2" value={draft.hero.headingLine2} onChange={(v) => update('hero', { headingLine2: v })} />
          <Field label="Heading — line 3" value={draft.hero.headingLine3} onChange={(v) => update('hero', { headingLine3: v })} />
          <Field
            label="Wine accent word"
            value={draft.hero.accentWord}
            onChange={(v) => update('hero', { accentWord: v })}
            hint="Must exactly match a word within the three heading lines above to be highlighted in oxblood."
          />
          <Field label="Supporting paragraph" value={draft.hero.paragraph} onChange={(v) => update('hero', { paragraph: v })} multiline />
          <Field label="Primary CTA label" value={draft.hero.ctaPrimaryLabel} onChange={(v) => update('hero', { ctaPrimaryLabel: v })} />
          <Field label="Secondary CTA label" value={draft.hero.ctaSecondaryLabel} onChange={(v) => update('hero', { ctaSecondaryLabel: v })} />
        </AdminSection>

        <AdminSection title="Hero — brand board cards" description="Show or hide individual cards in the hero.">
          <Switch label="Credentials row" hint="12+ Years, GCC-Wide, 40+ Brands, Doha Based" checked={draft.hero.showCredentials} onChange={(v) => update('hero', { showCredentials: v })} />
          <Switch label="Signature Palette card" checked={draft.hero.showPaletteCard} onChange={(v) => update('hero', { showPaletteCard: v })} />
          <Switch label="Campaigns Launched card" checked={draft.hero.showCampaignsCard} onChange={(v) => update('hero', { showCampaignsCard: v })} />
          <Switch label="Audience Growth card" checked={draft.hero.showAudienceCard} onChange={(v) => update('hero', { showAudienceCard: v })} />
          <Switch label="Core Disciplines card" checked={draft.hero.showDisciplinesCard} onChange={(v) => update('hero', { showDisciplinesCard: v })} />
        </AdminSection>

        <AdminSection title="Homepage sections" description="Show or hide entire sections below the hero.">
          <Switch label="Stats strip" checked={draft.sections.showStats} onChange={(v) => update('sections', { showStats: v })} />
          <Switch label="Featured work" checked={draft.sections.showFeaturedWork} onChange={(v) => update('sections', { showFeaturedWork: v })} />
          <Switch label="Core capabilities / services teaser" checked={draft.sections.showServicesTeaser} onChange={(v) => update('sections', { showServicesTeaser: v })} />
          <Switch label="Testimonial" checked={draft.sections.showTestimonial} onChange={(v) => update('sections', { showTestimonial: v })} />
          <Switch label="Final call-to-action banner" checked={draft.sections.showFinalCta} onChange={(v) => update('sections', { showFinalCta: v })} />
        </AdminSection>

        <AdminSection title="Contact details" description="Shown on the Contact page and in the footer.">
          <Switch label="Show email" checked={draft.contact.showEmail} onChange={(v) => update('contact', { showEmail: v })} />
          <Field label="Email address" value={draft.contact.email} onChange={(v) => update('contact', { email: v })} />
          <Switch label="Show phone" checked={draft.contact.showPhone} onChange={(v) => update('contact', { showPhone: v })} />
          <Field label="Phone number" value={draft.contact.phone} onChange={(v) => update('contact', { phone: v })} />
          <Switch label="Show address" checked={draft.contact.showAddress} onChange={(v) => update('contact', { showAddress: v })} />
          <Field label="Address / location" value={draft.contact.address} onChange={(v) => update('contact', { address: v })} />
        </AdminSection>

        <AdminSection title="Footer">
          <Field label="Footer blurb" value={draft.footer.blurb} onChange={(v) => update('footer', { blurb: v })} multiline />
        </AdminSection>
      </div>
    </div>
  )
}
