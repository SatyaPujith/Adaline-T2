import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface PricingTier {
  name: string;
  description: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  cta: string;
  ctaAction?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    description: 'Begin with the essentials',
    price: '$0',
    period: 'per seat/month',
    features: [
      'Up to 2 seats',
      '10,000 Deployments reads/mo',
      '10,000 Logs writes/mo',
      '1,000 Continuous Evaluations runs/mo',
    ],
    cta: 'GET STARTED',
  },
  {
    name: 'Grow',
    description: 'Unlock advanced capabilities',
    price: '$19',
    period: 'per seat/month',
    popular: true,
    features: [
      'Pair Prompting',
      'Custom Providers',
      'Up to 10 seats',
      '100,000 Deployments reads/mo',
      '100,000 Logs writes/mo',
      '10,000 Continuous Evaluations runs/mo',
    ],
    cta: 'GET STARTED',
  },
  {
    name: 'Scale',
    description: 'Tailored solutions for enterprises',
    price: 'Custom',
    period: 'pricing',
    features: [
      'Pair Prompting',
      'Custom Providers',
      'Dedicated Deployed Engineer',
      'SSO + SAML',
      'SOC 2 + HIPAA',
      'On-prem deployment',
    ],
    cta: 'CONTACT US',
    ctaAction: 'contact',
  },
];

const featureCategories = [
  {
    name: 'Workspace',
    features: [
      { name: 'Seats', free: 'Up to 2', grow: 'Up to 10', scale: 'Custom' },
      { name: 'Workspaces', free: 'Up to 2', grow: 'Up to 10', scale: 'Custom' },
      { name: 'Projects / Workspace', free: 'Up to 5', grow: 'Up to 25', scale: 'Custom' },
    ],
  },
  {
    name: 'Iterate',
    features: [
      { name: 'Teamsync', free: 'Shared & Private', grow: 'Shared & Private', scale: 'Custom' },
      { name: 'Collaborative Evaluations', free: '✓', grow: '✓', scale: '✓' },
      { name: 'Prompt Management', free: '✓', grow: '✓', scale: '✓' },
      { name: 'Automatic Version History', free: '✓', grow: '✓', scale: '✓' },
      { name: 'Multi-modal Playground', free: '✓', grow: '✓', scale: '✓' },
    ],
  },
  {
    name: 'Evaluate',
    features: [
      { name: 'Evaluators / Prompt', free: 'Up to 3', grow: 'Up to 10', scale: 'Custom' },
      { name: 'LLM-as-judge Evaluations', free: '1,000 evals/mo', grow: '10,000 evals/mo', scale: 'Custom' },
      { name: 'Multi-script Evaluations', free: '✓', grow: '✓', scale: '✓' },
      { name: 'Custom Evaluators', free: 'Up to 5', grow: 'Up to 25', scale: 'Custom' },
    ],
  },
  {
    name: 'Deploy',
    features: [
      { name: 'Environments / Project', free: 'Up to 1', grow: 'Up to 3', scale: 'Custom' },
      { name: 'Deployments / Prompt', free: '10,000 evals/mo', grow: '100,000 evals/mo', scale: 'Custom' },
      { name: 'Custom Edge Nodes', free: '—', grow: '✓', scale: '✓' },
    ],
  },
  {
    name: 'Monitor',
    features: [
      { name: 'Logs', free: '1,000 logs/min', grow: '10,000 logs/min', scale: 'Custom' },
      { name: 'Multi-modal Traces & Spans', free: '✓', grow: '✓', scale: '✓' },
      { name: 'Analytics', free: '✓', grow: '✓', scale: '✓' },
      { name: 'Alerts', free: 'Standard', grow: 'Standard', scale: 'Custom' },
    ],
  },
  {
    name: 'Support',
    features: [
      { name: 'Community', free: '✓', grow: '✓', scale: '✓' },
      { name: 'Email', free: '✓', grow: '✓', scale: '✓' },
      { name: 'Chat', free: '—', grow: '✓', scale: '✓' },
      { name: 'Dedicated Slack/Teams channel', free: '—', grow: 'Add-on', scale: '✓' },
    ],
  },
];

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground mb-4"
            >
              The end-to-end platform that world class teams use to build AI applications
            </motion.h1>
            
            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center space-x-4 mt-8"
            >
              <button
                onClick={() => setBillingCycle('annually')}
                className={`text-sm ${billingCycle === 'annually' ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Annually
              </button>
              <div className="relative w-12 h-6 bg-muted rounded-full">
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    billingCycle === 'monthly' ? 'left-1' : 'left-7'
                  }`}
                />
              </div>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`text-sm ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Monthly
              </button>
            </motion.div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="px-4 sm:px-6 lg:px-8 mb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative bg-white border rounded-xl p-6 ${
                    tier.popular ? 'border-primary shadow-lg' : 'border-border'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-6 px-3 py-1 text-xs font-medium text-white bg-primary rounded-full">
                      Popular
                    </span>
                  )}
                  
                  <h3 className="text-lg font-medium text-foreground mb-1">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-medium text-foreground">{tier.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">{tier.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-3 text-sm font-medium rounded-lg transition-colors ${
                      tier.popular
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-medium text-foreground mb-8">Compare plans</h2>
            
            <div className="bg-white border border-border rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-muted border-b border-border">
                <div className="text-sm font-medium text-muted-foreground">Features</div>
                <div className="text-sm font-medium text-center text-muted-foreground">Free</div>
                <div className="text-sm font-medium text-center text-muted-foreground">Grow</div>
                <div className="text-sm font-medium text-center text-muted-foreground">Scale</div>
              </div>
              
              {/* Table Body */}
              {featureCategories.map((category) => (
                <div key={category.name}>
                  {/* Category Header */}
                  <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 border-b border-border">
                    <div className="text-sm font-medium text-foreground">{category.name}</div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  
                  {/* Features */}
                  {category.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="grid grid-cols-4 gap-4 p-4 border-b border-border last:border-b-0"
                    >
                      <div className="text-sm text-muted-foreground">{feature.name}</div>
                      <div className="text-sm text-center text-muted-foreground">
                        {feature.free === '✓' ? (
                          <Check className="w-4 h-4 text-primary mx-auto" />
                        ) : feature.free === '—' ? (
                          <Minus className="w-4 h-4 text-muted-foreground/50 mx-auto" />
                        ) : (
                          feature.free
                        )}
                      </div>
                      <div className="text-sm text-center text-muted-foreground">
                        {feature.grow === '✓' ? (
                          <Check className="w-4 h-4 text-primary mx-auto" />
                        ) : feature.grow === '—' ? (
                          <Minus className="w-4 h-4 text-muted-foreground/50 mx-auto" />
                        ) : (
                          feature.grow
                        )}
                      </div>
                      <div className="text-sm text-center text-muted-foreground">
                        {feature.scale === '✓' ? (
                          <Check className="w-4 h-4 text-primary mx-auto" />
                        ) : feature.scale === '—' ? (
                          <Minus className="w-4 h-4 text-muted-foreground/50 mx-auto" />
                        ) : (
                          feature.scale
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
