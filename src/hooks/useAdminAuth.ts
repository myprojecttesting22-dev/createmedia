import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  has2FA: boolean;
  is2FAVerified: boolean;
  isLoading: boolean;
}

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAdmin: false,
    has2FA: false,
    is2FAVerified: false,
    isLoading: true,
  });

  const checkAdminStatus = useCallback(async (user: User) => {
    try {
      // Check if user has admin role - we need to use edge function for this
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      const isAdmin = !!roleData && !roleError;

      if (!isAdmin) {
        setState({
          user,
          isAdmin: false,
          has2FA: false,
          is2FAVerified: false,
          isLoading: false,
        });
        return;
      }

      // Check 2FA status
      const { data: totpData } = await supabase
        .from('admin_totp_secrets')
        .select('is_verified')
        .eq('user_id', user.id)
        .maybeSingle();

      setState({
        user,
        isAdmin: true,
        has2FA: !!totpData?.is_verified,
        is2FAVerified: false, // Will be set after 2FA verification
        isLoading: false,
      });
    } catch (error) {
      console.error('Error checking admin status:', error);
      setState({
        user,
        isAdmin: false,
        has2FA: false,
        is2FAVerified: false,
        isLoading: false,
      });
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Defer the admin check to avoid blocking
        setTimeout(() => checkAdminStatus(session.user), 0);
      } else {
        setState({
          user: null,
          isAdmin: false,
          has2FA: false,
          is2FAVerified: false,
          isLoading: false,
        });
      }
    });

    // Then check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkAdminStatus(session.user);
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAdminStatus]);

  const set2FAVerified = useCallback((verified: boolean) => {
    setState(prev => ({ ...prev, is2FAVerified: verified }));
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setState({
      user: null,
      isAdmin: false,
      has2FA: false,
      is2FAVerified: false,
      isLoading: false,
    });
  };

  return {
    ...state,
    set2FAVerified,
    signIn,
    signOut,
  };
}
