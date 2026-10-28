import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  it('is a switch that reflects the current theme', () => {
    const { rerender } = render(<ThemeToggle theme="light" onToggle={() => {}} />)
    const toggle = screen.getByRole('switch', { name: 'Dark mode' })

    expect(toggle).not.toBeChecked()

    rerender(<ThemeToggle theme="dark" onToggle={() => {}} />)

    expect(toggle).toBeChecked()
  })

  it('calls onToggle when clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<ThemeToggle theme="light" onToggle={onToggle} />)

    await user.click(screen.getByRole('switch'))

    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})