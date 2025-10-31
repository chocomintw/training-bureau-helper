// src/components/tool-cards.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useCards } from '@/hooks/useCards';
import { getIconComponent } from '@/utils/iconMapping';

// Single Tool Card Component
interface ToolCardProps {
  card: {
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
    category: string;
    tags: string[];
    featured?: boolean;
    showInSidebar?: boolean;
    isSenior?: boolean;
    isPublic?: boolean;
  };
  variant?: 'default' | 'featured' | 'compact';
}

export const ToolCard: React.FC<ToolCardProps> = ({ card, variant = 'default' }) => {
  const IconComponent = getIconComponent(card.icon);

  if (variant === 'compact') {
    return (
      <Link
        to={card.href}
        className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 flex items-center space-x-3"
      >
        <div className="p-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg">
          <IconComponent className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
              {card.title}
            </h3>
            {card.isSenior && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs">
                Senior
              </Badge>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-xs truncate">
            {card.description}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        to={card.href}
        className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 flex flex-col h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg">
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div className="flex gap-1">
            {card.isSenior && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                Senior
              </Badge>
            )}
            <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">{card.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 grow">{card.description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30">
              {card.category}
            </Badge>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              Explore →
            </span>
          </div>
          
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
  }

  // Default variant
  return (
    <Link
      to={card.href}
      className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg">
          <IconComponent className="h-5 w-5 text-white" />
        </div>
        <div className="flex gap-1">
          {!card.showInSidebar && (
            <Badge variant="outline" className="text-gray-500 dark:text-gray-400">
              Hidden
            </Badge>
          )}
          {card.isSenior && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              Senior
            </Badge>
          )}
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{card.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 grow">{card.description}</p>
      
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-gray-500 dark:text-gray-400">
            {card.category}
          </Badge>
          {card.featured && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Featured
            </Badge>
          )}
        </div>

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
};

// Tool Cards Grid Component
interface ToolCardsProps {
  variant?: 'grid' | 'featured' | 'list';
  category?: string;
  showFilters?: boolean;
  limit?: number;
}

export const ToolCards: React.FC<ToolCardsProps> = ({ 
  variant = 'grid', 
  category, 
  showFilters = false,
  limit 
}) => {
  const { cards, getFeaturedCards, getCategories } = useCards();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');

  const categories = ['All', ...getCategories()];
  
  let filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (variant === 'featured') {
    filteredCards = getFeaturedCards();
  }

  if (limit) {
    filteredCards = filteredCards.slice(0, limit);
  }

  if (variant === 'list') {
    return (
      <div className="space-y-3">
        {filteredCards.map((card) => (
          <ToolCard key={card.id} card={card} variant="compact" />
        ))}
        {filteredCards.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No tools found</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4">
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
      )}

      {/* Cards Grid */}
      <div className={
        variant === 'featured' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      }>
        {filteredCards.map((card) => (
          <ToolCard 
            key={card.id} 
            card={card} 
            variant={variant === 'featured' ? 'featured' : 'default'} 
          />
        ))}
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
  );
};

// Featured Tools Section Component
export const FeaturedTools: React.FC = () => {
  const { getFeaturedCards } = useCards();
  const featuredCards = getFeaturedCards();

  if (featuredCards.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Tools</h2>
      <ToolCards variant="featured" />
    </section>
  );
};

// All Tools Section Component
export const AllTools: React.FC<{ showFilters?: boolean }> = ({ showFilters = true }) => {
  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Tools</h2>
      </div>
      <ToolCards variant="grid" showFilters={showFilters} />
    </section>
  );
};

// Category Tools Component
export const CategoryTools: React.FC<{ category: string }> = ({ category }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{category} Tools</h2>
      <ToolCards variant="grid" category={category} showFilters={false} />
    </section>
  );
};

// Quick Access Tools (Compact List)
export const QuickAccessTools: React.FC<{ limit?: number }> = ({ limit = 5 }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Access</h3>
      <ToolCards variant="list" limit={limit} />
    </section>
  );
};