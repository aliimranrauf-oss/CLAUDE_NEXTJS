import type { Metadata } from 'next'
import Link from 'next/link'
import { Code2, ShieldCheck, Zap, Clock, ArrowRight, Database, Globe, Wrench } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About MakeMyStore — Custom Next.js Ecommerce, You Own Everything',
  description:
    'MakeMyStore builds custom Next.js ecommerce stores with full source-code ownership. You keep your Vercel & Supabase accounts. Zero platform fees. One-time setup. Migrate from Shopify or Wix in days.',
  keywords: [
    'custom ecommerce store Pakistan',
    'Next.js ecommerce development',
    'Shopify migration',
    'Wix migration',
    'full ownership ecommerce',
    'self-hosted store Vercel Supabase',
    'no monthly fees ecommerce',
    'MakeMyStore',
  ],
  openGraph: {
    title: 'MakeMyStore — Own Your Store, Own Your Future',
    description:
      'Custom-coded Next.js ecommerce. One-time setup. Full code ownership. No platform fees ever. Hosted on your own Vercel & Supabase.',
    url: 'https://makemystore.dev/about',
    siteName: 'MakeMyStore',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MakeMyStore — Own Your Store, Own Your Future',
    description:
      'Custom Next.js ecommerce. One-time setup. Full code ownership. No platform fees. Hosted on your Vercel & Supabase.',
  },
  alternates: {
    canonical: 'https://makemystore.dev/about',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
}

const WHATSAPP_MSG = encodeURIComponent(
  "Hi Imran, I read the About page. I'm interested in the Ownership model and want to migrate my store/build a new one. Can you explain the Vercel/Supabase setup?"
)
const WHATSAPP_URL = `https://wa.me/923001234567?text=${WHATSAPP_MSG}` // ← replace number

export default function AboutPage() {
  const comparisonData = [
    {
      feature: 'Monthly subscription fee',
      shopify: 'From $39/mo',
      wix: 'From $17/mo',
      wordpress: 'From $10/mo',
      us: '$0 Platform Fee ✓',
      usColor: 'text-emerald-400',
    },
    {
      feature: 'Sales commission',
      shopify: 'Up to 2%',
      wix: '0%',
      wordpress: '0%',
      us: '0% ✓',
      usColor: 'text-emerald-400',
    },
    {
      feature: 'Source code ownership',
      shopify: '❌',
      wix: '❌',
      wordpress: '⚠️ Partial',
      us: '✅ Full (Private GitHub Repo)',
      usColor: 'text-emerald-400',
    },
    {
      feature: 'Hosting',
      shopify: '❌ Extra cost',
      wix: '❌ Extra cost',
      wordpress: '❌ Extra cost',
      us: '✅ Your Account (Free Tiers)',
      usColor: 'text-emerald-400',
    },
    {
      feature: '100% custom design',
      shopify: 'Limited templates',
      wix: 'Limited templates',
      wordpress: '⚠️ Theme dependent',
      us: '✅ Fully unique',
      usColor: 'text-emerald-400',
    },
    {
      feature: 'Stripe & PayPal',
      shopify: '✅ Stripe only',
      wix: '⚠️ Limited',
      wordpress: '⚠️ Plugin needed',
      us: '✅ Both ready',
      usColor: 'text-emerald-400',
    },
    {
      feature: 'Full SEO optimization',
      shopify: 'Basic',
      wix: 'Basic',
      wordpress: '⚠️ Plugin needed',
      us: '✅ Advanced',
      usColor: 'text-emerald-400',
    },
    {
      feature: 'Post-delivery support',
      shopify: '❌ Self-serve',
      wix: '❌ Self-serve',
      wordpress: '❌ Self-serve',
      us: '✅ 7 days included',
      usColor: 'text-emerald-400',
    },
    {
      feature: 'Platform lock-in',
      shopify: '🔒 Locked in',
      wix: '🔒 Locked in',
      wordpress: '⚠️ Partially',
      us: '✅ No lock-in',
      usColor: 'text-emerald-400',
    },
  ]

  const builtDifferent = [
    {
      icon: Code2,
      title: 'Custom Code, Zero Templates',
      desc: 'Every store is built from scratch with Next.js. No drag-and-drop limitations. Your brand gets a truly unique, high-performance foundation.',
    },
    {
      icon: ShieldCheck,
      title: 'Full Ownership & Control',
      desc: 'We deliver 100% of the source code to your private GitHub. We set up your store on your personal Vercel and Supabase accounts. You own the infrastructure; you are never at the mercy of a platform\'s price hikes.',
    },
    {
      icon: Zap,
      title: 'Performance-First Design',
      desc: 'Lightning-fast load times (Core Web Vitals 95+). Built for conversions, SEO, and mobile-first shopping experiences.',
    },
    {
      icon: Clock,
      title: 'Zero Time Investment',
      desc: 'You focus on products & marketing. We handle design, development, migration, launch, and 7 days of post-delivery support.',
    },
  ]

  const techStack = [
    {
      icon: Database,
      label: 'Database',
      name: 'Supabase (Your Account)',
      detail: 'Free tier covers up to 50,000 monthly active users. Your data, your keys, your control.',
      badge: 'Free Tier',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
    {
      icon: Globe,
      label: 'Frontend Hosting',
      name: 'Vercel (Your Account)',
      detail: 'Global Edge Network with 99.99% uptime. We deploy under your Vercel account — not ours.',
      badge: 'Global Edge',
      badgeColor: 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20',
    },
    {
      icon: Wrench,
      label: 'Maintenance Cost',
      name: 'Domain Renewal Only',
      detail: 'No hidden monthly maintenance fees. The only recurring cost you pay is your domain (~$10–15/yr).',
      badge: '~$10/yr',
      badgeColor: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    },
  ]

  return (
    <>
      <Navbar />

      <main className="pt-16 bg-[#0b0f1a]">

        {/* ─── HERO ─── */}
        <section className="relative py-20 md:py-24 overflow-hidden">
          {/* subtle radial glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[600px] h-[600px] rounded-full bg-[#00d4ff]/5 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-3xl px-6 py-2 text-sm font-medium mb-8">
                <span className="text-[#00d4ff]">✦</span>
                <span className="text-white">MAKE MY STORE</span>
              </div>

              <h1
                className="text-4xl sm:text-[42px] md:text-5xl font-bold leading-[1.15] max-w-3xl mx-auto mb-6"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                We Don&apos;t Just Build Stores.<br />
                <span className="text-gradient">We Build Scalable E-commerce Systems.</span>
              </h1>

              <p
                className="max-w-2xl text-base sm:text-lg text-gray-300 mb-10"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Custom-coded from scratch with Next.js, Vercel &amp; Supabase.<br />
                <strong className="text-white">One-time Setup. Full Code Ownership. Zero Platform Fees.</strong>
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="btn-primary text-base px-10 py-6 flex items-center gap-3 group"
                >
                  Get Your Custom Store
                  <ArrowRight className="group-active:translate-x-1 transition" />
                </Link>
                <a
                  href="#why-us"
                  className="glass text-white text-base px-10 py-6 flex items-center gap-3 hover:bg-white/10 transition"
                >
                  Why We&apos;re Different
                </a>
              </div>

              <p className="text-sm text-gray-400 mt-10 flex items-center gap-6">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                  100% custom • Migration from Shopify, Wix &amp; more
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ─── COMPARISON TABLE ─── */}
        <section id="why-us" className="py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2
                className="text-4xl font-bold mb-3"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Why We Are Different
              </h2>
              <p
                className="text-gray-400 max-w-md mx-auto text-base"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Most platforms lock you in with monthly fees.<br />
                We give you a real business asset.
              </p>
            </div>

            {/* Desktop table */}
            <div className="glass rounded-3xl p-2 shadow-2xl overflow-x-auto hidden sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-7 px-8 font-semibold text-gray-400">Feature</th>
                    <th className="text-center py-7 px-4 font-semibold text-[#ff3b5f]">Shopify</th>
                    <th className="text-center py-7 px-4 font-semibold text-[#00b4ff]">Wix</th>
                    <th className="text-center py-7 px-4 font-semibold text-[#21759b]">WordPress</th>
                    <th className="text-center py-7 px-4 font-semibold text-gradient">MakeMyStore</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-5 px-8 font-medium">{row.feature}</td>
                      <td className="text-center py-5 px-4 text-gray-400">{row.shopify}</td>
                      <td className="text-center py-5 px-4 text-gray-400">{row.wix}</td>
                      <td className="text-center py-5 px-4 text-gray-400">{row.wordpress}</td>
                      <td className={`text-center py-5 px-4 font-semibold ${row.usColor}`}>
                        {row.us}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden space-y-4">
              {comparisonData.map((row, i) => (
                <div key={i} className="glass rounded-2xl p-5">
                  <p className="font-semibold text-white mb-3">{row.feature}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#ff3b5f] font-semibold block mb-0.5">Shopify</span>
                      <span className="text-gray-400">{row.shopify}</span>
                    </div>
                    <div>
                      <span className="text-[#00b4ff] font-semibold block mb-0.5">Wix</span>
                      <span className="text-gray-400">{row.wix}</span>
                    </div>
                    <div>
                      <span className="text-[#21759b] font-semibold block mb-0.5">WordPress</span>
                      <span className="text-gray-400">{row.wordpress}</span>
                    </div>
                    <div>
                      <span className="text-gradient font-semibold block mb-0.5">MakeMyStore</span>
                      <span className={`font-semibold ${row.usColor}`}>{row.us}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-gray-500 mt-8">
              One-time setup fee • Full source code delivered • Client-owned infrastructure
            </p>
          </div>
        </section>

        {/* ─── BUILT DIFFERENT ─── */}
        <section className="py-20 bg-[#111827]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2
                className="text-4xl font-bold mb-3"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Built Different — By Design
              </h2>
              <p
                className="text-gray-400 text-base"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Four principles that separate us from every other builder
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {builtDifferent.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="glass rounded-3xl p-8 card-glow transition-all hover:-translate-y-2 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#7a5cff] flex items-center justify-center mb-6 group-hover:scale-110 transition">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3
                      className="text-xl font-semibold mb-3"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-gray-400 leading-relaxed text-base"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── TECHNICAL TRANSPARENCY ─── */}
        <section id="tech-stack" className="py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="px-4 py-2 text-xs font-bold bg-[#00d4ff]/10 text-[#00d4ff] rounded-2xl">
                TECHNICAL TRANSPARENCY
              </span>
              <h2
                className="text-4xl font-bold mt-4 mb-3"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Your Infrastructure. Our Setup.
              </h2>
              <p
                className="text-gray-400 max-w-xl mx-auto text-base"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                We believe you deserve to know exactly where your store lives — and who controls it.
                Spoiler: it&apos;s you.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {techStack.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="glass rounded-3xl p-8 hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#00d4ff]" />
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <h3
                      className="text-lg font-semibold mb-3 text-white"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-gray-400 text-sm leading-relaxed"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {item.detail}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="glass rounded-3xl p-8 border border-[#00d4ff]/15">
              <p
                className="text-center text-gray-300 text-base leading-relaxed max-w-3xl mx-auto"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <span className="text-[#00d4ff] font-semibold">Bottom line:</span> Once we hand over your
                store, you log into <strong>your</strong> Supabase and <strong>your</strong> Vercel directly. We
                have zero access. You are never dependent on us to keep your store online.
              </p>
            </div>
          </div>
        </section>

        {/* ─── MIGRATION SECTION ─── */}
        <section className="py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="sticky top-8">
                  <span className="px-4 py-2 text-xs font-bold bg-[#00d4ff]/10 text-[#00d4ff] rounded-2xl">
                    MIGRATION
                  </span>
                  <h2
                    className="text-4xl font-bold mt-4 mb-6 leading-tight"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    Already have a store?<br />
                    <span className="text-gradient">We migrate it in days.</span>
                  </h2>
                  <p
                    className="text-base text-gray-300 mb-4"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    From Shopify, Wix, WooCommerce, Squarespace, or any other platform.
                    We export your products, customers, orders, and SEO settings — then rebuild it better.
                  </p>

                  {/* Rental → Ownership callout */}
                  <div className="glass rounded-2xl p-5 border border-[#00d4ff]/20 mb-8">
                    <p
                      className="text-sm text-gray-300 leading-relaxed"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      <span className="text-[#00d4ff] font-semibold">From Rental → Ownership.</span>{' '}
                      When we migrate you from Shopify or Wix, we don&apos;t just move products. We move you from
                      a <em>Rental</em> model to an <em>Ownership</em> model. Your database (Supabase) and frontend
                      (Vercel) belong to you from day one — not us, not a platform.
                    </p>
                  </div>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[#00d4ff] hover:text-white transition font-semibold text-base"
                  >
                    Start migration today <ArrowRight />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="glass rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-6xl font-bold text-gradient mb-2">1</div>
                    <h4 className="font-semibold mb-1 text-base">Export your data</h4>
                    <p className="text-sm text-gray-400">We handle everything</p>
                  </div>
                  <div>
                    <div className="text-6xl font-bold text-gradient mb-2">2</div>
                    <h4 className="font-semibold mb-1 text-base">Rebuild on Next.js</h4>
                    <p className="text-sm text-gray-400">Lightning-fast &amp; custom</p>
                  </div>
                  <div>
                    <div className="text-6xl font-bold text-gradient mb-2">3</div>
                    <h4 className="font-semibold mb-1 text-base">Launch &amp; celebrate</h4>
                    <p className="text-sm text-gray-400">Zero downtime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-20 bg-gradient-to-b from-transparent via-[#00d4ff]/5 to-transparent">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Ready for a store that actually belongs to you?
            </h2>
            <p
              className="text-xl text-gray-400 mb-10"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              One conversation. One price. Lifetime ownership.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xl sm:text-2xl px-10 sm:px-16 py-6 sm:py-8 inline-flex items-center gap-4"
            >
              Order Your Custom Store Now
              <span className="text-3xl sm:text-4xl">→</span>
            </a>

            <p className="text-xs text-gray-500 mt-8">
              Average delivery: 3–10 business days • 7 days of free support included •
              Client-owned infrastructure
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
