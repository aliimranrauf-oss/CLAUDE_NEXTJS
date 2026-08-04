// app/project-3/_data/content.ts
// Single source of truth for all copy, numbers, and structured content on
// the Project-3 demo portfolio. Fictional profile, built for a design
// showcase only. Edit freely — nothing else in app/project-3 hardcodes copy.

export const profile = {
  name: 'Noor Al-Kuwari',
  arabicName: 'نور الكواري',
  initials: 'NK',
  role: 'Senior Brand & Marketing Strategist',
  location: 'Doha, Qatar',
  tagline: 'Brand Strategist | Qatar',
}

export const nav = [
  { href: '/project-3', label: 'Overview' },
  { href: '/project-3/about', label: 'About' },
  { href: '/project-3/work', label: 'Work' },
  { href: '/project-3/services', label: 'Services' },
  { href: '/project-3/journal', label: 'Journal' },
  { href: '/project-3/contact', label: 'Contact' },
]

export const hero = {
  eyebrow: 'Brand & Marketing Strategist',
  headingLines: [
    { text: 'Brands That Earn', accent: false },
    { text: 'Their Place in the', accent: false },
    { text: 'Gulf Conversation', accent: 'Gulf' },
  ],
  paragraph:
    '12+ years building brand strategy, identity systems, and go-to-market campaigns for retail, hospitality, and fintech brands entering Saudi Arabia, Qatar, and the wider GCC.',
  ctaPrimary: { label: 'View the Work', href: '/project-3/work' },
  ctaSecondary: { label: 'Book a Strategy Call', href: '/project-3/contact' },
  credentials: [
    { label: '12+ Years', sub: 'Brand Strategy' },
    { label: 'GCC-Wide', sub: 'Market Coverage' },
    { label: '40+', sub: 'Brands Launched' },
    { label: 'Doha', sub: 'Based' },
  ],
  cards: {
    palette: {
      label: 'Signature Palette',
      swatches: [
        { hex: '#7c1f2e', name: 'Oxblood' },
        { hex: '#b98a4e', name: 'Brass' },
        { hex: '#201811', name: 'Ink' },
        { hex: '#f1e6d2', name: 'Sand' },
        { hex: '#7a6a58', name: 'Clay' },
      ],
    },
    campaigns: { label: 'Campaigns Launched', value: '40+', sub: 'Across 4 GCC markets' },
    audience: {
      label: 'Avg. Audience Growth',
      percent: 78,
      status: 'Per Campaign',
      before: '1.0x baseline',
      after: '1.8x reach',
    },
    disciplines: {
      label: 'Core Disciplines',
      items: ['Brand Strategy', 'Identity Systems', 'Campaign Direction', 'Market Entry'],
    },
  },
}

export const stats = [
  { value: '12+', label: 'Years shaping brand strategy across the GCC' },
  { value: '40+', label: 'Brand campaigns launched to market' },
  { value: '4', label: 'Markets: KSA, Qatar, UAE, Bahrain' },
  { value: '92%', label: 'Client retention across repeat campaigns' },
]

export const services = [
  {
    code: '01',
    title: 'Brand Strategy & Positioning',
    description:
      'Category audits, audience research, and positioning platforms that give a brand a reason to matter — and a way to prove it.',
  },
  {
    code: '02',
    title: 'Visual Identity Systems',
    description:
      'Logo, typography, color, and motion systems built bilingual from day one — Arabic and Latin scripts treated as equal citizens.',
  },
  {
    code: '03',
    title: 'Campaign Direction & Creative',
    description:
      'Big-idea campaign platforms, creative direction, and content systems that stay coherent across every channel and market.',
  },
  {
    code: '04',
    title: 'GCC Market-Entry Strategy',
    description:
      'Go-to-market plans for brands entering Saudi Arabia and Qatar — localization, channel strategy, and launch sequencing.',
  },
  {
    code: '05',
    title: 'Content & Social Strategy',
    description:
      'Editorial calendars, platform strategy, and creator partnerships tuned to how Gulf audiences actually discover brands.',
  },
  {
    code: '06',
    title: 'Brand Workshops & Team Training',
    description:
      'Hands-on workshops that leave internal marketing teams able to run and protect the brand system long after launch.',
  },
]

export const work = [
  {
    slug: 'bloom-souk-retail-rebrand',
    year: '2025',
    category: 'Retail',
    title: 'Bloom & Souk — Retail Rebrand',
    client: 'Bloom & Souk (fictional)',
    summary:
      'A full repositioning and identity refresh for a Riyadh boutique retail chain, moving it from generic "mall brand" to a destination worth a special trip.',
    narrative: [
      'Bloom & Souk came to the engagement with strong store locations and weak brand recall — customers loved the shopping experience but couldn\u2019t describe the brand to a friend. The first phase was pure strategy: category mapping, mystery-shopper research across competitors in Riyadh and Jeddah, and a repositioning platform built around "curated, not crowded."',
      'The identity system that followed leaned into that idea directly: a restrained wordmark, a warm sand-and-oxblood palette that reads as premium without tipping into luxury-fatigue, and a modular signage kit that let each store keep its own layout while still feeling unmistakably Bloom & Souk.',
      'Launch rolled out across two flagship stores before expanding chain-wide, paired with a local-influencer seeding campaign timed to the reopening weekend.',
    ],
    metrics: [
      { label: 'In-store foot traffic', value: '+34%' },
      { label: 'Unaided brand recall', value: '2.1x' },
      { label: 'Flagship stores relaunched', value: '2' },
    ],
    palette: ['#7c1f2e', '#b98a4e', '#f1e6d2'],
  },
  {
    slug: 'waha-fintech-brand-launch',
    year: '2024',
    category: 'Fintech',
    title: 'Waha — Fintech Brand Launch',
    client: 'Waha Pay (fictional)',
    summary:
      'Building a public-facing brand from zero for a Qatari fintech, ahead of its consumer app launch in Doha.',
    narrative: [
      'Waha needed a brand that could do something most fintech identities fail at in the Gulf: feel trustworthy to an older, cash-preferring generation while still feeling native to a twenty-something downloading their first budgeting app. The strategy work centered on a single insight — trust in the Gulf is inherited, not earned from a UI.',
      'The resulting identity borrowed calm, editorial cues from traditional Qatari hospitality branding rather than fintech-category clichés (no neon gradients, no abstract blob logos), paired with a genuinely simple product story told in both Arabic and English from the same design system.',
      'Launch strategy sequenced a quiet beta with trusted local voices before a wider paid push, so the first public impressions of the brand were word-of-mouth, not ads.',
    ],
    metrics: [
      { label: 'App downloads, first 90 days', value: '120K' },
      { label: 'Markets at launch', value: '1 → 3' },
      { label: 'Earned press mentions', value: '45+' },
    ],
    palette: ['#1f3a3c', '#b98a4e', '#f4ece0'],
  },
  {
    slug: 'marsa-hospitality-repositioning',
    year: '2023 – 2024',
    category: 'Hospitality',
    title: 'Marsa Hospitality — Group Repositioning',
    client: 'Marsa Hospitality Group (fictional)',
    summary:
      'Repositioning a nine-property boutique hotel group across the GCC under one coherent brand architecture.',
    narrative: [
      'Marsa\u2019s nine properties had grown organically, each with its own name, logo, and tone — great for local charm, confusing for a guest trying to book a second stay in a different city. The brief was brand architecture, not just a refresh: define what stays local to each property and what becomes shared Marsa DNA.',
      'The strategy landed on a "house of properties" model: one confident master brand for discovery and loyalty, with each property keeping a distinct name and interior identity underneath it. A shared visual language — ironwork motifs, a warm brass signage system, consistent photography direction — ties the portfolio together without flattening it.',
      'Rollout was phased property-by-property over fourteen months, with a loyalty-program relaunch timed to the midpoint once enough properties carried the new system to make the "one group" promise credible.',
    ],
    metrics: [
      { label: 'Direct bookings', value: '+28%' },
      { label: 'Properties repositioned', value: '9' },
      { label: 'RevPAR uplift', value: '+14%' },
    ],
    palette: ['#2c2013', '#b98a4e', '#e7d9c2'],
  },
  {
    slug: 'alay-beauty-market-entry',
    year: '2023',
    category: 'Beauty & DTC',
    title: 'Alay Beauty — GCC Market Entry',
    client: 'Alay Beauty (fictional)',
    summary:
      'Go-to-market strategy and localized brand adaptation for a DTC beauty label entering Saudi Arabia and Qatar.',
    narrative: [
      'Alay had a strong, minimal identity that tested well in its home market but hadn\u2019t been built with Arabic typography, regional shade-range expectations, or Gulf beauty-retail norms in mind. The engagement started with a localization audit — everything from bottle copy to shade naming to the cadence of influencer gifting expected in the region.',
      'Rather than a wholesale redesign, the adaptation kept Alay\u2019s Western brand equity intact while building a genuinely bespoke Arabic identity system alongside it — not a translated afterthought, but its own typographic hierarchy, tone of voice, and campaign visuals shot locally in Doha.',
      'Launch sequencing paired a limited-drop model (scarcity that Gulf DTC audiences respond well to) with a tightly curated set of regional creator partnerships instead of a broad paid-media blitz.',
    ],
    metrics: [
      { label: 'Launch-week sell-through', value: '87%' },
      { label: 'Markets entered', value: '2' },
      { label: 'Influencer campaign reach', value: '3.4M' },
    ],
    palette: ['#5c1a2b', '#d9b787', '#f7ecdf'],
  },
  {
    slug: 'nadi-sports-collective-campaign',
    year: '2022',
    category: 'Lifestyle & Sport',
    title: 'Nadi Sports Collective — Brand Campaign',
    client: 'Nadi Sports Collective (fictional)',
    summary:
      'A brand platform and flagship campaign for a regional sports and lifestyle community app, built to shift it from "app" to "movement."',
    narrative: [
      'Nadi had solid retention among early adopters but no brand story that traveled beyond the product itself. The strategy reframed Nadi from a fitness-tracking utility into a community identity people would wear, quote, and recommend — built around the idea that showing up together beats showing up perfect.',
      'The campaign itself centered on real member stories shot across Doha, Riyadh, and Dubai training groups rather than stock-style fitness imagery, with a simple, repeatable visual system the internal team could keep producing long after the agency handoff.',
      'A companion brand-voice guide gave Nadi\u2019s small marketing team a consistent tone across push notifications, social captions, and partner communications — the kind of detail that keeps a scrappy brand feeling intentional as it scales.',
    ],
    metrics: [
      { label: 'Community members', value: '+65%' },
      { label: 'Campaign reach', value: '2.8M' },
      { label: 'Engagement rate', value: '6.4%' },
    ],
    palette: ['#1c2a22', '#b98a4e', '#eef0e4'],
  },
  {
    slug: 'qafila-logistics-rebrand',
    year: '2021 – 2022',
    category: 'B2B',
    title: 'Qafila Logistics — Corporate Rebrand',
    client: 'Qafila Logistics (fictional)',
    summary:
      'Repositioning a regional B2B logistics operator to compete for larger enterprise contracts on brand credibility, not just price.',
    narrative: [
      'Qafila was consistently losing enterprise RFPs to competitors with less operational capability but stronger-looking brands. The strategy work reframed the pitch entirely: from "we move your freight" to "we\u2019re the operations partner your board won\u2019t worry about" — a credibility play aimed squarely at enterprise procurement teams.',
      'The identity system traded Qafila\u2019s dated, cluttered old mark for a confident, restrained wordmark and a document system (proposals, case studies, the RFP deck itself) that was redesigned with as much care as the logo — because for a B2B brand, the pitch deck is the brand.',
      'The rebrand launched quietly to existing clients first, then publicly at a regional logistics conference where Qafila\u2019s new booth and materials were deliberately the most understated on the floor.',
    ],
    metrics: [
      { label: 'Enterprise RFP win rate', value: '+19%' },
      { label: 'Markets served', value: '3' },
      { label: 'Aided brand awareness', value: '2.4x' },
    ],
    palette: ['#241a12', '#7c1f2e', '#e7d9c2'],
  },
]

export const testimonials = [
  {
    quote:
      'Noor didn\u2019t just redesign our logo — she gave nine very different properties a reason to feel like one group. Guests notice. So does the board.',
    name: 'Group Marketing Director',
    title: 'Marsa Hospitality Group',
  },
  {
    quote:
      'She understood our market before she touched a single design file. That research-first approach is the reason our launch actually sold out.',
    name: 'Founder & CEO',
    title: 'Alay Beauty',
  },
]

export const journal = [
  {
    slug: 'branding-for-gcc-gen-z',
    title: 'Branding for a Gulf Gen Z Audience',
    excerpt:
      'The playbooks built for Gen Z in London or LA don\u2019t transfer cleanly to Riyadh or Doha. What actually earns attention here — and what falls flat.',
    date: '2026-05',
  },
  {
    slug: 'market-entry-checklist-ksa-qatar',
    title: 'A Market-Entry Checklist for KSA and Qatar',
    excerpt:
      'Localization is more than translation. A practical checklist for brands preparing to launch in Saudi Arabia and Qatar.',
    date: '2026-01',
  },
  {
    slug: 'arabic-first-brand-systems',
    title: 'Designing Arabic-First Brand Systems',
    excerpt:
      'Why treating Arabic typography as an equal partner — not a translated afterthought — changes how a brand system is built from day one.',
    date: '2025-09',
  },
]

export const about = {
  narrative: [
    'I&rsquo;m Noor Al-Kuwari, a brand and marketing strategist based in Doha with more than twelve years building brand strategy, identity systems, and go-to-market campaigns for organizations across the GCC.',
    'My work sits at the intersection of research and craft: understanding what a Gulf audience actually responds to, then building the visual and verbal system that earns their attention honestly — no borrowed playbooks, no translated-afterthought Arabic.',
    'I\u2019ve led brand programs for retail groups, hospitality portfolios, fintech launches, and DTC brands entering Saudi Arabia and Qatar for the first time, and I still start every engagement the same way: with the audience, not the logo.',
  ],
  credentials: [
    'Brand Strategy Certification, CIM',
    'MBA, Marketing',
    'Bilingual brand systems (Arabic / English)',
    'Advisory — GCC market-entry programs',
  ],
  philosophy:
    'A brand isn\u2019t what you say about yourself — it\u2019s what the market repeats when you\u2019re not in the room. My job is to make sure that story is true, distinctive, and worth repeating.',
}

export const footer = {
  blurb:
    'Senior Brand & Marketing Strategist based in Doha, Qatar. Building brand strategy, identity systems, and go-to-market campaigns for organizations across the GCC.',
}
