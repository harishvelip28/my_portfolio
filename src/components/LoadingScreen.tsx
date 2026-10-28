function LoadingScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-page text-muted"
    >
      Loading...
    </div>
  )
}

export default LoadingScreen