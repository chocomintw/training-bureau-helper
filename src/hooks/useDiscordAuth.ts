// hooks/useDiscordAuth.ts
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, OAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface DiscordUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export const useDiscordAuth = () => {
  const [user, authLoading, authError] = useAuthState(auth);
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset error when user changes
  useEffect(() => {
    setError(null);
  }, [user]);

  useEffect(() => {
    if (!user) {
      setDiscordUser(null);
      return;
    }

    // Check if user signed in with Discord
    const discordProvider = user.providerData.find(
      (provider: any) => provider.providerId === 'oidc.discord'
    );

    if (discordProvider) {
      setDiscordUser({
        uid: discordProvider.uid,
        displayName: discordProvider.displayName,
        email: discordProvider.email,
        photoURL: discordProvider.photoURL,
      });
    } else {
      setDiscordUser(null);
    }
  }, [user]);

  const signInWithDiscord = async () => {
    try {
      setLoading(true);
      setError(null);

      const provider = new OAuthProvider('oidc.discord');
      
      // Add Discord scopes
      provider.addScope('identify');
      provider.addScope('email');
      
      // Set custom parameters if needed
      provider.setCustomParameters({
        prompt: 'consent',
      });

      await signInWithPopup(auth, provider);
      
    } catch (error: any) {
      console.error('Discord sign-in error:', error);
      
      // Handle specific error cases
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup was blocked by your browser. Please allow popups for this site.');
      } else if (error.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for Discord sign-in. Please contact support.');
      } else {
        setError(error.message || 'Failed to sign in with Discord. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      // Force reload to clear any stuck state
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to sign out. Please try again.');
    }
  };

  return {
    // User state
    user,
    discordUser,
    isDiscordUser: !!discordUser,
    
    // Auth actions
    signInWithDiscord,
    logout,
    
    // Loading states
    loading: authLoading || loading,
    signInLoading: loading,
    
    // Errors
    error: error || authError?.message || null,
  };
};