const BASE = 'https://images.unsplash.com/photo-'

interface ImageOptions {
  /** الارتفاع ÷ العرض (مثلاً 0.75 لصورة 4:3). من غيرها الصورة بتفضل بنسبتها الأصلية */
  ratio?: number
  quality?: number
}

/** بيبني رابط صورة Unsplash بعرض محدد، مع تحويل تلقائي لـ WebP/AVIF */
export function unsplash(id: string, width: number, { ratio, quality = 65 }: ImageOptions = {}) {
  const height = ratio ? `&h=${Math.round(width * ratio)}` : ''
  return `${BASE}${id}?auto=format&fit=crop&w=${width}${height}&q=${quality}`
}

/** srcset جاهز لمجموعة مقاسات */
export function unsplashSrcSet(id: string, widths: number[], options: ImageOptions = {}) {
  return widths.map((w) => `${unsplash(id, w, options)} ${w}w`).join(', ')
}
