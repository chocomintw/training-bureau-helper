// Debug utility functions

type DebugCategory = 'routing' | 'components' | 'api' | 'performance';

const debugConfig = {
  routing: import.meta.env.VITE_DEBUG_ROUTING === 'true' || import.meta.env.VITE_DEBUG === 'true',
  components: import.meta.env.VITE_DEBUG_COMPONENTS === 'true' || import.meta.env.VITE_DEBUG === 'true',
  api: import.meta.env.VITE_DEBUG_API === 'true' || import.meta.env.VITE_DEBUG === 'true',
  performance: import.meta.env.VITE_DEBUG_PERFORMANCE === 'true' || import.meta.env.VITE_DEBUG === 'true',
};

export const debug = {
  log: (category: DebugCategory, message: string, ...args: any[]) => {
    if (debugConfig[category]) {
      console.log(`🔍 [${category.toUpperCase()}] ${message}`, ...args);
    }
  },

  warn: (category: DebugCategory, message: string, ...args: any[]) => {
    if (debugConfig[category]) {
      console.warn(`⚠️ [${category.toUpperCase()}] ${message}`, ...args);
    }
  },

  error: (category: DebugCategory, message: string, ...args: any[]) => {
    if (debugConfig[category]) {
      console.error(`❌ [${category.toUpperCase()}] ${message}`, ...args);
    }
  },

  table: (category: DebugCategory, data: any, message?: string) => {
    if (debugConfig[category]) {
      if (message) console.log(`📊 [${category.toUpperCase()}] ${message}`);
      console.table(data);
    }
  },

  // Conditional rendering helper for debug components
  render: (category: DebugCategory, component: React.ReactNode) => {
    return debugConfig[category] ? component : null;
  },

  // Check if a specific debug category is enabled
  isEnabled: (category: DebugCategory): boolean => {
    return debugConfig[category];
  }
};