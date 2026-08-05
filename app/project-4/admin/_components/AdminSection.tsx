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
    <div className="p4-card p-6 sm:p-7">
      <h2 className="p4-display text-lg font-semibold text-[var(--p4-sage-2)]">{title}</h2>
      {description && <p className="mt-1 text-[13px] text-[var(--p4-muted)]">{description}</p>}
      <div className="mt-2 divide-y divide-[var(--p4-border)]">{children}</div>
    </div>
  )
}
