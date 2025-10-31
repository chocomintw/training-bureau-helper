// src/pages/dashboard.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FeaturedTools, AllTools } from '@/components/toolCards';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Training Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Access all your tools and resources in one place</p>
          </div>
          <Button asChild className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Link to="/create-card">
              <Plus className="w-4 h-4" />
              Create New Tool
            </Link>
          </Button>
        </div>

        {/* Featured Tools */}
        <FeaturedTools />

        {/* All Tools */}
        <AllTools showFilters={true} />
      </div>
    </div>
  );
}