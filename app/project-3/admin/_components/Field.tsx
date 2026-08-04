'use client'

export default function Field({
  label,
  value,
  onChange,
  hint,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (next: string) => void
  hint?: string
  multiline?: boolean
}) {
  return (
    <div className="py-3">
      <label className="block text-[11.5px] font-semibold uppercase tracking-widest text-[var(--p3-muted-2)]">
        {label}
      </label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="mt-2 w-full" />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full" />
      )}
      {hint && <p className="mt-1 text-[11.5px] text-[var(--p3-muted-2)]">{hint}</p>}
    </div>
  )
}
