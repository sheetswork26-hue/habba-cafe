const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'
const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹'

/** بيشيل المسافات والشرطات وبيحوّل الأرقام العربية للاتينية */
export function normalizePhone(input: string) {
  return input
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[\s\-().]/g, '')
}

/**
 * رقم موبايل مصري: 010 / 011 / 012 / 015 وبعدها 8 أرقام،
 * مع قبول كود الدولة بأي صيغة (+20 أو 0020 أو 20).
 */
const EG_MOBILE = /^(?:\+20|0020|20|0)1[0125]\d{8}$/

export function isEgyptianMobile(input: string) {
  return EG_MOBILE.test(normalizePhone(input))
}
