# Project-2 — Senior Finance Executive Demo Portfolio

Standalone demo portfolio for `/project-2`, built following the exact same
isolation pattern as `/project-1`. It shares **zero** components, CSS
variables, or fonts with Project-1 or the main site.

## Live route
`/project-2` — linked from the Finance professional card on `/careers`
(`components/careers/CareersExamples.tsx`, `LIVE_LINKS[0]`).
`robots: { index: false, follow: false }` is set in `layout.tsx`.

## Folder structure
```
app/project-2/
  layout.tsx            Root layout — fonts + portfolio.css + Header/Footer
  fonts.ts               next/font/google: Playfair Display, Instrument Serif, Inter
  portfolio.css           All design tokens & scoped styles, under .p2-scope
  page.tsx                Home (hero, stats, experience highlights, services, testimonial, CTA)
  about/page.tsx
  expertise/page.tsx
  experience/page.tsx
  insights/page.tsx
  contact/page.tsx + ContactForm.tsx   (simulated submit only, no real network call)
  privacy/page.tsx
  terms/page.tsx
  _components/            Header, Footer, Reveal, CountUp, DonutChart,
                           HeroPhoto, HeroStatCards, CredentialsRow
  _data/content.ts         Single source of truth for ALL copy & numbers
```

## Editing content
Everything text/number-related — the hero heading, stats, services,
experience case studies, testimonials, insights, bio — lives in
`_data/content.ts`. Change it there; no other file hardcodes copy.

## Editing colors / design tokens
All CSS variables are defined once, at the top of `portfolio.css` inside
`.p2-scope`:
- `--p2-bg` / `--p2-bg-alt` — base background (soft white / warm gray)
- `--p2-navy` / `--p2-navy-2` — deep navy used for headings & solid buttons
- `--p2-gold` / `--p2-gold-soft` / `--p2-gold-tint` — refined gold/bronze accent
- `--p2-text` / `--p2-muted` / `--p2-muted-2` — text hierarchy
- `--p2-border` / `--p2-border-strong` — hairline borders on cards/inputs
- `--p2-shadow` / `--p2-shadow-sm` — the soft shadows behind glass/white cards

Fonts are set in `fonts.ts` (swap the Google Font names there — no other
file needs to change).

## Hero photo — required asset
The hero background photo referenced by
`app/project-2/_components/HeroPhoto.tsx` must be placed at:

```
public/project-2/hero-finance.jpg
```

**Exact spec, to match the reference layout 1:1:**
- Wide/landscape frame (hero is full-bleed, not a portrait crop) — an
  image around **2400×1500px or wider** works well.
- Soft daylight, bright/airy exposure — cream, white, and soft gold tones,
  not moody or dark.
- Riyadh skyline visible through floor-to-ceiling glass, with the Kingdom
  Centre Tower ("the Kingdom Tower", the one with the top opening) clearly
  recognizable somewhere in the mid-to-left/mid area of the frame.
- Man in a navy/dark-blue suit, white shirt, **no tie**, hands in pockets,
  confident three-quarter pose, looking slightly off-camera — positioned
  **right-of-center to center-right** in the frame (roughly the right 40%
  of the image), so he sits behind/beside the glass stat cards and doesn't
  collide with the headline text on the left.
- Leave visual breathing room on the **left third** of the image — that's
  where the heading, paragraph, and CTAs sit on top of the photo. Busy
  detail there will fight with the text even with the scrim gradient.

If this file isn't present yet, `HeroPhoto.tsx` fails silently into a
clean CSS gradient fallback (soft cream + a faint gold glow) — the hero
still renders correctly, just without the photo, so the build never
breaks while you're sourcing/generating the real image.

Once you add the real photo, no code changes are needed — it's picked up
automatically at `/project-2/hero-finance.jpg`.

## What's intentionally different from Project-1
No blueprint grid, no brass corner brackets, no crosshairs, no mono
project codes, no dark base. Instead: light base, glassmorphic cards
(`.p2-glass`), soft-shadow white cards (`.p2-card`), pill buttons, serif
display headings, and restrained fade-up motion only.
