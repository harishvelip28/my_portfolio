import { useEffect, useState } from 'react'
import type { FetchStatus, GithubRepo } from '../types'

export function useGithubRepos(username: string) {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [status, setStatus] = useState<FetchStatus>('loading')

  useEffect(() => {
    if (!username) return

    const controller = new AbortController()

    async function loadRepos() {
      try {
        setStatus('loading')

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
          { signal: controller.signal }
        )
        if (!response.ok) throw new Error(`GitHub responded ${response.status}`)

        const data: GithubRepo[] = await response.json()
        setRepos(data)
        setStatus('success')
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setStatus('error')
      }
    }

    loadRepos()

    return () => controller.abort()
  }, [username])

  return { repos, status }
}