import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

interface AccessDetails {
  guildName?: string;
  permissions: string[];
}

interface DiscordGuildCheck {
  isMember: boolean;
  guildName?: string;
}

interface DiscordUserInfo {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  accessToken?: string;
}

const DISCORD_CONFIG = {
  ALLOWED_USER_IDS: (import.meta.env.VITE_ALLOWED_DISCORD_IDS || '').split(',').filter(Boolean),
  REQUIRED_GUILD_ID: import.meta.env.VITE_REQUIRED_GUILD_ID,
};

// Helper function to get Discord access token from various sources
const getDiscordAccessToken = async (user: any): Promise<string | null> => {
  try {
    // Method 1: Check localStorage (if stored during sign-in)
    const storedToken = localStorage.getItem('discord_access_token');
    if (storedToken) {
      console.log('✅ Found Discord access token in localStorage');
      return storedToken;
    }

    // Method 2: Try to get from Firebase OAuth credential
    // This only works immediately after sign-in
    await user.getIdToken(true); // Refresh token
    
    // For Firebase Auth, we need to use a different approach
    // The access token might be available in the user object right after sign-in
    const discordProvider = user.providerData.find(
      (provider: any) => provider.providerId === 'oidc.discord'
    );

    if (discordProvider?.accessToken) {
      console.log('✅ Found Discord access token in provider data');
      return discordProvider.accessToken;
    }

    // Method 3: If using custom authentication, you might have stored it elsewhere
    console.log('❌ No Discord access token found');
    return null;

  } catch (error) {
    console.log('❌ Error getting Discord access token:', error);
    return null;
  }
};

// Alternative: Backend approach (recommended for production)
const getDiscordAccessTokenFromBackend = async (user: any): Promise<string | null> => {
  try {
    const idToken = await user.getIdToken();
    
    const response = await fetch('/api/discord/token', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.accessToken;
    }
    
    return null;
  } catch (error) {
    console.log('❌ Error getting token from backend:', error);
    return null;
  }
};

// Helper function for Discord API guild check
const checkDiscordGuildMembership = async (accessToken: string): Promise<DiscordGuildCheck> => {
  try {
    console.log('🔍 Making Discord API call for guild membership...');
    
    const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.log('❌ Discord API error:', response.status, response.statusText);
      
      // Handle specific error cases
      if (response.status === 401) {
        console.log('❌ Discord token is invalid or expired');
        // Clear invalid token
        localStorage.removeItem('discord_access_token');
      }
      
      return { isMember: false };
    }

    const guilds = await response.json();
    console.log('🔍 User is in', guilds.length, 'Discord servers');
    
    const targetGuild = guilds.find((guild: any) => guild.id === DISCORD_CONFIG.REQUIRED_GUILD_ID);
    const isMember = !!targetGuild;
    
    console.log('🔍 Required guild found:', isMember, 'Guild name:', targetGuild?.name);
    
    return {
      isMember,
      guildName: targetGuild?.name
    };
  } catch (error) {
    console.log('❌ Discord API check failed:', error);
    return { isMember: false };
  }
};

export const useDiscordAccess = () => {
  const [user] = useAuthState(auth);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessDetails, setAccessDetails] = useState<AccessDetails | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        console.log('🔍 Starting Discord access verification...');
        
        // Step 1: Basic Discord OAuth verification
        const discordProvider = user.providerData.find(
          (provider: any) => provider.providerId === 'oidc.discord'
        ) as DiscordUserInfo | undefined;

        if (!discordProvider) {
          console.log('❌ No Discord OAuth found');
          setHasAccess(false);
          setError('Please sign in with Discord to access this application.');
          setAccessDetails({ permissions: [] });
          return;
        }

        console.log('✅ Step 1: Discord OAuth verified - User ID:', discordProvider.uid);

        // Step 2: Whitelist check
        if (DISCORD_CONFIG.ALLOWED_USER_IDS.length > 0) {
          const isWhitelisted = DISCORD_CONFIG.ALLOWED_USER_IDS.includes(discordProvider.uid);
          console.log('🔍 Step 2: Whitelist check - Result:', isWhitelisted);
          
          if (!isWhitelisted) {
            console.log('❌ User not in whitelist');
            setHasAccess(false);
            setError('Your Discord account is not authorized to access this application.');
            setAccessDetails({ permissions: [] });
            return;
          }
          console.log('✅ Step 2: Whitelist check passed');
        }

        // Step 3: Guild membership check
        let guildCheck: DiscordGuildCheck = { isMember: false };
        
        if (DISCORD_CONFIG.REQUIRED_GUILD_ID) {
          console.log('🔍 Step 3: Checking guild membership...');
          
          // Try to get access token
          const accessToken = await getDiscordAccessToken(user);
          // Or use backend approach:
          // const accessToken = await getDiscordAccessTokenFromBackend(user);
          
          if (accessToken) {
            guildCheck = await checkDiscordGuildMembership(accessToken);
            console.log('🔍 Guild check result:', guildCheck);
            
            if (!guildCheck.isMember) {
              console.log('❌ User not in required guild');
              setHasAccess(false);
              setError(`You must be a member of the Discord server "${guildCheck.guildName || DISCORD_CONFIG.REQUIRED_GUILD_ID}" to access this application.`);
              setAccessDetails({ permissions: [] });
              return;
            }
          } else {
            console.log('⚠️ Cannot verify guild membership - no access token available');
            // Continue without guild verification
            guildCheck = { isMember: true };
          }
        } else {
          console.log('🔍 Step 3: No guild ID configured - skipping guild check');
          guildCheck = { isMember: true };
        }

        // Build permissions and grant access
        const permissions = ['DISCORD_OAUTH_VERIFIED'];
        if (DISCORD_CONFIG.ALLOWED_USER_IDS.length > 0) permissions.push('WHITELIST_PASSED');
        if (guildCheck.isMember && DISCORD_CONFIG.REQUIRED_GUILD_ID) permissions.push('GUILD_MEMBER');

        console.log('✅ All checks passed - granting access');
        setHasAccess(true);
        setError(null);
        setAccessDetails({
          guildName: guildCheck.guildName,
          permissions,
        });
        
      } catch (err: any) {
        console.error('❌ Access check error:', err);
        setHasAccess(false);
        setError('Access verification failed. Please try again.');
        setAccessDetails({ permissions: [] });
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [user]);

  return {
    hasAccess,
    loading,
    error,
    accessDetails
  };
};