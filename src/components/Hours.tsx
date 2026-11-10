import { contact, displayOrder, weeklyHours } from '../data/hours'
import { useOpenStatus } from '../hooks/useOpenStatus'
import { formatMinutes } from '../lib/format'
import OpenBadge from './OpenBadge'
import Reveal from './Reveal'

export default function Hours() {
  const { today } = useOpenStatus()

  return (
    <section id="hours" aria-labelledby="hours-title" className="bg-surface-2 py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="mb-3 text-sm font-semibold text-accent">المواعيد والعنوان</p>
            <h2 id="hours-title" className="text-3xl font-bold sm:text-4xl md:text-5xl">
              مستنيينك كل يوم
            </h2>
            <div className="mt-6">
              <OpenBadge />
            </div>
            <p className="mt-2 text-sm text-muted">الحالة محسوبة على توقيت القاهرة.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-sm text-muted">العنوان</dt>
                <dd className="mt-1 text-lg font-semibold">{contact.address}</dd>
                <dd className="mt-3">
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn !min-h-11 border border-accent !px-5 text-accent hover:bg-accent hover:text-accent-ink"
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
                      <path d="M12 21s7-6.1 7-11.5a7 7 0 1 0-14 0C5 14.9 12 21 12 21z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                    افتح اللوكيشن على خرائط جوجل
                    <span className="sr-only">(بيفتح في تاب جديد)</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">التليفون</dt>
                <dd className="mt-1 text-lg font-semibold">
                  <bdi dir="ltr">{contact.phone}</bdi>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">الإيميل</dt>
                <dd className="mt-1 text-lg font-semibold">
                  <bdi dir="ltr">{contact.email}</bdi>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <table className="w-full overflow-hidden rounded-3xl border border-line bg-surface text-start">
            <caption className="sr-only">مواعيد العمل طول الأسبوع</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">اليوم</th>
                <th scope="col">المواعيد</th>
              </tr>
            </thead>
            <tbody>
              {displayOrder.map((dayIndex) => {
                const day = weeklyHours[dayIndex]
                const isToday = dayIndex === today
                return (
                  <tr
                    key={day.label}
                    aria-current={isToday ? 'date' : undefined}
                    className={`border-b border-line last:border-b-0 ${isToday ? 'bg-accent-soft' : ''}`}
                  >
                    <th scope="row" className="px-6 py-4 text-start font-semibold">
                      {day.label}
                      {isToday && (
                        <span className="ms-2 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-ink">
                          النهارده
                        </span>
                      )}
                    </th>
                    <td className={`px-6 py-4 text-end ${isToday ? 'font-semibold' : 'text-muted'}`}>
                      {formatMinutes(day.open)} – {formatMinutes(day.close)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}
