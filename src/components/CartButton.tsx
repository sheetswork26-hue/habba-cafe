import { useCart } from '../context/CartContext'
import { formatPrice, toArabicDigits } from '../lib/format'

/** زرار عايم بيظهر أول ما السلة يبقى فيها حاجة */
export default function CartButton() {
  const { count, subtotal, open, isOpen } = useCart()
  if (count === 0 || isOpen) return null

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`افتح الطلب: ${toArabicDigits(count)} قطعة، الإجمالي ${formatPrice(subtotal)}`}
      className="btn btn-primary fixed bottom-5 end-5 z-40 shadow-xl shadow-black/25"
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
        <path d="M6 8h12l-1 12H7L6 8z" />
        <path d="M9 8V7a3 3 0 0 1 6 0v1" />
      </svg>
      <span>طلبك</span>
      <span className="grid min-w-6 place-items-center rounded-full bg-accent-ink px-1.5 text-sm text-accent">
        {toArabicDigits(count)}
      </span>
      <span>{formatPrice(subtotal)}</span>
    </button>
  )
}
