import Section from './Section'
import { profile } from '../data/Profile'

function About() {
  return (
    <Section id="about" title="About me">
      <div className="max-w-3xl space-y-4 text-lg text-muted">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}

export default About