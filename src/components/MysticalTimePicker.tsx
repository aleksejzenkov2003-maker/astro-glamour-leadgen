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

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':').map(Number);
      setSelectedHour(h);
      setSelectedMinute(m);
    }
  }, [value]);

  useEffect(() => {
    const timeStr = `${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`;
    onChange(timeStr);
  }, [selectedHour, selectedMinute, onChange]);

  const scrollToCenter = (ref: React.RefObject<HTMLDivElement>, index: number) => {
    if (ref.current) {
      const itemHeight = 56;
      ref.current.scrollTop = index * itemHeight - itemHeight * 2;
    }
  };

  return (
    <div className="relative w-full bg-card backdrop-blur-md border-2 border-primary/40 rounded-2xl p-6 glow-mystical">
      <div className="grid grid-cols-2 gap-6 h-[280px] relative z-10">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">Hours</div>
          <div 
            ref={hourRef}
            className="flex-1 overflow-y-auto scrollbar-hide relative mask-gradient w-full z-20"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="py-24">
              {hours.map((hour) => (
                <div
                  key={hour}
                  onClick={() => {
                    setSelectedHour(hour);
                    scrollToCenter(hourRef, hour);
                  }}
                  className={`h-14 flex items-center justify-center cursor-pointer transition-all duration-300 relative z-30 ${
                    selectedHour === hour
                      ? 'text-gold text-2xl font-bold scale-110 glow-gold'
                      : 'text-muted-foreground text-base hover:text-foreground'
                  }`}
                >
                  {String(hour).padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">Minutes</div>
          <div 
            ref={minuteRef}
            className="flex-1 overflow-y-auto scrollbar-hide relative mask-gradient w-full z-20"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="py-24">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  onClick={() => {
                    setSelectedMinute(minute);
                    scrollToCenter(minuteRef, minute);
                  }}
                  className={`h-14 flex items-center justify-center cursor-pointer transition-all duration-300 relative z-30 ${
                    selectedMinute === minute
                      ? 'text-gold text-2xl font-bold scale-110 glow-gold'
                      : 'text-muted-foreground text-base hover:text-foreground'
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
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-14 border-y-2 border-primary/30 pointer-events-none z-5" />
      
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

export default MysticalTimePicker;
