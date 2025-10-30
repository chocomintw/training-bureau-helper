import React from 'react';
import { 
  BarChart3, 
  HelpCircle,
  Rocket,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  isNew?: boolean;
  isPro?: boolean;
}

const Sidebar: React.FC = () => {
  const tools: Tool[] = [
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      icon: <BarChart3 className="h-5 w-5" />,
      category: 'Analytics',
      description: 'Track your activity data.'
    },
  ];

  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          {/* logo */}
          <div className="p-2 bg-linear-to-r from-green-300 to-blue-600 rounded-lg">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Training Bureau</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tools.length} tools available</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-1">
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-green-400 dark:text-green-800 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <HelpCircle className="h-4 w-4" />
            <span>Help & Support (Discord)</span>
          </button>
        </div>

        {/* Tools by Category */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Tools by Category
          </h3>
          
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h4 className="px-3 text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {category}
                </h4>
                <div className="space-y-1">
                  {tools
                    .filter(tool => tool.category === category)
                    .map((tool) => (
                    <button
                      key={tool.id}
                      className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 group",
                        "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
                        "hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                    >
                      <div className="shrink-0">
                        {tool.icon}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="truncate">{tool.name}</span>
                          {tool.isNew && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              New
                            </span>
                          )}
                          {tool.isPro && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                              Senior
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {tool.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;