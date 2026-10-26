import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

// ids of every section to watch ('home' is the Hero)
const sectionIds = ['home', ...navLinks.map((link) => link.href.slice(1))]

interface NavLinksProps {
  className: string
  activeId: string
  onLinkClick?: () => void
}

function NavLinks({ className, activeId, onLinkClick }: NavLinksProps) {
  return (
    <ul className={className}>
      {navLinks.map((link) => {
        const isActive = link.href === `#${activeId}`

        return (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={onLinkClick}
              aria-current={isActive ? 'location' : undefined}
              className={`block transition-colors hover:text-heading ${
                isActive ? 'text-accent' : 'text-body'
              }`}
            >
              {link.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const activeId = useActiveSection(sectionIds) // new

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-line bg-card/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-xl font-bold text-heading">
          Harish<span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-4">
          <NavLinks className="hidden gap-8 md:flex" activeId={activeId} />
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
          activeId={activeId}
          onLinkClick={() => setIsOpen(false)}
        />
      )}
    </header>
  )
}

export default Navbar