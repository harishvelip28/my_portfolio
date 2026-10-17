import { profile } from '../data/Profile'

function Hero() {
  return (
    <section id="home" className="flex min-h-screen items-center px-6 pt-20">
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-4 font-mono text-blue-500">Hi, my name is</p>

        <h1 className="text-5xl font-bold text-white md:text-7xl">
          {profile.name}
        </h1>

        <h2 className="mt-2 text-3xl font-semibold text-slate-400 md:text-5xl">
          {profile.role}
        </h2>

        <p className="mt-6 max-w-xl text-lg text-slate-400">
          {profile.tagline}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 transition-colors hover:border-blue-500 hover:text-blue-400"
          >
            Contact me
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero