interface ProtectedDocumentViewerProps {
  documentUrl: string;
  title: string;
  className?: string;
}

export default function ProtectedDocumentViewer({
  documentUrl,
  title,
  className = "",
}: ProtectedDocumentViewerProps) {
  
  // Use Google Docs Viewer for PDF preview without download
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true`;

  return (
    <div 
      className={`relative ${className}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="mb-2 p-2 bg-card rounded-t-lg">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground">
          ⚠️ View-only mode - Download and printing are disabled
        </p>
      </div>
      
      <iframe
        src={viewerUrl}
        className="w-full h-[600px] border rounded-b-lg"
        onContextMenu={(e) => e.preventDefault()}
        data-testid="protected-document-viewer"
        title={title}
      />
      
      <style>{`
        iframe {
          pointer-events: auto;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
