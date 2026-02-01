
import { useRef } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);



  // Scroll logic removed for standard flow
  // useEffect(() => { ... }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-screen z-10 overflow-hidden bg-[#f5f1e6]"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/images/original hero.png"
          alt="Hero Landscape"
          className="w-full h-full object-cover"
        />
        {/* Overlay removed for brightness */}
      </div>

      <div
        ref={heroContentRef}
        className="absolute top-[32%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full max-w-4xl px-4 sm:px-10 pointer-events-none"
        style={{ willChange: 'opacity, transform' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-2xl sm:text-3xl md:text-5xl font-normal text-[#1c1c1c] mb-8 sm:mb-12 leading-tight tracking-tight"
        >
          The single platform to iterate,<br />
          evaluate, deploy, and monitor AI agents
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mb-4 sm:mb-6"
        >
          <p className="text-[10px] text-[#8e8e8e] uppercase tracking-[0.2em] mb-4 sm:mb-8 font-mono">
            TRUSTED BY
          </p>
          <div
            className="trusted-logos flex justify-center items-center gap-6 sm:gap-16 overflow-hidden relative h-10 sm:h-12 w-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)'
            }}
          >
            <div className="logos-container flex gap-10 sm:gap-20 animate-scroll-logos items-center">
              {[
                'Symbolic.ai', 'SimpleDocs', 'DOORDASH', 'serif', 'Coframe', 'Giift',
                'Symbolic.ai', 'SimpleDocs', 'DOORDASH', 'serif', 'Coframe', 'Giift'
              ].map((logo, i) => (
                <div key={i} className="logo-item text-black flex items-center gap-2 whitespace-nowrap">

                  {/* Symbolic.ai */}
                  {logo === 'Symbolic.ai' && (
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="6" cy="6" r="4" opacity="0.6" />
                        <circle cx="18" cy="6" r="4" opacity="0.6" />
                        <circle cx="6" cy="18" r="4" opacity="0.6" />
                        <circle cx="18" cy="18" r="4" opacity="0.6" />
                      </svg>
                      <span className="font-serif text-lg font-bold">Symbolic.ai</span>
                    </div>
                  )}

                  {/* SimpleDocs */}
                  {logo === 'SimpleDocs' && (
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <span className="font-sans text-lg font-semibold tracking-tight">SimpleDocs</span>
                    </div>
                  )}

                  {/* DOORDASH */}
                  {logo === 'DOORDASH' && (
                    <div className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#1c1c1c]">
                        <path d="M22.9 10.3c-.4-.7-1-1.2-1.8-1.5-1.4-.5-3.3-.4-4.2.3-.5.4-1.3 1.2-1.7 1.8-.1.2-.2.5-.2.7 0 .1.1.2.2.3.2.1.4.1.7-.1.4-.2 1.3-.7 1.7-1 .3-.2.6-.4.9-.5.6-.2 1.2-.2 1.7.1.5.3.7.8.6 1.4 0 .3-.1.6-.3.8-.4.4-1 .6-1.5.6H5.2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h13.3c.6 0 1.2-.2 1.6-.6.6-.5.9-1.3.8-2.1z" />
                        <path d="M1 13h18c.6 0 1 .4 1 1s-.4 1-1 1H1c-.6 0-1-.4-1-1s.4-1 1-1z" />
                      </svg>
                      <span className="font-bold text-lg tracking-wide uppercase">DOORDASH</span>
                    </div>
                  )}

                  {/* serif */}
                  {logo === 'serif' && (
                    <span className="font-serif text-2xl font-bold tracking-tight">serif</span>
                  )}

                  {/* Coframe */}
                  {logo === 'Coframe' && (
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 19H22L12 2Z" fill="currentColor" />
                        <path d="M6 19L2 22H10L6 19Z" fillOpacity="0.5" />
                      </svg>
                      <span className="font-bold text-lg tracking-tight font-sans">Coframe</span>
                    </div>
                  )}

                  {/* Giift */}
                  {logo === 'Giift' && (
                    <span className="font-bold text-xl tracking-tighter font-serif">Giift</span>
                  )}

                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll-logos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-logos {
          animation: scroll-logos 15s linear infinite;
        }
      `}</style>
    </>
  );
};

export default HeroSection;
