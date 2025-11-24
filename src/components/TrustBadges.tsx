import { Users, Target, Sparkles, Lock } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    { icon: Users, text: "Более 20 000 клиентов" },
    { icon: Target, text: "Точные личные прогнозы" },
    { icon: Sparkles, text: "Сильные астрологические ритуалы" },
    { icon: Lock, text: "Гарантированная конфиденциальность" },
  ];

  return (
    <div className="space-y-4">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className="flex items-center gap-3 px-4 py-3 bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg hover:bg-card/40 transition-all duration-300 hover:scale-105 group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p-2 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
              <Icon className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm text-foreground/90 font-medium">{badge.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrustBadges;
