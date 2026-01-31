# Adaline Website - Technical Specification

## 1. Tech Stack Overview

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Routing | React Router DOM |

## 2. Tailwind Configuration

```javascript
// tailwind.config.js extensions
{
  theme: {
    extend: {
      colors: {
        background: '#F5F5F0',
        foreground: '#1A1A1A',
        muted: '#666666',
        'muted-foreground': '#999999',
        border: '#E5E5E5',
        accent: {
          green: '#2D4A2D',
          'green-light': '#3D5A3D',
          aurora: '#4ADE80',
        },
        dark: {
          bg: '#0A0F0D',
          surface: '#1A1F1D',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'aurora': 'aurora 8s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
}
```

## 3. Component Inventory

### Shadcn/UI Components (Pre-installed)
- Button
- Card
- Accordion
- Tabs
- Navigation Menu
- Badge
- Separator

### Custom Components

| Component | Location | Props |
|-----------|----------|-------|
| Navbar | `src/components/Navbar.tsx` | `scrolled: boolean` |
| LogoTicker | `src/components/LogoTicker.tsx` | `logos: string[]` |
| FeatureSection | `src/sections/FeatureSection.tsx` | `step: number, title: string, description: string, features: Feature[], image: string` |
| StepIndicator | `src/components/StepIndicator.tsx` | `activeStep: number, steps: Step[]` |
| StatsCounter | `src/components/StatsCounter.tsx` | `stats: Stat[]` |
| TestimonialCard | `src/components/TestimonialCard.tsx` | `company: string, quote: string, author: string, metric?: string` |
| ArticleCard | `src/components/ArticleCard.tsx` | `title: string, image: string, category: string, readTime: string` |
| CTASection | `src/sections/CTASection.tsx` | - |
| Footer | `src/components/Footer.tsx` | - |
| PricingCard | `src/components/PricingCard.tsx` | `tier: PricingTier` |
| AuroraBackground | `src/components/AuroraBackground.tsx` | `children: ReactNode` |

## 4. Animation Implementation Plan

| Interaction | Tech | Implementation |
|-------------|------|----------------|
| Page Load Fade | Framer Motion | `initial={{ opacity: 0 }}` `animate={{ opacity: 1 }}` with stagger |
| Navbar Scroll | React State + CSS | `useScroll` hook toggles `scrolled` class |
| Logo Ticker | CSS Animation | `animation: ticker 30s linear infinite` on duplicated content |
| Hero Parallax | Framer Motion | `useScroll` + `useTransform` for Y translation |
| Feature Tab Switch | Framer Motion | `AnimatePresence` with fade/slide transitions |
| Accordion Expand | Framer Motion | `animate={{ height: 'auto' }}` with spring |
| Stats Counter | Framer Motion | `useInView` + animated number component |
| Card Hover | Tailwind | `hover:translate-y-[-2px] hover:border-gray-400 transition-all` |
| Button Hover | Tailwind | `hover:scale-[1.02] hover:bg-accent-green-light transition-all` |
| Aurora Background | CSS Animation | Gradient with `background-size: 200%` + position animation |
| Scroll Reveal | Framer Motion | `whileInView` with `viewport={{ once: true }}` |
| Line Chart Draw | SVG + Framer | `pathLength` animation from 0 to 1 |

## 5. Project File Structure

```
/mnt/okcomputer/output/app/
├── public/
│   ├── images/
│   │   ├── hero-landscape.jpg
│   │   ├── iterate-ui.jpg
│   │   ├── evaluate-ui.jpg
│   │   ├── deploy-ui.jpg
│   │   ├── monitor-ui.jpg
│   │   ├── architecture-diagram.jpg
│   │   ├── cta-ui.jpg
│   │   └── blog/
│   │       ├── article-1.jpg
│   │       ├── article-2.jpg
│   │       └── ...
│   └── logos/
│       ├── statflo.svg
│       ├── doordash.svg
│       ├── gusto.svg
│       ├── reforge.svg
│       ├── mckinsey.svg
│       ├── simpledocs.svg
│       ├── hubspot.svg
│       ├── serif.svg
│       ├── jusbrasil.svg
│       └── daybreak.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── LogoTicker.tsx
│   │   ├── StepIndicator.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── PricingCard.tsx
│   │   ├── AuroraBackground.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── FeatureSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── LibrarySection.tsx
│   │   └── CTASection.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PricingPage.tsx
│   │   └── BlogPage.tsx
│   ├── hooks/
│   │   ├── useScrollPosition.ts
│   │   └── useInView.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 6. Package Installation

```bash
# Initialize project
bash /app/.kimi/skills/webapp-building/scripts/init-webapp.sh "Adaline"

# Install additional dependencies
cd /mnt/okcomputer/output/app
npm install framer-motion react-router-dom

# Shadcn components (if needed)
npx shadcn add accordion tabs navigation-menu badge separator
```

## 7. Key Implementation Details

### Navbar Scroll Behavior
```typescript
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Logo Ticker
```tsx
<div className="overflow-hidden">
  <div className="flex animate-ticker">
    {[...logos, ...logos].map((logo, i) => (
      <img key={i} src={logo} className="h-8 mx-8" />
    ))}
  </div>
</div>
```

### Feature Tab Animation
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeStep}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {/* Content */}
  </motion.div>
</AnimatePresence>
```

### Stats Counter
```tsx
const { ref, inView } = useInView({ triggerOnce: true });
const count = useMotionValue(0);
const rounded = useTransform(count, Math.round);

useEffect(() => {
  if (inView) {
    animate(count, targetValue, { duration: 2 });
  }
}, [inView]);
```

## 8. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, stacked nav |
| Tablet | 640-1024px | Two columns where applicable |
| Desktop | > 1024px | Full layout as designed |

## 9. Performance Considerations

1. **Images**: Use WebP format with fallbacks, lazy loading
2. **Animations**: Use `transform` and `opacity` only
3. **Bundle**: Code split by route
4. **Fonts**: Preload Inter font
5. **Reduced Motion**: Respect `prefers-reduced-motion`
