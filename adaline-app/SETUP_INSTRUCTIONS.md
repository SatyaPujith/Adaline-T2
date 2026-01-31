# WebGL Hero Section - Setup Instructions

## What Was Done

The standalone HTML WebGL mountain terrain hero section has been successfully converted into a React component and integrated into the Kimi app.

## Files Created

1. **`app/src/sections/HeroSection.tsx`** - Main React component with WebGL rendering
2. **`app/src/hooks/useWebGLShaders.ts`** - Shader code definitions
3. **`HERO_SECTION_MIGRATION.md`** - Detailed migration documentation

## How to Run

### Development
```bash
cd "Kimi_Agent_Website Build & Deploy Fix/app"
npm install  # if not already done
npm run dev
```

The app will start on `http://localhost:5173` (or similar). The hero section will be visible on the home page with:
- WebGL mountain terrain rendering
- Scroll-based camera movement
- Day/night cycle transitions
- Looping company logos

### Build for Production
```bash
npm run build
npm run preview
```

## Scroll Behavior

The hero section responds to scroll as follows:

| Scroll Range | Behavior |
|---|---|
| 0-30% | Camera moves backward through terrain, text scales down |
| 30-70% | Camera locked, container moves upward with side padding |
| 70-100% | "Explore More" content section visible |
| 100-200% | Day-to-night cycle with volumetric clouds |

## Key Features

✅ WebGL terrain rendering with Perlin noise  
✅ Scroll-based camera movement  
✅ Day/night sky transitions  
✅ Volumetric cloud shader  
✅ Responsive canvas sizing  
✅ Smooth animations and transitions  
✅ Company logo carousel  
✅ Navbar integration (unchanged)  

## Browser Requirements

- WebGL2 support required
- Modern browsers: Chrome, Firefox, Safari, Edge
- Desktop and tablet recommended (mobile may have performance considerations)

## Troubleshooting

### Canvas not rendering
- Check browser console for WebGL errors
- Ensure WebGL2 is supported: `gl.getParameter(gl.VERSION)`
- Try a different browser

### Shader compilation errors
- Check browser console for detailed error messages
- Verify shader syntax in `useWebGLShaders.ts`
- Ensure all uniform locations are properly bound

### Performance issues
- Reduce shader complexity if needed
- Check GPU usage in browser DevTools
- Consider reducing animation frame rate on lower-end devices

## Integration with Existing App

The HeroSection component is already integrated into the HomePage and works seamlessly with:
- Navbar (unchanged, sits above hero)
- Other page sections (FeaturesSection, StatsSection, etc.)
- Tailwind CSS styling
- Framer Motion animations (if needed)

No additional configuration needed - just run the app!

## Next Steps

1. Run `npm run dev` to start the development server
2. Navigate to the home page to see the hero section
3. Scroll to experience the camera movement and animations
4. Build and deploy when ready

For detailed technical information, see `HERO_SECTION_MIGRATION.md`.
