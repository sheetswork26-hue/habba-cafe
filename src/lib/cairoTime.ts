import { weeklyHours } from '../data/hours'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const cairoFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Africa/Cairo',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** اليوم (0 = الأحد) والدقايق من بداية اليوم بتوقيت القاهرة، بغض النظر عن توقيت جهاز الزائر */
export function getCairoNow(date = new Date()) {
  const parts = cairoFormatter.formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return {
    day: WEEKDAYS.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

export interface OpenStatus {
  isOpen: boolean
  /** دقايق من بداية اليوم: ميعاد القفل لو مفتوح، أو ميعاد الفتح الجاي لو مقفول */
  changesAt: number
  /** يوم الأسبوع الحالي في القاهرة (0 = الأحد) */
  today: number
}

export function getOpenStatus(date = new Date()): OpenStatus {
  const { day, minutes } = getCairoNow(date)
  const today = weeklyHours[day]
  const yesterday = weeklyHours[(day + 6) % 7]

  // وردية امبارح لسه شغّالة بعد نص الليل (مثلاً الخميس لحد ١ ص)
  if (yesterday.close > 1440 && minutes < yesterday.close - 1440) {
    return { isOpen: true, changesAt: yesterday.close, today: day }
  }
  if (minutes >= today.open && minutes < today.close) {
    return { isOpen: true, changesAt: today.close, today: day }
  }
  const nextOpen = minutes < today.open ? today.open : weeklyHours[(day + 1) % 7].open
  return { isOpen: false, changesAt: nextOpen, today: day }
}
