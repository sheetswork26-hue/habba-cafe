import { contact } from '../data/hours'
import Logo from './Logo'

const links = [
  { href: '#menu', label: 'المنيو' },
  { href: '#bean', label: 'بن الأسبوع' },
  { href: '#gallery', label: 'الجاليري' },
  { href: '#reserve', label: 'الحجز' },
  { href: '#hours', label: 'المواعيد' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo className="text-accent" />
            <p className="mt-3 text-muted">
              قهوة مختصة على مهلها.{' '}
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-accent"
              >
                {contact.address}
              </a>
            </p>
          </div>
          <nav aria-label="روابط الفوتر">
            <ul className="flex flex-wrap gap-x-7 gap-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block py-2 font-medium transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-ink">مشروع تجريبي لمعرض الأعمال، والبراند وهمي</p>
          <p>
            الصور من{' '}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-accent"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
