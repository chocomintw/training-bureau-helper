import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  FileText,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  longDescription: string;
  isNew?: boolean;
  isSenior?: boolean;
}

const ToolCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tools: Tool[] = [
    {
      id: 'analytics',
      name: 'Personal Analytics',
      icon: <BarChart3 className="h-8 w-8" />,
      category: 'Analytics',
      description: 'Track and visualize your activity data.',
      longDescription: 'All of your activity on the website with great charts and more!',
      isNew: true
    },
    {
      id: 'vpat-processor',
      name: 'VPAT Processor (Beta)',
      icon: <FileText className="h-8 w-8" />,
      category: 'Processor',
      description: 'Simply parse logs from every applicants.',
      longDescription: 'Parse chat logs from VPAT sessions by character names and seperate result for each character.',
      isNew: true,
      isSenior: true
    },
  ];

  const visibleTools = tools.slice(currentIndex, currentIndex + 3);
  
  const nextSlide = () => {
    if (currentIndex < tools.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative">
      {/* Navigation Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Tools</h2>
          <p className="text-gray-600 dark:text-gray-400">Swipe to discover more tools!</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.ceil(tools.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index * 3 
                    ? 'bg-green-700' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= tools.length - 3}
            className="disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTools.map((tool) => (
          <Card 
            key={tool.id} 
            className="group hover:shadow-lg transition-all duration-300 animate-fade-in border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-linear-to-r from-green-500 to-blue-500 rounded-lg">
                  {tool.icon}
                </div>
                <div className="flex items-center space-x-2">
                  {tool.isNew && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-200">
                      New
                    </span>
                  )}
                  {tool.isSenior && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Senior+
                    </span>
                  )}
                </div>
              </div>
              <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-green-500 dark:group-hover:text-green-500 transition-colors">
                {tool.name}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {tool.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {tool.longDescription}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  {tool.category}
                </span>
              </div>
              
              <Link to={`/tool/${tool.id}`}>
                <Button className="w-full bg-linear-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white group/btn">
                  Open Tool
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="lg:hidden mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          ← Swipe to see more tools →
        </p>
      </div>
    </div>
  );
};

export default ToolCards;