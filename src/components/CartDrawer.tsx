import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice, toArabicDigits } from '../lib/format'
import { isEgyptianMobile } from '../lib/phone'
import { unsplash } from '../lib/images'
import QuantityStepper from './QuantityStepper'

type OrderType = 'pickup' | 'delivery'

const DELIVERY_FEE = 30

interface Checkout {
  name: string
  phone: string
  address: string
}

type CheckoutErrors = Partial<Record<keyof Checkout, string>>

interface Receipt {
  name: string
  type: OrderType
  total: number
  count: number
}

function validate(values: Checkout, type: OrderType): CheckoutErrors {
  const errors: CheckoutErrors = {}
  if (values.name.trim().length < 2) errors.name = 'اكتب اسمك عشان ننادي عليك.'
  if (!values.phone.trim()) errors.phone = 'اكتب رقم موبايلك.'
  else if (!isEgyptianMobile(values.phone))
    errors.phone = 'الرقم مش مظبوط. اكتب رقم موبايل مصري ١١ رقم يبدأ بـ 010 أو 011 أو 012 أو 015.'
  if (type === 'delivery' && values.address.trim().length < 8)
    errors.address = 'اكتب العنوان بالتفصيل: الشارع ورقم العمارة والشقة.'
  return errors
}

export default function CartDrawer() {
  const { lines, count, subtotal, setQuantity, clear, isOpen, close } = useCart()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [type, setType] = useState<OrderType>('pickup')
  const [values, setValues] = useState<Checkout>({ name: '', phone: '', address: '' })
  const [errors, setErrors] = useState<CheckoutErrors>({})
  const [receipt, setReceipt] = useState<Receipt | null>(null)

  const total = subtotal + (type === 'delivery' ? DELIVERY_FEE : 0)

  // <dialog> الأصلي بيدّينا حبس الـ focus وقفل بـ Escape من غير مكتبات
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) {
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  function handleClose() {
    // بعد تأكيد الطلب، قفل النافذة بيبدأ طلب جديد
    if (receipt) {
      clear()
      setReceipt(null)
      setValues({ name: '', phone: '', address: '' })
      setType('pickup')
    }
    setErrors({})
    close()
  }

  function update(field: keyof Checkout, value: string) {
    const next = { ...values, [field]: value }
    setValues(next)
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validate(next, type)[field] }))
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate(values, type)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as (keyof Checkout)[])[0]
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    // عرض تجريبي: مفيش طلب بيتبعت ولا دفع بيحصل
    setReceipt({ name: values.name.trim(), type, total, count })
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cart-title"
      onClose={handleClose}
      onClick={(e) => {
        // الضغط على الخلفية المعتمة (برّه محتوى النافذة) بيقفلها
        if (e.target === e.currentTarget) e.currentTarget.close()
      }}
      className="cart-drawer fixed inset-y-0 start-auto end-0 h-dvh max-h-none w-full max-w-md bg-bg text-ink shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="cart-title" className="text-2xl font-bold">
            {receipt ? 'تم' : 'طلبك'}
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="قفل"
            className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:bg-accent-soft"
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
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        {receipt ? (
          <div role="status" className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent">
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
            <h3 className="mt-5 text-2xl font-bold">تمام يا {receipt.name}</h3>
            <p className="mt-3 text-muted">
              {toArabicDigits(receipt.count)} {receipt.count > 10 ? 'قطعة' : receipt.count > 2 ? 'قطع' : receipt.count === 2 ? 'قطعتين' : 'قطعة'}{' '}
              بإجمالي {formatPrice(receipt.total)}،{' '}
              {receipt.type === 'pickup' ? 'استلام من الفرع' : 'توصيل للعنوان اللي كتبته'}.
            </p>
            <p className="mt-6 rounded-2xl border border-dashed border-accent bg-accent-soft px-5 py-4 font-medium">
              ده عرض تجريبي: الطلب ماتبعتش لأي حد، ومفيش دفع ولا بيانات اتحفظت.
            </p>
            <button type="button" onClick={() => dialogRef.current?.close()} className="btn btn-primary mt-7">
              اطلب تاني
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-lg font-semibold">لسه ماضفتش حاجة</p>
            <p className="mt-2 text-muted">اختار من المنيو ودوس «ضيف للطلب».</p>
            <a href="#menu" onClick={() => dialogRef.current?.close()} className="btn btn-primary mt-6">
              روح للمنيو
            </a>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="divide-y divide-line">
                {lines.map(({ item, quantity, lineTotal }) => (
                  <li key={item.id} className="flex items-center gap-3 py-3">
                    <img
                      src={unsplash(item.image, 160, { ratio: 1 })}
                      alt=""
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      className="size-16 shrink-0 rounded-xl bg-surface-2 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{item.name}</p>
                      <p className="text-sm text-muted">{formatPrice(lineTotal)}</p>
                    </div>
                    <QuantityStepper
                      name={item.name}
                      quantity={quantity}
                      onChange={(q) => setQuantity(item.id, q)}
                      size="sm"
                    />
                  </li>
                ))}
              </ul>

              <fieldset className="mt-6">
                <legend className="mb-2 font-medium">طريقة الاستلام</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: 'pickup', label: 'استلام من الفرع', note: 'جاهز في ١٥ دقيقة' },
                      { id: 'delivery', label: 'توصيل', note: `داخل المعادي · ${formatPrice(DELIVERY_FEE)}` },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.id}
                      className={`cursor-pointer rounded-2xl border px-4 py-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                        type === option.id ? 'border-accent bg-accent-soft' : 'border-line bg-surface'
                      }`}
                    >
                      <input
                        type="radio"
                        name="orderType"
                        value={option.id}
                        checked={type === option.id}
                        onChange={() => {
                          setType(option.id)
                          setErrors((e) => ({ ...e, address: undefined }))
                        }}
                        className="sr-only"
                      />
                      <span className="block font-semibold">{option.label}</span>
                      <span className="block text-sm text-muted">{option.note}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5 grid gap-4">
                <div>
                  <label htmlFor="cart-name" className="mb-1.5 block font-medium">
                    الاسم
                  </label>
                  <input
                    id="cart-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="field"
                    value={values.name}
                    onChange={(e) => update('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'cart-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="cart-name-error" role="alert" className="mt-1.5 text-sm text-danger">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="cart-phone" className="mb-1.5 block font-medium">
                    رقم الموبايل
                  </label>
                  <input
                    id="cart-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    required
                    className="field text-end"
                    value={values.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'cart-phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="cart-phone-error" role="alert" className="mt-1.5 text-sm text-danger">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {type === 'delivery' && (
                  <div>
                    <label htmlFor="cart-address" className="mb-1.5 block font-medium">
                      العنوان
                    </label>
                    <textarea
                      id="cart-address"
                      name="address"
                      rows={2}
                      autoComplete="street-address"
                      required
                      className="field resize-y"
                      value={values.address}
                      onChange={(e) => update('address', e.target.value)}
                      aria-invalid={Boolean(errors.address)}
                      aria-describedby={errors.address ? 'cart-address-error' : undefined}
                    />
                    {errors.address && (
                      <p id="cart-address-error" role="alert" className="mt-1.5 text-sm text-danger">
                        {errors.address}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <footer className="border-t border-line bg-surface px-5 py-4">
              <dl className="space-y-1">
                <div className="flex justify-between text-muted">
                  <dt>الأصناف</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                {type === 'delivery' && (
                  <div className="flex justify-between text-muted">
                    <dt>التوصيل</dt>
                    <dd>{formatPrice(DELIVERY_FEE)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <dt>الإجمالي</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
              <button type="submit" className="btn btn-primary mt-4 w-full">
                أكّد الطلب · {formatPrice(total)}
              </button>
              <p className="mt-2 text-center text-sm text-muted">عرض تجريبي، مفيش دفع ولا طلب حقيقي.</p>
            </footer>
          </form>
        )}
      </div>
    </dialog>
  )
}
