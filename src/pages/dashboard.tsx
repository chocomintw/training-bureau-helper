import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { Login } from '../components/login'
import { Loader2 } from 'lucide-react'
import { useDiscordAuth } from '../hooks/useDiscordAuth'

// Your existing imports
import Header from '../components/header'
import ToolCard from '../components/toolCard' // Your ToolCard component
import { tools as externalTools } from '../config/tools' // Your tools data
import { BarChart3, FileText } from 'lucide-react' // Icons for mapping

export default function Dashboard() {
  const [user, loading] = useAuthState(auth)
  const { logout } = useDiscordAuth()

  // Map your external tools to match ToolCard props
  const mapTools = externalTools.map(tool => {
    // Map icon string to React component
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
      name: tool.label, // Map 'label' to 'name'
      icon: icon,
      category: tool.category,
      description: tool.description,
      longDescription: tool.longDescription,
      isNew: tool.isNew,
      isSenior: tool.isSenior
    }
  });

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
    <div className="min-h-screen bg-linear-to-br from-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Training Bureau Helper</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of tools to assist with training bureau operations and management.
          </p>
        </section>

        {/* User Info Section */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-3 bg-card p-3 rounded-lg border">
            {user.photoURL && (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {user.displayName || user.email}
              </span>
              <button
                onClick={logout}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tools Grid - Use mapped tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mapTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-card rounded-lg border p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{mapTools.length}</div>
              <div className="text-muted-foreground">Total Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {mapTools.filter(tool => tool.isNew).length}
              </div>
              <div className="text-muted-foreground">New Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {mapTools.filter(tool => tool.isSenior).length}
              </div>
              <div className="text-muted-foreground">Senior Tools</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}