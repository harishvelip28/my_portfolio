import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProjectDetail from './pages/ProjectDetail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects/:slug', element: <ProjectDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])