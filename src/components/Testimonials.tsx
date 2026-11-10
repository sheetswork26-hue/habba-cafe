import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { testimonials } from '../data/testimonials'
import { toArabicDigits } from '../lib/format'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const AUTOPLAY_MS = 6500

function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex justify-center gap-1 text-accent" role="img" aria-label={`التقييم ${toArabicDigits(rating)} من ٥`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`size-5 ${i < rating ? '' : 'opacity-25'}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.500l2.6 5.4 5.9.800-4.3 4.1 1.1 5.900L10 14.900l-5.3 2.8 1.1-5.900L1.5 7.700l5.9-.800z" />
        </svg>
      ))}
    </p>
  )
}

function ArrowButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'الرأي السابق' : 'الرأي التالي'}
      className="inline-flex size-12 items-center justify-center rounded-full border border-line bg-surface transition-colors hover:border-accent hover:text-accent"
    >
      {/* في RTL «التالي» بيشاور شمال */}
      <svg
        viewBox="0 0 24 24"
        className={`size-5 ${direction === 'prev' ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 5l-7 7 7 7" />
      </svg>
    </button>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const count = testimonials.length

  const go = useCallback((step: number) => setIndex((i) => (i + step + count) % count), [count])

  // تشغيل تلقائي، بيقف مع الـ hover أو الـ focus، ومش بيشتغل أصلاً مع reduced motion
  useEffect(() => {
    if (paused || reduceMotion) return
    const id = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion, go])

  const current = testimonials[index]

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-surface-2 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="reviews-title" eyebrow="آراء الزوار" title="بيقولوا علينا إيه" />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div
            role="group"
            aria-roledescription="سلايدر"
            aria-label="آراء الزوار"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') go(1)
              if (e.key === 'ArrowRight') go(-1)
            }}
          >
            <div
              className="relative grid min-h-[20rem] place-items-center rounded-[2rem] border border-line bg-surface px-6 py-10 sm:min-h-[17rem] sm:px-12"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.figure
                  key={index}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 32 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-center"
                >
                  <Stars rating={current.rating} />
                  <blockquote className="mt-5 text-xl leading-loose sm:text-2xl sm:leading-loose">
                    «{current.quote}»
                  </blockquote>
                  <figcaption className="mt-6">
                    <span className="block font-display text-lg font-bold">{current.name}</span>
                    <span className="text-sm text-muted">{current.role}</span>
                  </figcaption>
                </m.figure>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-5">
              <ArrowButton direction="prev" onClick={() => go(-1)} />
              <div className="flex items-center">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`الرأي رقم ${toArabicDigits(i + 1)}`}
                    aria-current={i === index}
                    className="grid size-8 place-items-center"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-300 ${
                        i === index ? 'w-6 bg-accent' : 'w-2 bg-muted/40'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <ArrowButton direction="next" onClick={() => go(1)} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
