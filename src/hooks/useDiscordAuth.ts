import { signInWithPopup, signOut, OAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useState } from 'react';

export const useDiscordAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithDiscord = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the provider ID you set in Firebase Console
      const provider = new OAuthProvider('oidc.discord');
      
      // Add scopes for Discord
      provider.addScope('identify');
      provider.addScope('email');
      
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    signInWithDiscord,
    logout,
    loading,
    error
  };
};