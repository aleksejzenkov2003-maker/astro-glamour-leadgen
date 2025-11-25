import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizStep from "./QuizStep";
import LoadingWheel from "./LoadingWheel";
import astrologerImage from "@/assets/astrologer.jpg";

interface MultiStepQuizProps {
  onSubmit: (data: { date: string; city: string; time: string }) => void;
}

const MultiStepQuiz = ({ onSubmit }: MultiStepQuizProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    city: "",
    time: "",
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
    }
  };

  const handleLoadingComplete = () => {
    onSubmit(formData);
  };

  if (isLoading) {
    return <LoadingWheel onComplete={handleLoadingComplete} />;
  }

  // Step 1: Date
  if (currentStep === 1) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Progress bar */}
        <div className="w-full h-1 bg-muted/30">
          <div 
            className="h-full bg-gradient-gold transition-all duration-500 ease-out shadow-[0_0_15px_hsl(var(--gold))]"
            style={{ width: `${(2/14) * 100}%` }}
          />
        </div>

        {/* Step indicator */}
        <div className="text-right px-4 py-3">
          <span className="text-sm text-muted-foreground font-medium">
            2/14
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-4 pb-8 overflow-hidden">
          <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in flex flex-col h-full">
            {/* Photo */}
            <div className="relative group mx-auto max-w-[180px] flex-shrink-0 mt-4">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-40 group-hover:opacity-60 blur-2xl transition-opacity duration-500 animate-pulse-mystical" />
              
              <div className="relative rounded-full overflow-hidden border-4 border-accent/50 shadow-[0_0_60px_rgba(255,216,138,0.6)] aspect-square glow-mystical">
                <img src={astrologerImage} alt="Астролог" className="w-full h-full object-cover" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-1 -right-1 text-xl animate-float">⭐</div>
              <div className="absolute -bottom-1 -left-1 text-lg animate-float" style={{animationDelay: "0.5s"}}>✨</div>
            </div>

            {/* Astrologer info */}
            <div className="text-center space-y-1 flex-shrink-0">
              <h1 className="text-lg sm:text-xl font-bold text-gradient-gold glow-gold leading-tight">
                Астролог с 20-летним опытом
              </h1>
              <p className="text-xs sm:text-sm text-gradient-mystical font-semibold">
                Провела более 20 000 консультаций
              </p>
            </div>

            {/* Title */}
            <div className="text-center space-y-2 flex-shrink-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gradient-gold glow-gold">
                Когда вы родились?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed px-4">
                Дата рождения важна для составления точной натальной карты
              </p>
            </div>

            {/* Date picker */}
            <div className="space-y-4">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full h-16 px-4 text-lg bg-card backdrop-blur-md border-2 border-primary/40 rounded-2xl text-gold font-semibold focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all duration-300 glow-mystical [color-scheme:dark]"
                required
              />
            </div>
            
            {/* Button */}
            <div className="flex-shrink-0">
              <Button 
                onClick={handleNext}
                disabled={!formData.date}
                className="w-full h-14 text-base font-semibold bg-gradient-gold hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,216,138,0.6)] hover:shadow-[0_0_50px_rgba(255,216,138,0.9)] border-0"
              >
                Продолжить ✨
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: City
  if (currentStep === 2) {
    return (
      <QuizStep 
        title="Где вы родились?"
        subtitle="Место рождения определяет расположение домов в вашей карте"
        step={3}
        totalSteps={14}
      >
        <div className="space-y-6">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold z-10" />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full h-14 pl-12 pr-4 text-base bg-card/60 border-2 border-primary/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all duration-300 backdrop-blur-sm glow-mystical"
              placeholder="Введите город"
              required
            />
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={!formData.city}
            className="w-full h-14 text-base font-semibold bg-gradient-gold hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,216,138,0.6)] hover:shadow-[0_0_50px_rgba(255,216,138,0.9)] border-0"
          >
            Продолжить ✨
          </Button>
        </div>
      </QuizStep>
    );
  }

  // Step 3: Time
  if (currentStep === 3) {
    return (
      <QuizStep 
        title="Во сколько вы родились?"
        subtitle="Точное время рождения позволит определить ваш асцендент"
        step={4}
        totalSteps={14}
      >
        <div className="space-y-6">
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full h-16 px-4 text-lg bg-card backdrop-blur-md border-2 border-primary/40 rounded-2xl text-gold font-semibold focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all duration-300 glow-mystical [color-scheme:dark]"
            required
          />
          
          <Button
            onClick={handleNext}
            disabled={!formData.time}
            className="w-full h-14 text-base font-semibold bg-gradient-gold hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,216,138,0.6)] hover:shadow-[0_0_50px_rgba(255,216,138,0.9)] border-0 relative overflow-hidden group"
          >
            <span className="relative z-10">Получить анализ ✨</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Button>
        </div>
      </QuizStep>
    );
  }

  return null;
};

export default MultiStepQuiz;
