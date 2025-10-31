import { Button } from '@/components/ui/button'
import { ThemeToggle } from './themeToggler'
import { LogOut, ChevronDown } from 'lucide-react'
import { useDiscordAuth } from '../hooks/useDiscordAuth'
import { useState, useRef, useEffect } from 'react'

interface HeaderProps {
  children?: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
  const { user, logout } = useDiscordAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo and brand */}
        <div className="mr-8 flex items-center">
          <a className="flex items-center space-x-3" href="/">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-green-500 to-blue-500">
              <span className="text-sm font-bold text-white">TB</span>
            </div>
            <span className="hidden text-xl font-bold sm:inline-block">
              Training Bureau
            </span>
          </a>
        </div>
        
        {/* Navigation */}
        <nav className="mr-8 hidden items-center space-x-8 md:flex">
          {['Dashboard', 'Tools', 'Documentation'].map((item) => (
            <a
              key={item}
              href={item === 'Dashboard' ? '/' : `/${item.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-green-600 data-[active=true]:text-foreground data-[active=false]:text-foreground/60"
              data-active={item === 'Dashboard'}
            >
              {item}
            </a>
          ))}
        </nav>
        
        {/* Search bar slot */}
        <div className="flex-1 max-w-2xl">
          {children}
        </div>
        
        {/* Right side actions */}
        <div className="ml-8 flex items-center justify-end space-x-4">
          <ThemeToggle />
          
          {/* User info with profile dropdown */}
          {user && (
            <div className="flex items-center space-x-3" ref={dropdownRef}>
              {/* Profile dropdown trigger */}
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 rounded-lg bg-muted/50 px-3 py-2 hover:bg-muted/70 transition-colors"
                >
                  {user.photoURL && (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="h-6 w-6 rounded-full"
                    />
                  )}
                  <span className="hidden max-w-24 truncate text-sm font-medium lg:inline-block">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-lg border bg-background shadow-lg z-50">
                    {/* Profile header */}
                    <div className="p-4 border-b">
                      <div className="flex items-center space-x-3">
                        {user.photoURL && (
                          <img 
                            src={user.photoURL} 
                            alt="Profile" 
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {user.displayName || 'Unknown User'}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email || 'No email'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* User information */}
                    <div className="p-4 space-y-3">
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Account Information
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">User ID:</span>
                            <span className="font-mono text-xs truncate max-w-[120px]">
                              {user.uid.slice(0, 8)}...
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Provider:</span>
                            <span className="text-xs capitalize">
                              {user.providerData[0]?.providerId.replace('oidc.', '') || 'Unknown'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email verified:</span>
                            <span className={user.emailVerified ? 'text-green-600' : 'text-yellow-600'}>
                              {user.emailVerified ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}