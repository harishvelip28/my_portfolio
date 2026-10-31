import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: ReactNode
  className?: string
}

function Reveal({ children, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`motion-safe:transition motion-safe:duration-700 motion-safe:ease-out ${
        inView
          ? 'opacity-100 translate-y-0'
          : 'motion-safe:translate-y-6 motion-safe:opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default Reveal