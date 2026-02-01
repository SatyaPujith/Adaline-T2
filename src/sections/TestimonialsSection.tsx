import { motion } from 'framer-motion';

interface Testimonial {
  company: string;
  quote?: string;
  author?: string;
  role?: string;
  metric?: string;
  metricLabel?: string;
}

const testimonials: Testimonial[] = [
  {
    company: 'Jericho Security',
    quote: '"Adaline has become a crucial part of our tech stack... brought our insufficient answer rate down to practically 0%."',
    author: 'Eshan A.',
    role: 'CEO @ Epsilon',
  },
  {
    company: '15Five',
    metric: '75%',
    metricLabel: 'Faster iterations',
  },
  {
    company: 'Discord',
    quote: '"... Adaline is simply the best platform I\'ve found that bridges the gap between technical & nontechnical LLM development ..."',
    author: 'Ian W.',
    role: 'Senior Staff Engineer @ Discord',
  },
  {
    company: 'Coframe',
    metric: '40%',
    metricLabel: 'Productivity boost',
  },
  {
    company: 'serif',
  },
  {
    company: 'Jusbrasil',
    quote: '"Adaline has become an invaluable tool for my team to develop GenAI products..."',
    author: 'Tan S.',
    role: 'Product Manager for Lilli @ McKinsey & Company',
  },
  {
    company: 'Daybreak',
    quote: '"Before Adaline, iterating and evaluating prompts was a nightmare ... Adaline totally changes the game here."',
    author: 'Josh P.',
    role: 'CEO @ Coframe',
  },
  {
    company: 'Reforge',
  },
];

const companyLogos: Record<string, React.ReactNode> = {
  'Jericho Security': <span className="font-semibold">Jericho Security</span>,
  '15Five': <span className="font-semibold">15Five</span>,
  'Discord': <span className="font-semibold">Discord</span>,
  'Coframe': <span className="font-semibold">Coframe</span>,
  'serif': <span className="font-bold italic text-xl">serif</span>,
  'Jusbrasil': <span className="font-semibold">Jusbrasil</span>,
  'Daybreak': <span className="font-semibold">Daybreak</span>,
  'Reforge': <span className="font-semibold">Reforge</span>,
};

const TestimonialsSection = () => {
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
            Powering global brands and fast scaling startups
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            From ambitious startups to global enterprises, Adaline helps world-class teams iterate quickly and ship confidently.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className={`bg-white border border-border rounded-xl p-4 sm:p-6 ${
                testimonial.quote ? 'sm:col-span-2 lg:row-span-2' : ''
              } ${testimonial.metric ? 'flex flex-col justify-center items-center text-center' : ''}`}
            >
              {/* Company Logo */}
              <div className="mb-4 text-muted-foreground">
                {companyLogos[testimonial.company]}
              </div>

              {/* Quote */}
              {testimonial.quote && (
                <>
                  <p className="text-foreground mb-4 text-sm leading-relaxed">
                    {testimonial.quote}
                  </p>
                  {testimonial.author && (
                    <p className="text-xs text-muted-foreground">
                      {testimonial.author}
                      {testimonial.role && ` - ${testimonial.role}`}
                    </p>
                  )}
                </>
              )}

              {/* Metric */}
              {testimonial.metric && (
                <>
                  <div className="text-4xl font-medium text-foreground mb-2">
                    {testimonial.metric}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.metricLabel}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
