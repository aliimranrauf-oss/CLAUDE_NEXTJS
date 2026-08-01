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
}

export interface ExampleItem {
  title: string
  alt: string
}

export interface PackageItem {
  id: 'starter' | 'ats-cv' | 'career-brand'
  name: string
  tagline: string
  priceLabel: string
  features: string[]
  cta: string
  whatsappMessage: string
  highlight: boolean
  badge?: string
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
    priceNote: string
    items: PackageItem[]
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
      },
      {
        title: 'Recruiters Google your name and find nothing',
        description:
          "A recruiter interested in you searches your name — and finds a blank page. No proof of work, no credibility, no reason to follow up.",
      },
      {
        title: 'Everyone in your field looks the same on LinkedIn',
        description:
          'Same template headline, same bullet points, same profile photo crop. Nothing on your profile makes a hiring manager stop scrolling.',
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
    priceNote: 'Final pricing confirmed on WhatsApp before you commit.',
    items: [
      {
        id: 'starter',
        name: 'Portfolio Starter',
        tagline: 'Your professional home online',
        priceLabel: '$149',
        features: [
          'Custom personal portfolio website',
          'Supabase-powered admin dashboard',
          'Edit projects, CV & blog without touching code',
          'Mobile-optimized, fast-loading design',
          'Basic SEO so your name is searchable',
        ],
        cta: 'Get Portfolio Starter',
        whatsappMessage:
          "Hi! I'm interested in the Portfolio Starter package for a personal portfolio website. Can you share more details?",
        highlight: false,
      },
      {
        id: 'ats-cv',
        name: 'Portfolio + ATS CV',
        tagline: 'Get past the bots, then impress the human',
        priceLabel: '$249',
        features: [
          'Everything in Portfolio Starter',
          'Professionally optimized ATS-friendly CV',
          'Keyword-matched to your target roles',
          'Clean, recruiter-friendly formatting',
          'Editable source file included',
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
        features: [
          'Everything in Portfolio + ATS CV',
          'LinkedIn profile rewrite',
          'Custom domain & 1 year hosting included',
          '1 round of interview-ready polish',
          'Priority delivery & support',
        ],
        cta: 'Get Career Brand Package',
        whatsappMessage:
          "Hi! I'm interested in the Career Brand Package (portfolio + ATS CV + LinkedIn rewrite). Can you share more details?",
        highlight: true,
        badge: 'Most Popular',
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
      },
      {
        title: 'مسؤول التوظيف يبحث عن اسمك ولا يجد شيئًا',
        description:
          'عندما يهتم مسؤول توظيف بك، يبحث عن اسمك — ويجد صفحة فارغة. لا دليل على عملك، ولا مصداقية، ولا سبب للمتابعة.',
      },
      {
        title: 'الجميع في مجالك يبدو متشابهًا على LinkedIn',
        description:
          'نفس العنوان القالبي، ونفس النقاط، ونفس تنسيق الصورة الشخصية. لا شيء في ملفك يجعل مدير التوظيف يتوقف عن التمرير.',
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
    priceNote: 'يتم تأكيد السعر النهائي عبر واتساب قبل الالتزام.',
    items: [
      {
        id: 'starter',
        name: 'باقة البداية',
        tagline: 'منزلك المهني على الإنترنت',
        priceLabel: '$149',
        features: [
          'موقع بورتفوليو شخصي مخصص',
          'لوحة تحكم مدعومة بـ Supabase',
          'تعديل المشاريع والسيرة الذاتية والمدونة دون كتابة كود',
          'تصميم سريع ومتوافق مع الجوال',
          'إعداد أساسي لمحركات البحث (SEO)',
        ],
        cta: 'اطلب باقة البداية',
        whatsappMessage: 'مرحبًا! أنا مهتم بباقة البداية لإنشاء موقع بورتفوليو شخصي. هل يمكنكم مشاركة التفاصيل؟',
        highlight: false,
      },
      {
        id: 'ats-cv',
        name: 'بورتفوليو + سيرة ذاتية ATS',
        tagline: 'تجاوز الأنظمة الآلية، ثم انبهر الإنسان',
        priceLabel: '$249',
        features: [
          'كل ما في باقة البداية',
          'سيرة ذاتية احترافية متوافقة مع أنظمة ATS',
          'مطابقة الكلمات المفتاحية للوظائف المستهدفة',
          'تنسيق واضح وسهل القراءة لمسؤولي التوظيف',
          'ملف قابل للتعديل',
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
        features: [
          'كل ما في باقة بورتفوليو + سيرة ATS',
          'إعادة كتابة ملف LinkedIn',
          'دومين مخصص واستضافة لمدة سنة',
          'جولة صقل واحدة قبل المقابلات',
          'تسليم ودعم بأولوية',
        ],
        cta: 'اطلب باقة العلامة المهنية',
        whatsappMessage:
          'مرحبًا! أنا مهتم بباقة العلامة المهنية (بورتفوليو + سيرة ATS + إعادة كتابة LinkedIn). هل يمكنكم مشاركة التفاصيل؟',
        highlight: true,
        badge: 'الأكثر طلبًا',
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
