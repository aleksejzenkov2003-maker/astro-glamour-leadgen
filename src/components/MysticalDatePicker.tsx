import { useState, useEffect, useRef } from "react";

interface MysticalDatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

const MysticalDatePicker = ({ value, onChange }: MysticalDatePickerProps) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedMonth(date.getMonth());
      setSelectedDay(date.getDate());
      setSelectedYear(date.getFullYear());
    }
  }, [value]);

  useEffect(() => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    onChange(dateStr);
  }, [selectedMonth, selectedDay, selectedYear, onChange]);

  const scrollToCenter = (ref: React.RefObject<HTMLDivElement>, index: number) => {
    if (ref.current) {
      const itemHeight = 56;
      ref.current.scrollTop = index * itemHeight - itemHeight * 2;
    }
  };

  return (
    <div className="w-full bg-card/60 backdrop-blur-md border-2 border-primary/40 rounded-2xl p-6 glow-mystical">
      <div className="grid grid-cols-3 gap-2 h-[280px]">
        {/* Month */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">Month</div>
          <div 
            ref={monthRef}
            className="flex-1 overflow-y-auto scrollbar-hide relative mask-gradient"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="py-24">
              {months.map((month, index) => (
                <div
                  key={month}
                  onClick={() => {
                    setSelectedMonth(index);
                    scrollToCenter(monthRef, index);
                  }}
                  className={`h-14 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    selectedMonth === index
                      ? 'text-gold text-lg font-bold scale-110 glow-gold'
                      : 'text-muted-foreground text-sm hover:text-foreground'
                  }`}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Day */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">Day</div>
          <div 
            ref={dayRef}
            className="flex-1 overflow-y-auto scrollbar-hide relative mask-gradient"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="py-24">
              {days.map((day) => (
                <div
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    scrollToCenter(dayRef, day - 1);
                  }}
                  className={`h-14 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    selectedDay === day
                      ? 'text-gold text-lg font-bold scale-110 glow-gold'
                      : 'text-muted-foreground text-sm hover:text-foreground'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Year */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">Year</div>
          <div 
            ref={yearRef}
            className="flex-1 overflow-y-auto scrollbar-hide relative mask-gradient"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="py-24">
              {years.map((year, index) => (
                <div
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    scrollToCenter(yearRef, index);
                  }}
                  className={`h-14 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    selectedYear === year
                      ? 'text-gold text-lg font-bold scale-110 glow-gold'
                      : 'text-muted-foreground text-sm hover:text-foreground'
                  }`}
                >
                  {year}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center highlight line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-14 border-y-2 border-primary/30 pointer-events-none" />
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-gradient {
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 20%,
            black 80%,
            transparent 100%
          );
        }
      `}</style>
    </div>
  );
};

export default MysticalDatePicker;
