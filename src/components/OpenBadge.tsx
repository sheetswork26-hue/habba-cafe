import { useOpenStatus } from '../hooks/useOpenStatus'
import { formatMinutes } from '../lib/format'

interface OpenBadgeProps {
  /** on-image: فوق صورة الهيرو · surface: فوق خلفية الصفحة */
  variant?: 'on-image' | 'surface'
}

/** علامة «مفتوح دلوقتي / مقفول» محسوبة على توقيت القاهرة */
export default function OpenBadge({ variant = 'surface' }: OpenBadgeProps) {
  const { isOpen, changesAt } = useOpenStatus()

  const shell =
    variant === 'on-image'
      ? 'bg-black/45 text-white backdrop-blur-sm ring-1 ring-white/20'
      : 'bg-surface text-ink ring-1 ring-line'

  return (
    <p className={`inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm ${shell}`}>
      <span className="relative flex size-2.5" aria-hidden="true">
        {isOpen && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        )}
        <span
          className={`relative inline-flex size-2.5 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-red-400'}`}
        />
      </span>
      <span className="font-semibold">{isOpen ? 'مفتوح دلوقتي' : 'مقفول'}</span>
      <span className="opacity-80">
        {isOpen ? `بنقفل ${formatMinutes(changesAt)}` : `بنفتح ${formatMinutes(changesAt)}`}
      </span>
    </p>
  )
}
