import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
  description: string;
}

const stats: Stat[] = [
  { value: '200', label: 'M+', suffix: 'M+', description: 'API calls per day' },
  { value: '5', label: 'B+', suffix: 'B+', description: 'Tokens per day' },
  { value: '300', label: '+', suffix: '+', description: 'Number of AI models' },
  { value: '99.978', label: '%', suffix: '%', description: 'Historical uptime' },
];

const AnimatedNumber = ({ value, suffix }: { value: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (value.includes('.')) {
      return latest.toFixed(3);
    }
    return Math.round(latest).toString();
  });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(value);
      const controls = animate(count, numericValue, {
        duration: 2,
        ease: [0.4, 0, 0.2, 1],
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground mb-4"
          >
            Precisely engineered for unparalleled reliability
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Adaline powers the workflows of world-class product and engineering teams with unmatched performance and reliability.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.description}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative px-4"
        >
          <img
            src="/images/architecture-diagram.jpg"
            alt="Technical architecture diagram"
            className="w-full max-w-3xl mx-auto rounded-lg"
            onError={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f0';
            }}
          />
        </motion.div>

        {/* Bottom Stats */}
        <div className="grid sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
          {[
            { label: 'Speed', desc: 'Move fast without compromise' },
            { label: 'Security', desc: 'Protection at every step' },
            { label: 'Scale', desc: 'A platform that grows with you' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="font-medium text-foreground mb-2">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
