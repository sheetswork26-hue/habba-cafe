import Reveal from './Reveal'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  description?: string
  align?: 'start' | 'center'
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <Reveal className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="mb-3 text-sm font-semibold text-accent">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-bold sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </Reveal>
  )
}
