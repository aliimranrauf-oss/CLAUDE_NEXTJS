'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_URL =
  'https://wa.me/923293943161?text=اسلام%20علیکم،%20مجھے%20پاکستان%20میں%20اپنا%20آن%20لائن%20اسٹور%20بنوانا%20ہے'

const TYPING_TEXTS = [
  'براہ راست EasyPaisa & JazzCash ادائیگی ✓',
  'ایک بار ادائیگی — ہمیشہ کی ملکیت ✓',
  'کوئی ماہانہ فیس نہیں ✓',
  'No Monthly Fees — Ever ✓',
]

// ── Comparison Table Data ─────────────────────────────────────────────────────
const COMPARISON = [
  {
    feature: 'ماہانہ فیس',
    shopify: '₨ 8,000–25,000/ماہ',
    mms: '✅ صفر — ایک بار ادائیگی',
    mmsBetter: true,
  },
  {
    feature: 'مقامی ادائیگی (EasyPaisa/JazzCash)',
    shopify: '❌ آفیشل سپورٹ نہیں',
    mms: '✅ براہ راست ادائیگی',
    mmsBetter: true,
  },
  {
    feature: 'Bank Transfer',
    shopify: '❌ پاکستانی بینک مسئلہ',
    mms: '✅ تمام بینک قابل قبول',
    mmsBetter: true,
  },
  {
    feature: 'آرڈر مینجمنٹ',
    shopify: '❌ پیچیدہ اور مہنگا',
    mms: '✅ آسان ڈیش بورڈ',
    mmsBetter: true,
  },
  {
    feature: 'ڈیٹا ملکیت',
    shopify: '❌ Shopify کا ڈیٹا',
    mms: '✅ آپ کا اپنا Supabase',
    mmsBetter: true,
  },
  {
    feature: 'پلیٹ فارم لاک-ان',
    shopify: '❌ چھوڑنا مشکل',
    mms: '✅ آزاد — کوئی قید نہیں',
    mmsBetter: true,
  },
  {
    feature: 'SEO کنٹرول',
    shopify: '⚠️ محدود',
    mms: '✅ مکمل Next.js SEO',
    mmsBetter: true,
  },
]

// ── Payment Methods ───────────────────────────────────────────────────────────
const PAYMENTS = [
  { name: 'EasyPaisa', color: '#00d4ff', emoji: '📱', desc: 'براہ راست ادائیگی' },
  { name: 'JazzCash', color: '#00d4ff', emoji: '💸', desc: 'براہ راست ادائیگی' },
  { name: 'Bank Transfer', color: '#00d4ff', emoji: '🏦', desc: 'تمام بینک قابل قبول' },
  { name: 'Cash on Delivery', color: '#00d4ff', emoji: '💰', desc: 'گھر پر ادائیگی' },
]

// ── Trust Badges ──────────────────────────────────────────────────────────────
const BADGES = [
  { icon: '✅', text: 'ایک بار ادائیگی، ہمیشہ کے لیے ملکیت' },
  { icon: '✅', text: 'براہ راست مقامی ادائیگی کی سہولت' },
  { icon: '✅', text: '24/7 سپورٹ اور ٹریننگ' },
  { icon: '✅', text: '3–10 دن میں لائیو اسٹور' },
  { icon: '✅', text: 'آپ کے اپنے Vercel & Supabase اکاؤنٹ پر' },
]

// ── Key Selling Points ────────────────────────────────────────────────────────
const SELLING_POINTS = [
  {
    icon: '🏠',
    title: 'اونر شپ ماڈل',
    desc: 'ایک بار ادائیگی کریں اور ہمیشہ کے لیے اپنے اسٹور کے مالک بنیں۔ کوئی کرایہ نہیں، کوئی سبسکرپشن نہیں۔',
  },
  {
    icon: '🚫',
    title: 'کوئی ماہانہ فیس نہیں',
    desc: 'شاپائف یا سلہ کی طرح ہر ماہ پیسے دینے کی ضرورت نہیں۔ ایک بار خرچ کریں، ہمیشہ چلائیں۔',
  },
  {
    icon: '⚡',
    title: 'فوری سیٹ اپ',
    desc: 'آپ کا اسٹور 3 سے 10 دنوں میں لائیو ہو جائے گا۔ ہم سب کچھ سیٹ اپ کرتے ہیں — آپ بس بیچیں۔',
  },
]

// ── FAQs ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'پاکستان میں EasyPaisa اور JazzCash سے ادائیگی کیسے ہوگی؟',
    a: 'گاہک آپ کو براہ راست EasyPaisa، JazzCash یا بینک ٹرانسفر سے پیسے بھیجیں گے۔ یہ سب سے آسان اور قابل اعتماد طریقہ ہے — کوئی تھرڈ پارٹی گیٹ وے نہیں، کوئی اضافی فیس نہیں۔',
  },
  {
    q: 'کیا Shopify پاکستان میں ٹھیک کام کرتا ہے؟',
    a: 'Shopify کے ساتھ سب سے بڑا مسئلہ ماہانہ فیس اور پاکستانی پیمنٹ میتھڈز کی کمی ہے۔ ماہانہ فیس ₨8,000 سے شروع ہوتی ہے اور EasyPaisa/JazzCash کی کوئی آفیشل سہولت نہیں۔ ہم یہ تمام مسائل حل کرتے ہیں۔',
  },
  {
    q: 'آرڈر مینجمنٹ کیسے کام کرے گی؟',
    a: 'آپ کو ایک آسان ڈیش بورڈ ملے گا جہاں تمام آرڈر نظر آئیں گے۔ گاہک آرڈر کریں، پیمنٹ براہ راست آپ کو ملے، آپ خود ڈیلیور کریں۔ سب کچھ آپ کے کنٹرول میں۔',
  },
  {
    q: 'اپنے اسٹور کی ادائیگی کیسے کریں اور کتنے دن میں مکمل ہوگا؟',
    a: 'آپ EasyPaisa، JazzCash یا بینک ٹرانسفر سے ادائیگی کر سکتے ہیں۔ سادہ اسٹور 3–5 دن میں، پرو اسٹور 7–10 دن میں مکمل ہوتا ہے۔',
  },
  {
    q: 'کیا ہوگا اگر مجھے بعد میں مدد چاہیے ہو؟',
    a: 'ہر پیکج کے ساتھ سپورٹ شامل ہے۔ WhatsApp پر 24/7 دستیاب ہیں۔ ٹریننگ ویڈیوز بھی دیتے ہیں تاکہ آپ خود بھی پروڈکٹس اپ ڈیٹ کر سکیں۔',
  },
]

// ══════════════════════════════════════════════════════════════════════════════
// Component
// ══════════════════════════════════════════════════════════════════════════════

export default function UrduStoreClient() {
  const [typedIdx, setTypedIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [charIdx, setCharIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Typewriter cycling through multiple texts
  useEffect(() => {
    const currentText = TYPING_TEXTS[typedIdx]
    if (charIdx < currentText.length) {
      const t = setTimeout(() => {
        setTyped(currentText.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, 45)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setTyped('')
        setCharIdx(0)
        setTypedIdx((i) => (i + 1) % TYPING_TEXTS.length)
      }, 2200)
      return () => clearTimeout(t)
    }
  }, [charIdx, typedIdx])

  const toggleFaq = useCallback(
    (i: number) => setOpenFaq((prev) => (prev === i ? null : i)),
    []
  )

  return (
    <div className="urdu-page" dir="rtl" lang="ur">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="hero-section relative flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 overflow-hidden">
        {/* Dark glow blobs — matching Arabic page */}
        <div aria-hidden className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(0,212,255,0.05)' }} />
        <div aria-hidden className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(122,92,255,0.05)' }} />

        {/* Logo */}
        <div className="animate-float mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="MakeMyStore - Custom Ecommerce Solutions"
            width={130}
            height={130}
            fetchPriority="high"
            decoding="async"
            className="mx-auto rounded-2xl object-contain"
            style={{ mixBlendMode: 'lighten', filter: 'drop-shadow(0 0 20px rgba(122,92,255,0.4))' }}
          />
        </div>

        {/* Badge */}
        <p className="hero-badge mb-6">
          🇵🇰 پاکستان کے لیے خصوصی — براہ راست مقامی ادائیگی
        </p>

        {/* Headline */}
        <h1 className="urdu-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.6] max-w-3xl mx-auto text-white">
          ماہانہ فیس کو خیرباد کہیں —{' '}
          <span className="text-gradient block mt-2">
            اپنا اسٹور خود مالک بنیں
          </span>
        </h1>

        {/* Sub */}
        <p className="urdu-body mt-6 text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-[1.9]">
          مقامی ادائیگیوں کی سہولت (EasyPaisa, JazzCash, Bank Transfer) کے ذریعے براہ راست ادائیگی —
          ایک بار ادائیگی، ہمیشہ کی ملکیت۔
        </p>

        {/* Typewriter */}
        <p className="typewriter-line mt-7 text-sm sm:text-base font-bold min-h-[24px]">
          {typed}
          <span className="animate-pulse ml-1" aria-hidden>|</span>
        </p>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          {BADGES.map((b, i) => (
            <span key={i} className="badge-item">
              {b.icon} {b.text}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cta-whatsapp">
            💬 واٹس ایپ پر آرڈر کریں
          </a>
          <Link href="/contact" className="cta-secondary">
            فری مشاورت لیں ←
          </Link>
        </div>

        {/* Free tier note */}
        <p className="mt-8 text-xs sm:text-sm text-gray-500 max-w-md mx-auto urdu-body leading-relaxed">
          💡 زیادہ تر کلائنٹس Vercel اور Supabase کے{' '}
          <strong className="text-gray-300">مفت پلان</strong> پر چلتے ہیں —
          یعنی ہر مہینے ₨0 خرچ!
        </p>
      </section>

      {/* ── PAYMENT METHODS ───────────────────────────────────────────────── */}
      <section className="section-wrapper">
        <div className="section-inner">
          <div className="section-label">پیمنٹ میتھڈز</div>
          <h2 className="section-heading">
            پاکستانی گاہکوں کی{' '}
            <span className="text-gradient">پسندیدہ پیمنٹ</span> — سب موجود ہیں
          </h2>
          <p className="section-sub">
            Shopify میں Stripe لگانا پاکستان میں تقریباً ناممکن ہے۔ ہم وہ پیمنٹ لگاتے ہیں جو آپ کے گاہک روزانہ استعمال کرتے ہیں۔
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {PAYMENTS.map((p) => (
              <div key={p.name} className="glass-card rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-[#00d4ff]/40 transition-all">
                <span className="text-4xl">{p.emoji}</span>
                <span className="font-bold text-sm" style={{ color: p.color, fontFamily: 'Syne, sans-serif' }}>{p.name}</span>
                <span className="urdu-body text-gray-400 text-xs">{p.desc}</span>
              </div>
            ))}
          </div>

          <p className="urdu-body mt-8 text-sm text-gray-500 max-w-lg mx-auto leading-[2]">
            گاہک آپ کو براہ راست پیسے بھیجیں گے — کوئی درمیانی گیٹ وے نہیں، کوئی اضافی فیس نہیں۔
          </p>
        </div>
      </section>

      {/* ── ORDER MANAGEMENT ──────────────────────────────────────────────── */}
      <section className="section-wrapper alt-bg">
        <div className="section-inner">
          <div className="section-label">آرڈر مینجمنٹ</div>
          <h2 className="section-heading">
            آسان <span className="text-gradient">آرڈر مینجمنٹ</span> — سب کچھ آپ کے ہاتھ میں
          </h2>
          <p className="section-sub">
            کوئی پیچیدہ سسٹم نہیں۔ آرڈر آئے، پیمنٹ ملے، آپ ڈیلیور کریں — اتنا آسان۔
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { icon: '📋', title: 'آرڈر ڈیش بورڈ', desc: 'تمام آرڈر ایک جگہ' },
              { icon: '💬', title: 'WhatsApp نوٹیفکیشن', desc: 'فوری آرڈر الرٹ' },
              { icon: '📦', title: 'اسٹاک مینجمنٹ', desc: 'پروڈکٹ اپ ڈیٹ آسانی سے' },
              { icon: '📊', title: 'سیلز رپورٹ', desc: 'روزانہ کی رپورٹ' },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-[#00d4ff]/40 transition-all">
                <span className="text-4xl">{item.icon}</span>
                <span className="urdu-heading font-bold text-sm text-white">{item.title}</span>
                <span className="urdu-body text-gray-400 text-xs">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────────────── */}
      <section className="section-wrapper">
        <div className="section-inner">
          <div className="section-label">موازنہ</div>
          <h2 className="section-heading">
            Shopify / Wix بمقابلہ{' '}
            <span className="text-gradient">MakeMyStore</span>
          </h2>
          <p className="section-sub">
            خاص طور پر پاکستان کے حوالے سے فرق دیکھیں
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mt-10">
            <table className="w-full text-sm" role="table" aria-label="Shopify vs MakeMyStore comparison">
              <thead>
                <tr className="bg-white/5 text-center">
                  <th className="p-4 text-gray-400 text-right urdu-heading font-bold">فیچر</th>
                  <th className="p-4 text-gray-400 urdu-heading font-bold">Shopify / Wix</th>
                  <th className="p-4 text-[#00d4ff] urdu-heading font-bold">MakeMyStore ✨</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-t border-white/5 text-center hover:bg-white/[0.02]">
                    <td className="p-4 text-white font-semibold text-right urdu-body">{row.feature}</td>
                    <td className="p-4 text-gray-500 urdu-body">{row.shopify}</td>
                    <td className="p-4 text-[#00d4ff] font-bold urdu-body">{row.mms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── KEY SELLING POINTS + PRICING BUTTON ──────────────────────────── */}
      <section className="section-wrapper alt-bg">
        <div className="section-inner">
          <div className="section-label">ہمارا ماڈل</div>
          <h2 className="section-heading">
            کیوں <span className="text-gradient">MakeMyStore</span> بہترین انتخاب ہے؟
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {SELLING_POINTS.map((sp) => (
              <div key={sp.title} className="glass-card rounded-2xl p-6 hover:border-[#00d4ff]/40 transition-all">
                <div className="text-3xl mb-4">{sp.icon}</div>
                <div className="urdu-heading font-bold text-white text-base mb-2">{sp.title}</div>
                <div className="urdu-body text-gray-400 text-sm leading-relaxed">{sp.desc}</div>
              </div>
            ))}
          </div>

          {/* Pricing Button */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="urdu-body text-sm text-gray-500">
              قیمتیں دیکھنے کے لیے نیچے کلک کریں
            </p>
            <Link href="/pricing" className="btn-primary text-sm px-8 py-4 rounded-xl font-bold urdu-body">
              💰 قیمتیں دیکھنے کے لیے یہاں کلک کریں
            </Link>
            <p className="urdu-body text-xs text-gray-500 mt-2">
              یا سیدھا WhatsApp کریں — ہم آپ کے بجٹ کے مطابق پلان بتائیں گے
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="section-wrapper">
        <div className="section-inner">
          <div className="section-label">طریقہ کار</div>
          <h2 className="section-heading">
            صرف <span className="text-gradient">4 آسان مراحل</span> میں آپ کا اسٹور تیار
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { num: '۱', title: 'واٹس ایپ پر رابطہ کریں', desc: 'اپنی ضرورت بتائیں — پیکج سیلیکٹ کریں' },
              { num: '۲', title: 'EasyPaisa / JazzCash سے ادائیگی', desc: 'آسان مقامی پیمنٹ — کوئی بین الاقوامی کارڈ نہیں چاہیے' },
              { num: '۳', title: 'ہم بناتے ہیں — آپ دیکھتے ہیں', desc: '3–10 دن میں مکمل ری ویو اور فیڈ بیک' },
              { num: '۴', title: 'لائیو اور ٹریننگ', desc: 'اسٹور لانچ + آپ خود چلانا سیکھیں' },
            ].map((s) => (
              <div key={s.num} className="glass-card rounded-2xl p-6 text-center hover:border-[#00d4ff]/40 transition-all">
                <div className="step-num mx-auto mb-4">{s.num}</div>
                <div className="urdu-heading font-bold text-white text-sm mb-2">{s.title}</div>
                <div className="urdu-body text-gray-400 text-xs leading-[2.1]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="section-wrapper alt-bg">
        <div className="section-inner max-w-2xl">
          <div className="section-label">عام سوالات</div>
          <h2 className="section-heading">
            اکثر پوچھے جانے والے{' '}
            <span className="text-gradient">سوالات</span>
          </h2>

          <div className="space-y-4 mt-10">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden transition-all hover:border-[#00d4ff]/30">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex justify-between items-center gap-3 p-5 text-right bg-transparent border-none cursor-pointer text-white urdu-heading font-semibold text-base leading-[1.8]"
                  aria-expanded={openFaq === i}
                >
                  <span className={`faq-icon text-[#00d4ff] text-xs flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                  <span>{faq.q}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-3 urdu-body text-gray-400 text-sm text-right leading-[2.2] border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="section-wrapper py-24 text-center">
        <div className="section-inner">
          <h2 className="urdu-heading text-3xl sm:text-4xl font-bold leading-[1.6] text-white">
            آج ہی شروع کریں —{' '}
            <span className="text-gradient">آپ کا اسٹور آپ کا انتظار کر رہا ہے</span>
          </h2>
          <p className="urdu-body mt-5 text-gray-400 text-base max-w-lg mx-auto leading-[1.9]">
            مفت مشاورت کے لیے ابھی WhatsApp کریں۔ کوئی چھپی فیس نہیں، کوئی ماہانہ چارج نہیں۔
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-whatsapp"
            >
              💬 ابھی واٹس ایپ کریں ← 0329-3943161
            </a>
            <Link
              href="/contact"
              className="text-sm px-8 py-3.5 rounded-xl font-bold border border-white/20 text-white/80 hover:text-white hover:border-[#00d4ff]/50 transition-all urdu-body"
            >
              فری مشاورت لیں
            </Link>
          </div>
        </div>

        {/* Hidden SEO block */}
        <div className="sr-only">
          <h2>Pakistan EasyPaisa JazzCash Ecommerce Store Builder</h2>
          <p>
            MakeMyStore provides custom ecommerce websites for Pakistani small businesses with
            EasyPaisa integration, JazzCash payment gateway, Cash on Delivery, Leopard Courier,
            TCS courier, and Trax courier integration. One-time fee, no monthly subscription,
            full ownership on your own Vercel and Supabase account. Alternative to Shopify for
            Pakistan with local payment methods.
          </p>
        </div>
      </section>

      {/* ── STYLES ────────────────────────────────────────────────────────── */}
      <style jsx>{`
        /* ── Google Fonts ─────────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Gulzar&display=swap');

        /* ── Base ─────────────────────────────────────────────────── */
        .urdu-page {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          background: #0b0f1a;
          color: #e2e8f0;
          min-height: 100vh;
        }

        /* ── Urdu Typography ──────────────────────────────────────── */
        .urdu-heading {
          font-family: 'Noto Nastaliq Urdu', 'Gulzar', serif;
          line-height: 1.7;
        }
        .urdu-body {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          line-height: 2.2;
          font-size: 16px;
        }

        /* ── Hero ─────────────────────────────────────────────────── */
        .hero-section {
          background: #0b0f1a;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* ── Gradient Text — cyan matching Arabic page ────────────── */
        .text-gradient {
          background: linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Hero badge ───────────────────────────────────────────── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 212, 255, 0.08);
          border: 1px solid rgba(0, 212, 255, 0.25);
          color: #00d4ff;
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 13px;
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          letter-spacing: 0.01em;
        }

        /* ── Typewriter ───────────────────────────────────────────── */
        .typewriter-line {
          color: #00d4ff;
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          letter-spacing: 0.02em;
        }

        /* ── Trust badges ─────────────────────────────────────────── */
        .badge-item {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          transition: all 0.2s;
        }
        .badge-item:hover {
          border-color: rgba(0,212,255,0.3);
          background: rgba(0,212,255,0.06);
          color: #fff;
        }

        /* ── WhatsApp CTA ─────────────────────────────────────────── */
        .cta-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #25D366, #128C7E);
          color: white;
          font-weight: 700;
          font-size: 15px;
          padding: 14px 32px;
          border-radius: 14px;
          transition: all 0.2s;
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          box-shadow: 0 4px 20px rgba(37,211,102,0.25);
          text-decoration: none;
        }
        .cta-whatsapp:hover {
          transform: scale(1.04);
          box-shadow: 0 6px 28px rgba(37,211,102,0.4);
        }

        /* ── Secondary CTA ────────────────────────────────────────── */
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1.5px solid rgba(0,212,255,0.3);
          color: #00d4ff;
          font-weight: 600;
          font-size: 14px;
          padding: 13px 28px;
          border-radius: 14px;
          transition: all 0.2s;
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          text-decoration: none;
          background: rgba(0,212,255,0.06);
        }
        .cta-secondary:hover {
          background: rgba(0,212,255,0.12);
          border-color: rgba(0,212,255,0.5);
        }

        /* ── Primary btn (matching Arabic page btn-primary) ───────── */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%);
          color: #0b0f1a;
          font-weight: 700;
          padding: 14px 36px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(0,212,255,0.25);
        }
        .btn-primary:hover {
          transform: scale(1.04);
          box-shadow: 0 6px 28px rgba(0,212,255,0.4);
        }

        /* ── Sections ─────────────────────────────────────────────── */
        .section-wrapper {
          padding: 80px 16px;
          background: #0b0f1a;
        }
        .alt-bg {
          background: #0d1120;
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .section-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }

        /* ── Section label pill ───────────────────────────────────── */
        .section-label {
          display: inline-block;
          font-size: 11px;
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #00d4ff;
          border: 1px solid rgba(0,212,255,0.25);
          background: rgba(0,212,255,0.08);
          padding: 5px 16px;
          border-radius: 999px;
          margin-bottom: 20px;
        }

        /* ── Section heading ──────────────────────────────────────── */
        .section-heading {
          font-family: 'Noto Nastaliq Urdu', 'Gulzar', serif;
          font-size: clamp(22px, 4vw, 36px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.7;
          max-width: 700px;
          margin: 0 auto;
        }

        /* ── Section sub ──────────────────────────────────────────── */
        .section-sub {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          font-size: 17px;
          color: #94a3b8;
          max-width: 560px;
          margin: 14px auto 0;
          line-height: 2.2;
        }

        /* ── Glass card — matching Arabic page glass style ────────── */
        .glass-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset;
        }

        /* ── Step number circle ───────────────────────────────────── */
        .step-num {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(0,212,255,0.08);
          border: 1.5px solid rgba(0,212,255,0.25);
          color: #00d4ff;
          font-size: 22px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Noto Nastaliq Urdu', serif;
        }

        /* ── Float animation ──────────────────────────────────────── */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }

        /* ── Mobile tweaks ────────────────────────────────────────── */
        @media (max-width: 640px) {
          .section-wrapper { padding: 52px 16px; }
        }
      `}</style>
    </div>
  )
}
