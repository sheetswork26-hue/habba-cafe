const arNumber = new Intl.NumberFormat('ar-EG', { useGrouping: false, numberingSystem: 'arab' })

/** بيحوّل الرقم لأرقام عربية (٠-٩) */
export function toArabicDigits(value: number) {
  return arNumber.format(value)
}

export function formatPrice(egp: number) {
  return `${toArabicDigits(egp)} ج.م`
}

/** بيحوّل دقايق من بداية اليوم لوقت مقروء: 480 ← «٨ ص» */
export function formatMinutes(totalMinutes: number) {
  const minutes = ((totalMinutes % 1440) + 1440) % 1440
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0 && m === 0) return '١٢ منتصف الليل'
  const period = h < 12 ? 'ص' : 'م'
  const h12 = h % 12 || 12
  const mm = m ? `:${toArabicDigits(m).padStart(2, '٠')}` : ''
  return `${toArabicDigits(h12)}${mm} ${period}`
}
