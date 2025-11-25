import { useState, useEffect, useRef } from "react";

interface MysticalTimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

const ITEM_HEIGHT = 48; // Tailwind h-12

const MysticalTimePicker = ({ value, onChange }: MysticalTimePickerProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (ref: React.RefObject<HTMLDivElement>, index: number) => {
    if (!ref.current) return;
    const containerHeight = ref.current.clientHeight;
    const scrollTop = index * ITEM_HEIGHT - containerHeight / 2 + ITEM_HEIGHT / 2;
    ref.current.scrollTop = scrollTop;
  };

  const getIndexFromScroll = (ref: React.RefObject<HTMLDivElement>, length: number) => {
    if (!ref.current) return 0;
    const { scrollTop, clientHeight } = ref.current;
    const rawIndex = Math.round((scrollTop + clientHeight / 2 - ITEM_HEIGHT / 2) / ITEM_HEIGHT);
    return Math.min(length - 1, Math.max(0, rawIndex));
  };

  // Initial alignment
  useEffect(() => {
    setTimeout(() => {
      scrollToIndex(hourRef, selectedHour);
      scrollToIndex(minuteRef, selectedMinute);
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!value) return;
    const [h, m] = value.split(":").map(Number);
    setSelectedHour(h);
    setSelectedMinute(m);

    setTimeout(() => {
      scrollToIndex(hourRef, h);
      scrollToIndex(minuteRef, m);
    }, 50);
  }, [value]);

  useEffect(() => {
    const timeStr = `${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")}`;
    onChange(timeStr);
  }, [selectedHour, selectedMinute, onChange]);

  const handleHourScroll = () => {
    const index = getIndexFromScroll(hourRef, hours.length);
    if (index !== selectedHour) setSelectedHour(index);
  };

  const handleMinuteScroll = () => {
    const index = getIndexFromScroll(minuteRef, minutes.length);
    if (index !== selectedMinute) setSelectedMinute(index);
  };

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
            onScroll={handleHourScroll}
            className="flex-1 overflow-y-auto scrollbar-hide relative w-full mask-gradient"
            style={{ scrollBehavior: "smooth" }}
          >
            {hours.map((hour) => (
              <div
                key={hour}
                onClick={() => handleHourClick(hour)}
                className={`h-12 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  selectedHour === hour
                    ? "text-gold text-xl font-bold"
                    : "text-muted-foreground/60 text-sm hover:text-muted-foreground"
                }`}
              >
                {String(hour).padStart(2, "0")}
              </div>
            ))}
          </div>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center h-full">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">Minutes</div>
          <div
            ref={minuteRef}
            onScroll={handleMinuteScroll}
            className="flex-1 overflow-y-auto scrollbar-hide relative w-full mask-gradient"
            style={{ scrollBehavior: "smooth" }}
          >
            {minutes.map((minute) => (
              <div
                key={minute}
                onClick={() => handleMinuteClick(minute)}
                className={`h-12 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  selectedMinute === minute
                    ? "text-gold text-xl font-bold"
                    : "text-muted-foreground/60 text-sm hover:text-muted-foreground"
                }`}
              >
                {String(minute).padStart(2, "0")}
              </div>
            ))}
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
        .mask-gradient {
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 20%,
            black 80%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
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
