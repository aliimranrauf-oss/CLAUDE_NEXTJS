import Link from 'next/link'
import { Linkedin, ExternalLink, Mail } from 'lucide-react'

const quickLinks = [
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing',   href: '#pricing' },
  { label: 'Contact',   href: '/contact' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
]

export default function Footer() {
  return (
    <footer
      className="border-t py-14 px-4"
      style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(17,24,39,0.5)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-bold text-xl mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              <span className="text-gradient">MakeMyStore</span>
              <span className="text-gray-500">.online</span>
            </p>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Custom ecommerce stores with zero monthly fees. Built with Next.js,
              Vercel &amp; Supabase. Serving clients worldwide.
            </p>
            <a
              href="mailto:info@makemystore.online"
              className="inline-flex items-center gap-2 text-sm text-[#00d4ff] hover:underline"
            >
              <Mail size={14} />
              info@makemystore.online
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-semibold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Quick Links
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover:text-[#00d4ff] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* We Accept */}
          <div>
            <p className="font-semibold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              We Accept
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-[#00d4ff] transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-[#00d4ff] shrink-0" />
                Payoneer
                <span className="text-xs text-gray-500 ml-auto">→ See plans</span>
              </a>
              <a
                href="https://www.fiverr.com/s/yvPomWA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-[#00d4ff] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                Fiverr
                <span className="text-xs text-gray-500 ml-auto">→ View gig</span>
              </a>
              <a
                href="mailto:info@makemystore.online"
                className="text-[#00d4ff] hover:underline mt-1 text-xs"
              >
                Ask about other methods →
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="font-semibold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Connect
            </p>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.linkedin.com/in/imran-makemystore/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.fiverr.com/s/yvPomWA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fiverr"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all"
              >
                <ExternalLink size={18} />
              </a>
            </div>
            <p className="text-xs text-gray-500">Delivery: 3–10 business days.</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <span>© {new Date().getFullYear()} MakeMyStore.online. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#00d4ff] transition-colors">Privacy Policy</Link>
            <span className="opacity-30">·</span>
            <Link href="/terms" className="hover:text-[#00d4ff] transition-colors">Terms &amp; Conditions</Link>
          </div>
          <span>Built with Next.js · Hosted on Vercel · Zero monthly fees</span>
        </div>
      </div>
    </footer>
  )
}
