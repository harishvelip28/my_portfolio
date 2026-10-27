import { Link } from 'react-router'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function NotFound() {
  useDocumentTitle('Page not found')
  
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-accent">404</p>
      <h1 className="mt-2 text-4xl font-bold text-heading">Page not found</h1>
      <p className="mt-4 text-muted">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500"
      >
        Back to home
      </Link>
    </section>
  )
}

export default NotFound