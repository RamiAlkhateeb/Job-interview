/** Small circular progress (done of total) with the count in the middle. */
export function ProgressRing({ done, total, size = 44, label }: { done: number; total: number; size?: number; label?: string }) {
  const r = 18
  const c = 2 * Math.PI * r
  const frac = total > 0 ? Math.min(done / total, 1) : 0
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" role="img" aria-label={label ?? `${done}/${total}`}>
      <circle cx="22" cy="22" r={r} fill="none" stroke="var(--rule)" strokeWidth="4" />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke={frac >= 1 ? 'var(--green)' : 'var(--accent)'}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${frac * c} ${c}`}
        transform="rotate(-90 22 22)"
      />
      <text x="22" y="26" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">
        {done}/{total}
      </text>
    </svg>
  )
}
