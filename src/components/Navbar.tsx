import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Features section starts at approximately 600vh (hero is 600vh)
      // So navbar becomes opaque when scrolling past hero section
      const featuresStart = window.innerHeight * 6; // 600vh in pixels
      setScrolled(window.scrollY > featuresStart);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pillars = [
    { 
      num: '1', 
      name: 'ITERATE', 
      desc: 'Sketch, test and refine',
      items: ['Editor', 'Playground', 'Datasets'],
      href: '/iterate'
    },
    { 
      num: '2', 
      name: 'EVALUATE', 
      desc: 'Reflect and measure',
      items: ['Evaluations', 'Datasets'],
      href: '/evaluate'
    },
    { 
      num: '3', 
      name: 'DEPLOY', 
      desc: 'From draft to live',
      items: ['Deployments', 'Analytics', 'Gateway'],
      href: '/deploy'
    },
    { 
      num: '4', 
      name: 'MONITOR', 
      desc: 'Insights in real time',
      items: ['Logs', 'Analytics'],
      href: '/monitor'
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left - Navigation Links - Hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-6 lg:space-x-8">
            <div className="relative">
              <button
                onMouseEnter={() => setProductsOpen(true)}
                className="flex items-center space-x-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>PRODUCTS</span>
                <motion.svg 
                  animate={{ rotate: productsOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-3 h-3" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              
              {/* Products Mega Dropdown */}
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    onMouseLeave={() => setProductsOpen(false)}
                    className="absolute top-full left-0 mt-4 w-[90vw] sm:w-[800px] max-w-[800px] bg-white rounded-2xl shadow-2xl border border-border p-6 sm:p-8 z-50"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                      {pillars.map((pillar, index) => (
                        <motion.div
                          key={pillar.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group cursor-pointer"
                        >
                          {/* Animated Circle Icon */}
                          <div className="relative mb-4">
                            <motion.svg
                              width="80"
                              height="80"
                              viewBox="0 0 80 80"
                              className="transform group-hover:scale-110 transition-transform duration-500"
                            >
                              {/* Outer dashed circle */}
                              <motion.circle
                                cx="40"
                                cy="40"
                                r="35"
                                fill="none"
                                stroke="#e5e5e5"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                style={{ transformOrigin: 'center' }}
                              />
                              {/* Inner circles with plus signs */}
                              <circle cx="25" cy="30" r="12" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
                              <path d="M25 26v8 M21 30h8" stroke="#1a1a1a" strokeWidth="1.5" />
                              
                              <circle cx="55" cy="30" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1" />
                              <path d="M55 27v6 M52 30h6" stroke="#1a1a1a" strokeWidth="1" />
                              
                              <circle cx="40" cy="55" r="10" fill="none" stroke="#1a1a1a" strokeWidth="1" />
                              <path d="M40 51v8 M36 55h8" stroke="#1a1a1a" strokeWidth="1" />
                              
                              {/* Number badge */}
                              <motion.circle
                                cx="65"
                                cy="15"
                                r="10"
                                fill={index === 0 ? "#2D4A2D" : "#f5f5f0"}
                                stroke="#2D4A2D"
                                strokeWidth="1"
                                className="group-hover:fill-[#2D4A2D] transition-colors duration-300"
                              />
                              <text
                                x="65"
                                y="19"
                                textAnchor="middle"
                                fontSize="10"
                                fill={index === 0 ? "white" : "#2D4A2D"}
                                className="group-hover:fill-white transition-colors duration-300"
                              >
                                {pillar.num}
                              </text>
                            </motion.svg>
                          </div>
                          
                          <h3 className="text-xs font-medium text-muted-foreground mb-1 group-hover:text-foreground transition-colors">
                            {pillar.name}
                          </h3>
                          <p className="text-lg font-medium text-foreground mb-3">
                            {pillar.desc}
                          </p>
                          <ul className="space-y-1">
                            {pillar.items.map((item) => (
                              <li key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link
              to="/pricing"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              PRICING
            </Link>
            <Link
              to="/blog"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              BLOG
            </Link>
          </div>

          {/* Center - Logo */}
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2">
            <svg
              viewBox="0 0 24 24"
              className="w-5 sm:w-6 h-5 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="text-base sm:text-xl font-medium tracking-tight">Adaline</span>
          </Link>

          {/* Right - CTAs - Simplified on mobile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            <button className="hidden sm:flex items-center space-x-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              <span>WATCH DEMO</span>
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
            <Link
              to="/pricing"
              className="inline-flex items-center px-3 sm:px-5 py-2 sm:py-2.5 text-xs font-medium text-white bg-[#2D4A2D] rounded-full hover:bg-[#3D5A3D] transition-colors"
            >
              <span className="hidden sm:inline">START FOR FREE</span>
              <span className="sm:hidden">START</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden border-t border-border bg-white/95 backdrop-blur-md"
            >
              <div className="px-4 py-4 space-y-3">
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  PRODUCTS
                </Link>
                <Link
                  to="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  PRICING
                </Link>
                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  BLOG
                </Link>
                <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors">
                  <span>WATCH DEMO</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
