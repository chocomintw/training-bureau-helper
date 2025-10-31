import { Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { Login } from '../components/login'
import { Loader2 } from 'lucide-react'

export default function RootLayout() {
  const [user, loading, error] = useAuthState(auth)

  console.log('Auth state:', { user, loading, error }) // Debug log

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    console.error('Auth error:', error) // Debug log
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Authentication error: {error.message}</div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return <Outlet />
}