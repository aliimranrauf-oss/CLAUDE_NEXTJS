# Project-4 Portfolio — "Dr. Sara Al Naqbi"

**Status:** ✅ Complete, ready to drop into the repo
**Live path:** `makemystore.online/project-4` (or your domain + `/project-4`)
**Persona:** Dr. Sara Al Naqbi — fictional Consultant Dermatologist &amp; Aesthetic
Medicine specialist, Dubai, UAE
**Purpose:** Standalone demo portfolio site, fourth of 4 planned, shown as "Example 04 —
Healthcare specialist" on the main site's `/careers` page.

This follows the exact same isolation pattern documented in `PROJECT-1-README.md`,
`project-2/README.md`, and `project-3/PROJECT-3-README.md` — read those first if
anything here is unclear.

---

## 1. How this connects to the main site

Lives inside the existing Next.js repo as a self-contained route folder: `app/project-4/`.
It shares **zero** components, CSS variables, or fonts with Project-1 (blueprint/industrial),
Project-2 (navy/gold finance glass), or Project-3 (ivory/oxblood editorial brand-studio).

**The only file changed outside `app/project-4/`** is:

```
components/careers/CareersExamples.tsx
```

`LIVE_LINKS` was updated from `['/project-2', '/project-1', '/project-3', '']` to
`['/project-2', '/project-1', '/project-3', '/project-4']` — the **4th card**
("Healthcare specialist") now links to `/project-4`.

Deleting `app/project-4/` and reverting that one line would cleanly remove it with zero
side effects elsewhere.

---

## 2. Tech stack (same as main site, no new dependencies)

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS + one scoped stylesheet (`portfolio.css`)
- Framer Motion (`Reveal.tsx`)
- `next/font/google` — **Newsreader** (display serif), **Plus Jakarta Sans** (body),
  **Reem Kufi** (Arabic accent for the persona's Arabic name)
- `lucide-react` icons
- No new npm packages added. No database, no real backend, no real auth — same demo
  constraints as project-1/2/3 (see §6).

---

## 3. Design system — "Clinical Luxe" identity

Deliberately unlike all three prior demos: no blueprint grid (project-1), no navy/gold
glass (project-2), no ivory/oxblood editorial plates (project-3). This one reads like a
premium Dubai wellness clinic — warm porcelain white, deep sage green, and a soft
terracotta/clay accent, with soft blurred organic gradient blobs instead of a hard grid.

| Token | Value | Used for |
|---|---|---|
| `--p4-bg` / `--p4-bg-alt` | `#faf8f3` / `#f1efe4` | page background (porcelain / warm sand) |
| `--p4-panel` | `#ffffff` | card backgrounds |
| `--p4-sage` / `--p4-sage-2` | `#52654c` / `#3c4b37` | primary accent — buttons, headings |
| `--p4-clay` / `--p4-clay-soft` | `#c17f4f` / `#e0ac7c` | secondary accent — eyebrows, CTAs, highlights |
| `--p4-ink` / `--p4-text` / `--p4-muted` / `--p4-muted-2` | text hierarchy |
| `--p4-border` / `--p4-border-strong` | translucent ink | hairline borders |

**Fonts:**
- **Newsreader** (`.p4-display`) — headings, a calm editorial/medical-journal serif with
  italic weight for the hero
- **Plus Jakarta Sans** — body text, the "clinic tech" workhorse font
- **Reem Kufi** (`.p4-arabic`) — used only for the Arabic-script rendering of the
  persona's name (د. سارة النقبي), a UAE-rooted brand touch (distinct from Project-3's Amiri)

**Signature motifs** (all in `portfolio.css`):
- `.p4-pulse` (`PulseLine.tsx`) — a thin ECG-style "pulse line" SVG divider used under
  every eyebrow label; the project's one recurring graphic signature, pure inline SVG
- `.p4-hero-blobs` — soft blurred sage/clay radial gradients behind the hero, replacing
  a hard grid or full-bleed skyline photo
- `.p4-portrait-frame` / `.p4-portrait-ring` — a rounded "clinical frame" card (not a
  full-bleed photo) for the hero portrait, with a hairline ring offset behind it
- `.p4-glass` — frosted glass stat cards in the hero (Patients Treated, Patient
  Satisfaction, Treatment Success Rate donut, Areas of Focus)
- `.p4-chip` — small rounded pill/chip element

To restyle in future, **everything lives in `app/project-4/portfolio.css`** under the
`.p4-scope` class.

---

## 4. Full file structure

```
app/project-4/
├── layout.tsx                  # Fonts + portfolio.css + SiteSettingsProvider + Header/Footer
├── page.tsx                    # Homepage
├── fonts.ts                    # Newsreader, Plus Jakarta Sans, Reem Kufi
├── portfolio.css               # ALL custom CSS, scoped to .p4-scope
├── loading.tsx / error.tsx / not-found.tsx
│
├── _components/
│   ├── Header.tsx / Footer.tsx
│   ├── Reveal.tsx / CountUp.tsx / DonutChart.tsx
│   ├── Portrait.tsx             # Hero portrait — rounded frame, graceful fallback
│   ├── PulseLine.tsx            # Signature ECG-style divider motif
│   ├── HeroStatCards.tsx        # Glass stat cards in the hero
│   └── CredentialsRow.tsx
│
├── _data/
│   ├── content.ts               # ⭐ SINGLE SOURCE OF TRUTH: profile, nav, hero, stats,
│   │                             #    services/treatments, experience, testimonials,
│   │                             #    journal (patient articles), about
│   └── adminDefaults.ts         # Default values for every admin-editable field
│
├── _context/
│   └── SiteSettingsContext.tsx  # localStorage-backed settings provider (admin panel state)
│
├── about/page.tsx               # /project-4/about
├── treatments/page.tsx          # /project-4/treatments — 6 services
├── experience/page.tsx          # /project-4/experience — clinical career timeline
├── journal/page.tsx             # /project-4/journal — patient-education articles (index only)
│
├── contact/
│   ├── page.tsx / ContactForm.tsx / ContactInfo.tsx   # Simulated submit only, no real network call
│
├── privacy/page.tsx / terms/page.tsx
│
└── admin/                       # Client-editable content & visibility panel (PIN-gated demo)
    ├── page.tsx
    ├── AdminGate.tsx             # PIN screen — code is "project4", pre-filled on the input
    ├── AdminDashboard.tsx        # Autosaving editor: nav, hero copy, hero cards, homepage
    │                             #   sections, contact details, footer — export/import JSON
    └── _components/
        ├── AdminSection.tsx / Field.tsx / Switch.tsx
```

`public/project-4/` needs exactly **one** image added by you (see §5).

---

## 5. The hero image — what to upload and where

Unlike Project-3, this portfolio uses a real hero photo (per your request). The code
expects it at:

```
public/project-4/hero-doctor.jpg
```

If the file isn't there yet, the hero gracefully falls back to a soft sage placeholder
card with a stethoscope icon — the page never looks broken, so you can deploy first and
drop the image in whenever it's ready.

### AI image prompt (text-to-image)

Use this prompt with your image generator of choice:

> Professional editorial portrait of a confident Middle Eastern female dermatologist in
> her late 30s, warm brown eyes, soft natural makeup, wearing a crisp white medical coat
> over a tailored blush or sage-green blouse, arms relaxed, gentle approachable smile,
> standing in a bright modern dermatology clinic with soft sage-green and cream tones,
> large window with soft natural daylight, shallow depth of field, background softly
> blurred with hints of clinical equipment, shot on a portrait lens, warm and trustworthy
> mood, high-end editorial healthcare photography style, vertical 4:5 composition,
> photorealistic, no text, no logos.

Recommended size: at least **1000×1250px** (4:5 portrait), saved as `hero-doctor.jpg` and
placed in `public/project-4/`.

---

## 6. Page-by-page summary

| Route | What it does |
|---|---|
| `/project-4` | Hero (portrait + glass stat cards), stats strip, 3 featured experience highlights, treatments teaser, 1 testimonial, CTA |
| `/project-4/about` | Bio, credentials, philosophy quote |
| `/project-4/treatments` | 6 treatments (medical dermatology, aesthetic/anti-aging, laser &amp; light therapy, skin cancer screening, bridal/pre-event skin prep, pediatric dermatology) |
| `/project-4/experience` | Full clinical career timeline — 4 roles from fellowship to lead consultant |
| `/project-4/journal` | 3 patient-education articles (index only — no full article pages, same scope as project-3's Journal) |
| `/project-4/contact` | Contact/appointment-request form — client-side validation, simulated "Sending…" then success screen. **Nothing is actually emailed.** |
| `/project-4/privacy` / `/terms` | Static legal copy (with a medical-advice disclaimer on Terms) |
| `/project-4/admin` | PIN-gated (`project4`) live content editor — toggle nav links/homepage sections, edit hero copy and contact details, export/import settings as JSON |

---

## 7. Important: this is a demo, not a real backend

Same constraints as project-1/2/3, by original brief:
- The contact form does not send an email or book a real appointment — simulated delay,
  then a success message.
- The **admin panel is not real authentication** — `admin/AdminGate.tsx` checks a
  hardcoded PIN (`project4`, pre-filled on the input) and stores an unlock flag in
  `sessionStorage`. Anyone with the code — or who just clicks "skip straight in" — gets in.
  It exists to demonstrate a client-editable CMS-lite experience, not to gate real content.
- Admin edits are saved to **`localStorage`, per-browser only** (key `p4_admin_settings_v1`)
  via `SiteSettingsContext`. There's no database — use the **Export JSON** / **Import JSON**
  buttons in the admin panel to move settings between browsers/devices, or to back them up.
- All patients, quotes, credentials, and figures in `_data/content.ts` are fictional —
  created for demo purposes only. The Terms page includes a "not medical advice"
  disclaimer for this exact reason.

If a real clinician wants this converted into a working site (real appointment booking,
real admin auth, a real CMS/database, HIPAA/DHA-compliant patient data handling), that's a
separate follow-up scope.

---

## 8. How to edit content (no code changes needed for most updates)

**To change any text — hero, stats, treatments, experience, testimonials, journal, bio:**
Edit `app/project-4/_data/content.ts` only.

**To add a new treatment:**
Add a new object to the `services` array in `content.ts` with a unique `code`.

**To add a new experience entry:**
Add a new object to the `experience` array with a unique `slug`, `year`, `category`,
`title`, `org`, `summary`, and `metrics`.

**To change colors/fonts:**
Edit the CSS variables at the top of `app/project-4/portfolio.css`, or swap the Google
Font names in `app/project-4/fonts.ts` (keep the `variable` names the same).

**To change what's editable live (client-facing demo of the admin panel):**
Everything the admin panel controls is defined in `app/project-4/_data/adminDefaults.ts`
(the `SiteSettings` interface + `defaultSettings`). Add a new field there, wire it into
`AdminDashboard.tsx`, and read it wherever it should apply via `useSiteSettings()`.

---

## 9. Known gotchas / deployment notes (same as project-1/2/3 — read those READMEs too)

1. **`_components`/`_data`/`_context` leading underscores must survive upload.** GitHub's
   web uploader has been known to drop leading underscores — prefer `git push` from a local
   clone or GitHub Desktop.
2. **Google Fonts must be reachable at build time** (`next/font/google` downloads at
   `next build`). Confirmed: this repo's build fails in a sandboxed, no-internet build
   environment for ALL projects' fonts (not specific to project-4) — works fine on Vercel
   or any normal host with internet access.
3. **This route is intentionally excluded from the main nav** and set to
   `robots: { index: false, follow: false }` in `layout.tsx`.
4. **Admin PIN doesn't gate anything real** — see §7. Don't rely on it for actual content
   security if this is ever turned into a real product.
5. **Hero image is optional at deploy time** — see §5. The hero renders a clean fallback
   card if `public/project-4/hero-doctor.jpg` is missing, so you can ship the code first.

---

## 10. Quick reference — if something breaks

| Symptom | Likely cause | Fix |
|---|---|---|
| `Module not found: Can't resolve '../_components/...'` | `_components`/`_data`/`_context` missing/misnamed on GitHub | Check folder names exactly match (leading underscore included) |
| Build fails only with "Failed to fetch font" | No internet access in the build sandbox | Not a real bug — works on Vercel/any host with internet |
| Admin panel doesn't unlock | Wrong PIN | Use exactly `project4` (pre-filled on the input), or the "skip straight in" link |
| Card on `/careers` doesn't link anywhere | `LIVE_LINKS` in `CareersExamples.tsx` has `''` for that index | Already fixed for index 3 — confirm the file was actually replaced |
| Hero shows a plain sage card with a stethoscope icon instead of a photo | `hero-doctor.jpg` not yet uploaded to `public/project-4/` | Generate the image with the prompt in §5 and upload it there |

---

*Created as the fourth and final planned demo portfolio (project-1 through project-4).
Update this file whenever you change the structure described above.*
