import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ToolCardProps {
  tool: {
    id: string
    name: string
    icon: React.ReactNode
    category: string
    description: string
    longDescription: string
    isNew?: boolean
    isSenior?: boolean
  }
}

export default function ToolCard({ tool }: ToolCardProps) {
  const { id, name, icon, category, description, longDescription, isNew, isSenior } = tool

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="p-2 bg-linear-to-r from-green-500 to-blue-500 rounded-lg">
            {icon}
          </div>
          <div className="flex items-center space-x-2">
            {isNew && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-200">
                New
              </span>
            )}
            {isSenior && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                Senior+
              </span>
            )}
          </div>
        </div>
        <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-green-500 dark:group-hover:text-green-500 transition-colors">
          {name}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
          {longDescription}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
            {category}
          </span>
        </div>
        
        <Link to={`/tool/${id}`}>
          <Button className="w-full bg-linear-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white group/btn">
            Open Tool
            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}