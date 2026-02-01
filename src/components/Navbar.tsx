import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const featuresStart = windowHeight * 5.5;
      setScrolled(scrollY > featuresStart);

      const hideThreshold = documentHeight - (windowHeight * 1.5);

      if (documentHeight > windowHeight * 2) {
        setHidden(scrollY > hideThreshold);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
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
      animate={{
        opacity: hidden ? 0 : 1,
        y: hidden ? -100 : 0
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <nav className="w-full px-4 sm:px-8 relative">
        <div className="flex items-center justify-between h-14 sm:h-16 relative z-50">
          {/* Left - Navigation Links - Hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-6 lg:space-x-8 h-full">
            <button
              onMouseEnter={() => setProductsOpen(true)}
              className="group flex items-center space-x-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors h-full outline-none"
            >
              <span>PRODUCTS</span>
              <motion.svg
                animate={{ rotate: productsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-3 h-3 group-hover:text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>

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

          {/* Center - Logo - Absolute centered */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="flex items-center space-x-3">
              <svg
                viewBox="0 0 47 55"
                className="w-7 h-7 sm:w-8 sm:h-8"
                fill="currentColor"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(0,55) scale(0.1,-0.1)" stroke="none">
                  <path d="M217 288 c-127 -178 -117 -204 32 -87 l91 72 0 68 c0 103 -18 95 -123 -53z" />
                  <path d="M300 149 c0 -25 33 -22 38 4 2 12 -3 17 -17 17 -15 0 -21 -6 -21 -21z" />
                </g>
              </svg>
              <span className="text-xl sm:text-2xl font-medium tracking-tight">Adaline</span>
            </Link>
          </div>

          {/* Right - CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            <button className="hidden sm:flex items-center space-x-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-stone-200 rounded-full pl-3 pr-1 py-1 bg-white">
              <span>WATCH DEMO</span>
              <div className="w-5 h-5 rounded-full bg-[#1c1c1c] text-white flex items-center justify-center">
                <svg className="w-2.5 h-2.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
            <Link
              to="/pricing"
              className="inline-flex items-center px-6 py-2.5 text-[11px] font-bold tracking-widest text-[#d4e5d4] bg-[#223624] rounded-full hover:bg-[#2c452e] transition-colors uppercase font-mono"
            >
              <span className="hidden sm:inline">START FOR FREE</span>
              <span className="sm:hidden">START</span>
            </Link>
          </div>
        </div>

        {/* Products Mega Dropdown - Full Width Container */}
        <AnimatePresence>
          {productsOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseLeave={() => setProductsOpen(false)}
              className="absolute left-0 right-0 top-full pt-0 z-40"
            >
              {/* Card Content */}
              <div className="bg-[#FDFCF8] rounded-b-2xl shadow-[0_40px_60px_-15px_rgba(0,0,0,0.1)] border-x border-b border-stone-100 overflow-hidden w-full">
                <div className="px-8 pb-12 pt-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
                    {pillars.map((pillar, index) => (
                      <motion.div
                        key={pillar.name}
                        initial="idle"
                        whileHover="hover"
                        className="flex flex-col group cursor-pointer"
                      >
                        {/* Top Section: Visual */}
                        <div className="h-40 relative flex items-center justify-center mb-6">
                          <motion.svg
                            viewBox="0 0 200 200"
                            className="w-full h-full text-[#1c1c1c]"
                            style={{ overflow: 'visible' }}
                          >
                            {/* Mechanism Animations - STRICT CENTER ROTATION (0,0 coordinates) */}
                            {/* Added idle variant with duration: 0 to PREVENT reverse spin on exit */}

                            {index === 0 && ( // ITERATE: Rough Polygons
                              <g opacity="0.8">
                                {/* Top Polygon - Center (100, 80) */}
                                <g transform="translate(100, 80)">
                                  <motion.path
                                    d="M-15,-25 L10,-30 L25,-15 L30,5 L20,25 L-5,30 L-25,20 L-30,-5 Z"
                                    fill="none" stroke="currentColor" strokeWidth="0.5"
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: 360 }
                                    }}
                                    transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                                  />
                                  {/* Static Crosshair relative to group center */}
                                  <path d="M0 -5 V5 M-5 0 H5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                </g>

                                {/* Bot Left Polygon - Center (70, 125) */}
                                <g transform="translate(70, 125)">
                                  <motion.path
                                    d="M-10,-15 L10,-10 L15,5 L10,15 L-5,20 L-15,10 L-20,-5 Z"
                                    fill="none" stroke="currentColor" strokeWidth="0.5"
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: -360 }
                                    }}
                                    transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                                  />
                                  <path d="M0 -5 V5 M-5 0 H5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                </g>

                                {/* Bot Right Polygon - Center (130, 125) */}
                                <g transform="translate(130, 125)">
                                  <motion.path
                                    d="M-5,-20 L15,-15 L20,0 L15,15 L0,20 L-15,10 L-20,-10 Z"
                                    fill="none" stroke="currentColor" strokeWidth="0.5"
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: -360 }
                                    }}
                                    transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                                  />
                                  <path d="M0 -5 V5 M-5 0 H5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                </g>

                                {/* Connecting Lines (Static) */}
                                <path d="M100 80 L70 125 L130 125 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                              </g>
                            )}

                            {index === 1 && ( // EVALUATE: Dashed Circles
                              <g opacity="0.8">
                                {/* Top Circle - Center (100, 80) */}
                                <g transform="translate(100, 80)">
                                  <motion.circle
                                    cx="0" cy="0" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4"
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: 360 }
                                    }}
                                    transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                                  />
                                  <path d="M0 -5 V5 M-5 0 H5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                </g>

                                {/* Bot Left - Center (75, 120) */}
                                <g transform="translate(75, 120)">
                                  <motion.circle
                                    cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4"
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: -360 }
                                    }}
                                    transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                                  />
                                  <path d="M0 -5 V5 M-5 0 H5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                </g>

                                {/* Bot Right - Center (125, 120) */}
                                <g transform="translate(125, 120)">
                                  <motion.circle
                                    cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4"
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: -360 }
                                    }}
                                    transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                                  />
                                  <path d="M0 -5 V5 M-5 0 H5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                </g>
                              </g>
                            )}

                            {index === 2 && ( // DEPLOY: Gears
                              <g opacity="0.8">
                                {/* Main Gear - Center (100, 100) */}
                                <g transform="translate(100, 100)">
                                  <motion.g
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: 360 }
                                    }}
                                    transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                                  >
                                    <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                    {/* Ticks relative to 0,0 */}
                                    {[...Array(8)].map((_, i) => (
                                      <line
                                        key={i}
                                        x1="0" y1="-40" x2="0" y2="-35"
                                        stroke="currentColor" strokeWidth="1"
                                        transform={`rotate(${i * 45})`}
                                      />
                                    ))}
                                  </motion.g>
                                  <path d="M0 -5 V5 M-5 0 H5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                </g>

                                {/* Sat 1 - Top Right - Center (145, 70) */}
                                <g transform="translate(145, 70)">
                                  <motion.g
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: -360 }
                                    }}
                                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                  >
                                    <circle cx="0" cy="0" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                    {[...Array(6)].map((_, i) => (
                                      <line
                                        key={i}
                                        x1="0" y1="-18" x2="0" y2="-14"
                                        stroke="currentColor" strokeWidth="1"
                                        transform={`rotate(${i * 60})`}
                                      />
                                    ))}
                                  </motion.g>
                                  <path d="M0 -5 V5 M-5 0 H5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                </g>

                                {/* Sat 2 - Bot Center - Center (100, 155) */}
                                <g transform="translate(100, 155)">
                                  <motion.g
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: -360 }
                                    }}
                                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                  >
                                    <circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                    <line x1="0" y1="-15" x2="0" y2="-11" stroke="currentColor" strokeWidth="1" />
                                    <line x1="0" y1="15" x2="0" y2="11" stroke="currentColor" strokeWidth="1" />
                                    <line x1="-15" y1="0" x2="-11" y2="0" stroke="currentColor" strokeWidth="1" />
                                    <line x1="15" y1="0" x2="11" y2="0" stroke="currentColor" strokeWidth="1" />
                                  </motion.g>
                                  <path d="M0 -5 V5 M-5 0 H5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                </g>
                              </g>
                            )}

                            {index === 3 && ( // MONITOR: Concentric
                              <g opacity="0.8">
                                {/* Center Ring Group - Center (100, 100) */}
                                <g transform="translate(100, 100)">
                                  {/* Outer Ring */}
                                  <motion.circle
                                    cx="0" cy="0" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 4"
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: 360 }
                                    }}
                                    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                                  />
                                  {/* Inner Ring */}
                                  <motion.circle
                                    cx="0" cy="0" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2"
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: -360 }
                                    }}
                                    transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                                  />
                                  {/* Center Cross */}
                                  <path d="M0 -5 V5 M-5 0 H5" stroke="currentColor" strokeWidth="1" />

                                  {/* Satellite moving around center */}
                                  <motion.g
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: 360 }
                                    }}
                                    transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                                  >
                                    <circle cx="0" cy="-40" r="12" fill="white" stroke="currentColor" strokeWidth="0.5" />
                                    <path d="M0 -45 V-35 M-5 -40 H5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                  </motion.g>
                                </g>

                                {/* Small separate satellite - Center (55, 140) */}
                                <g transform="translate(55, 140)">
                                  <motion.circle
                                    cx="0" cy="0" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2"
                                    variants={{
                                      idle: { rotate: 0, transition: { duration: 0 } },
                                      hover: { rotate: -360 }
                                    }}
                                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                  />
                                  <path d="M0 -5 V5 M-5 0 H5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                </g>
                              </g>
                            )}

                            {/* Static Floating Badge - Adjusted Position */}
                            <g transform="translate(150, 40)">
                              <circle cx="0" cy="0" r="12" fill="#FDFCF8" stroke="#E5E5E5" strokeWidth="1" />
                              <text x="0" y="4" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#5A5A55" fontWeight="bold">
                                {pillar.num}
                              </text>
                            </g>
                            <text x="170" y="45" textAnchor="start" fontSize="9" fontFamily="monospace" fill="#A1A1AA" fontWeight="bold" letterSpacing="1">
                              {pillar.name}
                            </text>

                          </motion.svg>
                        </div>

                        {/* Bottom Section: Content */}
                        <div className="border-t border-dashed border-gray-200 pt-6">
                          <h4 className="text-[10px] font-mono tracking-widest text-[#5A5A55] uppercase mb-3">
                            {pillar.name}
                          </h4>
                          <p className="text-2xl font-serif text-[#1C1C1C] leading-tight mb-6">
                            {pillar.desc}
                          </p>
                          <div className="flex flex-col space-y-2">
                            {pillar.items.map((item) => (
                              <Link
                                key={item}
                                to={pillar.href}
                                className="text-sm text-[#5A5A55] hover:text-[#1C1C1C] transition-colors font-medium hover:underline decoration-1 underline-offset-4"
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
