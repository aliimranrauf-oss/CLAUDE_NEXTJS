// app/careers/dictionary.ts
//
// All copy for /careers lives here, in both languages, as typed key-value
// pairs. Components read from this dictionary via LanguageProvider — no
// hardcoded English (or Arabic) strings should appear in the JSX.
//
// DRAFT COPY NOTICE: the text below (both EN and AR) is placeholder/draft
// copy written to get the page structure and tone right. Swap it out with
// final, reviewed copy before launch.

export interface PainPoint {
  title: string
  description: string
  slug: string
}

export interface ExampleItem {
  title: string
  alt: string
}

export interface PackageItem {
  id: 'starter' | 'ats-cv-only' | 'ats-cv' | 'career-brand'
  name: string
  tagline: string
  priceLabel: string
  /** Pre-discount price, shown struck through next to priceLabel. Optional. */
  originalPriceLabel?: string
  /** Short badge text, e.g. "50% OFF". Optional. */
  discountLabel?: string
  features: string[]
  cta: string
  whatsappMessage: string
  highlight: boolean
  badge?: string
}

// ── Comparison table types ───────────────────────────────────────────────
// Used to render the /careers pricing section as a feature-comparison
// table instead of 4 cards each repeating a long flat bullet list.
//
// `values` is one entry per package, in the SAME ORDER as packages.items
// (currently: starter, ats-cv-only, ats-cv, career-brand). Each value is
// either:
//   - true  → shown as a checkmark (feature included)
//   - false → shown as a dash (feature not included)
//   - string → shown as-is (for things that vary by amount, e.g. "1 round" / "2 rounds")
export interface ComparisonRow {
  label: string
  values: (boolean | string)[]
}
export interface ComparisonGroup {
  title: string
  rows: ComparisonRow[]
  /**
   * Optional: one entry per package (same order as packages.items). If set
   * for a package, that package's cells for this ENTIRE group are merged
   * into a single note (e.g. "CV-only package — no website included")
   * instead of a row of individual checks/dashes. Use this when a whole
   * category of features genuinely doesn't apply to that package, rather
   * than showing a wall of dashes.
   */
  naNotes?: (string | null)[]
}

export interface HowItWorksStep {
  step: string
  title: string
  description: string
  days: string
}

export interface Testimonial {
  name: string
  role: string
  message: string
  rating: number
}

export interface FaqItem {
  q: string
  a: string
}

export interface BlogTeaserItem {
  title: string
  excerpt: string
  slug: string
  alt: string
}

export interface CareersDictionary {
  htmlLangLabel: string
  toggle: { en: string; ar: string }
  hero: {
    badge: string
    headline: string
    headlineAccent: string
    subheadline: string
    ctaPrimary: string
    ctaSecondary: string
    imageAlt: string
    imageCaption: string
  }
  painPoints: {
    eyebrow: string
    heading: string
    items: PainPoint[]
  }
  examples: {
    eyebrow: string
    heading: string
    subheading: string
    items: ExampleItem[]
    note: string
  }
  packages: {
    eyebrow: string
    heading: string
    subheading: string
    popularBadge: string
    discountNote: string
    priceNote: string
    items: PackageItem[]
    /** Grouped feature rows for the comparison table. See ComparisonGroup above. */
    comparisonGroups: ComparisonGroup[]
  }
  howItWorks: {
    eyebrow: string
    heading: string
    subheading: string
    steps: HowItWorksStep[]
  }
  testimonials: {
    eyebrow: string
    heading: string
    subheading: string
    placeholderNote: string
    items: Testimonial[]
  }
  faq: {
    eyebrow: string
    heading: string
    items: FaqItem[]
  }
  blogTeaser: {
    eyebrow: string
    heading: string
    subheading: string
    readMore: string
    items: BlogTeaserItem[]
  }
  finalCta: {
    heading: string
    subheading: string
    button: string
    stickyLabel: string
    guaranteeNote: string
  }
}

export const en: CareersDictionary = {
  htmlLangLabel: 'English',
  toggle: { en: 'EN', ar: 'عربي' },
  hero: {
    badge: 'FOR PROFESSIONALS ACROSS THE GULF',
    headline: 'Get noticed by recruiters across',
    headlineAccent: 'the Gulf',
    subheadline:
      "Your CV gets filtered by ATS bots, your LinkedIn looks like everyone else's, and Googling your name turns up nothing. A personal portfolio website fixes all three — and puts you in front of the recruiter, not the algorithm.",
    ctaPrimary: 'Chat on WhatsApp',
    ctaSecondary: 'See packages & pricing',
    imageAlt: 'Preview of a personal portfolio website with CV, projects and blog sections',
    imageCaption: 'Example portfolio preview',
  },
  painPoints: {
    eyebrow: 'THE PROBLEM',
    heading: "Why good professionals stay invisible",
    items: [
      {
        title: 'Your CV gets filtered by bots',
        description:
          'Most companies in the Gulf now run every application through an ATS before a human ever sees it. Generic CVs get auto-rejected before they reach a recruiter.',
        slug: 'ats-cv-rejection-uae-companies',
      },
      {
        title: 'Recruiters Google your name and find nothing',
        description:
          "A recruiter interested in you searches your name — and finds a blank page. No proof of work, no credibility, no reason to follow up.",
        slug: 'uae-recruiters-google-your-name',
      },
      {
        title: 'Everyone in your field looks the same on LinkedIn',
        description:
          'Same template headline, same bullet points, same profile photo crop. Nothing on your profile makes a hiring manager stop scrolling.',
        slug: 'linkedin-not-enough-gulf-job-seekers',
      },
    ],
  },
  examples: {
    eyebrow: 'EXAMPLES',
    heading: 'What your portfolio could look like',
    subheading:
      'A few draft mockups to show the style — clean, professional, and built to make recruiters trust you in ten seconds.',
    items: [
      { title: 'Finance professional', alt: 'Example portfolio for a finance professional' },
      { title: 'Engineer / technical', alt: 'Example portfolio for an engineering professional' },
      { title: 'Marketing & brand', alt: 'Example portfolio for a marketing professional' },
      { title: 'Healthcare specialist', alt: 'Example portfolio for a healthcare professional' },
    ],
    note: 'Placeholder mockups — real examples will be added once you approve a direction.',
  },
  packages: {
    eyebrow: 'PACKAGES',
    heading: 'Pick the package that fits your search',
    subheading: 'One-time price. You own the site. No subscriptions.',
    popularBadge: 'Most Popular',
    discountNote: '🔥 Launch offer — 50% off every package, for a limited time.',
    priceNote: 'Prices shown already include the 50% launch discount. Final pricing confirmed on WhatsApp before you commit.',
    items: [
      {
        id: 'starter',
        name: 'Portfolio Starter',
        tagline: 'Your professional home online',
        priceLabel: '$149',
        originalPriceLabel: '$298',
        discountLabel: '50% OFF',
        features: [
          'Custom personal portfolio website built around your profile and industry',
          'Supabase-powered admin dashboard — no code needed to manage anything',
          'Dedicated Projects section to showcase your work with images & descriptions',
          'CV page on your site, always up to date and downloadable as PDF',
          'Built-in blog section to publish articles and build authority in your field',
          'Mobile-optimized, fast-loading design tested across phones, tablets & desktop',
          'Basic on-page SEO so recruiters find your name when they Google you',
          'Working contact form connected directly to your email',
          '1 round of revisions before final delivery',
        ],
        cta: 'Get Portfolio Starter',
        whatsappMessage:
          "Hi! I'm interested in the Portfolio Starter package for a personal portfolio website. Can you share more details?",
        highlight: false,
      },
      {
        id: 'ats-cv-only',
        name: 'ATS CV Package',
        tagline: 'Get past the bots before a human even looks',
        priceLabel: '$99',
        originalPriceLabel: '$198',
        discountLabel: '50% OFF',
        features: [
          'Professionally rewritten CV, built from scratch or your existing draft',
          'Keyword-matched to the exact job titles & industry you are targeting',
          'Clean, recruiter-friendly formatting proven to pass automated ATS screening',
          'Optimized for the ATS platforms most used by Gulf employers',
          'Achievement-focused bullet points instead of generic duty lists',
          'Matching cover letter template included',
          'Editable source file (Word & Google Docs) so you can update it yourself anytime',
          '1 round of revisions included',
        ],
        cta: 'Get ATS CV Package',
        whatsappMessage:
          "Hi! I'm interested in the ATS CV Package (CV only, no portfolio site). Can you share more details?",
        highlight: false,
      },
      {
        id: 'ats-cv',
        name: 'Portfolio + ATS CV',
        tagline: 'Get past the bots, then impress the human',
        priceLabel: '$249',
        originalPriceLabel: '$498',
        discountLabel: '50% OFF',
        features: [
          'Custom personal portfolio website built around your profile and industry',
          'Supabase-powered admin dashboard — no code needed to manage anything',
          'Dedicated Projects section, editable CV page & built-in blog',
          'Mobile-optimized, fast-loading design with basic on-page SEO',
          'Professionally rewritten, ATS-friendly CV matched to your target roles',
          'Clean, recruiter-friendly CV formatting that passes automated screening',
          'Editable CV source file included, plus a matching cover letter template',
          'Your website content and CV kept consistent with each other',
          '1 round of revisions on the site and on the CV',
        ],
        cta: 'Get Portfolio + ATS CV',
        whatsappMessage:
          "Hi! I'm interested in the Portfolio + ATS CV package. Can you share more details?",
        highlight: false,
      },
      {
        id: 'career-brand',
        name: 'Career Brand Package',
        tagline: 'The complete job-search identity',
        priceLabel: '$399',
        originalPriceLabel: '$798',
        discountLabel: '50% OFF',
        features: [
          'Custom personal portfolio website with admin dashboard, projects, CV page & blog',
          'Professionally rewritten, ATS-friendly CV matched to your target roles',
          'Complete LinkedIn profile rewrite — headline, About section & experience bullets',
          'Custom domain name included, plus 1 year of hosting at no extra cost',
          '1 round of interview-ready polish on your CV, LinkedIn & portfolio together',
          'Priority delivery ahead of standard turnaround',
          'Priority WhatsApp support throughout the process',
          '2 rounds of revisions across all deliverables',
        ],
        cta: 'Get Career Brand Package',
        whatsappMessage:
          "Hi! I'm interested in the Career Brand Package (portfolio + ATS CV + LinkedIn rewrite). Can you share more details?",
        highlight: true,
        badge: 'Most Popular',
      },
    ],
    // Order of values in every row below: [Portfolio Starter, ATS CV Package, Portfolio + ATS CV, Career Brand Package]
    comparisonGroups: [
      {
        title: 'Website & Portfolio',
        naNotes: [null, 'CV-only package — no website included', null, null],
        rows: [
          { label: 'Custom personal portfolio website', values: [true, false, true, true] },
          { label: 'No-code admin dashboard (Supabase)', values: [true, false, true, true] },
          { label: 'Dedicated Projects section', values: [true, false, true, true] },
          { label: 'CV page on your site (PDF download)', values: [true, false, true, true] },
          { label: 'Built-in blog section', values: [true, false, true, true] },
          { label: 'Mobile-optimized, fast-loading design', values: [true, false, true, true] },
          { label: 'Basic on-page SEO', values: [true, false, true, true] },
          { label: 'Working contact form', values: [true, false, true, true] },
          { label: 'Custom domain + 1 year hosting', values: [false, false, false, true] },
        ],
      },
      {
        title: 'CV & Career Documents',
        rows: [
          { label: 'Professionally rewritten CV', values: [false, true, true, true] },
          { label: 'Keyword-matched to target roles', values: [false, true, true, true] },
          { label: 'ATS-optimized formatting', values: [false, true, true, true] },
          { label: 'Matching cover letter template', values: [false, true, true, false] },
          { label: 'Editable CV source file (Word & Docs)', values: [false, true, true, false] },
        ],
      },
      {
        title: 'LinkedIn & Personal Brand',
        rows: [
          { label: 'Complete LinkedIn profile rewrite', values: [false, false, false, true] },
        ],
      },
      {
        title: 'Delivery & Support',
        rows: [
          { label: 'Revisions included', values: ['1 round', '1 round', '1 round', '2 rounds'] },
          { label: 'Priority delivery', values: [false, false, false, true] },
          { label: 'Priority WhatsApp support', values: [false, false, false, true] },
        ],
      },
    ],
  },
  howItWorks: {
    eyebrow: 'HOW IT WORKS',
    heading: 'From CV to live site in 4 simple steps',
    subheading: 'A straightforward process, most of it handled for you.',
    steps: [
      {
        step: '01',
        title: 'Send your CV & details',
        description: 'Share your CV, LinkedIn, and a short brief about the roles you\u2019re targeting.',
        days: '[X] days',
      },
      {
        step: '02',
        title: 'Draft review',
        description: 'You receive a first draft of your portfolio (and CV, if included) to review.',
        days: '[X] days',
      },
      {
        step: '03',
        title: 'Revisions',
        description: 'We refine copy, design and structure based on your feedback.',
        days: '[X] days',
      },
      {
        step: '04',
        title: 'Live site delivered',
        description: 'Your portfolio goes live, ready to share with recruiters and on LinkedIn.',
        days: '[X] days',
      },
    ],
  },
  testimonials: {
    eyebrow: 'REAL RESULTS',
    heading: 'What professionals are saying',
    subheading: 'Draft placeholder testimonials — to be replaced with real client quotes.',
    placeholderNote: 'PLACEHOLDER TESTIMONIALS — replace with real client feedback before launch.',
    items: [
      {
        name: 'Layla A.',
        role: 'Marketing Manager, Riyadh',
        message:
          'Recruiters started reaching out to me within a week of sharing my new portfolio link. It made a real difference in interviews too.',
        rating: 5,
      },
      {
        name: 'Yousef H.',
        role: 'Civil Engineer, Doha',
        message:
          'My CV finally got past the ATS filters and the portfolio gave me something concrete to point to during interviews.',
        rating: 5,
      },
      {
        name: 'Noor S.',
        role: 'Finance Analyst, Jeddah',
        message:
          'Having a professional site with my own domain instantly changed how recruiters treated my application.',
        rating: 5,
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Common questions',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept payment via Fiverr (card, PayPal, Apple Pay depending on your region) or directly for WhatsApp orders — bank transfer and major cards are supported. Details are confirmed once you choose a package.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Most portfolios are delivered within the timeline shown in the "How It Works" section above, depending on the package and how quickly you send feedback on the draft.',
      },
      {
        q: 'What is your revisions policy?',
        a: 'Each package includes a review-and-revise round after the first draft, so the final site matches what you had in mind before it goes live.',
      },
      {
        q: 'Why not just use LinkedIn alone?',
        a: "LinkedIn is one profile among millions using the same template. A personal portfolio gives you a dedicated, memorable link you control — one that shows up when recruiters Google your name, and works alongside your LinkedIn, not instead of it.",
      },
      {
        q: 'Do you offer a refund or guarantee?',
        a: 'If the delivered draft doesn\u2019t match the agreed brief, we\u2019ll revise it until it does. Refund terms are confirmed upfront before work begins, in line with the platform (Fiverr or direct) you order through.',
      },
    ],
  },
  blogTeaser: {
    eyebrow: 'LEARN MORE',
    heading: 'Want more detail before you decide?',
    subheading: 'A few deeper reads on the same problems this page solves — no pressure, just context.',
    readMore: 'Read the article',
    items: [
      {
        title: 'Why Recruiters in the UAE Google Your Name Before They Call You Back',
        excerpt: 'What recruiters are hoping to find when they search your name — and what usually turns up instead.',
        slug: 'uae-recruiters-google-your-name',
        alt: 'Article: why UAE recruiters search candidate names online',
      },
      {
        title: 'ATS Systems in UAE Companies: Why Even Great CVs Get Rejected Automatically',
        excerpt: 'How resume-screening software filters candidates before a human ever opens your CV.',
        slug: 'ats-cv-rejection-uae-companies',
        alt: 'Article: how ATS software filters CVs at UAE companies',
      },
      {
        title: 'LinkedIn Isn\u2019t Enough Anymore for Gulf Job Seekers',
        excerpt: 'What top candidates across the UAE, Qatar, and the wider Gulf are doing differently in 2026.',
        slug: 'linkedin-not-enough-gulf-job-seekers',
        alt: 'Article: why LinkedIn alone is not enough for Gulf job seekers',
      },
    ],
  },
  finalCta: {
    heading: 'Ready to stop being invisible to recruiters?',
    subheading: 'Send your CV on WhatsApp and get a personal portfolio built around your career goals.',
    button: 'Chat on WhatsApp',
    stickyLabel: 'Chat on WhatsApp',
    guaranteeNote: 'Fiverr buyer protection available — order through our Fiverr gig if you prefer.',
  },
}

export const ar: CareersDictionary = {
  htmlLangLabel: 'العربية',
  toggle: { en: 'EN', ar: 'عربي' },
  hero: {
    badge: 'للمحترفين في دول الخليج',
    headline: 'اجعل نفسك مرئيًا لمسؤولي التوظيف في',
    headlineAccent: 'دول الخليج',
    subheadline:
      'سيرتك الذاتية تُصفّى بواسطة أنظمة ATS، وحسابك على LinkedIn يشبه الجميع، والبحث عن اسمك على جوجل لا يُظهر شيئًا. موقع بورتفوليو شخصي يحل هذه المشاكل الثلاث ويضعك أمام مسؤول التوظيف مباشرة، لا أمام خوارزمية.',
    ctaPrimary: 'تواصل عبر واتساب',
    ctaSecondary: 'شاهد الباقات والأسعار',
    imageAlt: 'معاينة لموقع بورتفوليو شخصي يتضمن السيرة الذاتية والمشاريع والمدونة',
    imageCaption: 'معاينة توضيحية للبورتفوليو',
  },
  painPoints: {
    eyebrow: 'المشكلة',
    heading: 'لماذا يبقى المحترفون الجيدون غير مرئيين؟',
    items: [
      {
        title: 'سيرتك الذاتية تُصفّى بواسطة الأنظمة الآلية',
        description:
          'معظم الشركات في الخليج تُمرر كل طلب توظيف عبر نظام ATS قبل أن يراه أي إنسان. السير الذاتية العامة تُرفض تلقائيًا قبل أن تصل إلى مسؤول التوظيف.',
        slug: 'ats-cv-rejection-uae-companies-ar',
      },
      {
        title: 'مسؤول التوظيف يبحث عن اسمك ولا يجد شيئًا',
        description:
          'عندما يهتم مسؤول توظيف بك، يبحث عن اسمك — ويجد صفحة فارغة. لا دليل على عملك، ولا مصداقية، ولا سبب للمتابعة.',
        slug: 'uae-recruiters-google-your-name-ar',
      },
      {
        title: 'الجميع في مجالك يبدو متشابهًا على LinkedIn',
        description:
          'نفس العنوان القالبي، ونفس النقاط، ونفس تنسيق الصورة الشخصية. لا شيء في ملفك يجعل مدير التوظيف يتوقف عن التمرير.',
        slug: 'linkedin-not-enough-gulf-job-seekers-ar',
      },
    ],
  },
  examples: {
    eyebrow: 'أمثلة',
    heading: 'كيف يمكن أن يبدو بورتفوليو الخاص بك',
    subheading:
      'بعض النماذج الأولية لتوضيح الأسلوب — نظيف واحترافي ومصمم لكسب ثقة مسؤولي التوظيف خلال ثوانٍ.',
    items: [
      { title: 'محترف مالي', alt: 'مثال بورتفوليو لمحترف في مجال المالية' },
      { title: 'مهندس / تقني', alt: 'مثال بورتفوليو لمهندس' },
      { title: 'تسويق وعلامة تجارية', alt: 'مثال بورتفوليو لمتخصص تسويق' },
      { title: 'أخصائي رعاية صحية', alt: 'مثال بورتفوليو لمتخصص في الرعاية الصحية' },
    ],
    note: 'نماذج أولية مؤقتة — سيتم إضافة أمثلة حقيقية بعد اعتماد الاتجاه المناسب.',
  },
  packages: {
    eyebrow: 'الباقات',
    heading: 'اختر الباقة المناسبة لبحثك عن عمل',
    subheading: 'سعر لمرة واحدة. الموقع ملكك بالكامل. بدون اشتراكات.',
    popularBadge: 'الأكثر طلبًا',
    discountNote: '🔥 عرض الإطلاق — خصم 50% على جميع الباقات لفترة محدودة.',
    priceNote: 'الأسعار المعروضة تشمل خصم الإطلاق 50%. يتم تأكيد السعر النهائي عبر واتساب قبل الالتزام.',
    items: [
      {
        id: 'starter',
        name: 'باقة البداية',
        tagline: 'منزلك المهني على الإنترنت',
        priceLabel: '$149',
        originalPriceLabel: '$298',
        discountLabel: 'خصم 50%',
        features: [
          'موقع بورتفوليو شخصي مصمم خصيصًا لمجالك المهني',
          'لوحة تحكم مدعومة بـ Supabase — بدون الحاجة لأي كود',
          'قسم مخصص للمشاريع لعرض أعمالك بالصور والوصف',
          'صفحة سيرة ذاتية على موقعك، قابلة للتحديث ويمكن تحميلها كملف PDF',
          'قسم مدونة مدمج لنشر المقالات وبناء حضورك في مجالك',
          'تصميم سريع ومتوافق تمامًا مع الجوال والتابلت وسطح المكتب',
          'إعداد أساسي لمحركات البحث (SEO) ليجدك المسؤولون عن التوظيف عند البحث باسمك',
          'نموذج تواصل يعمل ومرتبط مباشرة ببريدك الإلكتروني',
          'جولة تعديل واحدة قبل التسليم النهائي',
        ],
        cta: 'اطلب باقة البداية',
        whatsappMessage: 'مرحبًا! أنا مهتم بباقة البداية لإنشاء موقع بورتفوليو شخصي. هل يمكنكم مشاركة التفاصيل؟',
        highlight: false,
      },
      {
        id: 'ats-cv-only',
        name: 'باقة السيرة الذاتية ATS',
        tagline: 'تجاوز الأنظمة الآلية قبل أن يراها أي إنسان',
        priceLabel: '$99',
        originalPriceLabel: '$198',
        discountLabel: 'خصم 50%',
        features: [
          'سيرة ذاتية مُعادة كتابتها باحترافية، من الصفر أو من مسودتك الحالية',
          'مطابقة دقيقة للكلمات المفتاحية للوظائف والمجال الذي تستهدفه',
          'تنسيق واضح ومريح للقراءة، مُثبت أنه يتجاوز أنظمة الفرز الآلي',
          'مُحسّنة لتتوافق مع أنظمة ATS الأكثر استخدامًا لدى الشركات في الخليج',
          'نقاط إنجاز واضحة بدلًا من قوائم المهام العامة',
          'قالب خطاب تقديمي (Cover Letter) مطابق مرفق',
          'ملف قابل للتعديل (Word و Google Docs) لتحديثه بنفسك في أي وقت',
          'جولة تعديل واحدة مشمولة',
        ],
        cta: 'اطلب باقة السيرة الذاتية ATS',
        whatsappMessage: 'مرحبًا! أنا مهتم بباقة السيرة الذاتية ATS فقط (بدون موقع بورتفوليو). هل يمكنكم مشاركة التفاصيل؟',
        highlight: false,
      },
      {
        id: 'ats-cv',
        name: 'بورتفوليو + سيرة ذاتية ATS',
        tagline: 'تجاوز الأنظمة الآلية، ثم انبهر الإنسان',
        priceLabel: '$249',
        originalPriceLabel: '$498',
        discountLabel: 'خصم 50%',
        features: [
          'موقع بورتفوليو شخصي مصمم خصيصًا لمجالك المهني',
          'لوحة تحكم مدعومة بـ Supabase — بدون الحاجة لأي كود',
          'قسم للمشاريع، وصفحة سيرة ذاتية قابلة للتعديل، ومدونة مدمجة',
          'تصميم سريع ومتوافق مع الجوال، مع إعداد أساسي لمحركات البحث',
          'سيرة ذاتية مُعادة كتابتها باحترافية ومتوافقة مع أنظمة ATS',
          'تنسيق واضح للسيرة الذاتية يتجاوز أنظمة الفرز الآلي',
          'ملف سيرة ذاتية قابل للتعديل، مع قالب خطاب تقديمي مطابق',
          'تناسق كامل بين محتوى موقعك ومحتوى سيرتك الذاتية',
          'جولة تعديل واحدة على الموقع وجولة على السيرة الذاتية',
        ],
        cta: 'اطلب بورتفوليو + سيرة ATS',
        whatsappMessage: 'مرحبًا! أنا مهتم بباقة البورتفوليو + السيرة الذاتية ATS. هل يمكنكم مشاركة التفاصيل؟',
        highlight: false,
      },
      {
        id: 'career-brand',
        name: 'باقة العلامة المهنية',
        tagline: 'الهوية الكاملة للبحث عن عمل',
        priceLabel: '$399',
        originalPriceLabel: '$798',
        discountLabel: 'خصم 50%',
        features: [
          'موقع بورتفوليو شخصي مع لوحة تحكم، قسم مشاريع، صفحة سيرة ذاتية ومدونة',
          'سيرة ذاتية مُعادة كتابتها باحترافية ومتوافقة مع أنظمة ATS',
          'إعادة كتابة كاملة لملفك على LinkedIn — العنوان، نبذة عنك، ووصف الخبرات',
          'دومين مخصص لموقعك، مع استضافة مجانية لمدة سنة كاملة',
          'جولة صقل واحدة قبل المقابلات على السيرة الذاتية وLinkedIn والموقع معًا',
          'تسليم بأولوية أسرع من المدة المعتادة',
          'دعم بأولوية عبر واتساب طوال مراحل العمل',
          'جولتا تعديل على جميع عناصر الباقة',
        ],
        cta: 'اطلب باقة العلامة المهنية',
        whatsappMessage:
          'مرحبًا! أنا مهتم بباقة العلامة المهنية (بورتفوليو + سيرة ATS + إعادة كتابة LinkedIn). هل يمكنكم مشاركة التفاصيل؟',
        highlight: true,
        badge: 'الأكثر طلبًا',
      },
    ],
    // ترتيب القيم في كل صف: [باقة البداية، باقة السيرة الذاتية ATS، بورتفوليو + سيرة ATS، باقة العلامة المهنية]
    comparisonGroups: [
      {
        title: 'الموقع والبورتفوليو',
        naNotes: [null, 'باقة سيرة ذاتية فقط — بدون موقع إلكتروني', null, null],
        rows: [
          { label: 'موقع بورتفوليو شخصي مخصص', values: [true, false, true, true] },
          { label: 'لوحة تحكم بدون كود (Supabase)', values: [true, false, true, true] },
          { label: 'قسم مخصص للمشاريع', values: [true, false, true, true] },
          { label: 'صفحة سيرة ذاتية على موقعك (تحميل PDF)', values: [true, false, true, true] },
          { label: 'قسم مدونة مدمج', values: [true, false, true, true] },
          { label: 'تصميم سريع ومتوافق مع الجوال', values: [true, false, true, true] },
          { label: 'إعداد أساسي لمحركات البحث (SEO)', values: [true, false, true, true] },
          { label: 'نموذج تواصل يعمل', values: [true, false, true, true] },
          { label: 'دومين مخصص + استضافة سنة كاملة', values: [false, false, false, true] },
        ],
      },
      {
        title: 'السيرة الذاتية والمستندات المهنية',
        rows: [
          { label: 'سيرة ذاتية مُعادة كتابتها باحترافية', values: [false, true, true, true] },
          { label: 'مطابقة للكلمات المفتاحية للوظائف المستهدفة', values: [false, true, true, true] },
          { label: 'تنسيق متوافق مع أنظمة ATS', values: [false, true, true, true] },
          { label: 'قالب خطاب تقديمي مطابق', values: [false, true, true, false] },
          { label: 'ملف سيرة ذاتية قابل للتعديل (Word و Docs)', values: [false, true, true, false] },
        ],
      },
      {
        title: 'LinkedIn والعلامة الشخصية',
        rows: [
          { label: 'إعادة كتابة كاملة لملف LinkedIn', values: [false, false, false, true] },
        ],
      },
      {
        title: 'التسليم والدعم',
        rows: [
          { label: 'جولات التعديل المشمولة', values: ['جولة واحدة', 'جولة واحدة', 'جولة واحدة', 'جولتان'] },
          { label: 'تسليم بأولوية', values: [false, false, false, true] },
          { label: 'دعم بأولوية عبر واتساب', values: [false, false, false, true] },
        ],
      },
    ],
  },
  howItWorks: {
    eyebrow: 'كيف تسير العملية',
    heading: 'من السيرة الذاتية إلى موقع مباشر في 4 خطوات',
    subheading: 'عملية واضحة، معظمها نتولاه نيابةً عنك.',
    steps: [
      {
        step: '01',
        title: 'أرسل سيرتك الذاتية وتفاصيلك',
        description: 'شارك سيرتك الذاتية وحساب LinkedIn ونبذة عن الوظائف التي تستهدفها.',
        days: '[X] أيام',
      },
      {
        step: '02',
        title: 'مراجعة المسودة',
        description: 'تستلم أول مسودة لموقعك (وسيرتك الذاتية إن كانت ضمن الباقة) للمراجعة.',
        days: '[X] أيام',
      },
      {
        step: '03',
        title: 'التعديلات',
        description: 'نقوم بتحسين النصوص والتصميم والبنية بناءً على ملاحظاتك.',
        days: '[X] أيام',
      },
      {
        step: '04',
        title: 'تسليم الموقع مباشرة',
        description: 'يصبح موقعك جاهزًا للمشاركة مع مسؤولي التوظيف وعلى LinkedIn.',
        days: '[X] أيام',
      },
    ],
  },
  testimonials: {
    eyebrow: 'نتائج حقيقية',
    heading: 'ماذا يقول المحترفون',
    subheading: 'شهادات تجريبية مؤقتة — سيتم استبدالها بآراء عملاء حقيقية.',
    placeholderNote: 'شهادات مؤقتة — يُرجى استبدالها بتعليقات عملاء حقيقية قبل الإطلاق.',
    items: [
      {
        name: 'ليلى أ.',
        role: 'مديرة تسويق، الرياض',
        message: 'بدأ مسؤولو التوظيف بالتواصل معي خلال أسبوع من مشاركة رابط بورتفوليو الجديد. أحدث فرقًا حقيقيًا في المقابلات أيضًا.',
        rating: 5,
      },
      {
        name: 'يوسف هـ.',
        role: 'مهندس مدني، الدوحة',
        message: 'تجاوزت سيرتي الذاتية أخيرًا أنظمة التصفية، ومنحني البورتفوليو شيئًا ملموسًا لأشير إليه خلال المقابلات.',
        rating: 5,
      },
      {
        name: 'نور س.',
        role: 'محللة مالية، جدة',
        message: 'وجود موقع احترافي بدومين خاص غيّر فورًا الطريقة التي تعامل بها مسؤولو التوظيف مع طلبي.',
        rating: 5,
      },
    ],
  },
  faq: {
    eyebrow: 'الأسئلة الشائعة',
    heading: 'أسئلة متكررة',
    items: [
      {
        q: 'ما هي طرق الدفع المتاحة؟',
        a: 'نقبل الدفع عبر Fiverr (بطاقة، PayPal، Apple Pay حسب منطقتك) أو مباشرة عبر واتساب — التحويل البنكي وأغلب البطاقات مدعومة. يتم تأكيد التفاصيل عند اختيار الباقة.',
      },
      {
        q: 'كم يستغرق التسليم؟',
        a: 'يتم تسليم معظم مواقع البورتفوليو خلال المدة الموضحة في قسم "كيف تسير العملية" أعلاه، حسب الباقة وسرعة ملاحظاتك على المسودة.',
      },
      {
        q: 'ما هي سياسة التعديلات؟',
        a: 'تشمل كل باقة جولة مراجعة وتعديل بعد المسودة الأولى، لضمان مطابقة الموقع النهائي لما كنت تتصوره قبل إطلاقه.',
      },
      {
        q: 'لماذا لا أكتفي باستخدام LinkedIn فقط؟',
        a: 'LinkedIn هو ملف واحد من بين الملايين التي تستخدم نفس القالب. البورتفوليو الشخصي يمنحك رابطًا مميزًا تتحكم فيه بالكامل — يظهر عند بحث مسؤولي التوظيف عن اسمك، ويعمل جنبًا إلى جنب مع LinkedIn وليس بديلاً عنه.',
      },
      {
        q: 'هل يوجد استرداد أو ضمان؟',
        a: 'إذا لم تطابق المسودة المُسلَّمة الوصف المتفق عليه، سنقوم بتعديلها حتى تطابقه. تُحدد شروط الاسترداد مسبقًا قبل بدء العمل، وفقًا للمنصة (Fiverr أو الطلب المباشر) التي تطلب من خلالها.',
      },
    ],
  },
  blogTeaser: {
    eyebrow: 'اعرف أكثر',
    heading: 'تريد تفاصيل أكثر قبل أن تقرر؟',
    subheading: 'بعض المقالات المتعمقة حول نفس المشكلات التي تحلها هذه الصفحة — بدون أي التزام، فقط للاطلاع.',
    readMore: 'اقرأ المقال',
    items: [
      {
        title: 'لماذا يبحث مسؤولو التوظيف في الإمارات عن اسمك على جوجل قبل الاتصال بك؟',
        excerpt: 'ما الذي يأمل مسؤولو التوظيف العثور عليه عند البحث عن اسمك، وما الذي يجدونه غالبًا بدلاً من ذلك.',
        slug: 'uae-recruiters-google-your-name-ar',
        alt: 'مقال: لماذا يبحث مسؤولو التوظيف في الإمارات عن أسماء المرشحين على الإنترنت',
      },
      {
        title: 'أنظمة ATS في شركات الإمارات: لماذا تُرفض حتى السير الذاتية الممتازة تلقائيًا؟',
        excerpt: 'كيف تقوم برامج فرز السير الذاتية بتصفية المرشحين قبل أن يفتح أي إنسان سيرتك الذاتية.',
        slug: 'ats-cv-rejection-uae-companies-ar',
        alt: 'مقال: كيف تعمل أنظمة ATS في فرز السير الذاتية بشركات الإمارات',
      },
      {
        title: 'حساب LinkedIn وحده لم يعد كافيًا للباحثين عن عمل في الخليج',
        excerpt: 'ما الذي يفعله المرشحون المتميزون بشكل مختلف في الإمارات وقطر وباقي دول الخليج خلال 2026.',
        slug: 'linkedin-not-enough-gulf-job-seekers-ar',
        alt: 'مقال: لماذا لا يكفي LinkedIn وحده للباحثين عن عمل في الخليج',
      },
    ],
  },
  finalCta: {
    heading: 'مستعد لتتوقف عن أن تكون غير مرئي لمسؤولي التوظيف؟',
    subheading: 'أرسل سيرتك الذاتية عبر واتساب واحصل على بورتفوليو شخصي مبني حول أهدافك المهنية.',
    button: 'تواصل عبر واتساب',
    stickyLabel: 'تواصل عبر واتساب',
    guaranteeNote: 'حماية المشتري متوفرة عبر Fiverr — يمكنك الطلب من خلال صفحة الخدمة إذا كنت تفضل ذلك.',
  },
}

export const dictionaries = { en, ar }
export type Lang = keyof typeof dictionaries
