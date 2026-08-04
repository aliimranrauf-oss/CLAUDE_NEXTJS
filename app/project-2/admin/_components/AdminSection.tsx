import { ReactNode } from 'react'

export default function AdminSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="p2-card p-6 sm:p-7">
      <h2 className="p2-display text-lg font-semibold text-[var(--p2-navy)]">{title}</h2>
      {description && <p className="mt-1 text-[13px] text-[var(--p2-muted)]">{description}</p>}
      <div className="mt-2 divide-y divide-[var(--p2-border)]">{children}</div>
    </div>
  )
}
