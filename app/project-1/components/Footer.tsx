import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--p1-line)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <span className="p1-display text-[15px] font-semibold">Ahmed Al Mansoori</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--p1-muted)]">
              Senior Infrastructure &amp; Program Director based in Abu Dhabi, UAE. Delivering
              transit, marine, and mixed-use developments across the Gulf.
            </p>
          </div>

          <div>
            <span className="p1-eyebrow">Sitemap</span>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-[var(--p1-muted)]">
              <li><Link href="/project-1/about" className="hover:text-[var(--p1-text)]">About</Link></li>
              <li><Link href="/project-1/services" className="hover:text-[var(--p1-text)]">Services</Link></li>
              <li><Link href="/project-1/projects" className="hover:text-[var(--p1-text)]">Projects</Link></li>
              <li><Link href="/project-1/contact" className="hover:text-[var(--p1-text)]">Contact</Link></li>
              <li><Link href="/project-1/portal" className="hover:text-[var(--p1-text)]">Client Portal</Link></li>
            </ul>
          </div>

          <div>
            <span className="p1-eyebrow">Legal</span>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-[var(--p1-muted)]">
              <li><Link href="/project-1/privacy" className="hover:text-[var(--p1-text)]">Privacy Policy</Link></li>
              <li><Link href="/project-1/terms" className="hover:text-[var(--p1-text)]">Terms of Engagement</Link></li>
            </ul>
          </div>
        </div>

        <div className="p1-scale-bar mt-12" />
        <div className="mt-4 flex flex-col justify-between gap-2 text-xs text-[var(--p1-muted-2)] sm:flex-row">
          <span className="p1-mono">SHEET A-001 · REV 04 · {new Date().getFullYear()}</span>
          <span>
            Demonstration portfolio — fictional profile built for design showcase purposes only.
          </span>
        </div>
      </div>
    </footer>
  )
}
