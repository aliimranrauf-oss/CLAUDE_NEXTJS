// app/project-2/_data/adminDefaults.ts
// Default values for every field the /project-2/admin panel can edit or
// toggle. These are the "factory reset" values — anything the admin
// panel changes is layered on top of this via SiteSettingsContext and
// persisted to localStorage (this is a static demo site with no backend,
// so settings are per-browser only — see admin page for the export/import
// workaround).

export interface SiteSettings {
  nav: {
    showAbout: boolean
    showExpertise: boolean
    showExperience: boolean
    showInsights: boolean
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
    showRevenueCard: boolean
    showEbitdaCard: boolean
    showBudgetCard: boolean
    showFocusCard: boolean
  }
  sections: {
    showStats: boolean
    showExperienceHighlights: boolean
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
    showExpertise: true,
    showExperience: true,
    showInsights: true,
    connectLabel: "Let's Connect",
  },
  hero: {
    eyebrow: 'Senior Finance Executive',
    headingLine1: 'Turning Strategy',
    headingLine2: 'into Sustainable',
    headingLine3: 'Financial Value',
    accentWord: 'Sustainable',
    paragraph:
      '15+ years leading finance transformation, driving performance, and delivering growth for leading organizations across Saudi Arabia.',
    ctaPrimaryLabel: 'View Experience',
    ctaSecondaryLabel: 'Schedule Consultation',
    showCredentials: true,
    showRevenueCard: true,
    showEbitdaCard: true,
    showBudgetCard: true,
    showFocusCard: true,
  },
  sections: {
    showStats: true,
    showExperienceHighlights: true,
    showServicesTeaser: true,
    showTestimonial: true,
    showFinalCta: true,
  },
  contact: {
    email: 'hello@khalidalmansour.demo',
    phone: '+966 11 000 0000',
    address: 'Riyadh, Saudi Arabia',
    showEmail: true,
    showPhone: true,
    showAddress: true,
  },
  footer: {
    blurb:
      'Senior Finance Executive based in Riyadh, Saudi Arabia. Leading corporate finance, FP&A, and enterprise transformation for organizations building toward Vision 2030.',
  },
}

export const SETTINGS_STORAGE_KEY = 'p2_admin_settings_v1'
