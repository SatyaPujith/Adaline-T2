# Quick Start Guide - WebGL Hero Section

## TL;DR

The WebGL hero section has been converted to React and is ready to use. Just run:

```bash
cd "Kimi_Agent_Website Build & Deploy Fix/app"
npm run dev
```

Then open `http://localhost:5173` and scroll to see the mountain terrain animation.

## What You'll See

1. **Hero Section** - WebGL mountain terrain with text overlay
2. **Scroll Down (0-30%)** - Camera moves backward through mountains
3. **Scroll More (30-70%)** - Container moves up with side padding
4. **Scroll Further (70-100%)** - "Explore More" section appears
5. **Scroll to End (100-200%)** - Day-to-night cycle with clouds

## Files Changed

| File | Status | Notes |
|------|--------|-------|
| `src/sections/HeroSection.tsx` | ✅ Created | Main component |
| `src/hooks/useWebGLShaders.ts` | ✅ Created | Shader definitions |
| `src/pages/HomePage.tsx` | ✅ Already using | No changes needed |
| `src/components/Navbar.tsx` | ✅ Unchanged | As required |

## Build & Deploy

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

**Canvas not showing?**
- Check browser console for errors
- Ensure WebGL2 is supported
- Try a different browser

**Shader errors?**
- Check browser DevTools console
- Verify shader syntax in `useWebGLShaders.ts`

**Performance issues?**
- Check GPU usage in DevTools
- May need optimization for lower-end devices

## Key Features

- ✅ Scroll-based camera movement
- ✅ Day/night cycle transitions
- ✅ Volumetric clouds
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Company logo carousel

## Documentation

- **HERO_SECTION_MIGRATION.md** - Technical details
- **SETUP_INSTRUCTIONS.md** - Detailed setup guide
- **CONVERSION_COMPLETE.md** - Full summary

## That's It!

The component is production-ready. No additional configuration needed.

Happy scrolling! 🏔️
