// app/project-1/_data/content.ts
//
// Fully fictional demo content for the "Ahmed Al Mansoori" portfolio.
// No real names, companies, contact details, or identifiable data.
// All figures, clients, and outcomes are illustrative only.

export type ProjectRecord = {
  slug: string
  code: string // drawing-sheet style reference code
  title: string
  category: 'Transit' | 'Bridges & Marine' | 'Towers & Mixed-Use' | 'Sustainability'
  location: string
  year: string
  role: string
  duration: string
  budget: string
  client: string
  summary: string
  scope: string[]
  outcomes: { label: string; value: string }[]
  narrative: string[]
  image: string // css gradient key used by ProjectPlate component
}

export const projects: ProjectRecord[] = [
  {
    slug: 'sahara-line-metro-extension',
    code: 'PRJ-014',
    title: 'Sahara Line Metro Extension',
    category: 'Transit',
    location: 'Abu Dhabi, UAE',
    year: '2023',
    role: 'Program Director',
    duration: '38 months',
    budget: 'AED 2.1B',
    client: 'Capital Transit Authority (fictional)',
    summary:
      'Led delivery of a 14.6 km elevated and underground metro extension connecting four districts, coordinating six design consultants and eleven contractors across twenty-two stage gates.',
    scope: [
      'Program governance & stage-gate control',
      'Multi-consultant design coordination',
      'Utility diversion & underground risk management',
      'Systems integration (signalling, power, platform screen doors)',
      'Stakeholder & authority approvals',
    ],
    outcomes: [
      { label: 'Schedule variance', value: '−9 days vs. baseline' },
      { label: 'Safety', value: '0 lost-time incidents / 4.1M hrs' },
      { label: 'Cost performance index', value: '1.03' },
      { label: 'Stations delivered', value: '6' },
    ],
    narrative: [
      'The extension threaded through a live urban corridor with three major utility corridors and two heritage-protected zones, which meant the sequencing plan had to be rebuilt twice in the first year without moving the substantial completion date.',
      'I restructured the program into twenty-two stage gates with independent float, which let station-box works, systems installation, and utility diversion run in parallel instead of series — recovering roughly eleven weeks of program float that had been lost to early design changes.',
      'The harder problem was coordination debt: six consultants working from slightly different reference models. We moved everyone onto a single federated model with weekly clash burn-down targets, which cut RFIs from design coordination by just over 40% in the second year.',
    ],
    image: 'transit',
  },
  {
    slug: 'zayed-creek-crossing',
    code: 'PRJ-021',
    title: 'Zayed Creek Crossing',
    category: 'Bridges & Marine',
    location: 'Dubai, UAE',
    year: '2021',
    role: 'Senior Structural Lead',
    duration: '27 months',
    budget: 'AED 640M',
    client: 'Creekside Development Holding (fictional)',
    summary:
      'Structural lead for a cable-stayed pedestrian and light-transit crossing over a live shipping channel, delivered under an active marine-traffic exclusion window.',
    scope: [
      'Cable-stay structural design review',
      'Marine works sequencing under navigation constraints',
      'Wind-tunnel & seismic load validation',
      'Contractor technical query resolution',
    ],
    outcomes: [
      { label: 'Marine window compliance', value: '100%' },
      { label: 'Design changes post-IFC', value: '< 2%' },
      { label: 'Span', value: '218 m main span' },
      { label: 'Load testing', value: 'Passed, first attempt' },
    ],
    narrative: [
      'Every marine operation had to fit inside a four-hour tidal and shipping-traffic window, which meant the erection sequence for the deck segments was really a logistics problem wearing a structural-engineering costume.',
      'We modelled eight alternative lift sequences before settling on a balanced cantilever approach launched from both banks simultaneously, cutting the number of required marine windows from thirty-one to nineteen.',
      'The wind-tunnel results came back with a vortex-shedding concern at low wind speeds that the original concept design had not flagged — resolving it meant a fairing redesign that added six weeks but avoided a much larger retrofit risk after opening.',
    ],
    image: 'bridge',
  },
  {
    slug: 'marfa-quarter-mixed-use',
    code: 'PRJ-026',
    title: 'Marfa Quarter Mixed-Use District',
    category: 'Towers & Mixed-Use',
    location: 'Sharjah, UAE',
    year: '2022',
    role: 'Delivery Director',
    duration: '31 months',
    budget: 'AED 1.4B',
    client: 'Marfa Urban Developments (fictional)',
    summary:
      'End-to-end delivery of a five-tower mixed-use district — residential, retail podium, and a boutique office tower — sequenced to open retail ahead of residential handover.',
    scope: [
      'Master programme & phasing strategy',
      'Podium retail fit-out coordination',
      'MEP & vertical transportation commissioning',
      'Snagging, handover, and defects-liability oversight',
    ],
    outcomes: [
      { label: 'Retail pre-lease at handover', value: '78%' },
      { label: 'Units delivered', value: '612' },
      { label: 'Handover snags per unit', value: '3.1 (target: 5)' },
      { label: 'Commissioning re-tests', value: '−31% vs. prior project' },
    ],
    narrative: [
      'The commercial priority was clear from day one: retail had to open before residential handover so anchor tenants would fit out on schedule, which meant sequencing the entire district around the podium rather than the towers.',
      'That decision pushed a lot of complexity into vertical-transportation commissioning, because lift cores serving both retail and residential needed independent temporary power and separate fire-strategy sign-off before the towers above were even topped out.',
      'We ran commissioning in parallel streams per system rather than per building, which is unusual for a mixed-use scheme, but it let the MEP contractor close out re-tests nearly a third faster than a comparable project I had delivered two years earlier.',
    ],
    image: 'towers',
  },
  {
    slug: 'net-zero-retrofit-programme',
    code: 'PRJ-031',
    title: 'Net-Zero Retrofit Programme',
    category: 'Sustainability',
    location: 'Abu Dhabi, UAE',
    year: '2024',
    role: 'Sustainability Program Lead',
    duration: 'Ongoing — 19 months to date',
    budget: 'AED 310M (Phase 1–2)',
    client: 'Waha Public Facilities Group (fictional)',
    summary:
      'Leading a portfolio-wide energy and water retrofit across 42 government facility buildings, targeting a 38% reduction in operational carbon by 2027.',
    scope: [
      'Building-by-building energy audit strategy',
      'Retrofit prioritisation & capital sequencing',
      'District cooling optimisation',
      'M&V (measurement & verification) framework',
    ],
    outcomes: [
      { label: 'Buildings audited', value: '42 / 42' },
      { label: 'Energy reduction (Phase 1)', value: '24% achieved' },
      { label: 'Payback period, avg.', value: '4.6 years' },
      { label: 'Facilities retrofitted so far', value: '17' },
    ],
    narrative: [
      'The instinct on a programme like this is to retrofit the worst-performing buildings first, but the audit data showed the bigger win was optimising the shared district-cooling loop that half the portfolio sat on — one intervention touching twenty-one buildings at once.',
      'We built the M&V framework before any retrofit work started, which felt slow in month one but meant every completed building had a clean baseline to be measured against, rather than reconstructing baselines after the fact.',
      'Eighteen months in, the programme is ahead of its Phase 1 energy target, and the biggest remaining risk is less technical than logistical: keeping occupied government facilities operational through retrofit works without disrupting public services.',
    ],
    image: 'sustain',
  },
  {
    slug: 'khor-fakkan-port-access',
    code: 'PRJ-018',
    title: 'Khor Fakkan Port Access Corridor',
    category: 'Bridges & Marine',
    location: 'Khor Fakkan, UAE',
    year: '2020',
    role: 'Project Engineer → Senior Engineer',
    duration: '22 months',
    budget: 'AED 210M',
    client: 'Fujairah Coastal Infrastructure Authority (fictional)',
    summary:
      'Delivered a new elevated access corridor connecting the container terminal to the highway network, reducing truck queueing that had been affecting terminal turnaround times.',
    scope: [
      'Geotechnical & foundation design coordination',
      'Elevated viaduct construction supervision',
      'Traffic management during live-port operations',
    ],
    outcomes: [
      { label: 'Truck queue time', value: '−47% post-opening' },
      { label: 'Viaduct length', value: '1.9 km' },
      { label: 'Live-port incidents', value: '0' },
    ],
    narrative: [
      'This was my first project as a de-facto number two on site, promoted mid-project after the senior engineer relocated — which meant learning how to run daily coordination meetings with a port operator who could not afford a single hour of unplanned downtime.',
      'The geotechnical picture under the corridor turned out to be far more variable than the initial site investigation suggested, with a soft marine clay lens under two of the twelve pier locations that needed a foundation redesign mid-construction.',
      'What I took from this project into every one since: build the traffic-management plan with the operations team in the room, not just the contractor — the queue-time improvement mattered more to the client than the ribbon-cutting.',
    ],
    image: 'port',
  },
]

export const categories = [
  'All',
  'Transit',
  'Bridges & Marine',
  'Towers & Mixed-Use',
  'Sustainability',
] as const

export const stats = [
  { label: 'Years in infrastructure delivery', value: '14+' },
  { label: 'Combined program value directed', value: 'AED 4.6B+' },
  { label: 'Major projects delivered', value: '11' },
  { label: 'Lost-time incidents across career', value: '0' },
]

export const timeline = [
  {
    year: '2023 — Present',
    role: 'Program Director',
    org: 'Capital Transit Authority (fictional)',
    note: 'Leading multi-billion-dirham transit and public-facilities delivery portfolio.',
  },
  {
    year: '2021 — 2023',
    role: 'Senior Structural Lead',
    org: 'Creekside Development Holding (fictional)',
    note: 'Structural delivery lead on marine and mixed-use developments.',
  },
  {
    year: '2018 — 2021',
    role: 'Delivery Director',
    org: 'Marfa Urban Developments (fictional)',
    note: 'End-to-end delivery of large mixed-use districts.',
  },
  {
    year: '2015 — 2018',
    role: 'Project Engineer → Senior Engineer',
    org: 'Fujairah Coastal Infrastructure Authority (fictional)',
    note: 'Port and marine access infrastructure.',
  },
  {
    year: '2011 — 2015',
    role: 'Graduate Structural Engineer',
    org: 'Regional Infrastructure Consultants (fictional)',
    note: 'Foundations in structural analysis, marine works, and site supervision.',
  },
]

export const certifications = [
  { name: 'PMP — Project Management Professional', body: 'PMI', year: '2019' },
  { name: 'LEED AP BD+C', body: 'USGBC', year: '2020' },
  { name: 'Chartered Engineer (equivalent)', body: 'Regional Engineering Council', year: '2017' },
  { name: 'NEBOSH International General Certificate', body: 'NEBOSH', year: '2016' },
  { name: 'MSc Structural Engineering', body: 'Regional University (fictional)', year: '2011' },
]

export const services = [
  {
    title: 'Program Direction',
    code: 'SVC-01',
    description:
      'Full program governance for infrastructure and mixed-use developments — stage-gate control, risk management, and multi-consultant coordination from concept through handover.',
    deliverables: ['Program charter & governance model', 'Stage-gate & risk framework', 'Executive reporting cadence'],
  },
  {
    title: 'Structural & Technical Review',
    code: 'SVC-02',
    description:
      'Independent structural review and value engineering for bridges, marine works, and high-rise structures, including constructability and sequencing input.',
    deliverables: ['Design & load validation review', 'Constructability assessment', 'Value engineering register'],
  },
  {
    title: 'Delivery & Commissioning',
    code: 'SVC-03',
    description:
      'On-the-ground delivery leadership through construction, systems integration, commissioning, and handover — built around clear ownership and clean baselines.',
    deliverables: ['Delivery sequencing plan', 'Commissioning & M&V framework', 'Handover & snagging protocol'],
  },
  {
    title: 'Sustainability & Retrofit Strategy',
    code: 'SVC-04',
    description:
      'Portfolio-level energy, water, and carbon strategy for existing facility portfolios — audit, prioritisation, and capital sequencing.',
    deliverables: ['Portfolio audit strategy', 'Capital sequencing model', 'Measurement & verification framework'],
  },
]

export const testimonials = [
  {
    quote:
      'Ahmed is the rare program lead who can hold both the spreadsheet and the site walk in his head at the same time. Our board trusted his numbers because he could always explain the story behind them.',
    name: 'R. Al Falasi',
    title: 'Executive Director, Capital Transit Authority (fictional)',
  },
  {
    quote:
      'We brought him in mid-project to rescue a schedule that had drifted for a year. Within a quarter the reporting was honest again, and within two the recovery plan was actually working.',
    name: 'S. Khoury',
    title: 'Development Director, Marfa Urban Developments (fictional)',
  },
  {
    quote:
      'What stood out was how calmly he handled the marine-window constraints on the crossing project. Most engineers treat logistics as someone else\u2019s problem — he treated it as the design problem.',
    name: 'H. Al Marzouqi',
    title: 'Technical Director, Creekside Development Holding (fictional)',
  },
]

export const contactInfo = {
  name: 'Ahmed Al Mansoori',
  title: 'Senior Infrastructure & Program Director',
  base: 'Abu Dhabi, United Arab Emirates',
  availability: 'Currently accepting select advisory & program-director engagements for 2026.',
}
