import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Download, Share2, Star, Users } from 'lucide-react';
import VpatProcessor from '@/components/vpat-processor/vpatProcessor';

// Mock tool data - this should match your tools in Sidebar and ToolCards
const toolsData: Record<string, any> = {
  'analytics': {
    id: 'analytics',
    name: 'Personal Analytics',
    category: 'Analytics',
    description: 'Track and visualize your activity data.',
    longDescription: 'All of your activity on the website with great charts and more!',
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
    isNew: true
  },
  'vpat-processor': {
    id: 'vpat-processor',
    name: 'VPAT Processor (Beta)',
    category: 'Processor',
    description: 'Simply parse logs from every applicants.',
    longDescription: 'Parse chat logs from VPAT sessions by character names and seperate result for each character.',
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
    isSenior: true
  }
};

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  
  // If it's the VPAT Processor, render the full component
  if (toolId === 'vpat-processor') {
    return <VpatProcessor />;
  }

  const tool = toolId ? toolsData[toolId] : null;

  if (!tool) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tool Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The tool you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {tool.name}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {tool.category}
                  </span>
                  {tool.isNew && (
                    <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                      New
                    </span>
                  )}
                  {tool.isSenior && (
                    <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded">
                      Senior+
                    </span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {tool.description}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button className="bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Play className="h-4 w-4 mr-2" />
              Launch Tool
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Tool</CardTitle>
              <CardDescription>
                {tool.longDescription}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tool.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tool Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{tool.rating}/5.0</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Active Users</span>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{tool.users.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Version</span>
                <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  v{tool.version}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                <span className="text-sm">{tool.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Play className="h-4 w-4 mr-2" />
                Open Tool
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="h-4 w-4 mr-2" />
                Share Tool
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;