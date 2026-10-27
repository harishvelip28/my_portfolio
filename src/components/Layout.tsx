import { Outlet, ScrollRestoration } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div className="min-h-screen bg-page text-body">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export default Layout