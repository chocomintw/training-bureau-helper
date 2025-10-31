import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/themeProvider'
import './index.css'

// Layouts and Pages
import RootLayout from './layouts/rootLayout'
import Dashboard from './pages/dashboard'
import ToolPage from './pages/toolPage'
import NotFound from './pages/notFound'

// Import route configuration
import { routes } from './config/routes'

// Generate routes dynamically from configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // Dynamic tool routes
      ...routes
        .filter(route => route.path.startsWith('/tool/'))
        .map(route => ({
          path: route.path,
          element: <ToolPage />,
        })),
    ],
  },
], {
  basename: '/training-bureau-helper/'
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)