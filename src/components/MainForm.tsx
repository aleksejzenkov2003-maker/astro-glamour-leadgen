import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, User, Phone } from "lucide-react";
import astrologerImage from "@/assets/astrologer.jpg";

interface MainFormProps {
  onSubmit: (data: { date: string; name: string; phone: string }) => void;
}

const MainForm = ({ onSubmit }: MainFormProps) => {
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
    <section className="min-h-screen relative flex items-center justify-center px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Form */}
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="space-y-4 text-center lg:text-left">
              <div className="border-t border-b border-accent/30 py-4">
                <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-foreground tracking-wider">
                  ЯСНОВИДЯЩАЯ
                </h1>
              </div>
              
              <p className="text-base md:text-lg text-muted-foreground font-cinzel italic leading-relaxed">
                Предсказания и магические обряды<br />
                на любовь, отношения и семью
              </p>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-cinzel italic text-gradient-gold glow-gold">
                Елена
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 bg-card/40 backdrop-blur-sm border border-accent/20 rounded-lg p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              {/* Date */}
              <div className="space-y-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent z-10" />
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="h-12 pl-11 bg-input border-border text-foreground focus:border-accent focus:ring-1 focus:ring-accent"
                    required
                  />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent z-10" />
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 pl-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="Ваше имя"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent z-10" />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 pl-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full h-14 text-lg font-cinzel font-semibold bg-gradient-gold text-background hover:scale-[1.02] transition-transform duration-300 shadow-gold"
              >
                Предсказание судьбы
              </Button>
            </form>

            {/* Phone number display */}
            <div className="text-center lg:text-left">
              <a 
                href="tel:+79061827229" 
                className="inline-block text-3xl md:text-4xl font-bold text-foreground hover:text-accent transition-colors duration-300"
              >
                +7 (906) 182 72 29
              </a>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in order-first lg:order-last">
            <div className="relative">
              {/* Candlelight glow */}
              <div className="absolute inset-0 glow-candle opacity-60" />
              
              {/* Image */}
              <div className="relative w-full max-w-md lg:max-w-lg">
                <img
                  src={astrologerImage}
                  alt="Ясновидящая Елена"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainForm;
