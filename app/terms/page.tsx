import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions | MakeMyStore.online',
  description:
    'Read the Terms & Conditions for MakeMyStore.online. Understand our one-time setup service model, code ownership policy, refund policy, and liability terms for custom website development, including ecommerce, business, portfolio, blog, and SaaS builds.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.makemystore.online/terms' },
  openGraph: {
    title: 'Terms & Conditions | MakeMyStore.online',
    description:
      'Service terms, code ownership, refund policy, and liability waiver for MakeMyStore.online custom website development — ecommerce, business, portfolio, blog, and SaaS builds.',
    url: 'https://www.makemystore.online/terms',
    siteName: 'MakeMyStore.online',
    type: 'website',
  },
}

const LAST_UPDATED = 'April 18, 2025'

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(122,92,255,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(122,92,255,0.08)', color: '#7a5cff', border: '1px solid rgba(122,92,255,0.2)' }}
          >
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Terms &amp; <span className="text-gradient">Conditions</span>
          </h1>
          <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <div
          className="glass rounded-2xl p-8 sm:p-12 space-y-10"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >

          {/* Agreement */}
          <div className="p-5 rounded-xl text-sm text-gray-300 leading-relaxed"
            style={{ background: 'rgba(122,92,255,0.05)', border: '1px solid rgba(122,92,255,0.15)' }}>
            <strong className="text-white">IMPORTANT — PLEASE READ CAREFULLY.</strong> By engaging our services,
            placing an order, or making any payment to MakeMyStore.online, you ("Client") agree to be legally bound
            by these Terms &amp; Conditions. If you do not agree, do not proceed with any engagement.
          </div>

          {/* 1 */}
          <section aria-labelledby="definitions">
            <h2 id="definitions" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              1. Definitions
            </h2>
            <ul className="text-gray-300 space-y-2 text-sm leading-relaxed ml-2">
              <li><strong className="text-white">"Service Provider" / "We" / "Us":</strong> MakeMyStore.online, a web development service operated from Pakistan.</li>
              <li><strong className="text-white">"Client" / "You":</strong> Any individual or business entity that engages MakeMyStore.online for a project.</li>
              <li><strong className="text-white">"Project":</strong> The custom website (ecommerce store, business site, portfolio, blog, SaaS landing page, or other web application) agreed upon between both parties.</li>
              <li><strong className="text-white">"Deliverables":</strong> The source code, GitHub repository, and associated assets produced as part of the Project.</li>
              <li><strong className="text-white">"Platform Fee":</strong> Recurring charges imposed by third-party SaaS platforms (e.g., Shopify). MakeMyStore.online does not charge platform fees.</li>
            </ul>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 2 */}
          <section aria-labelledby="service-model">
            <h2 id="service-model" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              2. Service Model — One-Time Setup
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              MakeMyStore.online provides a <strong className="text-white">one-time custom website development service</strong>,
              covering ecommerce stores, business sites, portfolios, blogs, SaaS landing pages, and other custom web
              applications. This is expressly <strong className="text-white">not</strong> a subscription, SaaS platform, or ongoing
              managed service unless separately agreed upon in writing.
            </p>
            <p className="text-gray-300 leading-relaxed mb-3">
              Upon completion and full payment, the Client receives a fully functional website deployed to
              the hosting and backend the Client chooses — whether that is the Client's own existing hosting
              account (e.g., Hostinger, GoDaddy) or a free-tier account (e.g., Vercel and/or Supabase) that we help
              set up on the Client's behalf. The Client is thereafter solely responsible for all ongoing hosting,
              maintenance, third-party subscription costs, and business operations.
            </p>

            <h3 className="text-lg font-semibold text-[#7a5cff] mb-2 mt-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              2.1 What Is Included
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2 text-sm">
              <li>Custom Next.js frontend and backend as scoped in the agreed project brief</li>
              <li>Database setup and schema design (Supabase by default, or the Client's existing backend)</li>
              <li>Deployment to the Client's chosen hosting account</li>
              <li>Payment gateway integration (Stripe and/or PayPal as agreed)</li>
              <li>Transfer of the complete source code via a private GitHub repository</li>
              <li>Seven (7) calendar days of post-delivery bug-fix support (see Section 7)</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#7a5cff] mb-2 mt-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              2.2 What Is Not Included
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2 text-sm">
              <li>Ongoing hosting/backend fees (billed directly by the Client's chosen provider to the Client)</li>
              <li>Payment gateway transaction fees (charged by Stripe/PayPal to the Client)</li>
              <li>Domain name registration or renewal</li>
              <li>Ongoing SEO management or digital marketing</li>
              <li>Adding new features after final delivery (quoted separately)</li>
              <li>Any losses arising from third-party service downtime or changes to third-party APIs</li>
            </ul>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 3 */}
          <section aria-labelledby="ownership">
            <h2 id="ownership" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              3. Intellectual Property &amp; Code Ownership
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Upon receipt of <strong className="text-white">full and final payment</strong>, the Client receives
              complete ownership of the Deliverables, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2 text-sm mb-4">
              <li>100% of the custom source code written for the Project</li>
              <li>The private GitHub repository containing the Deliverables</li>
              <li>All associated database schemas, environment configurations, and deployment settings</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mb-3">
              The Client may modify, extend, resell, or otherwise use the code freely for their own business purposes
              after full payment. The Client may <strong className="text-white">not</strong> resell the codebase as a
              product or template to third parties without prior written consent from MakeMyStore.online.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Prior to full payment, all Deliverables remain the exclusive intellectual property of MakeMyStore.online.
              Partial deliveries made during development are provided for review purposes only and do not transfer
              ownership.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 4 */}
          <section aria-labelledby="payment">
            <h2 id="payment" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              4. Payment Terms
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Our standard payment structure is as follows, unless otherwise agreed in writing:
            </p>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <table className="w-full text-sm text-gray-300">
                <thead>
                  <tr style={{ background: 'rgba(122,92,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <th className="text-left px-4 py-3 font-semibold text-white">Milestone</th>
                    <th className="text-left px-4 py-3 font-semibold text-white">When Due</th>
                    <th className="text-left px-4 py-3 font-semibold text-white">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Deposit', 'Before development begins', '50% of agreed price'],
                    ['Final Payment', 'Upon delivery & Client approval', '50% of agreed price'],
                  ].map(([milestone, when, amount], i) => (
                    <tr key={i} style={{ borderBottom: i < 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <td className="px-4 py-3 text-[#7a5cff] font-medium">{milestone}</td>
                      <td className="px-4 py-3">{when}</td>
                      <td className="px-4 py-3 text-gray-400">{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-300 leading-relaxed mt-4 text-sm">
              Accepted payment methods include Stripe, PayPal, Payoneer, and other methods agreed upon in writing.
              All prices are quoted in USD unless otherwise specified. Any applicable taxes are the sole responsibility
              of the Client.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 5 */}
          <section aria-labelledby="refunds">
            <h2 id="refunds" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              5. Refund Policy
            </h2>
            <div className="p-5 rounded-xl text-sm text-gray-300 leading-relaxed mb-4"
              style={{ background: 'rgba(255,80,80,0.04)', border: '1px solid rgba(255,80,80,0.15)' }}>
              <strong className="text-white">No Refunds After Project Commencement.</strong> Due to the custom,
              bespoke, and digital nature of our Deliverables, <strong className="text-white">all payments are
              non-refundable once development work has commenced</strong>. This includes the initial deposit once
              the project brief has been agreed and work has begun.
            </div>
            <p className="text-gray-300 leading-relaxed mb-3">
              A refund of the deposit may be considered solely at our discretion if:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2 text-sm mb-3">
              <li>The Client cancels the project in writing within 24 hours of placing the deposit, and</li>
              <li>No development work of any kind has been initiated</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              If MakeMyStore.online is unable to complete the agreed Project due to circumstances within our control,
              a pro-rated refund reflecting work not yet completed will be issued.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 6 */}
          <section aria-labelledby="liability">
            <h2 id="liability" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              6. Limitation of Liability &amp; Disclaimer
            </h2>

            <h3 className="text-lg font-semibold text-[#7a5cff] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              6.1 System vs. Business Distinction
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              MakeMyStore.online delivers a technical <strong className="text-white">System</strong> (the website or
              web application). The Client operates the <strong className="text-white">Business</strong> (product sourcing,
              pricing, marketing, customer relations, fulfilment, legal compliance, etc.).{' '}
              <strong className="text-white">
                We bear absolutely no responsibility for the products sold, services offered, or business decisions made
                by the Client using the System we build.
              </strong>
            </p>

            <h3 className="text-lg font-semibold text-[#7a5cff] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              6.2 No Guarantee of Revenue or Results
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              MakeMyStore.online makes no representations or warranties regarding the Client's business performance,
              revenue, sales conversions, or any other commercial outcome. We deliver a functional technical platform;
              business results depend entirely on factors outside our control.
            </p>

            <h3 className="text-lg font-semibold text-[#7a5cff] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              6.3 Maximum Liability
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              To the maximum extent permitted by applicable law, MakeMyStore.online's total liability to the Client
              for any claim arising out of or related to these Terms shall not exceed the total amount paid by the
              Client for the specific Project giving rise to the claim. Under no circumstances shall we be liable for
              any indirect, incidental, consequential, special, or punitive damages, including loss of profit, loss
              of data, or business interruption.
            </p>

            <h3 className="text-lg font-semibold text-[#7a5cff] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              6.4 Third-Party Services
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We are not affiliated with, endorsed by, or responsible for Vercel, Supabase, Hostinger, GoDaddy, Stripe,
              PayPal, Payoneer, or any other third-party platform the Client uses for hosting, backend, or payments.
              Any disruption, price change, policy change, or outage on these platforms is beyond our control and does
              not constitute grounds for a refund or claim against MakeMyStore.online.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 7 */}
          <section aria-labelledby="support">
            <h2 id="support" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              7. Post-Delivery Support
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We provide <strong className="text-white">7 calendar days of complimentary post-delivery support</strong>{' '}
              from the date of final delivery. During this period, we will address:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2 text-sm mb-3">
              <li>Bugs or defects directly attributable to our code</li>
              <li>Deployment issues arising from our configuration</li>
              <li>Minor layout or functional discrepancies from the agreed project brief</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              Support does <strong className="text-white">not</strong> cover new feature requests, third-party platform
              issues, issues caused by Client-side modifications, or problems arising after the 7-day window. Additional
              support or feature development beyond this period is available and will be quoted separately.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 8 */}
          <section aria-labelledby="client-obligations">
            <h2 id="client-obligations" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              8. Client Obligations
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              The Client agrees to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1.5 ml-2 text-sm">
              <li>Provide accurate, complete, and timely project requirements and content</li>
              <li>Create and maintain their own hosting and backend accounts (e.g., Vercel, Supabase, Hostinger, GoDaddy, or another provider of their choice)</li>
              <li>Secure and keep confidential all API keys, environment variables, and database credentials</li>
              <li>Comply with all applicable laws in operating their business or website, including consumer protection, tax, and data privacy laws relevant to their jurisdiction</li>
              <li>Ensure that products or services sold through the Platform do not violate any laws or third-party rights</li>
              <li>Not use the Deliverables for any unlawful, harmful, or fraudulent purpose</li>
            </ul>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 9 */}
          <section aria-labelledby="confidentiality">
            <h2 id="confidentiality" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              9. Confidentiality
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Both parties agree to keep confidential any proprietary information, business strategies, or technical
              specifications shared during the course of the engagement. MakeMyStore.online will not disclose the
              Client's project details or business information to third parties without prior written consent, except
              where required by law. This obligation survives the termination of any project engagement.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 10 */}
          <section aria-labelledby="governing-law">
            <h2 id="governing-law" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              10. Governing Law &amp; Dispute Resolution
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of the{' '}
              <strong className="text-white">Islamic Republic of Pakistan</strong>, without regard to its conflict of
              law provisions.
            </p>
            <p className="text-gray-300 leading-relaxed mb-3">
              In the event of any dispute, claim, or controversy arising out of or relating to these Terms, the parties
              agree to first attempt to resolve the matter through good-faith negotiations via email within thirty (30)
              days of one party notifying the other of the dispute.
            </p>
            <p className="text-gray-300 leading-relaxed">
              If the dispute is not resolved through negotiation, both parties agree to submit to the exclusive
              jurisdiction of the competent courts located in <strong className="text-white">Karachi, Pakistan</strong>.
              Nothing herein prevents either party from seeking urgent injunctive relief in any appropriate jurisdiction.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 11 */}
          <section aria-labelledby="modifications">
            <h2 id="modifications" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              11. Modifications to These Terms
            </h2>
            <p className="text-gray-300 leading-relaxed">
              MakeMyStore.online reserves the right to modify these Terms &amp; Conditions at any time. Updated terms
              will be posted on this page with a revised "Last Updated" date. Terms in effect at the time an order is
              placed will govern that specific engagement. Continued use of our services after changes are posted
              constitutes acceptance of the updated Terms.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 12 */}
          <section aria-labelledby="contact-terms">
            <h2 id="contact-terms" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              12. Contact
            </h2>
            <p className="text-gray-300 leading-relaxed">
              For questions about these Terms &amp; Conditions, please contact us:
            </p>
            <div className="mt-4 p-5 rounded-xl space-y-1 text-sm text-gray-300"
              style={{ background: 'rgba(122,92,255,0.04)', border: '1px solid rgba(122,92,255,0.15)' }}>
              <p><strong className="text-white">MakeMyStore.online</strong></p>
              <p>Pakistan</p>
              <p>Email:{' '}
                <a href="mailto:info@makemystore.online" className="text-[#00d4ff] hover:underline">
                  info@makemystore.online
                </a>
              </p>
              <p>Website:{' '}
                <a href="https://www.makemystore.online" className="text-[#00d4ff] hover:underline">
                  www.makemystore.online
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  )
}
