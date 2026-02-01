import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient Sky Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #e8e4df 0%, #d4c8b8 30%, #a89080 60%, #4a5850 85%, #1a2a2a 100%)',
          }}
        />
        
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60 + 20}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Shooting star */}
        <motion.div
          className="absolute w-px h-20 bg-gradient-to-b from-white to-transparent"
          style={{ 
            left: '60%', 
            top: '20%',
            transform: 'rotate(-45deg)',
          }}
          animate={{
            x: [-100, 200],
            y: [-50, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 8,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-white mb-6 sm:mb-8"
        >
          Start your journey
          <br />
          with Adaline
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Link
            to="/pricing"
            className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#1a2a2a] bg-white/90 rounded-full hover:bg-white transition-colors backdrop-blur-sm"
          >
            START FOR FREE
          </Link>
        </motion.div>
      </div>

      {/* UI Screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 mt-4 sm:mt-8 mb-8"
      >
        <div className="relative rounded-lg sm:rounded-t-xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="/images/cta-ui.jpg"
            alt="Adaline platform interface"
            className="w-full h-auto"
            onError={(e) => {
              e.currentTarget.style.backgroundColor = '#4a5850';
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
