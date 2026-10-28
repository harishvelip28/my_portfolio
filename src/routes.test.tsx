import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Layout from './components/Layout'
import { profile } from './data/profile'
import { projects } from './data/projects'
import ErrorPage from './pages/ErrorPage'
import { routes } from './routes'

const project = projects.find((item) => item.slug)
if (!project?.slug) throw new Error('These tests need at least one project with a slug')
const slug = project.slug
const title = project.title

function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

function Boom(): never {
  throw new Error('Test crash')
}

describe('routes', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => [] } as Response),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('renders the home page at /', async () => {
    renderRoute('/')

    expect(
      await screen.findByRole('heading', { level: 1, name: profile.name }),
    ).toBeInTheDocument()
    expect(await screen.findByText('No public repositories to show yet.')).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Harish Hanumant Velip | Frontend Developer'))
  })

  it('shows the 404 page inside the layout for unknown URLs', async () => {
    renderRoute('/nope')

    expect(await screen.findByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Page not found | Harish Hanumant Velip'))
  })

  it('navigates from the 404 page back to home without a reload', async () => {
    const user = userEvent.setup()
    const router = renderRoute('/nope')

    await user.click(await screen.findByRole('link', { name: 'Back to home' }))

    expect(
      await screen.findByRole('heading', { level: 1, name: profile.name }),
    ).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/')
   const block = (await screen.findByText('More on GitHub')).parentElement
console.log('FETCH CALLS:', vi.mocked(fetch).mock.calls.length)
console.log('BLOCK:', block?.outerHTML)
  })

  it('renders a project detail page for a known slug', async () => {
    renderRoute(`/projects/${slug}`)

    expect(
      await screen.findByRole('heading', { level: 1, name: title }, { timeout: 3000 }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to projects/i })).toHaveAttribute(
      'href',
      '/#projects',
    )
    await waitFor(() => expect(document.title).toBe(`${title} | Harish Hanumant Velip`))
  })

  it('shows the 404 page for an unknown project slug', async () => {
    renderRoute('/projects/does-not-exist')

    expect(
      await screen.findByRole('heading', { name: 'Page not found' }, { timeout: 3000 }),
    ).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Page not found | Harish Hanumant Velip'))
  })

  it('shows the error page, with the layout intact, when a page crashes', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const router = createMemoryRouter([
      {
        path: '/',
        Component: Layout,
        children: [
          {
            ErrorBoundary: ErrorPage,
            children: [{ index: true, Component: Boom }],
          },
        ],
      },
    ])

    render(<RouterProvider router={router} />)

    expect(await screen.findByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument()
    expect(screen.getByText('Test crash')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  })
})