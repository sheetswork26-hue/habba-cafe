import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { menu, type MenuCategoryId, type MenuItem } from '../data/menu'
import { formatPrice } from '../lib/format'
import { unsplash, unsplashSrcSet } from '../lib/images'
import { useCart } from '../context/CartContext'
import QuantityStepper from './QuantityStepper'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const CARD_RATIO = 0.75

function MenuCard({ item }: { item: MenuItem }) {
  const { quantityOf, setQuantity, open } = useCart()
  const quantity = quantityOf(item.id)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <img
          src={unsplash(item.image, 640, { ratio: CARD_RATIO })}
          srcSet={unsplashSrcSet(item.image, [320, 480, 640, 800], { ratio: CARD_RATIO })}
          sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
          alt={item.name}
          width={640}
          height={480}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {item.tag && (
          <span className="absolute start-3 top-3 rounded-full bg-[#1a120d]/85 px-3 py-1 text-xs font-semibold text-[#f3e9dd] backdrop-blur-sm">
            {item.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <p className="shrink-0 font-semibold text-accent">{formatPrice(item.price)}</p>
        </div>
        <p className="text-muted">{item.description}</p>
        <div className="mt-auto flex min-h-12 items-center pt-3">
          {quantity > 0 ? (
            <div className="flex w-full items-center justify-between gap-3">
              <QuantityStepper
                name={item.name}
                quantity={quantity}
                onChange={(q) => setQuantity(item.id, q)}
              />
              <button
                type="button"
                onClick={open}
                className="font-semibold text-accent underline underline-offset-4"
              >
                شوف الطلب
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setQuantity(item.id, 1)}
              aria-label={`ضيف ${item.name} للطلب`}
              className="btn w-full border border-accent text-accent hover:bg-accent hover:text-accent-ink"
            >
              ضيف للطلب
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Menu() {
  const [active, setActive] = useState<MenuCategoryId>('coffee')
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const category = menu.find((c) => c.id === active)!

  // تنقل بالأسهم بين التابات. في RTL السهم الشمال بيروح للتاب اللي بعده
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const index = menu.findIndex((c) => c.id === active)
    let next = index
    if (e.key === 'ArrowLeft') next = (index + 1) % menu.length
    else if (e.key === 'ArrowRight') next = (index - 1 + menu.length) % menu.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = menu.length - 1
    else return
    e.preventDefault()
    setActive(menu[next].id)
    tabRefs.current[menu[next].id]?.focus()
  }

  return (
    <section id="menu" aria-labelledby="menu-title" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="menu-title"
          eyebrow="المنيو"
          title="اختار اللي يعدل مزاجك"
          description="كل حاجة بتتعمل طازة في نفس اليوم. ضيف اللي يعجبك للطلب واستلمه من الفرع أو يوصلّك. الأسعار بالجنيه وشاملة الضريبة."
        />

        <Reveal className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="أقسام المنيو"
            onKeyDown={onKeyDown}
            className="inline-flex gap-1 rounded-full border border-line bg-surface p-1.5"
          >
            {menu.map((c) => {
              const selected = c.id === active
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[c.id] = el
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  className={`min-h-11 rounded-full px-6 font-semibold transition-colors duration-300 sm:px-8 ${
                    selected ? 'bg-accent text-accent-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex={0} className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <m.ul
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {category.items.map((item) => (
                <li key={item.id}>
                  <MenuCard item={item} />
                </li>
              ))}
            </m.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
