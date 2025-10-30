import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/themeProvider'
import './index.css'

// Import pages
import RootLayout from './layouts/rootLayout'
import Dashboard from './pages/dashboard'
import ToolPage from './pages/toolPage'
import NotFound from './pages/notFound'

const router = createBrowserRouter([
  {
    path: '/training-bureau-helper/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/tool/:toolId/',
        element: <ToolPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)