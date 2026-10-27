import { Link, useParams } from 'react-router'
import { projects } from '../data/projects'
import NotFound from './NotFound'

function ProjectDetail() {
  const { slug } = useParams<'slug'>()
  const project = projects.find((item) => item.slug === slug)

  if (!project) return <NotFound />

  const { title, description, tech, highlights, github, live } = project

  return (
    <article className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link to="/#projects" className="text-sm text-accent hover:underline">
          ← Back to projects
        </Link>

        <h1 className="mt-6 text-4xl font-bold text-heading">{title}</h1>
        <p className="mt-4 text-lg text-muted">{description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {tech.map((item) => (
            <li
              key={item}
              className="rounded-full bg-pill px-3 py-1 font-mono text-xs text-accent"
            >
              {item}
            </li>
          ))}
        </ul>

        {highlights && highlights.length > 0 && (
          <>
            <h2 className="mt-12 text-2xl font-semibold text-heading">Highlights</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {(github || live) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-line px-5 py-2.5 text-body transition-colors hover:border-accent hover:text-accent"
              >
                View code ↗
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-500"
              >
                Live demo ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default ProjectDetail