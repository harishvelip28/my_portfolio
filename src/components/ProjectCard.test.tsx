import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import ProjectCard from './ProjectCard'
import type { Project } from '../types'

const baseProject: Project = {
  title: 'Test Project',
  description: 'A project used in tests.',
  tech: ['React', 'TypeScript'],
  github: '',
  live: '',
}

function renderCard(project: Project) {
  return render(
    <MemoryRouter>
      <ProjectCard project={project} />
    </MemoryRouter>,
  )
}

describe('ProjectCard', () => {
  it('shows the title, description and tech tags', () => {
    renderCard(baseProject)

    expect(screen.getByRole('heading', { name: 'Test Project' })).toBeInTheDocument()
    expect(screen.getByText('A project used in tests.')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('hides the GitHub and live links when the URLs are empty', () => {
    renderCard(baseProject)

    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument()
  })

  it('shows the links when URLs are provided', () => {
    renderCard({
      ...baseProject,
      github: 'https://github.com/example/repo',
      live: 'https://example.com',
    })

    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/example/repo',
    )
    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute(
      'href',
      'https://example.com',
    )
  })

  it('has no details link when the project has no slug', () => {
    renderCard(baseProject)

    expect(screen.queryByRole('link', { name: /view details/i })).not.toBeInTheDocument()
  })

  it('links to the detail page when the project has a slug', () => {
    renderCard({ ...baseProject, slug: 'test-project' })

    expect(screen.getByRole('link', { name: /view details/i })).toHaveAttribute(
      'href',
      '/projects/test-project',
    )
  })
})