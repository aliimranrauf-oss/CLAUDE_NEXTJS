/**
 * The signature graphic motif of this portfolio: a thin ECG-style "pulse
 * line" used as a decorative divider under eyebrows and section labels.
 * Pure inline SVG, no image asset, colored via currentColor so it picks
 * up --p4-clay wherever `.p4-pulse` is applied.
 */
export default function PulseLine({ className = 'p4-pulse' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 14" fill="none" className={className} aria-hidden="true">
      <path
        d="M0 7H20L24 1L29 13L33 4L36 7H64"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
