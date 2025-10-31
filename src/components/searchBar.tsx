import { useState, useEffect, useMemo, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X, Filter } from 'lucide-react'
import { tools as externalTools } from '../config/tools'

interface Tool {
  id: string
  name: string
  category: string
  description: string
  isNew?: boolean
  isSenior?: boolean
}

interface SearchBarProps {
  onToolsFiltered: (filteredTools: Tool[]) => void
  className?: string
}

// Pure search function - can be tested independently
const searchTools = (tools: Tool[], query: string): Tool[] => {
  if (!query.trim()) return tools
  
  const lowerQuery = query.toLowerCase()
  return tools.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.category.toLowerCase().includes(lowerQuery)
  )
}

export default function SearchBar({ onToolsFiltered, className = '' }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  // Memoize tools data
  const allTools = useMemo((): Tool[] => {
    return externalTools.map(tool => ({
      id: tool.id,
      name: tool.label,
      category: tool.category,
      description: tool.description,
      isNew: tool.isNew,
      isSenior: tool.isSenior
    }))
  }, [])

  // Memoize filtered tools
  const filteredTools = useMemo(() => 
    searchTools(allTools, searchQuery),
    [allTools, searchQuery]
  )

  // Real-time filtering - no debouncing for instant results
  useEffect(() => {
    onToolsFiltered(filteredTools)
  }, [filteredTools, onToolsFiltered])

  // Memoize event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowResults(value.length > 0 && isFocused)
  }, [isFocused])

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    setShowResults(searchQuery.length > 0)
  }, [searchQuery.length])

  const handleBlur = useCallback(() => {
    // Delay hiding to allow for clicks on results
    setTimeout(() => {
      setIsFocused(false)
      setShowResults(false)
    }, 150)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setShowResults(false)
  }, [])

  const handleResultClick = useCallback((toolId: string) => {
    console.log('Selected tool:', toolId)
    setShowResults(false)
    // You can add navigation logic here
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    // Keep focus on input after submit
    e.currentTarget.querySelector('input')?.focus()
  }, [])

  // Results count for display
  const resultsCount = searchQuery ? filteredTools.length : allTools.length

  return (
    <div className={`relative w-full max-w-2xl ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tools by name, description, or category..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="h-10 w-full border-muted bg-background pl-10 pr-20 focus:bg-background"
        />
        
        {/* Search info and clear button */}
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center space-x-2">
          <span className="text-xs text-muted-foreground hidden sm:inline-block">
            {resultsCount} {resultsCount === 1 ? 'tool' : 'tools'}
          </span>
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </form>

      {/* Search results dropdown */}
      {showResults && searchQuery && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-lg border border-muted bg-background shadow-lg">
          <div className="border-b border-muted p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={clearSearch} className="h-6 text-xs">
                Clear
              </Button>
            </div>
          </div>
          
          {filteredTools.length > 0 ? (
            <div className="p-2">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="cursor-pointer rounded-lg border-b border-muted/50 p-3 transition-colors last:border-b-0 hover:bg-muted/50"
                  onClick={() => handleResultClick(tool.id)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{tool.name}</h4>
                    <div className="flex items-center space-x-2">
                      {tool.isNew && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-200">
                          New
                        </span>
                      )}
                      {tool.isSenior && (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-800 dark:text-red-200">
                          Senior
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{tool.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">
                      {tool.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <Search className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No tools found matching "{searchQuery}"</p>
              <p className="mt-1 text-xs text-muted-foreground">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}