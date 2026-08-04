# Project-3 Portfolio — "Noor Al-Kuwari"

**Status:** ✅ Complete, ready to drop into the repo
**Live path:** `makemystore.online/project-3` (or your domain + `/project-3`)
**Persona:** Noor Al-Kuwari — fictional Senior Brand & Marketing Strategist, Doha, Qatar
**Purpose:** Standalone demo portfolio site, third of 4 planned, shown as "Example 03 —
Marketing & brand" on the main site's `/careers` page.

This follows the exact same isolation pattern documented in `PROJECT-1-README.md` and
`project-2/README.md` — read those first if anything here is unclear, they go deeper on
the general mechanics (Next 15 async params, the `_components`/`_data` underscore-folder
gotcha, etc).

---

## 1. How this connects to the main site

Lives inside the existing Next.js repo as a self-contained route folder: `app/project-3/`.
It shares **zero** components, CSS variables, or fonts with Project-1 (blueprint/industrial)
or Project-2 (navy/gold finance glass).

**The only file changed outside `app/project-3/`** is:

```
components/careers/CareersExamples.tsx
```

`LIVE_LINKS` was updated from `['/project-2', '/project-1', '', '']` to
`['/project-2', '/project-1', '/project-3', '']` — the **3rd card** ("Marketing & brand")
now links to `/project-3`. Card 4 (Healthcare specialist) is still a placeholder.

Deleting `app/project-3/` and reverting that one line would cleanly remove it with zero
side effects elsewhere.

---

## 2. Tech stack (same as main site, no new dependencies)

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS + one scoped stylesheet (`portfolio.css`)
- Framer Motion (`Reveal.tsx`)
- `next/font/google` — **Fraunces** (display serif), **Manrope** (body), **Amiri**
  (Arabic calligraphic accent for the persona's Arabic name)
- `lucide-react` icons
- No new npm packages added. No database, no real backend, no real auth — same demo
  constraints as project-1/2 (see §6).

---

## 3. Design system — "editorial brand-studio" identity

Deliberately unlike both prior demos: no blueprint grid or brass brackets (project-1), no
navy/gold glassmorphism (project-2). This one reads like a page out of Noor's own brand
guideline deck — warm ivory paper, oxblood + brass accents, hairline "plate" cards with
corner ticks, and a faint geometric line-lattice backdrop instead of any stock photography.

| Token | Value | Used for |
|---|---|---|
| `--p3-bg` / `--p3-bg-alt` | `#f9f4ea` / `#f1e6d2` | page background (warm ivory / sand) |
| `--p3-panel` | `#fffdf9` | card backgrounds |
| `--p3-wine` / `--p3-wine-2` | `#7c1f2e` / `#641622` | primary accent — buttons, links, headline accent word |
| `--p3-gold` / `--p3-gold-soft` | `#b98a4e` / `#d9b787` | secondary accent — labels, borders, plate corner ticks |
| `--p3-ink` / `--p3-text` / `--p3-muted` / `--p3-muted-2` | text hierarchy, warm near-black to soft clay |
| `--p3-border` / `--p3-border-strong` | translucent ink | hairline borders |

**Fonts:**
- **Fraunces** (`.p3-display`) — headings, editorial-serif feel with italic weight for the hero
- **Manrope** — body text
- **Amiri** (`.p3-arabic-font`) — used only for the Arabic wordmark accents (Noor's name in
  Arabic script, نور الكواري), loaded with the `arabic` subset

**Signature motifs** (all in `portfolio.css`):
- `.p3-arabesque` — a faint 45°-crosshatch geometric lattice used as a hero/CTA backdrop,
  pure CSS gradients, no image asset
- `.p3-plate` — the "brand guideline page" card: hairline gold border + tiny corner ticks
- **No personal photo anywhere on the site.** Instead of a headshot placeholder that could
  break or look generic, the hero uses two purpose-built components:
  - **`ArabicMonogram.tsx`** — an oxblood plate with Noor's name in Amiri calligraphy in
    brass, standing in as her signature brand mark
  - **`HeroBrandBoard.tsx`** — a stack of glass cards showing her *own* signature color
    palette, a campaigns-launched counter with sparkline, an audience-growth donut, and a
    core-disciplines list — i.e., the hero doubles as a live example of her design work
  - **`WorkPlate.tsx`** — every campaign card on `/work` renders a generated color-field
    from that campaign's own 3-color palette (defined in `_data/content.ts`) instead of a
    photo — same idea, applied to the case-study grid
- `.p3-swatch` — small rounded color-chip element used throughout (palette rows, plates)

To restyle in future, **everything lives in `app/project-3/portfolio.css`** under the
`.p3-scope` class.

---

## 4. Full file structure

```
app/project-3/
├── layout.tsx                  # Fonts + portfolio.css + SiteSettingsProvider + Header/Footer
├── page.tsx                    # Homepage
├── fonts.ts                    # Fraunces, Manrope, Amiri
├── portfolio.css               # ALL custom CSS, scoped to .p3-scope
├── loading.tsx / error.tsx / not-found.tsx
│
├── _components/
│   ├── Header.tsx / Footer.tsx
│   ├── Reveal.tsx               # Scroll-reveal wrapper
│   ├── CountUp.tsx / DonutChart.tsx
│   ├── ArabicMonogram.tsx       # Arabic-name brand-mark plate (hero)
│   ├── HeroBrandBoard.tsx       # Stack of hero stat/palette cards
│   ├── CredentialsRow.tsx
│   └── WorkPlate.tsx            # Palette-generated campaign card visual
│
├── _data/
│   ├── content.ts               # ⭐ SINGLE SOURCE OF TRUTH: profile, nav, hero, stats,
│   │                             #    services, work (case studies), testimonials, journal, about
│   └── adminDefaults.ts         # Default values for every admin-editable field
│
├── _context/
│   └── SiteSettingsContext.tsx  # localStorage-backed settings provider (admin panel state)
│
├── about/page.tsx               # /project-3/about
├── services/page.tsx            # /project-3/services
├── journal/page.tsx             # /project-3/journal — thought-leadership posts (like a blog index)
│
├── work/
│   ├── page.tsx                 # /project-3/work — grid, wraps WorkBrowser
│   ├── WorkBrowser.tsx          # Client component: search + category filter
│   └── [slug]/page.tsx          # /project-3/work/<slug> — case-study detail page
│
├── contact/
│   ├── page.tsx / ContactForm.tsx / ContactInfo.tsx   # Simulated submit only, no real network call
│
├── privacy/page.tsx / terms/page.tsx
│
└── admin/                       # Client-editable content & visibility panel (PIN-gated demo)
    ├── page.tsx
    ├── AdminGate.tsx             # PIN screen — code is "project3", pre-filled on the input
    ├── AdminDashboard.tsx        # Autosaving editor: nav, hero copy, hero cards, homepage
    │                             #   sections, contact details, footer — export/import JSON
    └── _components/
        ├── AdminSection.tsx / Field.tsx / Switch.tsx
```

No `public/project-3/` assets are required — the hero and work-grid visuals are fully
code-generated (palette-driven plates), so there's no photo to source, upload, or worry
about breaking.

---

## 5. Page-by-page summary

| Route | What it does |
|---|---|
| `/project-3` | Hero (Arabic monogram + brand-board stat cards), stats strip, 3 featured campaigns, services teaser, 1 testimonial, CTA |
| `/project-3/about` | Bio, credentials, philosophy quote |
| `/project-3/services` | 6 services (brand strategy, identity systems, campaign direction, GCC market entry, content strategy, workshops) |
| `/project-3/work` | All 6 campaigns, with live search + category filter (client-side) |
| `/project-3/work/[slug]` | Full case study: brief, engagement narrative, outcome metrics, palette, next case study |
| `/project-3/journal` | 3 thought-leadership posts (index only — no full article pages, same scope as project-2's Insights) |
| `/project-3/contact` | Contact form — client-side validation, simulated "Sending…" then success screen. **Nothing is actually emailed.** |
| `/project-3/privacy` / `/terms` | Static legal copy |
| `/project-3/admin` | PIN-gated (`project3`) live content editor — toggle nav links/homepage sections, edit hero copy and contact details, export/import settings as JSON |

---

## 6. Important: this is a demo, not a real backend

Same constraints as project-1 and project-2, by original brief:
- The contact form does not send an email — simulated delay, then a success message.
- The **admin panel is not real authentication** — `admin/AdminGate.tsx` checks a
  hardcoded PIN (`project3`, pre-filled on the input) and stores an unlock flag in
  `sessionStorage`. Anyone with the code — or who just clicks "skip straight in" — gets in.
  It exists to demonstrate a client-editable CMS-lite experience, not to gate real content.
- Admin edits are saved to **`localStorage`, per-browser only** (key `p3_admin_settings_v1`)
  via `SiteSettingsContext`. There's no database — use the **Export JSON** / **Import JSON**
  buttons in the admin panel to move settings between browsers/devices, or to back them up.
- All work/campaigns, clients, quotes, and figures in `_data/content.ts` are fictional —
  marked `(fictional)` throughout — created for demo purposes only.

If a real client wants this converted into a working site (real form submissions, real
admin auth, a real CMS/database backing the content editor), that's a separate follow-up
scope — e.g. Resend/SendGrid for the form, NextAuth + a real database for the admin panel.

---

## 7. How to edit content (no code changes needed for most updates)

**To change any text — hero, stats, services, work/case studies, testimonials, journal, bio:**
Edit `app/project-3/_data/content.ts` only.

**To add a new campaign/case study:**
Add a new object to the `work` array in `content.ts` with a unique `slug` and a 3-color
`palette`. A detail page at `/project-3/work/<slug>` is generated automatically.

**To change colors/fonts:**
Edit the CSS variables at the top of `app/project-3/portfolio.css`, or swap the Google
Font names in `app/project-3/fonts.ts` (keep the `variable` names the same).

**To change what's editable live (client-facing demo of the admin panel):**
Everything the admin panel controls is defined in `app/project-3/_data/adminDefaults.ts`
(the `SiteSettings` interface + `defaultSettings`). Add a new field there, wire it into
`AdminDashboard.tsx`, and read it wherever it should apply via `useSiteSettings()`.

---

## 8. Known gotchas / deployment notes (same as project-1/2 — read those READMEs too)

1. **`_components`/`_data`/`_context` leading underscores must survive upload.** GitHub's
   web uploader has been known to drop leading underscores — prefer `git push` from a local
   clone or GitHub Desktop.
2. **Next.js 15 async route params.** `app/project-3/work/[slug]/page.tsx` uses
   `params: Promise<{ slug: string }>` + `await params` — required on Next 15.
3. **Google Fonts must be reachable at build time** (`next/font/google` downloads at
   `next build`). Not a bug if a sandboxed build environment has no internet — works fine
   on Vercel or any normal host.
4. **This route is intentionally excluded from the main nav** and set to
   `robots: { index: false, follow: false }` in `layout.tsx`.
5. **Admin PIN doesn't gate anything real** — see §6. Don't rely on it for actual content
   security if this is ever turned into a real product.

---

## 9. Pattern for building portfolio 4

One category left per the original `/careers` mapping: **Healthcare specialist**. Follow
the same shape as project-1/2/3:
- its own `fonts.ts`, `portfolio.css` (new scope class, e.g. `.p4-scope`), new palette
- its own `_components/` and `_data/` — never share components or data between portfolios
- its own persona, industry, and visual identity — no two should look related
- one new line added to `LIVE_LINKS` in `components/careers/CareersExamples.tsx`
  (`LIVE_LINKS[3] = '/project-4'`)

---

## 10. Quick reference — if something breaks

| Symptom | Likely cause | Fix |
|---|---|---|
| `Module not found: Can't resolve '../_components/...'` | `_components`/`_data`/`_context` missing/misnamed on GitHub | Check folder names exactly match (leading underscore included) |
| `Type '{ params: ... }' does not satisfy the constraint 'PageProps'` | Old-style synchronous `params` in `work/[slug]/page.tsx` | Use `params: Promise<{ slug: string }>` + `await params` |
| Build fails only with "Failed to fetch font" | No internet access in the build sandbox | Not a real bug — works on Vercel/any host with internet |
| Admin panel doesn't unlock | Wrong PIN | Use exactly `project3` (pre-filled on the input), or the "skip straight in" link |
| Card on `/careers` doesn't link anywhere | `LIVE_LINKS` in `CareersExamples.tsx` has `''` for that index | Fill in the route once that portfolio is built |

---

*Created alongside project-1 and project-2 as the third of four planned demo portfolios.
Update this file whenever you change the structure described above.*
