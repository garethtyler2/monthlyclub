# Video Setup for How It Works Page

## Overview
The How It Works page now supports responsive videos for step 1 (Create step). The videos will automatically switch based on screen size to provide the best user experience.

## Video Files Required

Place your video files in the `public/videos/` directory:

### Required Files:
1. **`desktop-create-step.mp4`** - Video for desktop/larger screens
2. **`mobile-create-step.mp4`** - Video for mobile devices

### File Specifications:
- **Format**: MP4
- **Codec**: H.264 (recommended for best compatibility)
- **Resolution**: 
  - Desktop: 1280x720 or higher
  - Mobile: 720x1280 or similar mobile aspect ratio
- **Duration**: 10-30 seconds (recommended)
- **File Size**: Keep under 5MB each for optimal loading

## How It Works

### Responsive Behavior:
- **Desktop/Tablet** (md breakpoint and up): Shows `desktop-create-step.mp4`
- **Mobile** (below md breakpoint): Shows `mobile-create-step.mp4`

### Video Features:
- ✅ **Auto-play**: Videos start automatically
- ✅ **Loop**: Videos repeat continuously
- ✅ **Muted**: No sound (required for auto-play)
- ✅ **PlaysInline**: Prevents fullscreen on mobile
- ✅ **Object-cover**: Videos fill the container while maintaining aspect ratio

## Implementation Details

The videos are implemented in `app/how-it-works/page.tsx`:

```tsx
{step.hasVideo ? (
  <>
    {/* Desktop Video */}
    <video 
      className="hidden md:block w-full h-full object-cover"
      autoPlay 
      loop 
      muted 
      playsInline
    >
      <source src={step.desktopVideo} type="video/mp4" />
    </video>
    
    {/* Mobile Video */}
    <video 
      className="md:hidden w-full h-full object-cover"
      autoPlay 
      loop 
      muted 
      playsInline
    >
      <source src={step.mobileVideo} type="video/mp4" />
    </video>
  </>
) : (
  // Fallback to icon for other steps
)}
```

## Adding Videos to Other Steps

To add videos to other steps, update the steps array in `app/how-it-works/page.tsx`:

```tsx
{
  number: "02",
  title: "Generate",
  // ... other properties
  hasVideo: true,
  desktopVideo: "/videos/desktop-generate-step.mp4",
  mobileVideo: "/videos/mobile-generate-step.mp4",
  // Remove the icon property when using videos
}
```

## Testing

1. **Desktop Testing**: 
   - Open the page on desktop/tablet
   - Verify desktop video plays in step 1
   - Other steps should show icons

2. **Mobile Testing**:
   - Open browser dev tools
   - Switch to mobile viewport
   - Verify mobile video plays in step 1
   - Other steps should show icons

3. **Performance Testing**:
   - Check that videos load quickly
   - Verify smooth playback
   - Test on different devices/browsers

## Troubleshooting

### Video Not Playing:
- Check file paths are correct
- Verify video format is MP4
- Ensure videos are in `public/videos/` directory
- Check browser console for errors

### Performance Issues:
- Compress videos to reduce file size
- Use lower resolution for mobile videos
- Consider using WebM format for better compression

### Mobile Issues:
- Ensure `playsInline` attribute is present
- Test on actual mobile devices
- Check that videos are muted (required for auto-play)

