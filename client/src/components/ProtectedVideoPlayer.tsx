import { useEffect } from "react";

interface ProtectedVideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  className?: string;
}

export default function ProtectedVideoPlayer({
  src,
  title,
  poster,
  className = "",
}: ProtectedVideoPlayerProps) {
  
  useEffect(() => {
    // Prevent keyboard shortcuts for downloading/printing
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S / Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
      // Prevent Ctrl+P / Cmd+P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className={`relative ${className}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        controls
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-full"
        data-testid="protected-video-player"
        poster={poster}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        <p>Your browser does not support the video tag. Please use a modern browser.</p>
      </video>
      
      {/* Watermark overlay */}
      <div className="absolute top-4 right-4 text-white/30 text-xs pointer-events-none select-none">
        Elmond LMS - Protected Content
      </div>
    </div>
  );
}
