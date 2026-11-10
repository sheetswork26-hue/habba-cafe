import type { ReactNode } from 'react'
import { m } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  /** تأخير بالثواني، مفيد لتتابع ظهور عناصر جنب بعض */
  delay?: number
  className?: string
}

/** ظهور هادي للعنصر أول ما يدخل الشاشة، مرة واحدة بس */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}
