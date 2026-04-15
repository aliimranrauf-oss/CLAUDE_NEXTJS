const platforms = ['Shopify', 'Wix', 'WordPress', 'MakeMyStore ✦']

const rows = [
  {
    feature: 'Monthly subscription fee',
    values: ['From $39/mo', 'From $17/mo', 'From $10/mo', 'None ✓'],
  },
  {
    feature: 'Sales commission',
    values: ['Up to 2%', '0%', '0%', '0% ✓'],
  },
  {
    feature: 'Source code ownership',
    values: ['❌', '❌', '⚠️ Partial', '✅ Full ownership'],
  },
  {
    feature: 'Free hosting',
    values: ['❌ Extra cost', '❌ Extra cost', '❌ Extra cost', '✅ Vercel free'],
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
    values: ['Basic', 'Basic', '⚠️ Plugin needed', '✅ Advanced'],
  },
  {
    feature: 'Post-delivery support',
    values: ['❌ Self-serve', '❌ Self-serve', '❌ Self-serve', '✅ 7 days included'],
  },
  {
    feature: 'Platform lock-in',
    values: ['🔒 Locked in', '🔒 Locked in', '⚠️ Partially', '✅ No lock-in'],
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
            className="text-4xl sm:text-5xl font-extrabold text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            How We Stack Up Against{' '}
            <span className="text-gradient">the Rest</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Stop paying monthly. Own your store completely and keep every dollar you earn.
          </p>
        </div>

        {/* Table wrapper — horizontal scroll on mobile */}
        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(0,212,255,0.2)' }}>
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr style={{ background: 'rgba(0,212,255,0.05)' }}>
                <th className="px-5 py-4 text-left text-gray-400 font-semibold w-48">Feature</th>
                {platforms.map((p, i) => (
                  <th
                    key={p}
                    className={`px-5 py-4 text-center font-bold text-sm ${
                      i === 3
                        ? 'text-[#00d4ff]'
                        : 'text-gray-300'
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

        {/* CTA below table */}
        <div className="mt-10 text-center">
          <a href="#pricing" className="btn-primary inline-block text-base">
            Start With MakeMyStore Today →
          </a>
        </div>
      </div>
    </section>
  )
}
