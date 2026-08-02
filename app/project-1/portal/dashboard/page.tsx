import Link from 'next/link'
import { portalProjects, activityLog } from '../_data/portalData'

export default function DashboardOverview() {
  const active = portalProjects.filter((p) => p.status === 'In progress')

  return (
    <div>
      <span className="p1-eyebrow">Overview</span>
      <h1 className="p1-display mt-2 text-3xl font-semibold">Good to see you back.</h1>
      <p className="mt-2 text-sm text-[var(--p1-muted)]">
        Here&rsquo;s where your programs stand as of today.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-[var(--p1-line)] p-5">
          <div className="p1-display text-3xl font-semibold text-[var(--p1-brass)]">{active.length}</div>
          <div className="mt-1 text-xs text-[var(--p1-muted)]">Active programs</div>
        </div>
        <div className="border border-[var(--p1-line)] p-5">
          <div className="p1-display text-3xl font-semibold text-[var(--p1-brass)]">
            {portalProjects.filter((p) => p.status === 'Closed out').length}
          </div>
          <div className="mt-1 text-xs text-[var(--p1-muted)]">Closed out</div>
        </div>
        <div className="border border-[var(--p1-line)] p-5">
          <div className="p1-display text-3xl font-semibold text-[var(--p1-brass)]">2</div>
          <div className="mt-1 text-xs text-[var(--p1-muted)]">Unread messages</div>
        </div>
      </div>

      <div className="mt-10">
        <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">ACTIVE PROGRAMS</span>
        <div className="mt-3 space-y-3">
          {active.map((p) => (
            <Link
              key={p.code}
              href="/project-1/portal/dashboard/projects"
              className="block border border-[var(--p1-line)] p-4 hover:border-[var(--p1-brass)] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{p.name}</span>
                <span className="p1-mono text-[10px] text-[var(--p1-muted)]">{p.code}</span>
              </div>
              <p className="mt-1 text-xs text-[var(--p1-muted)]">{p.milestone} · due {p.due}</p>
              <div className="mt-3 h-1.5 w-full bg-[var(--p1-panel-alt)]">
                <div className="h-full bg-[var(--p1-brass)]" style={{ width: `${p.progress}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <span className="p1-mono text-[10px] tracking-widest text-[var(--p1-muted-2)]">RECENT ACTIVITY</span>
        <ul className="mt-3 divide-y divide-[var(--p1-line)] border-t border-[var(--p1-line)]">
          {activityLog.map((a) => (
            <li key={a.label} className="flex items-center justify-between py-3 text-sm">
              <span className="text-[var(--p1-muted)]">{a.label}</span>
              <span className="p1-mono text-[10px] text-[var(--p1-muted-2)]">{a.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
