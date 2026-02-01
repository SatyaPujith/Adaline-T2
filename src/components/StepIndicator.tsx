import { motion } from 'framer-motion';

interface Step {
  number: string;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  activeStep: number;
  onStepChange: (step: number) => void;
}

const StepIndicator = ({ steps, activeStep, onStepChange }: StepIndicatorProps) => {
  return (
    <div className="flex items-center space-x-6">
      {steps.map((step, index) => (
        <button
          key={step.number}
          onClick={() => onStepChange(index)}
          className="flex items-center space-x-3 group"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              index === activeStep
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground group-hover:bg-muted/80'
            }`}
          >
            {step.number}
          </div>
          <div className="text-left">
            <p
              className={`text-xs font-medium transition-colors ${
                index === activeStep ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </p>
            {index === activeStep && (
              <motion.div
                layoutId="activeIndicator"
                className="h-0.5 bg-primary mt-1"
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default StepIndicator;
