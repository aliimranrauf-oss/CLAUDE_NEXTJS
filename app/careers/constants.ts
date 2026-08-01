// app/careers/constants.ts
//
// ── PLACEHOLDER CONTACT LINKS ────────────────────────────────────────────────
// Both values below are SAMPLE placeholders so the page is fully wired up and
// clickable during review. Replace them with your real details before going
// live — nothing else in this page needs to change when you do.

// WhatsApp Business number (digits only, country code first, no "+", no spaces/dashes).
export const WHATSAPP_NUMBER = '447988597332'

// SAMPLE Fiverr gig link — replace with your real gig URL.
export const FIVERR_GIG_URL = 'https://www.fiverr.com/s/XXXXXXX' // ← REPLACE with real gig link

/** Builds a wa.me deep link with a pre-filled, URL-encoded message. */
export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
