import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'التبديل للوضع الفاتح' : 'التبديل للوضع الليلي'}
      title={isDark ? 'الوضع الفاتح' : 'الوضع الليلي'}
      className={`inline-flex size-11 items-center justify-center rounded-full border border-current/20 transition-colors hover:bg-current/10 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.660 17.660l1.41 1.41M2 12h2M20 12h2M4.93 19.070l1.41-1.41M17.660 6.340l1.41-1.41" />
          </>
        ) : (
          <path d="M21 12.800A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.800z" />
        )}
      </svg>
    </button>
  )
}
