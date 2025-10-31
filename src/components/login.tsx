import { useDiscordAuth } from '../hooks/useDiscordAuth'

export const Login = () => {
  const { signInWithDiscord, loading, error } = useDiscordAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Sign in to Training Bureau
          </h2>
          <p className="mt-2 text-gray-600">
            Use your Discord account to continue
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <button
          onClick={signInWithDiscord}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <img src="/discord-mark-white.svg" alt="Discord" className="w-5 h-5" />
          {loading ? 'Signing in...' : 'Sign in with Discord'}
        </button>
      </div>
    </div>
  )
}