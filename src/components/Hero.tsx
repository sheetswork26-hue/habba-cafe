import { m } from 'framer-motion'
import { unsplash, unsplashSrcSet } from '../lib/images'
import OpenBadge from './OpenBadge'

// نفس الصورة والمقاسات اللي معمول لها preload في index.html
const HERO_IMAGE = '1554118811-1e0d58224f24'
const HERO_WIDTHS = [640, 1024, 1600, 2200]

const ease = [0.22, 1, 0.36, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  }
}

// العنوان والفقرة هما أكبر نص في أول شاشة (عنصر الـ LCP)، فبيتحركوا من غير إخفاء
// عشان يترسموا من أول فريم ومايتأخرش الـ LCP لحد ما الأنيميشن يخلص
function slideUp(delay: number) {
  return {
    initial: { y: 24 },
    animate: { y: 0 },
    transition: { duration: 0.8, delay, ease },
  }
}

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-end overflow-hidden bg-[#1a120d] text-white"
    >
      {/* صورة أول شاشة: من غير lazy وبأولوية تحميل عالية */}
      <img
        src={unsplash(HERO_IMAGE, 1600)}
        srcSet={unsplashSrcSet(HERO_IMAGE, HERO_WIDTHS)}
        sizes="100vw"
        alt="صالة كافيه حَبّة من جوّه، ترابيزات خشب وإضاءة دافية"
        width={1600}
        height={1067}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#120b08] via-[#120b08]/65 to-[#120b08]/35"
      />

      <div className="container-page pb-16 pt-36 sm:pb-24">
        <div className="max-w-3xl">
          <m.div {...fadeUp(0.05)}>
            <OpenBadge variant="on-image" />
          </m.div>

          <m.h1
            id="hero-title"
            {...slideUp(0.05)}
            className="mt-6 text-5xl font-bold leading-[1.25] sm:text-6xl md:text-7xl"
          >
            قهوة مختصة،
            <br />
            <span className="text-[#e9b27c]">على مهلها.</span>
          </m.h1>

          <m.p {...slideUp(0.12)} className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">
            في قلب المعادي، بنحمّص بن جديد كل أسبوع وبنحضّره قدامك. تعالى افطر، اشتغل، أو اقعد
            ساعة من غير ما حد يستعجلك.
          </m.p>

          <m.div {...fadeUp(0.4)} className="mt-9 flex flex-wrap gap-3">
            <a href="#reserve" className="btn bg-[#e0a165] text-[#1a120d] hover:brightness-110">
              احجز ترابيزة
            </a>
            <a
              href="#menu"
              className="btn border border-white/40 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15"
            >
              شوف المنيو
            </a>
          </m.div>
        </div>
      </div>
    </section>
  )
}
