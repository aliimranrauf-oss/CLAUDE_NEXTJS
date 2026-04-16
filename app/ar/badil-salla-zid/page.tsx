import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'بديل سلة وزد — متجر إلكتروني بدون رسوم شهرية | MakeMyStore',
  description:
    'أفضل بديل لسلة وزد في السعودية. متجر إلكتروني مخصص 100% بدفعة واحدة فقط — بدون اشتراك شهري، ملكية كاملة، سرعة فائقة، دعم Stripe وPayPal. ابدأ اليوم من $99.',
  keywords: [
    'بديل سلة',
    'بديل زد',
    'بديل زيد',
    'متجر إلكتروني بدون اشتراك',
    'بديل سلة بدون رسوم شهرية',
    'تصميم متجر إلكتروني السعودية',
    'موقع تجارة إلكترونية',
    'متجر اونلاين رخيص',
    'بديل shopify عربي',
    'انشاء متجر الكتروني',
  ],
  alternates: {
    canonical: 'https://www.makemystore.online/ar/badil-salla-zid',
    languages: {
      'en': 'https://www.makemystore.online',
      'ar': 'https://www.makemystore.online/ar/badil-salla-zid',
    },
  },
  openGraph: {
    title: 'بديل سلة وزد — متجر إلكتروني بدون رسوم شهرية',
    description: 'متجر إلكتروني مخصص بدفعة واحدة فقط. لا رسوم شهرية، ملكية كاملة، سرعة فائقة.',
    url: 'https://www.makemystore.online/ar/badil-salla-zid',
    siteName: 'MakeMyStore.online',
    type: 'website',
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بديل سلة وزد — متجر إلكتروني بدون رسوم شهرية',
    description: 'متجر إلكتروني مخصص بدفعة واحدة فقط. لا رسوم شهرية، ملكية كاملة.',
  },
}

const LINKS = {
  whatsapp: 'https://wa.me/923000000000?text=مرحبا، أريد متجر إلكتروني',
  fiverr: 'https://www.fiverr.com/s/kLB1m0k',
  email: 'mailto:info@makemystore.online',
}

const features = [
  { icon: '🚫', title: 'بدون رسوم شهرية', desc: 'ادفع مرة واحدة فقط وامتلك متجرك للأبد. لا اشتراكات، لا مفاجآت.' },
  { icon: '🎨', title: 'تصميم مخصص 100%', desc: 'ليس قالباً جاهزاً — متجرك يُبنى من الصفر حسب هويتك التجارية.' },
  { icon: '⚡', title: 'سرعة فائقة', desc: 'مبني بـ Next.js وVercel لأسرع تجربة تسوق ممكنة.' },
  { icon: '📈', title: 'SEO متقدم', desc: 'ظهور قوي في جوجل من اليوم الأول مع بنية SEO احترافية.' },
  { icon: '💳', title: 'Stripe & PayPal', desc: 'قبول المدفوعات من كل أنحاء العالم بسهولة تامة.' },
  { icon: '🔒', title: 'ملكية كاملة', desc: 'الكود والدومين والداتا — كل شيء ملكك أنت فقط.' },
]

const comparisons = [
  { feature: 'الرسوم الشهرية', salla: '299 ريال/شهر', zid: '199 ريال/شهر', us: '✅ صفر' },
  { feature: 'تخصيص التصميم', salla: '❌ محدود', zid: '❌ محدود', us: '✅ كامل' },
  { feature: 'ملكية الكود', salla: '❌ لا', zid: '❌ لا', us: '✅ نعم' },
  { feature: 'عمولة على المبيعات', salla: '✅ نعم', zid: '✅ نعم', us: '✅ لا' },
  { feature: 'سرعة الموقع', salla: '⚠️ متوسطة', zid: '⚠️ متوسطة', us: '✅ فائقة' },
  { feature: 'SEO متقدم', salla: '⚠️ أساسي', zid: '⚠️ أساسي', us: '✅ احترافي' },
]

const faqs = [
  {
    q: 'هل أحتاج دفع أي رسوم بعد الإطلاق؟',
    a: 'لا، الدفع مرة واحدة فقط. الاستضافة مجانية مدى الحياة عبر Vercel.',
  },
  {
    q: 'كم يستغرق بناء المتجر؟',
    a: 'من 3 إلى 10 أيام عمل حسب حجم المتجر والمتطلبات.',
  },
  {
    q: 'هل يدعم المتجر اللغة العربية والعملات السعودية؟',
    a: 'نعم، المتجر يدعم العربية والإنجليزية والريال السعودي وجميع العملات.',
  },
  {
    q: 'ماذا لو أردت تعديل المتجر لاحقاً؟',
    a: 'تحصل على الكود الكامل وتستطيع تعديله متى شئت، أو نقدم خدمة الدعم بسعر مناسب.',
  },
]

export default function Page() {
  return (
    <div dir="rtl" lang="ar" className="bg-[#0b0f1a] text-white min-h-screen">

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-[#0b0f1a]/80 backdrop-blur border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="MakeMyStore" width={32} height={32} className="rounded-lg" style={{ mixBlendMode: 'lighten' }} />
          <span className="font-bold text-lg text-[#00d4ff]">MakeMyStore.online</span>
        </Link>
        <Link
          href="/"
          className="text-sm px-4 py-2 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-[#00d4ff]/40 transition-all"
        >
          🇬🇧 English Version
        </Link>
      </div>

      {/* HERO */}
      <section className="text-center px-6 pt-36 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#00d4ff]/5 via-transparent to-transparent pointer-events-none" />
        <p className="text-[#00d4ff] text-sm font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
          البديل الأفضل لسلة وزد
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
          متجرك الإلكتروني
          <br />
          <span className="text-[#00d4ff]">بدون رسوم شهرية — أبداً</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
          توقف عن دفع مئات الريالات شهرياً لسلة وزد. احصل على متجر إلكتروني مخصص بالكامل
          بدفعة واحدة فقط، مع ملكية كاملة وسرعة فائقة وتحسين SEO احترافي.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          
            href={LINKS.whatsapp}
            className="bg-[#00d4ff] text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all"
          >
            💬 تواصل عبر واتساب
          </a>
          
            href="#pricing"
            className="border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:border-[#00d4ff]/50 transition-all"
          >
            عرض الأسعار
          </a>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <span>✅ إطلاق خلال 3–10 أيام</span>
          <span>✅ ملكية كاملة للكود</span>
          <span>✅ استضافة مجانية مدى الحياة</span>
          <span>✅ دعم Stripe و PayPal</span>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
            لماذا تختار MakeMyStore بدلاً من سلة وزد؟
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            نقدم ما لا تستطيع سلة وزد تقديمه — حرية كاملة بدون قيود
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
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
            مقارنة مباشرة
          </h2>
          <p className="text-gray-400 mt-3">سلة vs زد vs MakeMyStore</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-center">
                <th className="p-4 text-right text-gray-400">الميزة</th>
                <th className="p-4 text-gray-400">سلة</th>
                <th className="p-4 text-gray-400">زد</th>
                <th className="p-4 text-[#00d4ff] font-bold">MakeMyStore ✨</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={i} className="border-t border-white/5 text-center hover:bg-white/[0.02]">
                  <td className="p-4 text-right text-white font-medium">{row.feature}</td>
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
      <section id="pricing" className="py-20 px-6 text-center">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
            أسعار شفافة — دفعة واحدة فقط
          </h2>
          <p className="text-gray-400 mt-3">لا مفاجآت، لا اشتراكات، لا عمولات</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <div className="glass rounded-2xl p-8 border border-white/10 hover:border-[#00d4ff]/20 transition-all">
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>البداية</h3>
            <p className="text-4xl font-bold text-white my-4">$99</p>
            <p className="text-gray-400 text-sm mb-6">حتى 50 منتج · تصميم مخصص · SEO أساسي</p>
            <ul className="text-gray-400 text-sm space-y-2 mb-8 text-right">
              <li>✔ تصميم مخصص</li>
              <li>✔ لوحة تحكم سهلة</li>
              <li>✔ استضافة مجانية</li>
              <li>✔ دعم المدفوعات</li>
            </ul>
            <a href={LINKS.whatsapp} className="block border border-white/20 py-3 rounded-xl hover:border-[#00d4ff]/50 transition-all">
              ابدأ الآن
            </a>
          </div>

          <div className="glass rounded-2xl p-8 border-2 border-[#00d4ff] relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00d4ff] text-black text-xs font-bold px-4 py-1 rounded-full">
              الأكثر طلباً
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>النمو</h3>
            <p className="text-4xl font-bold text-[#00d4ff] my-4">$199</p>
            <p className="text-gray-400 text-sm mb-6">منتجات غير محدودة · SEO متقدم · بلوج</p>
            <ul className="text-gray-400 text-sm space-y-2 mb-8 text-right">
              <li>✔ كل ميزات البداية</li>
              <li>✔ منتجات غير محدودة</li>
              <li>✔ SEO متقدم</li>
              <li>✔ بلوج + محتوى</li>
            </ul>
            <a href={LINKS.whatsapp} className="block bg-[#00d4ff] text-black py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all">
              اطلب الآن
            </a>
          </div>

          <div className="glass rounded-2xl p-8 border border-white/10 hover:border-[#00d4ff]/20 transition-all">
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>الاحترافي</h3>
            <p className="text-4xl font-bold text-white my-4">$499</p>
            <p className="text-gray-400 text-sm mb-6">متجر متكامل · تكاملات متقدمة · أولوية دعم</p>
            <ul className="text-gray-400 text-sm space-y-2 mb-8 text-right">
              <li>✔ كل ميزات النمو</li>
              <li>✔ تكاملات API</li>
              <li>✔ لوحة تحليلات</li>
              <li>✔ أولوية في الدعم</li>
            </ul>
            <a href={LINKS.whatsapp} className="block border border-white/20 py-3 rounded-xl hover:border-[#00d4ff]/50 transition-all">
              ابدأ الآن
            </a>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>أسئلة شائعة</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
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
          جاهز تبدأ متجرك بدون رسوم شهرية؟
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          انضم لعشرات التجار الذين تركوا سلة وزد وبنوا متاجرهم المستقلة معنا
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href={LINKS.whatsapp} className="bg-[#00d4ff] text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all">
            💬 واتساب
          </a>
          <a href={LINKS.fiverr} className="border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:border-[#00d4ff]/50 transition-all">
            Fiverr
          </a>
          <a href={LINKS.email} className="border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:border-[#00d4ff]/50 transition-all">
            📧 إيميل
          </a>
        </div>
      </section>

      {/* SEO hidden text */}
      <div className="sr-only">
        بديل سلة وزد بدون رسوم شهرية. متجر إلكتروني مخصص في السعودية والخليج.
        انشاء متجر الكتروني احترافي بدفعة واحدة. بديل shopify عربي رخيص.
      </div>

    </div>
  )
}
