import { ReactNode } from "react";

interface QuizStepProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  step: number;
  totalSteps: number;
}

const QuizStep = ({ children, title, subtitle, step, totalSteps }: QuizStepProps) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[hsl(var(--mystical-dark))] to-[hsl(var(--background))]">
      {/* Progress bar */}
      <div className="w-full h-1 bg-muted/30">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicator */}
      <div className="text-right px-4 py-3">
        <span className="text-sm text-muted-foreground font-medium">
          {step}/{totalSteps}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Title */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-teal glow-teal">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-4">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form content */}
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStep;
