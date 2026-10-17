import Section from './Section'
import { skills } from '../data/Skills'

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
          >
            <h3 className="mb-4 font-semibold text-blue-400">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Skills