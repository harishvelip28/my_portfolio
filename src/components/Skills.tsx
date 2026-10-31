import Section from './Section'
import Reveal from './Reveal'
import { skills } from '../data/skills'

function Skills() {
  return (
    <Section id="skills" title="Skills" reveal={false}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, index) => (
          <Reveal key={group.category} delay={index * 100} className="h-full">
            <div className="h-full rounded-xl border border-line bg-card p-6 hover:border-accent motion-safe:transition motion-safe:duration-300 motion-safe:hover:-translate-y-1">
              <h3 className="mb-4 font-semibold text-accent">{group.category}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-pill px-3 py-1 text-sm text-body"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default Skills