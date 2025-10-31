import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, BarChart3, HelpCircle, ArrowRight } from 'lucide-react';

// Define the interface locally to avoid import issues
interface SearchableItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tags?: string[];
  path: string;
}

interface SearchResultsProps {
  results: SearchableItem[];
  query: string;
  onClose: () => void;
}

const iconMap = {
  'Processor': FileText,
  'Analytics': BarChart3,
  'Support': HelpCircle,
};

const SearchResults: React.FC<SearchResultsProps> = ({ results, query, onClose }) => {
  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          <p>No results found for "{query}"</p>
          <p className="text-sm mt-1">Try different keywords</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Found {results.length} result{results.length !== 1 ? 's' : ''}
        </div>
        
        {results.map((item, _index) => {
          const IconComponent = iconMap[item.category as keyof typeof iconMap] || FileText;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={onClose}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="shrink-0">
                <div className="p-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg">
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {item.description}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-600 px-1.5 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;