import { useEffect } from 'react'

const SITE_TITLE = 'Harish Hanumant Velip | Frontend Developer'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Harish Hanumant Velip` : SITE_TITLE
  }, [title])
}