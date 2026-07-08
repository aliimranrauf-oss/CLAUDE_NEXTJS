const CONTACT_URL = 'https://www.makemystore.online/contact'

const platforms = ['Shopify', 'Wix', 'WordPress', 'MakeMyStore ✦']

const rows = [
  {
    // Honest framing: our fee is one-time for the BUILD. Hosting is separate and
    // paid to whichever provider the client picks (often free-tier to start).
    feature: 'Platform / Build Cost',
    values: [
      'From $39/mo, forever',
      'From $17/mo, forever',
      'From $10/mo, forever',
      '$250–$1000 one-time build ✓',
    ],
  },
  {
    feature: 'Hosting cost',
    values: [
      'Bundled into subscription',
      'Bundled into subscription',
      'Extra, recurring',
      'Your choice — Vercel, Hostinger, GoDaddy, or existing plan (often free tier)',
    ],
  },
  {
    feature: 'Sales commission',
    values: ['Up to 2%', '0%', '0%', '0% ✓'],
  },
  {
    feature: 'Source code ownership',
    values: ['❌', '❌', '⚠️ Partial', '✅ Full ownership, yours on GitHub'],
  },
  {
    feature: '100% custom design',
    values: ['Limited templates', 'Limited templates', '⚠️ Theme dependent', '✅ Fully unique'],
  },
  {
    feature: 'Stripe & PayPal',
    values: ['✅ Stripe only', '⚠️ Limited', '⚠️ Plugin needed', '✅ Both ready'],
  },
  {
    feature: 'Full SEO optimization',
    values: ['Basic', 'Basic', '⚠️ Plugin needed', '✅ Advanced, incl. analytics & sitemap setup'],
  },
  {
    feature: 'Post-delivery support',
    values: ['❌ Self-serve', '❌ Self-serve', '❌ Self-serve', '✅ 7 days included'],
  },
  {
    feature: 'Platform lock-in',
    values: ['🔒 Locked in', '🔒 Locked in', '⚠️ Partially', '✅ No lock-in — host anywhere'],
  },
]

function cellClass(value: string, isMMS: boolean) {
  if (isMMS) return 'text-[#00d4ff] font-bold'
  if (value.startsWith('❌') || value.startsWith('🔒')) return 'text-red-400/80'
  if (value.startsWith('✅')) return 'text-emerald-400'
  if (value.startsWith('⚠️')) return 'text-yellow-400/80'
  return 'text-gray-400'
}

export default function ComparisonTable() {
  return (
    <section id="comparison" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#00d4ff] uppercase tracking-widest mb-3 block">
            Why MakeMyStore?
          </span>
          <h2
            className="text-4xl sm:text-[42px] font-bold leading-[1.2] max-w-2xl mx-auto text-white"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
          >
            How We Stack Up Against{' '}
            <span className="text-[#40e0ff]">the Rest</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Pay once to own your store outright — instead of renting it every month, forever.
          </p>
        </div>

        {/* Table — horizontal scroll on mobile */}
        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(0,212,255,0.2)' }}>
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr style={{ background: 'rgba(0,212,255,0.05)' }}>
                <th className="px-5 py-4 text-left text-gray-400 font-semibold w-48">Feature</th>
                {platforms.map((p, i) => (
                  <th
                    key={p}
                    className={`px-5 py-4 text-center font-bold text-sm ${
                      i === 3 ? 'text-[#00d4ff]' : 'text-gray-300'
                    }`}
                    style={i === 3 ? { fontFamily: 'Syne, sans-serif' } : {}}
                  >
                    {i === 3 ? (
                      <span className="flex flex-col items-center gap-1">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{ background: 'var(--gradient)', color: '#0b0f1a' }}
                        >
                          BEST CHOICE
                        </span>
                        {p}
                      </span>
                    ) : (
                      p
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={row.feature}
                  className={`border-t transition-colors hover:bg-white/[0.02] ${
                    ri % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.015]'
                  }`}
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                  <td className="px-5 py-4 text-gray-300 font-medium">{row.feature}</td>
                  {row.values.map((val, vi) => (
                    <td
                      key={vi}
                      className={`px-5 py-4 text-center ${cellClass(val, vi === 3)}`}
                      style={
                        vi === 3
                          ? { background: 'rgba(0,212,255,0.04)', borderLeft: '1px solid rgba(0,212,255,0.15)' }
                          : {}
                      }
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Honest ownership/control note — no absolute "$0/mo" or "we host it" claims */}
        <p className="mt-6 text-center text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          We charge one-time for the build: your code on GitHub, a Supabase backend, and full setup
          (analytics, sitemap, SEO). You deploy it to <strong className="text-gray-300">whichever hosting you choose</strong>{' '}
          — Vercel, Hostinger, GoDaddy, or a plan you already have — so hosting costs and limits are
          always in your control, not tied to us.
        </p>

        <div className="mt-8 text-center">
          <a
            href={CONTACT_URL}
            className="btn-primary inline-block text-base"
          >
            Start With MakeMyStore Today →
          </a>
        </div>
      </div>
    </section>
  )
}
