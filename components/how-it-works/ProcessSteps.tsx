import { JOURNEY_NODES } from './nodesData'

interface StepContent {
  paragraphs: string[]
  list?: string[]
  note?: string
}

const STEP_CONTENT: Record<string, StepContent> = {
  consultation: {
    paragraphs: [
      'Every project begins with understanding your business. We\u2019ll discuss your business goals, the type of website you need (business, e-commerce, portfolio, SaaS, blog, and more), required features, design preferences, timeline, and budget.',
      'Not sure what you need? No problem \u2014 we\u2019ll recommend the best solution based on your business.',
    ],
  },
  payment: {
    paragraphs: [
      'Once the project scope is finalized, we confirm the project. Payment methods include Fiverr, Payoneer, and other agreed payment methods.',
      'For direct clients, we normally require an advance payment before development begins. Fiverr projects follow Fiverr\u2019s own payment and delivery process.',
    ],
  },
  domain: {
    paragraphs: [
      'If you already own a domain, we\u2019ll use it. If you don\u2019t have one, we\u2019ll help you choose and purchase the right one \u2014 for example yourbusiness.com, yourbusiness.pk, or yourbusiness.net.',
      'Domain prices vary by extension and availability: around $2/year on promotional offers, $10\u2013$20/year for most common domains, and premium domains may run into the hundreds or thousands.',
    ],
    note: 'The domain is always purchased in your name, using your account, so you remain the owner. Renewal is your responsibility and paid directly to the registrar \u2014 we never charge extra for domain renewals.',
  },
  gmail: {
    paragraphs: [
      'We strongly recommend creating a new Gmail account dedicated to your business instead of using your personal email. This Gmail becomes the master key for your entire online business.',
    ],
    list: [
      'GitHub', 'Vercel', 'Supabase', 'Google Analytics', 'Google Search Console',
      'Google Tag Manager', 'Google Business Profile (if needed)', 'Google Maps APIs (if needed)',
      'Resend', 'Cloudflare (if needed)', 'Stripe (if required)',
    ],
    note: 'Everything belongs to you, not us.',
  },
  setup: {
    paragraphs: ['Using your Gmail account, we\u2019ll configure all required services.'],
    list: [
      'GitHub Repository', 'Vercel Hosting', 'Supabase Database', 'PostgreSQL',
      'Authentication', 'Analytics', 'Search Console', 'XML Sitemap',
      'Robots.txt', 'SSL Certificate', 'Domain Configuration', 'Email Services', 'API Integrations',
    ],
    note: 'Every account is registered under your ownership.',
  },
  development: {
    paragraphs: ['We build your website using modern technologies: Next.js, React, Tailwind CSS, TypeScript, Supabase, PostgreSQL, APIs, and AI integrations where required.'],
    note: 'Your source code is maintained in your private GitHub repository.',
  },
  testing: {
    paragraphs: ['Before launch, we test everything thoroughly.'],
    list: [
      'Mobile responsiveness', 'SEO fundamentals', 'Performance', 'Security',
      'Browser compatibility', 'Forms', 'Database', 'Speed optimization', 'Bug fixing',
    ],
  },
  launch: {
    paragraphs: ['After approval, we\u2019ll deploy your website.'],
    list: [
      'Live deployment', 'Domain connection', 'SSL certificate', 'Google Analytics',
      'Search Console', 'XML sitemap', 'Performance optimization',
    ],
    note: 'Your website is now live.',
  },
  handover: {
    paragraphs: ['Once the project is completed, you receive full ownership of everything.'],
    list: [
      'Gmail account', 'GitHub repository', 'Vercel project', 'Supabase project',
      'Database', 'Source code', 'Google Analytics', 'Search Console', 'Domain access', 'Documentation (if applicable)',
    ],
    note: 'For security, we recommend changing your Gmail password immediately after handover and enabling Two-Factor Authentication (2FA). From that point on, you have complete control over your website and accounts.',
  },
}

export default function ProcessSteps() {
  return (
    <section className="relative py-24 px-4" id="process">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-[11px] uppercase tracking-[0.25em] text-[#00d4ff]/70 mb-3 font-semibold"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Our Development Process
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
          >
            9 steps. Full transparency. Full ownership.
          </h2>
        </div>

        <div className="relative">
          {/* Connecting spine */}
          <div
            className="hidden sm:block absolute left-[27px] top-3 bottom-3 w-[2px]"
            style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.4), rgba(122,92,255,0.4), rgba(255,184,107,0.4))' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-6">
            {JOURNEY_NODES.map((node) => {
              const content = STEP_CONTENT[node.id]
              return (
                <div key={node.id} className="relative sm:pl-[70px]">
                  <div
                    className="hidden sm:flex absolute left-0 top-0 w-14 h-14 rounded-2xl glass items-center justify-center font-bold text-lg shrink-0"
                    style={{ color: node.color, fontFamily: 'Syne, sans-serif', borderColor: `${node.color}33` }}
                  >
                    0{node.index + 1}
                  </div>

                  <div className="glass card-glow rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3 sm:hidden">
                      <span
                        className="w-9 h-9 rounded-xl glass flex items-center justify-center font-bold text-sm shrink-0"
                        style={{ color: node.color, fontFamily: 'Syne, sans-serif' }}
                      >
                        0{node.index + 1}
                      </span>
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-bold text-white mb-3"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {node.title}
                    </h3>
                    <div className="text-sm text-gray-400 leading-relaxed space-y-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {content.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                      {content.list && (
                        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 pt-1">
                          {content.list.map((item) => (
                            <li key={item} className="flex items-center gap-1.5 text-xs text-gray-400">
                              <span
                                className="w-1 h-1 rounded-full shrink-0"
                                style={{ background: node.color }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {content.note && (
                        <p className="text-xs text-white/50 pt-1 border-t border-white/5 mt-3 pt-3">
                          {content.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
