import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/themeToggler'
import { Search, Menu, X, LogOut } from 'lucide-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { useDiscordAuth } from '../hooks/useDiscordAuth'
import { useState } from 'react'

// Add props interface
interface HeaderProps {
  onSearch?: (query: string) => void
  searchQuery?: string
}

export default function Header({ onSearch, searchQuery = '' }: HeaderProps) {
  const [user] = useAuthState(auth)
  const { logout } = useDiscordAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by parent component via onSearch
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-linear-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TB</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">
            Training Bureau
          </span>
        </div>

        {/* Center - Search Bar (only show if onSearch is provided) */}
        {onSearch && (
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 bg-muted/50 border-muted focus:bg-background"
              />
            </form>
          </div>
        )}

        {/* Right side - User info and controls */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user && (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-1.5">
                {user.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-sm font-medium max-w-32 truncate">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden sm:flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            {onSearch && (
              <div className="pt-2">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 bg-muted/50 border-muted focus:bg-background"
                  />
                </form>
              </div>
            )}

            {/* Mobile User Info */}
            {user && (
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-3 mb-3">
                  {user.photoURL && (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="w-full justify-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}