import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function getMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`
  if (error instanceof Error) return error.message
  return 'Unknown error'
}

function ErrorPage() {
  const error = useRouteError()
  useDocumentTitle('Something went wrong')

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-accent">Error</p>
      <h1 className="mt-2 text-4xl font-bold text-heading">Something went wrong</h1>
      <p className="mt-4 text-muted">
        An unexpected error occurred. Reloading the page usually fixes it.
      </p>
      <p className="mt-2 font-mono text-sm text-faint">{getMessage(error)}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500"
        >
          Reload page
        </button>
        <Link
          to="/"
          className="rounded-lg border border-line px-6 py-3 font-medium text-body transition-colors hover:border-accent hover:text-accent"
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}

export default ErrorPage