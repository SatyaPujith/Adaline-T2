import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { FeatureVisuals } from '../components/FeatureVisuals';

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

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeSubStep, setActiveSubStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Auto-advance feature AND sub-step based on scroll (Unified)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      // Total steps = 4 features * 3 substeps = 12 segments
      const totalSegments = 12;
      const currentSegment = Math.min(Math.floor(value * totalSegments), totalSegments - 1);

      const newFeature = Math.floor(currentSegment / 3);
      const newSubStep = currentSegment % 3;

      if (newFeature !== activeFeature || newSubStep !== activeSubStep) {
        setActiveFeature(newFeature);
        setActiveSubStep(newSubStep);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeFeature, activeSubStep]);

  const currentFeature = features[activeFeature];

  return (
    <div ref={containerRef} className="relative bg-white">
      <div style={{ height: '600vh' }}>
        <div className="sticky top-0 h-screen bg-white overflow-hidden relative">

          {/* Header Area */}
          <div className="absolute top-24 sm:top-32 lg:top-24 left-4 right-4 lg:left-12 lg:right-12 flex items-center justify-between z-20 pointer-events-none">

            {/* Desktop Steps (Left) - Hidden on Mobile */}
            <div className="hidden lg:flex items-start gap-4 pointer-events-auto overflow-x-auto no-scrollbar max-w-[70%]">
              {features.map((feature, index) => {
                const isActive = index === activeFeature;
                return (
                  <motion.button
                    key={feature.id}
                    onClick={() => {
                      setActiveFeature(index);
                      setActiveSubStep(0);
                    }}
                    className={`flex items-center gap-3 px-2 py-2 rounded-full transition-all duration-300 flex-shrink-0 group ${isActive
                      ? 'bg-white shadow-sm border border-border/50 min-w-[180px]'
                      : 'bg-transparent hover:bg-muted/30'
                      }`}
                  >
                    {/* Icon */}
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <FeatureIcon index={index} isActive={isActive} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-[9px] font-semibold ${isActive ? 'text-[#2D4A2D]' : 'text-muted-foreground'} bg-transparent px-1`}>
                          {feature.stepNum}
                        </span>
                      </div>
                    </div>
                    {/* Label */}
                    <div className={`flex flex-col items-start ${isActive ? 'min-w-[100px] flex-1 mr-2' : ''}`}>
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className={`text-sm font-medium ${isActive ? 'text-[#1a1a1a]' : 'text-muted-foreground/80'}`}>{feature.name}</span>
                        {isActive && <span className="text-[10px] text-muted-foreground tabular-nums">{activeSubStep + 1}/{feature.subSteps.length}</span>}
                      </div>
                      {isActive && (
                        <div className="flex gap-1 mt-1.5 w-full">
                          {feature.subSteps.map((_, i) => (
                            <div key={i} className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${i <= activeSubStep ? 'bg-[#1a1a1a]' : 'bg-border'}`} />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Header (Left) - Visible on Mobile */}
            <div className="lg:hidden flex items-center gap-3 bg-white/90 backdrop-blur-sm p-1.5 pr-4 rounded-full border border-border shadow-sm pointer-events-auto">
              <div className="relative w-8 h-8 flex-shrink-0">
                <FeatureIcon index={activeFeature} isActive={true} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-semibold text-[#2D4A2D]">{features[activeFeature].stepNum}</span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-bold text-[#1c1c1c]">{features[activeFeature].name}</span>
                <span className="text-[10px] text-muted-foreground">{activeSubStep + 1} / {features[activeFeature].subSteps.length}</span>
              </div>
            </div>

            {/* Tabs (Right) - Hidden on Mobile */}
            <div className="hidden lg:flex pointer-events-auto bg-muted/50 p-1 rounded-lg backdrop-blur-sm">
              {currentFeature.tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${activeTab === index
                    ? 'bg-white text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="absolute top-44 sm:top-52 lg:top-52 left-4 sm:left-4 lg:left-12 right-4 sm:right-4 lg:right-12 bottom-4 sm:bottom-4 lg:bottom-12 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-16 h-auto lg:h-auto inset-y-4 lg:inset-auto">

            {/* Left - Text Content (Bottom on Mobile) */}
            <div className="flex flex-col min-h-0 overflow-hidden pt-2 lg:pt-4 h-[50%] lg:h-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <h2 className="text-lg sm:text-base lg:text-2xl font-medium text-foreground mb-1 sm:mb-2 lg:mb-3 leading-tight px-1">
                    {currentFeature.title}
                  </h2>
                  <p className="text-muted-foreground text-xs sm:text-xs lg:text-sm mb-2 sm:mb-4 lg:mb-6 max-w-md line-clamp-2 sm:line-clamp-3 lg:line-clamp-none px-1">
                    {currentFeature.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="space-y-0 flex-1 overflow-y-auto min-h-0 px-1 custom-scrollbar">
                {currentFeature.subSteps.map((subStep, index) => (
                  <motion.div
                    key={subStep.title}
                    className="border-t border-border"
                  >
                    <button
                      onClick={() => setActiveSubStep(index)}
                      className="w-full py-2 sm:py-2.5 lg:py-3 text-left group"
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <span className={`text-[10px] sm:text-xs lg:text-sm mt-0.5 flex-shrink-0 transition-colors ${activeSubStep === index ? 'text-[#1c1c1c] font-bold' : 'text-muted-foreground'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className={`text-xs sm:text-xs lg:text-sm font-medium transition-colors block leading-tight ${activeSubStep === index ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            {subStep.title}
                          </span>
                          <AnimatePresence>
                            {activeSubStep === index && (
                              <motion.p
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground mt-1 overflow-hidden leading-snug"
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

            {/* Right - Visual (Top on Mobile) */}
            <div className="relative w-full h-[45%] lg:h-full lg:block" style={{ overflow: 'hidden' }}>
              <div className="absolute inset-0 overflow-hidden">
                <FeatureVisuals activeFeature={activeFeature} activeSubStep={activeSubStep} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for Icons to reduce duplication
const FeatureIcon = ({ index, isActive }: { index: number, isActive: boolean }) => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 40 40"
    className={`${isActive ? 'text-[#2D4A2D]' : 'text-muted-foreground group-hover:text-foreground'}`}
    animate={isActive ? { rotate: 360 } : { rotate: 0 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    {index === 0 && <path d="M20,2 L29.51,5.09 L35.39,13.18 L35.39,23.18 L29.51,31.27 L20,34.36 L10.49,31.27 L4.61,23.18 L4.61,13.18 L10.49,5.09 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" transform="translate(0, 2)" />}
    {index === 1 && <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />}
    {index === 2 && <g><circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M20 2 L20 10 M38 20 L30 20 M20 38 L20 30 M2 20 L10 20" stroke="currentColor" strokeWidth="1.5" /></g>}
    {index === 3 && <g><circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" /><circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="1.5" /></g>}
  </motion.svg>
);

export default FeaturesSection;
