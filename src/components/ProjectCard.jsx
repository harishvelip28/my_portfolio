function ProjectCard({ project }) {
  const { title, description, tech, github, live } = project

  return (
    <article className="flex flex-col rounded-xl border border-line bg-card p-6 transition-colors hover:border-blue-500">
      <h3 className="text-xl font-semibold text-heading">{title}</h3>
      <p className="mt-3 text-muted">{description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {tech.map((item) => (
          <li
            key={item}
            className="rounded-full bg-pill px-3 py-1 font-mono text-xs text-accent"
          >
            {item}
          </li>
        ))}
      </ul>

      {(github || live) && (
        <div className="mt-6 flex gap-4 text-sm">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body hover:text-accent"
            >
              GitHub ↗
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body hover:text-accent"
            >
              Live demo ↗
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export default ProjectCard