import { Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { Login } from '../components/login'
import { Loader2, CheckCircle, XCircle, Info, LogOut } from 'lucide-react'
import { useDiscordAuth } from '../hooks/useDiscordAuth'

export default function RootLayout() {
  const [user, authLoading] = useAuthState(auth)
  const { discordUser, loading: discordLoading, isDiscordUser } = useDiscordAuth()

  const loading = authLoading || discordLoading

  const handleLogout = async () => {
    try {
      await auth.signOut()
      // Force a small delay to ensure auth state is cleared
      setTimeout(() => {
        window.location.reload() // Force refresh to clear any stuck state
      }, 100)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

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

            {/* Show current user info for debugging */}
            {import.meta.env.DEV && user && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Current User Info
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-medium">
                      {user.providerData[0]?.providerId || 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{user.email || 'No email'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">UID:</span>
                    <span className="font-medium text-xs">{user.uid}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out & Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Discord user confirmed - show the application
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with user info and logout */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Your App</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Discord user info - safely handle null discordUser */}
              {discordUser && (
                <div className="flex items-center gap-3">
                  {discordUser.photoURL && (
                    <img 
                      src={discordUser.photoURL} 
                      alt="Discord avatar" 
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {discordUser.displayName || 'Discord User'}
                    </p>
                    <p className="text-xs text-gray-500">Discord</p>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Optional: Show Discord user info in development */}
      {import.meta.env.DEV && discordUser && (
        <div className="bg-blue-50 border border-blue-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium">Discord User Verified</span>
            </div>
            <div className="text-xs text-blue-700">
              {discordUser.displayName} • {discordUser.uid}
            </div>
          </div>
        </div>
      )}
      
      <main>
        <Outlet />
      </main>
    </div>
  )
}