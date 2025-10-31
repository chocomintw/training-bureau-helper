import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Search, User, Settings, X } from 'lucide-react';
import { ThemeToggle } from './themeToggler';
import { useSearch } from '@/hooks/useSearch';
import SearchResults from './searchResults';

const Header: React.FC = () => {
  const { query, setQuery, results, hasResults, isEmpty } = useSearch();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && results.length > 0) {
      console.log('Search submitted:', query);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsSearchFocused(false);
  };

  // Keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          setIsSearchFocused(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Enhanced Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search tools, features, or help..."
                  className="w-full pl-10 pr-20 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                />
                
                {/* Clear button */}
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                
                {/* Search shortcut hint */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </form>

            {/* Search Results Dropdown */}
            {isSearchFocused && (hasResults || isEmpty) && (
              <SearchResults 
                results={results} 
                query={query}
                onClose={() => setIsSearchFocused(false)}
              />
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2 ml-4">
            <ThemeToggle />
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Bell className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <User className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;