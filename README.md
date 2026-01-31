# Adaline - AI Agent Platform

A modern React application featuring WebGL terrain rendering with smooth scroll animations, built with Vite, TypeScript, and Tailwind CSS.

## Project Structure

```
.
├── index.html                          # Root reference (WebGL demo)
├── images/                             # Reference images
├── adaline-app/                        # Main React application
│   ├── app/
│   │   ├── src/
│   │   │   ├── components/             # React components (Navbar, Footer, UI)
│   │   │   ├── sections/               # Page sections (Hero, Features, etc.)
│   │   │   ├── pages/                  # Page components (HomePage, etc.)
│   │   │   ├── hooks/                  # Custom hooks (WebGL shaders)
│   │   │   ├── lib/                    # Utilities
│   │   │   ├── App.tsx                 # Main app component
│   │   │   └── main.tsx                # Entry point
│   │   ├── public/                     # Static assets
│   │   ├── dist/                       # Production build (generated)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.js
│   │   ├── vercel.json
│   │   └── .gitignore
├── .gitignore                          # Git ignore rules
└── README.md                           # This file
```

## What to Push to Git

**Push to Git:**
- ✅ `adaline-app/app/src/` - Source code
- ✅ `adaline-app/app/public/` - Public assets
- ✅ `adaline-app/app/package.json` - Dependencies
- ✅ `adaline-app/app/tsconfig.json` - TypeScript config
- ✅ `adaline-app/app/vite.config.ts` - Vite config
- ✅ `adaline-app/app/tailwind.config.js` - Tailwind config
- ✅ `adaline-app/app/postcss.config.js` - PostCSS config
- ✅ `adaline-app/app/vercel.json` - Vercel config
- ✅ `adaline-app/app/.gitignore` - Git ignore
- ✅ `index.html` - Root reference file
- ✅ `images/` - Reference images
- ✅ `.gitignore` - Root git ignore
- ✅ `README.md` - Documentation

**Do NOT push to Git:**
- ❌ `adaline-app/app/node_modules/` - Ignored by .gitignore
- ❌ `adaline-app/app/dist/` - Ignored by .gitignore
- ❌ `.env` files - Ignored by .gitignore

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
   - **Root Directory:** `adaline-app/app`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. Click "Deploy"

## Local Development

```bash
cd adaline-app/app

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
- ✅ Optimized performance with throttled scroll events
- ✅ Lazy loading for images

## Performance Notes

- **First Load:** WebGL shader compilation takes 1-2 seconds (normal)
- **Scroll Performance:** Optimized with 30fps throttling
- **Bundle Size:** ~440KB (gzip: ~136KB)
- **Deployment:** Vercel recommended for best performance

## Environment Variables

None required for basic deployment. Add `.env` if needed for future API integrations.

## Support

For issues or questions, refer to the documentation files in the project root.
