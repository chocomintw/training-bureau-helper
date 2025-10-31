// src/layouts/rootLayout.tsx
import { Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { Login } from '../components/login'
import { Loader2, XCircle } from 'lucide-react'
import Sidebar from '../components/sidebar'
import Header from '../components/header'

// Simple fallback hook for Discord auth
const useDiscordAuth = () => {
  const [user] = useAuthState(auth)
  
  return {
    discordUser: user ? {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    } : null,
    loading: false,
    isDiscordUser: !!user,
    logout: () => auth.signOut()
  }
}

export default function RootLayout() {
  const [user, authLoading] = useAuthState(auth)
  const { loading: discordLoading, isDiscordUser } = useDiscordAuth()

  const loading = authLoading || discordLoading

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <div className="text-center">
          <p className="text-lg font-medium">Checking Authentication</p>
          <p className="text-sm text-gray-500">Verifying Discord sign-in...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  if (!isDiscordUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Discord Required</h1>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Please sign in with Discord to access this application.
            </p>

            <button
              onClick={() => auth.signOut()}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              Sign Out & Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-64"> {/* ml-64 to account for sidebar width */}
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}