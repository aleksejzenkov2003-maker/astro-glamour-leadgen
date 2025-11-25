import { useEffect, useState, useRef } from "react";

interface LoadingWheelProps {
  onComplete: () => void;
}

const LoadingWheel = ({ onComplete }: LoadingWheelProps) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Составляем вашу натальную карту...");
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            setTimeout(onComplete, 500);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Change text at different progress points
    const textInterval = setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress < 30) {
          setText("Составляем вашу натальную карту...");
        } else if (currentProgress < 60) {
          setText("Анализируем планетарные аспекты...");
        } else if (currentProgress < 90) {
          setText("Изучаем ваши кармические узлы...");
        } else {
          setText("Готовим ваш личный прогноз...");
        }
        return currentProgress;
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[hsl(var(--mystical-dark))] to-[hsl(var(--background))] px-4">
      {/* Progress bar at top */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted/30">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-8 text-center animate-fade-in">
        {/* Loading text */}
        <h3 className="text-xl sm:text-2xl font-semibold text-foreground animate-pulse-mystical px-4">
          {text}
        </h3>

        {/* Astrological wheel */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl animate-pulse-mystical" />
          
          {/* Main wheel */}
          <div className="relative w-full h-full rounded-full bg-card border-4 border-primary/30 glow-wheel overflow-hidden">
            {/* Rotating zodiac ring */}
            <div className="absolute inset-4 rounded-full border-2 border-primary/40 animate-wheel">
              {/* Zodiac symbols */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-6 text-xs flex items-center justify-center text-primary"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 30}deg) translateY(-70px) rotate(-${i * 30}deg)`,
                  }}
                >
                  {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"][i]}
                </div>
              ))}
            </div>

            {/* Inner planets */}
            <div className="absolute inset-8 rounded-full border border-secondary/30">
              {/* Animated planets */}
              {[
                { delay: 0, size: 8, color: "primary", angle: progress * 3.6 },
                { delay: 1, size: 6, color: "secondary", angle: progress * 2.8 },
                { delay: 2, size: 10, color: "accent", angle: progress * 4.2 },
                { delay: 3, size: 7, color: "primary", angle: progress * 5.1 },
                { delay: 4, size: 9, color: "secondary", angle: progress * 3.3 },
              ].map((planet, i) => (
                <div
                  key={i}
                  className={`absolute w-${planet.size} h-${planet.size} rounded-full bg-${planet.color} shadow-[0_0_15px_currentColor]`}
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${planet.angle}deg) translateY(-50px) rotate(-${planet.angle}deg)`,
                    animationDelay: `${planet.delay}s`,
                  }}
                />
              ))}
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent shadow-[0_0_20px_currentColor] animate-pulse-mystical" />
            </div>

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
              <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.3" />
              <line x1="30%" y1="30%" x2="70%" y2="70%" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.3" />
              <line x1="70%" y1="30%" x2="30%" y2="70%" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>

          {/* Floating particles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-primary/60 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                fontSize: `${12 + Math.random() * 8}px`,
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* Mystical hints */}
        <div className="space-y-2 opacity-70">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="text-primary">☽</span> Ваши интуиция и мечты
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="text-secondary">✧</span> Ваши трансформации
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="text-accent">♃</span> Ваш подход к жизни
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingWheel;
