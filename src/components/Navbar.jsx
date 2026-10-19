import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../hooks/useTheme'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function NavLinks({ className, onLinkClick }) {
  return (
    <ul className={className}>
      {navLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={onLinkClick}
            className="block text-body transition-colors hover:text-heading"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-line bg-card/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-xl font-bold text-heading">
          Harish<span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-4">
          <NavLinks className="hidden gap-8 md:flex" />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            className="text-2xl text-body md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {isOpen && (
        <NavLinks
          className="flex flex-col gap-4 bg-card px-6 pb-6 md:hidden"
          onLinkClick={() => setIsOpen(false)}
        />
      )}
    </header>
  )
}

export default Navbar