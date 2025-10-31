import cardsData from '@/data/cards.json';

export interface RouteConfig {
  path: string;
  label: string;
  description: string;
  category: string;
  isNew?: boolean;
  isSenior?: boolean;
  icon?: string;
  featured?: boolean;
  showInSidebar?: boolean;
  tags?: string[];
}

// Generate routes dynamically from cards data
export const generateRoutes = (): RouteConfig[] => {
  const baseRoutes: RouteConfig[] = [
    {
      path: '/',
      label: 'Dashboard',
      description: 'Main dashboard with all tools',
      category: 'Navigation',
      icon: 'home'
    }
  ];

  // Convert cards to routes
  const toolRoutes: RouteConfig[] = cardsData.cards.map(card => ({
    path: card.href,
    label: card.title,
    description: card.description,
    category: card.category,
    isNew: card.featured, // Using featured as "new" indicator, adjust as needed
    isSenior: card.isSenior,
    icon: card.icon,
    featured: card.featured,
    showInSidebar: card.showInSidebar,
    tags: card.tags
  }));

  return [...baseRoutes, ...toolRoutes];
};

// Centralized route configuration (dynamically generated)
export const routes: RouteConfig[] = generateRoutes();

// Helper functions
export const getRouteByPath = (path: string): RouteConfig | undefined => 
  routes.find(route => route.path === path);

export const getToolRoutes = (): RouteConfig[] => 
  routes.filter(route => route.path.startsWith('/tool/'));

export const getToolRouteById = (id: string): RouteConfig | undefined =>
  routes.find(route => {
    // Handle both /tool/{id} and direct id matching
    const routeId = route.path.replace('/tool/', '');
    return routeId === id || route.path === `/tool/${id}`;
  });

export const getSidebarRoutes = (): RouteConfig[] =>
  routes.filter(route => route.showInSidebar !== false && route.path !== '/');

export const getRoutesByCategory = (): Record<string, RouteConfig[]> => {
  const categories: Record<string, RouteConfig[]> = {};
  
  routes.forEach(route => {
    if (!categories[route.category]) {
      categories[route.category] = [];
    }
    categories[route.category].push(route);
  });
  
  return categories;
};

export const getFeaturedRoutes = (): RouteConfig[] =>
  routes.filter(route => route.featured);

// Get all unique categories from routes
export const getRouteCategories = (): string[] => {
  const categories = new Set(routes.map(route => route.category));
  return Array.from(categories);
};

// Check if a route exists
export const routeExists = (path: string): boolean =>
  routes.some(route => route.path === path);