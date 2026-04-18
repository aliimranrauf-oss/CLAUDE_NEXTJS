'use client'

import { useState } from 'react'
import Image from 'next/image'

const LINKS = {
  whatsapp: 'https://wa.me/923293943161?text=مرحباً، أريد استشارة بخصوص نقل متجري من سلة/زد إلى نظمتكم.',
  fiverr: 'https://www.fiverr.com/s/kLB1m0k',
  email: 'mailto:info@makemystore.online',
  pricing: '#pricing',
  contact: '/contact',
}

const content = {
  ar: {
    dir: 'rtl' as const,
    lang: 'ar',
    toggleLabel: '🇬🇧 English',
    hero: {
      badge: 'البديل الأفضل لسلة وزد',
      h1Line1: 'متجرك الإلكتروني',
      h1Line2: 'بدفعة واحدة — صفر رسوم منصة',
      subtitle:
        'توقف عن دفع مئات الريالات شهرياً لسلة وزد. احصل على متجر إلكتروني مخصص بالكامل بدفعة واحدة فقط، مع ملكية كاملة وسرعة فائقة وتحسين SEO احترافي.',
      ctaPrimary: '💬 تواصل عبر واتساب',
      ctaSecondary: 'عرض الأسعار',
      badges: [
        '✅ إطلاق خلال 3–10 أيام',
        '✅ ملكية كاملة للكود',
        '✅ استضافة على حسابك الخاص (Vercel Free Tier)',
        '✅ دعم Stripe و PayPal',
      ],
    },
    whyUs: {
      heading: 'لماذا تختار MakeMyStore بدلاً من سلة وزد؟',
      sub: 'نقدم ما لا تستطيع سلة وزد تقديمه — حرية كاملة بدون قيود',
    },
    features: [
      { icon: '🚫', title: 'بدون رسوم شهرية', desc: 'ادفع مرة واحدة فقط وامتلك متجرك للأبد. لا اشتراكات، لا مفاجآت.' },
      { icon: '🎨', title: 'تصميم مخصص 100%', desc: 'ليس قالباً جاهزاً — متجرك يُبنى من الصفر حسب هويتك التجارية.' },
      { icon: '⚡', title: 'سرعة فائقة', desc: 'مبني بـ Next.js وVercel لأسرع تجربة تسوق ممكنة.' },
      { icon: '📈', title: 'SEO متقدم', desc: 'ظهور قوي في جوجل من اليوم الأول مع بنية SEO احترافية.' },
      { icon: '💳', title: 'Stripe & PayPal', desc: 'قبول المدفوعات من كل أنحاء العالم بسهولة تامة.' },
      { icon: '🔒', title: 'ملكية كاملة', desc: 'الكود والدومين والداتا — كل شيء ملكك أنت فقط.' },
    ],
    comparison: {
      heading: 'مقارنة مباشرة',
      sub: 'سلة vs زد vs MakeMyStore',
      col1: 'الميزة', col2: 'سلة', col3: 'زد', col4: 'MakeMyStore ✨',
      rows: [
        { feature: 'الرسوم الشهرية', salla: '299 ريال/شهر', zid: '199 ريال/شهر', us: '✅ 0 ريال (صفر رسوم منصة)' },
        { feature: 'تخصيص التصميم', salla: '❌ محدود', zid: '❌ محدود', us: '✅ كامل' },
        { feature: 'ملكية الكود', salla: '❌ لا', zid: '❌ لا', us: '✅ نعم (ملكية كاملة)' },
        { feature: 'الاستضافة', salla: '✅ مدمجة (مدفوعة)', zid: '✅ مدمجة (مدفوعة)', us: '✅ Vercel (حسابك الشخصي)' },
        { feature: 'عمولة على المبيعات', salla: '✅ نعم', zid: '✅ نعم', us: '✅ لا' },
        { feature: 'سرعة الموقع', salla: '⚠️ متوسطة', zid: '⚠️ متوسطة', us: '✅ فائقة' },
        { feature: 'SEO متقدم', salla: '⚠️ أساسي', zid: '⚠️ أساسي', us: '✅ احترافي' },
      ],
    },
    pricing: {
      heading: 'أسعار شفافة — دفعة واحدة فقط',
      sub: 'لا مفاجآت، لا اشتراكات، لا عمولات',
      plans: [
        {
          name: 'البداية', price: '$99',
          desc: 'حتى 50 منتج · تصميم مخصص · SEO أساسي',
          features: ['✔ تصميم مخصص', '✔ لوحة تحكم سهلة', '✔ استضافة مجانية', '✔ دعم المدفوعات'],
          cta: 'ابدأ الآن', highlight: false,
        },
        {
          name: 'النمو', price: '$199',
          desc: 'منتجات غير محدودة · SEO متقدم · بلوج',
          features: ['✔ كل ميزات البداية', '✔ منتجات غير محدودة', '✔ SEO متقدم', '✔ بلوج + محتوى'],
          cta: 'اطلب الآن', highlight: true, badge: 'الأكثر طلباً',
        },
        {
          name: 'الاحترافي', price: '$499',
          desc: 'متجر متكامل · تكاملات متقدمة · أولوية دعم',
          features: ['✔ كل ميزات النمو', '✔ تكاملات API', '✔ لوحة تحليلات', '✔ أولوية في الدعم'],
          cta: 'ابدأ الآن', highlight: false,
        },
      ],
    },
    faq: {
      heading: 'أسئلة شائعة',
      items: [
        { q: 'هل أحتاج دفع أي رسوم بعد الإطلاق؟', a: 'لا توجد رسوم للمنصة. نقوم بإعداد المتجر على حسابات Vercel و Supabase الخاصة بك، مما يمنحك تحكماً كاملاً وملكية 100%.' },
        { q: 'كم يستغرق بناء المتجر؟', a: 'من 3 إلى 10 أيام عمل حسب حجم المتجر والمتطلبات.' },
        { q: 'هل يدعم المتجر اللغة العربية والعملات السعودية؟', a: 'نعم، المتجر يدعم العربية والإنجليزية والريال السعودي وجميع العملات.' },
        { q: 'ماذا لو أردت تعديل المتجر لاحقاً؟', a: 'تحصل على الكود الكامل وتستطيع تعديله متى شئت، أو نقدم خدمة الدعم بسعر مناسب.' },
      ],
    },
    cta: {
      heading: 'جاهز تبدأ متجرك بدون رسوم شهرية؟',
      sub: 'انضم لعشرات التجار الذين تركوا سلة وزد وبنوا متاجرهم المستقلة معنا',
      btn1: '💬 واتساب', btn2: 'اطلب الآن', btn3: 'Fiverr',
    },
  },
  en: {
    dir: 'ltr' as const,
    lang: 'en',
    toggleLabel: '🇸🇦 عربي',
    hero: {
      badge: 'The Best Alternative to Salla & Zid',
      h1Line1: 'Your Online Store',
      h1Line2: 'One-Time Payment — Zero Platform Fees',
      subtitle:
        'Stop paying hundreds of Riyals every month to Salla or Zid. Get a fully custom ecommerce store for a single one-time payment — with complete ownership, blazing speed, and professional SEO.',
      ctaPrimary: '💬 Chat on WhatsApp',
      ctaSecondary: 'View Pricing',
      badges: [
        '✅ Launched in 3–10 days',
        '✅ Full code ownership',
        '✅ Hosted on your own account (Vercel Free Tier)',
        '✅ Stripe & PayPal support',
      ],
    },
    whyUs: {
      heading: 'Why Choose MakeMyStore over Salla & Zid?',
      sub: 'We offer what Salla & Zid cannot — complete freedom with zero restrictions',
    },
    features: [
      { icon: '🚫', title: 'No Monthly Fees', desc: 'Pay once and own your store forever. No subscriptions, no surprises.' },
      { icon: '🎨', title: '100% Custom Design', desc: 'Not a template — your store is built from scratch to match your brand.' },
      { icon: '⚡', title: 'Blazing Fast', desc: 'Built with Next.js and Vercel for the fastest possible shopping experience.' },
      { icon: '📈', title: 'Advanced SEO', desc: 'Strong Google visibility from day one with a professional SEO architecture.' },
      { icon: '💳', title: 'Stripe & PayPal', desc: 'Accept payments from anywhere in the world with ease.' },
      { icon: '🔒', title: 'Full Ownership', desc: 'The code, domain, and data — everything belongs to you and only you.' },
    ],
    comparison: {
      heading: 'Direct Comparison',
      sub: 'Salla vs Zid vs MakeMyStore',
      col1: 'Feature', col2: 'Salla', col3: 'Zid', col4: 'MakeMyStore ✨',
      rows: [
        { feature: 'Monthly Fees', salla: '299 SAR/mo', zid: '199 SAR/mo', us: '✅ 0 SAR (Zero platform fees)' },
        { feature: 'Design Customization', salla: '❌ Limited', zid: '❌ Limited', us: '✅ Full' },
        { feature: 'Code Ownership', salla: '❌ No', zid: '❌ No', us: '✅ Yes (Full ownership)' },
        { feature: 'Hosting', salla: '✅ Built-in (paid)', zid: '✅ Built-in (paid)', us: '✅ Vercel (your own account)' },
        { feature: 'Sales Commission', salla: '✅ Yes', zid: '✅ Yes', us: '✅ None' },
        { feature: 'Site Speed', salla: '⚠️ Average', zid: '⚠️ Average', us: '✅ Blazing Fast' },
        { feature: 'Advanced SEO', salla: '⚠️ Basic', zid: '⚠️ Basic', us: '✅ Professional' },
      ],
    },
    pricing: {
      heading: 'Transparent Pricing — One-Time Payment',
      sub: 'No surprises, no subscriptions, no commissions',
      plans: [
        {
          name: 'Starter', price: '$99',
          desc: 'Up to 50 products · Custom design · Basic SEO',
          features: ['✔ Custom design', '✔ Easy dashboard', '✔ Free hosting', '✔ Payment support'],
          cta: 'Get Started', highlight: false,
        },
        {
          name: 'Growth', price: '$199',
          desc: 'Unlimited products · Advanced SEO · Blog',
          features: ['✔ All Starter features', '✔ Unlimited products', '✔ Advanced SEO', '✔ Blog + content'],
          cta: 'Order Now', highlight: true, badge: 'Most Popular',
        },
        {
          name: 'Professional', price: '$499',
          desc: 'Full store · Advanced integrations · Priority support',
          features: ['✔ All Growth features', '✔ API integrations', '✔ Analytics dashboard', '✔ Priority support'],
          cta: 'Get Started', highlight: false,
        },
      ],
    },
    faq: {
      heading: 'Frequently Asked Questions',
      items: [
        { q: 'Do I need to pay anything after launch?', a: 'No platform fees. We set up the store on your own Vercel and Supabase accounts, giving you full control and 100% ownership.' },
        { q: 'How long does it take to build the store?', a: '3 to 10 business days depending on the size and requirements.' },
        { q: 'Does the store support Arabic and Saudi currency?', a: 'Yes, the store supports both Arabic and English, Saudi Riyal, and all currencies.' },
        { q: 'What if I want to modify the store later?', a: 'You get the full source code and can modify it anytime, or we offer affordable ongoing support.' },
      ],
    },
    cta: {
      heading: 'Ready to launch your store with zero monthly fees?',
      sub: 'Join dozens of merchants who left Salla & Zid and built their independent stores with us',
      btn1: '💬 WhatsApp', btn2: 'Order Now', btn3: 'Fiverr',
    },
  },
}

export default function BadilSallaClient() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar')
  const t = content[lang]

  return (
    <div dir={t.dir} lang={t.lang} className="bg-[#0b0f1a] text-white min-h-screen">
      {/* Language Toggle */}
      <div className="flex justify-end items-center px-6 py-3 border-b border-white/5 bg-[#0b0f1a]/60 backdrop-blur pt-20">
        <button
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="text-sm font-semibold px-4 py-2 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-[#00d4ff]/40 transition-all"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {t.toggleLabel}
        </button>
      </div>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-16 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#00d4ff]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#7a5cff]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="animate-float mb-8">
          <Image
            src="/logo.png"
            alt="MakeMyStore - Custom Ecommerce Solutions"
            width={140}
            height={140}
            className="mx-auto rounded-2xl object-contain"
            priority
            style={{
              mixBlendMode: 'lighten',
              filter: 'drop-shadow(0 0 20px rgba(122,92,255,0.4))',
            }}
          />
        </div>

        <p className="text-[#00d4ff] text-sm font-bold tracking-widest uppercase mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
          {t.hero.badge}
        </p>

        <h1 className="text-4xl sm:text-[42px] font-bold leading-[1.2] max-w-2xl mx-auto text-white" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}>
          {t.hero.h1Line1}
          <br />
          <span className="text-[#40e0ff] block mt-1">{t.hero.h1Line2}</span>
        </h1>

        <p className="mt-5 text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {t.hero.subtitle}
        </p>

        <div className="mt-5 flex flex-wrap justify-center items-center gap-1 text-[13px] sm:text-sm text-white/70" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {t.hero.badges.map((b, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-white/20 mx-1">|</span>}
              {b}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-8 py-3.5 rounded-lg font-bold"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href={LINKS.pricing}
            className="text-sm px-8 py-3.5 rounded-lg font-bold border border-white/20 text-white/80 hover:text-white hover:border-[#00d4ff]/50 transition-all"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
            {t.whyUs.heading}
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">{t.whyUs.sub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 border border-white/5 hover:border-[#00d4ff]/30 transition-all card-glow">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
            {t.comparison.heading}
          </h2>
          <p className="text-gray-400 mt-3">{t.comparison.sub}</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-center">
                <th className={`p-4 text-gray-400 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.comparison.col1}</th>
                <th className="p-4 text-gray-400">{t.comparison.col2}</th>
                <th className="p-4 text-gray-400">{t.comparison.col3}</th>
                <th className="p-4 text-[#00d4ff] font-bold">{t.comparison.col4}</th>
              </tr>
            </thead>
            <tbody>
              {t.comparison.rows.map((row, i) => (
                <tr key={i} className="border-t border-white/5 text-center hover:bg-white/[0.02]">
                  <td className={`p-4 text-white font-medium ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{row.feature}</td>
                  <td className="p-4 text-gray-400">{row.salla}</td>
                  <td className="p-4 text-gray-400">{row.zid}</td>
                  <td className="p-4 text-[#00d4ff] font-bold">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
            {t.pricing.heading}
          </h2>
          <p className="text-gray-400 mt-3">{t.pricing.sub}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass rounded-2xl p-8 relative transition-all ${
                plan.highlight ? 'border-2 border-[#00d4ff]' : 'border border-white/10 hover:border-[#00d4ff]/20'
              }`}
            >
              {'badge' in plan && plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00d4ff] text-black text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.name}</h3>
              <p className={`text-4xl font-bold my-4 ${plan.highlight ? 'text-[#00d4ff]' : 'text-white'}`}>{plan.price}</p>
              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
              <ul className={`text-gray-400 text-sm space-y-2 mb-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                {plan.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              {plan.highlight ? (
                <a href={LINKS.contact} className="btn-primary block text-center text-sm py-3 rounded-xl">
                  {plan.cta}
                </a>
              ) : (
                <a href={LINKS.contact} className="block text-center text-sm py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-[#00d4ff]/50 transition-all font-semibold">
                  {plan.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{t.faq.heading}</h2>
        </div>
        <div className="space-y-4">
          {t.faq.items.map((faq, i) => (
            <div key={i} className="glass rounded-xl p-6 border border-white/5">
              <h3 className="font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
          {t.cta.heading}
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">{t.cta.sub}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-8 py-3.5 rounded-xl font-bold"
          >
            {t.cta.btn1}
          </a>
          <a
            href={LINKS.contact}
            className="text-sm px-8 py-3.5 rounded-xl font-bold border border-white/20 text-white/80 hover:text-white hover:border-[#00d4ff]/50 transition-all"
          >
            {t.cta.btn2}
          </a>
          <a
            href={LINKS.fiverr}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-8 py-3.5 rounded-xl font-bold border border-white/20 text-white/80 hover:text-white hover:border-[#00d4ff]/50 transition-all"
          >
            {t.cta.btn3}
          </a>
        </div>
      </section>

      {/* Hidden SEO text */}
      <div className="sr-only">
        بديل سلة وزد بدون رسوم شهرية. متجر إلكتروني مخصص في السعودية والخليج. انشاء متجر الكتروني احترافي بدفعة واحدة. بديل shopify عربي رخيص. Salla alternative, Zid alternative, custom ecommerce Saudi Arabia, no monthly fees online store.
      </div>
    </div>
  )
}
