import { useState } from "react";
import { Calendar, User, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import astrologerImage from "@/assets/astrologer.jpg";

interface MobileHeroProps {
  onSubmit: (data: { date: string; name: string; phone: string }) => void;
}

const MobileHero = ({ onSubmit }: MobileHeroProps) => {
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Image Section */}
      <div className="relative flex-shrink-0">
        {/* Title overlay on image */}
        <div className="absolute top-8 left-0 right-0 z-10 px-6 space-y-3">
          <h1 className="text-3xl font-bold text-foreground text-center leading-tight">
            Астролог с 20-летним опытом
          </h1>
          <p className="text-lg text-gradient-mystical font-semibold text-center">
            Провела более 20 000 консультаций
          </p>
        </div>

        {/* Astrologer photo with glow */}
        <div className="relative pt-32 pb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          <div className="relative px-6">
            <div className="relative group mx-auto max-w-sm">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-500 animate-pulse-glow" />
              
              {/* Photo */}
              <div className="relative rounded-full overflow-hidden border-4 border-accent/50 shadow-[0_0_60px_rgba(255,216,138,0.4)] aspect-square">
                <img
                  src={astrologerImage}
                  alt="Астролог"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 text-5xl animate-float">⭐</div>
              <div className="absolute -bottom-2 -left-2 text-4xl animate-float" style={{ animationDelay: "0.5s" }}>✨</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 px-6 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Main offer */}
          <div className="bg-card/20 backdrop-blur-md border-2 border-accent/30 rounded-2xl p-6 glow-mystical">
            <p className="text-xl font-bold text-gradient-gold leading-tight text-center">
              ⭐ Только сегодня получите бесплатный астрологический анализ судьбы
            </p>
            <p className="text-base text-muted-foreground italic text-center mt-2">
              — по дате вашего рождения —
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date */}
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary z-10" />
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="h-14 pl-12 text-base border-2 border-primary/50 bg-background/80 focus:border-secondary focus:ring-2 focus:ring-secondary/50 glow-mystical transition-all duration-300"
                required
              />
            </div>

            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary z-10" />
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 pl-12 text-base border-2 border-primary/50 bg-background/80 focus:border-secondary focus:ring-2 focus:ring-secondary/50 glow-mystical transition-all duration-300"
                placeholder="Введите ваше имя"
                required
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary z-10" />
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-14 pl-12 text-base border-2 border-primary/50 bg-background/80 focus:border-secondary focus:ring-2 focus:ring-secondary/50 glow-mystical transition-all duration-300"
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-16 text-lg font-bold bg-gradient-gold hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,216,138,0.6)] hover:shadow-[0_0_50px_rgba(255,216,138,0.9)]"
            >
              ✨ Получить анализ ✨
            </Button>
          </form>

          {/* Phone number */}
          <div className="text-center pt-4">
            <a 
              href="tel:+79061827229" 
              className="text-2xl font-bold text-foreground hover:text-accent transition-colors"
            >
              +7 (906) 182 72 29
            </a>
          </div>

          {/* WhatsApp button */}
          <a
            href="https://wa.me/79061827229"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              type="button"
              className="w-full h-14 text-base font-semibold bg-[#25D366] hover:bg-[#128C7E] text-white transition-colors duration-300"
            >
              Написать на WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;
