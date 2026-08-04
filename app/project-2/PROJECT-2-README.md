# Project-2 — Senior Finance Executive Demo Portfolio

**Live route:** `/project-2` (linked from the Finance professional card
on `/careers`, plus a self-referential "Admin Panel" link in its own
navbar)
**Status:** Fully self-contained demo portfolio, isolated from Project-1
and the main site. `robots: { index: false, follow: false }`.
**Persona:** Khalid Al-Mansour — a fictional Senior Finance Executive
based in Riyadh, Saudi Arabia. Built purely as a design/engineering
showcase; not a real person.

---

## 1. What this project demonstrates

This route exists to show a prospective client two things at once:

1. **A completely different visual product** can be built inside the
   same codebase as Project-1, sharing the framework and tooling but
   *zero* design DNA — no shared components, CSS variables, fonts, or
   visual motifs.
2. **A lightweight client-editable admin panel** can sit behind any demo
   site, giving a non-technical client a way to tweak copy and toggle
   sections on/off without touching code — see [§6](#6-admin-panel).

---

## 2. Tech stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | ^15.0.0 |
| UI library | React | ^19.0.0 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS (utility classes) + a hand-written scoped CSS file for design tokens/components | ^3.4.0 |
| Animation | Framer Motion | ^11.0.0 |
| Icons | lucide-react | ^0.400.0 |
| Fonts | `next/font/google` — Playfair Display, Instrument Serif, Inter | — |
| State/persistence | React Context + `localStorage` (client-only, no backend) | — |

No packages were added beyond what already existed in the repo's
`package.json` — everything above was already available before
Project-2 was built.

---

## 3. Folder structure

```
app/project-2/
├── layout.tsx                 Root layout: fonts, global CSS import, wraps
│                               the tree in <SiteSettingsProvider>, renders
│                               <Header> and <Footer> around every page
├── fonts.ts                    next/font/google definitions (own CSS vars,
│                               namespaced --p2-font-*, no overlap with p1-*)
├── portfolio.css               Every design token and component style,
│                               fully scoped under .p2-scope
├── page.tsx                    Home: hero, stats strip, experience
│                               highlights, services teaser, testimonial,
│                               final CTA — all client-side, reads
│                               SiteSettingsContext for copy + visibility
├── error.tsx / loading.tsx / not-found.tsx   Route-level UI states
│
├── about/page.tsx               Bio, credentials, philosophy
├── expertise/page.tsx           Six core capability cards
├── experience/page.tsx          Case studies with metrics
├── insights/page.tsx            Thought-leadership cards
├── contact/
│   ├── page.tsx                 Server component (keeps `metadata` export)
│   ├── ContactInfo.tsx           Client subcomponent — reads contact
│   │                             show/hide + values from settings
│   └── ContactForm.tsx           Simulated submit only, no network call
├── privacy/page.tsx & terms/page.tsx   Static legal pages
│
├── admin/                       See §6
│   ├── page.tsx                  Server entry (metadata + noindex)
│   ├── AdminGate.tsx              Access-code gate (client)
│   ├── AdminDashboard.tsx         The editor itself (client)
│   └── _components/               Switch.tsx, Field.tsx, AdminSection.tsx
│
├── _components/                 Header, Footer, Reveal (scroll-in
│                                 animation), CountUp (animated numbers),
│                                 DonutChart, HeroPhoto, HeroStatCards,
│                                 CredentialsRow
├── _context/
│   └── SiteSettingsContext.tsx   See §6
└── _data/
    ├── content.ts                Static content: nav structure, services,
    │                             experience/case-study data, testimonials,
    │                             insights posts, about bio — the things a
    │                             client would ask a developer to edit,
    │                             not something they'd toggle live
    └── adminDefaults.ts          Default values + shape (SiteSettings type)
                                  for everything the admin panel *can* edit

public/project-2/
└── hero-finance.jpg             Hero background photo (skyline + portrait)
```

**Why two content sources (`content.ts` vs `adminDefaults.ts`)?**
`content.ts` holds structural/list content (services, case studies,
testimonials, nav links) that a developer edits in code — it doesn't
change per "client demo." `adminDefaults.ts` holds the smaller set of
fields a *non-technical* person would plausibly want to tweak live
(hero headline, contact info, which sections/cards are visible) — that's
what the admin panel exposes.

---

## 4. Design system

Everything lives under a single scope class, `.p2-scope`, applied once
in `layout.tsx`. All colors, spacing, and component styles are CSS
custom properties defined there — nothing here shares a class name,
variable, or font with Project-1 (`.p1-scope`) or the main site.

| Token | Value | Use |
|---|---|---|
| `--p2-bg` | `#f8f7f4` | Page background |
| `--p2-navy` | `#12213f` | Headings, solid buttons, primary text accents |
| `--p2-gold` | `#c9a227` | Accent color — eyebrows, highlighted word in the hero heading, icons |
| `--p2-text` / `--p2-muted` / `--p2-muted-2` | charcoal → gray scale | Text hierarchy |
| `--p2-glass`, `.p2-glass` | `rgba(255,255,255,.6–.78)` + `backdrop-filter: blur` | The floating hero stat cards |
| `--p2-shadow` / `--p2-shadow-sm` | soft navy-tinted shadows | Cards |

Fonts: **Playfair Display** (large display headings), **Instrument
Serif** (italic accent — quotes, logo mark), **Inter** (body text).

Motion: a single restrained pattern — fade + 16–22px rise on scroll
into view (`Reveal.tsx`, powered by Framer Motion's `whileInView`), plus
a CSS keyframe fade-up for above-the-fold hero elements. Everything
respects `prefers-reduced-motion: reduce` (motion is disabled entirely,
not just shortened).

---

## 5. The hero section

The hero is a full-bleed background photo (`public/project-2/hero-finance.jpg`)
with a layered scrim on top for text legibility:

1. A horizontal fade (opaque → transparent) so the headline/paragraph
   column on the left stays fully readable over the photo.
2. A vertical fade at the very bottom so the hero blends into the next
   section rather than ending on a hard edge.
3. A small radial glow positioned behind the floating stat-card column
   (top-right) as a legibility safety net, independent of exactly how
   any future replacement photo is framed.

If the photo file is ever missing, `HeroPhoto.tsx` fails silently into
a CSS gradient fallback (soft cream + faint gold glow) — the section
never breaks the build or shows a broken-image icon.

The four floating cards (Revenue Growth, EBITDA Performance, Budget
Performance donut, Strategic Focus Areas) are independent components —
`DonutChart.tsx` is a small hand-rolled animated SVG ring (no charting
library needed for a single ring), and the bar/line visuals in the
other two cards are plain inline SVG/divs, not a charting dependency.

---

## 6. Admin panel

**Route:** `/project-2/admin` — reachable via the **"ADMIN PANEL"** badge
in the navbar (both desktop and mobile), and a smaller link in the
footer bottom bar.
**Access code:** `project2` (constant `ADMIN_PIN` in `admin/AdminGate.tsx`)

> This is **not real authentication** — there's no backend, no user
> accounts, no server-side check. It's a soft gate appropriate for a
> demo link shared with a client, not a production auth system. Anyone
> with basic dev-tools access could bypass it. Change or remove the PIN
> constant before this goes anywhere more public than a client demo.

### What it can do
- **Toggle visibility** of: each nav link, each of the 4 hero stat
  cards, the credentials row, and every homepage section (stats strip,
  experience highlights, services teaser, testimonial, final CTA).
- **Edit text**: hero eyebrow, 3-line heading + a designated gold accent
  word, hero paragraph, both hero CTA button labels, the header's
  connect-button label, contact email/phone/address (+ their individual
  show/hide switches), and the footer blurb.
- **Autosave**: every change is written to `localStorage` ~500ms after
  the person stops editing (debounced) — no explicit "Save" button
  required, though the top bar shows a live "Saving… / Saved ✓" status.
- **Export / Import JSON**: since there's no database, settings are
  scoped to one browser. Export produces a downloadable
  `project-2-settings.json`; Import re-applies a previously exported
  file. This is the mechanism for moving a configured demo between
  browsers, devices, or handing a "starting point" to someone else.
- **Reset**: restores every field/toggle to the hardcoded defaults in
  `_data/adminDefaults.ts` and clears the saved `localStorage` entry.

### How it works under the hood
`_context/SiteSettingsContext.tsx` defines a `SiteSettingsProvider`
wrapped around the entire `/project-2` tree in `layout.tsx`. On the
server, and on first client render, it always returns
`defaultSettings` (so there's no hydration mismatch). Once mounted in
the browser, a `useEffect` reads `localStorage` and — if anything was
saved — merges it over the defaults (shallow-merged per section, so
adding a new field to `adminDefaults.ts` later can't break an older
saved configuration).

Any component that needs to read or reflect admin-edited state calls
`useSiteSettings()`. Currently that's: `Header`, `Footer`,
`HeroStatCards`, `CredentialsRow`, the home `page.tsx`, and
`contact/ContactInfo.tsx`. Server components that need a `metadata`
export (like `contact/page.tsx`) delegate the settings-aware part to a
small client subcomponent rather than becoming client components
themselves.

### Why localStorage and not a database
This is a static-content demo with no backend anywhere in this
Next.js app. `localStorage` gives real, working "the client can edit
this and see it reflected" behavior with zero infrastructure — which is
the right tradeoff for a demo. A production build of this pattern would
swap `SiteSettingsContext`'s read/write functions for API calls to a
real CMS/database; nothing about the component structure would need to
change, since every consumer only talks to `useSiteSettings()`, never
to `localStorage` directly.

---

## 7. Content editing (developer-level)

For anything **not** exposed in the admin panel — services list,
experience/case-study entries, testimonials, insights posts, nav
structure — edit `app/project-2/_data/content.ts` directly. It's the
single source of truth; no other file hardcodes copy.

Design tokens (colors, fonts) live at the top of `portfolio.css` and in
`fonts.ts` respectively — see the inline comments in each file.

---

## 8. Known limitations (by design, for a demo)

- **No real backend.** The contact form is simulated (validates, shows
  a success state, sends nothing). Admin settings are per-browser only.
- **Access code is not security.** See §6.
- **Hero photo is a single static asset.** No image CMS/upload flow —
  replacing it means replacing the file at
  `public/project-2/hero-finance.jpg`.
- **Fictional content throughout.** Person, employer names, and
  financial figures are illustrative, not real.

---

## 9. Isolation guarantees (matches Project-1's pattern)

- Own `layout.tsx`, `fonts.ts`, `portfolio.css` (scoped under
  `.p2-scope`), `_components/`, `_data/`.
- Zero shared CSS variables, class names, or font families with
  Project-1 (`.p1-scope`, `--p1-*`) or the main site.
- The only external touchpoint is a single line in
  `components/careers/CareersExamples.tsx` (`LIVE_LINKS[0] = '/project-2'`)
  that makes the Finance card on `/careers` clickable.
