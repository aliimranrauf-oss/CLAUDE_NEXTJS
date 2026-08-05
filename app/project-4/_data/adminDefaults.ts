// app/project-4/_data/adminDefaults.ts
// Default values for every field the /project-4/admin panel can edit or
// toggle. These are the "factory reset" values — anything the admin
// panel changes is layered on top of this via SiteSettingsContext and
// persisted to localStorage (this is a static demo site with no backend,
// so settings are per-browser only — see admin page for the export/import
// workaround).

export interface SiteSettings {
  nav: {
    showAbout: boolean
    showTreatments: boolean
    showExperience: boolean
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
    showPatientsCard: boolean
    showSatisfactionCard: boolean
    showSuccessCard: boolean
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
    showTreatments: true,
    showExperience: true,
    showJournal: true,
    connectLabel: 'Book Consultation',
  },
  hero: {
    eyebrow: 'Consultant Dermatologist, Dubai',
    headingLine1: 'Precision Skincare,',
    headingLine2: 'Rooted in Clinical',
    headingLine3: 'Trust',
    accentWord: 'Clinical',
    paragraph:
      '12+ years combining evidence-based dermatology with a calm, patient-first approach — helping residents across the UAE achieve healthy, confident skin.',
    ctaPrimaryLabel: 'View Treatments',
    ctaSecondaryLabel: 'Book Consultation',
    showCredentials: true,
    showPatientsCard: true,
    showSatisfactionCard: true,
    showSuccessCard: true,
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
    email: 'hello@drsaraalnaqbi.demo',
    phone: '+971 4 000 0000',
    address: 'Jumeirah, Dubai, United Arab Emirates',
    showEmail: true,
    showPhone: true,
    showAddress: true,
  },
  footer: {
    blurb:
      'Consultant Dermatologist & Aesthetic Medicine specialist based in Dubai, UAE. Medical dermatology, laser treatments, and considered aesthetic care for residents across the Emirates.',
  },
}

export const SETTINGS_STORAGE_KEY = 'p4_admin_settings_v1'
