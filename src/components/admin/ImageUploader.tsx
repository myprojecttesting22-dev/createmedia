import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onUploadComplete: () => void;
}

export function ImageUploader({ onUploadComplete }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [expiryType, setExpiryType] = useState<'time' | 'views'>('time');
  const [expiryHours, setExpiryHours] = useState('72');
  const [maxViews, setMaxViews] = useState('5');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.error('Please drop an image file');
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Not authenticated');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('expiryType', expiryType);
      formData.append('expiryHours', expiryHours);
      formData.append('maxViews', maxViews);

      const response = await supabase.functions.invoke('admin-upload-image', {
        body: formData,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        toast.error('Upload failed');
        return;
      }

      const { publicUrl } = response.data;
      
      // Try to copy URL to clipboard with fallback
      try {
        await navigator.clipboard.writeText(publicUrl);
        toast.success('Image uploaded! URL copied to clipboard');
      } catch (clipboardErr) {
        // Clipboard failed (permissions), show URL in toast for manual copy
        console.warn('Clipboard access denied, showing URL in toast');
        toast.success(
          <div className="space-y-2">
            <p>Image uploaded successfully!</p>
            <code className="block p-2 bg-muted rounded text-xs break-all select-all">{publicUrl}</code>
            <p className="text-xs text-muted-foreground">Select and copy the URL above</p>
          </div>,
          { duration: 10000 }
        );
      }
      
      // Reset form
      setSelectedFile(null);
      setPreview(null);
      onUploadComplete();
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Image
        </CardTitle>
        <CardDescription>
          Drag and drop an image or click to select. URL will be copied automatically.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
            ${preview ? 'border-solid' : ''}
          `}
          onClick={() => !preview && document.getElementById('file-input')?.click()}
        >
          {preview ? (
            <div className="space-y-4">
              <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded" />
              <p className="text-sm text-muted-foreground">{selectedFile?.name}</p>
              <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); clearSelection(); }}>
                Remove
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Drop image here or click to select</p>
              <p className="text-xs text-muted-foreground">JPEG, PNG, GIF, WebP supported</p>
            </div>
          )}
          <input
            id="file-input"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Expiry Settings */}
        <div className="space-y-4">
          <Label>Expiration Type</Label>
          <RadioGroup value={expiryType} onValueChange={(v) => setExpiryType(v as 'time' | 'views')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="time" id="time" />
              <Label htmlFor="time" className="font-normal">Time-based</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="views" id="views" />
              <Label htmlFor="views" className="font-normal">View-based</Label>
            </div>
          </RadioGroup>
        </div>

        {expiryType === 'time' ? (
          <div className="space-y-2">
            <Label htmlFor="expiryHours">Expires after (hours)</Label>
            <Input
              id="expiryHours"
              type="number"
              min="1"
              max="8760"
              value={expiryHours}
              onChange={(e) => setExpiryHours(e.target.value)}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="maxViews">Max views</Label>
            <Input
              id="maxViews"
              type="number"
              min="1"
              max="1000"
              value={maxViews}
              onChange={(e) => setMaxViews(e.target.value)}
            />
          </div>
        )}

        <Button 
          onClick={handleUpload} 
          className="w-full" 
          disabled={!selectedFile || isUploading}
        >
          {isUploading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Upload & Copy URL
        </Button>
      </CardContent>
    </Card>
  );
}
