export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-2xl font-bold ${className}`}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
        <ellipse cx="16" cy="16" rx="8.5" ry="12.5" transform="rotate(28 16 16)" fill="currentColor" />
        <path
          d="M21 5.5c-6 4.5-2.5 10.5-5 14s-5 4.5-5 7.5"
          fill="none"
          stroke="var(--logo-cut, var(--bg))"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      حَبّة
    </span>
  )
}
