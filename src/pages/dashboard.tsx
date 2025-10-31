import { useState, useMemo, useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { Login } from '../components/login'
import { Loader2 } from 'lucide-react'

// Your existing imports
import Header from '../components/header'
import SearchBar from '../components/searchBar'
import Sidebar from '../components/sidebar'
import ToolCard from '../components/toolCard'
import { tools as externalTools } from '../config/tools'
import { BarChart3, FileText } from 'lucide-react'

export default function Dashboard() {
  const [user, loading] = useAuthState(auth)
  const [displayTools, setDisplayTools] = useState<any[]>([])

  // Map tools for display
  const allTools = useMemo(() => {
    return externalTools.map(tool => {
      let icon: React.ReactNode;
      switch (tool.icon) {
        case 'BarChart3':
          icon = <BarChart3 className="h-8 w-8" />;
          break;
        case 'FileText':
          icon = <FileText className="h-8 w-8" />;
          break;
        default:
          icon = <FileText className="h-8 w-8" />;
      }

      return {
        id: tool.id,
        name: tool.label,
        icon: icon,
        category: tool.category,
        description: tool.description,
        longDescription: tool.longDescription,
        isNew: tool.isNew,
        isSenior: tool.isSenior
      }
    })
  }, [])

  // Initialize with all tools
  useState(() => {
    setDisplayTools(allTools)
  })

  // Handle filtered tools from search bar
  const handleToolsFiltered = useCallback((filteredTools: any[]) => {
    setDisplayTools(filteredTools)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main layout */}
      <div className="lg:ml-64">
        {/* Header with integrated search bar */}
        <Header>
          <SearchBar onToolsFiltered={handleToolsFiltered} />
        </Header>
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Training Bureau Helper</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of tools to assist with training bureau operations and management.
            </p>
          </section>

          {/* Tools Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              Available Tools {displayTools.length !== allTools.length && `(${displayTools.length} filtered)`}
            </h2>
            {displayTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No tools available to display.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}