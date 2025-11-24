import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar, User, Phone } from "lucide-react";

interface LeadFormProps {
  initialDate: string;
  onSubmit: (data: { date: string; name: string; phone: string }) => void;
}

const LeadForm = ({ initialDate, onSubmit }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    date: initialDate,
    name: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-card/30 backdrop-blur-xl border-2 border-primary/30 rounded-3xl p-8 md:p-12 glow-mystical">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold glow-gold">
              Получите персональный астрологический анализ
            </h2>
            <p className="text-muted-foreground text-lg">
              Заполните форму, и я свяжусь с вами в ближайшее время
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date of birth */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Дата рождения
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="h-14 text-lg border-2 border-primary/50 bg-background/80 focus:border-secondary focus:ring-2 focus:ring-secondary/50"
                required
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-accent" />
                Имя
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 text-lg border-2 border-primary/50 bg-background/80 focus:border-secondary focus:ring-2 focus:ring-secondary/50"
                placeholder="Введите ваше имя"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground text-lg flex items-center gap-2">
                <Phone className="h-5 w-5 text-accent" />
                Телефон
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-14 text-lg border-2 border-primary/50 bg-background/80 focus:border-secondary focus:ring-2 focus:ring-secondary/50"
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-16 text-xl font-bold bg-gradient-gold hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,216,138,0.6)] hover:shadow-[0_0_50px_rgba(255,216,138,0.9)] mt-8"
            >
              ✨ Получить анализ ✨
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-4">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
