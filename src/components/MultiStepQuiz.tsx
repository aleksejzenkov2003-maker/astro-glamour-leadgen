import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizStep from "./QuizStep";
import LoadingWheel from "./LoadingWheel";
import MysticalDatePicker from "./MysticalDatePicker";
import MysticalTimePicker from "./MysticalTimePicker";
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
      <div className="min-h-screen flex flex-col">
        {/* Astrologer section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md space-y-6 animate-fade-in">
            {/* Photo */}
            <div className="relative group mx-auto max-w-[220px]">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-40 group-hover:opacity-60 blur-2xl transition-opacity duration-500 animate-pulse-mystical" />
              
              <div className="relative rounded-full overflow-hidden border-4 border-accent/50 shadow-[0_0_60px_rgba(255,216,138,0.6)] aspect-square glow-mystical">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gradient-gold glow-gold leading-tight">
                Астролог с 20-летним опытом
              </h1>
              <p className="text-sm sm:text-base text-gradient-mystical font-semibold">
                Провела более 20 000 консультаций
              </p>
            </div>

            {/* Offer */}
            <div className="relative bg-card/40 backdrop-blur-md border-2 border-accent/30 rounded-2xl p-5 glow-mystical overflow-hidden">
              <div className="absolute top-2 left-4 text-accent animate-pulse" style={{animationDelay: "0s"}}>✨</div>
              <div className="absolute top-3 right-6 text-gold animate-pulse" style={{animationDelay: "0.5s"}}>⭐</div>
              <div className="absolute bottom-2 left-8 text-accent animate-pulse" style={{animationDelay: "1s"}}>✨</div>
              
              <p className="text-lg font-bold text-gradient-gold leading-tight text-center relative z-10 glow-gold">
                ⭐ Получите бесплатный астрологический анализ судьбы
              </p>
              <p className="text-sm text-muted-foreground italic text-center mt-2 relative z-10">
                по вашей натальной карте
              </p>
            </div>

            {/* Start button */}
            <Button 
              onClick={handleNext}
              className="relative w-full h-14 text-base font-bold bg-gradient-gold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,216,138,0.6)] hover:shadow-[0_0_50px_rgba(255,216,138,0.9)] overflow-hidden group border-0"
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
          <MysticalDatePicker
            value={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
          />
          
          <Button 
            onClick={handleNext}
            disabled={!formData.date}
            className="w-full h-14 text-base font-semibold bg-gradient-gold hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,216,138,0.6)] hover:shadow-[0_0_50px_rgba(255,216,138,0.9)] border-0"
          >
            Продолжить ✨
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
          <MysticalTimePicker
            value={formData.time}
            onChange={(time) => setFormData({ ...formData, time })}
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
