import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './lib/firebase'
import { Loader2 } from 'lucide-react'

function App() {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="App">
      {/* Your main app content */}
      {user ? (
        <div>
          {/* Authenticated content - this will be handled by your routes */}
          <p>Welcome, {user.displayName}!</p>
        </div>
      ) : (
        <div>
          {/* This will be handled by your routes */}
          <p>Please log in</p>
        </div>
      )}
    </div>
  )
}

export default App