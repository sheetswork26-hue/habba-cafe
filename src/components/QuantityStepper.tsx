import { toArabicDigits } from '../lib/format'

interface QuantityStepperProps {
  /** اسم الصنف، للـ aria-label */
  name: string
  quantity: number
  onChange: (quantity: number) => void
  size?: 'md' | 'sm'
}

export default function QuantityStepper({ name, quantity, onChange, size = 'md' }: QuantityStepperProps) {
  const button = size === 'md' ? 'size-11' : 'size-9'
  return (
    <div
      role="group"
      aria-label={`كمية ${name}`}
      className="inline-flex items-center gap-1 rounded-full border border-line bg-surface p-0.5"
    >
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        aria-label={quantity === 1 ? `شيل ${name} من الطلب` : `قلّل كمية ${name}`}
        className={`${button} grid place-items-center rounded-full text-xl transition-colors hover:bg-accent-soft`}
      >
        <span aria-hidden="true">−</span>
      </button>
      <span className="min-w-7 text-center font-semibold" aria-live="polite">
        {toArabicDigits(quantity)}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        aria-label={`زوّد كمية ${name}`}
        className={`${button} grid place-items-center rounded-full text-xl transition-colors hover:bg-accent-soft`}
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  )
}
