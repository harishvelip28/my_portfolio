function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      onClick={onToggle}
      className="relative flex h-8 w-16 shrink-0 items-center justify-between rounded-full border border-line bg-pill px-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span aria-hidden="true">☀️</span>
      <span aria-hidden="true">🌙</span>

      <span
        aria-hidden="true"
        className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
          isDark ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

export default ThemeToggle