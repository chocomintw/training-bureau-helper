import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { useDiscordAuth } from '../hooks/useDiscordAuth'
import { Button } from './ui/button'
import { ThemeToggle } from './themeToggler'

export default function Header() {
  const [user] = useAuthState(auth)
  const { logout } = useDiscordAuth()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Your existing logo/brand */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-primary rounded-sm" />
          <span className="font-semibold">Training Bureau</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Your existing theme toggle */}
          <ThemeToggle />
          
          {/* User info - only show when logged in */}
          {user && (
            <div className="flex items-center space-x-2">
              {user.photoURL && (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm hidden sm:inline">
                {user.displayName || user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}