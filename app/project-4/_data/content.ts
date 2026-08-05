// app/project-4/_data/content.ts
// Single source of truth for all copy, numbers, and structured content on
// the Project-4 demo portfolio. Fictional profile, built for a design
// showcase only. Edit freely — nothing else in app/project-4 hardcodes copy.

export const profile = {
  name: 'Dr. Sara Al Naqbi',
  nameArabic: 'د. سارة النقبي',
  initials: 'SA',
  role: 'Consultant Dermatologist & Aesthetic Medicine',
  location: 'Dubai, United Arab Emirates',
  tagline: 'Dermatology & Aesthetics | UAE',
}

export const nav = [
  { href: '/project-4', label: 'Overview' },
  { href: '/project-4/about', label: 'About' },
  { href: '/project-4/treatments', label: 'Treatments' },
  { href: '/project-4/experience', label: 'Experience' },
  { href: '/project-4/journal', label: 'Patient Journal' },
  { href: '/project-4/contact', label: 'Contact' },
]

export const hero = {
  eyebrow: 'Consultant Dermatologist, Dubai',
  headingLines: [
    { text: 'Precision Skincare,', accent: false },
    { text: 'Rooted in Clinical', accent: 'Clinical' },
    { text: 'Trust', accent: false },
  ],
  paragraph:
    '12+ years combining evidence-based dermatology with a calm, patient-first approach — helping residents across the UAE achieve healthy, confident skin.',
  ctaPrimary: { label: 'View Treatments', href: '/project-4/treatments' },
  ctaSecondary: { label: 'Book Consultation', href: '/project-4/contact' },
  credentials: [
    { label: 'Board-Certified', sub: 'Dermatologist' },
    { label: '12+ Years', sub: 'Experience' },
    { label: 'Dubai', sub: 'UAE Based' },
    { label: 'DHA Licensed', sub: 'Practitioner' },
  ],
  cards: {
    patients: { label: 'Patients Treated', value: '6,200+', sub: 'Across the UAE' },
    satisfaction: { label: 'Patient Satisfaction', value: '98%', sub: 'Verified reviews' },
    success: {
      label: 'Treatment Success Rate',
      percent: 96,
      status: 'Excellent',
      procedures: '4,500+',
      followUps: '1,900+',
    },
    focus: {
      label: 'Areas of Focus',
      items: ['Medical Dermatology', 'Aesthetic Medicine', 'Laser Treatments', 'Skin Cancer Screening'],
    },
  },
}

export const stats = [
  { value: '12+', label: 'Years in clinical dermatology' },
  { value: '6,200+', label: 'Patients treated across the UAE' },
  { value: '98%', label: 'Patient satisfaction rating' },
  { value: '15', label: 'Advanced treatments &amp; procedures offered' },
]

export const services = [
  {
    code: '01',
    title: 'Medical Dermatology',
    description:
      'Diagnosis and treatment of acne, eczema, psoriasis, rosacea, and other chronic and acute skin conditions.',
  },
  {
    code: '02',
    title: 'Aesthetic &amp; Anti-Aging Medicine',
    description:
      'Non-surgical rejuvenation — dermal fillers, skin boosters, thread lifts, and tailored anti-aging programs.',
  },
  {
    code: '03',
    title: 'Laser &amp; Light Therapy',
    description:
      'Laser hair removal, pigmentation correction, and skin resurfacing using clinically validated technology.',
  },
  {
    code: '04',
    title: 'Skin Cancer Screening',
    description:
      'Full-body mole mapping, dermoscopy, and early detection protocols for at-risk and returning patients.',
  },
  {
    code: '05',
    title: 'Bridal &amp; Pre-Event Skin Prep',
    description:
      'Tailored multi-week programs that bring skin to its best ahead of weddings and major events.',
  },
  {
    code: '06',
    title: 'Pediatric Dermatology',
    description:
      'Gentle, age-appropriate diagnosis and care for eczema, birthmarks, and other childhood skin conditions.',
  },
]

export const experience = [
  {
    slug: 'lead-consultant-marina-wellness',
    year: '2021 — Present',
    category: 'Clinical Leadership',
    title: 'Lead Consultant Dermatologist',
    org: 'Marina Wellness &amp; Skin Clinic, Dubai',
    summary:
      'Leading the dermatology and aesthetic medicine unit, overseeing a team of practitioners and building the clinic&rsquo;s medical-aesthetic treatment protocols from the ground up.',
    metrics: [
      { label: 'Patients seen / year', value: '1,800+' },
      { label: 'Patient satisfaction', value: '98%' },
      { label: 'Return patient rate', value: '82%' },
    ],
  },
  {
    slug: 'director-aesthetic-medicine-unit',
    year: '2018 — 2021',
    category: 'Aesthetic Medicine',
    title: 'Director, Aesthetic Medicine Unit',
    org: 'Downtown Dermatology &amp; Laser Center, Dubai',
    summary:
      'Built and directed the center&rsquo;s non-surgical aesthetics program, introducing new laser platforms and standardizing pre- and post-treatment care pathways.',
    metrics: [
      { label: 'Procedures performed', value: '3,200+' },
      { label: 'New treatments launched', value: '6' },
      { label: 'Complication rate', value: '&lt;0.5%' },
    ],
  },
  {
    slug: 'senior-registrar-dermatology',
    year: '2014 — 2018',
    category: 'Clinical Training',
    title: 'Senior Registrar, Dermatology',
    org: 'Sheikh Khalifa Medical City, Abu Dhabi',
    summary:
      'Rotated across general dermatology, pediatric dermatology, and dermatologic surgery, managing complex referral cases under consultant supervision.',
    metrics: [
      { label: 'Cases managed', value: '2,600+' },
      { label: 'Referral cases', value: '410' },
      { label: 'Teaching sessions led', value: '35' },
    ],
  },
  {
    slug: 'fellowship-laser-cosmetic-dermatology',
    year: '2012 — 2014',
    category: 'Research &amp; Fellowship',
    title: 'Fellow, Laser &amp; Cosmetic Dermatology',
    org: 'European Dermatology Institute (fictional)',
    summary:
      'Completed a clinical fellowship focused on laser safety, energy-based devices, and injectable technique, publishing on pigmentation management in skin of color.',
    metrics: [
      { label: 'Papers co-authored', value: '4' },
      { label: 'Devices trained on', value: '9' },
      { label: 'Conference presentations', value: '3' },
    ],
  },
]

export const testimonials = [
  {
    quote:
      'Dr. Sara took the time to actually understand my skin before suggesting anything. Six months later my acne scarring has faded more than I thought possible.',
    name: 'Patient',
    title: 'Dubai',
  },
  {
    quote:
      'The bridal skin program she built for me started three months out and was so well planned — by the wedding my skin had never looked better.',
    name: 'Patient',
    title: 'Abu Dhabi',
  },
]

export const insights = [
  {
    slug: 'sun-protection-uae-climate',
    title: 'Sun Protection in the UAE Climate: What Actually Works',
    excerpt:
      'Why standard SPF advice falls short in Gulf heat and humidity, and the routine that actually holds up outdoors.',
    date: '2026-05',
  },
  {
    slug: 'bridal-skin-timeline',
    title: 'The Bridal Skin Prep Timeline: What to Start and When',
    excerpt:
      'A realistic month-by-month plan for brides who want visible results without over-treating skin before the big day.',
    date: '2026-03',
  },
  {
    slug: 'understanding-pigmentation',
    title: 'Understanding Pigmentation: Causes and Treatment Options',
    excerpt:
      'Melasma, post-inflammatory marks, and sun-related pigmentation are not the same problem — why the treatment plan should differ.',
    date: '2025-12',
  },
]

export const about = {
  narrative: [
    'I&rsquo;m Dr. Sara Al Naqbi, a board-certified consultant dermatologist based in Dubai with more than twelve years of clinical experience in medical and aesthetic dermatology across the UAE.',
    'My approach starts with listening. Skin concerns are rarely just skin-deep, so every consultation begins with understanding lifestyle, history, and goals before recommending a plan — combining internationally recognized protocols with an understanding of how Gulf climate, sun exposure, and skin diversity shape real outcomes.',
    'I hold a DHA license to practice in Dubai and completed a fellowship in laser and cosmetic dermatology, and I continue to see patients for both routine medical dermatology and considered, natural-looking aesthetic treatment.',
  ],
  credentials: [
    'MBBS, Doctor of Medicine',
    'Board Certification in Dermatology',
    'DHA License — Dubai Health Authority',
    'Fellowship, Laser &amp; Cosmetic Dermatology',
    'Member, Emirates Dermatology Society (fictional)',
  ],
  philosophy:
    'Good skincare is quiet, not dramatic. I build treatment plans that respect a patient&rsquo;s skin, time, and trust — with results that hold up in daylight, not just in photos.',
}

export const footer = {
  blurb:
    'Consultant Dermatologist &amp; Aesthetic Medicine specialist based in Dubai, UAE. Medical dermatology, laser treatments, and considered aesthetic care for residents across the Emirates.',
}
