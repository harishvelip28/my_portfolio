import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ErrorPage from './pages/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
]);
