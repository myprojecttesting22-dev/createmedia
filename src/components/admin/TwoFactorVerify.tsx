import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, KeyRound } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TwoFactorVerifyProps {
  onVerified: () => void;
  onBack: () => void;
}

export function TwoFactorVerify({ onVerified, onBack }: TwoFactorVerifyProps) {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyToken = async () => {
    if (token.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await supabase.functions.invoke('admin-verify-totp', {
        body: { token, isSetup: false },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error || !response.data.success) {
        setError('Invalid code. Please try again.');
        return;
      }

      onVerified();
    } catch (err) {
      console.error('Error verifying TOTP:', err);
      setError('Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && token.length === 6) {
      verifyToken();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Verification Code</Label>
            <Input
              id="token"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
              onKeyDown={handleKeyDown}
              placeholder="000000"
              className="text-center text-lg tracking-widest"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button onClick={verifyToken} className="w-full" disabled={isLoading || token.length !== 6}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Verify
          </Button>

          <Button variant="ghost" onClick={onBack} className="w-full">
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
