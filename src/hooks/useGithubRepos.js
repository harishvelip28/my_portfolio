import { useEffect, useState } from 'react'

export function useGithubRepos(username) {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading') // loading | success | error

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

        const data = await response.json()
        setRepos(data)
        setStatus('success')
      } catch (error) {
        if (error.name === 'AbortError') return
        setStatus('error')
      }
    }

    loadRepos()

    return () => controller.abort()
  }, [username])

  return { repos, status }
}