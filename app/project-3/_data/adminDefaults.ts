// app/project-3/_data/adminDefaults.ts
// Default values for every field the /project-3/admin panel can edit or
// toggle. These are the "factory reset" values — anything the admin
// panel changes is layered on top of this via SiteSettingsContext and
// persisted to localStorage (this is a static demo site with no backend,
// so settings are per-browser only — see admin page for the export/import
// workaround).

export interface SiteSettings {
  nav: {
    showAbout: boolean
    showWork: boolean
    showServices: boolean
    showJournal: boolean
    connectLabel: string
  }
  hero: {
    eyebrow: string
    headingLine1: string
    headingLine2: string
    headingLine3: string
    accentWord: string
    paragraph: string
    ctaPrimaryLabel: string
    ctaSecondaryLabel: string
    showCredentials: boolean
    showPaletteCard: boolean
    showCampaignsCard: boolean
    showAudienceCard: boolean
    showDisciplinesCard: boolean
  }
  sections: {
    showStats: boolean
    showFeaturedWork: boolean
    showServicesTeaser: boolean
    showTestimonial: boolean
    showFinalCta: boolean
  }
  contact: {
    email: string
    phone: string
    address: string
    showEmail: boolean
    showPhone: boolean
    showAddress: boolean
  }
  footer: {
    blurb: string
  }
}

export const defaultSettings: SiteSettings = {
  nav: {
    showAbout: true,
    showWork: true,
    showServices: true,
    showJournal: true,
    connectLabel: "Let's Talk Brand",
  },
  hero: {
    eyebrow: 'Brand & Marketing Strategist',
    headingLine1: 'Brands That Earn',
    headingLine2: 'Their Place in the',
    headingLine3: 'Gulf Conversation',
    accentWord: 'Gulf',
    paragraph:
      '12+ years building brand strategy, identity systems, and go-to-market campaigns for retail, hospitality, and fintech brands entering Saudi Arabia, Qatar, and the wider GCC.',
    ctaPrimaryLabel: 'View the Work',
    ctaSecondaryLabel: 'Book a Strategy Call',
    showCredentials: true,
    showPaletteCard: true,
    showCampaignsCard: true,
    showAudienceCard: true,
    showDisciplinesCard: true,
  },
  sections: {
    showStats: true,
    showFeaturedWork: true,
    showServicesTeaser: true,
    showTestimonial: true,
    showFinalCta: true,
  },
  contact: {
    email: 'hello@noorkuwari.demo',
    phone: '+974 4000 0000',
    address: 'Doha, Qatar',
    showEmail: true,
    showPhone: true,
    showAddress: true,
  },
  footer: {
    blurb:
      'Senior Brand & Marketing Strategist based in Doha, Qatar. Building brand strategy, identity systems, and go-to-market campaigns for organizations across the GCC.',
  },
}

export const SETTINGS_STORAGE_KEY = 'p3_admin_settings_v1'
