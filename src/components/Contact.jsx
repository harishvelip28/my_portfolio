import Section from './Section'
import ContactForm from './ContactForm'
import { profile } from '../data/Profile'

function Contact() {
  const links = profile.socials.filter((social) => social.url)

  return (
    <Section id="contact" title="Get in touch">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="text-lg text-muted">
            I'm always open to discussing frontend roles, freelance work or
            interesting projects. Send a message using the form, or email me at{' '}
            <a
              href={`mailto:${profile.email}`}
              className="text-accent hover:underline"
            >
              {profile.email}
            </a>
            .
          </p>

          {links.length > 0 && (
            <ul className="mt-8 flex gap-6">
              {links.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body hover:text-accent"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}

export default Contact