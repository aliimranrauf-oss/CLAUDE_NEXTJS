// app/ar/badil-salla-zid/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'بديل سلة وزيد – متجر مخصص بدفعة واحدة | MakeMyStore.online',
  description:
    'توقف عن دفع الاشتراكات الشهرية لسلة وزيد. احصل على متجرك الإلكتروني المخصص 100% بدفعة واحدة من 99 دولار فقط — ملكية كاملة، استضافة مجانية، بدون رسوم أبدًا.',
  keywords: [
    'بديل سلة',
    'بديل زيد',
    'بديل زد',
    'متجر إلكتروني بدون اشتراك شهري',
    'متجر مخصص',
    'بديل منصة سلة',
    'بديل منصة زد',
    'تصميم متجر إلكتروني',
    'متجر بدفعة واحدة',
  ],
  alternates: {
    canonical: 'https://www.makemystore.online/ar/badil-salla-zid',
    languages: { en: 'https://www.makemystore.online/' },
  },
  openGraph: {
    title: 'بديل سلة وزيد – متجر مخصص بدفعة واحدة | MakeMyStore.online',
    description:
      'متجر إلكتروني مخصص 100% بدفعة واحدة من 99 دولار. لا اشتراكات، لا قفل على المنصة، ملكية كاملة.',
    url: 'https://www.makemystore.online/ar/badil-salla-zid',
    siteName: 'MakeMyStore.online',
    type: 'website',
    locale: 'ar_SA',
  },
}

// ─── Comparison data ──────────────────────────────────────────────────────────
const comparisonRows = [
  {
    feature: 'الاشتراك الشهري',
    salla: 'من 99 ريال/شهر',
    zid: 'من 99 ريال/شهر',
    us: '0 ريال — مرة واحدة فقط',
    highlight: true,
  },
  {
    feature: 'عمولة على المبيعات',
    salla: '0%',
    zid: '0%',
    us: '0%',
    highlight: false,
  },
  {
    feature: 'ملكية الكود المصدري',
    salla: '❌',
    zid: '❌',
    us: '✅ ملكية كاملة 100%',
    highlight: true,
  },
  {
    feature: 'التصميم',
    salla: 'قوالب محدودة',
    zid: 'قوالب محدودة',
    us: '✅ مخصص 100% — خبراء بشريين',
    highlight: false,
  },
  {
    feature: 'الاستضافة',
    salla: 'تكلفة إضافية',
    zid: 'تكلفة إضافية',
    us: '✅ مجانية على Vercel',
    highlight: true,
  },
  {
    feature: 'Stripe + PayPal',
    salla: 'محدود',
    zid: 'محدود',
    us: '✅ جاهزين من اليوم الأول',
    highlight: false,
  },
  {
    feature: 'تحسين SEO والسرعة',
    salla: 'أساسي',
    zid: 'أساسي',
    us: '✅ متقدم — Lighthouse 95+',
    highlight: true,
  },
  {
    feature: 'دعم ما بعد التسليم',
    salla: 'مدفوع',
    zid: 'مدفوع',
    us: '✅ 7 أيام مجانًا',
    highlight: false,
  },
  {
    feature: 'القفل على المنصة',
    salla: '🔒 مقفل',
    zid: '🔒 مقفل',
    us: '✅ لا قيود — انتقل متى شئت',
    highlight: true,
  },
]

const whyCards = [
  {
    icon: '💰',
    title: 'لا رسوم شهرية أبدًا',
    body: 'تدفع مرة واحدة وتنتهي القصة. لا اشتراكات تراكمية تأكل أرباحك.',
  },
  {
    icon: '🔑',
    title: 'ملكية كاملة للكود',
    body: 'الكود المصدري ملكك 100%. يمكنك نقله أو تعديله أو الاستغناء عنا متى أردت.',
  },
  {
    icon: '⚡',
    title: 'سرعة + تصميم فريد',
    body: 'مبني بـ Next.js و Supabase و Vercel. أسرع بكثير من القوالب الجاهزة.',
  },
  {
    icon: '🌍',
    title: 'مدفوعات عالمية',
    body: 'Stripe و PayPal مدمجة من البداية. بع لأي عميل في العالم بدون قيود.',
  },
  {
    icon: '📈',
    title: 'SEO متقدم',
    body: 'بنية تقنية سليمة، سرعة تحميل عالية، و Schema Markup — كل ما يحتاجه جوجل.',
  },
  {
    icon: '🛡️',
    title: 'ضمان الرضا',
    body: 'إذا لم يعجبك التصميم نعدّله حتى تكون راضيًا تمامًا — هذا وعدنا.',
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    nameAr: 'البداية',
    price: '$99',
    desc: 'متجر بسيط وسريع مثالي للبدء',
    features: [
      'تصميم مخصص بالكامل',
      'حتى 50 منتج',
      'Stripe أو PayPal',
      'استضافة مجانية على Vercel',
      'SEO أساسي',
      'دعم 7 أيام',
    ],
    cta: 'اطلب الآن',
    highlight: false,
  },
  {
    name: 'Growth',
    nameAr: 'النمو',
    price: '$199',
    desc: 'للمتاجر الجادة التي تريد النمو',
    features: [
      'كل مميزات البداية',
      'منتجات غير محدودة',
      'Stripe + PayPal معًا',
      'Google Analytics',
      'SEO متقدم + Sitemap',
      'لوحة تحكم إدارية',
      'دعم 14 يوم',
    ],
    cta: 'الأكثر طلبًا ⭐',
    highlight: true,
  },
  {
    name: 'Pro',
    nameAr: 'الاحترافي',
    price: '$499',
    desc: 'للمشاريع الكبيرة والمتاجر المتكاملة',
    features: [
      'كل مميزات النمو',
      'متعدد اللغات (عربي + إنجليزي)',
      'نظام مخزون متقدم',
      'تكامل مع أنظمة خارجية',
      'تحسين Lighthouse 95+',
      'أولوية في الدعم — 30 يوم',
    ],
    cta: 'اطلب الآن',
    highlight: false,
  },
]

// ─── Payment methods ──────────────────────────────────────────────────────────
const paymentMethods = [
  {
    name: 'Fiverr',
    icon: '🟢',
    desc: 'ادفع بأمان عبر منصة Fiverr',
    action: 'اعرض الخدمة على Fiverr',
    href: 'https://www.fiverr.com/s/kLB1m0k',
    external: true,
    color: '#1DBF73',
  },
  {
    name: 'Payoneer',
    icon: '🔵',
    desc: 'تحويل مباشر عبر Payoneer',
    action: 'تواصل للحصول على التفاصيل',
    href: 'mailto:info@makemystore.online?subject=Payoneer Payment',
    external: false,
    color: '#FF4800',
  },
  {
    name: 'واتساب',
    icon: '💬',
    desc: 'تحدث معنا مباشرة وابدأ مشروعك',
    action: 'راسلنا على واتساب',
    href: 'https://wa.me/923000000000?text=مرحبا،%20أريد%20متجرًا%20إلكترونيًا%20مخصصًا',
    external: true,
    color: '#25D366',
  },
  {
    name: 'البريد الإلكتروني',
    icon: '✉️',
    desc: 'راسلنا وسنرد خلال 24 ساعة',
    action: 'أرسل بريدًا إلكترونيًا',
    href: 'mailto:info@makemystore.online?subject=طلب متجر إلكتروني',
    external: false,
    color: '#00d4ff',
  },
]

export default function BadilSallaZid() {
  return (
    <div dir="rtl" lang="ar" className="bg-[#0b0f1a] text-white overflow-x-hidden">

      {/* ── Language Switcher ──────────────────────────────────────────────── */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 glass border border-white/10 hover:border-[#00d4ff]/40 px-4 py-2 rounded-xl text-sm font-semibold text-white/80 hover:text-[#00d4ff] transition-all duration-200"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          🇬🇧 English
        </Link>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#7a5cff]/6 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-[#00d4ff]/10 border border-[#00d4ff]/20 px-4 py-2 rounded-full text-[#00d4ff] text-sm font-semibold mb-6"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          🚀 بديل سلة وزيد الأذكى
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.25] max-w-3xl mx-auto"
          style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
        >
          توقف عن دفع الرسوم الشهرية
          <br />
          <span style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            لسلة أو زيد إلى الأبد
          </span>
        </h1>

        <p
          className="mt-6 text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          متجر إلكتروني مخصص 100% — دفعة واحدة من 99 دولار فقط
          <br />
          ملكية كاملة · استضافة مجانية على Vercel · بدون رسوم أبدًا
        </p>

        <div className="mt-6 flex flex-wrap justify-center items-center gap-1 text-sm text-white/60"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          <span>⚡ تسليم 3–10 أيام</span>
          <span className="text-white/20 mx-2">|</span>
          <span>💳 Stripe &amp; PayPal جاهزان</span>
          <span className="text-white/20 mx-2">|</span>
          <span>🔒 بدون قفل على المنصة</span>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="https://wa.me/923000000000?text=مرحبا،%20أريد%20متجرًا%20إلكترونيًا%20مخصصًا"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)',
              boxShadow: '0 4px 20px rgba(0,212,255,0.3)',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            اطلب متجرك الآن ←
          </a>
          <a
            href="#pricing"
            className="inline-block text-white/70 hover:text-white border border-white/10 hover:border-white/30 font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            شاهد الأسعار
          </a>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-3"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            مقارنة سريعة
          </h2>
          <p className="text-center text-gray-400 mb-12 text-base" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            لماذا يختار التجار MakeMyStore على سلة وزيد؟
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/8"
            style={{ background: 'rgba(17,24,39,0.6)', backdropFilter: 'blur(16px)' }}>
            <table className="w-full text-sm sm:text-base min-w-[600px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="p-5 text-right text-white/60 font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>الميزة</th>
                  <th className="p-5 text-center text-white/60 font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>سلة</th>
                  <th className="p-5 text-center text-white/60 font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>زيد</th>
                  <th className="p-5 text-center font-bold"
                    style={{ fontFamily: 'Syne, sans-serif', color: '#00d4ff' }}>
                    MakeMyStore ✦
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${row.highlight ? 'bg-[#00d4ff]/[0.02]' : ''}`}
                  >
                    <td className="p-5 font-medium text-white/80" style={{ fontFamily: 'DM Sans, sans-serif' }}>{row.feature}</td>
                    <td className="p-5 text-center text-white/40" style={{ fontFamily: 'DM Sans, sans-serif' }}>{row.salla}</td>
                    <td className="p-5 text-center text-white/40" style={{ fontFamily: 'DM Sans, sans-serif' }}>{row.zid}</td>
                    <td className="p-5 text-center font-semibold text-[#00d4ff]" style={{ fontFamily: 'DM Sans, sans-serif' }}>{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── WHY SWITCH ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-3"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            لماذا يُهاجر التجار إلينا؟
          </h2>
          <p className="text-center text-gray-400 mb-12" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            6 أسباب تجعل MakeMyStore الخيار الأذكى على المدى الطويل
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyCards.map((card, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border border-white/7 transition-all duration-300 hover:border-[#00d4ff]/30 hover:shadow-[0_0_24px_rgba(0,212,255,0.08)]"
                style={{ background: 'rgba(17,24,39,0.6)', backdropFilter: 'blur(16px)' }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-3"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            أسعار بسيطة وشفافة
          </h2>
          <p className="text-center text-gray-400 mb-12" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            دفعة واحدة فقط — لا رسوم شهرية، لا مفاجآت
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col ${
                  plan.highlight
                    ? 'border-[#00d4ff]/50 shadow-[0_0_40px_rgba(0,212,255,0.15)]'
                    : 'border-white/8 hover:border-[#00d4ff]/20'
                }`}
                style={{ background: plan.highlight ? 'rgba(0,212,255,0.05)' : 'rgba(17,24,39,0.6)', backdropFilter: 'blur(16px)' }}
              >
                {plan.highlight && (
                  <div className="mb-4 inline-flex self-center items-center gap-1 bg-[#00d4ff]/15 border border-[#00d4ff]/30 px-3 py-1 rounded-full text-[#00d4ff] text-xs font-bold"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    الأكثر طلبًا ⭐
                  </div>
                )}
                <p className="text-white/50 text-sm mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>{plan.nameAr}</p>
                <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.price}</p>
                <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>{plan.desc}</p>
                <ul className="flex flex-col gap-2 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/70" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      <span className="text-[#00d4ff] mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/923000000000?text=مرحبا،%20أريد%20متجرًا%20إلكترونيًا%20مخصصًا"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center font-bold py-3 px-6 rounded-xl text-sm transition-all duration-200 hover:scale-105"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    background: plan.highlight ? 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)' : 'transparent',
                    border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    color: plan.highlight ? 'white' : 'rgba(255,255,255,0.8)',
                    boxShadow: plan.highlight ? '0 4px 15px rgba(0,212,255,0.25)' : 'none',
                  }}
                >
                  اطلب الآن ←
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO ORDER / PAYMENT METHODS ────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-3"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            كيف تطلب وتدفع؟
          </h2>
          <p className="text-center text-gray-400 mb-12" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            اختر الطريقة الأسهل لك — نحن نلتزم بكل الخيارات
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {paymentMethods.map((method, i) => (
              <a
                key={i}
                href={method.href}
                target={method.external ? '_blank' : undefined}
                rel={method.external ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,212,255,0.08)] group"
                style={{ background: 'rgba(17,24,39,0.6)', backdropFilter: 'blur(16px)', textDecoration: 'none' }}
              >
                <span className="text-3xl shrink-0">{method.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-white text-base mb-1 group-hover:text-[#00d4ff] transition-colors"
                    style={{ fontFamily: 'Syne, sans-serif' }}>{method.name}</p>
                  <p className="text-gray-400 text-sm mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>{method.desc}</p>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: method.color, fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {method.action} →
                  </span>
                </div>
              </a>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            لا تعرف أيها تختار؟ راسلنا على{' '}
            <a href="mailto:info@makemystore.online" className="text-[#00d4ff] hover:underline">
              info@makemystore.online
            </a>{' '}
            وسنساعدك
          </p>
        </div>
      </section>

      {/* ── TECH STACK TEXT TICKER ─────────────────────────────────────────── */}
      <div className="py-8 w-full max-w-4xl mx-auto px-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/20 mb-4 text-center font-medium"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          التقنيات المستخدمة في مشاريعنا
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to left, #0b0f1a, transparent)' }} />
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to right, #0b0f1a, transparent)' }} />
          <div className="flex items-center whitespace-nowrap"
            style={{ animation: 'marquee-scroll 22s linear infinite', width: 'max-content' }}>
            {['Next.js • Supabase • Vercel • Tailwind CSS • GitHub • Google Analytics • TypeScript • Stripe • PayPal',
              'Next.js • Supabase • Vercel • Tailwind CSS • GitHub • Google Analytics • TypeScript • Stripe • PayPal',
              'Next.js • Supabase • Vercel • Tailwind CSS • GitHub • Google Analytics • TypeScript • Stripe • PayPal',
            ].map((text, i) => (
              <span key={i} className="flex-shrink-0 text-[13px] text-white/25 px-8"
                style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.04em' }}>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center">
        <div
          className="max-w-2xl mx-auto rounded-3xl p-10 border border-[#00d4ff]/20"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(122,92,255,0.06) 100%)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 60px rgba(0,212,255,0.08)',
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            جاهز تبدأ متجرك الحقيقي؟
          </h2>
          <p className="text-gray-400 mb-8 text-base leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            تسليم خلال 3–10 أيام · خبراء بشريين حقيقيين · ضمان الرضا الكامل
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/923000000000?text=مرحبا،%20أريد%20متجرًا%20إلكترونيًا%20مخصصًا"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)',
                boxShadow: '0 4px 20px rgba(0,212,255,0.3)',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              💬 تواصل على واتساب
            </a>
            <a
              href="https://www.fiverr.com/s/kLB1m0k"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-bold px-8 py-4 rounded-xl border border-[#1DBF73]/40 text-[#1DBF73] hover:bg-[#1DBF73]/10 transition-all duration-200"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              🟢 اطلب عبر Fiverr
            </a>
          </div>
        </div>
      </section>

      {/* ── SEO HIDDEN CONTENT ────────────────────────────────────────────── */}
      <div className="sr-only">
        <h2>بديل سلة - بديل زيد - بديل زد</h2>
        <p>
          MakeMyStore.online يقدم بديلاً احترافياً لمنصات سلة وزيد وزد للتجارة الإلكترونية.
          نبني متاجر إلكترونية مخصصة بالكامل بدفعة واحدة فقط، بدون رسوم شهرية أو اشتراكات.
          الكود المصدري ملكك 100% مع استضافة مجانية على Vercel ودعم كامل لـ Stripe وPayPal.
        </p>
      </div>

      {/* ── MARQUEE ANIMATION ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}
