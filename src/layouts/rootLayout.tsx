import { Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { Login } from '../components/login'
import { Loader2 } from 'lucide-react'

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

  // Return just the outlet - individual pages will handle their own layout
  return <Outlet />
}