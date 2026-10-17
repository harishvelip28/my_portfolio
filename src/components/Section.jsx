function Section({ id, title, children }) {
  return (
    <section id={id} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-3xl font-bold text-white">
          <span className="text-blue-500">#</span> {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

export default Section