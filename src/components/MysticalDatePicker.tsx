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

  const scrollToIndex = (ref: React.RefObject<HTMLDivElement>, index: number) => {
    if (ref.current) {
      const itemHeight = 48; // h-12 = 48px
      const containerHeight = ref.current.clientHeight;
      const scrollTop = index * itemHeight - (containerHeight / 2) + (itemHeight / 2);
      ref.current.scrollTop = scrollTop;
    }
  };

  // Initial scroll on mount
  useEffect(() => {
    setTimeout(() => {
      scrollToIndex(monthRef, selectedMonth);
      scrollToIndex(dayRef, selectedDay - 1);
      scrollToIndex(yearRef, 0);
    }, 100);
  }, []);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();
      
      setSelectedMonth(month);
      setSelectedDay(day);
      setSelectedYear(year);
      
      setTimeout(() => {
        scrollToIndex(monthRef, month);
        scrollToIndex(dayRef, day - 1);
        scrollToIndex(yearRef, years.indexOf(year));
      }, 50);
    }
  }, [value]);

  useEffect(() => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    onChange(dateStr);
  }, [selectedMonth, selectedDay, selectedYear, onChange]);

  const handleMonthClick = (index: number) => {
    setSelectedMonth(index);
    scrollToIndex(monthRef, index);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    scrollToIndex(dayRef, day - 1);
  };

  const handleYearClick = (year: number, index: number) => {
    setSelectedYear(year);
    scrollToIndex(yearRef, index);
  };

  return (
    <div className="relative w-full bg-card backdrop-blur-md border-2 border-primary/40 rounded-2xl p-4 glow-mystical">
      <div className="grid grid-cols-3 gap-2 h-[240px]">
        {/* Month */}
        <div className="flex flex-col items-center h-full">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">Month</div>
          <div 
            ref={monthRef}
            className="flex-1 overflow-y-scroll scrollbar-hide relative w-full"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="py-[96px]">
              {months.map((month, index) => (
                <div
                  key={month}
                  onClick={() => handleMonthClick(index)}
                  className={`h-12 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    selectedMonth === index
                      ? 'text-gold text-base font-bold'
                      : 'text-muted-foreground/50 text-xs hover:text-muted-foreground'
                  }`}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Day */}
        <div className="flex flex-col items-center h-full">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">Day</div>
          <div 
            ref={dayRef}
            className="flex-1 overflow-y-scroll scrollbar-hide relative w-full"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="py-[96px]">
              {days.map((day) => (
                <div
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`h-12 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    selectedDay === day
                      ? 'text-gold text-base font-bold'
                      : 'text-muted-foreground/50 text-xs hover:text-muted-foreground'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Year */}
        <div className="flex flex-col items-center h-full">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">Year</div>
          <div 
            ref={yearRef}
            className="flex-1 overflow-y-scroll scrollbar-hide relative w-full"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="py-[96px]">
              {years.map((year, index) => (
                <div
                  key={year}
                  onClick={() => handleYearClick(year, index)}
                  className={`h-12 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    selectedYear === year
                      ? 'text-gold text-base font-bold'
                      : 'text-muted-foreground/50 text-xs hover:text-muted-foreground'
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
      <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-12 border-y border-gold/40 pointer-events-none rounded" />
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MysticalDatePicker;
