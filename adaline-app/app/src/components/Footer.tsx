import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const footerLinks = {
  pillars: {
    title: 'PILLARS',
    links: [
      { name: 'Iterate', href: '#' },
      { name: 'Evaluate', href: '#' },
      { name: 'Deploy', href: '#' },
      { name: 'Monitor', href: '#' },
    ],
  },
  products: {
    title: 'PRODUCTS',
    links: [
      { name: 'Editor', href: '#' },
      { name: 'Playground', href: '#' },
      { name: 'Evaluations', href: '#' },
      { name: 'Datasets', href: '#' },
      { name: 'Deployments', href: '#' },
      { name: 'Logs', href: '#' },
      { name: 'Analytics', href: '#' },
      { name: 'Gateway', href: '#' },
    ],
  },
  company: {
    title: 'COMPANY',
    links: [
      { name: 'Labs', href: '#' },
      { name: 'Applied', href: '#' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '#' },
      { name: 'Book a Demo', href: '#' },
      { name: 'Wikipedia', href: '#' },
    ],
  },
  resources: {
    title: 'RESOURCES',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'DPA', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Report vulnerability', href: '#' },
    ],
  },
  connect: {
    title: 'CONNECT',
    links: [
      { name: 'Github', href: '#' },
      { name: 'X (Twitter)', href: '#' },
      { name: 'LinkedIn', href: '#' },
      { name: 'YouTube', href: '#' },
    ],
  },
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Underwater Background Image */}
      <div className="relative h-[500px]">
        <img
          src="/images/footer-underwater.jpg"
          alt="Underwater scene"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f1f] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent h-32" />
        
        {/* Glowing orbs animation */}
        <motion.div
          className="absolute bottom-32 left-1/4 w-8 h-8 bg-white rounded-full blur-sm"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-1/4 w-8 h-8 bg-white rounded-full blur-sm"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      {/* Footer Content */}
      <div className="relative bg-[#0a1f1f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Logo & Copyright */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span className="text-2xl font-medium tracking-tight">Adaline</span>
              </Link>
              <p className="text-sm text-white/60">
                © 2026 Adaline. All rights reserved.
              </p>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
