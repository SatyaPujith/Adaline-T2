import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Article {
  title: string;
  image: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    title: 'Adaline is now generally available. Giving $1MM in API credits.',
    image: '/images/blog-1.jpg',
    category: 'PRODUCT',
    readTime: '15 min read',
    featured: true,
  },
  {
    title: 'Reforge Reduces AI Deployment from 1 Month to 1 Week Using Adaline',
    image: '/images/iterate-ui.jpg',
    category: 'CASE STUDIES',
    readTime: '10 min read',
  },
  {
    title: 'LLM as Judges: Advances in Fine-tuning Models for AI Evaluation',
    image: '/images/blog-2.jpg',
    category: 'RESEARCH',
    readTime: '15 min read',
  },
  {
    title: 'What is the ARC AGI Benchmark and its significance in evaluating LLM capabilities in 2025',
    image: '/images/blog-3.jpg',
    category: 'RESEARCH',
    readTime: '12 min read',
  },
  {
    title: 'Understanding Prompt Injection Attacks and How to Mitigate Them',
    image: '/images/evaluate-ui.jpg',
    category: 'TIPS',
    readTime: '8 min read',
  },
];

const LibrarySection = () => {
  const featuredArticle = articles.find((a) => a.featured);
  const otherArticles = articles.filter((a) => !a.featured);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground mb-4"
            >
              Library
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-muted-foreground max-w-xl"
            >
              Find the knowledge to refine your AI-powered applications and unlock new possibilities across case studies, applied research, cookbooks, expert insights, practical guides, and more.
            </motion.p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Article */}
          {featuredArticle && (
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group block bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f0';
                  }}
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {featuredArticle.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {featuredArticle.readTime}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h3>
              </div>
            </motion.a>
          )}

          {/* Other Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherArticles.slice(0, 4).map((article, index) => (
              <motion.a
                key={article.title}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group block bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">
                      {article.readTime}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LibrarySection;
