// src/components/sidebar.tsx
import { Link, useLocation } from 'react-router-dom'
import { Home, HelpCircle, Shield } from 'lucide-react'
import { getSidebarRoutes, getRoutesByCategory } from '@/config/routes'
import { getIconComponent } from '@/utils/iconMapping'

export default function Sidebar() {
  const location = useLocation()
  const sidebarRoutes = getSidebarRoutes()
  const routesByCategory = getRoutesByCategory()

  const isActive = (path: string) => {
    const hashPath = `#${path}`
    return location.hash === hashPath || (path === '/' && location.hash === '')
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-linear-to-r from-green-500 to-blue-600 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Training Bureau</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{sidebarRoutes.length} tools available</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-1">
          <Link
            to="/"
            className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive('/') 
                ? "text-green-800 dark:text-green-400 bg-green-100 dark:bg-green-900/20" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          
          <a
            href="https://discord.gg/your-discord-link"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help & Support</span>
          </a>
        </div>

        {/* Tools by Category */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Tools by Category
          </h3>
          
          <div className="space-y-6">
            {Object.entries(routesByCategory).map(([category, categoryRoutes]) => {
              if (category === 'Navigation') return null; // Skip navigation category
              
              return (
                <div key={category}>
                  <h4 className="px-3 text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {category}
                  </h4>
                  <div className="space-y-1">
                    {categoryRoutes.map((route) => {
                      const IconComponent = getIconComponent(route.icon || 'bar-chart-3')
                      return (
                        <Link
                          key={route.path}
                          to={route.path}
                          className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors group ${
                            isActive(route.path)
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                              : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <div className="shrink-0 flex items-center justify-center w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg">
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="truncate font-medium">{route.label}</span>
                              {route.isSenior && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                  Senior
                                </span>
                              )}
                              {route.isNew && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                              {route.description}
                            </p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-12 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Need help with a tool?
            </p>
            <a
              href="https://discord.gg/your-discord-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <HelpCircle className="h-3 w-3 mr-1" />
              Join our Discord
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}