'use client'

// app/project-1/_components/TemplateActionBar.tsx
//
// Small floating action bar shown on every page of the Project-1 demo site.
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
  "Hi! I'd like to order the 'Ahmed Al Mansoori' (Engineer / Infrastructure Director) portfolio template."

export default function TemplateActionBar() {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <a
        href={buildWhatsappUrl(ORDER_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="p1-mono inline-flex items-center gap-2 rounded-full border border-[var(--p1-brass)] bg-[var(--p1-brass)] px-4 py-2.5 text-[12px] font-semibold text-[#1b2430] shadow-lg shadow-black/30 transition hover:bg-[var(--p1-brass-dim)] sm:text-[13px]"
      >
        <MessageCircle size={15} aria-hidden />
        Order This Template
      </a>
      <a
        href="/careers"
        className="p1-mono inline-flex items-center gap-2 rounded-full border border-[var(--p1-line-strong)] bg-[var(--p1-panel)]/95 px-4 py-2.5 text-[12px] font-semibold text-[var(--p1-text)] shadow-lg shadow-black/30 backdrop-blur transition hover:border-[var(--p1-brass)] hover:text-[var(--p1-brass)] sm:text-[13px]"
      >
        <ArrowLeft size={15} aria-hidden />
        Back to Careers Page
      </a>
    </div>
  )
}
