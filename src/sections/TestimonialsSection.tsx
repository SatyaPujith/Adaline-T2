import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// --- Assets / Logos (SVG placeholders for now, can be replaced with images if provided) ---
const LogoGiift = () => <span className="font-bold text-xl tracking-tight">Giift</span>;
const LogoSerif = () => <span className="font-serif italic font-bold text-2xl">serif</span>;
const LogoReforge = () => <span className="font-bold text-lg flex items-center gap-2"><span className="text-xl">⚡</span> Reforge</span>;
const LogoDiscord = () => <span className="font-bold text-lg flex items-center gap-2"><span>👾</span> Discord</span>;
const LogoCoframe = () => <span className="font-bold text-lg flex items-center gap-2"><span>◆</span> Coframe</span>;
const LogoJericho = () => <span className="font-bold text-lg flex items-center gap-2"><span>🛡️</span> Jericho Security</span>;
const LogoMcKinsey = () => <span className="font-serif font-bold text-lg">McKinsey & Company</span>;



// --- Types ---
type CardContent = {
  type: 'logo' | 'stat' | 'quote';
  content: React.ReactNode;
};

type TestimonialItem = {
  id: string;
  default: CardContent;
  hover: CardContent;
};

// --- Data ---
// --- Data ---
const gridItems: TestimonialItem[] = [
  // Row 1
  {
    id: 'giift',
    default: { type: 'logo', content: <LogoGiift /> },
    hover: { type: 'quote', content: <div className="text-sm">"Adaline helps us iterate faster."</div> }
  },
  {
    id: 'serif',
    default: { type: 'logo', content: <LogoSerif /> },
    hover: { type: 'quote', content: <div className="text-sm">"Integration was seamless."</div> }
  },
  {
    id: '15five-stat',
    default: { type: 'stat', content: <div className="text-center"><div className="text-4xl md:text-5xl font-medium mb-2">75%</div><div className="text-sm text-muted-foreground">Faster iterations</div></div> },
    hover: { type: 'logo', content: <span className="font-bold">15Five</span> }
  },
  {
    id: 'epsilon-quote',
    default: { type: 'quote', content: <div className="text-sm md:text-base leading-relaxed">"Adaline has become a crucial part of our tech stack ... brought our insufficient answer rate down to practically 0%." <br /><br /><span className="text-xs text-muted-foreground font-semibold">Eshan A. - CEO @ Epsilon</span></div> },
    hover: { type: 'logo', content: <LogoJericho /> }
  },

  // Row 2
  {
    id: 'reforge',
    default: { type: 'logo', content: <LogoReforge /> },
    hover: { type: 'quote', content: <div className="text-sm">"A game changer for our product teams."</div> }
  },
  {
    id: 'discord-quote',
    default: { type: 'quote', content: <div className="text-sm md:text-base leading-relaxed">"... Adaline is simply the best platform I've found that bridges the gap between technical & nontechnical LLM development ..." <br /><br /><span className="text-xs text-muted-foreground font-semibold">Ian W. - Senior Staff Engineer @ Discord</span></div> },
    hover: { type: 'logo', content: <LogoDiscord /> }
  },
  {
    id: 'coframe-stat',
    default: { type: 'stat', content: <div className="text-center"><div className="text-4xl md:text-5xl font-medium mb-2">40%</div><div className="text-sm text-muted-foreground">Productivity boost</div></div> },
    hover: { type: 'logo', content: <LogoCoframe /> }
  },
  {
    id: 'lilli-quote',
    default: { type: 'quote', content: <div className="text-sm md:text-base leading-relaxed">"Adaline has become an invaluable tool for my team to develop GenAI products..." <br /><br /><span className="text-xs text-muted-foreground font-semibold">Tan S. - Product Manager for Lilli @ McKinsey & Company</span></div> },
    hover: { type: 'logo', content: <LogoMcKinsey /> }
  },
];

// --- Component ---
// --- Derived Data for Random Actions ---
// --- Derived Data for Random Actions ---
// Initial base options from grid items
const baseOptions = gridItems.map(item => item.hover);

// Additional random options to expand the pool to 20+
const extraOptions: CardContent[] = [
  { type: 'quote', content: <div className="text-sm">"Significantly reduced our time to market."</div> },
  { type: 'stat', content: <div className="text-center"><div className="text-4xl md:text-5xl font-medium mb-2">3x</div><div className="text-sm text-muted-foreground">Faster Deployment</div></div> },
  { type: 'logo', content: <span className="font-bold text-xl">Loom</span> },
  { type: 'quote', content: <div className="text-sm">"The observability features are best in class."</div> },
  { type: 'stat', content: <div className="text-center"><div className="text-4xl md:text-5xl font-medium mb-2">99%</div><div className="text-sm text-muted-foreground">Reliability</div></div> },
  { type: 'logo', content: <span className="font-bold text-xl">Retool</span> },
  { type: 'quote', content: <div className="text-sm">"We can finally trust our LLM outputs."</div> },
  { type: 'logo', content: <span className="font-bold text-xl">Zapier</span> },
  { type: 'stat', content: <div className="text-center"><div className="text-4xl md:text-5xl font-medium mb-2">50%</div><div className="text-sm text-muted-foreground">Cost Reduction</div></div> },
  { type: 'quote', content: <div className="text-sm">"Adaline's prompt management is a lifesaver."</div> },
  { type: 'logo', content: <span className="font-bold text-xl">Vercel</span> },
  { type: 'quote', content: <div className="text-sm">"Seamless integration with our existing stack."</div> },
  { type: 'stat', content: <div className="text-center"><div className="text-4xl md:text-5xl font-medium mb-2">10k+</div><div className="text-sm text-muted-foreground">Prompts Tested</div></div> },
  { type: 'logo', content: <span className="font-bold text-xl">Linear</span> },
  { type: 'quote', content: <div className="text-sm">"The only platform that scales with our needs."</div> },
  { type: 'stat', content: <div className="text-center"><div className="text-4xl md:text-5xl font-medium mb-2">24/7</div><div className="text-sm text-muted-foreground">Real-time Monitoring</div></div> },
  { type: 'logo', content: <span className="font-bold text-xl">Notion</span> },
  { type: 'quote', content: <div className="text-sm">"Evaluation metrics are extremely accurate."</div> },
  { type: 'logo', content: <span className="font-bold text-xl">Scale AI</span> },
  { type: 'stat', content: <div className="text-center"><div className="text-4xl md:text-5xl font-medium mb-2">0</div><div className="text-sm text-muted-foreground">Hallucinations</div></div> },
  { type: 'quote', content: <div className="text-sm">"Customer support is incredibly responsive."</div> },
  { type: 'logo', content: <span className="font-bold text-xl">Hugging Face</span> },
];

const allHoverOptions = [...baseOptions, ...extraOptions];

// --- Component ---
const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
  const [currentContent, setCurrentContent] = useState<CardContent>(item.default);
  const [animationKey, setAnimationKey] = useState(0);

  const handleMouseEnter = () => {
    // Pick a random content from the pool
    const randomIndex = Math.floor(Math.random() * allHoverOptions.length);
    setCurrentContent(allHoverOptions[randomIndex]);
    // Increment key to trigger Framer Motion exit/enter animation
    setAnimationKey(prev => prev + 1);
  };

  return (
    <div
      className="group relative h-64 sm:h-72 border-r border-b border-stone-200 border-dashed bg-[#fdfcf8] overflow-hidden cursor-default transition-colors"
      onMouseEnter={handleMouseEnter}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center p-8 text-[#1c1c1c]"
        >
          {currentContent.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="bg-background pt-24 pb-0 border-t border-stone-200 border-dashed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#1c1c1c] mb-6"
          >
            Powering global brands<br />and fast scaling startups
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-stone-600 max-w-2xl mx-auto leading-relaxed"
          >
            From ambitious startups to global enterprises, Adaline helps<br className="hidden sm:block" /> world-class teams iterate quickly and ship confidently.
          </motion.p>
        </div>
      </div>

      {/* Full Width Grid */}
      <div className="w-full border-t border-stone-200 border-dashed">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-stone-200 border-dashed">
          {gridItems.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom spacer or border if needed */}
      <div className="w-full h-px bg-transparent" />
    </section>
  );
};

export default TestimonialsSection;
