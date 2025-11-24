import { useState } from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import astrologerImage from "@/assets/astrologer.jpg";
import TrustBadges from "./TrustBadges";

interface HeroSectionProps {
  onDateSubmit: (date: string) => void;
}

const HeroSection = ({ onDateSubmit }: HeroSectionProps) => {
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) {
      onDateSubmit(birthDate);
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-center">
          {/* Trust badges - left side */}
          <div className="hidden lg:block animate-fade-in">
            <TrustBadges />
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text and form */}
            <div className="text-center lg:text-left space-y-8 animate-fade-in">
              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold glow-gold leading-tight">
                  Астролог с 20-летним опытом
                </h1>
                <p className="text-xl md:text-2xl text-gradient-mystical font-semibold">
                  Провела более 20 000 консультаций
                </p>
              </div>

              {/* Main offer */}
              <div className="space-y-4 p-6 bg-card/20 backdrop-blur-md border-2 border-accent/30 rounded-2xl glow-mystical">
                <div className="space-y-2">
                  <p className="text-2xl md:text-3xl font-bold text-gradient-gold leading-tight">
                    ⭐ Только сегодня получите бесплатный астрологический анализ судьбы
                  </p>
                  <p className="text-lg text-muted-foreground italic">
                    — по дате вашего рождения —
                  </p>
                </div>

                {/* Date input form */}
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary z-10" />
                    <Input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="h-14 pl-12 text-lg border-2 border-primary/50 bg-background/80 focus:border-secondary focus:ring-2 focus:ring-secondary/50 glow-mystical transition-all duration-300"
                      placeholder="Введите дату рождения"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full h-14 text-lg font-bold bg-gradient-gold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,216,138,0.5)] hover:shadow-[0_0_30px_rgba(255,216,138,0.8)]"
                  >
                    Получить анализ
                  </Button>

                  {/* Arrow indicator */}
                  <div className="flex justify-center pt-2 animate-bounce">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Astrologer photo */}
            <div className="flex justify-center lg:justify-end animate-fade-in">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-500 animate-pulse-glow" />
                
                {/* Photo */}
                <div className="relative rounded-full overflow-hidden border-4 border-accent/50 shadow-[0_0_60px_rgba(255,216,138,0.4)] w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  <img
                    src={astrologerImage}
                    alt="Астролог"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 text-6xl animate-float">⭐</div>
                <div className="absolute -bottom-4 -left-4 text-5xl animate-float" style={{ animationDelay: "0.5s" }}>✨</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile trust badges */}
        <div className="lg:hidden mt-12 animate-fade-in">
          <TrustBadges />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
