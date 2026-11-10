import { beanOfWeek as bean, roastLevels } from '../data/bean'
import { formatPrice } from '../lib/format'
import { unsplash, unsplashSrcSet } from '../lib/images'
import Reveal from './Reveal'

const facts = [
  { label: 'بلد المنشأ', value: `${bean.origin}، ${bean.region}` },
  { label: 'المعالجة', value: bean.process },
  { label: 'الارتفاع', value: bean.altitude },
  { label: 'السلالة', value: bean.variety },
]

export default function BeanOfWeek() {
  return (
    <section id="bean" aria-labelledby="bean-title" className="bg-surface-2 py-20 md:py-28">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-line">
            <img
              src={unsplash(bean.image, 800, { ratio: 1.1 })}
              srcSet={unsplashSrcSet(bean.image, [480, 640, 800, 1100], { ratio: 1.1 })}
              sizes="(min-width: 1024px) 520px, 100vw"
              alt="بن مطحون في بورتافلتر جنب حبوب بن محمّصة"
              width={800}
              height={880}
              loading="lazy"
              decoding="async"
              className="aspect-[10/11] size-full object-cover"
            />
            <p className="absolute bottom-4 start-4 rounded-2xl bg-[#1a120d]/85 px-4 py-2.5 text-sm text-[#f3e9dd] backdrop-blur-sm">
              كيس ٢٥٠ جم ·{' '}
              <span className="font-semibold text-[#e9b27c]">{formatPrice(bean.pricePer250g)}</span>
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-3 text-sm font-semibold text-accent">بن الأسبوع</p>
            <h2 id="bean-title" className="text-3xl font-bold sm:text-4xl md:text-5xl">
              {bean.name}
            </h2>
            <p className="mt-4 text-lg text-muted">{bean.story}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="mt-0.5 font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-sans text-sm text-muted">درجة التحميص</h3>
                <p className="font-semibold">{roastLevels[bean.roastIndex]}</p>
              </div>
              <div
                role="img"
                aria-label={`درجة التحميص: ${roastLevels[bean.roastIndex]}، الدرجة ${bean.roastIndex + 1} من ${roastLevels.length}`}
                className="mt-3 grid grid-cols-5 gap-1.5"
              >
                {roastLevels.map((level, i) => (
                  <span
                    key={level}
                    className={`h-2.5 rounded-full ${i <= bean.roastIndex ? 'bg-accent' : 'bg-line'}`}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted" aria-hidden="true">
                <span>فاتح</span>
                <span>غامق</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-7">
              <h3 className="font-sans text-sm text-muted">نوتات الطعم</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {bean.notes.map((note) => (
                  <li
                    key={note}
                    className="rounded-full border border-line bg-surface px-4 py-1.5 font-medium"
                  >
                    {note}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-muted">{bean.brew}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
