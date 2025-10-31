// src/components/header.tsx
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { ThemeToggle } from './themeToggler'

export default function Header() {
  const [user] = useAuthState(auth)

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur border-gray-200 dark:border-gray-700">
      <div className="container flex h-16 items-center px-4">
        {/* Logo and brand */}
        <div className="mr-8 flex items-center">
          <a className="flex items-center space-x-3" href="/">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-green-500 to-blue-500">
              <span className="text-sm font-bold text-white">TB</span>
            </div>
            <span className="hidden text-xl font-bold text-gray-900 dark:text-white sm:inline-block">
              Training Bureau
            </span>
          </a>
        </div>
        
        {/* Search bar slot */}
        <div className="flex-1 max-w-2xl">
          {/* Search will go here */}
        </div>
        
        {/* Right side actions */}
        <div className="ml-8 flex items-center justify-end space-x-4">
          <ThemeToggle />
          
          {/* User info */}
          {user && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2">
                {user.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="h-6 w-6 rounded-full"
                  />
                )}
                <span className="hidden max-w-24 truncate text-sm font-medium text-gray-900 dark:text-white lg:inline-block">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white sm:flex"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden lg:inline">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}