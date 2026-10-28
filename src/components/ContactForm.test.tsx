import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ContactForm from './ContactForm'
import { profile } from '../data/profile'

const fetchMock = vi.fn()
const okResponse = { ok: true } as Response
const failedResponse = { ok: false } as Response

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Name'), 'Harish')
  await user.type(screen.getByLabelText('Email'), 'harish@example.com')
  await user.type(screen.getByLabelText('Message'), 'Hello there')
  await user.click(screen.getByRole('button', { name: 'Send message' }))
}

describe('ContactForm', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the three fields and a submit button', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled()
  })

  it('updates the fields as the user types', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText('Name'), 'Harish')

    expect(screen.getByLabelText('Name')).toHaveValue('Harish')
  })

  it('sends the form data and shows a success message', async () => {
    const user = userEvent.setup()
    fetchMock.mockResolvedValue(okResponse)
    render(<ContactForm />)

    await fillAndSubmit(user)

    expect(await screen.findByText(/your message was sent/i)).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith(
      profile.formEndpoint,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          name: 'Harish',
          email: 'harish@example.com',
          message: 'Hello there',
        }),
      }),
    )
    expect(screen.getByLabelText('Name')).toHaveValue('')
  })

  it('shows "Sending..." and disables the button while the request is in flight', async () => {
    const user = userEvent.setup()
    let resolveFetch!: (value: Response) => void
    fetchMock.mockReturnValue(
      new Promise<Response>((resolve) => {
        resolveFetch = resolve
      }),
    )
    render(<ContactForm />)

    await fillAndSubmit(user)

    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled()

    resolveFetch(okResponse)
    expect(await screen.findByText(/your message was sent/i)).toBeInTheDocument()
  })

  it('shows an error and keeps the typed text when the server rejects the request', async () => {
    const user = userEvent.setup()
    fetchMock.mockResolvedValue(failedResponse)
    render(<ContactForm />)

    await fillAndSubmit(user)

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveValue('Harish')
  })

  it('shows an error when the network request fails', async () => {
    const user = userEvent.setup()
    fetchMock.mockRejectedValue(new Error('offline'))
    render(<ContactForm />)

    await fillAndSubmit(user)

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })
})