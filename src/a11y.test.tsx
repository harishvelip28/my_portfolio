import { render, screen } from '@testing-library/react'
import axe from 'axe-core'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { projects } from './data/projects'
import { routes } from './routes'

const slug = projects.find((item) => item.slug)?.slug
if (!slug) throw new Error('These tests need at least one project with a slug')

function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

async function expectNoViolations(container: HTMLElement) {
  const results = await axe.run(container, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    rules: { 'color-contrast': { enabled: false } },
  })

  const summary = results.violations.map(
    (violation) =>
      `${violation.id}: ${violation.help} (${violation.nodes.length} element(s))`,
  )
  expect(summary).toEqual([])
}

describe('accessibility (axe, WCAG A and AA)', () => {
  beforeEach(() => {
    // a request that never resolves keeps the repos block in its loading state
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('home page has no violations', async () => {
    const { container } = renderRoute('/')
    await screen.findByRole('heading', { level: 1 })

    await expectNoViolations(container)
  })

  it('404 page has no violations', async () => {
    const { container } = renderRoute('/nope')
    await screen.findByRole('heading', { name: 'Page not found' })

    await expectNoViolations(container)
  })

  it('project detail page has no violations', async () => {
    const { container } = renderRoute(`/projects/${slug}`)
    await screen.findByRole('heading', { level: 1 }, { timeout: 3000 })

    await expectNoViolations(container)
  })
})