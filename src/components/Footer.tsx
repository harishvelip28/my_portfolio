import { profile } from '../data/profile'

function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8">
      <p className="mx-auto max-w-6xl text-center text-sm text-faint">
        © {new Date().getFullYear()} {profile.name}. Built with React and
        Tailwind CSS.
      </p>
    </footer>
  )
}

export default Footer