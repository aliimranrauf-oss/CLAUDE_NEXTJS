// app/project-2/_data/content.ts
// Single source of truth for all copy, numbers, and structured content on
// the Project-2 demo portfolio. Fictional profile, built for a design
// showcase only. Edit freely — nothing else in app/project-2 hardcodes copy.

export const profile = {
  name: 'Khalid Al-Mansour',
  initials: 'KA',
  role: 'Senior Finance Executive',
  location: 'Riyadh, Saudi Arabia',
  tagline: 'Finance Leader | KSA',
}

export const nav = [
  { href: '/project-2', label: 'Overview' },
  { href: '/project-2/about', label: 'About' },
  { href: '/project-2/expertise', label: 'Expertise' },
  { href: '/project-2/experience', label: 'Experience' },
  { href: '/project-2/insights', label: 'Insights' },
  { href: '/project-2/contact', label: 'Contact' },
]

export const hero = {
  eyebrow: 'Senior Finance Executive',
  headingLines: [
    { text: 'Turning Strategy', accent: false },
    { text: 'into Sustainable', accent: 'Sustainable' },
    { text: 'Financial Value', accent: false },
  ],
  paragraph:
    '15+ years leading finance transformation, driving performance, and delivering growth for leading organizations across Saudi Arabia.',
  ctaPrimary: { label: 'View Experience', href: '/project-2/experience' },
  ctaSecondary: { label: 'Schedule Consultation', href: '/project-2/contact' },
  credentials: [
    { label: 'CPA / CMA', sub: 'Certified' },
    { label: '15+ Years', sub: 'Experience' },
    { label: 'KSA', sub: 'Based' },
    { label: 'Vision 2030', sub: 'Experience' },
  ],
  cards: {
    revenue: { label: 'Revenue Growth', value: '+18%', sub: 'vs Last Year' },
    ebitda: { label: 'EBITDA Performance', value: 'SAR 85.4M', sub: '+12% vs Last Year' },
    budget: {
      label: 'Budget Performance',
      percent: 92,
      status: 'On Track',
      budget: 'SAR 245.6M',
      actual: 'SAR 226.1M',
    },
    focus: {
      label: 'Strategic Focus Areas',
      items: [
        'Financial Strategy & Planning',
        'Performance Optimization',
        'Risk Management',
        'Investment & Growth',
      ],
    },
  },
}

export const stats = [
  { value: '15+', label: 'Years in corporate finance leadership' },
  { value: 'SAR 1.2B+', label: 'Portfolio value overseen' },
  { value: '18%', label: 'Average YoY revenue growth delivered' },
  { value: '9', label: 'Enterprise transformation programs led' },
]

export const services = [
  {
    code: '01',
    title: 'Financial Strategy & Planning',
    description:
      'Long-range financial strategy, capital allocation, and scenario planning aligned to organizational growth targets.',
  },
  {
    code: '02',
    title: 'Performance Optimization',
    description:
      'Margin improvement, cost discipline, and operating-model redesign that lift EBITDA without slowing growth.',
  },
  {
    code: '03',
    title: 'Risk Management',
    description:
      'Enterprise risk frameworks, treasury controls, and governance structures built for regulated, high-growth environments.',
  },
  {
    code: '04',
    title: 'Investment & Growth',
    description:
      'Investment appraisal, M&A due diligence, and capital-raising support across diversified portfolios.',
  },
  {
    code: '05',
    title: 'FP&A',
    description:
      'Rolling forecasts, driver-based budgeting, and board-ready reporting that turn data into decisions.',
  },
  {
    code: '06',
    title: 'Business Transformation',
    description:
      'Finance function redesign, ERP-led process transformation, and change management for lasting adoption.',
  },
]

export const experience = [
  {
    slug: 'group-cfo-transformation',
    year: '2022 — Present',
    category: 'Group Finance',
    title: 'Group CFO — Enterprise Transformation',
    org: 'Diversified Holding Group, Riyadh',
    summary:
      'Led a three-year financial transformation program across seven business units, restructuring the finance operating model and consolidating reporting under a single ERP.',
    metrics: [
      { label: 'EBITDA improvement', value: '+SAR 62M' },
      { label: 'Reporting cycle', value: '-40% time' },
      { label: 'Business units aligned', value: '7' },
    ],
  },
  {
    slug: 'capital-allocation-programme',
    year: '2019 — 2022',
    category: 'Investment & Growth',
    title: 'VP Finance — Capital Allocation Programme',
    org: 'National Infrastructure Fund',
    summary:
      'Built the investment appraisal framework used to evaluate a SAR 1.2B project pipeline, improving portfolio IRR while tightening risk-adjusted return discipline.',
    metrics: [
      { label: 'Portfolio evaluated', value: 'SAR 1.2B' },
      { label: 'Portfolio IRR', value: '+3.4 pts' },
      { label: 'Projects appraised', value: '24' },
    ],
  },
  {
    slug: 'fpa-modernization',
    year: '2016 — 2019',
    category: 'FP&A',
    title: 'Director, FP&A — Forecasting Modernization',
    org: 'Regional Retail & Distribution Group',
    summary:
      'Replaced static annual budgeting with a rolling, driver-based forecast model, cutting variance and giving the board a real-time view of performance.',
    metrics: [
      { label: 'Forecast accuracy', value: '+22%' },
      { label: 'Budget cycle', value: '-6 weeks' },
      { label: 'Entities consolidated', value: '11' },
    ],
  },
  {
    slug: 'risk-governance-framework',
    year: '2013 — 2016',
    category: 'Risk Management',
    title: 'Senior Manager — Enterprise Risk & Treasury',
    org: 'Regional Banking Group',
    summary:
      'Designed and rolled out the enterprise risk and treasury control framework adopted group-wide, strengthening liquidity oversight ahead of a regulatory review cycle.',
    metrics: [
      { label: 'Liquidity buffer', value: '+15%' },
      { label: 'Control gaps closed', value: '38' },
      { label: 'Audit findings', value: '-70%' },
    ],
  },
]

export const testimonials = [
  {
    quote:
      'Khalid rebuilt how we plan and report. The board finally has a single source of truth, and decisions that used to take a quarter now take weeks.',
    name: 'Group Chairman',
    title: 'Diversified Holding Group',
  },
  {
    quote:
      'The clarity he brought to our capital allocation process changed how the whole organization thinks about return on investment.',
    name: 'Portfolio Director',
    title: 'National Infrastructure Fund',
  },
]

export const insights = [
  {
    slug: 'finance-function-vision-2030',
    title: 'Rebuilding the Finance Function for a Vision 2030 Economy',
    excerpt:
      'Why finance leaders across the Kingdom are moving from stewardship to strategy — and what that shift demands of the function.',
    date: '2026-04',
  },
  {
    slug: 'driver-based-forecasting',
    title: 'The Case for Driver-Based Forecasting',
    excerpt:
      'Static annual budgets are losing relevance. A practical framework for moving to rolling, driver-based forecasts.',
    date: '2026-02',
  },
  {
    slug: 'capital-discipline-growth',
    title: 'Capital Discipline Without Slowing Growth',
    excerpt:
      'How disciplined capital allocation and an ambitious growth agenda can — and should — coexist.',
    date: '2025-11',
  },
]

export const about = {
  narrative: [
    'I&rsquo;m Khalid Al-Mansour, a senior finance executive based in Riyadh with more than fifteen years leading corporate finance, FP&A, and business transformation for organizations across Saudi Arabia.',
    'My work sits at the intersection of strategy and execution: building the financial frameworks that let ambitious organizations grow with discipline, not just momentum. That has meant modernizing finance functions, leading capital allocation programs, and building the reporting infrastructure boards actually trust.',
    'I hold CPA and CMA certifications and have spent much of the last decade working directly on Vision 2030-aligned mandates — from infrastructure investment appraisal to enterprise transformation across diversified holding groups.',
  ],
  credentials: [
    'Certified Public Accountant (CPA)',
    'Certified Management Accountant (CMA)',
    'MBA, Finance',
    'Board Advisory — Audit & Risk Committees',
  ],
  philosophy:
    'Numbers should make decisions easier, not harder. I build finance functions that give leadership clarity — fast, accurate, and built to scale with the organization.',
}

export const footer = {
  blurb:
    'Senior Finance Executive based in Riyadh, Saudi Arabia. Leading corporate finance, FP&A, and enterprise transformation for organizations building toward Vision 2030.',
}
