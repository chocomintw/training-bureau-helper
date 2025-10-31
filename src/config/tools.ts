export interface Tool {
  id: string;
  path: string;
  label: string;
  description: string;
  longDescription: string;
  category: string;
  features: string[];
  rating?: number;
  users?: number;
  version?: string;
  lastUpdated?: string;
  isNew?: boolean;
  isSenior?: boolean;
  icon?: string;
}

export const tools: Tool[] = [
  {
    id: 'analytics',
    path: '/tool/analytics',
    label: 'Personal Analytics',
    description: 'Track and visualize your activity data.',
    longDescription: 'All of your activity on the website with great charts and more!',
    category: 'Analytics',
    features: [
      'Real-time data visualization',
      'Customizable dashboards',
      'Export to PDF/CSV',
      'Team collaboration',
      'Advanced filtering'
    ],
    rating: 4.8,
    users: 1247,
    version: '2.1.0',
    lastUpdated: '2024-01-15',
    isNew: true,
    icon: 'BarChart3'
  },
  {
    id: 'vpat-processor',
    path: '/tool/vpat-processor',
    label: 'VPAT Processor (Beta)',
    description: 'Simply parse logs from every applicants.',
    longDescription: 'Parse chat logs from VPAT sessions by character names and separate result for each character. Perfect for accessibility compliance documentation.',
    category: 'Processor',
    features: [
      'Upload session logs with timestamps',
      'Filter by keywords and phrases',
      'Remove duplicate entries',
      'Chronological sorting',
      'Export cleaned output'
    ],
    rating: 4.9,
    users: 1247,
    version: '1.0.0',
    lastUpdated: '2024-01-20',
    isNew: true,
    isSenior: true,
    icon: 'FileText'
  }
];

// Helper functions
export const getToolById = (id: string): Tool | undefined => 
  tools.find(tool => tool.id === id);

export const getToolsByCategory = () => {
  const categories = [...new Set(tools.map(tool => tool.category))];
  return categories.map(category => ({
    category,
    tools: tools.filter(tool => tool.category === category)
  }));
};

export const getFeaturedTools = (): Tool[] => tools;