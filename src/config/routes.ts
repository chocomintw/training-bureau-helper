export interface RouteConfig {
  path: string;
  label: string;
  description: string;
  category: string;
  isNew?: boolean;
  isSenior?: boolean;
  icon?: string;
}

// Centralized route configuration
export const routes: RouteConfig[] = [
  {
    path: '/',
    label: 'Dashboard',
    description: 'Main dashboard with all tools',
    category: 'Navigation',
    icon: 'Home'
  },
  {
    path: '/tool/vpat-processor',
    label: 'VPAT Processor (Beta)',
    description: 'Parse chat logs from VPAT sessions by character names',
    category: 'Processor',
    isNew: true,
    isSenior: true,
    icon: 'FileText'
  },
  {
    path: '/tool/analytics',
    label: 'Personal Analytics',
    description: 'Track and visualize your activity data',
    category: 'Analytics',
    isNew: true,
    icon: 'BarChart3'
  }
];

// Helper functions
export const getRouteByPath = (path: string): RouteConfig | undefined => 
  routes.find(route => route.path === path);

export const getToolRoutes = (): RouteConfig[] => 
  routes.filter(route => route.path.startsWith('/tool/'));

export const getToolRouteById = (id: string): RouteConfig | undefined =>
  routes.find(route => route.path === `/tool/${id}`);