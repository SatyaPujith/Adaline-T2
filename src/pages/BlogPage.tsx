import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Article {
  title: string;
  image: string;
  category: string;
  readTime: string;
  excerpt?: string;
}

const categories = ['All', 'Case Studies', 'Product', 'Research', 'Tips'];

const articles: Article[] = [
  {
    title: 'Adaline is now generally available. Giving $1MM in API credits.',
    image: '/images/blog-1.jpg',
    category: 'Product',
    readTime: '15 min read',
    excerpt: 'After nearly a year of building with some incredible customers and over 100K developers, Adaline is now open to everyone for iteration, evaluation, deployment, and monitor with even more coming soon.',
  },
  {
    title: '"Humanity\'s Last Exam" Pushes GPT-4-Level AI Beyond MMLU',
    image: '/images/blog-2.jpg',
    category: 'Research',
    readTime: '15 min read',
  },
  {
    title: 'What is Self-Consistency Prompting?',
    image: '/images/blog-3.jpg',
    category: 'Tips',
    readTime: '15 min read',
  },
  {
    title: 'What is Few-shot Prompting?',
    image: '/images/iterate-ui.jpg',
    category: 'Tips',
    readTime: '8 min read',
  },
  {
    title: 'What is Zero-Shot Prompting?',
    image: '/images/evaluate-ui.jpg',
    category: 'Tips',
    readTime: '7 min read',
  },
  {
    title: 'LLM Evals Product Leaders Should Know in 2025',
    image: '/images/deploy-ui.jpg',
    category: 'Research',
    readTime: '15 min read',
  },
  {
    title: 'What is Scaling RL in LLMs in train-time?',
    image: '/images/monitor-ui.jpg',
    category: 'Research',
    readTime: '15 min read',
  },
  {
    title: 'What is Test-time Scaling?',
    image: '/images/cta-ui.jpg',
    category: 'Research',
    readTime: '15 min read',
  },
  {
    title: 'Understanding LLM APIs',
    image: '/images/architecture-diagram.jpg',
    category: 'Tips',
    readTime: '10 min read',
  },
  {
    title: 'LLM as Judges: Advances in Fine-tuning Models for AI Evaluation',
    image: '/images/hero-landscape.jpg',
    category: 'Research',
    readTime: '15 min read',
  },
  {
    title: 'How Prompts Are Processed in LLMs and How LLMs Reason Using Prompts',
    image: '/images/blog-1.jpg',
    category: 'Research',
    readTime: '12 min read',
  },
  {
    title: 'What is Meta-Prompting?',
    image: '/images/blog-2.jpg',
    category: 'Tips',
    readTime: '10 min read',
  },
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredArticles =
    activeCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Featured Article */}
        <div className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group block bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="grid lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                      {articles[0].category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {articles[0].readTime}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground mb-4 group-hover:text-primary transition-colors">
                    {articles[0].title}
                  </h1>
                  {articles[0].excerpt && (
                    <p className="text-muted-foreground mb-6">
                      {articles[0].excerpt}
                    </p>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Posted June 17, 2025</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.a>
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setVisibleCount(9);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-muted-foreground hover:text-foreground border border-border'
                  }`}
                >
                  {category}
                  {category !== 'All' && (
                    <span className="ml-1 text-xs opacity-70">
                      {articles.filter((a) => a.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleArticles.slice(1).map((article, index) => (
                <motion.a
                  key={article.title}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
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
                      <span className="text-xs text-muted-foreground">
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-end mt-3">
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount(visibleCount + 6)}
                  className="px-6 py-3 text-sm font-medium text-foreground bg-white border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
