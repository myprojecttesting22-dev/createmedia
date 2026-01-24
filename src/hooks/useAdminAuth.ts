import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

const TOTP_VERIFIED_KEY = 'admin_2fa_verified';
const TOTP_EXPIRY_KEY = 'admin_2fa_expiry';
const TOTP_SESSION_HOURS = 8; // 2FA session lasts 8 hours

function get2FASessionValid(userId: string): boolean {
  try {
    const storedUserId = sessionStorage.getItem(TOTP_VERIFIED_KEY);
    const expiry = sessionStorage.getItem(TOTP_EXPIRY_KEY);
    if (storedUserId === userId && expiry) {
      const expiryTime = parseInt(expiry, 10);
      if (Date.now() < expiryTime) {
        return true;
      }
      // Expired - clear storage
      sessionStorage.removeItem(TOTP_VERIFIED_KEY);
      sessionStorage.removeItem(TOTP_EXPIRY_KEY);
    }
  } catch {
    // sessionStorage not available
  }
  return false;
}

function set2FASession(userId: string) {
  try {
    const expiryTime = Date.now() + TOTP_SESSION_HOURS * 60 * 60 * 1000;
    sessionStorage.setItem(TOTP_VERIFIED_KEY, userId);
    sessionStorage.setItem(TOTP_EXPIRY_KEY, expiryTime.toString());
  } catch {
    // sessionStorage not available
  }
}

function clear2FASession() {
  try {
    sessionStorage.removeItem(TOTP_VERIFIED_KEY);
    sessionStorage.removeItem(TOTP_EXPIRY_KEY);
  } catch {
    // sessionStorage not available
  }
}

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
      // IMPORTANT: Do NOT query user_roles directly from the client.
      // RLS intentionally blocks non-admins from selecting this table.
      // Use the security-definer function instead.
      const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin',
      });

      const hasAdminRole = isAdmin === true && !roleError;

      if (!hasAdminRole) {
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

      // Check if 2FA was already verified this session
      const sessionVerified = get2FASessionValid(user.id);

      setState({
        user,
        isAdmin: true,
        has2FA: !!totpData?.is_verified,
        is2FAVerified: sessionVerified, // Restore from session if valid
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
    if (verified && state.user) {
      set2FASession(state.user.id);
    } else {
      clear2FASession();
    }
    setState(prev => ({ ...prev, is2FAVerified: verified }));
  }, [state.user]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    clear2FASession();
    await supabase.auth.signOut();
    setState({
      user: null,
      isAdmin: false,
      has2FA: false,
      is2FAVerified: false,
      isLoading: false,
    });
  };

  const refresh = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await checkAdminStatus(session.user);
    }
  }, [checkAdminStatus]);

  return {
    ...state,
    set2FAVerified,
    signIn,
    signOut,
    refresh,
  };
}
