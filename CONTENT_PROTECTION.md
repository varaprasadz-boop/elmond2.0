# Content Protection Guidelines for LMS Platform

## Overview
This Learning Management System (LMS) implements strict content protection measures to prevent unauthorized downloading of educational materials including videos, audio files, presentations, and documents.

## Content Protection Standards

### 1. Video Content Protection

**Requirements:**
- No download option in video player controls
- Disable right-click context menu
- Disable Picture-in-Picture mode
- Use streaming URLs, never direct file downloads
- Optional: Add watermarks with user email/name

**Implementation:**
```jsx
<video
  src={videoUrl}
  controls
  controlsList="nodownload nofullscreen noremoteplayback"
  disablePictureInPicture
  onContextMenu={(e) => e.preventDefault()}
  className="w-full"
  data-testid="video-player"
>
  Your browser does not support the video tag.
</video>
```

**Key Attributes:**
- `controlsList="nodownload"` - Removes download button from player
- `disablePictureInPicture` - Prevents PiP mode
- `onContextMenu={(e) => e.preventDefault()}` - Blocks right-click menu

### 2. Audio Content Protection

**Requirements:**
- No download option in audio player controls
- Disable right-click context menu
- Use streaming URLs

**Implementation:**
```jsx
<audio
  src={audioUrl}
  controls
  controlsList="nodownload"
  onContextMenu={(e) => e.preventDefault()}
  className="w-full"
  data-testid="audio-player"
>
  Your browser does not support the audio tag.
</audio>
```

### 3. PDF/Document Protection

**Requirements:**
- Display in iframe or custom viewer only
- No download buttons
- Disable browser print (where possible)
- Use Google Docs Viewer or similar for preview

**Implementation Options:**

**Option A: Google Docs Viewer (Recommended)**
```jsx
<iframe
  src={`https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true`}
  className="w-full h-screen"
  onContextMenu={(e) => e.preventDefault()}
  data-testid="document-viewer"
/>
```

**Option B: Object Tag Viewer**
```jsx
<object
  data={documentUrl}
  type="application/pdf"
  className="w-full h-screen"
  onContextMenu={(e) => e.preventDefault()}
>
  <p>Your browser does not support PDF viewing. Please contact support.</p>
</object>
```

### 4. Presentation Protection

**Requirements:**
- Convert to images or HTML5 slides
- Use iframe viewers without download options
- Implement custom slide viewer

**Implementation:**
```jsx
// Custom slide viewer with image-based slides
<div className="relative w-full aspect-video bg-black">
  <img
    src={slides[currentSlide]}
    alt={`Slide ${currentSlide + 1}`}
    className="w-full h-full object-contain"
    onContextMenu={(e) => e.preventDefault()}
    draggable={false}
  />
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
    <Button onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}>
      Previous
    </Button>
    <span className="text-white px-4 py-2">
      {currentSlide + 1} / {slides.length}
    </span>
    <Button onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}>
      Next
    </Button>
  </div>
</div>
```

## Additional Security Measures

### 1. Client-Side Protection
```jsx
// Disable keyboard shortcuts for downloading
useEffect(() => {
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
```

### 2. CSS Protection
```css
/* Disable text selection and drag for sensitive content */
.protected-content {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: auto;
}

/* Disable image dragging */
.protected-content img {
  pointer-events: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
```

### 3. Server-Side Protection
- Use signed URLs with expiration times
- Implement token-based authentication for media files
- Use HLS/DASH streaming for videos (prevents direct download)
- Enable CORS restrictions
- Implement rate limiting

## Implementation Checklist

- [ ] All video players use `controlsList="nodownload"`
- [ ] All audio players use `controlsList="nodownload"`
- [ ] All media elements have `onContextMenu` prevention
- [ ] Documents use iframe viewers without download options
- [ ] Presentations converted to protected format
- [ ] Right-click disabled on all protected content
- [ ] Keyboard shortcuts for save/print disabled
- [ ] CSS protection applied to content areas
- [ ] Server-side URL signing implemented
- [ ] Content streaming (not direct download) in use

## Testing Checklist

- [ ] Attempt to download video via player controls - should fail
- [ ] Right-click on video - menu should be disabled
- [ ] Try keyboard shortcuts (Ctrl+S, Ctrl+P) - should be blocked
- [ ] Inspect network tab for direct file URLs - should use streaming
- [ ] Test on Chrome, Firefox, Safari, and Edge
- [ ] Test on mobile browsers (iOS Safari, Chrome Android)
- [ ] Verify PDF viewer has no download button
- [ ] Check if browser DevTools can access media - acceptable risk

## Important Notes

⚠️ **Client-side protection is not foolproof**: Determined users can still find ways to capture content using screen recording or other tools. These measures increase the barrier and deter casual downloading.

✅ **Best practice**: Combine client-side protection with:
- Legal agreements (Terms of Service)
- Watermarking with user information
- Server-side access control
- DRM (Digital Rights Management) for high-value content
- Content expiration policies

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| controlsList | ✅ | ✅ | ✅ | ✅ |
| disablePictureInPicture | ✅ | ✅ | ✅ | ✅ |
| onContextMenu prevention | ✅ | ✅ | ✅ | ✅ |

## Resources

- [MDN: HTML Video Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
- [MDN: HTML Audio Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
