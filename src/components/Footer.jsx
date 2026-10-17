import { profile } from '../data/Profile'

function Footer() {
  return (
    <footer className="border-t border-slate-800 px-6 py-8">
      <p className="mx-auto max-w-6xl text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {profile.name}. Built with React and
        Tailwind CSS.
      </p>
    </footer>
  )
}

export default Footer