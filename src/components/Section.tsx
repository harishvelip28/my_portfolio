import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
}

function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-3xl font-bold text-heading">
          <span className="text-accent">#</span> {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

export default Section