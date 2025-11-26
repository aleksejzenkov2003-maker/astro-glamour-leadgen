import { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MysticDateScrollPickerProps {
  value: string;
  onChange: (date: string) => void;
}

const MysticDateScrollPicker = ({ value, onChange }: MysticDateScrollPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [day, setDay] = useState("15");
  const [month, setMonth] = useState("6");
  const [year, setYear] = useState("1990");
  
  const dayRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  // Parse initial value
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setDay(date.getDate().toString().padStart(2, "0"));
      setMonth((date.getMonth() + 1).toString());
      setYear(date.getFullYear().toString());
    }
  }, [value]);

  // Generate days array (1-31)
  const daysArray = Array.from({ length: 31 }, (_, i) => 
    (i + 1).toString().padStart(2, "0")
  );

  // Generate months array (1-12)
  const monthsArray = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: monthNames[i]
  }));

  // Generate years array (1920-2025)
  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => 
    (currentYear - i).toString()
  );

  const handleConfirm = () => {
    // Create date string in YYYY-MM-DD format
    const monthPadded = month.padStart(2, "0");
    const dayPadded = day.padStart(2, "0");
    const dateString = `${year}-${monthPadded}-${dayPadded}`;
    onChange(dateString);
    setIsOpen(false);
  };

  const scrollToValue = (ref: HTMLDivElement, value: string, array: any[], isMonth = false) => {
    let index;
    if (isMonth) {
      index = array.findIndex(m => m.value === value);
    } else {
      index = array.indexOf(value);
    }
    
    if (index !== -1) {
      const itemHeight = 48;
      ref.scrollTop = index * itemHeight - itemHeight * 2;
    }
  };

  useEffect(() => {
    if (isOpen && dayRef.current && monthRef.current && yearRef.current) {
      setTimeout(() => {
        if (dayRef.current) scrollToValue(dayRef.current, day, daysArray);
        if (monthRef.current) scrollToValue(monthRef.current, month, monthsArray, true);
        if (yearRef.current) scrollToValue(yearRef.current, year, yearsArray);
      }, 100);
    }
  }, [isOpen]);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const d = date.getDate();
    const m = monthNames[date.getMonth()];
    const y = date.getFullYear();
    return `${d} ${m} ${y}`;
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
          {value ? formatDisplayDate(value) : "Выберите дату рождения"}
        </span>
        <Calendar className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
      </button>

      {/* Date picker popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Date picker - centered modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="relative bg-card/95 backdrop-blur-xl border-2 border-primary/40 rounded-2xl p-6 shadow-[0_0_60px_rgba(255,216,138,0.3)] glow-mystical w-full max-w-md animate-scale-in">
              {/* Mystical glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-50 animate-pulse-mystical" />
              
              <div className="relative space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gradient-gold glow-gold">
                    Выберите дату
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Дата рождения
                  </p>
                </div>

                {/* Date selector */}
                <div className="flex gap-2 justify-center items-center">
                  {/* Day column */}
                  <div className="flex-1 relative">
                    <div className="text-center text-xs font-semibold text-gold mb-2">
                      День
                    </div>
                    <div className="relative h-[240px] overflow-hidden rounded-xl border-2 border-primary/30 bg-background/40">
                      {/* Selection highlight */}
                      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-12 bg-gradient-gold pointer-events-none z-10 shadow-[0_0_20px_rgba(255,216,138,0.4)]" />
                      
                      {/* Scrollable days */}
                      <div 
                        ref={dayRef}
                        className="h-full overflow-y-scroll scroll-smooth scrollbar-hide py-24"
                        onScroll={(e) => {
                          const scrollTop = e.currentTarget.scrollTop;
                          const itemHeight = 48;
                          const index = Math.round(scrollTop / itemHeight);
                          if (daysArray[index]) {
                            setDay(daysArray[index]);
                          }
                        }}
                      >
                        {daysArray.map((d) => (
                          <div
                            key={d}
                            className="h-12 flex items-center justify-center text-lg font-bold cursor-pointer transition-all"
                            style={{
                              color: d === day ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                            }}
                            onClick={() => {
                              setDay(d);
                              if (dayRef.current) {
                                scrollToValue(dayRef.current, d, daysArray);
                              }
                            }}
                          >
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Month column */}
                  <div className="flex-[1.5] relative">
                    <div className="text-center text-xs font-semibold text-gold mb-2">
                      Месяц
                    </div>
                    <div className="relative h-[240px] overflow-hidden rounded-xl border-2 border-primary/30 bg-background/40">
                      {/* Selection highlight */}
                      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-12 bg-gradient-gold pointer-events-none z-10 shadow-[0_0_20px_rgba(255,216,138,0.4)]" />
                      
                      {/* Scrollable months */}
                      <div 
                        ref={monthRef}
                        className="h-full overflow-y-scroll scroll-smooth scrollbar-hide py-24"
                        onScroll={(e) => {
                          const scrollTop = e.currentTarget.scrollTop;
                          const itemHeight = 48;
                          const index = Math.round(scrollTop / itemHeight);
                          if (monthsArray[index]) {
                            setMonth(monthsArray[index].value);
                          }
                        }}
                      >
                        {monthsArray.map((m) => (
                          <div
                            key={m.value}
                            className="h-12 flex items-center justify-center text-sm font-bold cursor-pointer transition-all px-2"
                            style={{
                              color: m.value === month ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                            }}
                            onClick={() => {
                              setMonth(m.value);
                              if (monthRef.current) {
                                scrollToValue(monthRef.current, m.value, monthsArray, true);
                              }
                            }}
                          >
                            {m.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Year column */}
                  <div className="flex-1 relative">
                    <div className="text-center text-xs font-semibold text-gold mb-2">
                      Год
                    </div>
                    <div className="relative h-[240px] overflow-hidden rounded-xl border-2 border-primary/30 bg-background/40">
                      {/* Selection highlight */}
                      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-12 bg-gradient-gold pointer-events-none z-10 shadow-[0_0_20px_rgba(255,216,138,0.4)]" />
                      
                      {/* Scrollable years */}
                      <div 
                        ref={yearRef}
                        className="h-full overflow-y-scroll scroll-smooth scrollbar-hide py-24"
                        onScroll={(e) => {
                          const scrollTop = e.currentTarget.scrollTop;
                          const itemHeight = 48;
                          const index = Math.round(scrollTop / itemHeight);
                          if (yearsArray[index]) {
                            setYear(yearsArray[index]);
                          }
                        }}
                      >
                        {yearsArray.map((y) => (
                          <div
                            key={y}
                            className="h-12 flex items-center justify-center text-lg font-bold cursor-pointer transition-all"
                            style={{
                              color: y === year ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                            }}
                            onClick={() => {
                              setYear(y);
                              if (yearRef.current) {
                                scrollToValue(yearRef.current, y, yearsArray);
                              }
                            }}
                          >
                            {y}
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

export default MysticDateScrollPicker;
