# Adaline.ai UI Replica

This project is a frontend recreation of the **Adaline.ai** user interface. It focuses on implementing animations, responsive layouts, and interactive design elements using modern web technologies. This is a UI-only build, demonstrating advanced styling and motion capabilities.

## 🚀 Tech Stack

*   **Framework**: [React](https://react.dev/) (TypeScript) + [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) for complex gesture-based animations and scroll interactions.
*   **Icons**: Custom SVGs and Lucide React.

## ✨ Key UI Features

### 1. Immersive Hero Section
*   **Atmospheric Design**: Uses high-quality background imagery (`4k` brightness/clarity) to set a premium tone.
*   **Animated Elements**: Includes a smooth, infinite-scrolling marquee of "Trusted By" logos with gradient fades.
*   **Typography**: Clean, modern typography aligned with the original brand identity.

### 2. Interactive Features Section
*   **Desktop Sticky-Scroll**: A sophisticated scroll-driven navigation sequence where the sidebar remains sticky while feature content transitions smoothly.
*   **Mobile Responsive Layout**: Optimized mobile experience where features are vertically stacked using a logical "timeline" flow.
    *   **Auto-Cycling Visuals**: On mobile, complex feature animations (like tree views, code diffs, charts) loop automatically to showcase functionality without user interaction.
    *   **Smart Header**: A floating sticky header on mobile that dynamically updates to show the active feature being viewed.
*   **Dynamic Visuals**: Implementation of various intricate UI mockups (Code Editors, Diff Views, Line Charts, Tree Visuals) entirely in CSS/React.

### 3. Responsive Navigation
*   **Navbar**: A fully responsive navigation bar that adapts to screen size, handling transparency and layout shifts seamlessly.

## 🛠️ Getting Started

To run this project locally:

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📸 visual details
*   **One-by-One Mobile Scroll**: The mobile view enforces a focused reading experience, revealing features one after another with clear separation.
*   **Pixel-Precision**: Margins, paddings, and font sizes are tuned to match the reference design.
