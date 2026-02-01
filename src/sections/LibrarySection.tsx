import { motion } from 'framer-motion';


interface Article {
  title: string;
  description?: string;
  image?: string;
  category: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    title: 'Adaline is now generally available. Giving $1MM in API credits.',
    description: 'After nearly a year of building with some incredible customers and over 100K developers, Adaline is now open to everyone for iteration, evaluation, deployment, and monitor with even more coming soon.',
    image: '/images/blog-1.jpg', // Placeholder
    category: 'PRODUCT',
    featured: true,
  },
  {
    title: 'Reforge Reduces AI Deployment from 1 Month to 1 Week Using Adaline',
    image: '/images/iterate-ui.jpg',
    category: 'CASE STUDIES',
  },
  {
    title: 'LLM as Judges: Advances in Fine-tuning Models for AI Evaluation',
    image: '/images/blog-2.jpg',
    category: 'RESEARCH',
  },
  {
    title: 'What is the ARC AGI Benchmark and its significance in evaluating LLM capabilities in 2025',
    image: '/images/blog-3.jpg',
    category: 'RESEARCH',
  },
  {
    title: 'Understanding Prompt Injection Attacks and How to Mitigate Them',
    image: '/images/evaluate-ui.jpg',
    category: 'TIPS',
  },
];

const LibrarySection = () => {
  const featuredArticle = articles.find((a) => a.featured);
  const otherArticles = articles.filter((a) => !a.featured);

  return (
    <section className="bg-background pt-24 pb-24 border-t border-stone-200 border-dashed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 items-end">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#1c1c1c]"
          >
            Library
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-stone-600 text-sm md:text-base leading-relaxed md:max-w-md ml-auto"
          >
            Find the knowledge to refine your AI-powered applications and unlock new possibilities across case studies, applied research, cookbooks, expert insights, practical guides, and more.
          </motion.p>
        </div>

        {/* Articles Grid Layout */}
        <div className="border border-stone-200 border-dashed">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-200 divide-dashed">

            {/* LEFT: Featured Article (Full Height) */}
            {featuredArticle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative p-6 sm:p-8 hover:bg-[#fbfbf9] transition-colors"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 mb-8 border border-stone-100">
                  {featuredArticle.image ? (
                    <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-stone-200" />
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-xs font-semibold tracking-wider text-stone-500 uppercase">{featuredArticle.category}</div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#1c1c1c] leading-tight group-hover:underline decoration-1 underline-offset-4">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed text-sm mt-2">
                    {featuredArticle.description}
                  </p>
                </div>
              </motion.div>
            )}


            {/* RIGHT: Grid 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-stone-200 divide-dashed">
              {otherArticles.map((article, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group block p-6 hover:bg-[#fbfbf9] transition-colors border-b sm:border-b-0 border-stone-200 border-dashed last:border-b-0 sm:[&:nth-child(2n)]:border-b-0 sm:[&:nth-child(3)]:border-t sm:[&:nth-child(4)]:border-t"
                >
                  <div className="aspect-video overflow-hidden bg-stone-100 mb-4 border border-stone-100">
                    {article.image ? (
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-stone-200" />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="text-[10px] font-semibold tracking-wider text-stone-500 uppercase">{article.category}</div>
                    <h3 className="text-sm font-medium text-[#1c1c1c] leading-snug group-hover:underline decoration-1 underline-offset-2">
                      {article.title}
                    </h3>
                  </div>
                </motion.a>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default LibrarySection;
