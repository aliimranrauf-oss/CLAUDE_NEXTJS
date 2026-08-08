'use client'

// app/project-4/_components/TemplateActionBar.tsx
//
// Small floating action bar shown on every page of the Project-4 demo site.
// Gives visitors two quick options without adding a second navbar:
//   1. "Order This Template" — opens WhatsApp with a pre-filled message
//      referencing this specific template.
//   2. "Back to Careers Page" — returns to the main site's /careers page.
//
// This is intentionally a standalone, self-contained component (fixed
// position, its own styles) so it doesn't touch Header.tsx, Footer.tsx, or
// any page content — it just floats on top of everything via layout.tsx.
//
// To point this at your real WhatsApp number, edit WHATSAPP_NUMBER in
// app/careers/constants.ts — this component reuses that single source of
// truth so you only ever update the number in one place.

import { MessageCircle, ArrowLeft } from 'lucide-react'
import { buildWhatsappUrl } from '@/app/careers/constants'

const ORDER_MESSAGE =
  "Hi! I'd like to order the 'Dr. Sara Al Naqbi' (Dermatologist) portfolio template."

export default function TemplateActionBar() {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <a
        href={buildWhatsappUrl(ORDER_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-[var(--p4-clay)] bg-[var(--p4-clay)] px-4 py-2.5 text-[12px] font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-[var(--p4-clay-soft)] sm:text-[13px]"
      >
        <MessageCircle size={15} aria-hidden />
        Order This Template
      </a>
      <a
        href="/careers"
        className="inline-flex items-center gap-2 rounded-full border border-[var(--p4-border-strong)] bg-[var(--p4-panel)]/95 px-4 py-2.5 text-[12px] font-semibold text-[var(--p4-text)] shadow-lg shadow-black/10 backdrop-blur transition hover:border-[var(--p4-clay)] hover:text-[var(--p4-clay)] sm:text-[13px]"
      >
        <ArrowLeft size={15} aria-hidden />
        Back to Careers Page
      </a>
    </div>
  )
}
