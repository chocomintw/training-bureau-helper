import { Button } from '@/components/ui/button'
import { ThemeToggle } from './themeToggler'
import { LogOut } from 'lucide-react'
import { useDiscordAuth } from '../hooks/useDiscordAuth'

interface HeaderProps {
  children?: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
  const { user, logout } = useDiscordAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
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
          
          {/* User info */}
          {user && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 rounded-lg bg-muted/50 px-3 py-2">
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
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden items-center space-x-1 sm:flex"
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