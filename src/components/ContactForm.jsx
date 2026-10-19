import { useState } from 'react'
import { profile } from '../data/Profile'

const initialForm = { name: '', email: '', message: '' }

const fieldClass =
  'w-full rounded-lg border border-line bg-card px-4 py-3 text-body placeholder:text-faint focus:border-accent focus:outline-none'

function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(profile.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error('Request failed')

      setForm(initialForm)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-body">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-body">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-body">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="How can I help?"
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>

      <div role="status" aria-live="polite">
        {status === 'success' && (
          <p className="text-green-500">Thanks! Your message was sent.</p>
        )}
        {status === 'error' && (
          <p className="text-red-500">
            Something went wrong. Please try again or email me directly.
          </p>
        )}
      </div>
    </form>
  )
}

export default ContactForm