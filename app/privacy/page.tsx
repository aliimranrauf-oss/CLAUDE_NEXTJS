import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | MakeMyStore.online',
  description:
    'Read the Privacy Policy for MakeMyStore.online. Learn how we collect, use, and protect your data when you use our custom ecommerce website development services.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.makemystore.online/privacy' },
  openGraph: {
    title: 'Privacy Policy | MakeMyStore.online',
    description: 'How MakeMyStore.online collects, uses, and protects your personal information.',
    url: 'https://www.makemystore.online/privacy',
    siteName: 'MakeMyStore.online',
    type: 'website',
  },
}

const LAST_UPDATED = 'April 18, 2025'

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(0,212,255,0.08)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }}>
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="text-gradient">Privacy</span> Policy
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

          {/* 1 */}
          <section aria-labelledby="intro">
            <h2 id="intro" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              1. Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to <strong className="text-white">MakeMyStore.online</strong> ("we," "us," or "our"). We are a
              web development service based in Pakistan that builds custom ecommerce stores for clients worldwide. This
              Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
              website <a href="https://www.makemystore.online" className="text-[#00d4ff] hover:underline">www.makemystore.online</a> or
              engage our services. Please read this policy carefully. If you disagree with its terms, please discontinue
              use of our site.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              This policy is designed to comply with applicable global data protection regulations including the{' '}
              <strong className="text-white">General Data Protection Regulation (GDPR)</strong> and the{' '}
              <strong className="text-white">California Consumer Privacy Act (CCPA)</strong>.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 2 */}
          <section aria-labelledby="data-we-collect">
            <h2 id="data-we-collect" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              2. Information We Collect
            </h2>

            <h3 className="text-lg font-semibold text-[#00d4ff] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              2.1 Information You Provide Directly
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              When you contact us, submit an order inquiry, or communicate via email or our contact form, we may collect:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-2">
              <li>Full name and email address</li>
              <li>Business name and website URL (if applicable)</li>
              <li>Project requirements and correspondence</li>
              <li>Payment details — processed exclusively by our third-party payment processors (see Section 5)</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#00d4ff] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              2.2 Automatically Collected Information
            </h3>
            <p className="text-gray-300 leading-relaxed">
              When you visit our website, we automatically collect certain technical data through{' '}
              <strong className="text-white">Google Analytics 4</strong> (GA4), including IP address (anonymised), browser
              type and version, operating system, referring URLs, pages visited, time spent on pages, and general
              geographic location (country/city level). This data is collected in aggregate and is used solely to improve
              our website's performance and user experience.
            </p>

            <h3 className="text-lg font-semibold text-[#00d4ff] mb-2 mt-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              2.3 Database & Infrastructure (Supabase)
            </h3>
            <p className="text-gray-300 leading-relaxed">
              For client projects we build, we use <strong className="text-white">Supabase</strong> as the backend
              database platform. Any data stored in a client's Supabase project is owned and controlled entirely by that
              client. MakeMyStore.online does not have ongoing access to client databases after project handover, and we
              do not store, process, or retain any end-customer data from stores we build for clients.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 3 */}
          <section aria-labelledby="how-we-use">
            <h2 id="how-we-use" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              3. How We Use Your Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2">
              <li>Respond to your enquiries and deliver the agreed development services</li>
              <li>Process and confirm payments for our services</li>
              <li>Send project updates, invoices, and post-delivery support communications</li>
              <li>Improve our website content, navigation, and performance using analytics data</li>
              <li>Comply with legal obligations and resolve disputes</li>
              <li>Prevent fraudulent or unauthorised use of our services</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              We will <strong className="text-white">never</strong> sell, rent, or trade your personal information to
              third parties for their marketing purposes.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 4 */}
          <section aria-labelledby="cookies">
            <h2 id="cookies" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              4. Cookies &amp; Tracking Technologies
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to enhance your browsing experience and gather analytics
              data. The cookies we use fall into the following categories:
            </p>

            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <table className="w-full text-sm text-gray-300">
                <thead>
                  <tr style={{ background: 'rgba(0,212,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <th className="text-left px-4 py-3 font-semibold text-white">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-white">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-white">Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Essential', 'Core website functionality and security', 'MakeMyStore.online'],
                    ['Analytics', 'Page views, session data, performance metrics', 'Google Analytics 4'],
                    ['Marketing', 'Ad performance tracking and retargeting', 'Meta (Facebook) Pixel'],
                  ].map(([type, purpose, provider], i) => (
                    <tr key={i} style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <td className="px-4 py-3 text-[#00d4ff] font-medium">{type}</td>
                      <td className="px-4 py-3">{purpose}</td>
                      <td className="px-4 py-3 text-gray-400">{provider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-300 leading-relaxed mt-4">
              You may control or disable cookies through your browser settings at any time. Please note that disabling
              certain cookies may affect the functionality of our website. For more information on managing cookies,
              visit{' '}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer"
                className="text-[#00d4ff] hover:underline">allaboutcookies.org</a>.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 5 */}
          <section aria-labelledby="third-party">
            <h2 id="third-party" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              5. Third-Party Services &amp; Payments
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We integrate with trusted third-party services to operate our business. Each third party has its own
              privacy policy governing the use of your data:
            </p>

            <h3 className="text-lg font-semibold text-[#00d4ff] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              5.1 Payment Processors
            </h3>
            <p className="text-gray-300 leading-relaxed mb-2">
              Payments for our services are processed through <strong className="text-white">Stripe</strong>,{' '}
              <strong className="text-white">PayPal</strong>, and <strong className="text-white">Payoneer</strong>.{' '}
              <strong className="text-white">
                MakeMyStore.online does not collect, store, or process any credit card or banking information on its own
                servers.
              </strong>{' '}
              All financial transactions are handled directly by these PCI-DSS-compliant processors.
            </p>

            <h3 className="text-lg font-semibold text-[#00d4ff] mb-2 mt-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              5.2 Hosting &amp; Infrastructure
            </h3>
            <p className="text-gray-300 leading-relaxed mb-2">
              Client stores are deployed to <strong className="text-white">Vercel</strong> and backed by{' '}
              <strong className="text-white">Supabase</strong>. These deployments are made to the client's own accounts.
              Clients are solely responsible for securing their own API keys, environment variables, database credentials,
              and access tokens. MakeMyStore.online shall not be liable for any security breach arising from a client's
              mismanagement of their credentials.
            </p>

            <h3 className="text-lg font-semibold text-[#00d4ff] mb-2 mt-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              5.3 Analytics &amp; Advertising
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We use <strong className="text-white">Google Analytics 4</strong> with IP anonymisation enabled, and the{' '}
              <strong className="text-white">Meta (Facebook) Pixel</strong> for advertising performance measurement.
              You may opt out of Google Analytics by installing the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer"
                className="text-[#00d4ff] hover:underline">Google Analytics Opt-out Browser Add-on</a>.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 6 */}
          <section aria-labelledby="data-retention">
            <h2 id="data-retention" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              6. Data Retention
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We retain personal information only for as long as is necessary to fulfil the purposes outlined in this
              policy, unless a longer retention period is required by law. Project-related communications and invoice
              records are retained for a minimum of five (5) years for accounting and legal compliance purposes.
              Analytics data collected via Google Analytics is retained for a period of 14 months in accordance with
              Google's default settings.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 7 */}
          <section aria-labelledby="your-rights">
            <h2 id="your-rights" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              7. Your Rights
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Depending on your jurisdiction, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1.5 ml-2">
              <li><strong className="text-white">Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong className="text-white">Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong className="text-white">Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten").</li>
              <li><strong className="text-white">Right to Object:</strong> Object to processing of your data for direct marketing or analytics.</li>
              <li><strong className="text-white">Right to Data Portability:</strong> Request your data in a structured, machine-readable format.</li>
              <li><strong className="text-white">CCPA Rights:</strong> California residents have the right to know what data is collected and to opt out of its sale (we do not sell data).</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:info@makemystore.online" className="text-[#00d4ff] hover:underline">info@makemystore.online</a>.
              We will respond within 30 days.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 8 */}
          <section aria-labelledby="childrens-privacy">
            <h2 id="childrens-privacy" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              8. Children's Privacy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
              information from minors. If you believe we have inadvertently collected such information, please contact us
              immediately and we will take steps to delete it.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 9 */}
          <section aria-labelledby="changes">
            <h2 id="changes" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              9. Changes to This Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to update this Privacy Policy at any time. When we do, we will revise the "Last
              Updated" date at the top of this page. We encourage you to review this policy periodically. Continued use
              of our website following the posting of changes constitutes your acceptance of those changes.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 10 */}
          <section aria-labelledby="contact-privacy">
            <h2 id="contact-privacy" className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              10. Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If you have questions, concerns, or requests regarding this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 p-5 rounded-xl space-y-1 text-sm text-gray-300"
              style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
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
