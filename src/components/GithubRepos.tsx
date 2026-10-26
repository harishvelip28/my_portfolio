import ProjectCard from './ProjectCard'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { profile } from '../data/profile'
import type { GithubRepo, Project } from '../types'

// Reshape a GitHub repo into the props ProjectCard already understands
function toProject(repo: GithubRepo): Project {
  const { homepage } = repo
  const live = homepage
    ? homepage.startsWith('http')
      ? homepage
      : `https://${homepage}`
    : ''

  return {
    title: repo.name,
    description: repo.description || 'No description yet.',
    tech: [repo.language, ...(repo.topics ?? [])].filter(
      (tag): tag is string => tag !== null
    ),
    github: repo.html_url,
    live,
  }
}

function GithubRepos() {
  const { githubUsername } = profile
  const { repos, status } = useGithubRepos(githubUsername)

  if (!githubUsername) return null

  const visible = repos
    .filter(
      (repo) =>
        !repo.fork &&
        !repo.archived &&
        repo.name.toLowerCase() !== githubUsername.toLowerCase()
    )
    .slice(0, 6)

  return (
    <div className="mt-16">
      <h3 className="mb-6 text-xl font-semibold text-heading">More on GitHub</h3>

      {status === 'loading' && (
        <div className="grid gap-6 md:grid-cols-2" aria-busy="true">
          {[0, 1].map((n) => (
            <div
              key={n}
              className="h-40 animate-pulse rounded-xl border border-line bg-card"
            />
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="text-muted">
          Couldn't load repositories right now.{' '}
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            View them on GitHub ↗
          </a>
        </p>
      )}

      {status === 'success' && visible.length === 0 && (
        <p className="text-muted">No public repositories to show yet.</p>
      )}

      {status === 'success' && visible.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {visible.map((repo) => (
            <ProjectCard key={repo.id} project={toProject(repo)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default GithubRepos