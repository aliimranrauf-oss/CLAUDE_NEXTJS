'use client'

import { useState } from 'react'
import Image from 'next/image'

const LINKS = {
  whatsapp: 'https://wa.me/923293943161?text=مرحبا، أريد متجر إلكتروني',
  fiverr: 'https://www.fiverr.com/s/kLB1m0k',
  email: 'mailto:info@makemystore.online',
  pricing: '#pricing',
  contact: '/contact',
}

const content = {
  ar: {
    dir: 'rtl' as const, lang: 'ar', toggleLabel: '🇬🇧 English',
    hero: {
      badge: 'البديل الأفضل لسلة وزد', h1Line1: 'متجرك الإلكتروني', h1Line2: 'بدون رسوم شهرية — أبداً',
      subtitle: 'توقف عن دفع مئات الريالات شهرياً لسلة وزد. احصل على متجر إلكتروني مخصص بالكامل بدفعة واحدة فقط، مع ملكية كاملة وسرعة فائقة وتحسين SEO احترافي.',
      ctaPrimary: '💬 تواصل عبر واتساب', ctaSecondary: 'عرض الأسعار',
      badges: ['✅ إطلاق خلال 3–10 أيام', '✅ ملكية كاملة للكود', '✅ استضافة مجانية مدى الحياة', '✅ دعم Stripe و PayPal'],
    },
    whyUs: { heading: 'لماذا تختار MakeMyStore بدلاً من سلة وزد؟', sub: 'نقدم ما لا تستطيع سلة وزد تقديمه — حرية كاملة بدون قيود' },
    features: [
      { icon: '🚫', title: 'بدون رسوم شهرية', desc: 'ادفع مرة واحدة فقط وامتلك متجرك للأبد. لا اشتراكات، لا مفاجآت.' },
      { icon: '🎨', title: 'تصميم مخصص 100%', desc: 'ليس قالباً جاهزاً — متجرك يُبنى من الصفر حسب هويتك التجارية.' },
      { icon: '⚡', title: 'سرعة فائقة', desc: 'مبني بـ Next.js وVercel لأسرع تجربة تسوق ممکنة.' },
      { icon: '📈', title: 'SEO متقدم', desc: 'ظهور قوي في جوجل من اليوم الأول مع بنية SEO احترافية.' },
      { icon: '💳', title: 'Stripe & PayPal', desc: 'قبول المدفوعات من كل أنحاء العالم بسهولة تامة.' },
      { icon: '🔒', title: 'ملكية كاملة', desc: 'الكود والدومين والداتا — كل شيء ملكك أنت فقط.' },
    ],
    comparison: {
      heading: 'مقارنة مباشرة', sub: 'سلة vs زد vs MakeMyStore',
      col1: 'الميزة', col2: 'سلة', col3: 'زد', col4: 'MakeMyStore ✨',
      rows: [
        { feature: 'الرسوم الشهرية', salla: '299 ريال/شهر', zid: '199 ريال/شهر', us: '✅ صفر' },
        { feature: 'تخصيص التصميم', salla: '❌ محدود', zid: '❌ محدود', us: '✅ كامل' },
        { feature: 'ملكية الكود', salla: '❌ لا', zid: '❌ لا', us: '✅ نعم' },
        { feature: 'عمولة على المبيعات', salla: '✅ نعم', zid: '✅ نعم', us: '✅ لا' },
      ],
    },
    pricing: {
      heading: 'أسعار شفافة — دفعة واحدة فقط', sub: 'لا مفاجآت، لا اشتراكات، لا عمولات',
      plans: [
        { name: 'البداية', price: '$99', desc: 'حتى 50 منتج · تصميم مخصص', features: ['✔ تصميم مخصص', '✔ لوحة تحكم سهلة', '✔ استضافة مجانية'], cta: 'ابدأ الآن', highlight: false },
        { name: 'النمو', price: '$199', desc: 'منتجات غیر محدودة · SEO متقدم', features: ['✔ كل ميزات البداية', '✔ منتجات غير محدودة', '✔ SEO متقدم'], cta: 'اطلب الآن', highlight: true, badge: 'الأكثر طلباً' },
        { name: 'الاحترافي', price: '$499', desc: 'متجر متكامل · أولوية دعم', features: ['✔ كل ميزات النمو', '✔ تکاملات API', '✔ أولوية في الدعم'], cta: 'ابدأ الآن', highlight: false },
      ],
    },
    faq: {
      heading: 'أسئلة شائعة',
      items: [
        { q: 'هل أحتاج دفع أي رسوم بعد الإطلاق؟', a: 'لا، الدفع مرة واحدة فقط. الاستضافة مجانية مدى الحياة عبر Vercel.' },
        { q: 'كم يستغرق بناء المتجر؟', a: 'من 3 إلى 10 أيام عمل حسب حجم المتجر والمتطلبات.' },
      ],
    },
    cta: { heading: 'جاهز تبدأ متجرك بدون رسوم شهرية؟', sub: 'انضم لعشرات التجار الذين تركوا سلة وزد معنا', btn1: '💬 واتساب', btn2: 'اطلب الآن' },
  },
  en: {
    dir: 'ltr' as const, lang: 'en', toggleLabel: '🇸🇦 عربي',
    hero: {
      badge: 'The Best Alternative to Salla & Zid', h1Line1: 'Your Online Store', h1Line2: 'Zero Monthly Fees — Forever',
      subtitle: 'Stop paying hundreds of Riyals every month to Salla or Zid. Get a fully custom ecommerce store for a single one-time payment.',
      ctaPrimary: '💬 Chat on WhatsApp', ctaSecondary: 'View Pricing',
      badges: ['✅ Launched in 3–10 days', '✅ Full code ownership', '✅ Free hosting for life', '✅ Stripe & PayPal support'],
    },
    whyUs: { heading: 'Why Choose MakeMyStore?', sub: 'Complete freedom with zero restrictions' },
    features: [
      { icon: '🚫', title: 'No Monthly Fees', desc: 'Pay once and own your store forever.' },
      { icon: '🎨', title: '100% Custom Design', desc: 'Built from scratch to match your brand.' },
      { icon: '⚡', title: 'Blazing Fast', desc: 'Built with Next.js and Vercel.' },
      { icon: '📈', title: 'Advanced SEO', desc: 'Strong Google visibility from day one.' },
      { icon: '💳', title: 'Stripe & PayPal', desc: 'Accept payments world-wide.' },
      { icon: '🔒', title: 'Full Ownership', desc: 'The code, domain, and data belong to you.' },
    ],
    comparison: {
      heading: 'Direct Comparison', sub: 'Salla vs Zid vs MakeMyStore',
      col1: 'Feature', col2: 'Salla', col3: 'Zid', col4: 'MakeMyStore ✨',
      rows: [
        { feature: 'Monthly Fees', salla: '299 SAR/mo', zid: '199 SAR/mo', us: '✅ Zero' },
        { feature: 'Design Customization', salla: '❌ Limited', zid: '❌ Limited', us: '✅ Full' },
        { feature: 'Code Ownership', salla: '❌ No', zid: '❌ No', us: '✅ Yes' },
        { feature: 'Sales Commission', salla: '✅ Yes', zid: '✅ Yes', us: '✅ None' },
      ],
    },
    pricing: {
      heading: 'Transparent Pricing', sub: 'One-Time Payment',
      plans: [
        { name: 'Starter', price: '$99', desc: '50 products · Custom design', features: ['✔ Custom design', '✔ Easy dashboard', '✔ Free hosting'], cta: 'Get Started', highlight: false },
        { name: 'Growth', price: '$199', desc: 'Unlimited products · Advanced SEO', features: ['✔ All Starter features', '✔ Unlimited products', '✔ Advanced SEO'], cta: 'Order Now', highlight: true, badge: 'Most Popular' },
        { name: 'Professional', price: '$499', desc: 'Full store · Priority support', features: ['✔ All Growth features', '✔ API integrations', '✔ Priority support'], cta: 'Get Started', highlight: false },
      ],
    },
    faq: {
      heading: 'FAQ',
      items: [
        { q: 'Any hidden fees?', a: 'No — you pay once. Hosting is free via Vercel.' },
        { q: 'Build time?', a: '3 to 10 business days.' },
      ],
    },
    cta: { heading: 'Ready to launch?', sub: 'Join merchants who left Salla & Zid today.', btn1: '💬 WhatsApp', btn2: 'Order Now' },
  },
}

export default function BadilSallaClient() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar')
  const t = content[lang]

  return (
    <div dir={t.dir} lang={t.lang} className="bg-[#0b0f1a] text-white min-h-screen font-sans">
      {/* Language Toggle */}
      <div className="flex justify-end p-6 pt-24 bg-[#0b0f1a]">
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="px-4 py-2 rounded-lg border border-white/10 hover:border-[#00d4ff]/40 transition-all">
          {t.toggleLabel}
        </button>
      </div>

      {/* Hero Section */}
      <section className="text-center px-6 py-16">
        <div className="mb-8">
           <Image src="/logo.png" alt="Logo" width={120} height={120} className="mx-auto" priority />
        </div>
        <p className="text-[#00d4ff] uppercase tracking-widest text-sm font-bold mb-4">{t.hero.badge}</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.hero.h1Line1} <br/> <span className="text-[#40e0ff]">{t.hero.h1Line2}</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">{t.hero.subtitle}</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {t.hero.badges.map((b, i) => (
            <span key={i} className="text-sm text-gray-300 px-3 py-1 bg-white/5 rounded-full">{b}</span>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <a href={LINKS.whatsapp} className="bg-[#00d4ff] text-black px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all">{t.hero.ctaPrimary}</a>
          <a href="#pricing" className="border border-white/20 px-8 py-3 rounded-lg font-bold hover:bg-white/5 transition-all">{t.hero.ctaSecondary}</a>
        </div>
      </section>

      {/* Why Us / Features */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{t.whyUs.heading}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {t.features.map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00d4ff]/30 transition-all">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 max-w-4xl mx-auto overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-10">{t.comparison.heading}</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-center">
            <thead className="bg-white/5">
              <tr>
                <th className="p-4 text-gray-400">{t.comparison.col1}</th>
                <th className="p-4 text-gray-400">{t.comparison.col2}</th>
                <th className="p-4 text-gray-400">{t.comparison.col3}</th>
                <th className="p-4 text-[#00d4ff]">{t.comparison.col4}</th>
              </tr>
            </thead>
            <tbody>
              {t.comparison.rows.map((row, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="p-4 font-bold">{row.feature}</td>
                  <td className="p-4 text-gray-400">{row.salla}</td>
                  <td className="p-4 text-gray-400">{row.zid}</td>
                  <td className="p-4 text-[#00d4ff] font-bold">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{t.pricing.heading}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {t.pricing.plans.map((p, i) => (
            <div key={i} className={`p-8 rounded-2xl bg-white/5 border ${p.highlight ? 'border-[#00d4ff]' : 'border-white/10'}`}>
              <h3 className="text-xl font-bold mb-4">{p.name}</h3>
              <div className="text-4xl font-bold text-[#00d4ff] mb-4">{p.price}</div>
              <p className="text-gray-400 text-sm mb-6">{p.desc}</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                {p.features.map((feat, idx) => <li key={idx}>{feat}</li>)}
              </ul>
              <a href={LINKS.whatsapp} className="block text-center py-3 bg-white/10 rounded-lg font-bold hover:bg-[#00d4ff] hover:text-black transition-all">{p.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">{t.cta.heading}</h2>
        <div className="flex justify-center gap-4">
          <a href={LINKS.whatsapp} className="bg-[#00d4ff] text-black px-10 py-4 rounded-xl font-bold">{t.cta.btn1}</a>
        </div>
      </section>
    </div>
  )
}
