import { useState, useMemo } from 'react';

// Define the interface first
export interface SearchableItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tags?: string[];
  path: string;
}

// Mock data for search
const searchableItems: SearchableItem[] = [
  {
    id: 'vpat-processor',
    name: 'VPAT Processor',
    description: 'Parse chat logs from VPAT sessions by character names',
    category: 'Processor',
    tags: ['logs', 'parsing', 'filtering', 'deduplication'],
    path: '/tool/vpat-processor'
  },
  {
    id: 'analytics',
    name: 'Personal Analytics',
    description: 'Track and visualize your activity data with charts',
    category: 'Analytics',
    tags: ['charts', 'data', 'visualization', 'metrics'],
    path: '/tool/analytics'
  },
  {
    id: 'help',
    name: 'Help & Support',
    description: 'Get help and support for using the tools',
    category: 'Support',
    tags: ['help', 'support', 'documentation', 'guide'],
    path: '#help'
  }
];

// Export the hook
export const useSearch = () => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    
    return searchableItems.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [query]);

  return {
    query,
    setQuery,
    results,
    hasResults: results.length > 0,
    isEmpty: query.trim() !== '' && results.length === 0
  };
};

// Export the searchable items separately if needed
export { searchableItems };