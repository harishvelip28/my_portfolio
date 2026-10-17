import Section from './Section'
import { profile } from '../data/Profile'

function Contact() {
  const links = profile.socials.filter((social) => social.url)

  return (
    <Section id="contact" title="Get in touch">
      <div className="max-w-2xl">
        <p className="text-lg text-slate-400">
          I'm always open to discussing frontend roles, freelance work or
          interesting projects. My inbox is open, so say hello.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500"
        >
          Say hello
        </a>

        {links.length > 0 && (
          <ul className="mt-8 flex gap-6">
            {links.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-blue-400"
                >
                  {social.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  )
}

export default Contact