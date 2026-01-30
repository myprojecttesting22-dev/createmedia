import { useEffect, useRef, useState, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Use the proxy edge function for secure HTTPS delivery
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const FRAME_PROXY_URL = `${SUPABASE_URL}/functions/v1/serve-frame`;
const TOTAL_FRAMES = 240;
const MOBILE_FRAME_STEP = 4; // Sample every 4th frame on mobile for performance

interface ScrollFrameAnimationProps {
  className?: string;
}

const ScrollFrameAnimation = ({ className = '' }: ScrollFrameAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const isMobile = useIsMobile();

  // Generate frame URL using the proxy
  const getFrameUrl = useCallback((frameNumber: number) => {
    return `${FRAME_PROXY_URL}?frame=${frameNumber}`;
  }, []);

  // Get frame indices based on device
  const getFrameIndices = useCallback(() => {
    const indices: number[] = [];
    const step = isMobile ? MOBILE_FRAME_STEP : 1;
    for (let i = 1; i <= TOTAL_FRAMES; i += step) {
      indices.push(i);
    }
    return indices;
  }, [isMobile]);

  // Preload images
  useEffect(() => {
    const frameIndices = getFrameIndices();
    const totalToLoad = frameIndices.length;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalToLoad) * 100));
          resolve(img);
        };
        img.onerror = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalToLoad) * 100));
          reject(new Error(`Failed to load frame ${index}`));
        };
        img.src = getFrameUrl(index);
      });
    };

    // Load images in batches for better performance
    const loadBatch = async (indices: number[], batchSize: number) => {
      for (let i = 0; i < indices.length; i += batchSize) {
        const batch = indices.slice(i, i + batchSize);
        const results = await Promise.allSettled(batch.map(loadImage));
        results.forEach((result, idx) => {
          if (result.status === 'fulfilled') {
            const frameIndex = batch[idx];
            // Map to sequential array index
            const arrayIndex = isMobile 
              ? Math.floor((frameIndex - 1) / MOBILE_FRAME_STEP)
              : frameIndex - 1;
            images[arrayIndex] = result.value;
          }
        });
      }
    };

    loadBatch(frameIndices, 10).then(() => {
      imagesRef.current = images;
      setIsLoaded(true);
    });

    return () => {
      images.forEach(img => {
        if (img) {
          img.src = '';
        }
      });
    };
  }, [getFrameUrl, getFrameIndices, isMobile]);

  // Draw frame to canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const images = imagesRef.current;
    
    if (!canvas || !ctx || !images.length) return;

    const maxIndex = images.length - 1;
    const clampedIndex = Math.max(0, Math.min(frameIndex, maxIndex));
    const image = images[clampedIndex];
    
    if (!image) return;

    // Set canvas dimensions to match image aspect ratio
    const containerWidth = canvas.parentElement?.clientWidth || canvas.clientWidth;
    const aspectRatio = image.height / image.width;
    const canvasHeight = containerWidth * aspectRatio;

    if (canvas.width !== containerWidth || canvas.height !== canvasHeight) {
      canvas.width = containerWidth;
      canvas.height = canvasHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    currentFrameRef.current = clampedIndex;
  }, []);

  // Intersection Observer for triggering animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Scroll-based frame animation
  useEffect(() => {
    if (!isLoaded || !isInView) return;

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress through the animation section
        // Animation starts when container top reaches bottom of viewport
        // Animation ends when container bottom reaches top of viewport
        const scrollStart = windowHeight;
        const scrollEnd = -rect.height;
        const scrollRange = scrollStart - scrollEnd;
        const currentPosition = rect.top;
        
        // Calculate progress (0 to 1)
        let progress = (scrollStart - currentPosition) / scrollRange;
        progress = Math.max(0, Math.min(1, progress));
        
        // Map progress to frame index
        const totalFrames = imagesRef.current.length;
        const frameIndex = Math.floor(progress * (totalFrames - 1));
        
        if (frameIndex !== currentFrameRef.current) {
          drawFrame(frameIndex);
        }
      });
    };

    // Initial draw
    drawFrame(0);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => drawFrame(currentFrameRef.current));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => drawFrame(currentFrameRef.current));
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isLoaded, isInView, drawFrame]);

  // Mobile autoplay fallback
  useEffect(() => {
    if (!isMobile || !isLoaded || !isInView) return;

    let frameIndex = 0;
    const totalFrames = imagesRef.current.length;
    let lastTime = 0;
    const frameDuration = 1000 / 24; // 24fps

    const animate = (timestamp: number) => {
      if (timestamp - lastTime >= frameDuration) {
        drawFrame(frameIndex);
        frameIndex = (frameIndex + 1) % totalFrames;
        lastTime = timestamp;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile, isLoaded, isInView, drawFrame]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* Loading state */}
      {!isLoaded && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative w-48 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            Loading frames... {loadProgress}%
          </p>
        </div>
      )}
      
      {/* Canvas for frame rendering */}
      <canvas 
        ref={canvasRef}
        className={`w-full h-auto transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default ScrollFrameAnimation;
