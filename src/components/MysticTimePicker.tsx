import { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MysticTimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

const MysticTimePicker = ({ value, onChange }: MysticTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);

  // Parse initial value
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      setHours(h);
      setMinutes(m);
    }
  }, [value]);

  // Generate hours array (00-23)
  const hoursArray = Array.from({ length: 24 }, (_, i) => 
    i.toString().padStart(2, "0")
  );

  // Generate minutes array (00-59)
  const minutesArray = Array.from({ length: 60 }, (_, i) => 
    i.toString().padStart(2, "0")
  );

  const handleConfirm = () => {
    const timeString = `${hours}:${minutes}`;
    onChange(timeString);
    setIsOpen(false);
  };

  const scrollToValue = (ref: HTMLDivElement, value: string, array: string[]) => {
    const index = array.indexOf(value);
    if (index !== -1) {
      const itemHeight = 48; // height of each item
      ref.scrollTop = index * itemHeight - itemHeight * 2; // Center the selected item
    }
  };

  useEffect(() => {
    if (isOpen && hoursRef.current && minutesRef.current) {
      setTimeout(() => {
        if (hoursRef.current) scrollToValue(hoursRef.current, hours, hoursArray);
        if (minutesRef.current) scrollToValue(minutesRef.current, minutes, minutesArray);
      }, 100);
    }
  }, [isOpen]);

  const formatDisplayTime = (time: string) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    return `${h}:${m}`;
  };

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-16 px-4 text-lg bg-card backdrop-blur-md border-2 border-primary/40 rounded-2xl text-gold font-semibold focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all duration-300 glow-mystical flex items-center justify-between group hover:border-gold/60"
      >
        <span className={value ? "text-gold" : "text-muted-foreground"}>
          {value ? formatDisplayTime(value) : "Выберите время рождения"}
        </span>
        <Clock className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
      </button>

      {/* Time picker popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Time picker - centered modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="relative bg-card/95 backdrop-blur-xl border-2 border-primary/40 rounded-2xl p-6 shadow-[0_0_60px_rgba(255,216,138,0.3)] glow-mystical w-full max-w-sm animate-scale-in">
              {/* Mystical glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-50 animate-pulse-mystical" />
              
              <div className="relative space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gradient-gold glow-gold">
                    Выберите время
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Часы и минуты рождения
                  </p>
                </div>

                {/* Time selector */}
                <div className="flex gap-3 justify-center items-center">
                  {/* Hours column */}
                  <div className="flex-1 relative">
                    <div className="text-center text-xs font-semibold text-gold mb-2">
                      Часы
                    </div>
                    <div className="relative h-[240px] overflow-hidden rounded-xl border-2 border-primary/30 bg-background/40">
                      {/* Selection highlight */}
                      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-12 bg-gradient-gold pointer-events-none z-10 shadow-[0_0_20px_rgba(255,216,138,0.4)]" />
                      
                      {/* Scrollable hours */}
                      <div 
                        ref={hoursRef}
                        className="h-full overflow-y-scroll scroll-smooth scrollbar-hide py-24"
                        onScroll={(e) => {
                          const scrollTop = e.currentTarget.scrollTop;
                          const itemHeight = 48;
                          const index = Math.round(scrollTop / itemHeight);
                          setHours(hoursArray[index]);
                        }}
                      >
                        {hoursArray.map((hour) => (
                          <div
                            key={hour}
                            className="h-12 flex items-center justify-center text-lg font-bold cursor-pointer transition-all"
                            style={{
                              color: hour === hours ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                            }}
                            onClick={() => {
                              setHours(hour);
                              if (hoursRef.current) {
                                scrollToValue(hoursRef.current, hour, hoursArray);
                              }
                            }}
                          >
                            {hour}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="text-3xl font-bold text-gold pt-6">:</div>

                  {/* Minutes column */}
                  <div className="flex-1 relative">
                    <div className="text-center text-xs font-semibold text-gold mb-2">
                      Минуты
                    </div>
                    <div className="relative h-[240px] overflow-hidden rounded-xl border-2 border-primary/30 bg-background/40">
                      {/* Selection highlight */}
                      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-12 bg-gradient-gold pointer-events-none z-10 shadow-[0_0_20px_rgba(255,216,138,0.4)]" />
                      
                      {/* Scrollable minutes */}
                      <div 
                        ref={minutesRef}
                        className="h-full overflow-y-scroll scroll-smooth scrollbar-hide py-24"
                        onScroll={(e) => {
                          const scrollTop = e.currentTarget.scrollTop;
                          const itemHeight = 48;
                          const index = Math.round(scrollTop / itemHeight);
                          setMinutes(minutesArray[index]);
                        }}
                      >
                        {minutesArray.map((minute) => (
                          <div
                            key={minute}
                            className="h-12 flex items-center justify-center text-lg font-bold cursor-pointer transition-all"
                            style={{
                              color: minute === minutes ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                            }}
                            onClick={() => {
                              setMinutes(minute);
                              if (minutesRef.current) {
                                scrollToValue(minutesRef.current, minute, minutesArray);
                              }
                            }}
                          >
                            {minute}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    className="flex-1 text-sm text-muted-foreground hover:bg-muted/20"
                  >
                    Отмена
                  </Button>
                  <Button
                    type="button"
                    onClick={handleConfirm}
                    className="flex-1 text-sm bg-gradient-gold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,216,138,0.4)]"
                  >
                    Выбрать ✨
                  </Button>
                </div>

                {/* Decorative stars */}
                <div className="absolute -top-2 -right-2 text-xl animate-float">⭐</div>
                <div className="absolute -bottom-2 -left-2 text-lg animate-float" style={{animationDelay: "0.5s"}}>✨</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MysticTimePicker;
