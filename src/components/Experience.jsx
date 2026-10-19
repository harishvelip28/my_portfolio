import Section from './Section'
import { experience } from '../data/experience'

function ExperienceItem({ job }) {
  return (
    <li className="relative pb-12 pl-8 last:pb-0">
      <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-page bg-blue-500" />

      <p className="font-mono text-sm text-accent">{job.period}</p>
      <h3 className="mt-1 text-xl font-semibold text-heading">{job.role}</h3>
      <p className="text-muted">{job.company}</p>

      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
        {job.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </li>
  )
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="max-w-3xl border-l border-line">
        {experience.map((job) => (
          <ExperienceItem key={job.company} job={job} />
        ))}
      </ol>
    </Section>
  )
}

export default Experience