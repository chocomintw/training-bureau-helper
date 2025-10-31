// src/pages/dashboard.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import { useCards } from '@/hooks/useCards';
import { getIconComponent } from '@/utils/iconMapping';

export default function Dashboard() {
  const { cards, loading, getFeaturedCards, getCategories } = useCards();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const featuredCards = getFeaturedCards();
  const categories = ['All', ...getCategories()];

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Training Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {cards.length} tools available • {featuredCards.length} featured
            </p>
          </div>
          <Button asChild className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Link to="/create-card">
              <Plus className="w-4 h-4" />
              Create New Tool
            </Link>
          </Button>
        </div>

        {/* Featured Section */}
        {featuredCards.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCards.map((card) => {
                const IconComponent = getIconComponent(card.icon);
                return (
                  <Link
                    key={card.id}
                    to={card.href}
                    className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 flex flex-col h-full" // Added flex-col and h-full
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex gap-1">
                        {card.isSenior && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                            Senior
                          </span>
                        )}
                        <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">{card.title}</h3> {/* Added line-clamp-2 */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 grow">{card.description}</p> {/* Added line-clamp-3 and flex-grow */}
                    
                    <div className="mt-auto"> {/* Pushes content to bottom */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                          {card.category}
                        </span>
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          Explore →
                        </span>
                      </div>
                      
                      {/* Tags */}
                      {card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {card.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                          {card.tags.length > 2 && (
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              +{card.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* All Tools Section */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Tools</h2>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCards.map((card) => {
              const IconComponent = getIconComponent(card.icon);
              return (
                <Link
                  key={card.id}
                  to={card.href}
                  className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 flex flex-col h-full" // Added flex-col and h-full
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex gap-1">
                      {!card.showInSidebar && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          Hidden
                        </span>
                      )}
                      {card.isSenior && (
                        <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                          Senior
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{card.title}</h3> {/* Added line-clamp-2 */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 grow">{card.description}</p> {/* Added line-clamp-3 and flex-grow */}
                  
                  <div className="mt-auto"> {/* Pushes content to bottom */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {card.category}
                      </span>
                      {card.featured && (
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    {card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {card.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                        {card.tags.length > 2 && (
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            +{card.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">No tools found matching your criteria</div>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/create-card">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Tool
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}