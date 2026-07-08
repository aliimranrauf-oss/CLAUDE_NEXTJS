const FREE_TIER_SERVICES = [
  'GitHub', 'Vercel', 'Supabase', 'Google Analytics', 'Google Search Console', 'Google Tag Manager',
]

const CONTACT_URL = '/contact'

export default function PricingTransparency() {
  return (
    <section className="relative py-24 px-4" id="pricing">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-[11px] uppercase tracking-[0.25em] text-[#7a5cff]/70 mb-3 font-semibold"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Transparent Pricing
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
          >
            One-time fee. No surprises.
          </h2>
        </div>

        <div className="glass card-glow rounded-2xl p-7 sm:p-8 mb-6">
          <p className="text-sm text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Our website development fee is a <strong className="text-white">one-time payment</strong>. If you
            already have hosting (e.g., Hostinger, GoDaddy) or a backend you use, we deploy there &mdash; no need
            to set up anything new. If you don&rsquo;t have hosting yet, we set you up on our recommended stack
            below, and for most business websites the following services can be used on their free plans:
          </p>
          <ul className="flex flex-wrap gap-2 mb-4">
            {FREE_TIER_SERVICES.map((s) => (
              <li
                key={s}
                className="text-xs px-3 py-1.5 rounded-full glass text-[#00d4ff]/90"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-400 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            These free plans are generally sufficient for new websites, portfolios, blogs, and many small to
            medium business websites. Either way &mdash; your hosting or ours &mdash; the accounts are always
            registered under your ownership, not ours.
          </p>
        </div>

        <div className="glass card-glow rounded-2xl p-7 sm:p-8 mb-6">
          <h3 className="text-base font-bold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            Future Growth Costs
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            As your website grows, you may eventually exceed the free usage limits offered by third-party
            platforms &mdash; a significant increase in visitors, large databases, heavy file storage, high
            bandwidth usage, or advanced enterprise features. In these cases, services such as Vercel or
            Supabase may require upgrading to a paid plan based on their own pricing and policies, not ours. If
            you&rsquo;re on your own existing hosting instead, your provider&rsquo;s normal plan limits and
            pricing apply.
          </p>
          <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            The good news: that usually means your website has grown enough that investing in better
            infrastructure makes sense.
          </p>
        </div>

        <div className="rounded-2xl p-7 sm:p-8 border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <h3 className="text-base font-bold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            Important Disclaimer
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            We believe in complete transparency. Our one-time development fee covers the design, development,
            testing, deployment, and handover of your website &mdash; to your own hosting if you have it, or to
            a free-tier stack we set up if you don&rsquo;t. However, we cannot control or guarantee the pricing,
            free tiers, policies, availability, or future decisions of third-party service providers such as
            GitHub, Vercel, Supabase, Google, Cloudflare, Stripe, your hosting provider, or domain registrars.
          </p>
          <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Any future costs, renewals, subscriptions, or upgrades charged by these providers are separate from
            our development service and remain the responsibility of the account owner (the client). We will
            always build your project using the most appropriate and cost-effective technologies available at
            the time of development, but we cannot be held responsible for future policy or pricing changes
            made by third-party companies.
          </p>
        </div>

        <div className="mt-14 text-center">
          <a
            href={CONTACT_URL}
            className="btn-primary inline-block text-sm px-8 py-3.5 rounded-lg font-bold transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d4ff]"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)',
              boxShadow: '0 4px 15px rgba(0,212,255,0.3)',
            }}
          >
            Start Your Free Consultation &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
