import { Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { Login } from '../components/login'
import { Loader2 } from 'lucide-react'

// Import your existing components
import Header from '../components/header' // Your existing header
import Sidebar from '../components/sidebar' // Your existing sidebar

export default function RootLayout() {
  const [user, loading] = useAuthState(auth)

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

  // Return your existing layout structure with auth
  return (
    <div className="flex h-screen bg-background">
      {/* Your existing sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Your existing header */}
        <Header />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}