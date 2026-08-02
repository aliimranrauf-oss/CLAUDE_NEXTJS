# Project-1 Portfolio — "Ahmed Al Mansoori"

**Status:** ✅ Complete and deployed
**Live path:** `makemystore.online/project-1` (or your domain + `/project-1`)
**Persona:** Ahmed Al Mansoori — fictional Senior Infrastructure & Program Director, Abu Dhabi
**Purpose:** Standalone demo portfolio site, one of 4 planned, shown as "Example 02 — Engineer / technical" on the main site's `/careers` page.

This file explains what this project is, how it's built, how it connects to your main
site, and how to extend the same pattern for portfolios 2–4. Keep this file updated
whenever you or a developer changes something structural.

---

## 1. How this connects to the main site

This is **not** a separate app — it lives inside your existing Next.js repo
(`CLAUDE_NEXTJS`), as a self-contained route folder: `app/project-1/`.

Because Next.js's App Router treats every top-level folder under `app/` as an
independent route tree, `project-1` gets:
- its own layout, fonts, CSS, and metadata (nothing bleeds in from the main site)
- its own header/footer/navigation
- its own `<title>` and SEO metadata (currently set to `robots: noindex` since it's a demo)

**The only file changed outside `app/project-1/`** is:

```
components/careers/CareersExamples.tsx
```

That's the component that renders the 4 example cards on `/careers`. It was edited to:
1. Add a `LIVE_LINKS` array mapping each of the 4 cards to a route (or `''` if not built yet).
2. Currently: `LIVE_LINKS = ['', '/project-1', '', '']` — meaning the **2nd card**
   ("Engineer / technical") links to `/project-1`, opening in a new tab, with a small
   "Live demo" badge. Cards 1, 3, 4 are placeholders until projects 2–4 are built.
3. When you build project-2/3/4, just fill in the matching index of `LIVE_LINKS`
   with `/project-2`, `/project-3`, `/project-4`.

**Nothing else on the main site references or depends on `project-1`.** It is fully
isolated — deleting `app/project-1/` and reverting that one line in
`CareersExamples.tsx` would cleanly remove it with zero side effects elsewhere.

---

## 2. Tech stack (same as main site, no new dependencies)

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS (utility classes) + one scoped custom stylesheet (`portfolio.css`)
- Framer Motion (`Reveal.tsx` component) — already a dependency of the main site
- `next/font/google` for fonts — auto-downloaded at build time, no manual font files
- No new npm packages were added. No database, no real backend, no real auth.

---

## 3. Design system — "structural blueprint" identity

Deliberately built to look nothing like the main site (which is cyan/violet SaaS-style).
This one reads like an engineering drawing set.

| Token | Value | Used for |
|---|---|---|
| `--p1-bg` | `#1b2430` (slate, brightened from original near-black) | page background |
| `--p1-panel` / `--p1-panel-alt` | `#232e3c` / `#2b3747` | card/section backgrounds |
| `--p1-brass` | `#e3ac52` | primary accent — buttons, links, headings, data highlights |
| `--p1-steel` | `#86bdd2` | secondary accent — category labels, structural motifs |
| `--p1-text` / `--p1-muted` / `--p1-muted-2` | `#f7f4ee` → `#b7bfcc` → `#8b95a5` | text hierarchy (brightened for readability) |
| `--p1-line` / `--p1-line-strong` | translucent off-white | hairline borders, blueprint grid |

> **Note:** this palette was brightened once already (original v1 was a much darker
> near-black `#0d1117` background with dimmer muted text `#8b92a0`). If you want it
> brighter/darker again, this is the only place to change — `app/project-1/portfolio.css`,
> top of the file.

**Fonts** (loaded in `fonts.ts`, all via `next/font/google`):
- **Space Grotesk** — `.p1-display` — headings, technical/geometric feel
- **Inter** — body text
- **IBM Plex Mono** — `.p1-mono` — data labels, project codes, coordinates, nav links

**Signature motifs** (all in `portfolio.css`):
- `.p1-grid` — faint background blueprint grid (CSS linear-gradients)
- `.p1-plate` — "drawing sheet" card style with an inset border, used for hero + about
- `.p1-crosshair` — center crosshair overlay, used on `ProjectPlate.tsx`
- Project codes like `PRJ-014`, sheet numbers like `DWG 001` — reinforce the technical-drawing feel throughout
- **`HeroPortrait.tsx`** (in `_components/`) — a real photo of Ahmed, framed with brass
  corner brackets and a mono caption strip underneath, styled to look like a labeled
  drawing plate. Used on the homepage hero and again (cropped wider) on the About page.
  See §10 below for image specs. This replaced an earlier SVG-only "skyline drawing"
  version of the hero panel.

To restyle in future, **everything lives in `app/project-1/portfolio.css`** under the
`.p1-scope` class. Nothing here touches global Tailwind config or the main site's CSS.

---

## 4. Full file structure

```
app/project-1/
├── layout.tsx                  # Root layout for this site: loads fonts, wraps
│                                #   every page in Header + Footer + blueprint grid bg
├── page.tsx                    # Homepage
├── fonts.ts                    # next/font/google loaders (Space Grotesk, Inter, IBM Plex Mono)
├── portfolio.css               # ALL custom CSS for this portfolio (scoped to .p1-scope)
├── loading.tsx                 # Shown while any page in this route is loading
├── error.tsx                   # Shown if a page in this route throws an error
├── not-found.tsx               # Custom 404 for this route
│
├── _components/                # Private folder (the "_" prefix stops Next.js from
│   ├── Header.tsx               #   treating it as a route). Only used by project-1.
│   ├── Footer.tsx
│   ├── Reveal.tsx               # Framer Motion scroll-reveal wrapper, used everywhere
│   ├── ProjectPlate.tsx         # The CSS-pattern "drawing plate" project thumbnail
│   └── HeroPortrait.tsx         # Real photo panel w/ brass corner frame — used on
│                                 #   homepage hero + About page. See §10 for image specs.
│
├── _data/
│   └── content.ts               # ⭐ SINGLE SOURCE OF TRUTH for all text content:
│                                 #   projects, stats, timeline, certifications,
│                                 #   services, testimonials, contact info.
│                                 #   Edit THIS file to change any copy on the site.
│
├── about/page.tsx               # /project-1/about
├── services/page.tsx            # /project-1/services
│
├── projects/
│   ├── page.tsx                 # /project-1/projects (list, wraps ProjectsBrowser)
│   ├── ProjectsBrowser.tsx      # Client component: search + category filter logic
│   └── [slug]/page.tsx          # /project-1/projects/<slug> — dynamic project detail
│                                 #   pages, one per entry in _data/content.ts → projects[]
│
├── contact/
│   ├── page.tsx                 # /project-1/contact
│   └── ContactForm.tsx          # Client component: validates + simulates submit
│                                 #   (no real email is sent — by design, see §6)
│
├── privacy/page.tsx             # /project-1/privacy
├── terms/page.tsx               # /project-1/terms
│
└── portal/                      # "Client Portal" demo — a fake logged-in dashboard
    ├── page.tsx                 # /project-1/portal — login screen (demo credentials shown on screen)
    ├── auth.ts                  # Fake auth: checks a hardcoded demo email/password,
    │                             #   stores a session flag in localStorage. NOT real auth.
    ├── _data/portalData.ts      # Mock dashboard data: projects, messages, activity log
    └── dashboard/
        ├── layout.tsx           # Wraps DashboardShell
        ├── DashboardShell.tsx   # Client component: checks localStorage session, redirects
        │                         #   to /portal if not "logged in"; renders sidebar nav
        ├── page.tsx              # /project-1/portal/dashboard — overview
        ├── projects/page.tsx     # /project-1/portal/dashboard/projects — data table
        ├── messages/page.tsx     # /project-1/portal/dashboard/messages — inbox UI
        └── settings/page.tsx     # /project-1/portal/dashboard/settings — mock settings form

public/project-1/               # ⚠️ NOT inside app/ — this is under the repo's
└── hero-ahmed.jpg               #   root-level /public folder (alongside /public/careers
                                  #   etc). This is the actual portrait photo file, referenced
                                  #   by HeroPortrait.tsx as "/project-1/hero-ahmed.jpg".
                                  #   A neutral gradient placeholder ships here by default —
                                  #   replace this exact file/path with the real photo.
```

---

## 5. Page-by-page summary

| Route | What it does |
|---|---|
| `/project-1` | Hero, stats strip, 3 featured projects, services teaser, 1 testimonial, CTA |
| `/project-1/about` | Bio, capability matrix, career timeline, certifications — all from `content.ts` |
| `/project-1/services` | 4 services, "how an engagement runs" process steps, testimonials |
| `/project-1/projects` | All projects, with live search box + category filter buttons (client-side, no backend) |
| `/project-1/projects/[slug]` | Full case study: scope, narrative paragraphs, outcome metrics, links to next project |
| `/project-1/contact` | Contact form (name/email/org/type/message) — client-side validation, simulated "Sending…" then success screen. **Nothing is actually emailed anywhere.** |
| `/project-1/privacy` | Static legal copy |
| `/project-1/terms` | Static legal copy |
| `/project-1/portal` | Login screen. Demo credentials are shown directly on the page. |
| `/project-1/portal/dashboard` | Overview: active programs, progress bars, recent activity |
| `/project-1/portal/dashboard/projects` | Table of all programs with status/progress |
| `/project-1/portal/dashboard/messages` | Clickable inbox with mock message threads |
| `/project-1/portal/dashboard/settings` | Mock profile + notification settings, "Save" just shows a checkmark |

---

## 6. Important: this is a demo, not a real backend

By original design brief, **nothing here is wired to a real server**:
- The contact form does not send an email — it just shows a success message after a fake delay.
- The Client Portal "login" is not real authentication. It checks a hardcoded email/password
  pair in `portal/auth.ts` and stores a flag in the browser's `localStorage`. Anyone can see
  the credentials directly on the login page (`client@marfa-urban.demo` / `demo1234`).
- All dashboard data (projects, messages, activity) is hardcoded in `portal/_data/portalData.ts`.
- All case-study "clients," quotes, and figures in `_data/content.ts` are fictional —
  marked as `(fictional)` throughout — created for demo purposes only, per the original brief
  to avoid using any real names/companies/contact info.

**If a real client ever wants this converted into a working site** (real form submissions,
real login, a real CMS for content), that's a separate follow-up project — flag it and we can
scope that properly (e.g. Resend/SendGrid for the form, NextAuth for the portal, a headless
CMS or database for content).

---

## 7. How to edit content (no code changes needed for most updates)

**To change any text — projects, stats, testimonials, services, bio, timeline:**
Edit `app/project-1/_data/content.ts` only. It's one big TypeScript file of arrays/objects,
each with comments. Nothing else needs to change; pages read from this file automatically.

**To add a new project/case study:**
Add a new object to the `projects` array in `content.ts` with a unique `slug`. A detail page
at `/project-1/projects/<slug>` is generated automatically — no new files needed.

**To change colors/fonts:**
Edit the CSS variables at the top of `app/project-1/portfolio.css` (colors) or
`app/project-1/fonts.ts` (fonts — swap the Google Font name, keep the `variable` name the same).

**To change portal demo data:**
Edit `app/project-1/portal/_data/portalData.ts`.

---

## 7.5. The hero portrait image

**File location (important — this trips people up):**
```
public/project-1/hero-ahmed.jpg
```
This is **not** inside `app/project-1/`. Next.js only serves static files from one
special folder — `public/` — sitting at the **repo root**, next to `app/`, `components/`,
`package.json`, etc. There's no separate `public` folder inside `project-1`.

**Image specs:**
- Aspect ratio: **4:5 portrait** (recommended 1200×1500px) — this is the primary crop
  used in the homepage hero (`HeroPortrait.tsx`)
- The same file is reused on the About page, auto-cropped to a wider **16:10** — so keep
  the subject centered rather than close to the top/bottom edge, since both crops pull
  from the same image
- Format: JPG, filename must stay exactly `hero-ahmed.jpg` (or update the `src` prop
  passed into `HeroPortrait` in both `page.tsx` and `about/page.tsx` if you rename it)
- Keep file size under ~1MB before upload — Next.js optimizes it further automatically

**Persona direction used for the AI-generated portrait:** Gulf/Emirati man, late 30s–early
40s, traditional white dishdasha + white ghutra with black agal (matching the "Program &
Structural Delivery — Abu Dhabi, UAE" identity), warm confident expression, studio or
window-lit against a dark/neutral background so it doesn't compete with the brass caption
overlay.

A neutral gradient placeholder currently sits at that exact path so the layout doesn't
break before the real photo is added — just overwrite the file with the same name.

---

## 8. Known gotchas / deployment notes (learned the hard way — read this first)

1. **Folder names with a leading underscore (`_components`, `_data`) can get mangled if
   you upload files through GitHub's web "Add file → Upload files" button** — GitHub has
   sometimes dropped the underscore, creating `components`/`data` instead of
   `_components`/`_data`, which breaks every import (`Module not found`). **Always double-check
   folder names on GitHub match exactly**, including the leading underscore. Prefer `git push`
   from a local clone, or GitHub Desktop, over the web uploader when possible — it preserves
   paths reliably.
2. **Next.js 15 changed dynamic route params to be async.** `app/project-1/projects/[slug]/page.tsx`
   uses `params: Promise<{ slug: string }>` and `await params` — this is required on Next 15,
   don't revert it to the old synchronous style or the build will fail type-checking.
3. **Google Fonts must be reachable at build time.** `next/font/google` downloads font files
   during `next build`. If a build environment has no internet access (e.g. a sandboxed
   environment), the build will fail with "Failed to fetch font." This is *not* a code bug —
   it works fine on Vercel or any normal host with internet access.
4. **This route is intentionally excluded from the main nav.** `/project-1` and everything
   under it is only reachable via the direct URL or the card link on `/careers`. It is set to
   `robots: { index: false, follow: false }` in `layout.tsx` so search engines don't index it.
5. **The hero image goes in the root `public/` folder, not inside `app/project-1/`.**
   Correct path: `public/project-1/hero-ahmed.jpg`. A "public folder inside project-1" doesn't
   exist as a concept in Next.js — only the one at the repo root is ever served as static files.

---

## 9. Pattern for building portfolios 2, 3, and 4

Each future portfolio (`project-2`, `project-3`, `project-4`) should follow the **exact same
folder shape** as `project-1`, but with:
- its own `fonts.ts` (different Google Fonts)
- its own `portfolio.css` (different scope class, e.g. `.p2-scope`, different color variables)
- its own `_components/` and `_data/` — **never share components or data between portfolios**
- its own persona, industry, and visual identity — per the original brief, no two should
  look related or reuse design patterns
- one new line added to `LIVE_LINKS` in `components/careers/CareersExamples.tsx` to make its
  card clickable

Recommended mapping (based on the 4 example categories already on `/careers`):

| Card # | Category label | Portfolio | Status |
|---|---|---|---|
| 1 | Finance professional | *(not yet assigned)* | Not built |
| 2 | Engineer / technical | Ahmed Al Mansoori (`/project-1`) | ✅ Built |
| 3 | Marketing & brand | Sarah Al Suwaidi (`/project-2`) | ⏸️ Started, paused per request — not deployed |
| 4 | Healthcare specialist | *(not yet assigned — Khalid Al Nuaimi or Fatima Al Kaabi)* | Not built |

> Note: an earlier attempt at `project-2` (Sarah Al Suwaidi, brand strategist) was scaffolded
> and then deleted at your request so you could review `project-1` first. If you want to
> resume it, just say so — the content/design direction (deep teal + hot pink + gold, Fraunces/
> Work Sans/Space Mono, editorial brand-studio identity) can be rebuilt from scratch or referenced
> again in chat history.

---

## 10. Quick reference — if something breaks

| Symptom | Likely cause | Fix |
|---|---|---|
| `Module not found: Can't resolve '../_components/...'` | `_components` or `_data` folder missing/misnamed on GitHub | Check folder names exactly match (leading underscore included) |
| `Type '{ params: ... }' does not satisfy the constraint 'PageProps'` | Old-style synchronous `params` in a `[slug]` route | Use `params: Promise<{ slug: string }>` + `await params` (Next 15 requirement) |
| Build fails only with "Failed to fetch font" | No internet access in the build sandbox | Not a real bug — will succeed on Vercel/any host with internet |
| Portal login doesn't work | Wrong demo credentials | Use exactly `client@marfa-urban.demo` / `demo1234` (shown on the login page itself) |
| Card on `/careers` doesn't link anywhere | `LIVE_LINKS` array in `CareersExamples.tsx` has `''` for that index | Fill in the route once that portfolio is built |

---

*Last updated: when `project-1` was completed and deployed. Update this file whenever
you add a new portfolio or change the structure described above.*
