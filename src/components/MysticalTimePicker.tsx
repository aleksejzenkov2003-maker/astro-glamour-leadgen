import { useState, useEffect, useRef } from "react";

interface MysticalTimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

const MysticalTimePicker = ({ value, onChange }: MysticalTimePickerProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

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
      scrollToIndex(hourRef, selectedHour);
      scrollToIndex(minuteRef, selectedMinute);
    }, 100);
  }, []);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':').map(Number);
      setSelectedHour(h);
      setSelectedMinute(m);
      
      setTimeout(() => {
        scrollToIndex(hourRef, h);
        scrollToIndex(minuteRef, m);
      }, 50);
    }
  }, [value]);

  useEffect(() => {
    const timeStr = `${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`;
    onChange(timeStr);
  }, [selectedHour, selectedMinute, onChange]);

  const handleHourClick = (hour: number) => {
    setSelectedHour(hour);
    scrollToIndex(hourRef, hour);
  };

  const handleMinuteClick = (minute: number) => {
    setSelectedMinute(minute);
    scrollToIndex(minuteRef, minute);
  };

  return (
    <div className="relative w-full bg-card backdrop-blur-md border-2 border-primary/40 rounded-2xl p-4 glow-mystical">
      <div className="grid grid-cols-2 gap-6 h-[240px]">
        {/* Hours */}
        <div className="flex flex-col items-center h-full">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">Hours</div>
          <div 
            ref={hourRef}
            className="flex-1 overflow-y-scroll scrollbar-hide relative w-full"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="py-[96px]">
              {hours.map((hour) => (
                <div
                  key={hour}
                  onClick={() => handleHourClick(hour)}
                  className={`h-12 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    selectedHour === hour
                      ? 'text-gold text-xl font-bold'
                      : 'text-muted-foreground/50 text-sm hover:text-muted-foreground'
                  }`}
                >
                  {String(hour).padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center h-full">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">Minutes</div>
          <div 
            ref={minuteRef}
            className="flex-1 overflow-y-scroll scrollbar-hide relative w-full"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="py-[96px]">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  onClick={() => handleMinuteClick(minute)}
                  className={`h-12 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    selectedMinute === minute
                      ? 'text-gold text-xl font-bold'
                      : 'text-muted-foreground/50 text-sm hover:text-muted-foreground'
                  }`}
                >
                  {String(minute).padStart(2, '0')}
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

export default MysticalTimePicker;
