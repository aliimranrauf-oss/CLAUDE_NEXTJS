'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_URL =
  'https://wa.me/923293943161?text=اسلام%20علیکم،%20مجھے%20پاکستان%20میں%20اپنا%20آن%20لائن%20اسٹور%20بنوانا%20ہے'

const TYPING_TEXTS = [
  'EasyPaisa & JazzCash Integration ✓',
  'Leopard • TCS • Trax Courier Ready ✓',
  'Cash on Delivery Built-in ✓',
  'No Monthly Fees — Ever ✓',
]

// ── Comparison Table Data ─────────────────────────────────────────────────────
const COMPARISON = [
  {
    feature: 'ماہانہ فیس',
    shopify: '₨ 8,000–25,000/ماہ',
    mms: 'صفر — ایک بار ادائیگی',
    mmsBetter: true,
  },
  {
    feature: 'مقامی پیمنٹ (EasyPaisa/JazzCash)',
    shopify: '❌ آفیشل سپورٹ نہیں',
    mms: '✅ مکمل انٹیگریشن',
    mmsBetter: true,
  },
  {
    feature: 'Stripe کارڈ پیمنٹ (پاکستان میں)',
    shopify: '❌ بینک اکاؤنٹ مسئلہ',
    mms: '✅ Bank Transfer + Stripe',
    mmsBetter: true,
  },
  {
    feature: 'Cash on Delivery (COD)',
    shopify: '❌ تھرڈ پارٹی ایپ چاہیے',
    mms: '✅ بلٹ ان',
    mmsBetter: true,
  },
  {
    feature: 'کوریئر انٹیگریشن',
    shopify: '❌ Leopard/TCS/Trax نہیں',
    mms: '✅ تمام کوریئر سپورٹ',
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
    shopify: 'محدود',
    mms: '✅ مکمل Next.js SEO',
    mmsBetter: true,
  },
]

// ── Payment Methods ───────────────────────────────────────────────────────────
const PAYMENTS = [
  { name: 'EasyPaisa', color: '#00a651', emoji: '📱', desc: 'موبائل والٹ' },
  { name: 'JazzCash', color: '#d0021b', emoji: '💸', desc: 'موبائل اکاؤنٹ' },
  { name: 'Bank Transfer', color: '#1a56db', emoji: '🏦', desc: 'تمام بینک' },
  { name: 'Cash on Delivery', color: '#f59e0b', emoji: '💰', desc: 'گھر پر ادائیگی' },
]

// ── Courier Partners ──────────────────────────────────────────────────────────
const COURIERS = [
  { name: 'Leopard Courier', emoji: '🐆', cities: '300+ شہر' },
  { name: 'TCS', emoji: '🚚', cities: 'ملک گیر نیٹ ورک' },
  { name: 'Trax', emoji: '📦', cities: 'سستا اور تیز' },
  { name: 'Swyft / Other', emoji: '⚡', cities: 'کسٹم انٹیگریشن' },
]

// ── Trust Badges ──────────────────────────────────────────────────────────────
const BADGES = [
  { icon: '✅', text: 'ایک بار ادائیگی، ہمیشہ کے لیے ملکیت' },
  { icon: '✅', text: 'مقامی پیمنٹ میتھڈز کا انٹیگریشن' },
  { icon: '✅', text: '24/7 سپورٹ اور ٹریننگ' },
  { icon: '✅', text: '3–10 دن میں لائیو اسٹور' },
  { icon: '✅', text: 'آپ کے اپنے Vercel & Supabase اکاؤنٹ پر' },
]

// ── Pricing Packages ──────────────────────────────────────────────────────────
const PACKAGES = [
  {
    name: 'اسٹارٹر',
    price: '$99',
    pkr: '≈ ₨ 27,000',
    features: [
      'کسٹم ڈیزائن اسٹور',
      'EasyPaisa + JazzCash',
      'Cash on Delivery',
      '1 کوریئر انٹیگریشن',
      'بیسک SEO سیٹ اپ',
      '1 ماہ سپورٹ',
    ],
    highlight: false,
  },
  {
    name: 'پرو',
    price: '$179',
    pkr: '≈ ₨ 49,000',
    features: [
      'سب کچھ اسٹارٹر میں +',
      'تمام کوریئر انٹیگریشن',
      'بینک ٹرانسفر گیٹ وے',
      'ایڈوانس SEO + بلاگ',
      'گوگل اینالیٹکس',
      '3 ماہ سپورٹ + ٹریننگ',
    ],
    highlight: true,
  },
  {
    name: 'کسٹم',
    price: 'بات چیت',
    pkr: 'آپ کے بجٹ کے مطابق',
    features: [
      'مکمل کسٹم فیچرز',
      'ERP / POS انٹیگریشن',
      'ملٹی وینڈر مارکیٹ پلیس',
      'کسٹم کوریئر API',
      'ڈیڈیکیٹڈ اکاؤنٹ منیجر',
      'لامحدود سپورٹ',
    ],
    highlight: false,
  },
]

// ── FAQs ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'کیا پاکستان میں EasyPaisa اور JazzCash انٹیگریشن ممکن ہے؟',
    a: 'جی بالکل! ہم آپ کے اسٹور میں EasyPaisa، JazzCash، بینک ٹرانسفر اور Cash on Delivery مکمل طور پر سیٹ اپ کرتے ہیں۔ گاہک آسانی سے اپنی پسند کی پیمنٹ کر سکتے ہیں۔',
  },
  {
    q: 'کیا Shopify پاکستان میں ٹھیک کام کرتا ہے؟',
    a: 'Shopify کے ساتھ سب سے بڑا مسئلہ Stripe کا ہے — پاکستانی بینک اکاؤنٹ سے Stripe سیٹ اپ کرنا انتہائی مشکل ہے۔ اس کے علاوہ ماہانہ فیس ₨8,000 سے شروع ہوتی ہے۔ ہم یہ تمام مسائل حل کرتے ہیں۔',
  },
  {
    q: 'Leopard یا TCS کوریئر انٹیگریشن کیسے کام کرتی ہے؟',
    a: 'آرڈر آتے ہی خودکار طور پر کوریئر بکنگ ہو جاتی ہے۔ ٹریکنگ نمبر گاہک کو SMS/WhatsApp پر مل جاتا ہے۔ آپ کو الگ سے کچھ نہیں کرنا پڑتا۔',
  },
  {
    q: 'ادائیگی کیسے کریں اور پروجیکٹ کتنے دن میں مکمل ہوگا؟',
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
      // Pause then move to next
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
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 overflow-hidden">
        {/* Background orbs */}
        <div aria-hidden className="orb orb-1" />
        <div aria-hidden className="orb orb-2" />

        {/* Badge */}
        <div className="hero-badge mb-6">
          🇵🇰 پاکستان کے لیے خصوصی — Local Payments + Courier Ready
        </div>

        {/* Headline */}
        <h1 className="urdu-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.4] max-w-3xl mx-auto text-white">
          ماہانہ فیس کو خیرباد کہیں —{' '}
          <span className="text-gradient block mt-2">
            اپنا اسٹور خود مالک بنیں
          </span>
        </h1>

        {/* Sub */}
        <p className="urdu-body mt-6 text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-[1.9]">
          پاکستان میں EasyPaisa، JazzCash، Bank Transfer اور Cash on Delivery
          کے ساتھ اپنا مکمل ای کامرس اسٹور بنائیں۔ ایک بار ادائیگی، ہمیشہ کی ملکیت۔
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
            فری مشاورت لیں →
          </Link>
        </div>

        {/* Free tier note */}
        <p className="mt-8 text-xs sm:text-sm text-white/35 max-w-md mx-auto urdu-body leading-relaxed">
          💡 زیادہ تر کلائنٹس Vercel اور Supabase کے{' '}
          <strong className="text-white/55">مفت پلان</strong> پر چلتے ہیں —
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
              <div key={p.name} className="payment-card">
                <span className="payment-emoji">{p.emoji}</span>
                <span className="payment-name" style={{ color: p.color }}>{p.name}</span>
                <span className="payment-desc">{p.desc}</span>
                <span className="payment-tick">✓ انٹیگریٹڈ</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURIER SECTION ───────────────────────────────────────────────── */}
      <section className="section-wrapper alt-bg">
        <div className="section-inner">
          <div className="section-label">کوریئر انٹیگریشن</div>
          <h2 className="section-heading">
            آرڈر آئے — خودکار{' '}
            <span className="text-gradient">کوریئر بکنگ</span> ہو جائے
          </h2>
          <p className="section-sub">
            پاکستانی سیلرز کے لیے کوریئر انٹیگریشن لازمی ہے۔ آرڈر آتے ہی سسٹم خود بخود بکنگ بنا دیتا ہے اور گاہک کو ٹریکنگ نمبر WhatsApp پر مل جاتا ہے۔
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {COURIERS.map((c) => (
              <div key={c.name} className="courier-card">
                <span className="courier-emoji">{c.emoji}</span>
                <span className="courier-name">{c.name}</span>
                <span className="courier-cities">{c.cities}</span>
              </div>
            ))}
          </div>

          <div className="courier-features mt-10">
            <div className="cf-item">📲 خودکار ٹریکنگ SMS / WhatsApp</div>
            <div className="cf-item">🏷️ آٹو لیبل پرنٹ</div>
            <div className="cf-item">📊 شپمنٹ ڈیش بورڈ</div>
            <div className="cf-item">↩️ Return Management</div>
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

          <div className="table-wrapper mt-10">
            <table className="comparison-table" role="table" aria-label="Shopify vs MakeMyStore comparison">
              <thead>
                <tr>
                  <th>فیچر</th>
                  <th>Shopify / Wix</th>
                  <th className="mms-col">MakeMyStore</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'row-even' : ''}>
                    <td className="feature-cell">{row.feature}</td>
                    <td className="competitor-cell">{row.shopify}</td>
                    <td className="mms-cell">{row.mms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section className="section-wrapper alt-bg">
        <div className="section-inner">
          <div className="section-label">قیمتیں</div>
          <h2 className="section-heading">
            شفاف قیمتیں —{' '}
            <span className="text-gradient">کوئی چھپی فیس نہیں</span>
          </h2>
          <p className="section-sub">
            ایک بار ادائیگی کریں، ہمیشہ کے لیے اسٹور آپ کا۔ EasyPaisa یا JazzCash سے ادا کریں۔
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} className={`pricing-card ${pkg.highlight ? 'pricing-highlight' : ''}`}>
                {pkg.highlight && <div className="popular-badge">🔥 مقبول ترین</div>}
                <div className="pkg-name urdu-heading">{pkg.name}</div>
                <div className="pkg-price">{pkg.price}</div>
                <div className="pkg-pkr">{pkg.pkr}</div>
                <ul className="pkg-features urdu-body">
                  {pkg.features.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className={`pkg-cta ${pkg.highlight ? 'pkg-cta-primary' : 'pkg-cta-outline'}`}>
                  واٹس ایپ پر شروع کریں
                </a>
              </div>
            ))}
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

          <div className="steps-grid mt-10">
            {[
              { num: '۱', title: 'واٹس ایپ پر رابطہ کریں', desc: 'اپنی ضرورت بتائیں — پیکج سیلیکٹ کریں' },
              { num: '۲', title: 'EasyPaisa / JazzCash سے ادائیگی', desc: 'آسان مقامی پیمنٹ — کوئی بین الاقوامی کارڈ نہیں چاہیے' },
              { num: '۳', title: 'ہم بناتے ہیں — آپ دیکھتے ہیں', desc: '3–10 دن میں مکمل ری ویو اور فیڈ بیک' },
              { num: '۴', title: 'لائیو اور ٹریننگ', desc: 'اسٹور لانچ + آپ خود چلانا سیکھیں' },
            ].map((s) => (
              <div key={s.num} className="step-card">
                <div className="step-num">{s.num}</div>
                <div className="step-title urdu-heading">{s.title}</div>
                <div className="step-desc urdu-body">{s.desc}</div>
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

          <div className="faq-list mt-10">
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => toggleFaq(i)}
                  className="faq-question urdu-heading"
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className={`faq-icon ${openFaq === i ? 'open' : ''}`}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="faq-answer urdu-body">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="section-wrapper final-cta-section">
        <div className="section-inner text-center">
          <h2 className="urdu-heading text-3xl sm:text-4xl font-bold text-white leading-[1.5]">
            آج ہی شروع کریں —{' '}
            <span className="text-gradient">آپ کا اسٹور آپ کا انتظار کر رہا ہے</span>
          </h2>
          <p className="urdu-body mt-5 text-gray-400 text-base max-w-lg mx-auto leading-[1.9]">
            مفت مشاورت کے لیے ابھی WhatsApp کریں۔ کوئی چھپی فیس نہیں، کوئی ماہانہ چارج نہیں۔
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-whatsapp mt-8 inline-block"
          >
            💬 ابھی واٹس ایپ کریں → 0329-3943161
          </a>

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
        </div>
      </section>

      {/* ── STYLES ────────────────────────────────────────────────────────── */}
      <style jsx>{`
        /* ── Fonts & Base ─────────────────────────────────────────── */
        .urdu-page {
          font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Nafees Web Naskh', serif;
        }
        .urdu-heading {
          font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif;
          line-height: 1.6;
        }
        .urdu-body {
          font-family: 'Noto Nastaliq Urdu', 'Nafees Web Naskh', serif;
          line-height: 2;
        }

        /* ── Orbs ─────────────────────────────────────────────────── */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb-1 {
          width: 400px; height: 400px;
          top: 10%; right: 5%;
          background: rgba(0, 212, 255, 0.05);
        }
        .orb-2 {
          width: 350px; height: 350px;
          top: 30%; left: 5%;
          background: rgba(122, 92, 255, 0.05);
        }

        /* ── Hero badge ───────────────────────────────────────────── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 212, 255, 0.08);
          border: 1px solid rgba(0, 212, 255, 0.2);
          color: #00d4ff;
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 13px;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          letter-spacing: 0.01em;
        }

        /* ── Typewriter ───────────────────────────────────────────── */
        .typewriter-line {
          color: #00d4ff;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          letter-spacing: 0.02em;
        }

        /* ── Badges ───────────────────────────────────────────────── */
        .badge-item {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.8);
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-family: serif;
        }

        /* ── CTAs ─────────────────────────────────────────────────── */
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
          font-family: var(--font-syne), 'Syne', sans-serif;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
          text-decoration: none;
        }
        .cta-whatsapp:hover {
          transform: scale(1.04);
          box-shadow: 0 6px 28px rgba(37, 211, 102, 0.45);
        }
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(0,212,255,0.3);
          color: #00d4ff;
          font-weight: 600;
          font-size: 14px;
          padding: 13px 28px;
          border-radius: 14px;
          transition: all 0.2s;
          font-family: var(--font-syne), 'Syne', sans-serif;
          text-decoration: none;
        }
        .cta-secondary:hover {
          background: rgba(0,212,255,0.07);
          border-color: rgba(0,212,255,0.5);
        }

        /* ── Sections ─────────────────────────────────────────────── */
        .section-wrapper {
          padding: 72px 16px;
        }
        .alt-bg {
          background: rgba(17, 24, 39, 0.4);
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .section-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }
        .section-label {
          display: inline-block;
          font-size: 11px;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #00d4ff;
          border: 1px solid rgba(0,212,255,0.2);
          background: rgba(0,212,255,0.06);
          padding: 5px 16px;
          border-radius: 999px;
          margin-bottom: 20px;
        }
        .section-heading {
          font-family: 'Noto Nastaliq Urdu', serif;
          font-size: clamp(22px, 4vw, 36px);
          font-weight: 700;
          color: white;
          line-height: 1.5;
          max-width: 700px;
          margin: 0 auto;
        }
        .section-sub {
          font-family: 'Noto Nastaliq Urdu', serif;
          font-size: 15px;
          color: rgba(255,255,255,0.5);
          max-width: 560px;
          margin: 14px auto 0;
          line-height: 2;
        }

        /* ── Payment cards ────────────────────────────────────────── */
        .payment-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transition: all 0.25s;
        }
        .payment-card:hover {
          border-color: rgba(0,212,255,0.2);
          background: rgba(0,212,255,0.04);
          transform: translateY(-4px);
        }
        .payment-emoji { font-size: 32px; }
        .payment-name { font-weight: 700; font-size: 14px; font-family: sans-serif; }
        .payment-desc { font-size: 12px; color: rgba(255,255,255,0.4); font-family: 'Noto Nastaliq Urdu', serif; }
        .payment-tick { font-size: 11px; color: #00d4ff; font-family: sans-serif; margin-top: 4px; }

        /* ── Courier cards ────────────────────────────────────────── */
        .courier-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 22px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transition: all 0.25s;
        }
        .courier-card:hover {
          border-color: rgba(122,92,255,0.25);
          background: rgba(122,92,255,0.05);
          transform: translateY(-4px);
        }
        .courier-emoji { font-size: 28px; }
        .courier-name { font-weight: 700; font-size: 13px; font-family: sans-serif; color: white; }
        .courier-cities { font-size: 12px; color: rgba(255,255,255,0.4); font-family: 'Noto Nastaliq Urdu', serif; }

        .courier-features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }
        .cf-item {
          background: rgba(122,92,255,0.08);
          border: 1px solid rgba(122,92,255,0.2);
          color: rgba(255,255,255,0.75);
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 13px;
          font-family: 'Noto Nastaliq Urdu', serif;
        }

        /* ── Comparison Table ─────────────────────────────────────── */
        .table-wrapper {
          overflow-x: auto;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .comparison-table thead tr {
          background: rgba(255,255,255,0.04);
        }
        .comparison-table th {
          padding: 16px 20px;
          text-align: center;
          font-family: 'Noto Nastaliq Urdu', serif;
          color: rgba(255,255,255,0.6);
          font-weight: 600;
          font-size: 13px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .comparison-table th:first-child { text-align: right; }
        .mms-col { color: #00d4ff !important; }
        .comparison-table td {
          padding: 14px 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-family: 'Noto Nastaliq Urdu', serif;
          color: rgba(255,255,255,0.7);
        }
        .row-even td { background: rgba(255,255,255,0.01); }
        .feature-cell {
          text-align: right !important;
          color: white !important;
          font-weight: 600;
        }
        .competitor-cell { color: rgba(255,100,100,0.85) !important; }
        .mms-cell { color: #4ade80 !important; font-weight: 600; }

        /* ── Pricing ──────────────────────────────────────────────── */
        .pricing-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          transition: all 0.25s;
        }
        .pricing-highlight {
          border-color: rgba(0,212,255,0.35);
          background: rgba(0,212,255,0.04);
          box-shadow: 0 0 40px rgba(0,212,255,0.08);
        }
        .popular-badge {
          position: absolute;
          top: -14px;
          background: linear-gradient(135deg, #00d4ff, #7a5cff);
          color: white;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 18px;
          border-radius: 999px;
          font-family: sans-serif;
        }
        .pkg-name { font-size: 20px; font-weight: 700; color: white; margin-bottom: 12px; }
        .pkg-price { font-size: 36px; font-weight: 800; color: #00d4ff; font-family: var(--font-syne), sans-serif; }
        .pkg-pkr { font-size: 12px; color: rgba(255,255,255,0.4); margin-bottom: 24px; font-family: sans-serif; }
        .pkg-features { list-style: none; text-align: right; width: 100%; margin-bottom: 28px; }
        .pkg-features li { padding: 7px 0; font-size: 13px; color: rgba(255,255,255,0.7); border-bottom: 1px solid rgba(255,255,255,0.04); }
        .pkg-cta {
          display: block;
          width: 100%;
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 13px;
          font-family: 'Noto Nastaliq Urdu', serif;
          text-decoration: none;
          transition: all 0.2s;
          text-align: center;
        }
        .pkg-cta-primary {
          background: linear-gradient(135deg, #00d4ff, #7a5cff);
          color: white;
        }
        .pkg-cta-primary:hover { opacity: 0.9; transform: scale(1.02); }
        .pkg-cta-outline {
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7);
        }
        .pkg-cta-outline:hover { border-color: rgba(0,212,255,0.3); color: #00d4ff; }

        /* ── Steps ────────────────────────────────────────────────── */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .step-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 28px 20px;
          text-align: center;
          transition: all 0.25s;
        }
        .step-card:hover {
          border-color: rgba(0,212,255,0.2);
          transform: translateY(-4px);
        }
        .step-num {
          width: 52px; height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff22, #7a5cff22);
          border: 1px solid rgba(0,212,255,0.25);
          color: #00d4ff;
          font-size: 22px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-family: serif;
        }
        .step-title { font-size: 15px; font-weight: 700; color: white; margin-bottom: 8px; }
        .step-desc { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.9; }

        /* ── FAQ ──────────────────────────────────────────────────── */
        .faq-list { display: flex; flex-direction: column; gap: 12px; }
        .faq-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          overflow: hidden;
        }
        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 18px 22px;
          text-align: right;
          background: none;
          border: none;
          cursor: pointer;
          color: white;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Noto Nastaliq Urdu', serif;
          line-height: 1.6;
        }
        .faq-icon {
          flex-shrink: 0;
          color: #00d4ff;
          font-size: 12px;
          transition: transform 0.2s;
        }
        .faq-icon.open { transform: rotate(180deg); }
        .faq-answer {
          padding: 0 22px 18px;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          text-align: right;
          line-height: 2;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 14px;
        }

        /* ── Final CTA ────────────────────────────────────────────── */
        .final-cta-section {
          background: radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%);
        }

        /* ── Mobile tweaks ────────────────────────────────────────── */
        @media (max-width: 640px) {
          .section-wrapper { padding: 52px 16px; }
          .comparison-table { font-size: 12px; }
          .comparison-table th, .comparison-table td { padding: 10px 12px; }
        }
      `}</style>

      {/* Noto Nastaliq Urdu font from Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap');
      `}</style>
    </div>
  )
}
