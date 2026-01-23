import { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { TwoFactorSetup } from '@/components/admin/TwoFactorSetup';
import { TwoFactorVerify } from '@/components/admin/TwoFactorVerify';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { ImageList } from '@/components/admin/ImageList';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function AdminAssets() {
  const { 
    user, 
    isAdmin, 
    has2FA, 
    is2FAVerified, 
    isLoading, 
    set2FAVerified, 
    signIn, 
    signOut,
    refresh,
  } = useAdminAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [bootstrapLoading, setBootstrapLoading] = useState(false);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in - show login
  if (!user) {
    return <AdminLogin onLogin={signIn} />;
  }

  // Logged in but not admin
  if (!isAdmin) {
    const canBootstrap = (user?.email || '').toLowerCase() === 'vansh@createmedia.pro'.toLowerCase();

    const bootstrapFirstAdmin = async () => {
      setBootstrapLoading(true);
      setBootstrapError(null);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setBootstrapError('You are signed out. Please sign in again.');
          return;
        }

        const res = await supabase.functions.invoke('admin-bootstrap-first-admin', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (res.error) {
          setBootstrapError(res.error.message || 'Failed to enable admin access.');
          return;
        }

        await refresh();
      } catch {
        setBootstrapError('Failed to enable admin access.');
      } finally {
        setBootstrapLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-4">
          <Shield className="w-12 h-12 mx-auto text-muted-foreground" />
          <h1 className="text-xl font-semibold">Access Denied</h1>
          <p className="text-muted-foreground">You do not have admin privileges.</p>
          {bootstrapError && (
            <p className="text-sm text-destructive">{bootstrapError}</p>
          )}
          {canBootstrap && (
            <Button onClick={bootstrapFirstAdmin} disabled={bootstrapLoading}>
              {bootstrapLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Enable Admin Access
            </Button>
          )}
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      </div>
    );
  }

  // Admin but no 2FA setup
  if (!has2FA) {
    return <TwoFactorSetup onVerified={() => set2FAVerified(true)} />;
  }

  // Admin with 2FA but not verified this session
  if (!is2FAVerified) {
    return (
      <TwoFactorVerify 
        onVerified={() => set2FAVerified(true)} 
        onBack={signOut}
      />
    );
  }

  // Fully authenticated admin
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <h1 className="font-semibold">Private Image Hosting</h1>
              <p className="text-sm text-muted-foreground">Admin Panel</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <ImageUploader onUploadComplete={() => setRefreshTrigger(prev => prev + 1)} />
          <ImageList refreshTrigger={refreshTrigger} />
        </div>
      </main>
    </div>
  );
}
