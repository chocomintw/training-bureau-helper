// components/UserProfile.tsx
import { useDiscordAuth } from '../hooks/useDiscordAuth';

export const UserProfile = () => {
  const { discordUser, loading, isDiscordUser } = useDiscordAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!isDiscordUser) return <div>Please sign in with Discord</div>;

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      {discordUser?.photoURL && (
        <img 
          src={discordUser.photoURL} 
          alt="Discord avatar" 
          className="w-12 h-12 rounded-full"
        />
      )}
      <div>
        <h3 className="font-semibold">{discordUser?.displayName}</h3>
        <p className="text-gray-600">{discordUser?.email}</p>
        <p className="text-sm text-gray-500">Discord ID: {discordUser?.uid}</p>
      </div>
    </div>
  );
};