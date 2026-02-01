# Adaline - AI Agent Platform

A modern React application featuring WebGL terrain rendering with smooth scroll animations, built with Vite, TypeScript, and Tailwind CSS.

## Project Structure

```
.
├── src/
│   ├── components/             # React components (Navbar, Footer, UI)
│   ├── sections/               # Page sections (Hero, Features, etc.)
│   ├── pages/                  # Page components (HomePage, etc.)
│   ├── hooks/                  # Custom hooks (WebGL shaders)
│   ├── lib/                    # Utilities
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Entry point
├── public/                     # Static assets (images, videos)
├── dist/                       # Production build (generated)
├── index.html                  # HTML entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── README.md                   # This file
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- ✅ WebGL terrain rendering with smooth animations
- ✅ Scroll-based camera movement
- ✅ Responsive navbar with dropdown menu
- ✅ Features section with interactive UI
- ✅ Statistics and testimonials
- ✅ Blog/library section
- ✅ CTA section with gradient background
- ✅ Footer with underwater imagery
- ✅ Video player with mountain animation
- ✅ Optimized performance with throttled scroll events
- ✅ Lazy loading for images

## Deployment on Vercel

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Adaline AI platform"
git branch -M main
```

### Step 2: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/adaline-app.git
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. **Configure Build Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** `.` (root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. Click "Deploy"

## Performance Notes

- **First Load:** WebGL shader compilation takes 1-2 seconds (normal)
- **Scroll Performance:** Optimized with 30fps throttling
- **Bundle Size:** ~440KB (gzip: ~136KB)
- **Deployment:** Vercel recommended for best performance

## Environment Variables

None required for basic deployment. Add `.env` if needed for future API integrations.

## Support

For issues or questions, refer to the documentation files in the project root.
