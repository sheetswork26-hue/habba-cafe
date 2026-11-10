import { m, type Variants } from 'framer-motion'
import { gallery } from '../data/gallery'
import { unsplash, unsplashSrcSet } from '../lib/images'
import SectionHeading from './SectionHeading'

const BASE_WIDTH = 600

// الظهور بيتحسب على القايمة كلها مش على كل صورة لوحدها،
// عشان IntersectionObserver مش دقيق مع العناصر اللي جوّه CSS columns
const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="gallery-title"
          eyebrow="الجاليري"
          title="يوم عادي في حَبّة"
          description="لقطات من البار، من الصالة، ومن الترابيزات اللي جنب الشباك."
        />

        {/* Masonry بـ CSS columns: كل صورة بنسبتها، ومن غير أي JavaScript للتوزيع */}
        <m.ul
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4"
        >
          {gallery.map((image) => (
            <m.li key={image.id} variants={item} className="mb-4 break-inside-avoid">
              <figure className="group overflow-hidden rounded-2xl bg-surface-2">
                <img
                  src={unsplash(image.id, BASE_WIDTH, { ratio: image.ratio })}
                  srcSet={unsplashSrcSet(image.id, [300, 450, 600], { ratio: image.ratio })}
                  sizes="(min-width: 1024px) 260px, (min-width: 768px) 33vw, 50vw"
                  alt={image.alt}
                  width={BASE_WIDTH}
                  height={Math.round(BASE_WIDTH * image.ratio)}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                />
              </figure>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  )
}
