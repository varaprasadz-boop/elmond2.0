import { useEffect } from "react";

interface ProtectedAudioPlayerProps {
  src: string;
  title: string;
  className?: string;
}

export default function ProtectedAudioPlayer({
  src,
  title,
  className = "",
}: ProtectedAudioPlayerProps) {
  
  useEffect(() => {
    // Prevent keyboard shortcuts for downloading
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S / Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
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
      <div className="p-6 bg-card rounded-lg">
        <h3 className="font-semibold mb-4">{title}</h3>
        <audio
          controls
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
          className="w-full"
          data-testid="protected-audio-player"
          preload="metadata"
        >
          <source src={src} type="audio/mpeg" />
          <p>Your browser does not support the audio tag. Please use a modern browser.</p>
        </audio>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          ⚠️ Protected content - Download prohibited
        </p>
      </div>
    </div>
  );
}
