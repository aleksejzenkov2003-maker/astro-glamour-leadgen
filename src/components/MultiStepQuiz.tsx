import { useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizStep from "./QuizStep";
import LoadingWheel from "./LoadingWheel";
import astrologerImage from "@/assets/astrologer.jpg";

interface MultiStepQuizProps {
  onSubmit: (data: { date: string; city: string; time: string }) => void;
}

const MultiStepQuiz = ({ onSubmit }: MultiStepQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
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

  // Welcome screen
  if (currentStep === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[hsl(var(--mystical-dark))] to-[hsl(var(--background))]">
        {/* Astrologer section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md space-y-6 animate-fade-in">
            {/* Photo */}
            <div className="relative group mx-auto max-w-[220px]">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-40 group-hover:opacity-60 blur-2xl transition-opacity duration-500 animate-pulse-mystical" />
              
              <div className="relative rounded-full overflow-hidden border-4 border-primary/50 shadow-[0_0_60px_rgba(96,215,203,0.5)] aspect-square glow-mystical">
                <img src={astrologerImage} alt="Астролог" className="w-full h-full object-cover" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 text-2xl animate-float">⭐</div>
              <div className="absolute -bottom-2 -left-2 text-xl animate-float" style={{animationDelay: "0.5s"}}>✨</div>
              <div className="absolute top-1/4 -left-3 text-lg animate-float" style={{animationDelay: "1s"}}>🌙</div>
              <div className="absolute bottom-1/4 -right-3 text-xl animate-float" style={{animationDelay: "1.5s"}}>🔮</div>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gradient-teal glow-teal leading-tight">
                Астролог с 20-летним опытом
              </h1>
              <p className="text-sm sm:text-base text-gradient-mystical font-semibold">
                Провела более 20 000 консультаций
              </p>
            </div>

            {/* Offer */}
            <div className="relative bg-card/40 backdrop-blur-md border-2 border-primary/30 rounded-2xl p-5 glow-mystical overflow-hidden">
              <div className="absolute top-2 left-4 text-primary animate-pulse" style={{animationDelay: "0s"}}>✨</div>
              <div className="absolute top-3 right-6 text-secondary animate-pulse" style={{animationDelay: "0.5s"}}>⭐</div>
              <div className="absolute bottom-2 left-8 text-accent animate-pulse" style={{animationDelay: "1s"}}>✨</div>
              
              <p className="text-lg font-bold text-gradient-teal leading-tight text-center relative z-10">
                ⭐ Получите бесплатный астрологический анализ судьбы
              </p>
              <p className="text-sm text-muted-foreground italic text-center mt-2 relative z-10">
                по вашей натальной карте
              </p>
            </div>

            {/* Start button */}
            <Button 
              onClick={handleNext}
              className="relative w-full h-14 text-base font-bold bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(96,215,203,0.6)] hover:shadow-[0_0_50px_rgba(96,215,203,0.9)] overflow-hidden group border-0"
            >
              <span className="relative z-10">Начать ✨</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Date
  if (currentStep === 1) {
    return (
      <QuizStep 
        title="Когда вы родились?"
        subtitle="Дата рождения важна для составления точной натальной карты"
        step={2}
        totalSteps={14}
      >
        <div className="space-y-6">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full h-14 px-4 text-base bg-card/60 border-2 border-primary/40 rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 backdrop-blur-sm"
            required
          />
          
          <Button 
            onClick={handleNext}
            disabled={!formData.date}
            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 shadow-[0_0_25px_rgba(96,215,203,0.5)] border-0"
          >
            Продолжить
          </Button>
        </div>
      </QuizStep>
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
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary z-10" />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full h-14 pl-12 pr-4 text-base bg-card/60 border-2 border-primary/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 backdrop-blur-sm"
              placeholder="Введите город"
              required
            />
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={!formData.city}
            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 shadow-[0_0_25px_rgba(96,215,203,0.5)] border-0"
          >
            Продолжить
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
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary z-10" />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full h-14 pl-12 pr-4 text-base bg-card/60 border-2 border-primary/40 rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 backdrop-blur-sm"
              required
            />
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={!formData.time}
            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 shadow-[0_0_25px_rgba(96,215,203,0.5)] border-0"
          >
            Получить анализ ✨
          </Button>
        </div>
      </QuizStep>
    );
  }

  return null;
};

export default MultiStepQuiz;
