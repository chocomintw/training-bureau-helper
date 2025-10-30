import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Search, User, Settings } from 'lucide-react';
import { ThemeToggle } from './themeToggler';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 ml-64">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tools, features, or help..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="text-gray-700 dark:text-gray-300">
              <User className="h-5 w-5 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;