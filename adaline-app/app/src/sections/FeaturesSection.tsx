import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

interface FeatureStep {
  id: number;
  stepNum: string;
  name: string;
  title: string;
  description: string;
  subSteps: { title: string; desc: string }[];
  tabs: string[];
}

const features: FeatureStep[] = [
  {
    id: 1,
    stepNum: '01',
    name: 'Iterate',
    title: 'Prompt engineering that feels like magic',
    description: 'Test prompts across datasets, compare models side-by-side, and collaborate seamlessly—all with automatic versioning and prompt management that actually works.',
    subSteps: [
      { title: 'Prompt management across providers', desc: 'Centralize your prompts for all LLM providers in one intuitive workspace, eliminating fragmentation and ensuring consistency across your AI applications.' },
      { title: 'Multi-modal and dynamic variables', desc: 'Test how your prompts perform with different inputs, images, and dynamic RAG context in real-time, identifying the optimal configurations for your specific use cases.' },
      { title: 'Automatic version history', desc: 'Never lose your work with comprehensive version tracking that captures every change, allowing you to compare iterations and revert to previous versions instantly.' },
    ],
    tabs: ['Learn more', 'EDITOR', 'DATASETS'],
  },
  {
    id: 2,
    stepNum: '02',
    name: 'Evaluate',
    title: 'AI-powered testing that writes itself',
    description: 'Generate comprehensive evaluations with AI, visualize performance trends, and debug failed cases instantly in your most complicated workflows.',
    subSteps: [
      { title: 'Magical test set up', desc: 'Create robust test suites in seconds with AI-assisted generation that identifies edge cases and potential failure modes you might have missed.' },
      { title: 'Historical performance trends', desc: 'Track how your AI\'s performance evolves over time with intuitive visualizations that highlight improvements and regressions across all key metrics.' },
      { title: 'Rollback to any prompt version', desc: 'Instantly revert to previous versions when issues arise, with the ability to compare performance metrics between any two points in your evaluation history.' },
    ],
    tabs: ['Learn more', 'EVALUATIONS', 'ANALYTICS'],
  },
  {
    id: 3,
    stepNum: '03',
    name: 'Deploy',
    title: 'Ship AI with unshakeable confidence',
    description: 'Push to any environment with built-in controls, smart diffing, instant rollbacks, and drop-in integration that fits your existing codebase.',
    subSteps: [
      { title: 'Multi-environment deployments', desc: 'Manage your entire lifecycle from development to production with environment-specific configurations that ensure smooth transitions between stages.' },
      { title: 'Smart diffing across versions', desc: 'Understand exactly what changed between deployments with intelligent diffing that highlights modifications to prompts, models, and configuration settings.' },
      { title: 'Instant rollbacks', desc: 'Recover from issues in seconds with one-click rollbacks that restore previous configurations, keeping your AI services reliable and your users happy.' },
    ],
    tabs: ['Learn more', 'DEPLOYMENTS', 'EDITOR'],
  },
  {
    id: 4,
    stepNum: '04',
    name: 'Monitor',
    title: 'Turn production data into a competitive edge',
    description: 'Visualize complex AI workflows, run real-time evaluations, collect real-world performance data, and optimize for cost, latency, and quality at scale.',
    subSteps: [
      { title: 'Full traces and spans', desc: 'Understand the complete journey of each request with detailed visualization of execution paths, helping you identify bottlenecks and optimization opportunities.' },
      { title: 'Continuous evaluations', desc: 'Automatically test your production AI against benchmark datasets and real-time inputs, ensuring performance remains consistent as user patterns and data distributions evolve.' },
      { title: 'Human annotations', desc: 'Enrich your training and evaluation datasets with human feedback collected directly from your monitoring interface, creating a virtuous cycle of continuous improvement.' },
    ],
    tabs: ['Learn more', 'ANALYTICS', 'LOGS', 'EVALUATIONS'],
  },
];

const FloatingImage = ({ src, style, delay = 0 }: { src: string; style: React.CSSProperties; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5, delay }}
    className="absolute bg-white rounded-lg shadow-lg overflow-hidden"
    style={style}
  >
    <img src={src} alt="" className="w-full h-full object-cover" />
  </motion.div>
);

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeSubStep, setActiveSubStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Auto-advance feature based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const newFeature = Math.min(Math.floor(value * 4), 3);
      if (newFeature !== activeFeature) {
        setActiveFeature(newFeature);
        setActiveSubStep(0);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeFeature]);

  const currentFeature = features[activeFeature];

  return (
    <div ref={containerRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen bg-white overflow-hidden">
        {/* Step Indicators */}
        <div className="absolute top-20 left-8 right-8 flex items-center justify-between z-20">
          {features.map((feature, index) => (
            <motion.button
              key={feature.id}
              onClick={() => {
                setActiveFeature(index);
                setActiveSubStep(0);
              }}
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated Circle */}
              <div className="relative w-12 h-12">
                <motion.svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  className="transform"
                >
                  {/* Outer ring - solid when active, dashed when inactive */}
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke={index === activeFeature ? "#1a1a1a" : "#e5e5e5"}
                    strokeWidth="1.5"
                    strokeDasharray={index === activeFeature ? "" : "4 4"}
                    initial={false}
                    animate={{ 
                      stroke: index === activeFeature ? "#1a1a1a" : "#e5e5e5",
                      rotate: index === activeFeature ? 0 : 360
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Inner crosshair */}
                  {index === activeFeature && (
                    <>
                      <line x1="24" y1="14" x2="24" y2="34" stroke="#1a1a1a" strokeWidth="1" />
                      <line x1="14" y1="24" x2="34" y2="24" stroke="#1a1a1a" strokeWidth="1" />
                    </>
                  )}
                </motion.svg>
                {/* Step number */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#2D4A2D] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {feature.stepNum}
                </div>
              </div>
              
              <div className="text-left">
                <span className={`text-xs font-medium transition-colors ${
                  index === activeFeature ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {feature.name}
                </span>
                {/* Progress indicator */}
                {index === activeFeature && (
                  <div className="flex space-x-0.5 mt-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ width: 0 }}
                        animate={{ width: i <= activeSubStep ? 16 : 4 }}
                        className={`h-0.5 ${i <= activeSubStep ? 'bg-[#2D4A2D]' : 'bg-border'}`}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Main Content */}
        <div className="absolute top-36 left-8 right-8 bottom-8 grid grid-cols-2 gap-12">
          {/* Left - Text Content */}
          <div className="flex flex-col">
            {/* Tabs */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1 mb-8 w-fit">
              {currentFeature.tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeTab === index
                      ? 'bg-white text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Title & Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-medium text-foreground mb-3">
                  {currentFeature.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-8 max-w-md">
                  {currentFeature.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Sub-steps Accordion */}
            <div className="space-y-0 flex-1">
              {currentFeature.subSteps.map((subStep, index) => (
                <motion.div
                  key={subStep.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-border"
                >
                  <button
                    onClick={() => setActiveSubStep(index)}
                    className="w-full py-4 text-left group"
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-sm text-muted-foreground mt-0.5">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <span className={`text-sm font-medium transition-colors ${
                          activeSubStep === index ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                        }`}>
                          {subStep.title}
                        </span>
                        <AnimatePresence>
                          {activeSubStep === index && (
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-sm text-muted-foreground mt-2 overflow-hidden"
                            >
                              {subStep.desc}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Visual Grid */}
          <div className="relative">
            {/* Dashed grid background */}
            <div 
              className="absolute inset-0 border border-dashed border-border rounded-lg"
              style={{
                backgroundImage: 'linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            
            {/* Floating images based on active feature and substep */}
            <AnimatePresence mode="wait">
              {activeFeature === 0 && (
                <motion.div
                  key="iterate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  {activeSubStep === 0 && (
                    <>
                      <FloatingImage 
                        src="/images/iterate-ui.jpg" 
                        style={{ top: '5%', left: '5%', width: '55%', height: '50%' }}
                        delay={0}
                      />
                      <FloatingImage 
                        src="/images/blog-1.jpg" 
                        style={{ top: '10%', right: '5%', width: '30%', height: '25%' }}
                        delay={0.1}
                      />
                    </>
                  )}
                  {activeSubStep === 1 && (
                    <>
                      <FloatingImage 
                        src="/images/blog-2.jpg" 
                        style={{ top: '15%', left: '10%', width: '35%', height: '30%' }}
                        delay={0}
                      />
                      <FloatingImage 
                        src="/images/blog-3.jpg" 
                        style={{ top: '5%', right: '10%', width: '40%', height: '35%' }}
                        delay={0.1}
                      />
                      <FloatingImage 
                        src="/images/hero-landscape.jpg" 
                        style={{ bottom: '15%', left: '20%', width: '50%', height: '35%' }}
                        delay={0.2}
                      />
                    </>
                  )}
                  {activeSubStep === 2 && (
                    <>
                      <FloatingImage 
                        src="/images/iterate-ui.jpg" 
                        style={{ top: '10%', left: '5%', width: '60%', height: '55%' }}
                        delay={0}
                      />
                      <FloatingImage 
                        src="/images/evaluate-ui.jpg" 
                        style={{ bottom: '10%', right: '5%', width: '45%', height: '40%' }}
                        delay={0.1}
                      />
                    </>
                  )}
                </motion.div>
              )}
              
              {activeFeature === 1 && (
                <motion.div
                  key="evaluate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  {activeSubStep === 0 && (
                    <FloatingImage 
                      src="/images/evaluate-ui.jpg" 
                      style={{ top: '10%', left: '10%', width: '70%', height: '60%' }}
                      delay={0}
                    />
                  )}
                  {activeSubStep === 1 && (
                    <>
                      <FloatingImage 
                        src="/images/evaluate-ui.jpg" 
                        style={{ top: '5%', left: '5%', width: '50%', height: '45%' }}
                        delay={0}
                      />
                      <FloatingImage 
                        src="/images/monitor-ui.jpg" 
                        style={{ bottom: '10%', right: '10%', width: '55%', height: '50%' }}
                        delay={0.1}
                      />
                    </>
                  )}
                  {activeSubStep === 2 && (
                    <FloatingImage 
                      src="/images/deploy-ui.jpg" 
                      style={{ top: '15%', left: '15%', width: '65%', height: '55%' }}
                      delay={0}
                    />
                  )}
                </motion.div>
              )}
              
              {activeFeature === 2 && (
                <motion.div
                  key="deploy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  {activeSubStep === 0 && (
                    <FloatingImage 
                      src="/images/deploy-ui.jpg" 
                      style={{ top: '10%', left: '10%', width: '75%', height: '65%' }}
                      delay={0}
                    />
                  )}
                  {activeSubStep === 1 && (
                    <>
                      <FloatingImage 
                        src="/images/iterate-ui.jpg" 
                        style={{ top: '5%', left: '5%', width: '45%', height: '40%' }}
                        delay={0}
                      />
                      <FloatingImage 
                        src="/images/deploy-ui.jpg" 
                        style={{ bottom: '15%', right: '5%', width: '50%', height: '45%' }}
                        delay={0.1}
                      />
                    </>
                  )}
                  {activeSubStep === 2 && (
                    <FloatingImage 
                      src="/images/monitor-ui.jpg" 
                      style={{ top: '15%', left: '15%', width: '60%', height: '55%' }}
                      delay={0}
                    />
                  )}
                </motion.div>
              )}
              
              {activeFeature === 3 && (
                <motion.div
                  key="monitor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  {activeSubStep === 0 && (
                    <FloatingImage 
                      src="/images/monitor-ui.jpg" 
                      style={{ top: '10%', left: '5%', width: '80%', height: '70%' }}
                      delay={0}
                    />
                  )}
                  {activeSubStep === 1 && (
                    <>
                      <FloatingImage 
                        src="/images/evaluate-ui.jpg" 
                        style={{ top: '5%', left: '10%', width: '50%', height: '45%' }}
                        delay={0}
                      />
                      <FloatingImage 
                        src="/images/monitor-ui.jpg" 
                        style={{ bottom: '10%', right: '10%', width: '55%', height: '50%' }}
                        delay={0.1}
                      />
                    </>
                  )}
                  {activeSubStep === 2 && (
                    <FloatingImage 
                      src="/images/cta-ui.jpg" 
                      style={{ top: '15%', left: '15%', width: '65%', height: '55%' }}
                      delay={0}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
