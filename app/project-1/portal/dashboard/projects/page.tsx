import { portalProjects } from '../../_data/portalData'

export default function DashboardProjects() {
  return (
    <div>
      <span className="p1-eyebrow">Projects</span>
      <h1 className="p1-display mt-2 text-3xl font-semibold">All programs</h1>
      <p className="mt-2 text-sm text-[var(--p1-muted)]">
        Status and progress across everything on record.
      </p>

      <div className="mt-8 overflow-x-auto border border-[var(--p1-line)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--p1-line)] text-[10px] text-[var(--p1-muted-2)]">
              <th className="p1-mono px-4 py-3 font-normal">CODE</th>
              <th className="p1-mono px-4 py-3 font-normal">PROGRAM</th>
              <th className="p1-mono px-4 py-3 font-normal">STATUS</th>
              <th className="p1-mono px-4 py-3 font-normal">PROGRESS</th>
              <th className="p1-mono px-4 py-3 font-normal">NEXT MILESTONE</th>
              <th className="p1-mono px-4 py-3 font-normal">DUE</th>
            </tr>
          </thead>
          <tbody>
            {portalProjects.map((p) => (
              <tr key={p.code} className="border-b border-[var(--p1-line)] last:border-0">
                <td className="p1-mono px-4 py-4 text-xs text-[var(--p1-brass)]">{p.code}</td>
                <td className="px-4 py-4 font-medium">{p.name}</td>
                <td className="px-4 py-4">
                  <span
                    className={`p1-mono px-2 py-1 text-[10px] tracking-wide ${
                      p.status === 'In progress'
                        ? 'border border-[var(--p1-steel)] text-[var(--p1-steel)]'
                        : 'border border-[var(--p1-line-strong)] text-[var(--p1-muted)]'
                    }`}
                  >
                    {p.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-[var(--p1-panel-alt)]">
                      <div className="h-full bg-[var(--p1-brass)]" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="p1-mono text-[10px] text-[var(--p1-muted)]">{p.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-xs text-[var(--p1-muted)]">{p.milestone}</td>
                <td className="p1-mono px-4 py-4 text-xs text-[var(--p1-muted)]">{p.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
