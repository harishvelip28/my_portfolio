import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
  reveal?: boolean
}

function Section({ id, title, children, reveal = true }: SectionProps) {
  return (
    <section id={id} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-10 text-3xl font-bold text-heading">
            <span className="text-accent">#</span> {title}
          </h2>
        </Reveal>
        {reveal ? <Reveal delay={100}>{children}</Reveal> : children}
      </div>
    </section>
  )
}

export default Section