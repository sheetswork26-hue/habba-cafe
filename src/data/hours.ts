export interface DayHours {
  label: string
  /** دقايق من بداية اليوم */
  open: number
  /** ممكن تعدّي 1440 لو القفل بعد نص الليل */
  close: number
}

const h = (hours: number) => hours * 60

/** الترتيب بيبدأ من الأحد (0) زي Date.getDay() */
export const weeklyHours: DayHours[] = [
  { label: 'الأحد', open: h(8), close: h(24) },
  { label: 'الاثنين', open: h(8), close: h(24) },
  { label: 'الثلاثاء', open: h(8), close: h(24) },
  { label: 'الأربعاء', open: h(8), close: h(24) },
  { label: 'الخميس', open: h(8), close: h(25) },
  { label: 'الجمعة', open: h(9), close: h(25) },
  { label: 'السبت', open: h(8), close: h(24) },
]

/** ترتيب العرض في الجدول: الأسبوع بيبدأ السبت */
export const displayOrder = [6, 0, 1, 2, 3, 4, 5]

export const contact = {
  address: '٢٤ شارع ٩، المعادي، القاهرة',
  /** البراند وهمي، فالرابط بيفتح شارع ٩ نفسه على خرائط جوجل مش مكان بعينه */
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('شارع 9، المعادي، القاهرة')}`,
  phone: '010 0000 0000',
  email: 'hello@habba.example',
}
