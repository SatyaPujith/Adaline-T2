import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Feature {
  id: number;
  title: string;
  description?: string;
}

interface FeatureSectionProps {
  stepNumber: string;
  stepLabel: string;
  title: string;
  description: string;
  features: Feature[];
  image: string;
  imageAlt: string;
  tabs?: string[];
}

const FeatureSection = ({
  stepNumber,
  stepLabel,
  title,
  description,
  features,
  image,
  imageAlt,
  tabs = ['Learn more', 'EDITOR', 'PLAYGROUND'],
}: FeatureSectionProps) => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
              <span className="text-sm font-medium">{stepNumber}</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {stepLabel}
              </p>
              <div className="flex space-x-1 mt-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-6 h-0.5 ${
                      i <= parseInt(stepNumber) ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="hidden md:flex items-center space-x-1 bg-muted rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeTab === tab
                    ? 'bg-white text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Text Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground mb-4"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-muted-foreground mb-8"
            >
              {description}
            </motion.p>

            {/* Features Accordion */}
            <div className="space-y-0">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="border-t border-border last:border-b"
                >
                  <button
                    onClick={() =>
                      setExpandedFeature(
                        expandedFeature === feature.id ? null : feature.id
                      )
                    }
                    className="w-full py-4 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-medium transition-colors ${
                          expandedFeature === feature.id
                            ? 'text-foreground'
                            : 'text-muted-foreground group-hover:text-foreground'
                        }`}
                      >
                        {feature.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        expandedFeature === feature.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedFeature === feature.id && feature.description && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 pl-10 text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden border border-border shadow-lg">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-auto"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
