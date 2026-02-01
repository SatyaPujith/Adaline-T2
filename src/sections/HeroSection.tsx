import { useEffect, useRef } from 'react';
import { VERTEX_SHADER, TERRAIN_FRAGMENT_SHADER } from '../hooks/useWebGLShaders';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true });
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }

    // Set canvas sizes
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();

    // Compile shader
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    // Setup shader program
    const vs = compileShader(VERTEX_SHADER, gl.VERTEX_SHADER);
    const fs = compileShader(TERRAIN_FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
    if (!vs || !fs) {
      console.error('Failed to compile shaders');
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      console.error('Failed to create program');
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations AFTER program is linked
    const iResolutionLoc = gl.getUniformLocation(program, 'iResolution');
    const iTimeLoc = gl.getUniformLocation(program, 'iTime');
    const iMouseLoc = gl.getUniformLocation(program, 'iMouse');
    const iChannel0Loc = gl.getUniformLocation(program, 'iChannel0');
    const iChannel1Loc = gl.getUniformLocation(program, 'iChannel1');
    const iChannel2Loc = gl.getUniformLocation(program, 'iChannel2');
    const scrollProgressLoc = gl.getUniformLocation(program, 'scrollProgress');

    // Create noise textures
    const createNoiseTexture = (seed: number) => {
      const size = 256;
      const data = new Uint8Array(size * size);
      const seededRandom = (s: number) => {
        const x = Math.sin(s) * 10000;
        return x - Math.floor(x);
      };
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.floor(seededRandom(i + seed) * 255);
      }
      const texture = gl.createTexture();
      if (!texture) return null;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, size, size, 0, gl.RED, gl.UNSIGNED_BYTE, data);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      return texture;
    };

    const noiseTexture0 = createNoiseTexture(1);
    const noiseTexture1 = createNoiseTexture(2);
    const noiseTexture2 = createNoiseTexture(3);

    if (!noiseTexture0 || !noiseTexture1 || !noiseTexture2) {
      console.error('Failed to create noise textures');
      return;
    }

    // Animation loop
    let currentScrollProgress = 0;
    let animationId: number;

    const animate = () => {
      gl.clearColor(0.96, 0.95, 0.92, 1.0); // beige color
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.useProgram(program);
      
      // Set uniforms
      if (iResolutionLoc) gl.uniform2f(iResolutionLoc, canvas.width, canvas.height);
      if (iTimeLoc) gl.uniform1f(iTimeLoc, 0.0);
      if (iMouseLoc) gl.uniform4f(iMouseLoc, 0, 0, 0, 0);
      if (scrollProgressLoc) gl.uniform1f(scrollProgressLoc, currentScrollProgress);

      // Bind textures
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, noiseTexture0);
      if (iChannel0Loc) gl.uniform1i(iChannel0Loc, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, noiseTexture1);
      if (iChannel1Loc) gl.uniform1i(iChannel1Loc, 1);

      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, noiseTexture2);
      if (iChannel2Loc) gl.uniform1i(iChannel2Loc, 2);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Scroll handler with throttling
    let lastScrollTime = 0;
    const throttleDelay = 32; // ~30fps - reduced for better performance
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < throttleDelay) return;
      lastScrollTime = now;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / maxScroll;
      currentScrollProgress = progress;

      // Update hero content
      if (heroContentRef.current) {
        const heading = heroContentRef.current.querySelector('h1') as HTMLElement | null;
        const logos = heroContentRef.current.querySelector('.trusted-logos') as HTMLElement | null;

        const scale = 1 - (progress * 0.5);
        const fadeStart = 0.05;
        const fadeEnd = 0.15;
        const opacity = progress > fadeStart ? Math.min((progress - fadeStart) / (fadeEnd - fadeStart), 1) : 0;

        // Batch DOM updates
        if (heading) heading.style.transform = `scale(${scale})`;
        if (logos) logos.style.transform = `scale(${scale})`;
        heroContentRef.current.style.opacity = String(1 - opacity);
      }

      // Container movement - optimized
      if (contentSectionRef.current && progress > 0.15) {
        if (progress <= 0.20) {
          canvas.style.transform = 'translateY(0)';
          canvas.style.marginLeft = '0';
          canvas.style.marginRight = '0';
          canvas.style.width = '100%';
          canvas.style.borderRadius = '0';
          contentSectionRef.current.style.transform = 'translateY(0)';
          contentSectionRef.current.style.opacity = '0';
        } else {
          const moveProgress = (progress - 0.20) / 0.80;
          const translateY = moveProgress * 100;
          const sidePadding = moveProgress * 80;
          
          canvas.style.transform = `translateY(-${translateY}vh)`;
          canvas.style.marginLeft = `${sidePadding}px`;
          canvas.style.marginRight = `${sidePadding}px`;
          canvas.style.width = `calc(100% - ${sidePadding * 2}px)`;
          canvas.style.borderRadius = `${moveProgress * 20}px`;
          contentSectionRef.current.style.transform = `translateY(-${translateY}vh)`;
          contentSectionRef.current.style.opacity = String(moveProgress);
        }
      }

      // Video player animation - appears when mountains locked, moves up with them
      if (videoPlayerRef.current) {
        const video = videoPlayerRef.current.querySelector('video') as HTMLVideoElement;
        
        if (progress < 0.20) {
          // Hidden while mountains are moving - pause video
          videoPlayerRef.current.style.opacity = '0';
          videoPlayerRef.current.style.pointerEvents = 'none';
          videoPlayerRef.current.style.transform = 'translate(-50%, -50%)';
          if (video && !video.paused) {
            video.pause();
          }
        } else if (progress <= 0.25) {
          // Fade in when mountains lock (progress 0.20-0.25)
          const fadeProgress = (progress - 0.20) / 0.05;
          videoPlayerRef.current.style.opacity = String(Math.min(fadeProgress, 1));
          videoPlayerRef.current.style.pointerEvents = 'auto';
          videoPlayerRef.current.style.transform = 'translate(-50%, -50%)';
        } else {
          // Move UP with mountains (same as canvas movement)
          const moveProgress = (progress - 0.20) / 0.80;
          const translateY = moveProgress * -100; // Move UP (negative Y)
          
          videoPlayerRef.current.style.opacity = '1';
          videoPlayerRef.current.style.transform = `translate(-50%, calc(-50% + ${translateY}vh))`;
          videoPlayerRef.current.style.pointerEvents = 'auto';
          
          // Pause video when it moves out of view
          if (moveProgress > 0.8 && video && !video.paused) {
            video.pause();
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Canvas - Fixed background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen bg-[#f5f2eb] z-10 block"
        style={{ willChange: 'transform', maxWidth: '100vw', maxHeight: '100vh' }}
      />

      {/* Hero Content - Fixed text overlay */}
      <div
        ref={heroContentRef}
        className="fixed top-1/3 sm:top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full max-w-4xl px-4 sm:px-10 opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ willChange: 'opacity, transform' }}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
          The single platform to iterate,<br />
          evaluate, deploy, and monitor AI agents
        </h1>
        <div className="mb-4 sm:mb-6">
          <p className="text-[10px] sm:text-xs text-white uppercase tracking-widest mb-3 sm:mb-6 font-medium drop-shadow">
            Trusted by
          </p>
          <div className="trusted-logos flex justify-center items-center gap-6 sm:gap-16 overflow-hidden relative h-8 sm:h-10">
            <div className="logos-container flex gap-6 sm:gap-16 animate-scroll-logos">
              {['Discord', 'McKinsey & Company', 'DOORDASH', 'HubSpot', 'Discord', 'McKinsey & Company', 'DOORDASH', 'HubSpot'].map((logo, i) => (
                <div key={i} className="logo-item text-[9px] sm:text-xs text-white font-medium flex items-center gap-1 sm:gap-2 whitespace-nowrap drop-shadow">
                  {logo === 'Discord' && (
                    <svg className="w-3 sm:w-5 h-3 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.295a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.359.698.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-4.761-.838-8.898-3.549-12.562a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.193 0 2.156.964 2.156 2.157 0 1.19-.963 2.156-2.156 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.193 0 2.157.964 2.157 2.157 0 1.19-.964 2.156-2.157 2.156z"/>
                    </svg>
                  )}
                  {logo === 'McKinsey & Company' && (
                    <svg className="w-3 sm:w-5 h-3 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="2" width="8" height="8"/>
                      <rect x="12" y="2" width="10" height="8"/>
                      <rect x="2" y="12" width="8" height="10"/>
                      <rect x="12" y="12" width="10" height="10"/>
                    </svg>
                  )}
                  {logo === 'DOORDASH' && (
                    <svg className="w-3 sm:w-5 h-3 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v12M6 12h12" stroke="white" strokeWidth="2" fill="none"/>
                    </svg>
                  )}
                  {logo === 'HubSpot' && (
                    <svg className="w-3 sm:w-5 h-3 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                  )}
                  <span className="hidden sm:inline">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - This moves up to reveal sections underneath */}
      <div
        ref={contentSectionRef}
        className="fixed top-screen left-0 w-full h-screen bg-[#f5f2eb] z-20 transition-all duration-100"
        style={{ top: '100vh', opacity: 1, willChange: 'transform, opacity' }}
      />

      {/* Video Player - Responsive, appears when mountains locked, moves with mountains */}
      <div
        ref={videoPlayerRef}
        className="fixed rounded-lg overflow-hidden shadow-2xl cursor-pointer"
        style={{ 
          willChange: 'transform, opacity', 
          opacity: 0, 
          pointerEvents: 'none', 
          zIndex: 12,
          width: 'clamp(200px, 80vw, 500px)',
          aspectRatio: '16 / 9',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-full h-full relative group">
          {/* Video player with native controls */}
          <video
            className="w-full h-full object-cover"
            controls
            controlsList="nodownload"
            playsInline
          >
            <source src="/images/product-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-logos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-logos {
          animation: scroll-logos 20s linear infinite;
        }
      `}</style>
    </>
  );
};

export default HeroSection;
