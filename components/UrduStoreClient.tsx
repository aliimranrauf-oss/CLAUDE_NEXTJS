'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const WHATSAPP_URL =
  'https://wa.me/923293943161?text=اسلام%20علیکم،%20مجھے%20پاکستان%20میں%20اپنا%20آن%20لائن%20اسٹور%20بنوانا%20ہے'

const TYPING_TEXTS = [
  'براہ راست EasyPaisa & JazzCash ادائیگی ✓',
  'ایک بار ادائیگی — ہمیشہ کی ملکیت ✓',
  'کوئی ماہانہ فیس نہیں ✓',
  'No Monthly Fees — Ever ✓',
]

const COMPARISON = [
  { feature: 'ماہانہ فیس', shopify: '₨ 8,000–25,000/ماہ', mms: 'صفر — ایک بار ادائیگی' },
  { feature: 'مقامی ادائیگی (EasyPaisa/JazzCash)', shopify: '❌ آفیشل سپورٹ نہیں', mms: '✅ براہ راست ادائیگی' },
  { feature: 'Bank Transfer', shopify: '❌ پاکستانی بینک مسئلہ', mms: '✅ تمام بینک قابل قبول' },
  { feature: 'آرڈر مینجمنٹ', shopify: '❌ پیچیدہ اور مہنگا', mms: '✅ آسان ڈیش بورڈ' },
  { feature: 'ڈیٹا ملکیت', shopify: '❌ Shopify کا ڈیٹا', mms: '✅ آپ کا اپنا Supabase' },
  { feature: 'پلیٹ فارم لاک-ان', shopify: '❌ چھوڑنا مشکل', mms: '✅ آزاد — کوئی قید نہیں' },
  { feature: 'SEO کنٹرول', shopify: 'محدود', mms: '✅ مکمل Next.js SEO' },
]

const PAYMENTS = [
  { name: 'EasyPaisa', color: '#00a651', bg: '#e8f8ef', emoji: '📱', desc: 'براہ راست ادائیگی' },
  { name: 'JazzCash', color: '#c0392b', bg: '#fdecea', emoji: '💸', desc: 'براہ راست ادائیگی' },
  { name: 'Bank Transfer', color: '#1a56db', bg: '#eff6ff', emoji: '🏦', desc: 'تمام بینک قابل قبول' },
  { name: 'Cash on Delivery', color: '#b45309', bg: '#fffbeb', emoji: '💰', desc: 'گھر پر ادائیگی' },
]

const BADGES = [
  { icon: '✅', text: 'ایک بار ادائیگی، ہمیشہ کے لیے ملکیت' },
  { icon: '✅', text: 'براہ راست مقامی ادائیگی کی سہولت' },
  { icon: '✅', text: '24/7 سپورٹ اور ٹریننگ' },
  { icon: '✅', text: '3–10 دن میں لائیو اسٹور' },
  { icon: '✅', text: 'آپ کے اپنے Vercel & Supabase اکاؤنٹ پر' },
]

const SELLING_POINTS = [
  {
    icon: '🏠',
    title: 'اونر شپ ماڈل',
    desc: 'ایک بار ادائیگی کریں اور ہمیشہ کے لیے اپنے اسٹور کے مالک بنیں۔ کوئی کرایہ نہیں، کوئی سبسکرپشن نہیں۔',
    accent: '#4f46e5',
    bg: '#eef2ff',
    border: '#c7d2fe',
  },
  {
    icon: '🚫',
    title: 'کوئی ماہانہ فیس نہیں',
    desc: 'شاپائف یا سلہ کی طرح ہر ماہ پیسے دینے کی ضرورت نہیں۔ ایک بار خرچ کریں، ہمیشہ چلائیں۔',
    accent: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0',
  },
  {
    icon: '⚡',
    title: 'فوری سیٹ اپ',
    desc: 'آپ کا اسٹور 3 سے 10 دنوں میں لائیو ہو جائے گا۔ ہم سب کچھ سیٹ اپ کرتے ہیں — آپ بس بیچیں۔',
    accent: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
  },
]

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

export default function UrduStoreClient() {
  const [typedIdx, setTypedIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [charIdx, setCharIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-pattern" aria-hidden />
        <div className="hero-fade" aria-hidden />

        <div className="hero-inner">
          <div className="animate-float mb-8 relative z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="MakeMyStore - Custom Ecommerce Solutions"
              width={120}
              height={120}
              fetchPriority="high"
              decoding="async"
              className="mx-auto rounded-2xl object-contain logo-img"
            />
          </div>

          <div className="pk-badge">🇵🇰 پاکستان کے لیے خصوصی</div>

          <h1 className="hero-h1 urdu-heading">
            ماہانہ فیس کو خیرباد کہیں
            <span className="hero-accent block mt-3">اپنا اسٹور خود مالک بنیں</span>
          </h1>

          <p className="hero-sub urdu-body">
            مقامی ادائیگیوں کی سہولت (EasyPaisa, JazzCash, Bank Transfer) کے ذریعے براہ راست ادائیگی —
            ایک بار ادائیگی، ہمیشہ کی ملکیت۔
          </p>

          <div className="typewriter-box">
            <span className="typewriter-text">
              {typed}<span className="tw-cursor" aria-hidden>|</span>
            </span>
          </div>

          <div className="hero-ctas">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cta-whatsapp">
              💬 واٹس ایپ پر آرڈر کریں
            </a>
            <Link href="/contact" className="cta-outline">
              فری مشاورت لیں ←
            </Link>
          </div>

          <div className="trust-grid">
            {BADGES.map((b, i) => (
              <span key={i} className="trust-item">
                <span className="trust-check">✓</span> {b.text}
              </span>
            ))}
          </div>

          <p className="hero-footnote urdu-body">
            💡 زیادہ تر کلائنٹس Vercel اور Supabase کے <strong>مفت پلان</strong> پر چلتے ہیں — ہر مہینے ₨0 خرچ!
          </p>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="stats-strip">
        {[
          { num: '3–10', label: 'دن میں لائیو' },
          { num: '₨0', label: 'ماہانہ فیس' },
          { num: '100%', label: 'آپ کی ملکیت' },
          { num: '24/7', label: 'سپورٹ دستیاب' },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-num">{s.num}</span>
            <span className="stat-label urdu-body">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── PAYMENT METHODS ── */}
      <section className="sec-white">
        <div className="sec-inner">
          <div className="sec-eyebrow">پیمنٹ میتھڈز</div>
          <h2 className="sec-h2 urdu-heading">
            پاکستانی گاہکوں کی <span className="hl-blue">پسندیدہ پیمنٹ</span> — سب موجود ہیں
          </h2>
          <p className="sec-sub urdu-body">
            Shopify میں Stripe لگانا پاکستان میں تقریباً ناممکن ہے۔ ہم وہ پیمنٹ لگاتے ہیں جو آپ کے گاہک روزانہ استعمال کرتے ہیں۔
          </p>

          <div className="pay-grid">
            {PAYMENTS.map((p) => (
              <div key={p.name} className="pay-card" style={{ '--ac': p.color, '--bg': p.bg } as React.CSSProperties}>
                <div className="pay-icon-wrap" style={{ background: p.bg }}>
                  <span className="pay-emoji">{p.emoji}</span>
                </div>
                <span className="pay-name" style={{ color: p.color }}>{p.name}</span>
                <span className="pay-desc urdu-body">{p.desc}</span>
                <div className="pay-pill" style={{ background: p.bg, color: p.color }}>فعال</div>
              </div>
            ))}
          </div>

          <p className="sec-note urdu-body">
            گاہک آپ کو براہ راست پیسے بھیجیں گے — کوئی درمیانی گیٹ وے نہیں، کوئی اضافی فیس نہیں۔
          </p>
        </div>
      </section>

      {/* ── ORDER MANAGEMENT ── */}
      <section className="sec-indigo">
        <div className="sec-inner">
          <div className="sec-eyebrow-light">آرڈر مینجمنٹ</div>
          <h2 className="sec-h2-light urdu-heading">
            آسان آرڈر مینجمنٹ — سب کچھ آپ کے ہاتھ میں
          </h2>
          <p className="sec-sub-light urdu-body">
            کوئی پیچیدہ سسٹم نہیں۔ آرڈر آئے، پیمنٹ ملے، آپ ڈیلیور کریں — اتنا آسان۔
          </p>

          <div className="om-grid">
            {[
              { icon: '📋', title: 'آرڈر ڈیش بورڈ', desc: 'تمام آرڈر ایک جگہ' },
              { icon: '💬', title: 'WhatsApp نوٹیفکیشن', desc: 'فوری آرڈر الرٹ' },
              { icon: '📦', title: 'اسٹاک مینجمنٹ', desc: 'پروڈکٹ اپ ڈیٹ آسانی سے' },
              { icon: '📊', title: 'سیلز رپورٹ', desc: 'روزانہ کی رپورٹ' },
            ].map((item) => (
              <div key={item.title} className="om-card">
                <span className="om-emoji">{item.icon}</span>
                <span className="om-title urdu-heading">{item.title}</span>
                <span className="om-desc urdu-body">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="sec-white">
        <div className="sec-inner">
          <div className="sec-eyebrow">موازنہ</div>
          <h2 className="sec-h2 urdu-heading">
            Shopify / Wix بمقابلہ <span className="hl-blue">MakeMyStore</span>
          </h2>
          <p className="sec-sub urdu-body">خاص طور پر پاکستان کے حوالے سے فرق دیکھیں</p>

          <div className="tbl-wrap">
            <table className="cmp-table" role="table" aria-label="Shopify vs MakeMyStore comparison">
              <thead>
                <tr>
                  <th className="tbl-th th-feat">فیچر</th>
                  <th className="tbl-th th-shopify">Shopify / Wix</th>
                  <th className="tbl-th th-mms">MakeMyStore ✨</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
                    <td className="td-feat urdu-body">{row.feature}</td>
                    <td className="td-bad urdu-body">{row.shopify}</td>
                    <td className="td-good urdu-body">{row.mms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── WHY MMS ── */}
      <section className="sec-slate">
        <div className="sec-inner">
          <div className="sec-eyebrow">ہمارا ماڈل</div>
          <h2 className="sec-h2 urdu-heading">
            کیوں <span className="hl-blue">MakeMyStore</span> بہترین انتخاب ہے؟
          </h2>

          <div className="sp-grid">
            {SELLING_POINTS.map((sp) => (
              <div key={sp.title} className="sp-card" style={{ '--sp-bg': sp.bg, '--sp-bd': sp.border, '--sp-ac': sp.accent } as React.CSSProperties}>
                <div className="sp-icon-ring" style={{ background: sp.bg, borderColor: sp.border }}>
                  <span className="sp-icon">{sp.icon}</span>
                </div>
                <h3 className="sp-title urdu-heading" style={{ color: sp.accent }}>{sp.title}</h3>
                <p className="sp-desc urdu-body">{sp.desc}</p>
              </div>
            ))}
          </div>

          <div className="pricing-cta-wrap">
            <p className="urdu-body pricing-note">قیمتیں دیکھنے کے لیے نیچے کلک کریں</p>
            <Link href="/pricing" className="pricing-btn">
              💰 قیمتیں دیکھنے کے لیے یہاں کلک کریں
            </Link>
            <p className="urdu-body pricing-sub">یا سیدھا WhatsApp کریں — ہم آپ کے بجٹ کے مطابق پلان بتائیں گے</p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="sec-white">
        <div className="sec-inner">
          <div className="sec-eyebrow">طریقہ کار</div>
          <h2 className="sec-h2 urdu-heading">
            صرف <span className="hl-blue">4 آسان مراحل</span> میں آپ کا اسٹور تیار
          </h2>

          <div className="steps-row">
            {[
              { num: '۱', title: 'واٹس ایپ پر رابطہ کریں', desc: 'اپنی ضرورت بتائیں — پیکج سیلیکٹ کریں', color: '#4f46e5' },
              { num: '۲', title: 'EasyPaisa / JazzCash سے ادائیگی', desc: 'آسان مقامی پیمنٹ — کوئی بین الاقوامی کارڈ نہیں چاہیے', color: '#059669' },
              { num: '۳', title: 'ہم بناتے ہیں — آپ دیکھتے ہیں', desc: '3–10 دن میں مکمل ری ویو اور فیڈ بیک', color: '#d97706' },
              { num: '۴', title: 'لائیو اور ٹریننگ', desc: 'اسٹور لانچ + آپ خود چلانا سیکھیں', color: '#dc2626' },
            ].map((s) => (
              <div key={s.num} className="step-card">
                <div className="step-num" style={{ background: s.color, boxShadow: `0 6px 18px ${s.color}50` }}>
                  {s.num}
                </div>
                <h3 className="step-title urdu-heading" style={{ color: s.color }}>{s.title}</h3>
                <p className="step-desc urdu-body">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec-indigo">
        <div className="sec-inner faq-inner">
          <div className="sec-eyebrow-light">عام سوالات</div>
          <h2 className="sec-h2-light urdu-heading">اکثر پوچھے جانے والے سوالات</h2>

          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'faq-open' : ''}`}>
                <button
                  onClick={() => toggleFaq(i)}
                  className="faq-q urdu-heading"
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className={`faq-chevron ${openFaq === i ? 'open' : ''}`}>▾</span>
                </button>
                {openFaq === i && (
                  <div className="faq-a urdu-body">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta-sec">
        <div className="final-pattern" aria-hidden />
        <div className="sec-inner text-center" style={{ position: 'relative', zIndex: 10 }}>
          <h2 className="final-h2 urdu-heading">
            آج ہی شروع کریں —
            <span className="final-accent block mt-2">آپ کا اسٹور آپ کا انتظار کر رہا ہے</span>
          </h2>
          <p className="final-sub urdu-body">
            مفت مشاورت کے لیے ابھی WhatsApp کریں۔ کوئی چھپی فیس نہیں، کوئی ماہانہ چارج نہیں۔
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cta-whatsapp cta-lg">
            💬 ابھی واٹس ایپ کریں → 0329-3943161
          </a>
        </div>

        <div className="sr-only">
          <h2>Pakistan EasyPaisa JazzCash Ecommerce Store Builder</h2>
          <p>MakeMyStore provides custom ecommerce websites for Pakistani small businesses with EasyPaisa integration, JazzCash payment gateway, Cash on Delivery. One-time fee, no monthly subscription, full ownership on your own Vercel and Supabase account. Alternative to Shopify for Pakistan with local payment methods.</p>
        </div>
      </section>

      {/* ── STYLES ── */}
      <style jsx>{`
        .urdu-heading { font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif; line-height: 1.7; }
        .urdu-body    { font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif; line-height: 2.1; }
        .urdu-page    { background: #ffffff; color: #1e293b; }

        /* ── HERO ── */
        .hero-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%);
          padding: 100px 16px 80px;
          text-align: center;
        }
        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .hero-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 90px;
          background: linear-gradient(to top, #fff 0%, transparent 100%);
        }
        .hero-inner { position: relative; z-index: 10; max-width: 820px; margin: 0 auto; }
        .logo-img { filter: drop-shadow(0 12px 32px rgba(99,102,241,0.45)); }

        .pk-badge {
          display: inline-block;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.25);
          color: #e0e7ff;
          padding: 7px 20px;
          border-radius: 999px;
          font-size: 13px;
          font-family: sans-serif;
          margin-bottom: 24px;
        }
        .hero-h1 {
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.4;
        }
        .hero-accent {
          background: linear-gradient(135deg, #a5f3fc, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub { color: rgba(255,255,255,0.75); font-size: 17px; max-width: 560px; margin: 20px auto 0; }

        .typewriter-box {
          margin: 24px auto 0;
          display: inline-block;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          padding: 10px 24px;
        }
        .typewriter-text {
          color: #a5f3fc;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .tw-cursor { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .hero-ctas {
          margin-top: 32px;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          align-items: center;
        }
        .trust-grid {
          margin-top: 32px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .trust-item {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          color: #e0e7ff;
          padding: 7px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-family: 'Gulzar','Noto Nastaliq Urdu',serif;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .trust-check { color: #34d399; font-weight: 700; }
        .hero-footnote { color: rgba(255,255,255,0.48); font-size: 13px; margin-top: 24px; }
        .hero-footnote strong { color: rgba(255,255,255,0.72); }

        /* ── CTAs ── */
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
          font-family: 'Syne',sans-serif;
          box-shadow: 0 4px 20px rgba(37,211,102,0.35);
          text-decoration: none;
        }
        .cta-whatsapp:hover { transform: scale(1.04); box-shadow: 0 8px 28px rgba(37,211,102,0.5); }
        .cta-lg { font-size: 17px; padding: 16px 44px; }
        .cta-outline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 2px solid rgba(255,255,255,0.35);
          color: white;
          font-weight: 600;
          font-size: 14px;
          padding: 13px 28px;
          border-radius: 14px;
          transition: all 0.2s;
          font-family: 'Syne',sans-serif;
          text-decoration: none;
          background: rgba(255,255,255,0.08);
        }
        .cta-outline:hover { background: rgba(255,255,255,0.16); border-color: rgba(255,255,255,0.55); }

        /* ── Stats strip ── */
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          background: #4f46e5;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 16px;
          border-left: 1px solid rgba(255,255,255,0.12);
        }
        .stat-item:last-child { border-right: 1px solid rgba(255,255,255,0.12); }
        .stat-num { font-size: 28px; font-weight: 800; color: #fff; font-family: sans-serif; line-height: 1; }
        .stat-label { font-size: 14px; color: #c7d2fe; margin-top: 6px; }

        /* ── Section shells ── */
        .sec-inner { max-width: 1100px; margin: 0 auto; padding: 0 16px; }
        .sec-white  { padding: 80px 16px; background: #ffffff; }
        .sec-slate  { padding: 80px 16px; background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
        .sec-indigo {
          padding: 80px 16px;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
        }

        /* Eyebrows */
        .sec-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-family: 'DM Sans',sans-serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #4f46e5;
          border: 1px solid #c7d2fe;
          background: #eef2ff;
          padding: 5px 16px;
          border-radius: 999px;
          margin-bottom: 18px;
        }
        .sec-eyebrow-light {
          display: inline-block;
          font-size: 11px;
          font-family: 'DM Sans',sans-serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a5b4fc;
          border: 1px solid rgba(165,180,252,0.35);
          background: rgba(165,180,252,0.1);
          padding: 5px 16px;
          border-radius: 999px;
          margin-bottom: 18px;
        }

        /* Section headings */
        .sec-h2 {
          font-size: clamp(22px,4vw,36px);
          font-weight: 700;
          color: #0f172a;
          line-height: 1.5;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }
        .sec-h2-light {
          font-size: clamp(22px,4vw,36px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.5;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }
        .sec-sub       { font-size: 17px; color: #64748b; max-width: 560px; margin: 14px auto 0; text-align: center; }
        .sec-sub-light { font-size: 17px; color: rgba(255,255,255,0.65); max-width: 560px; margin: 14px auto 0; text-align: center; }
        .sec-note      { font-size: 14px; color: #94a3b8; max-width: 480px; margin: 28px auto 0; text-align: center; }

        .hl-blue {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Payment cards ── */
        .pay-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
          gap: 16px;
          margin-top: 40px;
        }
        .pay-card {
          background: #fff;
          border: 2px solid #e2e8f0;
          border-radius: 20px;
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .pay-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--ac);
        }
        .pay-card:hover {
          border-color: var(--ac, #4f46e5);
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
        }
        .pay-icon-wrap { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .pay-emoji  { font-size: 28px; }
        .pay-name   { font-weight: 800; font-size: 15px; font-family: sans-serif; }
        .pay-desc   { font-size: 13px; color: #64748b; }
        .pay-pill   { font-size: 11px; font-weight: 700; padding: 3px 12px; border-radius: 999px; font-family: sans-serif; letter-spacing: 0.06em; }

        /* ── Order Management ── */
        .om-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px,1fr));
          gap: 16px;
          margin-top: 40px;
        }
        .om-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 18px;
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
          transition: all 0.25s;
        }
        .om-card:hover { background: rgba(255,255,255,0.14); transform: translateY(-4px); }
        .om-emoji { font-size: 32px; }
        .om-title { font-size: 15px; font-weight: 700; color: #fff; }
        .om-desc  { font-size: 13px; color: rgba(255,255,255,0.6); }

        /* ── Comparison table ── */
        .tbl-wrap {
          margin-top: 40px;
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .cmp-table { width: 100%; border-collapse: collapse; }
        .tbl-th    { padding: 16px 20px; font-size: 14px; font-weight: 700; font-family: 'Gulzar','Noto Nastaliq Urdu',serif; }
        .th-feat   { background: #f1f5f9; color: #0f172a; text-align: right; }
        .th-shopify{ background: #fff5f5; color: #9f1239; text-align: center; }
        .th-mms    { background: #eef2ff; color: #3730a3; text-align: center; }
        .tr-even td { background: #f8fafc; }
        .tr-odd  td { background: #ffffff; }
        .td-feat { padding: 14px 20px; text-align: right; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9; }
        .td-bad  { padding: 14px 20px; text-align: center; color: #dc2626; border-bottom: 1px solid #f1f5f9; }
        .td-good { padding: 14px 20px; text-align: center; color: #16a34a; font-weight: 700; border-bottom: 1px solid #f1f5f9; background: #f0fdf4; }

        /* ── Selling points ── */
        .sp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px,1fr));
          gap: 20px;
          margin-top: 40px;
        }
        .sp-card {
          background: var(--sp-bg, #eef2ff);
          border: 1.5px solid var(--sp-bd, #c7d2fe);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          transition: all 0.25s;
        }
        .sp-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
        .sp-icon-ring {
          width: 64px; height: 64px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .sp-icon  { font-size: 26px; }
        .sp-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
        .sp-desc  { font-size: 15px; color: #475569; }

        .pricing-cta-wrap {
          margin-top: 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .pricing-note { font-size: 14px; color: #94a3b8; }
        .pricing-sub  { font-size: 12px; color: #94a3b8; }
        .pricing-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          font-weight: 700;
          font-size: 16px;
          padding: 16px 40px;
          border-radius: 16px;
          text-decoration: none;
          font-family: 'Gulzar','Noto Nastaliq Urdu',serif;
          transition: all 0.2s;
          box-shadow: 0 6px 24px rgba(79,70,229,0.3);
        }
        .pricing-btn:hover { transform: scale(1.04); box-shadow: 0 10px 32px rgba(79,70,229,0.45); }

        /* ── Steps ── */
        .steps-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
          gap: 0;
          margin-top: 48px;
        }
        .step-card {
          padding: 32px 20px;
          text-align: center;
          border-right: 1px solid #e2e8f0;
        }
        .step-card:last-child { border-right: none; }
        .step-num {
          width: 56px; height: 56px;
          border-radius: 50%;
          color: white;
          font-size: 22px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          font-family: serif;
        }
        .step-title { font-size: 15px; font-weight: 700; margin-bottom: 10px; }
        .step-desc  { font-size: 14px; color: #64748b; line-height: 2; }

        /* ── FAQ ── */
        .faq-inner { max-width: 740px; }
        .faq-list  { margin-top: 40px; display: flex; flex-direction: column; gap: 12px; }
        .faq-item {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.2s;
        }
        .faq-open {
          background: rgba(255,255,255,0.13);
          border-color: rgba(165,180,252,0.5);
        }
        .faq-q {
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
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.8;
        }
        .faq-chevron { flex-shrink: 0; color: #a5b4fc; font-size: 18px; transition: transform 0.25s; display: inline-block; }
        .faq-chevron.open { transform: rotate(180deg); }
        .faq-a {
          padding: 4px 22px 18px;
          font-size: 15px;
          color: rgba(255,255,255,0.72);
          text-align: right;
          line-height: 2.2;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 14px;
        }

        /* ── Final CTA ── */
        .final-cta-sec {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
          padding: 100px 16px;
          text-align: center;
        }
        .final-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .final-h2 {
          font-size: clamp(26px, 4.5vw, 44px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.5;
          max-width: 700px;
          margin: 0 auto;
        }
        .final-accent {
          background: linear-gradient(135deg, #a5f3fc, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .final-sub {
          color: rgba(255,255,255,0.65);
          font-size: 17px;
          max-width: 500px;
          margin: 20px auto 32px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }

        @media (max-width: 640px) {
          .stats-strip { grid-template-columns: repeat(2,1fr); }
          .stat-item   { border: none; border-bottom: 1px solid rgba(255,255,255,0.12); }
          .sec-white, .sec-slate, .sec-indigo { padding: 56px 12px; }
          .step-card   { border-right: none; border-bottom: 1px solid #e2e8f0; }
          .step-card:last-child { border-bottom: none; }
          .tbl-th, .td-feat, .td-bad, .td-good { padding: 10px 10px; font-size: 12px; }
        }
      `}</style>

      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Gulzar&family=Jameel+Noori+Nastaleeq&display=swap');
      `}</style>
    </div>
  )
}
