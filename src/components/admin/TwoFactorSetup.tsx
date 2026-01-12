import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Smartphone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import QRCode from 'qrcode';

interface TwoFactorSetupProps {
  onVerified: () => void;
}

export function TwoFactorSetup({ onVerified }: TwoFactorSetupProps) {
  const [secret, setSecret] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setupTOTP();
  }, []);

  const setupTOTP = async () => {
    setIsSettingUp(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await supabase.functions.invoke('admin-setup-totp', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        setError('Failed to setup 2FA');
        return;
      }

      const { secret, otpauthUri } = response.data;
      setSecret(secret);

      // Generate QR code
      const qrUrl = await QRCode.toDataURL(otpauthUri, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrCodeUrl(qrUrl);
    } catch (err) {
      console.error('Error setting up TOTP:', err);
      setError('Failed to setup 2FA');
    } finally {
      setIsSettingUp(false);
    }
  };

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
        body: { token, isSetup: true },
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

  if (isSettingUp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Setup Two-Factor Authentication</CardTitle>
          <CardDescription>
            Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {qrCodeUrl && (
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg">
                <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />
              </div>
            </div>
          )}
          
          {secret && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Or enter this code manually:</p>
              <code className="bg-muted px-3 py-1 rounded text-sm font-mono">{secret}</code>
            </div>
          )}

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
              placeholder="000000"
              className="text-center text-lg tracking-widest"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button onClick={verifyToken} className="w-full" disabled={isLoading || token.length !== 6}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Verify & Enable 2FA
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
