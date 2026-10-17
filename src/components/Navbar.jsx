import { useState } from 'react'

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
            className="block text-slate-300 transition-colors hover:text-white"
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

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-xl font-bold text-white">
          Harish<span className="text-blue-500">.</span>
        </a>

        <NavLinks className="hidden gap-8 md:flex" />

        <button
          className="text-2xl text-slate-300 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {isOpen && (
        <NavLinks
          className="flex flex-col gap-4 bg-slate-900 px-6 pb-6 md:hidden"
          onLinkClick={() => setIsOpen(false)}
        />
      )}
    </header>
  )
}

export default Navbar