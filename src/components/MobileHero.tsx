import { useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import astrologerImage from "@/assets/astrologer.jpg";
interface MobileHeroProps {
  onSubmit: (data: {
    date: string;
    city: string;
    time: string;
  }) => void;
}
const MobileHero = ({
  onSubmit
}: MobileHeroProps) => {
  const [formData, setFormData] = useState({
    date: "",
    city: "",
    time: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return <div className="min-h-screen flex flex-col pb-0">
      {/* Hero Image Section */}
      <div className="relative flex-shrink-0">
        {/* Title overlay on image */}
        <div className="absolute top-4 left-0 right-0 z-10 px-3 space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center leading-snug drop-shadow-lg">
            Астролог с 20-летним опытом
          </h1>
          <p className="text-sm sm:text-base text-gradient-mystical font-semibold text-center drop-shadow-md">
            Провела более 20 000 консультаций
          </p>
        </div>

        {/* Astrologer photo with glow */}
        <div className="relative pt-20 sm:pt-24 pb-4 sm:pb-6">
          <div className="relative px-4">
            <div className="relative group mx-auto max-w-[260px] sm:max-w-[280px]">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-500 animate-pulse-glow" />
              
              {/* Photo */}
              <div className="relative rounded-full overflow-hidden border-4 border-accent/50 shadow-[0_0_60px_rgba(255,216,138,0.4)] aspect-square">
                <img src={astrologerImage} alt="Астролог" className="w-full h-full object-cover" />
              </div>

              {/* Floating mystical elements around photo */}
              <div className="absolute -top-2 -right-2 text-3xl sm:text-4xl animate-float">⭐</div>
              <div className="absolute -bottom-2 -left-2 text-2xl sm:text-3xl animate-float" style={{animationDelay: "0.5s"}}>✨</div>
              <div className="absolute top-1/4 -left-4 text-2xl animate-float" style={{animationDelay: "1s"}}>🌙</div>
              <div className="absolute top-1/4 -right-4 text-xl animate-float" style={{animationDelay: "1.5s"}}>🔮</div>
              <div className="absolute bottom-1/4 -left-3 text-lg animate-float" style={{animationDelay: "2s"}}>✨</div>
              <div className="absolute bottom-1/4 -right-3 text-xl animate-float" style={{animationDelay: "2.5s"}}>⭐</div>
              
              {/* Spinning circles */}
              <div className="absolute inset-0 border-2 border-accent/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border-2 border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 px-4 pb-6">
        <div className="max-w-md mx-auto space-y-4">
          {/* Main offer */}
          <div className="relative bg-card/20 backdrop-blur-md border-2 border-accent/30 rounded-2xl p-4 glow-mystical overflow-hidden">
            {/* Sparkles */}
            <div className="absolute top-2 left-4 text-yellow-300 animate-pulse" style={{animationDelay: "0s"}}>✨</div>
            <div className="absolute top-3 right-6 text-yellow-200 animate-pulse" style={{animationDelay: "0.5s"}}>⭐</div>
            <div className="absolute bottom-2 left-8 text-yellow-300 animate-pulse" style={{animationDelay: "1s"}}>✨</div>
            <div className="absolute bottom-3 right-4 text-yellow-200 animate-pulse" style={{animationDelay: "1.5s"}}>⭐</div>
            
            <p className="text-lg font-bold text-gradient-gold leading-tight text-center relative z-10">
              ⭐ Только сегодня получите бесплатный астрологический анализ судьбы
            </p>
            <p className="text-sm text-muted-foreground italic text-center mt-2 relative z-10">
              — по дате вашего рождения —
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Date */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary z-10" />
              <Input type="date" value={formData.date} onChange={e => setFormData({
              ...formData,
              date: e.target.value
            })} className="h-12 pl-10 text-sm border-2 border-primary/50 bg-background/80 focus:border-secondary focus:ring-2 focus:ring-secondary/50 glow-mystical transition-all duration-300" required />
            </div>

            {/* City */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary z-10" />
              <Input type="text" value={formData.city} onChange={e => setFormData({
              ...formData,
              city: e.target.value
            })} className="h-12 pl-10 text-sm border-2 border-primary/50 bg-background/80 focus:border-secondary focus:ring-2 focus:ring-secondary/50 glow-mystical transition-all duration-300" placeholder="Город рождения" required />
            </div>

            {/* Time */}
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary z-10" />
              <Input type="time" value={formData.time} onChange={e => setFormData({
              ...formData,
              time: e.target.value
            })} className="h-12 pl-10 text-sm border-2 border-primary/50 bg-background/80 focus:border-secondary focus:ring-2 focus:ring-secondary/50 glow-mystical transition-all duration-300" required />
            </div>

            {/* Submit button */}
            <Button type="submit" className="relative w-full h-14 text-base font-bold bg-gradient-gold hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,216,138,0.6)] hover:shadow-[0_0_50px_rgba(255,216,138,0.9)] overflow-hidden group">
              <span className="relative z-10">✨ Получить анализ ✨</span>
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </form>

          {/* Phone number */}
          

          {/* WhatsApp button */}
          <a href="https://wa.me/79061827229" target="_blank" rel="noopener noreferrer" className="block">
            
          </a>
        </div>
      </div>
    </div>;
};
export default MobileHero;