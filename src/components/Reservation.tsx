import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { isEgyptianMobile } from '../lib/phone'
import { toArabicDigits } from '../lib/format'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

interface FormValues {
  name: string
  phone: string
  date: string
  time: string
  guests: string
  notes: string
}

type FieldName = keyof FormValues
type FormErrors = Partial<Record<FieldName, string>>

const EMPTY: FormValues = { name: '', phone: '', date: '', time: '', guests: '2', notes: '' }

/** تاريخ النهارده بصيغة YYYY-MM-DD حسب توقيت القاهرة */
function todayInCairo() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(new Date())
}

const dayFormat = new Intl.DateTimeFormat('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })
const timeFormat = new Intl.DateTimeFormat('ar-EG', { hour: 'numeric', minute: '2-digit' })

/** «الثلاثاء ١ ديسمبر، ٦:٣٠ م» من قيم حقول التاريخ والوقت */
function formatSlot(date: string, time: string) {
  const slot = new Date(`${date}T${time}`)
  return `${dayFormat.format(slot)}، ${timeFormat.format(slot)}`
}

function validateField(field: FieldName, values: FormValues): string | undefined {
  const value = values[field].trim()
  switch (field) {
    case 'name':
      if (!value) return 'اكتب اسمك عشان نحجز بيه.'
      if (value.length < 2) return 'الاسم قصير أوي.'
      return
    case 'phone':
      if (!value) return 'اكتب رقم موبايلك.'
      if (!isEgyptianMobile(value))
        return 'الرقم مش مظبوط. اكتب رقم موبايل مصري ١١ رقم يبدأ بـ 010 أو 011 أو 012 أو 015.'
      return
    case 'date':
      if (!value) return 'اختار يوم الحجز.'
      if (value < todayInCairo()) return 'اليوم ده عدّى. اختار تاريخ النهارده أو بعده.'
      return
    case 'time':
      if (!value) return 'اختار الساعة.'
      return
    default:
      return
  }
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  for (const field of Object.keys(values) as FieldName[]) {
    const error = validateField(field, values)
    if (error) errors[field] = error
  }
  return errors
}

interface FieldProps {
  label: string
  error?: string
  hint?: string
  optional?: boolean
  className?: string
  children: (props: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode
}

function Field({ label, error, hint, optional, className, children }: FieldProps) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block font-medium">
        {label}
        {optional && <span className="ms-1 text-sm font-normal text-muted">(اختياري)</span>}
      </label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

export default function Reservation() {
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [confirmed, setConfirmed] = useState<FormValues | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const confirmationRef = useRef<HTMLDivElement>(null)

  function update(field: FieldName, value: string) {
    const next = { ...values, [field]: value }
    setValues(next)
    // لو الحقل كان فيه غلط، راجعه وهو بيكتب عشان الرسالة تختفي أول ما يتصلّح
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validateField(field, next) }))
  }

  function onBlur(field: FieldName) {
    setErrors((e) => ({ ...e, [field]: validateField(field, values) }))
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as FieldName[])[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    // عرض تجريبي: مفيش أي طلب بيتبعت لسيرفر
    setConfirmed(values)
    requestAnimationFrame(() => confirmationRef.current?.focus())
  }

  function reset() {
    setValues(EMPTY)
    setErrors({})
    setConfirmed(null)
  }

  return (
    <section id="reserve" aria-labelledby="reserve-title" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="reserve-title"
          eyebrow="الحجز"
          title="احجز ترابيزتك"
          description="سيب بياناتك واختار الميعاد، وهنجهّزلك مكانك."
        />

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-[2rem] border border-line bg-surface p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {confirmed ? (
                <m.div
                  key="confirmation"
                  ref={confirmationRef}
                  tabIndex={-1}
                  role="status"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center outline-none"
                >
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent-soft text-accent">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <h3 className="mt-5 text-2xl font-bold">تمام يا {confirmed.name.trim()}، الفورم اشتغل</h3>
                  <p className="mt-3 text-muted">
                    ترابيزة لـ {toArabicDigits(Number(confirmed.guests))} يوم{' '}
                    {formatSlot(confirmed.date, confirmed.time)}.
                  </p>
                  <p className="mt-6 rounded-2xl border border-dashed border-accent bg-accent-soft px-5 py-4 font-medium">
                    ده عرض تجريبي: مفيش حجز حقيقي اتسجّل، وبياناتك ماتبعتتش ولا اتحفظت في أي مكان.
                  </p>
                  <button type="button" onClick={reset} className="btn btn-primary mt-7">
                    جرّب تاني
                  </button>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <Field label="الاسم" error={errors.name}>
                    {(props) => (
                      <input
                        {...props}
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="field"
                        value={values.name}
                        onChange={(e) => update('name', e.target.value)}
                        onBlur={() => onBlur('name')}
                      />
                    )}
                  </Field>

                  <Field label="رقم الموبايل" error={errors.phone} hint="مثال: 01012345678">
                    {(props) => (
                      <input
                        {...props}
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        dir="ltr"
                        required
                        className="field text-end"
                        value={values.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        onBlur={() => onBlur('phone')}
                      />
                    )}
                  </Field>

                  <Field label="اليوم" error={errors.date}>
                    {(props) => (
                      <input
                        {...props}
                        name="date"
                        type="date"
                        min={todayInCairo()}
                        required
                        className="field"
                        value={values.date}
                        onChange={(e) => update('date', e.target.value)}
                        onBlur={() => onBlur('date')}
                      />
                    )}
                  </Field>

                  <Field label="الساعة" error={errors.time}>
                    {(props) => (
                      <input
                        {...props}
                        name="time"
                        type="time"
                        required
                        className="field"
                        value={values.time}
                        onChange={(e) => update('time', e.target.value)}
                        onBlur={() => onBlur('time')}
                      />
                    )}
                  </Field>

                  <Field label="عدد الأفراد" className="sm:col-span-2">
                    {(props) => (
                      <select
                        {...props}
                        name="guests"
                        className="field"
                        value={values.guests}
                        onChange={(e) => update('guests', e.target.value)}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {toArabicDigits(n)} {n === 1 ? 'فرد' : n === 2 ? 'فردين' : n <= 10 ? 'أفراد' : 'فرد'}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>

                  <Field label="ملاحظات" optional className="sm:col-span-2">
                    {(props) => (
                      <textarea
                        {...props}
                        name="notes"
                        rows={3}
                        className="field resize-y"
                        placeholder="عيد ميلاد؟ ترابيزة جنب الشباك؟"
                        value={values.notes}
                        onChange={(e) => update('notes', e.target.value)}
                      />
                    )}
                  </Field>

                  <div className="sm:col-span-2">
                    <button type="submit" className="btn btn-primary w-full">
                      أكّد الحجز
                    </button>
                    <p className="mt-3 text-center text-sm text-muted">
                      الفورم ده للعرض بس، ومش بيبعت بياناتك لأي حد.
                    </p>
                  </div>
                </m.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
