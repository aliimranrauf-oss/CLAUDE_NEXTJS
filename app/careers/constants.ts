// app/careers/constants.ts
//
// ── PLACEHOLDER CONTACT LINKS ────────────────────────────────────────────────
// Both values below are SAMPLE placeholders so the page is fully wired up and
// clickable during review. Replace them with your real details before going
// live — nothing else in this page needs to change when you do.

// WhatsApp Business number (digits only, country code first, no "+", no spaces/dashes).
export const WHATSAPP_NUMBER = '441111111111'

// SAMPLE Fiverr gig link — replace with your real gig URL.
export const FIVERR_GIG_URL = 'https://www.fiverr.com/s/XXXXXXX' // ← REPLACE with real gig link

/** Builds a wa.me deep link with a pre-filled, URL-encoded message. */
export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// ── HERO SLIDESHOW IMAGES ────────────────────────────────────────────────
// The image on the right side of the /careers hero section cycles through
// these images with a fade transition, one at a time.
//
// To add, remove, reorder, or replace a slide in future: just edit this
// array. Nothing else in CareersHero.tsx needs to change.
//   - src: path to the image inside /public/careers/
//   - alt (optional): overrides the default alt text (dict.hero.imageAlt)
//     for that specific slide — useful if a slide needs its own description.
export const HERO_IMAGES: { src: string; alt?: string }[] = [
  { src: '/careers/careers-hero-1.jpg' },
  { src: '/careers/careers-hero-2.jpg' },
  { src: '/careers/careers-hero-3.jpg' },
  { src: '/careers/careers-hero-4.jpg' },
  { src: '/careers/careers-hero-5.jpg' },
  { src: '/careers/careers-hero-6.jpg' },
]

// How long each hero image stays on screen before crossfading to the next one (ms).
export const HERO_SLIDE_INTERVAL_MS = 4500
