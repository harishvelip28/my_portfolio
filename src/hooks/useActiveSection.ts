import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

export function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState('')
  const { pathname } = useLocation()

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px' }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [ids, pathname])

  return activeId
}