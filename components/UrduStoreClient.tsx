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
    mms: 'صفر — ایک بار ادائیگی',
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
    shopify: 'محدود',
    mms: '✅ مکمل Next.js SEO',
    mmsBetter: true,
  },
]

// ── Payment Methods ───────────────────────────────────────────────────────────
const PAYMENTS = [
  { name: 'EasyPaisa', color: '#00a651', emoji: '📱', desc: 'براہ راست ادائیگی' },
  { name: 'JazzCash', color: '#d0021b', emoji: '💸', desc: 'براہ راست ادائیگی' },
  { name: 'Bank Transfer', color: '#1a56db', emoji: '🏦', desc: 'تمام بینک قابل قبول' },
  { name: 'Cash on Delivery', color: '#f59e0b', emoji: '💰', desc: 'گھر پر ادائیگی' },
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

        {/* Logo */}
        <div className="animate-float mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="MakeMyStore - Custom Ecommerce Solutions"
            width={140}
            height={140}
            fetchPriority="high"
            decoding="async"
            className="mx-auto rounded-2xl object-contain"
            style={{
              mixBlendMode: 'lighten',
              filter: 'drop-shadow(0 0 20px rgba(122,92,255,0.4))',
            }}
          />
        </div>

        {/* Badge */}
        <div className="hero-badge mb-6">
          🇵🇰 پاکستان کے لیے خصوصی — براہ راست مقامی ادائیگی
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
              </div>
            ))}
          </div>

          <p className="urdu-body mt-8 text-sm text-white/40 max-w-lg mx-auto leading-[2]">
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
              <div key={item.title} className="courier-card">
                <span className="courier-emoji">{item.icon}</span>
                <span className="courier-name">{item.title}</span>
                <span className="courier-cities">{item.desc}</span>
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

      {/* ── KEY SELLING POINTS + PRICING BUTTON ──────────────────────────── */}
      <section className="section-wrapper alt-bg">
        <div className="section-inner">
          <div className="section-label">ہمارا ماڈل</div>
          <h2 className="section-heading">
            کیوں <span className="text-gradient">MakeMyStore</span> بہترین انتخاب ہے؟
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {SELLING_POINTS.map((sp) => (
              <div key={sp.title} className="step-card">
                <div className="step-num">{sp.icon}</div>
                <div className="step-title urdu-heading">{sp.title}</div>
                <div className="step-desc urdu-body">{sp.desc}</div>
              </div>
            ))}
          </div>

          {/* Pricing Button */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="urdu-body text-sm text-white/40">
              قیمتیں دیکھنے کے لیے نیچے کلک کریں
            </p>
            <Link
              href="/pricing"
              className="pricing-btn"
            >
              💰 قیمتیں دیکھنے کے لیے یہاں کلک کریں
            </Link>
            <p className="urdu-body text-xs text-white/30 mt-2">
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
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
        }
        .urdu-heading {
          font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif;
          line-height: 1.7;
        }
        .urdu-body {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          line-height: 2.2;
          font-size: 16px;
          color: rgba(255,255,255,0.75);
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
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          font-size: 17px;
          color: rgba(255,255,255,0.7);
          max-width: 560px;
          margin: 14px auto 0;
          line-height: 2.2;
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
        .payment-desc { font-size: 13px; color: rgba(255,255,255,0.65); font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif; }

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
        .courier-cities { font-size: 13px; color: rgba(255,255,255,0.65); font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif; }

        .courier-features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }
        .cf-item {
          background: rgba(122,92,255,0.08);
          border: 1px solid rgba(122,92,255,0.2);
          color: rgba(255,255,255,0.85);
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
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
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          color: rgba(255,255,255,0.8);
          font-weight: 600;
          font-size: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .comparison-table th:first-child { text-align: right; }
        .mms-col { color: #00d4ff !important; }
        .comparison-table td {
          padding: 14px 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          color: rgba(255,255,255,0.8);
          font-size: 14px;
        }
        .row-even td { background: rgba(255,255,255,0.01); }
        .feature-cell {
          text-align: right !important;
          color: white !important;
          font-weight: 600;
        }
        .competitor-cell { color: rgba(255,100,100,0.85) !important; }
        .mms-cell { color: #4ade80 !important; font-weight: 600; }

        /* ── Pricing Button ───────────────────────────────────────── */
        .pricing-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%);
          color: white;
          font-weight: 700;
          font-size: 17px;
          padding: 16px 40px;
          border-radius: 16px;
          text-decoration: none;
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          transition: all 0.2s;
          box-shadow: 0 4px 24px rgba(0,212,255,0.25);
        }
        .pricing-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 6px 32px rgba(0,212,255,0.4);
        }

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
        .step-desc { font-size: 14px; color: rgba(255,255,255,0.65); line-height: 2.1; font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif; }

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
          font-size: 16px;
          font-weight: 600;
          font-family: 'Noto Nastaliq Urdu', serif;
          line-height: 1.8;
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
          font-size: 15px;
          color: rgba(255,255,255,0.75);
          text-align: right;
          line-height: 2.2;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 14px;
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
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
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Gulzar&family=Jameel+Noori+Nastaleeq&display=swap');
      `}</style>
    </div>
  )
}
