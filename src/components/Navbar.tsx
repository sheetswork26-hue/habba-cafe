import { useEffect, useState } from 'react'
import { useScrolled } from '../hooks/useScrolled'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#menu', label: 'المنيو' },
  { href: '#bean', label: 'بن الأسبوع' },
  { href: '#gallery', label: 'الجاليري' },
  { href: '#reviews', label: 'آراء الزوار' },
  { href: '#hours', label: 'المواعيد' },
]

export default function Navbar() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)

  // قفل القايمة بزرار Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // فوق الهيرو: شفاف ونص أبيض · بعد السكرول أو مع فتح القايمة: خلفية وحدود
  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color,padding] duration-300 ${
        solid
          ? 'bg-bg/90 py-2 text-ink shadow-[0_1px_0_var(--line)] backdrop-blur-md'
          : 'bg-transparent py-4 text-white [--logo-cut:#1a120d]'
      }`}
    >
      <nav className="container-page flex items-center justify-between gap-4" aria-label="التنقل الرئيسي">
        <a href="#top" aria-label="حَبّة، الرجوع لأول الصفحة" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-2 font-medium opacity-90 transition-opacity after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:opacity-100 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#reserve" className="btn btn-primary hidden !min-h-11 !px-6 sm:inline-flex">
            احجز ترابيزة
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-current/20 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'قفل القايمة' : 'فتح القايمة'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="container-page pb-4 pt-2 lg:hidden">
        <ul className="flex flex-col divide-y divide-line border-t border-line">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="block py-3.5 text-lg font-medium" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#reserve" className="btn btn-primary mt-3 w-full sm:hidden" onClick={() => setOpen(false)}>
          احجز ترابيزة
        </a>
      </div>
    </header>
  )
}
