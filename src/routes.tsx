import type { RouteObject } from 'react-router'
import Layout from './components/Layout'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import LoadingScreen from './components/LoadingScreen'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    HydrateFallback: LoadingScreen,
    children: [
      {
        ErrorBoundary: ErrorPage,
        children: [
          { index: true, element: <Home /> },
          {
            path: 'projects/:slug',
            lazy: async () => {
              const { default: Component } = await import('./pages/ProjectDetail')
              return { Component }
            },
          },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
]